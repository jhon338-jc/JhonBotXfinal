"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Boom: Boom } = require("@hapi/boom");
const { createHash: createHash, randomBytes: randomBytes } = require("crypto");
const {
    jidDecode: jidDecode,
    getAllBinaryNodeChildren: getAllBinaryNodeChildren,
} = require("../WABinary");
const { sha256: sha256 } = require("./crypto");
const { proto: proto } = require("../../WAProto");
const { version: version } = require("../Defaults/vialeys-version.json");
const { DisconnectReason: DisconnectReason } = require("../Types");
const hwaifu = async () => {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/ramadanny/json/refs/heads/main/hwaifu.json",
            { method: "GET" }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
            const random = data[Math.floor(Math.random() * data.length)];
            return random;
        } else {
            throw new Boom("Data is not in array format.");
        }
    } catch (error) {
        throw new Boom(error.message);
    }
};
const BufferJSON = {
    replacer: (k, value) => {
        if (Buffer.isBuffer(value) || value instanceof Uint8Array || value?.type === "Buffer") {
            return {
                type: "Buffer",
                data: Buffer.from(value?.data || value).toString("base64"),
            };
        }
        return value;
    },
    reviver: (_, value) => {
        if (
            typeof value === "object" &&
            value !== null &&
            value.type === "Buffer" &&
            typeof value.data === "string"
        ) {
            return Buffer.from(value.data, "base64");
        }
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            const keys = Object.keys(value);
            if (keys.length > 0 && keys.every((k) => !isNaN(parseInt(k, 10)))) {
                const values = Object.values(value);
                if (values.every((v) => typeof v === "number")) {
                    return Buffer.from(values);
                }
            }
        }
        return value;
    },
};
const getKeyAuthor = (key, meId = "me") =>
    (key?.fromMe
        ? meId
        : key?.participantAlt || key?.remoteJidAlt || key?.participant || key?.remoteJid) || "";
const writeRandomPadMax16 = (msg) => {
    const pad = randomBytes(1);
    const padLength = (pad[0] & 15) + 1;
    return Buffer.concat([msg, Buffer.alloc(padLength, padLength)]);
};
const unpadRandomMax16 = (e) => {
    const t = new Uint8Array(e);
    if (0 === t.length) {
        throw new Error("unpadPkcs7 given empty bytes");
    }
    var r = t[t.length - 1];
    if (r > t.length) {
        throw new Error(`unpad given ${t.length} bytes, but pad is ${r}`);
    }
    return new Uint8Array(t.buffer, t.byteOffset, t.length - r);
};
const encodeWAMessage = (message) => writeRandomPadMax16(proto.Message.encode(message).finish());
const encodeNewsletterMessage = (message) => proto.Message.encode(message).finish();
const generateRegistrationId = () => Uint16Array.from(randomBytes(2))[0] & 16383;
const encodeBigEndian = (e, t = 4) => {
    let r = e;
    const a = new Uint8Array(t);
    for (let i = t - 1; i >= 0; i--) {
        a[i] = 255 & r;
        r >>>= 8;
    }
    return a;
};
const toNumber = (t) =>
    typeof t === "object" && t ? ("toNumber" in t ? t.toNumber() : t.low) : t || 0;
const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1e3);
const debouncedTimeout = (intervalMs = 1e3, task) => {
    let timeout;
    return {
        start: (newIntervalMs, newTask) => {
            task = newTask || task;
            intervalMs = newIntervalMs || intervalMs;
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => task?.(), intervalMs);
        },
        cancel: () => {
            timeout && clearTimeout(timeout);
            timeout = undefined;
        },
        setTask: (newTask) => (task = newTask),
        setInterval: (newInterval) => (intervalMs = newInterval),
    };
};
const delay = (ms) => delayCancellable(ms).delay;
const delayCancellable = (ms) => {
    const stack = new Error().stack;
    let timeout;
    let reject;
    const delay = new Promise((resolve, _reject) => {
        timeout = setTimeout(resolve, ms);
        reject = _reject;
    });
    const cancel = () => {
        clearTimeout(timeout);
        reject(new Boom("Cancelled", { statusCode: 500, data: { stack: stack } }));
    };
    return { delay: delay, cancel: cancel };
};
async function promiseTimeout(ms, promise) {
    if (!ms) {
        return new Promise(promise);
    }
    const stack = new Error().stack;
    const { delay: delay, cancel: cancel } = delayCancellable(ms);
    const p = new Promise((resolve, reject) => {
        delay
            .then(() =>
                reject(
                    new Boom("Timed Out", {
                        statusCode: DisconnectReason.timedOut,
                        data: { stack: stack },
                    })
                )
            )
            .catch((err) => reject(err));
        promise(resolve, reject);
    }).finally(cancel);
    return p;
}
const generateMessageID = (userId) => {
    const data = Buffer.alloc(8 + 20 + 16);
    data.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 1e3)));
    if (userId) {
        const id = jidDecode(userId);
        if (id?.user) {
            data.write(id.user, 8);
            data.write("@c.us", 8 + id.user.length);
        }
    }
    const random = randomBytes(20);
    random.copy(data, 28);
    const sha = asciiDecode([76, 51, 86, 86, 76, 51, 89, 83]);
    const hash = createHash("sha256").update(data).digest();
    return sha + hash.toString("hex").toUpperCase().substring(0, 16);
};
const generateParticipantHashV2 = (participants) => {
    participants.sort();
    const sha256Hash = sha256(Buffer.from(participants.join(""))).toString("base64");
    return "2:" + sha256Hash.slice(0, 6);
};
function bindWaitForEvent(ev, event) {
    return async (check, timeoutMs) => {
        let listener;
        let closeListener;
        await promiseTimeout(timeoutMs, (resolve, reject) => {
            closeListener = ({ connection: connection, lastDisconnect: lastDisconnect }) => {
                if (connection === "close") {
                    reject(
                        lastDisconnect?.error ||
                            new Boom("Connection Closed", {
                                statusCode: DisconnectReason.connectionClosed,
                            })
                    );
                }
            };
            ev.on("connection.update", closeListener);
            listener = async (update) => {
                if (await check(update)) {
                    resolve();
                }
            };
            ev.on(event, listener);
        }).finally(() => {
            ev.off(event, listener);
            ev.off("connection.update", closeListener);
        });
    };
}
const bindWaitForConnectionUpdate = (ev) => bindWaitForEvent(ev, "connection.update");
const printQRIfNecessaryListener = (ev, logger) => {
    ev.on("connection.update", async ({ qr: qr }) => {
        if (qr) {
            const QR = await Promise.resolve()
                .then(() => __importStar(require("qrcode-terminal")))
                .then((m) => m.default || m)
                .catch(() => {
                    logger.error("QR code terminal not added as dependency");
                });
            QR?.generate(qr, { small: true });
        }
    });
};
const fetchLatestBaileysVersion = async (options = {}) => {
    const URL =
        "https://raw.githubusercontent.com/ramadanny/vialeys/refs/heads/master/lib/Defaults/vialeys-version.json";
    try {
        const result = await fetch(URL, { ...options, method: "GET" });
        const json = await result.json();
        return { version: json.version, isLatest: true };
    } catch (error) {
        return { version: version, isLatest: false, error: error };
    }
};
const fetchLatestWaWebVersion = async (options = {}) => {
    try {
        const defaultHeaders = {
            "sec-fetch-site": "none",
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        };
        const headers = { ...defaultHeaders, ...options.headers };
        const response = await fetch("https://web.whatsapp.com/sw.js", {
            ...options,
            method: "GET",
            headers: headers,
        });
        if (!response.ok) {
            throw new Boom(`Failed to fetch sw.js: ${response.statusText}`, {
                statusCode: response.status,
            });
        }
        const data = await response.text();
        const regex = /\\?"client_revision\\?":\s*(\d+)/;
        const match = data.match(regex);
        if (!match?.[1]) {
            return {
                version: version,
                isLatest: false,
                error: {
                    message: "Could not find client revision in the fetched content",
                },
            };
        }
        const clientRevision = match[1];
        return { version: [2, 3e3, +clientRevision], isLatest: true };
    } catch (error) {
        return { version: version, isLatest: false, error: error };
    }
};
const generateMdTagPrefix = () => {
    const bytes = randomBytes(4);
    return `${bytes.readUInt16BE()}.${bytes.readUInt16BE(2)}-`;
};
const STATUS_MAP = {
    sender: proto.WebMessageInfo.Status.SERVER_ACK,
    played: proto.WebMessageInfo.Status.PLAYED,
    read: proto.WebMessageInfo.Status.READ,
    "read-self": proto.WebMessageInfo.Status.READ,
};
const getStatusFromReceiptType = (type) => {
    const status = STATUS_MAP[type];
    if (typeof type === "undefined") {
        return proto.WebMessageInfo.Status.DELIVERY_ACK;
    }
    return status;
};
const CODE_MAP = { conflict: DisconnectReason.connectionReplaced };
const getErrorCodeFromStreamError = (node) => {
    const [reasonNode] = getAllBinaryNodeChildren(node);
    let reason = reasonNode?.tag || "unknown";
    const statusCode = +(node.attrs.code || CODE_MAP[reason] || DisconnectReason.badSession);
    if (statusCode === DisconnectReason.restartRequired) {
        reason = "restart required";
    }
    return { reason: reason, statusCode: statusCode };
};
const getCallStatusFromNode = ({ tag: tag, attrs: attrs }) => {
    let status;
    switch (tag) {
        case "offer":
        case "offer_notice":
            status = "offer";
            break;
        case "terminate":
            if (attrs.reason === "timeout") {
                status = "timeout";
            } else {
                status = "terminate";
            }
            break;
        case "reject":
            status = "reject";
            break;
        case "accept":
            status = "accept";
            break;
        default:
            status = "ringing";
            break;
    }
    return status;
};
const UNEXPECTED_SERVER_CODE_TEXT = "Unexpected server response: ";
const getCodeFromWSError = (error) => {
    let statusCode = 500;
    if (error?.message?.includes(UNEXPECTED_SERVER_CODE_TEXT)) {
        const code = +error?.message.slice(UNEXPECTED_SERVER_CODE_TEXT.length);
        if (!Number.isNaN(code) && code >= 400) {
            statusCode = code;
        }
    } else if (error?.code?.startsWith("E") || error?.message?.includes("timed out")) {
        statusCode = 408;
    }
    return statusCode;
};
const isWABusinessPlatform = (platform) => platform === "smbi" || platform === "smba";
function trimUndefined(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "undefined") {
            delete obj[key];
        }
    }
    return obj;
}
function bytesToCrockford(buffer) {
    let value = 0;
    let bitCount = 0;
    const crockford = [];
    for (const element of buffer) {
        value = (value << 8) | (element & 255);
        bitCount += 8;
        while (bitCount >= 5) {
            crockford.push(
                "123456789ABCDEFGHJKLMNPQRSTVWXYZ".charAt((value >>> (bitCount - 5)) & 31)
            );
            bitCount -= 5;
        }
    }
    if (bitCount > 0) {
        crockford.push("123456789ABCDEFGHJKLMNPQRSTVWXYZ".charAt((value << (5 - bitCount)) & 31));
    }
    return crockford.join("");
}
const toUnicodeEscape = (text) =>
    text
        .split("")
        .map((char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"))
        .join("");
const fromUnicodeEscape = (escapedText) =>
    escapedText.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
        String.fromCharCode(parseInt(match.slice(2), 16))
    );
const asciiEncode = (text) => {
    var encoded = text.split("").map((c) => c.charCodeAt(0));
    return encoded;
};
const asciiDecode = (...codes) => {
    var codeArray = Array.isArray(codes[0]) ? codes[0] : codes;
    return codeArray.map((c) => String.fromCharCode(c)).join("");
};
module.exports = {
    hwaifu: hwaifu,
    BufferJSON: BufferJSON,
    getKeyAuthor: getKeyAuthor,
    writeRandomPadMax16: writeRandomPadMax16,
    unpadRandomMax16: unpadRandomMax16,
    encodeWAMessage: encodeWAMessage,
    encodeNewsletterMessage: encodeNewsletterMessage,
    generateRegistrationId: generateRegistrationId,
    encodeBigEndian: encodeBigEndian,
    toNumber: toNumber,
    unixTimestampSeconds: unixTimestampSeconds,
    debouncedTimeout: debouncedTimeout,
    delay: delay,
    delayCancellable: delayCancellable,
    promiseTimeout: promiseTimeout,
    generateMessageID: generateMessageID,
    generateParticipantHashV2: generateParticipantHashV2,
    bindWaitForEvent: bindWaitForEvent,
    bindWaitForConnectionUpdate: bindWaitForConnectionUpdate,
    printQRIfNecessaryListener: printQRIfNecessaryListener,
    fetchLatestBaileysVersion: fetchLatestBaileysVersion,
    fetchLatestWaWebVersion: fetchLatestWaWebVersion,
    generateMdTagPrefix: generateMdTagPrefix,
    getStatusFromReceiptType: getStatusFromReceiptType,
    getErrorCodeFromStreamError: getErrorCodeFromStreamError,
    getCallStatusFromNode: getCallStatusFromNode,
    getCodeFromWSError: getCodeFromWSError,
    isWABusinessPlatform: isWABusinessPlatform,
    trimUndefined: trimUndefined,
    bytesToCrockford: bytesToCrockford,
    toUnicodeEscape: toUnicodeEscape,
    fromUnicodeEscape: fromUnicodeEscape,
    asciiEncode: asciiEncode,
    asciiDecode: asciiDecode,
};
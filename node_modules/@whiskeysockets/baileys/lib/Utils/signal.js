"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { KEY_BUNDLE_TYPE: KEY_BUNDLE_TYPE } = require("../Defaults/constants");
const {
    S_WHATSAPP_NET: S_WHATSAPP_NET,
    getBinaryNodeChild: getBinaryNodeChild,
    getBinaryNodeChildren: getBinaryNodeChildren,
    getBinaryNodeChildUInt: getBinaryNodeChildUInt,
    getBinaryNodeChildBuffer: getBinaryNodeChildBuffer,
    assertNodeErrorFree: assertNodeErrorFree,
    jidDecode: jidDecode,
    getServerFromDomainType: getServerFromDomainType,
    WAJIDDomains: WAJIDDomains,
} = require("../WABinary");
const { Curve: Curve, generateSignalPubKey: generateSignalPubKey } = require("./crypto");
const { encodeBigEndian: encodeBigEndian } = require("./generics");
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
const createSignalIdentity = (wid, accountSignatureKey) => ({
    identifier: { name: wid, deviceId: 0 },
    identifierKey: generateSignalPubKey(accountSignatureKey),
});
const getPreKeys = async ({ get: get }, min, limit) => {
    const idList = [];
    for (let id = min; id < limit; id++) {
        idList.push(id.toString());
    }
    return get("pre-key", idList);
};
const generateOrGetPreKeys = (creds, range) => {
    const avaliable = creds.nextPreKeyId - creds.firstUnuploadedPreKeyId;
    const remaining = range - avaliable;
    const lastPreKeyId = creds.nextPreKeyId + remaining - 1;
    const newPreKeys = {};
    if (remaining > 0) {
        for (let i = creds.nextPreKeyId; i <= lastPreKeyId; i++) {
            newPreKeys[i] = Curve.generateKeyPair();
        }
    }
    return {
        newPreKeys: newPreKeys,
        lastPreKeyId: lastPreKeyId,
        preKeysRange: [creds.firstUnuploadedPreKeyId, range],
    };
};
const xmppSignedPreKey = (key) => ({
    tag: "skey",
    attrs: {},
    content: [
        { tag: "id", attrs: {}, content: encodeBigEndian(key.keyId, 3) },
        { tag: "value", attrs: {}, content: key.keyPair.public },
        { tag: "signature", attrs: {}, content: key.signature },
    ],
});
const xmppPreKey = (pair, id) => ({
    tag: "key",
    attrs: {},
    content: [
        { tag: "id", attrs: {}, content: encodeBigEndian(id, 3) },
        { tag: "value", attrs: {}, content: pair.public },
    ],
});
const parseAndInjectE2ESessions = async (node, repository) => {
    const extractKey = (key) =>
        key
            ? {
                  keyId: getBinaryNodeChildUInt(key, "id", 3),
                  publicKey: generateSignalPubKey(getBinaryNodeChildBuffer(key, "value")),
                  signature: getBinaryNodeChildBuffer(key, "signature"),
              }
            : undefined;
    const nodes = getBinaryNodeChildren(getBinaryNodeChild(node, "list"), "user");
    for (const node of nodes) {
        assertNodeErrorFree(node);
    }
    const chunkSize = 100;
    const chunks = chunk(nodes, chunkSize);
    for (const nodesChunk of chunks) {
        for (const node of nodesChunk) {
            const signedKey = getBinaryNodeChild(node, "skey");
            const key = getBinaryNodeChild(node, "key");
            const identity = getBinaryNodeChildBuffer(node, "identity");
            const jid = node.attrs.jid;
            const registrationId = getBinaryNodeChildUInt(node, "registration", 4);
            await repository.injectE2ESession({
                jid: jid,
                session: {
                    registrationId: registrationId,
                    identityKey: generateSignalPubKey(identity),
                    signedPreKey: extractKey(signedKey),
                    preKey: extractKey(key),
                },
            });
        }
    }
};
const extractDeviceJids = (result, myJid, myLid, excludeZeroDevices) => {
    const { user: myUser, device: myDevice } = jidDecode(myJid);
    const extracted = [];
    for (const userResult of result) {
        const { devices: devices, id: id } = userResult;
        const decoded = jidDecode(id),
            { user: user, server: server } = decoded;
        let { domainType: domainType } = decoded;
        const deviceList = devices?.deviceList;
        if (!Array.isArray(deviceList)) continue;
        for (const { id: device, keyIndex: keyIndex, isHosted: isHosted } of deviceList) {
            if (
                (!excludeZeroDevices || device !== 0) &&
                ((myUser !== user && myLid !== user) || myDevice !== device) &&
                (device === 0 || !!keyIndex)
            ) {
                if (isHosted) {
                    domainType =
                        domainType === WAJIDDomains.LID
                            ? WAJIDDomains.HOSTED_LID
                            : WAJIDDomains.HOSTED;
                }
                extracted.push({
                    user: user,
                    device: device,
                    domainType: domainType,
                    server: getServerFromDomainType(server, domainType),
                });
            }
        }
    }
    return extracted;
};
const getNextPreKeys = async ({ creds: creds, keys: keys }, count) => {
    const {
        newPreKeys: newPreKeys,
        lastPreKeyId: lastPreKeyId,
        preKeysRange: preKeysRange,
    } = generateOrGetPreKeys(creds, count);
    const update = {
        nextPreKeyId: Math.max(lastPreKeyId + 1, creds.nextPreKeyId),
        firstUnuploadedPreKeyId: Math.max(creds.firstUnuploadedPreKeyId, lastPreKeyId + 1),
    };
    await keys.set({ "pre-key": newPreKeys });
    const preKeys = await getPreKeys(keys, preKeysRange[0], preKeysRange[0] + preKeysRange[1]);
    return { update: update, preKeys: preKeys };
};
const getNextPreKeysNode = async (state, count) => {
    const { creds: creds } = state;
    const { update: update, preKeys: preKeys } = await getNextPreKeys(state, count);
    const node = {
        tag: "iq",
        attrs: { xmlns: "encrypt", type: "set", to: S_WHATSAPP_NET },
        content: [
            {
                tag: "registration",
                attrs: {},
                content: encodeBigEndian(creds.registrationId),
            },
            { tag: "type", attrs: {}, content: KEY_BUNDLE_TYPE },
            { tag: "identity", attrs: {}, content: creds.signedIdentityKey.public },
            {
                tag: "list",
                attrs: {},
                content: Object.keys(preKeys).map((k) => xmppPreKey(preKeys[+k], +k)),
            },
            xmppSignedPreKey(creds.signedPreKey),
        ],
    };
    return { update: update, node: node };
};
module.exports = {
    createSignalIdentity: createSignalIdentity,
    getPreKeys: getPreKeys,
    generateOrGetPreKeys: generateOrGetPreKeys,
    xmppSignedPreKey: xmppSignedPreKey,
    xmppPreKey: xmppPreKey,
    parseAndInjectE2ESessions: parseAndInjectE2ESessions,
    extractDeviceJids: extractDeviceJids,
    getNextPreKeys: getNextPreKeys,
    getNextPreKeysNode: getNextPreKeysNode,
};

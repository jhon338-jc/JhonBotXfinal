"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { promisify: promisify } = require("util");
const { inflate: inflate } = require("zlib");
const { proto: proto } = require("../../WAProto");
const { WAMessageStubType: WAMessageStubType } = require("../Types");
const { toNumber: toNumber } = require("./generics");
const { normalizeMessageContent: normalizeMessageContent } = require("./messages");
const { downloadContentFromMessage: downloadContentFromMessage } = require("./messages-media");
const inflatePromise = promisify(inflate);
const downloadHistory = async (msg, options) => {
    const stream = await downloadContentFromMessage(msg, "md-msg-hist", {
        options: options,
    });
    const bufferArray = [];
    for await (const chunk of stream) {
        bufferArray.push(chunk);
    }
    let buffer = Buffer.concat(bufferArray);
    buffer = await inflatePromise(buffer);
    const syncData = proto.HistorySync.decode(buffer);
    return syncData;
};
const processHistoryMessage = (item) => {
    const messages = [];
    const contacts = [];
    const chats = [];
    switch (item.syncType) {
        case proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP:
        case proto.HistorySync.HistorySyncType.RECENT:
        case proto.HistorySync.HistorySyncType.FULL:
        case proto.HistorySync.HistorySyncType.ON_DEMAND:
            for (const chat of item.conversations) {
                contacts.push({
                    id: chat.id,
                    name: chat.name || undefined,
                    lid: chat.lidJid || undefined,
                    phoneNumber: chat.pnJid || undefined,
                });
                const msgs = chat.messages || [];
                delete chat.messages;
                for (const item of msgs) {
                    const message = item.message;
                    messages.push(message);
                    if (!chat.messages?.length) {
                        chat.messages = [{ message: message }];
                    }
                    if (!message.key.fromMe && !chat.lastMessageRecvTimestamp) {
                        chat.lastMessageRecvTimestamp = toNumber(message.messageTimestamp);
                    }
                    if (
                        message.messageStubType === WAMessageStubType.BIZ_PRIVACY_MODE_TO_BSP ||
                        (message.messageStubType === WAMessageStubType.BIZ_PRIVACY_MODE_TO_FB &&
                            message.messageStubParameters?.[0])
                    ) {
                        contacts.push({
                            id: message.key.participant || message.key.remoteJid,
                            verifiedName: message.messageStubParameters?.[0],
                        });
                    }
                }
                chats.push({ ...chat });
            }
            break;
        case proto.HistorySync.HistorySyncType.PUSH_NAME:
            for (const c of item.pushnames) {
                contacts.push({ id: c.id, notify: c.pushname });
            }
            break;
    }
    return {
        chats: chats,
        contacts: contacts,
        messages: messages,
        syncType: item.syncType,
        progress: item.progress,
    };
};
const downloadAndProcessHistorySyncNotification = async (msg, options) => {
    let historyMsg;
    if (msg.initialHistBootstrapInlinePayload) {
        historyMsg = proto.HistorySync.decode(
            await inflatePromise(msg.initialHistBootstrapInlinePayload)
        );
    } else {
        historyMsg = await downloadHistory(msg, options);
    }
    return processHistoryMessage(historyMsg);
};
const getHistoryMsg = (message) => {
    const normalizedContent = !!message ? normalizeMessageContent(message) : undefined;
    const anyHistoryMsg = normalizedContent?.protocolMessage?.historySyncNotification;
    return anyHistoryMsg;
};
module.exports = {
    downloadHistory: downloadHistory,
    processHistoryMessage: processHistoryMessage,
    downloadAndProcessHistorySyncNotification: downloadAndProcessHistorySyncNotification,
    getHistoryMsg: getHistoryMsg,
};

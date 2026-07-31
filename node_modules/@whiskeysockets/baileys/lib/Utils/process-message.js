"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { proto: proto } = require("../../WAProto");
const { WAMessageStubType: WAMessageStubType } = require("../Types");
const {
    getDevice: getDevice,
    getContentType: getContentType,
    normalizeMessageContent: normalizeMessageContent,
} = require("../Utils");
const {
    areJidsSameUser: areJidsSameUser,
    isHostedLidUser: isHostedLidUser,
    isHostedPnUser: isHostedPnUser,
    isJidBroadcast: isJidBroadcast,
    isJidStatusBroadcast: isJidStatusBroadcast,
    isLidUser: isLidUser,
    jidDecode: jidDecode,
    jidEncode: jidEncode,
    jidNormalizedUser: jidNormalizedUser,
} = require("../WABinary");
const { aesDecryptGCM: aesDecryptGCM, hmacSign: hmacSign } = require("./crypto");
const { getKeyAuthor: getKeyAuthor, toNumber: toNumber } = require("./generics");
const {
    downloadAndProcessHistorySyncNotification: downloadAndProcessHistorySyncNotification,
} = require("./history");
const REAL_MSG_STUB_TYPES = new Set([
    WAMessageStubType.CALL_MISSED_GROUP_VIDEO,
    WAMessageStubType.CALL_MISSED_GROUP_VOICE,
    WAMessageStubType.CALL_MISSED_VIDEO,
    WAMessageStubType.CALL_MISSED_VOICE,
]);
const REAL_MSG_REQ_ME_STUB_TYPES = new Set([WAMessageStubType.GROUP_PARTICIPANT_ADD]);
const cleanMessage = (message, meId, meLid) => {
    if (isHostedPnUser(message.key.remoteJid) || isHostedLidUser(message.key.remoteJid)) {
        message.key.remoteJid = jidEncode(
            jidDecode(message.key?.remoteJid)?.user,
            isHostedPnUser(message.key.remoteJid) ? "s.whatsapp.net" : "lid"
        );
    } else {
        message.key.remoteJid = jidNormalizedUser(message.key.remoteJid);
    }
    if (isHostedPnUser(message.key.participant) || isHostedLidUser(message.key.participant)) {
        message.key.participant = jidEncode(
            jidDecode(message.key.participant)?.user,
            isHostedPnUser(message.key.participant) ? "s.whatsapp.net" : "lid"
        );
    } else {
        message.key.participant = jidNormalizedUser(message.key.participant);
    }
    const content = normalizeMessageContent(message.message);
    if (content?.reactionMessage) {
        normaliseKey(content.reactionMessage.key);
    }
    if (content?.pollUpdateMessage) {
        normaliseKey(content.pollUpdateMessage.pollCreationMessageKey);
    }
    function normaliseKey(msgKey) {
        if (!message.key.fromMe) {
            msgKey.fromMe = !msgKey.fromMe
                ? areJidsSameUser(msgKey.participant || msgKey.remoteJid, meId) ||
                  areJidsSameUser(msgKey.participant || msgKey.remoteJid, meLid)
                : false;
            msgKey.remoteJid = message.key.remoteJid;
            msgKey.participant = msgKey.participant || message.key.participant;
        }
    }
};
const isRealMessage = (message) => {
    const normalizedContent = normalizeMessageContent(message.message);
    const hasSomeContent = !!getContentType(normalizedContent);
    return (
        (!!normalizedContent ||
            REAL_MSG_STUB_TYPES.has(message.messageStubType) ||
            REAL_MSG_REQ_ME_STUB_TYPES.has(message.messageStubType)) &&
        hasSomeContent &&
        !normalizedContent?.protocolMessage &&
        !normalizedContent?.reactionMessage &&
        !normalizedContent?.pollUpdateMessage
    );
};
const shouldIncrementChatUnread = (message) => !message.key.fromMe && !message.messageStubType;
const getChatId = ({ remoteJid: remoteJid, participant: participant, fromMe: fromMe }) => {
    if (isJidBroadcast(remoteJid) && !isJidStatusBroadcast(remoteJid) && !fromMe) {
        return participant;
    }
    return remoteJid;
};
function decryptPollVote(
    { encPayload: encPayload, encIv: encIv },
    {
        pollCreatorJid: pollCreatorJid,
        pollMsgId: pollMsgId,
        pollEncKey: pollEncKey,
        voterJid: voterJid,
    }
) {
    const sign = Buffer.concat([
        toBinary(pollMsgId),
        toBinary(pollCreatorJid),
        toBinary(voterJid),
        toBinary("Poll Vote"),
        new Uint8Array([1]),
    ]);
    const key0 = hmacSign(pollEncKey, new Uint8Array(32), "sha256");
    const decKey = hmacSign(sign, key0, "sha256");
    const aad = toBinary(`${pollMsgId}\0${voterJid}`);
    const decrypted = aesDecryptGCM(encPayload, decKey, encIv, aad);
    return proto.Message.PollVoteMessage.decode(decrypted);
    function toBinary(txt) {
        return Buffer.from(txt);
    }
}
function decryptEventEdit(
    { encPayload: encPayload, encIv: encIv },
    {
        eventCreatorJid: eventCreatorJid,
        eventMsgId: eventMsgId,
        eventEncKey: eventEncKey,
        responderJid: responderJid,
    }
) {
    const sign = Buffer.concat([
        toBinary(eventMsgId),
        toBinary(eventCreatorJid),
        toBinary(responderJid),
        toBinary("Event Edit"),
        new Uint8Array([1]),
    ]);
    const key0 = hmacSign(eventEncKey, new Uint8Array(32), "sha256");
    const decKey = hmacSign(sign, key0, "sha256");
    const decrypted = aesDecryptGCM(encPayload, decKey, encIv, null);
    return proto.Message.decode(decrypted);
    function toBinary(txt) {
        return Buffer.from(txt);
    }
}
function decryptEventResponse(
    { encPayload: encPayload, encIv: encIv },
    {
        eventCreatorJid: eventCreatorJid,
        eventMsgId: eventMsgId,
        eventEncKey: eventEncKey,
        responderJid: responderJid,
    }
) {
    const sign = Buffer.concat([
        toBinary(eventMsgId),
        toBinary(eventCreatorJid),
        toBinary(responderJid),
        toBinary("Event Response"),
        new Uint8Array([1]),
    ]);
    const key0 = hmacSign(eventEncKey, new Uint8Array(32), "sha256");
    const decKey = hmacSign(sign, key0, "sha256");
    const aad = toBinary(`${eventMsgId}\0${responderJid}`);
    const decrypted = aesDecryptGCM(encPayload, decKey, encIv, aad);
    return proto.Message.EventResponseMessage.decode(decrypted);
    function toBinary(txt) {
        return Buffer.from(txt);
    }
}
function decryptComment(
    { encPayload: encPayload, encIv: encIv },
    {
        commentCreatorJid: commentCreatorJid,
        commentMsgId: commentMsgId,
        commentEncKey: commentEncKey,
        commentJid: commentJid,
    }
) {
    const sign = Buffer.concat([
        toBinary(commentMsgId),
        toBinary(commentCreatorJid),
        toBinary(commentJid),
        toBinary("Enc Comment"),
        new Uint8Array([1]),
    ]);
    const key0 = hmacSign(commentEncKey, new Uint8Array(32), "sha256");
    const decKey = hmacSign(sign, key0, "sha256");
    const decrypted = aesDecryptGCM(encPayload, decKey, encIv, null);
    return proto.Message.decode(decrypted);
    function toBinary(txt) {
        return Buffer.from(txt);
    }
}
function decryptReaction(
    { encPayload: encPayload, encIv: encIv },
    {
        reactionCreatorJid: reactionCreatorJid,
        reactionMsgId: reactionMsgId,
        reactionEncKey: reactionEncKey,
        reactionJid: reactionJid,
    }
) {
    const sign = Buffer.concat([
        toBinary(reactionMsgId),
        toBinary(reactionCreatorJid),
        toBinary(reactionJid),
        toBinary("Enc Reaction"),
        new Uint8Array([1]),
    ]);
    const key0 = hmacSign(reactionEncKey, new Uint8Array(32), "sha256");
    const decKey = hmacSign(sign, key0, "sha256");
    const decrypted = aesDecryptGCM(encPayload, decKey, encIv, null);
    return proto.Message.ReactionMessage.decode(decrypted);
    function toBinary(txt) {
        return Buffer.from(txt);
    }
}
const processMessage = async (
    message,
    {
        shouldProcessHistoryMsg: shouldProcessHistoryMsg,
        placeholderResendCache: placeholderResendCache,
        ev: ev,
        creds: creds,
        signalRepository: signalRepository,
        keyStore: keyStore,
        logger: logger,
        options: options,
        getMessage: getMessage,
    }
) => {
    const meId = creds.me.id;
    const meLid = creds.me.lid;
    const { accountSettings: accountSettings } = creds;
    const chat = { id: jidNormalizedUser(getChatId(message.key)) };
    const isRealMsg = isRealMessage(message);
    if (isRealMsg) {
        chat.messages = [{ message: message }];
        chat.conversationTimestamp = toNumber(message.messageTimestamp);
        if (shouldIncrementChatUnread(message)) {
            chat.unreadCount = (chat.unreadCount || 0) + 1;
        }
    }
    const content = normalizeMessageContent(message.message);
    if (isRealMsg || (content?.reactionMessage?.key?.fromMe && accountSettings?.unarchiveChats)) {
        chat.archived = false;
        chat.readOnly = false;
    }
    const protocolMsg = content?.protocolMessage;
    if (protocolMsg) {
        switch (protocolMsg.type) {
            case proto.Message.ProtocolMessage.Type.HISTORY_SYNC_NOTIFICATION:
                const histNotification = protocolMsg.historySyncNotification;
                const process = shouldProcessHistoryMsg;
                const isLatest = !creds.processedHistoryMessages?.length;
                logger?.info(
                    {
                        histNotification: histNotification,
                        process: process,
                        id: message.key.id,
                        isLatest: isLatest,
                    },
                    "got history notification"
                );
                if (process) {
                    if (histNotification.syncType !== proto.HistorySync.HistorySyncType.ON_DEMAND) {
                        ev.emit("creds.update", {
                            processedHistoryMessages: [
                                ...(creds.processedHistoryMessages || []),
                                {
                                    key: message.key,
                                    messageTimestamp: message.messageTimestamp,
                                },
                            ],
                        });
                    }
                    const data = await downloadAndProcessHistorySyncNotification(
                        histNotification,
                        options
                    );
                    ev.emit("messaging-history.set", {
                        ...data,
                        isLatest:
                            histNotification.syncType !==
                            proto.HistorySync.HistorySyncType.ON_DEMAND
                                ? isLatest
                                : undefined,
                        peerDataRequestSessionId: histNotification.peerDataRequestSessionId,
                    });
                }
                break;
            case proto.Message.ProtocolMessage.Type.APP_STATE_SYNC_KEY_SHARE:
                const keys = protocolMsg.appStateSyncKeyShare.keys;
                if (keys?.length) {
                    let newAppStateSyncKeyId = "";
                    await keyStore.transaction(async () => {
                        const newKeys = [];
                        for (const { keyData: keyData, keyId: keyId } of keys) {
                            const strKeyId = Buffer.from(keyId.keyId).toString("base64");
                            newKeys.push(strKeyId);
                            await keyStore.set({
                                "app-state-sync-key": { [strKeyId]: keyData },
                            });
                            newAppStateSyncKeyId = strKeyId;
                        }
                        logger?.info(
                            { newAppStateSyncKeyId: newAppStateSyncKeyId, newKeys: newKeys },
                            "injecting new app state sync keys"
                        );
                    }, meId);
                    ev.emit("creds.update", { myAppStateKeyId: newAppStateSyncKeyId });
                } else {
                    logger?.info({ protocolMsg: protocolMsg }, "recv app state sync with 0 keys");
                }
                break;
            case proto.Message.ProtocolMessage.Type.REVOKE:
                ev.emit("messages.update", [
                    {
                        key: { ...message.key, id: protocolMsg.key.id },
                        update: {
                            message: null,
                            messageStubType: WAMessageStubType.REVOKE,
                            key: message.key,
                        },
                    },
                ]);
                break;
            case proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING:
                Object.assign(chat, {
                    ephemeralSettingTimestamp: toNumber(message.messageTimestamp),
                    ephemeralExpiration: protocolMsg.ephemeralExpiration || null,
                });
                break;
            case proto.Message.ProtocolMessage.Type.PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE:
                const response = protocolMsg.peerDataOperationRequestResponseMessage;
                if (response) {
                    await placeholderResendCache?.del(response.stanzaId);
                    const { peerDataOperationResult: peerDataOperationResult } = response;
                    for (const result of peerDataOperationResult) {
                        const { placeholderMessageResendResponse: retryResponse } = result;
                        if (retryResponse) {
                            const webMessageInfo = proto.WebMessageInfo.decode(
                                retryResponse.webMessageInfoBytes
                            );
                            setTimeout(() => {
                                ev.emit("messages.upsert", {
                                    messages: [webMessageInfo],
                                    type: "notify",
                                    requestId: response.stanzaId,
                                });
                            }, 500);
                        }
                    }
                }
                break;
            case proto.Message.ProtocolMessage.Type.MESSAGE_EDIT:
                ev.emit("messages.update", [
                    {
                        key: { ...message.key, id: protocolMsg.key?.id },
                        update: {
                            message: {
                                editedMessage: { message: protocolMsg.editedMessage },
                            },
                            messageTimestamp: protocolMsg.timestampMs
                                ? Math.floor(toNumber(protocolMsg.timestampMs) / 1e3)
                                : message.messageTimestamp,
                        },
                    },
                ]);
                break;
            case proto.Message.ProtocolMessage.Type.GROUP_MEMBER_LABEL_CHANGE:
                const labelAssociationMsg = protocolMsg.memberLabel;
                if (labelAssociationMsg?.label) {
                    ev.emit("group.member-tag.update", {
                        groupId: chat.id,
                        label: labelAssociationMsg.label,
                        participant: message.key.participant,
                        participantAlt: message.key.participantAlt,
                        messageTimestamp: Number(message.messageTimestamp),
                    });
                }
                break;
            case proto.Message.ProtocolMessage.Type.LID_MIGRATION_MAPPING_SYNC:
                const encodedPayload =
                    protocolMsg.lidMigrationMappingSyncMessage?.encodedMappingPayload;
                const {
                    pnToLidMappings: pnToLidMappings,
                    chatDbMigrationTimestamp: chatDbMigrationTimestamp,
                } = proto.LIDMigrationMappingSyncPayload.decode(encodedPayload);
                logger?.debug(
                    {
                        pnToLidMappings: pnToLidMappings,
                        chatDbMigrationTimestamp: chatDbMigrationTimestamp,
                    },
                    "got lid mappings and chat db migration timestamp"
                );
                const pairs = [];
                for (const {
                    pn: pn,
                    latestLid: latestLid,
                    assignedLid: assignedLid,
                } of pnToLidMappings) {
                    const lid = latestLid || assignedLid;
                    pairs.push({ lid: `${lid}@lid`, pn: `${pn}@s.whatsapp.net` });
                }
                await signalRepository.lidMapping.storeLIDPNMappings(pairs);
                if (pairs.length) {
                    for (const { pn: pn, lid: lid } of pairs) {
                        await signalRepository.migrateSession(pn, lid);
                    }
                }
                break;
            case proto.Message.ProtocolMessage.Type.LIMIT_SHARING:
                ev.emit("limit-sharing.update", {
                    id: message.key.remoteJid,
                    author: areJidsSameUser(message.key.remoteJid, protocolMsg.key.remoteJid)
                        ? jidNormalizedUser(meId)
                        : message.key.remoteJid,
                    action: `${protocolMsg.limitSharing.sharingLimited ? "on" : "off"}`,
                    trigger: protocolMsg.limitSharing.trigger,
                    update_time: protocolMsg.limitSharing.limitSharingSettingTimestamp,
                });
                break;
        }
    } else if (content?.reactionMessage) {
        const reaction = { ...content.reactionMessage, key: message.key };
        ev.emit("messages.reaction", [{ reaction: reaction, key: content.reactionMessage?.key }]);
    } else if (message.messageStubType) {
        const jid = message.key?.remoteJid;
        let participants;
        const emitParticipantsUpdate = (action) =>
            ev.emit("group-participants.update", {
                id: jid,
                author: message.key.participant,
                authorPn: message.key.participantAlt,
                participants: participants,
                action: action,
            });
        const emitGroupUpdate = (update) => {
            ev.emit("groups.update", [
                {
                    id: jid,
                    ...update,
                    author: message.key.participant ?? undefined,
                    authorPn: message.key.participantAlt,
                },
            ]);
        };
        const emitGroupRequestJoin = (participant, action, method) => {
            ev.emit("group.join-request", {
                id: jid,
                author: message.key.participant,
                authorPn: message.key.participantAlt,
                participant: participant.lid,
                participantPn: participant.pn,
                action: action,
                method: method,
            });
        };
        const participantsIncludesMe = () =>
            participants.find((jid) => areJidsSameUser(meId, jid.phoneNumber));
        switch (message.messageStubType) {
            case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_NUMBER:
                participants = message.messageStubParameters.map((a) => JSON.parse(a)) || [];
                emitParticipantsUpdate("modify");
                break;
            case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
                participants = message.messageStubParameters.map((a) => JSON.parse(a)) || [];
                emitParticipantsUpdate("remove");
                if (participantsIncludesMe()) {
                    chat.readOnly = true;
                }
                break;
            case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            case WAMessageStubType.GROUP_PARTICIPANT_INVITE:
            case WAMessageStubType.GROUP_PARTICIPANT_ADD_REQUEST_JOIN:
                participants = message.messageStubParameters.map((a) => JSON.parse(a)) || [];
                if (participantsIncludesMe()) {
                    chat.readOnly = false;
                }
                emitParticipantsUpdate("add");
                break;
            case WAMessageStubType.GROUP_PARTICIPANT_DEMOTE:
                participants = message.messageStubParameters.map((a) => JSON.parse(a)) || [];
                emitParticipantsUpdate("demote");
                break;
            case WAMessageStubType.GROUP_PARTICIPANT_PROMOTE:
                participants = message.messageStubParameters.map((a) => JSON.parse(a)) || [];
                emitParticipantsUpdate("promote");
                break;
            case WAMessageStubType.GROUP_CHANGE_ANNOUNCE:
                const announceValue = message.messageStubParameters?.[0];
                emitGroupUpdate({
                    announce: announceValue === "true" || announceValue === "on",
                });
                break;
            case WAMessageStubType.GROUP_CHANGE_RESTRICT:
                const restrictValue = message.messageStubParameters?.[0];
                emitGroupUpdate({
                    restrict: restrictValue === "true" || restrictValue === "on",
                });
                break;
            case WAMessageStubType.GROUP_CHANGE_SUBJECT:
                const name = message.messageStubParameters?.[0];
                chat.name = name;
                emitGroupUpdate({ subject: name });
                break;
            case WAMessageStubType.GROUP_CHANGE_DESCRIPTION:
                const description = message.messageStubParameters?.[0];
                chat.description = description;
                emitGroupUpdate({ desc: description });
                break;
            case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
                const code = message.messageStubParameters?.[0];
                emitGroupUpdate({ inviteCode: code });
                break;
            case WAMessageStubType.GROUP_MEMBER_ADD_MODE:
                const memberAddValue = message.messageStubParameters?.[0];
                emitGroupUpdate({ memberAddMode: memberAddValue === "all_member_add" });
                break;
            case WAMessageStubType.GROUP_MEMBERSHIP_JOIN_APPROVAL_MODE:
                const approvalMode = message.messageStubParameters?.[0];
                emitGroupUpdate({ joinApprovalMode: approvalMode === "on" });
                break;
            case WAMessageStubType.GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD:
                const participant = JSON.parse(message.messageStubParameters?.[0]);
                const action = message.messageStubParameters?.[1];
                const method = message.messageStubParameters?.[2];
                emitGroupRequestJoin(participant, action, method);
                break;
        }
    } else if (content?.pollUpdateMessage) {
        const pollUpdate = content.pollUpdateMessage;
        const creationMsgKey = pollUpdate.pollCreationMessageKey;
        const pollMsg = await getMessage(creationMsgKey);
        if (pollMsg) {
            try {
                const meLidNormalised = jidNormalizedUser(meLid);
                const deviceType = getDevice(creationMsgKey.id);
                const pollCreationFromMe = deviceType === "baileys" ? true : false;
                const pollEncKey = pollMsg.messageContextInfo?.messageSecret;
                const voterJid = getKeyAuthor(message.key, meLidNormalised);
                let pollCreatorJid = getKeyAuthor(creationMsgKey, meLidNormalised);
                if (pollCreationFromMe) {
                    pollCreatorJid = meLidNormalised;
                }
                if (!pollEncKey) {
                    logger?.warn(
                        { vote: pollUpdate.vote, creationMsgKey: creationMsgKey },
                        "poll creation: missing messageSecret for decryption"
                    );
                } else {
                    const voteMsg = decryptPollVote(pollUpdate.vote, {
                        pollEncKey: pollEncKey,
                        pollCreatorJid: pollCreatorJid,
                        pollMsgId: creationMsgKey.id,
                        voterJid: voterJid,
                    });
                    ev.emit("messages.update", [
                        {
                            key: creationMsgKey,
                            update: {
                                pollUpdates: [
                                    {
                                        pollUpdateMessageKey: message.key,
                                        vote: voteMsg,
                                        senderTimestampMs:
                                            content.pollUpdateMessage.senderTimestampMs.toNumber(),
                                    },
                                ],
                            },
                        },
                    ]);
                }
            } catch (err) {
                logger?.warn(
                    { err: err, creationMsgKey: creationMsgKey },
                    "failed to decrypt poll vote"
                );
            }
        } else {
            logger?.warn(
                { creationMsgKey: creationMsgKey },
                "poll creation message not found, cannot decrypt update"
            );
        }
    } else if (content?.secretEncryptedMessage) {
        const encEventEdit = content.secretEncryptedMessage;
        const creationMsgKey = encEventEdit.targetMessageKey;
        if (
            proto.Message.SecretEncryptedMessage.SecretEncType[encEventEdit.secretEncType] !==
            "EVENT_EDIT"
        )
            return;
        const eventMsg = await getMessage(creationMsgKey);
        if (eventMsg) {
            try {
                const meLidNormalised = jidNormalizedUser(meLid);
                const eventCreatorJid = getKeyAuthor(message.key, meLidNormalised);
                const responderJid = getKeyAuthor(message.key, meLidNormalised);
                const eventEncKey = eventMsg.messageContextInfo?.messageSecret;
                if (!eventEncKey) {
                    logger?.warn(
                        { encEventEdit: encEventEdit, creationMsgKey: creationMsgKey },
                        "event edit: missing messageSecret for decryption"
                    );
                } else {
                    const responseMsg = decryptEventEdit(encEventEdit, {
                        eventEncKey: eventEncKey,
                        eventCreatorJid: eventCreatorJid,
                        eventMsgId: creationMsgKey.id,
                        responderJid: responderJid,
                    });
                    const content = normalizeMessageContent(responseMsg);
                    const protocolMsg = content?.protocolMessage;
                    ev.emit("messages.update", [
                        {
                            key: { ...message.key, id: protocolMsg.key?.id },
                            update: {
                                message: {
                                    messageContextInfo: responseMsg.messageContextInfo,
                                    editedMessage: { message: protocolMsg.editedMessage },
                                },
                                messageTimestamp: protocolMsg.timestampMs
                                    ? Math.floor(toNumber(protocolMsg.timestampMs) / 1e3)
                                    : message.messageTimestamp,
                            },
                        },
                    ]);
                }
            } catch (err) {
                logger?.warn(
                    {
                        err: err,
                        creationMsgKey: creationMsgKey,
                        encEventEdit: encEventEdit,
                    },
                    "failed to decrypt event edit"
                );
            }
        } else {
            logger?.warn(
                { encEventEdit: encEventEdit, creationMsgKey: creationMsgKey },
                "event creation message not found, cannot decrypt update"
            );
        }
    } else if (content?.encEventResponseMessage) {
        const encEventResponse = content.encEventResponseMessage;
        const creationMsgKey = encEventResponse.eventCreationMessageKey;
        const eventMsg = await getMessage(creationMsgKey);
        if (eventMsg) {
            try {
                const meLidNormalised = jidNormalizedUser(meLid);
                const eventCreatorJid = getKeyAuthor(creationMsgKey, meLidNormalised);
                const responderJid = getKeyAuthor(message.key, meLidNormalised);
                const eventEncKey = eventMsg.messageContextInfo?.messageSecret;
                if (!eventEncKey) {
                    logger?.warn(
                        {
                            encEventResponse: encEventResponse,
                            creationMsgKey: creationMsgKey,
                        },
                        "event response: missing messageSecret for decryption"
                    );
                } else {
                    const responseMsg = decryptEventResponse(encEventResponse, {
                        eventEncKey: eventEncKey,
                        eventCreatorJid: eventCreatorJid,
                        eventMsgId: creationMsgKey.id,
                        responderJid: responderJid,
                    });
                    const eventResponse = {
                        eventResponseMessageKey: message.key,
                        senderTimestampMs: responseMsg.timestampMs,
                        response: responseMsg,
                    };
                    ev.emit("messages.update", [
                        {
                            key: creationMsgKey,
                            update: { eventResponses: [eventResponse] },
                        },
                    ]);
                }
            } catch (err) {
                logger?.warn(
                    {
                        err: err,
                        creationMsgKey: creationMsgKey,
                        encEventResponse: encEventResponse,
                    },
                    "failed to decrypt event response"
                );
            }
        } else {
            logger?.warn(
                { encEventResponse: encEventResponse, creationMsgKey: creationMsgKey },
                "event creation message not found, cannot decrypt update"
            );
        }
    } else if (content?.encCommentMessage) {
        const encComment = content.encCommentMessage;
        const creationMsgKey = encComment.targetMessageKey;
        const commentMsg = await getMessage(creationMsgKey);
        if (commentMsg) {
            try {
                const meLidNormalised = jidNormalizedUser(meLid);
                const commentCreatorJid = creationMsgKey.participant
                    ? creationMsgKey.participant
                    : message.key?.participant
                      ? message.key.participant
                      : meLidNormalised;
                const commentJid = message.key?.participant
                    ? message.key.participant
                    : creationMsgKey.participant
                      ? creationMsgKey.participant
                      : meLidNormalised;
                const commentEncKey = commentMsg.messageContextInfo?.messageSecret;
                if (!commentEncKey) {
                    logger?.warn(
                        { encComment: encComment, creationMsgKey: creationMsgKey },
                        "comment message: missing messageSecret for decryption"
                    );
                } else {
                    const responseMsg = decryptComment(encComment, {
                        commentEncKey: commentEncKey,
                        commentCreatorJid: commentCreatorJid,
                        commentMsgId: creationMsgKey.id,
                        commentJid: commentJid,
                    });
                    ev.emit("messages.upsert", {
                        messages: [{ key: message.key, message: responseMsg }],
                        type: "append",
                    });
                }
            } catch (err) {
                logger?.warn(
                    { err: err, creationMsgKey: creationMsgKey, encComment: encComment },
                    "failed to decrypt comment message"
                );
            }
        } else {
            logger?.warn(
                { encComment: encComment, creationMsgKey: creationMsgKey },
                "creation message not found, cannot decrypt"
            );
        }
    } else if (content?.encReactionMessage) {
        const encReaction = content.encReactionMessage;
        const creationMsgKey = encReaction.targetMessageKey;
        const reactMsg = await getMessage(creationMsgKey);
        if (reactMsg) {
            try {
                const meLidNormalised = jidNormalizedUser(meLid);
                const reactionCreatorJid = creationMsgKey.participant
                    ? creationMsgKey.participant
                    : message.key?.participant
                      ? message.key.participant
                      : meLidNormalised;
                const reactionJid = message.key?.participant
                    ? message.key.participant
                    : creationMsgKey.participant
                      ? creationMsgKey.participant
                      : meLidNormalised;
                const reactionEncKey = reactMsg.messageContextInfo?.messageSecret;
                if (!reactionEncKey) {
                    logger?.warn(
                        { encReaction: encReaction, creationMsgKey: creationMsgKey },
                        "reaction: missing messageSecret for decryption"
                    );
                } else {
                    const responseMsg = decryptReaction(encReaction, {
                        reactionEncKey: reactionEncKey,
                        reactionCreatorJid: reactionCreatorJid,
                        reactionMsgId: creationMsgKey.id,
                        reactionJid: reactionJid,
                    });
                    const Reaction = {
                        key: message.key,
                        message: {
                            reactionMessage: {
                                key: creationMsgKey,
                                text: responseMsg.text,
                                senderTimestampMs: responseMsg.senderTimestampMs,
                            },
                        },
                    };
                    ev.emit("messages.upsert", { messages: [Reaction], type: "append" });
                }
            } catch (err) {
                logger?.warn(
                    {
                        err: err,
                        creationMsgKey: creationMsgKey,
                        encReaction: encReaction,
                    },
                    "failed to decrypt reaction"
                );
            }
        } else {
            logger?.warn(
                { encReaction: encReaction, creationMsgKey: creationMsgKey },
                "creation message not found, cannot decrypt"
            );
        }
    }
    if (Object.keys(chat).length > 1) {
        ev.emit("chats.update", [chat]);
    }
};
module.exports = {
    cleanMessage: cleanMessage,
    isRealMessage: isRealMessage,
    shouldIncrementChatUnread: shouldIncrementChatUnread,
    getChatId: getChatId,
    decryptPollVote: decryptPollVote,
    decryptEventEdit: decryptEventEdit,
    decryptEventResponse: decryptEventResponse,
    decryptComment: decryptComment,
    decryptReaction: decryptReaction,
    processMessage: processMessage,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { LRUCache: LRUCache } = require("lru-cache");
const RECENT_MESSAGES_SIZE = 512;
const MESSAGE_KEY_SEPARATOR = "\0";
const RECREATE_SESSION_TIMEOUT = 60 * 60 * 1e3;
const PHONE_REQUEST_DELAY = 3e3;
class MessageRetryManager {
    constructor(logger, maxMsgRetryCount) {
        this.logger = logger;
        this.recentMessagesMap = new LRUCache({
            max: RECENT_MESSAGES_SIZE,
            ttl: 5 * 60 * 1e3,
            ttlAutopurge: true,
            dispose: (_value, key) => {
                const separatorIndex = key.lastIndexOf(MESSAGE_KEY_SEPARATOR);
                if (separatorIndex > -1) {
                    const messageId = key.slice(separatorIndex + MESSAGE_KEY_SEPARATOR.length);
                    this.messageKeyIndex.delete(messageId);
                }
            },
        });
        this.messageKeyIndex = new Map();
        this.sessionRecreateHistory = new LRUCache({
            ttl: RECREATE_SESSION_TIMEOUT * 2,
            ttlAutopurge: true,
        });
        this.retryCounters = new LRUCache({
            ttl: 15 * 60 * 1e3,
            ttlAutopurge: true,
            updateAgeOnGet: true,
        });
        this.pendingPhoneRequests = {};
        this.maxMsgRetryCount = 5;
        this.statistics = {
            totalRetries: 0,
            successfulRetries: 0,
            failedRetries: 0,
            mediaRetries: 0,
            sessionRecreations: 0,
            phoneRequests: 0,
        };
        this.maxMsgRetryCount = maxMsgRetryCount;
    }
    addRecentMessage(to, id, message) {
        const key = { to: to, id: id };
        const keyStr = this.keyToString(key);
        this.recentMessagesMap.set(keyStr, {
            message: message,
            timestamp: Date.now(),
        });
        this.messageKeyIndex.set(id, keyStr);
        this.logger.debug(`Added message to retry cache: ${to}/${id}`);
    }
    getRecentMessage(to, id) {
        const key = { to: to, id: id };
        const keyStr = this.keyToString(key);
        return this.recentMessagesMap.get(keyStr);
    }
    shouldRecreateSession(jid, retryCount, hasSession) {
        if (!hasSession) {
            this.sessionRecreateHistory.set(jid, Date.now());
            this.statistics.sessionRecreations++;
            return {
                reason: "we don't have a Signal session with them",
                recreate: true,
            };
        }
        if (retryCount < 2) {
            return { reason: "", recreate: false };
        }
        const now = Date.now();
        const prevTime = this.sessionRecreateHistory.get(jid);
        if (!prevTime || now - prevTime > RECREATE_SESSION_TIMEOUT) {
            this.sessionRecreateHistory.set(jid, now);
            this.statistics.sessionRecreations++;
            return {
                reason: "retry count > 1 and over an hour since last recreation",
                recreate: true,
            };
        }
        return { reason: "", recreate: false };
    }
    incrementRetryCount(messageId) {
        this.retryCounters.set(messageId, (this.retryCounters.get(messageId) || 0) + 1);
        this.statistics.totalRetries++;
        return this.retryCounters.get(messageId);
    }
    getRetryCount(messageId) {
        return this.retryCounters.get(messageId) || 0;
    }
    hasExceededMaxRetries(messageId) {
        return this.getRetryCount(messageId) >= this.maxMsgRetryCount;
    }
    markRetrySuccess(messageId) {
        this.statistics.successfulRetries++;
        this.retryCounters.delete(messageId);
        this.cancelPendingPhoneRequest(messageId);
        this.removeRecentMessage(messageId);
    }
    markRetryFailed(messageId) {
        this.statistics.failedRetries++;
        this.retryCounters.delete(messageId);
        this.cancelPendingPhoneRequest(messageId);
        this.removeRecentMessage(messageId);
    }
    schedulePhoneRequest(messageId, callback, delay = PHONE_REQUEST_DELAY) {
        this.cancelPendingPhoneRequest(messageId);
        this.pendingPhoneRequests[messageId] = setTimeout(() => {
            delete this.pendingPhoneRequests[messageId];
            this.statistics.phoneRequests++;
            callback();
        }, delay);
        this.logger.debug(`Scheduled phone request for message ${messageId} with ${delay}ms delay`);
    }
    cancelPendingPhoneRequest(messageId) {
        const timeout = this.pendingPhoneRequests[messageId];
        if (timeout) {
            clearTimeout(timeout);
            delete this.pendingPhoneRequests[messageId];
            this.logger.debug(`Cancelled pending phone request for message ${messageId}`);
        }
    }
    keyToString(key) {
        return `${key.to}${MESSAGE_KEY_SEPARATOR}${key.id}`;
    }
    removeRecentMessage(messageId) {
        const keyStr = this.messageKeyIndex.get(messageId);
        if (!keyStr) return;
        this.recentMessagesMap.delete(keyStr);
        this.messageKeyIndex.delete(messageId);
    }
}
module.exports = { MessageRetryManager: MessageRetryManager };

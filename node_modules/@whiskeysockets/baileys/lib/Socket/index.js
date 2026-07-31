"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DEFAULT_CONNECTION_CONFIG: DEFAULT_CONNECTION_CONFIG } = require("../Defaults/connection");
const { makeCommunitiesSocket: makeCommunitiesSocket } = require("./community");
const makeWASocket = (config) => {
    const newConfig = { ...DEFAULT_CONNECTION_CONFIG, ...config };
    if (config.shouldSyncHistoryMessage === undefined) {
        newConfig.shouldSyncHistoryMessage = () => !!newConfig.syncFullHistory;
    }
    return makeCommunitiesSocket(newConfig);
};
exports.default = makeWASocket;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Browsers: Browsers } = require("../Utils");
const { default: logger } = require("../Utils/logger");
const { makeLibSignalRepository: makeLibSignalRepository } = require("../Signal/libsignal");
const { version: version } = require("./vialeys-version.json");
const DEFAULT_CONNECTION_CONFIG = {
    version: version,
    browser: Browsers.windows("Chrome"),
    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
    connectTimeoutMs: 2e4,
    keepAliveIntervalMs: 3e4,
    logger: logger.child({ class: "baileys" }),
    printQRInTerminal: false,
    emitOwnEvents: true,
    defaultQueryTimeoutMs: 6e4,
    customUploadHosts: [],
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
    fireInitQueries: true,
    auth: undefined,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    patchMessageBeforeSending: (msg) => msg,
    shouldSyncHistoryMessage: () => true,
    shouldIgnoreJid: () => false,
    linkPreviewImageThumbnailWidth: 192,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3e3 },
    generateHighQualityLinkPreview: false,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true,
    options: {},
    appStateMacVerification: { patch: false, snapshot: false },
    countryCode: "US",
    getMessage: async () => undefined,
    cachedGroupMetadata: async () => undefined,
    makeSignalRepository: makeLibSignalRepository,
};
module.exports = { DEFAULT_CONNECTION_CONFIG: DEFAULT_CONNECTION_CONFIG };

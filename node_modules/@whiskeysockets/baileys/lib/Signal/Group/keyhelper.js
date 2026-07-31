"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { randomInt: randomInt, randomBytes: randomBytes } = require("crypto");
const { generateKeyPair: generateKeyPair } = require("libsignal/src/curve");
function generateSenderKey() {
    return randomBytes(32);
}
function generateSenderKeyId() {
    return randomInt(2147483647);
}
function generateSenderSigningKey(key) {
    if (!key) {
        key = generateKeyPair();
    }
    return { public: Buffer.from(key.pubKey), private: Buffer.from(key.privKey) };
}
module.exports = {
    generateSenderKey: generateSenderKey,
    generateSenderKeyId: generateSenderKeyId,
    generateSenderSigningKey: generateSenderSigningKey,
};

"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.CompanionReg = (function () {
    var CompanionReg = {};
    CompanionReg.ClientPairingProps = (function () {
        function ClientPairingProps(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ClientPairingProps.prototype.isChatDbLidMigrated = null;
        ClientPairingProps.prototype.isSyncdPureLidSession = null;
        ClientPairingProps.prototype.isSyncdSnapshotRecoveryEnabled = null;
        ClientPairingProps.prototype.isHsThumbnailSyncEnabled = null;
        var $oneOfFields;
        Object.defineProperty(ClientPairingProps.prototype, "_isChatDbLidMigrated", {
            get: $util.oneOfGetter(($oneOfFields = ["isChatDbLidMigrated"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ClientPairingProps.prototype, "_isSyncdPureLidSession", {
            get: $util.oneOfGetter(($oneOfFields = ["isSyncdPureLidSession"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ClientPairingProps.prototype, "_isSyncdSnapshotRecoveryEnabled", {
            get: $util.oneOfGetter(($oneOfFields = ["isSyncdSnapshotRecoveryEnabled"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ClientPairingProps.prototype, "_isHsThumbnailSyncEnabled", {
            get: $util.oneOfGetter(($oneOfFields = ["isHsThumbnailSyncEnabled"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ClientPairingProps.create = function create(properties) {
            return new ClientPairingProps(properties);
        };
        ClientPairingProps.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.isChatDbLidMigrated != null &&
                Object.hasOwnProperty.call(message, "isChatDbLidMigrated")
            )
                writer.uint32(8).bool(message.isChatDbLidMigrated);
            if (
                message.isSyncdPureLidSession != null &&
                Object.hasOwnProperty.call(message, "isSyncdPureLidSession")
            )
                writer.uint32(16).bool(message.isSyncdPureLidSession);
            if (
                message.isSyncdSnapshotRecoveryEnabled != null &&
                Object.hasOwnProperty.call(message, "isSyncdSnapshotRecoveryEnabled")
            )
                writer.uint32(24).bool(message.isSyncdSnapshotRecoveryEnabled);
            if (
                message.isHsThumbnailSyncEnabled != null &&
                Object.hasOwnProperty.call(message, "isHsThumbnailSyncEnabled")
            )
                writer.uint32(32).bool(message.isHsThumbnailSyncEnabled);
            return writer;
        };
        ClientPairingProps.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ClientPairingProps.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.ClientPairingProps();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.isChatDbLidMigrated = reader.bool();
                        break;
                    }
                    case 2: {
                        message.isSyncdPureLidSession = reader.bool();
                        break;
                    }
                    case 3: {
                        message.isSyncdSnapshotRecoveryEnabled = reader.bool();
                        break;
                    }
                    case 4: {
                        message.isHsThumbnailSyncEnabled = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ClientPairingProps.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ClientPairingProps.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.isChatDbLidMigrated != null &&
                message.hasOwnProperty("isChatDbLidMigrated")
            ) {
                properties._isChatDbLidMigrated = 1;
                if (typeof message.isChatDbLidMigrated !== "boolean")
                    return "isChatDbLidMigrated: boolean expected";
            }
            if (
                message.isSyncdPureLidSession != null &&
                message.hasOwnProperty("isSyncdPureLidSession")
            ) {
                properties._isSyncdPureLidSession = 1;
                if (typeof message.isSyncdPureLidSession !== "boolean")
                    return "isSyncdPureLidSession: boolean expected";
            }
            if (
                message.isSyncdSnapshotRecoveryEnabled != null &&
                message.hasOwnProperty("isSyncdSnapshotRecoveryEnabled")
            ) {
                properties._isSyncdSnapshotRecoveryEnabled = 1;
                if (typeof message.isSyncdSnapshotRecoveryEnabled !== "boolean")
                    return "isSyncdSnapshotRecoveryEnabled: boolean expected";
            }
            if (
                message.isHsThumbnailSyncEnabled != null &&
                message.hasOwnProperty("isHsThumbnailSyncEnabled")
            ) {
                properties._isHsThumbnailSyncEnabled = 1;
                if (typeof message.isHsThumbnailSyncEnabled !== "boolean")
                    return "isHsThumbnailSyncEnabled: boolean expected";
            }
            return null;
        };
        ClientPairingProps.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.ClientPairingProps) return object;
            var message = new $root.CompanionReg.ClientPairingProps();
            if (object.isChatDbLidMigrated != null)
                message.isChatDbLidMigrated = Boolean(object.isChatDbLidMigrated);
            if (object.isSyncdPureLidSession != null)
                message.isSyncdPureLidSession = Boolean(object.isSyncdPureLidSession);
            if (object.isSyncdSnapshotRecoveryEnabled != null)
                message.isSyncdSnapshotRecoveryEnabled = Boolean(
                    object.isSyncdSnapshotRecoveryEnabled
                );
            if (object.isHsThumbnailSyncEnabled != null)
                message.isHsThumbnailSyncEnabled = Boolean(object.isHsThumbnailSyncEnabled);
            return message;
        };
        ClientPairingProps.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.isChatDbLidMigrated != null &&
                message.hasOwnProperty("isChatDbLidMigrated")
            ) {
                object.isChatDbLidMigrated = message.isChatDbLidMigrated;
                if (options.oneofs) object._isChatDbLidMigrated = "isChatDbLidMigrated";
            }
            if (
                message.isSyncdPureLidSession != null &&
                message.hasOwnProperty("isSyncdPureLidSession")
            ) {
                object.isSyncdPureLidSession = message.isSyncdPureLidSession;
                if (options.oneofs) object._isSyncdPureLidSession = "isSyncdPureLidSession";
            }
            if (
                message.isSyncdSnapshotRecoveryEnabled != null &&
                message.hasOwnProperty("isSyncdSnapshotRecoveryEnabled")
            ) {
                object.isSyncdSnapshotRecoveryEnabled = message.isSyncdSnapshotRecoveryEnabled;
                if (options.oneofs)
                    object._isSyncdSnapshotRecoveryEnabled = "isSyncdSnapshotRecoveryEnabled";
            }
            if (
                message.isHsThumbnailSyncEnabled != null &&
                message.hasOwnProperty("isHsThumbnailSyncEnabled")
            ) {
                object.isHsThumbnailSyncEnabled = message.isHsThumbnailSyncEnabled;
                if (options.oneofs) object._isHsThumbnailSyncEnabled = "isHsThumbnailSyncEnabled";
            }
            return object;
        };
        ClientPairingProps.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ClientPairingProps.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.ClientPairingProps";
        };
        return ClientPairingProps;
    })();
    CompanionReg.EncryptedPairingRequest = (function () {
        function EncryptedPairingRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        EncryptedPairingRequest.prototype.encryptedPayload = null;
        EncryptedPairingRequest.prototype.iv = null;
        var $oneOfFields;
        Object.defineProperty(EncryptedPairingRequest.prototype, "_encryptedPayload", {
            get: $util.oneOfGetter(($oneOfFields = ["encryptedPayload"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(EncryptedPairingRequest.prototype, "_iv", {
            get: $util.oneOfGetter(($oneOfFields = ["iv"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        EncryptedPairingRequest.create = function create(properties) {
            return new EncryptedPairingRequest(properties);
        };
        EncryptedPairingRequest.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.encryptedPayload != null &&
                Object.hasOwnProperty.call(message, "encryptedPayload")
            )
                writer.uint32(10).bytes(message.encryptedPayload);
            if (message.iv != null && Object.hasOwnProperty.call(message, "iv"))
                writer.uint32(18).bytes(message.iv);
            return writer;
        };
        EncryptedPairingRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        EncryptedPairingRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.EncryptedPairingRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.encryptedPayload = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.iv = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        EncryptedPairingRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        EncryptedPairingRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.encryptedPayload != null && message.hasOwnProperty("encryptedPayload")) {
                properties._encryptedPayload = 1;
                if (
                    !(
                        (message.encryptedPayload &&
                            typeof message.encryptedPayload.length === "number") ||
                        $util.isString(message.encryptedPayload)
                    )
                )
                    return "encryptedPayload: buffer expected";
            }
            if (message.iv != null && message.hasOwnProperty("iv")) {
                properties._iv = 1;
                if (
                    !(
                        (message.iv && typeof message.iv.length === "number") ||
                        $util.isString(message.iv)
                    )
                )
                    return "iv: buffer expected";
            }
            return null;
        };
        EncryptedPairingRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.EncryptedPairingRequest) return object;
            var message = new $root.CompanionReg.EncryptedPairingRequest();
            if (object.encryptedPayload != null)
                if (typeof object.encryptedPayload === "string")
                    $util.base64.decode(
                        object.encryptedPayload,
                        (message.encryptedPayload = $util.newBuffer(
                            $util.base64.length(object.encryptedPayload)
                        )),
                        0
                    );
                else if (object.encryptedPayload.length >= 0)
                    message.encryptedPayload = object.encryptedPayload;
            if (object.iv != null)
                if (typeof object.iv === "string")
                    $util.base64.decode(
                        object.iv,
                        (message.iv = $util.newBuffer($util.base64.length(object.iv))),
                        0
                    );
                else if (object.iv.length >= 0) message.iv = object.iv;
            return message;
        };
        EncryptedPairingRequest.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.encryptedPayload != null && message.hasOwnProperty("encryptedPayload")) {
                object.encryptedPayload =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.encryptedPayload,
                              0,
                              message.encryptedPayload.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.encryptedPayload)
                          : message.encryptedPayload;
                if (options.oneofs) object._encryptedPayload = "encryptedPayload";
            }
            if (message.iv != null && message.hasOwnProperty("iv")) {
                object.iv =
                    options.bytes === String
                        ? $util.base64.encode(message.iv, 0, message.iv.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.iv)
                          : message.iv;
                if (options.oneofs) object._iv = "iv";
            }
            return object;
        };
        EncryptedPairingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        EncryptedPairingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.EncryptedPairingRequest";
        };
        return EncryptedPairingRequest;
    })();
    CompanionReg.PairingRequest = (function () {
        function PairingRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        PairingRequest.prototype.companionPublicKey = null;
        PairingRequest.prototype.companionIdentityKey = null;
        PairingRequest.prototype.advSecret = null;
        var $oneOfFields;
        Object.defineProperty(PairingRequest.prototype, "_companionPublicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["companionPublicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PairingRequest.prototype, "_companionIdentityKey", {
            get: $util.oneOfGetter(($oneOfFields = ["companionIdentityKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PairingRequest.prototype, "_advSecret", {
            get: $util.oneOfGetter(($oneOfFields = ["advSecret"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        PairingRequest.create = function create(properties) {
            return new PairingRequest(properties);
        };
        PairingRequest.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.companionPublicKey != null &&
                Object.hasOwnProperty.call(message, "companionPublicKey")
            )
                writer.uint32(10).bytes(message.companionPublicKey);
            if (
                message.companionIdentityKey != null &&
                Object.hasOwnProperty.call(message, "companionIdentityKey")
            )
                writer.uint32(18).bytes(message.companionIdentityKey);
            if (message.advSecret != null && Object.hasOwnProperty.call(message, "advSecret"))
                writer.uint32(26).bytes(message.advSecret);
            return writer;
        };
        PairingRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        PairingRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.PairingRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.companionPublicKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.companionIdentityKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.advSecret = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        PairingRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        PairingRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.companionPublicKey != null &&
                message.hasOwnProperty("companionPublicKey")
            ) {
                properties._companionPublicKey = 1;
                if (
                    !(
                        (message.companionPublicKey &&
                            typeof message.companionPublicKey.length === "number") ||
                        $util.isString(message.companionPublicKey)
                    )
                )
                    return "companionPublicKey: buffer expected";
            }
            if (
                message.companionIdentityKey != null &&
                message.hasOwnProperty("companionIdentityKey")
            ) {
                properties._companionIdentityKey = 1;
                if (
                    !(
                        (message.companionIdentityKey &&
                            typeof message.companionIdentityKey.length === "number") ||
                        $util.isString(message.companionIdentityKey)
                    )
                )
                    return "companionIdentityKey: buffer expected";
            }
            if (message.advSecret != null && message.hasOwnProperty("advSecret")) {
                properties._advSecret = 1;
                if (
                    !(
                        (message.advSecret && typeof message.advSecret.length === "number") ||
                        $util.isString(message.advSecret)
                    )
                )
                    return "advSecret: buffer expected";
            }
            return null;
        };
        PairingRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.PairingRequest) return object;
            var message = new $root.CompanionReg.PairingRequest();
            if (object.companionPublicKey != null)
                if (typeof object.companionPublicKey === "string")
                    $util.base64.decode(
                        object.companionPublicKey,
                        (message.companionPublicKey = $util.newBuffer(
                            $util.base64.length(object.companionPublicKey)
                        )),
                        0
                    );
                else if (object.companionPublicKey.length >= 0)
                    message.companionPublicKey = object.companionPublicKey;
            if (object.companionIdentityKey != null)
                if (typeof object.companionIdentityKey === "string")
                    $util.base64.decode(
                        object.companionIdentityKey,
                        (message.companionIdentityKey = $util.newBuffer(
                            $util.base64.length(object.companionIdentityKey)
                        )),
                        0
                    );
                else if (object.companionIdentityKey.length >= 0)
                    message.companionIdentityKey = object.companionIdentityKey;
            if (object.advSecret != null)
                if (typeof object.advSecret === "string")
                    $util.base64.decode(
                        object.advSecret,
                        (message.advSecret = $util.newBuffer(
                            $util.base64.length(object.advSecret)
                        )),
                        0
                    );
                else if (object.advSecret.length >= 0) message.advSecret = object.advSecret;
            return message;
        };
        PairingRequest.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.companionPublicKey != null &&
                message.hasOwnProperty("companionPublicKey")
            ) {
                object.companionPublicKey =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.companionPublicKey,
                              0,
                              message.companionPublicKey.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.companionPublicKey)
                          : message.companionPublicKey;
                if (options.oneofs) object._companionPublicKey = "companionPublicKey";
            }
            if (
                message.companionIdentityKey != null &&
                message.hasOwnProperty("companionIdentityKey")
            ) {
                object.companionIdentityKey =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.companionIdentityKey,
                              0,
                              message.companionIdentityKey.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.companionIdentityKey)
                          : message.companionIdentityKey;
                if (options.oneofs) object._companionIdentityKey = "companionIdentityKey";
            }
            if (message.advSecret != null && message.hasOwnProperty("advSecret")) {
                object.advSecret =
                    options.bytes === String
                        ? $util.base64.encode(message.advSecret, 0, message.advSecret.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.advSecret)
                          : message.advSecret;
                if (options.oneofs) object._advSecret = "advSecret";
            }
            return object;
        };
        PairingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PairingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.PairingRequest";
        };
        return PairingRequest;
    })();
    CompanionReg.PrimaryEphemeralIdentity = (function () {
        function PrimaryEphemeralIdentity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        PrimaryEphemeralIdentity.prototype.publicKey = null;
        PrimaryEphemeralIdentity.prototype.nonce = null;
        var $oneOfFields;
        Object.defineProperty(PrimaryEphemeralIdentity.prototype, "_publicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["publicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PrimaryEphemeralIdentity.prototype, "_nonce", {
            get: $util.oneOfGetter(($oneOfFields = ["nonce"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        PrimaryEphemeralIdentity.create = function create(properties) {
            return new PrimaryEphemeralIdentity(properties);
        };
        PrimaryEphemeralIdentity.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(10).bytes(message.publicKey);
            if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                writer.uint32(18).bytes(message.nonce);
            return writer;
        };
        PrimaryEphemeralIdentity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        PrimaryEphemeralIdentity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.PrimaryEphemeralIdentity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.nonce = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        PrimaryEphemeralIdentity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        PrimaryEphemeralIdentity.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                properties._publicKey = 1;
                if (
                    !(
                        (message.publicKey && typeof message.publicKey.length === "number") ||
                        $util.isString(message.publicKey)
                    )
                )
                    return "publicKey: buffer expected";
            }
            if (message.nonce != null && message.hasOwnProperty("nonce")) {
                properties._nonce = 1;
                if (
                    !(
                        (message.nonce && typeof message.nonce.length === "number") ||
                        $util.isString(message.nonce)
                    )
                )
                    return "nonce: buffer expected";
            }
            return null;
        };
        PrimaryEphemeralIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.PrimaryEphemeralIdentity) return object;
            var message = new $root.CompanionReg.PrimaryEphemeralIdentity();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(
                        object.publicKey,
                        (message.publicKey = $util.newBuffer(
                            $util.base64.length(object.publicKey)
                        )),
                        0
                    );
                else if (object.publicKey.length >= 0) message.publicKey = object.publicKey;
            if (object.nonce != null)
                if (typeof object.nonce === "string")
                    $util.base64.decode(
                        object.nonce,
                        (message.nonce = $util.newBuffer($util.base64.length(object.nonce))),
                        0
                    );
                else if (object.nonce.length >= 0) message.nonce = object.nonce;
            return message;
        };
        PrimaryEphemeralIdentity.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                object.publicKey =
                    options.bytes === String
                        ? $util.base64.encode(message.publicKey, 0, message.publicKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.publicKey)
                          : message.publicKey;
                if (options.oneofs) object._publicKey = "publicKey";
            }
            if (message.nonce != null && message.hasOwnProperty("nonce")) {
                object.nonce =
                    options.bytes === String
                        ? $util.base64.encode(message.nonce, 0, message.nonce.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.nonce)
                          : message.nonce;
                if (options.oneofs) object._nonce = "nonce";
            }
            return object;
        };
        PrimaryEphemeralIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PrimaryEphemeralIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.PrimaryEphemeralIdentity";
        };
        return PrimaryEphemeralIdentity;
    })();
    CompanionReg.ProloguePayload = (function () {
        function ProloguePayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ProloguePayload.prototype.companionEphemeralIdentity = null;
        ProloguePayload.prototype.commitment = null;
        var $oneOfFields;
        Object.defineProperty(ProloguePayload.prototype, "_companionEphemeralIdentity", {
            get: $util.oneOfGetter(($oneOfFields = ["companionEphemeralIdentity"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ProloguePayload.prototype, "_commitment", {
            get: $util.oneOfGetter(($oneOfFields = ["commitment"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ProloguePayload.create = function create(properties) {
            return new ProloguePayload(properties);
        };
        ProloguePayload.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.companionEphemeralIdentity != null &&
                Object.hasOwnProperty.call(message, "companionEphemeralIdentity")
            )
                writer.uint32(10).bytes(message.companionEphemeralIdentity);
            if (message.commitment != null && Object.hasOwnProperty.call(message, "commitment"))
                $root.CompanionReg.CompanionCommitment.encode(
                    message.commitment,
                    writer.uint32(18).fork()
                ).ldelim();
            return writer;
        };
        ProloguePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ProloguePayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.ProloguePayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.companionEphemeralIdentity = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.commitment = $root.CompanionReg.CompanionCommitment.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ProloguePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ProloguePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.companionEphemeralIdentity != null &&
                message.hasOwnProperty("companionEphemeralIdentity")
            ) {
                properties._companionEphemeralIdentity = 1;
                if (
                    !(
                        (message.companionEphemeralIdentity &&
                            typeof message.companionEphemeralIdentity.length === "number") ||
                        $util.isString(message.companionEphemeralIdentity)
                    )
                )
                    return "companionEphemeralIdentity: buffer expected";
            }
            if (message.commitment != null && message.hasOwnProperty("commitment")) {
                properties._commitment = 1;
                {
                    var error = $root.CompanionReg.CompanionCommitment.verify(message.commitment);
                    if (error) return "commitment." + error;
                }
            }
            return null;
        };
        ProloguePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.ProloguePayload) return object;
            var message = new $root.CompanionReg.ProloguePayload();
            if (object.companionEphemeralIdentity != null)
                if (typeof object.companionEphemeralIdentity === "string")
                    $util.base64.decode(
                        object.companionEphemeralIdentity,
                        (message.companionEphemeralIdentity = $util.newBuffer(
                            $util.base64.length(object.companionEphemeralIdentity)
                        )),
                        0
                    );
                else if (object.companionEphemeralIdentity.length >= 0)
                    message.companionEphemeralIdentity = object.companionEphemeralIdentity;
            if (object.commitment != null) {
                if (typeof object.commitment !== "object")
                    throw TypeError(".CompanionReg.ProloguePayload.commitment: object expected");
                message.commitment = $root.CompanionReg.CompanionCommitment.fromObject(
                    object.commitment
                );
            }
            return message;
        };
        ProloguePayload.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.companionEphemeralIdentity != null &&
                message.hasOwnProperty("companionEphemeralIdentity")
            ) {
                object.companionEphemeralIdentity =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.companionEphemeralIdentity,
                              0,
                              message.companionEphemeralIdentity.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.companionEphemeralIdentity)
                          : message.companionEphemeralIdentity;
                if (options.oneofs)
                    object._companionEphemeralIdentity = "companionEphemeralIdentity";
            }
            if (message.commitment != null && message.hasOwnProperty("commitment")) {
                object.commitment = $root.CompanionReg.CompanionCommitment.toObject(
                    message.commitment,
                    options
                );
                if (options.oneofs) object._commitment = "commitment";
            }
            return object;
        };
        ProloguePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ProloguePayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.ProloguePayload";
        };
        return ProloguePayload;
    })();
    CompanionReg.CompanionCommitment = (function () {
        function CompanionCommitment(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        CompanionCommitment.prototype.hash = null;
        var $oneOfFields;
        Object.defineProperty(CompanionCommitment.prototype, "_hash", {
            get: $util.oneOfGetter(($oneOfFields = ["hash"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        CompanionCommitment.create = function create(properties) {
            return new CompanionCommitment(properties);
        };
        CompanionCommitment.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                writer.uint32(10).bytes(message.hash);
            return writer;
        };
        CompanionCommitment.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        CompanionCommitment.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.CompanionCommitment();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.hash = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        CompanionCommitment.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        CompanionCommitment.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.hash != null && message.hasOwnProperty("hash")) {
                properties._hash = 1;
                if (
                    !(
                        (message.hash && typeof message.hash.length === "number") ||
                        $util.isString(message.hash)
                    )
                )
                    return "hash: buffer expected";
            }
            return null;
        };
        CompanionCommitment.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.CompanionCommitment) return object;
            var message = new $root.CompanionReg.CompanionCommitment();
            if (object.hash != null)
                if (typeof object.hash === "string")
                    $util.base64.decode(
                        object.hash,
                        (message.hash = $util.newBuffer($util.base64.length(object.hash))),
                        0
                    );
                else if (object.hash.length >= 0) message.hash = object.hash;
            return message;
        };
        CompanionCommitment.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.hash != null && message.hasOwnProperty("hash")) {
                object.hash =
                    options.bytes === String
                        ? $util.base64.encode(message.hash, 0, message.hash.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.hash)
                          : message.hash;
                if (options.oneofs) object._hash = "hash";
            }
            return object;
        };
        CompanionCommitment.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        CompanionCommitment.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.CompanionCommitment";
        };
        return CompanionCommitment;
    })();
    CompanionReg.CompanionEphemeralIdentity = (function () {
        function CompanionEphemeralIdentity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        CompanionEphemeralIdentity.prototype.publicKey = null;
        CompanionEphemeralIdentity.prototype.deviceType = null;
        CompanionEphemeralIdentity.prototype.ref = null;
        var $oneOfFields;
        Object.defineProperty(CompanionEphemeralIdentity.prototype, "_publicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["publicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CompanionEphemeralIdentity.prototype, "_deviceType", {
            get: $util.oneOfGetter(($oneOfFields = ["deviceType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CompanionEphemeralIdentity.prototype, "_ref", {
            get: $util.oneOfGetter(($oneOfFields = ["ref"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        CompanionEphemeralIdentity.create = function create(properties) {
            return new CompanionEphemeralIdentity(properties);
        };
        CompanionEphemeralIdentity.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(10).bytes(message.publicKey);
            if (message.deviceType != null && Object.hasOwnProperty.call(message, "deviceType"))
                writer.uint32(16).int32(message.deviceType);
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                writer.uint32(26).string(message.ref);
            return writer;
        };
        CompanionEphemeralIdentity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        CompanionEphemeralIdentity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.CompanionEphemeralIdentity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.deviceType = reader.int32();
                        break;
                    }
                    case 3: {
                        message.ref = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        CompanionEphemeralIdentity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        CompanionEphemeralIdentity.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                properties._publicKey = 1;
                if (
                    !(
                        (message.publicKey && typeof message.publicKey.length === "number") ||
                        $util.isString(message.publicKey)
                    )
                )
                    return "publicKey: buffer expected";
            }
            if (message.deviceType != null && message.hasOwnProperty("deviceType")) {
                properties._deviceType = 1;
                switch (message.deviceType) {
                    default:
                        return "deviceType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                        break;
                }
            }
            if (message.ref != null && message.hasOwnProperty("ref")) {
                properties._ref = 1;
                if (!$util.isString(message.ref)) return "ref: string expected";
            }
            return null;
        };
        CompanionEphemeralIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.CompanionEphemeralIdentity) return object;
            var message = new $root.CompanionReg.CompanionEphemeralIdentity();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(
                        object.publicKey,
                        (message.publicKey = $util.newBuffer(
                            $util.base64.length(object.publicKey)
                        )),
                        0
                    );
                else if (object.publicKey.length >= 0) message.publicKey = object.publicKey;
            switch (object.deviceType) {
                default:
                    if (typeof object.deviceType === "number") {
                        message.deviceType = object.deviceType;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.deviceType = 0;
                    break;
                case "CHROME":
                case 1:
                    message.deviceType = 1;
                    break;
                case "FIREFOX":
                case 2:
                    message.deviceType = 2;
                    break;
                case "IE":
                case 3:
                    message.deviceType = 3;
                    break;
                case "OPERA":
                case 4:
                    message.deviceType = 4;
                    break;
                case "SAFARI":
                case 5:
                    message.deviceType = 5;
                    break;
                case "EDGE":
                case 6:
                    message.deviceType = 6;
                    break;
                case "DESKTOP":
                case 7:
                    message.deviceType = 7;
                    break;
                case "IPAD":
                case 8:
                    message.deviceType = 8;
                    break;
                case "ANDROID_TABLET":
                case 9:
                    message.deviceType = 9;
                    break;
                case "OHANA":
                case 10:
                    message.deviceType = 10;
                    break;
                case "ALOHA":
                case 11:
                    message.deviceType = 11;
                    break;
                case "CATALINA":
                case 12:
                    message.deviceType = 12;
                    break;
                case "TCL_TV":
                case 13:
                    message.deviceType = 13;
                    break;
                case "IOS_PHONE":
                case 14:
                    message.deviceType = 14;
                    break;
                case "IOS_CATALYST":
                case 15:
                    message.deviceType = 15;
                    break;
                case "ANDROID_PHONE":
                case 16:
                    message.deviceType = 16;
                    break;
                case "ANDROID_AMBIGUOUS":
                case 17:
                    message.deviceType = 17;
                    break;
                case "WEAR_OS":
                case 18:
                    message.deviceType = 18;
                    break;
                case "AR_WRIST":
                case 19:
                    message.deviceType = 19;
                    break;
                case "AR_DEVICE":
                case 20:
                    message.deviceType = 20;
                    break;
                case "UWP":
                case 21:
                    message.deviceType = 21;
                    break;
                case "VR":
                case 22:
                    message.deviceType = 22;
                    break;
                case "CLOUD_API":
                case 23:
                    message.deviceType = 23;
                    break;
                case "SMARTGLASSES":
                case 24:
                    message.deviceType = 24;
                    break;
            }
            if (object.ref != null) message.ref = String(object.ref);
            return message;
        };
        CompanionEphemeralIdentity.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                object.publicKey =
                    options.bytes === String
                        ? $util.base64.encode(message.publicKey, 0, message.publicKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.publicKey)
                          : message.publicKey;
                if (options.oneofs) object._publicKey = "publicKey";
            }
            if (message.deviceType != null && message.hasOwnProperty("deviceType")) {
                object.deviceType =
                    options.enums === String
                        ? $root.CompanionReg.DeviceProps.PlatformType[message.deviceType] ===
                          undefined
                            ? message.deviceType
                            : $root.CompanionReg.DeviceProps.PlatformType[message.deviceType]
                        : message.deviceType;
                if (options.oneofs) object._deviceType = "deviceType";
            }
            if (message.ref != null && message.hasOwnProperty("ref")) {
                object.ref = message.ref;
                if (options.oneofs) object._ref = "ref";
            }
            return object;
        };
        CompanionEphemeralIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        CompanionEphemeralIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.CompanionEphemeralIdentity";
        };
        return CompanionEphemeralIdentity;
    })();
    CompanionReg.DeviceProps = (function () {
        function DeviceProps(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        DeviceProps.prototype.os = null;
        DeviceProps.prototype.version = null;
        DeviceProps.prototype.platformType = null;
        DeviceProps.prototype.requireFullSync = null;
        DeviceProps.prototype.historySyncConfig = null;
        var $oneOfFields;
        Object.defineProperty(DeviceProps.prototype, "_os", {
            get: $util.oneOfGetter(($oneOfFields = ["os"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceProps.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceProps.prototype, "_platformType", {
            get: $util.oneOfGetter(($oneOfFields = ["platformType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceProps.prototype, "_requireFullSync", {
            get: $util.oneOfGetter(($oneOfFields = ["requireFullSync"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceProps.prototype, "_historySyncConfig", {
            get: $util.oneOfGetter(($oneOfFields = ["historySyncConfig"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        DeviceProps.create = function create(properties) {
            return new DeviceProps(properties);
        };
        DeviceProps.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.os != null && Object.hasOwnProperty.call(message, "os"))
                writer.uint32(10).string(message.os);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                $root.CompanionReg.DeviceProps.AppVersion.encode(
                    message.version,
                    writer.uint32(18).fork()
                ).ldelim();
            if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
                writer.uint32(24).int32(message.platformType);
            if (
                message.requireFullSync != null &&
                Object.hasOwnProperty.call(message, "requireFullSync")
            )
                writer.uint32(32).bool(message.requireFullSync);
            if (
                message.historySyncConfig != null &&
                Object.hasOwnProperty.call(message, "historySyncConfig")
            )
                $root.CompanionReg.DeviceProps.HistorySyncConfig.encode(
                    message.historySyncConfig,
                    writer.uint32(42).fork()
                ).ldelim();
            return writer;
        };
        DeviceProps.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        DeviceProps.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.CompanionReg.DeviceProps();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.os = reader.string();
                        break;
                    }
                    case 2: {
                        message.version = $root.CompanionReg.DeviceProps.AppVersion.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 3: {
                        message.platformType = reader.int32();
                        break;
                    }
                    case 4: {
                        message.requireFullSync = reader.bool();
                        break;
                    }
                    case 5: {
                        message.historySyncConfig =
                            $root.CompanionReg.DeviceProps.HistorySyncConfig.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        DeviceProps.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        DeviceProps.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.os != null && message.hasOwnProperty("os")) {
                properties._os = 1;
                if (!$util.isString(message.os)) return "os: string expected";
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                {
                    var error = $root.CompanionReg.DeviceProps.AppVersion.verify(message.version);
                    if (error) return "version." + error;
                }
            }
            if (message.platformType != null && message.hasOwnProperty("platformType")) {
                properties._platformType = 1;
                switch (message.platformType) {
                    default:
                        return "platformType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                        break;
                }
            }
            if (message.requireFullSync != null && message.hasOwnProperty("requireFullSync")) {
                properties._requireFullSync = 1;
                if (typeof message.requireFullSync !== "boolean")
                    return "requireFullSync: boolean expected";
            }
            if (message.historySyncConfig != null && message.hasOwnProperty("historySyncConfig")) {
                properties._historySyncConfig = 1;
                {
                    var error = $root.CompanionReg.DeviceProps.HistorySyncConfig.verify(
                        message.historySyncConfig
                    );
                    if (error) return "historySyncConfig." + error;
                }
            }
            return null;
        };
        DeviceProps.fromObject = function fromObject(object) {
            if (object instanceof $root.CompanionReg.DeviceProps) return object;
            var message = new $root.CompanionReg.DeviceProps();
            if (object.os != null) message.os = String(object.os);
            if (object.version != null) {
                if (typeof object.version !== "object")
                    throw TypeError(".CompanionReg.DeviceProps.version: object expected");
                message.version = $root.CompanionReg.DeviceProps.AppVersion.fromObject(
                    object.version
                );
            }
            switch (object.platformType) {
                default:
                    if (typeof object.platformType === "number") {
                        message.platformType = object.platformType;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.platformType = 0;
                    break;
                case "CHROME":
                case 1:
                    message.platformType = 1;
                    break;
                case "FIREFOX":
                case 2:
                    message.platformType = 2;
                    break;
                case "IE":
                case 3:
                    message.platformType = 3;
                    break;
                case "OPERA":
                case 4:
                    message.platformType = 4;
                    break;
                case "SAFARI":
                case 5:
                    message.platformType = 5;
                    break;
                case "EDGE":
                case 6:
                    message.platformType = 6;
                    break;
                case "DESKTOP":
                case 7:
                    message.platformType = 7;
                    break;
                case "IPAD":
                case 8:
                    message.platformType = 8;
                    break;
                case "ANDROID_TABLET":
                case 9:
                    message.platformType = 9;
                    break;
                case "OHANA":
                case 10:
                    message.platformType = 10;
                    break;
                case "ALOHA":
                case 11:
                    message.platformType = 11;
                    break;
                case "CATALINA":
                case 12:
                    message.platformType = 12;
                    break;
                case "TCL_TV":
                case 13:
                    message.platformType = 13;
                    break;
                case "IOS_PHONE":
                case 14:
                    message.platformType = 14;
                    break;
                case "IOS_CATALYST":
                case 15:
                    message.platformType = 15;
                    break;
                case "ANDROID_PHONE":
                case 16:
                    message.platformType = 16;
                    break;
                case "ANDROID_AMBIGUOUS":
                case 17:
                    message.platformType = 17;
                    break;
                case "WEAR_OS":
                case 18:
                    message.platformType = 18;
                    break;
                case "AR_WRIST":
                case 19:
                    message.platformType = 19;
                    break;
                case "AR_DEVICE":
                case 20:
                    message.platformType = 20;
                    break;
                case "UWP":
                case 21:
                    message.platformType = 21;
                    break;
                case "VR":
                case 22:
                    message.platformType = 22;
                    break;
                case "CLOUD_API":
                case 23:
                    message.platformType = 23;
                    break;
                case "SMARTGLASSES":
                case 24:
                    message.platformType = 24;
                    break;
            }
            if (object.requireFullSync != null)
                message.requireFullSync = Boolean(object.requireFullSync);
            if (object.historySyncConfig != null) {
                if (typeof object.historySyncConfig !== "object")
                    throw TypeError(".CompanionReg.DeviceProps.historySyncConfig: object expected");
                message.historySyncConfig =
                    $root.CompanionReg.DeviceProps.HistorySyncConfig.fromObject(
                        object.historySyncConfig
                    );
            }
            return message;
        };
        DeviceProps.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.os != null && message.hasOwnProperty("os")) {
                object.os = message.os;
                if (options.oneofs) object._os = "os";
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = $root.CompanionReg.DeviceProps.AppVersion.toObject(
                    message.version,
                    options
                );
                if (options.oneofs) object._version = "version";
            }
            if (message.platformType != null && message.hasOwnProperty("platformType")) {
                object.platformType =
                    options.enums === String
                        ? $root.CompanionReg.DeviceProps.PlatformType[message.platformType] ===
                          undefined
                            ? message.platformType
                            : $root.CompanionReg.DeviceProps.PlatformType[message.platformType]
                        : message.platformType;
                if (options.oneofs) object._platformType = "platformType";
            }
            if (message.requireFullSync != null && message.hasOwnProperty("requireFullSync")) {
                object.requireFullSync = message.requireFullSync;
                if (options.oneofs) object._requireFullSync = "requireFullSync";
            }
            if (message.historySyncConfig != null && message.hasOwnProperty("historySyncConfig")) {
                object.historySyncConfig =
                    $root.CompanionReg.DeviceProps.HistorySyncConfig.toObject(
                        message.historySyncConfig,
                        options
                    );
                if (options.oneofs) object._historySyncConfig = "historySyncConfig";
            }
            return object;
        };
        DeviceProps.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        DeviceProps.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/CompanionReg.DeviceProps";
        };
        DeviceProps.AppVersion = (function () {
            function AppVersion(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AppVersion.prototype.primary = null;
            AppVersion.prototype.secondary = null;
            AppVersion.prototype.tertiary = null;
            AppVersion.prototype.quaternary = null;
            AppVersion.prototype.quinary = null;
            var $oneOfFields;
            Object.defineProperty(AppVersion.prototype, "_primary", {
                get: $util.oneOfGetter(($oneOfFields = ["primary"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AppVersion.prototype, "_secondary", {
                get: $util.oneOfGetter(($oneOfFields = ["secondary"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AppVersion.prototype, "_tertiary", {
                get: $util.oneOfGetter(($oneOfFields = ["tertiary"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AppVersion.prototype, "_quaternary", {
                get: $util.oneOfGetter(($oneOfFields = ["quaternary"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AppVersion.prototype, "_quinary", {
                get: $util.oneOfGetter(($oneOfFields = ["quinary"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AppVersion.create = function create(properties) {
                return new AppVersion(properties);
            };
            AppVersion.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.primary != null && Object.hasOwnProperty.call(message, "primary"))
                    writer.uint32(8).uint32(message.primary);
                if (message.secondary != null && Object.hasOwnProperty.call(message, "secondary"))
                    writer.uint32(16).uint32(message.secondary);
                if (message.tertiary != null && Object.hasOwnProperty.call(message, "tertiary"))
                    writer.uint32(24).uint32(message.tertiary);
                if (message.quaternary != null && Object.hasOwnProperty.call(message, "quaternary"))
                    writer.uint32(32).uint32(message.quaternary);
                if (message.quinary != null && Object.hasOwnProperty.call(message, "quinary"))
                    writer.uint32(40).uint32(message.quinary);
                return writer;
            };
            AppVersion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AppVersion.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.CompanionReg.DeviceProps.AppVersion();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.primary = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.secondary = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.tertiary = reader.uint32();
                            break;
                        }
                        case 4: {
                            message.quaternary = reader.uint32();
                            break;
                        }
                        case 5: {
                            message.quinary = reader.uint32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AppVersion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AppVersion.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.primary != null && message.hasOwnProperty("primary")) {
                    properties._primary = 1;
                    if (!$util.isInteger(message.primary)) return "primary: integer expected";
                }
                if (message.secondary != null && message.hasOwnProperty("secondary")) {
                    properties._secondary = 1;
                    if (!$util.isInteger(message.secondary)) return "secondary: integer expected";
                }
                if (message.tertiary != null && message.hasOwnProperty("tertiary")) {
                    properties._tertiary = 1;
                    if (!$util.isInteger(message.tertiary)) return "tertiary: integer expected";
                }
                if (message.quaternary != null && message.hasOwnProperty("quaternary")) {
                    properties._quaternary = 1;
                    if (!$util.isInteger(message.quaternary)) return "quaternary: integer expected";
                }
                if (message.quinary != null && message.hasOwnProperty("quinary")) {
                    properties._quinary = 1;
                    if (!$util.isInteger(message.quinary)) return "quinary: integer expected";
                }
                return null;
            };
            AppVersion.fromObject = function fromObject(object) {
                if (object instanceof $root.CompanionReg.DeviceProps.AppVersion) return object;
                var message = new $root.CompanionReg.DeviceProps.AppVersion();
                if (object.primary != null) message.primary = object.primary >>> 0;
                if (object.secondary != null) message.secondary = object.secondary >>> 0;
                if (object.tertiary != null) message.tertiary = object.tertiary >>> 0;
                if (object.quaternary != null) message.quaternary = object.quaternary >>> 0;
                if (object.quinary != null) message.quinary = object.quinary >>> 0;
                return message;
            };
            AppVersion.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.primary != null && message.hasOwnProperty("primary")) {
                    object.primary = message.primary;
                    if (options.oneofs) object._primary = "primary";
                }
                if (message.secondary != null && message.hasOwnProperty("secondary")) {
                    object.secondary = message.secondary;
                    if (options.oneofs) object._secondary = "secondary";
                }
                if (message.tertiary != null && message.hasOwnProperty("tertiary")) {
                    object.tertiary = message.tertiary;
                    if (options.oneofs) object._tertiary = "tertiary";
                }
                if (message.quaternary != null && message.hasOwnProperty("quaternary")) {
                    object.quaternary = message.quaternary;
                    if (options.oneofs) object._quaternary = "quaternary";
                }
                if (message.quinary != null && message.hasOwnProperty("quinary")) {
                    object.quinary = message.quinary;
                    if (options.oneofs) object._quinary = "quinary";
                }
                return object;
            };
            AppVersion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AppVersion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/CompanionReg.DeviceProps.AppVersion";
            };
            return AppVersion;
        })();
        DeviceProps.HistorySyncConfig = (function () {
            function HistorySyncConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            HistorySyncConfig.prototype.fullSyncDaysLimit = null;
            HistorySyncConfig.prototype.fullSyncSizeMbLimit = null;
            HistorySyncConfig.prototype.storageQuotaMb = null;
            HistorySyncConfig.prototype.inlineInitialPayloadInE2EeMsg = null;
            HistorySyncConfig.prototype.recentSyncDaysLimit = null;
            HistorySyncConfig.prototype.supportCallLogHistory = null;
            HistorySyncConfig.prototype.supportBotUserAgentChatHistory = null;
            HistorySyncConfig.prototype.supportCagReactionsAndPolls = null;
            HistorySyncConfig.prototype.supportBizHostedMsg = null;
            HistorySyncConfig.prototype.supportRecentSyncChunkMessageCountTuning = null;
            HistorySyncConfig.prototype.supportHostedGroupMsg = null;
            HistorySyncConfig.prototype.supportFbidBotChatHistory = null;
            HistorySyncConfig.prototype.supportAddOnHistorySyncMigration = null;
            HistorySyncConfig.prototype.supportMessageAssociation = null;
            HistorySyncConfig.prototype.supportGroupHistory = null;
            HistorySyncConfig.prototype.onDemandReady = null;
            HistorySyncConfig.prototype.supportGuestChat = null;
            HistorySyncConfig.prototype.completeOnDemandReady = null;
            HistorySyncConfig.prototype.thumbnailSyncDaysLimit = null;
            var $oneOfFields;
            Object.defineProperty(HistorySyncConfig.prototype, "_fullSyncDaysLimit", {
                get: $util.oneOfGetter(($oneOfFields = ["fullSyncDaysLimit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_fullSyncSizeMbLimit", {
                get: $util.oneOfGetter(($oneOfFields = ["fullSyncSizeMbLimit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_storageQuotaMb", {
                get: $util.oneOfGetter(($oneOfFields = ["storageQuotaMb"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_inlineInitialPayloadInE2EeMsg", {
                get: $util.oneOfGetter(($oneOfFields = ["inlineInitialPayloadInE2EeMsg"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_recentSyncDaysLimit", {
                get: $util.oneOfGetter(($oneOfFields = ["recentSyncDaysLimit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportCallLogHistory", {
                get: $util.oneOfGetter(($oneOfFields = ["supportCallLogHistory"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportBotUserAgentChatHistory", {
                get: $util.oneOfGetter(($oneOfFields = ["supportBotUserAgentChatHistory"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportCagReactionsAndPolls", {
                get: $util.oneOfGetter(($oneOfFields = ["supportCagReactionsAndPolls"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportBizHostedMsg", {
                get: $util.oneOfGetter(($oneOfFields = ["supportBizHostedMsg"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(
                HistorySyncConfig.prototype,
                "_supportRecentSyncChunkMessageCountTuning",
                {
                    get: $util.oneOfGetter(
                        ($oneOfFields = ["supportRecentSyncChunkMessageCountTuning"])
                    ),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(HistorySyncConfig.prototype, "_supportHostedGroupMsg", {
                get: $util.oneOfGetter(($oneOfFields = ["supportHostedGroupMsg"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportFbidBotChatHistory", {
                get: $util.oneOfGetter(($oneOfFields = ["supportFbidBotChatHistory"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(
                HistorySyncConfig.prototype,
                "_supportAddOnHistorySyncMigration",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["supportAddOnHistorySyncMigration"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(HistorySyncConfig.prototype, "_supportMessageAssociation", {
                get: $util.oneOfGetter(($oneOfFields = ["supportMessageAssociation"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportGroupHistory", {
                get: $util.oneOfGetter(($oneOfFields = ["supportGroupHistory"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_onDemandReady", {
                get: $util.oneOfGetter(($oneOfFields = ["onDemandReady"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_supportGuestChat", {
                get: $util.oneOfGetter(($oneOfFields = ["supportGuestChat"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_completeOnDemandReady", {
                get: $util.oneOfGetter(($oneOfFields = ["completeOnDemandReady"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(HistorySyncConfig.prototype, "_thumbnailSyncDaysLimit", {
                get: $util.oneOfGetter(($oneOfFields = ["thumbnailSyncDaysLimit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            HistorySyncConfig.create = function create(properties) {
                return new HistorySyncConfig(properties);
            };
            HistorySyncConfig.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.fullSyncDaysLimit != null &&
                    Object.hasOwnProperty.call(message, "fullSyncDaysLimit")
                )
                    writer.uint32(8).uint32(message.fullSyncDaysLimit);
                if (
                    message.fullSyncSizeMbLimit != null &&
                    Object.hasOwnProperty.call(message, "fullSyncSizeMbLimit")
                )
                    writer.uint32(16).uint32(message.fullSyncSizeMbLimit);
                if (
                    message.storageQuotaMb != null &&
                    Object.hasOwnProperty.call(message, "storageQuotaMb")
                )
                    writer.uint32(24).uint32(message.storageQuotaMb);
                if (
                    message.inlineInitialPayloadInE2EeMsg != null &&
                    Object.hasOwnProperty.call(message, "inlineInitialPayloadInE2EeMsg")
                )
                    writer.uint32(32).bool(message.inlineInitialPayloadInE2EeMsg);
                if (
                    message.recentSyncDaysLimit != null &&
                    Object.hasOwnProperty.call(message, "recentSyncDaysLimit")
                )
                    writer.uint32(40).uint32(message.recentSyncDaysLimit);
                if (
                    message.supportCallLogHistory != null &&
                    Object.hasOwnProperty.call(message, "supportCallLogHistory")
                )
                    writer.uint32(48).bool(message.supportCallLogHistory);
                if (
                    message.supportBotUserAgentChatHistory != null &&
                    Object.hasOwnProperty.call(message, "supportBotUserAgentChatHistory")
                )
                    writer.uint32(56).bool(message.supportBotUserAgentChatHistory);
                if (
                    message.supportCagReactionsAndPolls != null &&
                    Object.hasOwnProperty.call(message, "supportCagReactionsAndPolls")
                )
                    writer.uint32(64).bool(message.supportCagReactionsAndPolls);
                if (
                    message.supportBizHostedMsg != null &&
                    Object.hasOwnProperty.call(message, "supportBizHostedMsg")
                )
                    writer.uint32(72).bool(message.supportBizHostedMsg);
                if (
                    message.supportRecentSyncChunkMessageCountTuning != null &&
                    Object.hasOwnProperty.call(message, "supportRecentSyncChunkMessageCountTuning")
                )
                    writer.uint32(80).bool(message.supportRecentSyncChunkMessageCountTuning);
                if (
                    message.supportHostedGroupMsg != null &&
                    Object.hasOwnProperty.call(message, "supportHostedGroupMsg")
                )
                    writer.uint32(88).bool(message.supportHostedGroupMsg);
                if (
                    message.supportFbidBotChatHistory != null &&
                    Object.hasOwnProperty.call(message, "supportFbidBotChatHistory")
                )
                    writer.uint32(96).bool(message.supportFbidBotChatHistory);
                if (
                    message.supportAddOnHistorySyncMigration != null &&
                    Object.hasOwnProperty.call(message, "supportAddOnHistorySyncMigration")
                )
                    writer.uint32(104).bool(message.supportAddOnHistorySyncMigration);
                if (
                    message.supportMessageAssociation != null &&
                    Object.hasOwnProperty.call(message, "supportMessageAssociation")
                )
                    writer.uint32(112).bool(message.supportMessageAssociation);
                if (
                    message.supportGroupHistory != null &&
                    Object.hasOwnProperty.call(message, "supportGroupHistory")
                )
                    writer.uint32(120).bool(message.supportGroupHistory);
                if (
                    message.onDemandReady != null &&
                    Object.hasOwnProperty.call(message, "onDemandReady")
                )
                    writer.uint32(128).bool(message.onDemandReady);
                if (
                    message.supportGuestChat != null &&
                    Object.hasOwnProperty.call(message, "supportGuestChat")
                )
                    writer.uint32(136).bool(message.supportGuestChat);
                if (
                    message.completeOnDemandReady != null &&
                    Object.hasOwnProperty.call(message, "completeOnDemandReady")
                )
                    writer.uint32(144).bool(message.completeOnDemandReady);
                if (
                    message.thumbnailSyncDaysLimit != null &&
                    Object.hasOwnProperty.call(message, "thumbnailSyncDaysLimit")
                )
                    writer.uint32(152).uint32(message.thumbnailSyncDaysLimit);
                return writer;
            };
            HistorySyncConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            HistorySyncConfig.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.CompanionReg.DeviceProps.HistorySyncConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.fullSyncDaysLimit = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.fullSyncSizeMbLimit = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.storageQuotaMb = reader.uint32();
                            break;
                        }
                        case 4: {
                            message.inlineInitialPayloadInE2EeMsg = reader.bool();
                            break;
                        }
                        case 5: {
                            message.recentSyncDaysLimit = reader.uint32();
                            break;
                        }
                        case 6: {
                            message.supportCallLogHistory = reader.bool();
                            break;
                        }
                        case 7: {
                            message.supportBotUserAgentChatHistory = reader.bool();
                            break;
                        }
                        case 8: {
                            message.supportCagReactionsAndPolls = reader.bool();
                            break;
                        }
                        case 9: {
                            message.supportBizHostedMsg = reader.bool();
                            break;
                        }
                        case 10: {
                            message.supportRecentSyncChunkMessageCountTuning = reader.bool();
                            break;
                        }
                        case 11: {
                            message.supportHostedGroupMsg = reader.bool();
                            break;
                        }
                        case 12: {
                            message.supportFbidBotChatHistory = reader.bool();
                            break;
                        }
                        case 13: {
                            message.supportAddOnHistorySyncMigration = reader.bool();
                            break;
                        }
                        case 14: {
                            message.supportMessageAssociation = reader.bool();
                            break;
                        }
                        case 15: {
                            message.supportGroupHistory = reader.bool();
                            break;
                        }
                        case 16: {
                            message.onDemandReady = reader.bool();
                            break;
                        }
                        case 17: {
                            message.supportGuestChat = reader.bool();
                            break;
                        }
                        case 18: {
                            message.completeOnDemandReady = reader.bool();
                            break;
                        }
                        case 19: {
                            message.thumbnailSyncDaysLimit = reader.uint32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            HistorySyncConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            HistorySyncConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.fullSyncDaysLimit != null &&
                    message.hasOwnProperty("fullSyncDaysLimit")
                ) {
                    properties._fullSyncDaysLimit = 1;
                    if (!$util.isInteger(message.fullSyncDaysLimit))
                        return "fullSyncDaysLimit: integer expected";
                }
                if (
                    message.fullSyncSizeMbLimit != null &&
                    message.hasOwnProperty("fullSyncSizeMbLimit")
                ) {
                    properties._fullSyncSizeMbLimit = 1;
                    if (!$util.isInteger(message.fullSyncSizeMbLimit))
                        return "fullSyncSizeMbLimit: integer expected";
                }
                if (message.storageQuotaMb != null && message.hasOwnProperty("storageQuotaMb")) {
                    properties._storageQuotaMb = 1;
                    if (!$util.isInteger(message.storageQuotaMb))
                        return "storageQuotaMb: integer expected";
                }
                if (
                    message.inlineInitialPayloadInE2EeMsg != null &&
                    message.hasOwnProperty("inlineInitialPayloadInE2EeMsg")
                ) {
                    properties._inlineInitialPayloadInE2EeMsg = 1;
                    if (typeof message.inlineInitialPayloadInE2EeMsg !== "boolean")
                        return "inlineInitialPayloadInE2EeMsg: boolean expected";
                }
                if (
                    message.recentSyncDaysLimit != null &&
                    message.hasOwnProperty("recentSyncDaysLimit")
                ) {
                    properties._recentSyncDaysLimit = 1;
                    if (!$util.isInteger(message.recentSyncDaysLimit))
                        return "recentSyncDaysLimit: integer expected";
                }
                if (
                    message.supportCallLogHistory != null &&
                    message.hasOwnProperty("supportCallLogHistory")
                ) {
                    properties._supportCallLogHistory = 1;
                    if (typeof message.supportCallLogHistory !== "boolean")
                        return "supportCallLogHistory: boolean expected";
                }
                if (
                    message.supportBotUserAgentChatHistory != null &&
                    message.hasOwnProperty("supportBotUserAgentChatHistory")
                ) {
                    properties._supportBotUserAgentChatHistory = 1;
                    if (typeof message.supportBotUserAgentChatHistory !== "boolean")
                        return "supportBotUserAgentChatHistory: boolean expected";
                }
                if (
                    message.supportCagReactionsAndPolls != null &&
                    message.hasOwnProperty("supportCagReactionsAndPolls")
                ) {
                    properties._supportCagReactionsAndPolls = 1;
                    if (typeof message.supportCagReactionsAndPolls !== "boolean")
                        return "supportCagReactionsAndPolls: boolean expected";
                }
                if (
                    message.supportBizHostedMsg != null &&
                    message.hasOwnProperty("supportBizHostedMsg")
                ) {
                    properties._supportBizHostedMsg = 1;
                    if (typeof message.supportBizHostedMsg !== "boolean")
                        return "supportBizHostedMsg: boolean expected";
                }
                if (
                    message.supportRecentSyncChunkMessageCountTuning != null &&
                    message.hasOwnProperty("supportRecentSyncChunkMessageCountTuning")
                ) {
                    properties._supportRecentSyncChunkMessageCountTuning = 1;
                    if (typeof message.supportRecentSyncChunkMessageCountTuning !== "boolean")
                        return "supportRecentSyncChunkMessageCountTuning: boolean expected";
                }
                if (
                    message.supportHostedGroupMsg != null &&
                    message.hasOwnProperty("supportHostedGroupMsg")
                ) {
                    properties._supportHostedGroupMsg = 1;
                    if (typeof message.supportHostedGroupMsg !== "boolean")
                        return "supportHostedGroupMsg: boolean expected";
                }
                if (
                    message.supportFbidBotChatHistory != null &&
                    message.hasOwnProperty("supportFbidBotChatHistory")
                ) {
                    properties._supportFbidBotChatHistory = 1;
                    if (typeof message.supportFbidBotChatHistory !== "boolean")
                        return "supportFbidBotChatHistory: boolean expected";
                }
                if (
                    message.supportAddOnHistorySyncMigration != null &&
                    message.hasOwnProperty("supportAddOnHistorySyncMigration")
                ) {
                    properties._supportAddOnHistorySyncMigration = 1;
                    if (typeof message.supportAddOnHistorySyncMigration !== "boolean")
                        return "supportAddOnHistorySyncMigration: boolean expected";
                }
                if (
                    message.supportMessageAssociation != null &&
                    message.hasOwnProperty("supportMessageAssociation")
                ) {
                    properties._supportMessageAssociation = 1;
                    if (typeof message.supportMessageAssociation !== "boolean")
                        return "supportMessageAssociation: boolean expected";
                }
                if (
                    message.supportGroupHistory != null &&
                    message.hasOwnProperty("supportGroupHistory")
                ) {
                    properties._supportGroupHistory = 1;
                    if (typeof message.supportGroupHistory !== "boolean")
                        return "supportGroupHistory: boolean expected";
                }
                if (message.onDemandReady != null && message.hasOwnProperty("onDemandReady")) {
                    properties._onDemandReady = 1;
                    if (typeof message.onDemandReady !== "boolean")
                        return "onDemandReady: boolean expected";
                }
                if (
                    message.supportGuestChat != null &&
                    message.hasOwnProperty("supportGuestChat")
                ) {
                    properties._supportGuestChat = 1;
                    if (typeof message.supportGuestChat !== "boolean")
                        return "supportGuestChat: boolean expected";
                }
                if (
                    message.completeOnDemandReady != null &&
                    message.hasOwnProperty("completeOnDemandReady")
                ) {
                    properties._completeOnDemandReady = 1;
                    if (typeof message.completeOnDemandReady !== "boolean")
                        return "completeOnDemandReady: boolean expected";
                }
                if (
                    message.thumbnailSyncDaysLimit != null &&
                    message.hasOwnProperty("thumbnailSyncDaysLimit")
                ) {
                    properties._thumbnailSyncDaysLimit = 1;
                    if (!$util.isInteger(message.thumbnailSyncDaysLimit))
                        return "thumbnailSyncDaysLimit: integer expected";
                }
                return null;
            };
            HistorySyncConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.CompanionReg.DeviceProps.HistorySyncConfig)
                    return object;
                var message = new $root.CompanionReg.DeviceProps.HistorySyncConfig();
                if (object.fullSyncDaysLimit != null)
                    message.fullSyncDaysLimit = object.fullSyncDaysLimit >>> 0;
                if (object.fullSyncSizeMbLimit != null)
                    message.fullSyncSizeMbLimit = object.fullSyncSizeMbLimit >>> 0;
                if (object.storageQuotaMb != null)
                    message.storageQuotaMb = object.storageQuotaMb >>> 0;
                if (object.inlineInitialPayloadInE2EeMsg != null)
                    message.inlineInitialPayloadInE2EeMsg = Boolean(
                        object.inlineInitialPayloadInE2EeMsg
                    );
                if (object.recentSyncDaysLimit != null)
                    message.recentSyncDaysLimit = object.recentSyncDaysLimit >>> 0;
                if (object.supportCallLogHistory != null)
                    message.supportCallLogHistory = Boolean(object.supportCallLogHistory);
                if (object.supportBotUserAgentChatHistory != null)
                    message.supportBotUserAgentChatHistory = Boolean(
                        object.supportBotUserAgentChatHistory
                    );
                if (object.supportCagReactionsAndPolls != null)
                    message.supportCagReactionsAndPolls = Boolean(
                        object.supportCagReactionsAndPolls
                    );
                if (object.supportBizHostedMsg != null)
                    message.supportBizHostedMsg = Boolean(object.supportBizHostedMsg);
                if (object.supportRecentSyncChunkMessageCountTuning != null)
                    message.supportRecentSyncChunkMessageCountTuning = Boolean(
                        object.supportRecentSyncChunkMessageCountTuning
                    );
                if (object.supportHostedGroupMsg != null)
                    message.supportHostedGroupMsg = Boolean(object.supportHostedGroupMsg);
                if (object.supportFbidBotChatHistory != null)
                    message.supportFbidBotChatHistory = Boolean(object.supportFbidBotChatHistory);
                if (object.supportAddOnHistorySyncMigration != null)
                    message.supportAddOnHistorySyncMigration = Boolean(
                        object.supportAddOnHistorySyncMigration
                    );
                if (object.supportMessageAssociation != null)
                    message.supportMessageAssociation = Boolean(object.supportMessageAssociation);
                if (object.supportGroupHistory != null)
                    message.supportGroupHistory = Boolean(object.supportGroupHistory);
                if (object.onDemandReady != null)
                    message.onDemandReady = Boolean(object.onDemandReady);
                if (object.supportGuestChat != null)
                    message.supportGuestChat = Boolean(object.supportGuestChat);
                if (object.completeOnDemandReady != null)
                    message.completeOnDemandReady = Boolean(object.completeOnDemandReady);
                if (object.thumbnailSyncDaysLimit != null)
                    message.thumbnailSyncDaysLimit = object.thumbnailSyncDaysLimit >>> 0;
                return message;
            };
            HistorySyncConfig.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.fullSyncDaysLimit != null &&
                    message.hasOwnProperty("fullSyncDaysLimit")
                ) {
                    object.fullSyncDaysLimit = message.fullSyncDaysLimit;
                    if (options.oneofs) object._fullSyncDaysLimit = "fullSyncDaysLimit";
                }
                if (
                    message.fullSyncSizeMbLimit != null &&
                    message.hasOwnProperty("fullSyncSizeMbLimit")
                ) {
                    object.fullSyncSizeMbLimit = message.fullSyncSizeMbLimit;
                    if (options.oneofs) object._fullSyncSizeMbLimit = "fullSyncSizeMbLimit";
                }
                if (message.storageQuotaMb != null && message.hasOwnProperty("storageQuotaMb")) {
                    object.storageQuotaMb = message.storageQuotaMb;
                    if (options.oneofs) object._storageQuotaMb = "storageQuotaMb";
                }
                if (
                    message.inlineInitialPayloadInE2EeMsg != null &&
                    message.hasOwnProperty("inlineInitialPayloadInE2EeMsg")
                ) {
                    object.inlineInitialPayloadInE2EeMsg = message.inlineInitialPayloadInE2EeMsg;
                    if (options.oneofs)
                        object._inlineInitialPayloadInE2EeMsg = "inlineInitialPayloadInE2EeMsg";
                }
                if (
                    message.recentSyncDaysLimit != null &&
                    message.hasOwnProperty("recentSyncDaysLimit")
                ) {
                    object.recentSyncDaysLimit = message.recentSyncDaysLimit;
                    if (options.oneofs) object._recentSyncDaysLimit = "recentSyncDaysLimit";
                }
                if (
                    message.supportCallLogHistory != null &&
                    message.hasOwnProperty("supportCallLogHistory")
                ) {
                    object.supportCallLogHistory = message.supportCallLogHistory;
                    if (options.oneofs) object._supportCallLogHistory = "supportCallLogHistory";
                }
                if (
                    message.supportBotUserAgentChatHistory != null &&
                    message.hasOwnProperty("supportBotUserAgentChatHistory")
                ) {
                    object.supportBotUserAgentChatHistory = message.supportBotUserAgentChatHistory;
                    if (options.oneofs)
                        object._supportBotUserAgentChatHistory = "supportBotUserAgentChatHistory";
                }
                if (
                    message.supportCagReactionsAndPolls != null &&
                    message.hasOwnProperty("supportCagReactionsAndPolls")
                ) {
                    object.supportCagReactionsAndPolls = message.supportCagReactionsAndPolls;
                    if (options.oneofs)
                        object._supportCagReactionsAndPolls = "supportCagReactionsAndPolls";
                }
                if (
                    message.supportBizHostedMsg != null &&
                    message.hasOwnProperty("supportBizHostedMsg")
                ) {
                    object.supportBizHostedMsg = message.supportBizHostedMsg;
                    if (options.oneofs) object._supportBizHostedMsg = "supportBizHostedMsg";
                }
                if (
                    message.supportRecentSyncChunkMessageCountTuning != null &&
                    message.hasOwnProperty("supportRecentSyncChunkMessageCountTuning")
                ) {
                    object.supportRecentSyncChunkMessageCountTuning =
                        message.supportRecentSyncChunkMessageCountTuning;
                    if (options.oneofs)
                        object._supportRecentSyncChunkMessageCountTuning =
                            "supportRecentSyncChunkMessageCountTuning";
                }
                if (
                    message.supportHostedGroupMsg != null &&
                    message.hasOwnProperty("supportHostedGroupMsg")
                ) {
                    object.supportHostedGroupMsg = message.supportHostedGroupMsg;
                    if (options.oneofs) object._supportHostedGroupMsg = "supportHostedGroupMsg";
                }
                if (
                    message.supportFbidBotChatHistory != null &&
                    message.hasOwnProperty("supportFbidBotChatHistory")
                ) {
                    object.supportFbidBotChatHistory = message.supportFbidBotChatHistory;
                    if (options.oneofs)
                        object._supportFbidBotChatHistory = "supportFbidBotChatHistory";
                }
                if (
                    message.supportAddOnHistorySyncMigration != null &&
                    message.hasOwnProperty("supportAddOnHistorySyncMigration")
                ) {
                    object.supportAddOnHistorySyncMigration =
                        message.supportAddOnHistorySyncMigration;
                    if (options.oneofs)
                        object._supportAddOnHistorySyncMigration =
                            "supportAddOnHistorySyncMigration";
                }
                if (
                    message.supportMessageAssociation != null &&
                    message.hasOwnProperty("supportMessageAssociation")
                ) {
                    object.supportMessageAssociation = message.supportMessageAssociation;
                    if (options.oneofs)
                        object._supportMessageAssociation = "supportMessageAssociation";
                }
                if (
                    message.supportGroupHistory != null &&
                    message.hasOwnProperty("supportGroupHistory")
                ) {
                    object.supportGroupHistory = message.supportGroupHistory;
                    if (options.oneofs) object._supportGroupHistory = "supportGroupHistory";
                }
                if (message.onDemandReady != null && message.hasOwnProperty("onDemandReady")) {
                    object.onDemandReady = message.onDemandReady;
                    if (options.oneofs) object._onDemandReady = "onDemandReady";
                }
                if (
                    message.supportGuestChat != null &&
                    message.hasOwnProperty("supportGuestChat")
                ) {
                    object.supportGuestChat = message.supportGuestChat;
                    if (options.oneofs) object._supportGuestChat = "supportGuestChat";
                }
                if (
                    message.completeOnDemandReady != null &&
                    message.hasOwnProperty("completeOnDemandReady")
                ) {
                    object.completeOnDemandReady = message.completeOnDemandReady;
                    if (options.oneofs) object._completeOnDemandReady = "completeOnDemandReady";
                }
                if (
                    message.thumbnailSyncDaysLimit != null &&
                    message.hasOwnProperty("thumbnailSyncDaysLimit")
                ) {
                    object.thumbnailSyncDaysLimit = message.thumbnailSyncDaysLimit;
                    if (options.oneofs) object._thumbnailSyncDaysLimit = "thumbnailSyncDaysLimit";
                }
                return object;
            };
            HistorySyncConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            HistorySyncConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/CompanionReg.DeviceProps.HistorySyncConfig";
            };
            return HistorySyncConfig;
        })();
        DeviceProps.PlatformType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "CHROME")] = 1;
            values[(valuesById[2] = "FIREFOX")] = 2;
            values[(valuesById[3] = "IE")] = 3;
            values[(valuesById[4] = "OPERA")] = 4;
            values[(valuesById[5] = "SAFARI")] = 5;
            values[(valuesById[6] = "EDGE")] = 6;
            values[(valuesById[7] = "DESKTOP")] = 7;
            values[(valuesById[8] = "IPAD")] = 8;
            values[(valuesById[9] = "ANDROID_TABLET")] = 9;
            values[(valuesById[10] = "OHANA")] = 10;
            values[(valuesById[11] = "ALOHA")] = 11;
            values[(valuesById[12] = "CATALINA")] = 12;
            values[(valuesById[13] = "TCL_TV")] = 13;
            values[(valuesById[14] = "IOS_PHONE")] = 14;
            values[(valuesById[15] = "IOS_CATALYST")] = 15;
            values[(valuesById[16] = "ANDROID_PHONE")] = 16;
            values[(valuesById[17] = "ANDROID_AMBIGUOUS")] = 17;
            values[(valuesById[18] = "WEAR_OS")] = 18;
            values[(valuesById[19] = "AR_WRIST")] = 19;
            values[(valuesById[20] = "AR_DEVICE")] = 20;
            values[(valuesById[21] = "UWP")] = 21;
            values[(valuesById[22] = "VR")] = 22;
            values[(valuesById[23] = "CLOUD_API")] = 23;
            values[(valuesById[24] = "SMARTGLASSES")] = 24;
            return values;
        })();
        return DeviceProps;
    })();
    return CompanionReg;
})();
module.exports = $root;

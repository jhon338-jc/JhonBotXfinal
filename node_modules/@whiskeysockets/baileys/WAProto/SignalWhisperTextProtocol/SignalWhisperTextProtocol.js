"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.SignalWhisperTextProtocol = (function () {
    var SignalWhisperTextProtocol = {};
    SignalWhisperTextProtocol.DeviceConsistencyCodeMessage = (function () {
        function DeviceConsistencyCodeMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        DeviceConsistencyCodeMessage.prototype.generation = null;
        DeviceConsistencyCodeMessage.prototype.signature = null;
        var $oneOfFields;
        Object.defineProperty(DeviceConsistencyCodeMessage.prototype, "_generation", {
            get: $util.oneOfGetter(($oneOfFields = ["generation"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceConsistencyCodeMessage.prototype, "_signature", {
            get: $util.oneOfGetter(($oneOfFields = ["signature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        DeviceConsistencyCodeMessage.create = function create(properties) {
            return new DeviceConsistencyCodeMessage(properties);
        };
        DeviceConsistencyCodeMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.generation != null && Object.hasOwnProperty.call(message, "generation"))
                writer.uint32(8).uint32(message.generation);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(18).bytes(message.signature);
            return writer;
        };
        DeviceConsistencyCodeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        DeviceConsistencyCodeMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.DeviceConsistencyCodeMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.generation = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.signature = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        DeviceConsistencyCodeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        DeviceConsistencyCodeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.generation != null && message.hasOwnProperty("generation")) {
                properties._generation = 1;
                if (!$util.isInteger(message.generation)) return "generation: integer expected";
            }
            if (message.signature != null && message.hasOwnProperty("signature")) {
                properties._signature = 1;
                if (
                    !(
                        (message.signature && typeof message.signature.length === "number") ||
                        $util.isString(message.signature)
                    )
                )
                    return "signature: buffer expected";
            }
            return null;
        };
        DeviceConsistencyCodeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.DeviceConsistencyCodeMessage)
                return object;
            var message = new $root.SignalWhisperTextProtocol.DeviceConsistencyCodeMessage();
            if (object.generation != null) message.generation = object.generation >>> 0;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(
                        object.signature,
                        (message.signature = $util.newBuffer(
                            $util.base64.length(object.signature)
                        )),
                        0
                    );
                else if (object.signature.length >= 0) message.signature = object.signature;
            return message;
        };
        DeviceConsistencyCodeMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.generation != null && message.hasOwnProperty("generation")) {
                object.generation = message.generation;
                if (options.oneofs) object._generation = "generation";
            }
            if (message.signature != null && message.hasOwnProperty("signature")) {
                object.signature =
                    options.bytes === String
                        ? $util.base64.encode(message.signature, 0, message.signature.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.signature)
                          : message.signature;
                if (options.oneofs) object._signature = "signature";
            }
            return object;
        };
        DeviceConsistencyCodeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        DeviceConsistencyCodeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.DeviceConsistencyCodeMessage";
        };
        return DeviceConsistencyCodeMessage;
    })();
    SignalWhisperTextProtocol.SenderKeyDistributionMessage = (function () {
        function SenderKeyDistributionMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SenderKeyDistributionMessage.prototype.id = null;
        SenderKeyDistributionMessage.prototype.iteration = null;
        SenderKeyDistributionMessage.prototype.chainKey = null;
        SenderKeyDistributionMessage.prototype.signingKey = null;
        var $oneOfFields;
        Object.defineProperty(SenderKeyDistributionMessage.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyDistributionMessage.prototype, "_iteration", {
            get: $util.oneOfGetter(($oneOfFields = ["iteration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyDistributionMessage.prototype, "_chainKey", {
            get: $util.oneOfGetter(($oneOfFields = ["chainKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyDistributionMessage.prototype, "_signingKey", {
            get: $util.oneOfGetter(($oneOfFields = ["signingKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SenderKeyDistributionMessage.create = function create(properties) {
            return new SenderKeyDistributionMessage(properties);
        };
        SenderKeyDistributionMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(8).uint32(message.id);
            if (message.iteration != null && Object.hasOwnProperty.call(message, "iteration"))
                writer.uint32(16).uint32(message.iteration);
            if (message.chainKey != null && Object.hasOwnProperty.call(message, "chainKey"))
                writer.uint32(26).bytes(message.chainKey);
            if (message.signingKey != null && Object.hasOwnProperty.call(message, "signingKey"))
                writer.uint32(34).bytes(message.signingKey);
            return writer;
        };
        SenderKeyDistributionMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SenderKeyDistributionMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.SenderKeyDistributionMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.iteration = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.chainKey = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.signingKey = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SenderKeyDistributionMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SenderKeyDistributionMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isInteger(message.id)) return "id: integer expected";
            }
            if (message.iteration != null && message.hasOwnProperty("iteration")) {
                properties._iteration = 1;
                if (!$util.isInteger(message.iteration)) return "iteration: integer expected";
            }
            if (message.chainKey != null && message.hasOwnProperty("chainKey")) {
                properties._chainKey = 1;
                if (
                    !(
                        (message.chainKey && typeof message.chainKey.length === "number") ||
                        $util.isString(message.chainKey)
                    )
                )
                    return "chainKey: buffer expected";
            }
            if (message.signingKey != null && message.hasOwnProperty("signingKey")) {
                properties._signingKey = 1;
                if (
                    !(
                        (message.signingKey && typeof message.signingKey.length === "number") ||
                        $util.isString(message.signingKey)
                    )
                )
                    return "signingKey: buffer expected";
            }
            return null;
        };
        SenderKeyDistributionMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.SenderKeyDistributionMessage)
                return object;
            var message = new $root.SignalWhisperTextProtocol.SenderKeyDistributionMessage();
            if (object.id != null) message.id = object.id >>> 0;
            if (object.iteration != null) message.iteration = object.iteration >>> 0;
            if (object.chainKey != null)
                if (typeof object.chainKey === "string")
                    $util.base64.decode(
                        object.chainKey,
                        (message.chainKey = $util.newBuffer($util.base64.length(object.chainKey))),
                        0
                    );
                else if (object.chainKey.length >= 0) message.chainKey = object.chainKey;
            if (object.signingKey != null)
                if (typeof object.signingKey === "string")
                    $util.base64.decode(
                        object.signingKey,
                        (message.signingKey = $util.newBuffer(
                            $util.base64.length(object.signingKey)
                        )),
                        0
                    );
                else if (object.signingKey.length >= 0) message.signingKey = object.signingKey;
            return message;
        };
        SenderKeyDistributionMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.iteration != null && message.hasOwnProperty("iteration")) {
                object.iteration = message.iteration;
                if (options.oneofs) object._iteration = "iteration";
            }
            if (message.chainKey != null && message.hasOwnProperty("chainKey")) {
                object.chainKey =
                    options.bytes === String
                        ? $util.base64.encode(message.chainKey, 0, message.chainKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.chainKey)
                          : message.chainKey;
                if (options.oneofs) object._chainKey = "chainKey";
            }
            if (message.signingKey != null && message.hasOwnProperty("signingKey")) {
                object.signingKey =
                    options.bytes === String
                        ? $util.base64.encode(message.signingKey, 0, message.signingKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.signingKey)
                          : message.signingKey;
                if (options.oneofs) object._signingKey = "signingKey";
            }
            return object;
        };
        SenderKeyDistributionMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SenderKeyDistributionMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.SenderKeyDistributionMessage";
        };
        return SenderKeyDistributionMessage;
    })();
    SignalWhisperTextProtocol.SenderKeyMessage = (function () {
        function SenderKeyMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SenderKeyMessage.prototype.id = null;
        SenderKeyMessage.prototype.iteration = null;
        SenderKeyMessage.prototype.ciphertext = null;
        var $oneOfFields;
        Object.defineProperty(SenderKeyMessage.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyMessage.prototype, "_iteration", {
            get: $util.oneOfGetter(($oneOfFields = ["iteration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyMessage.prototype, "_ciphertext", {
            get: $util.oneOfGetter(($oneOfFields = ["ciphertext"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SenderKeyMessage.create = function create(properties) {
            return new SenderKeyMessage(properties);
        };
        SenderKeyMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(8).uint32(message.id);
            if (message.iteration != null && Object.hasOwnProperty.call(message, "iteration"))
                writer.uint32(16).uint32(message.iteration);
            if (message.ciphertext != null && Object.hasOwnProperty.call(message, "ciphertext"))
                writer.uint32(26).bytes(message.ciphertext);
            return writer;
        };
        SenderKeyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SenderKeyMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.SenderKeyMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.iteration = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.ciphertext = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SenderKeyMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SenderKeyMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isInteger(message.id)) return "id: integer expected";
            }
            if (message.iteration != null && message.hasOwnProperty("iteration")) {
                properties._iteration = 1;
                if (!$util.isInteger(message.iteration)) return "iteration: integer expected";
            }
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext")) {
                properties._ciphertext = 1;
                if (
                    !(
                        (message.ciphertext && typeof message.ciphertext.length === "number") ||
                        $util.isString(message.ciphertext)
                    )
                )
                    return "ciphertext: buffer expected";
            }
            return null;
        };
        SenderKeyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.SenderKeyMessage) return object;
            var message = new $root.SignalWhisperTextProtocol.SenderKeyMessage();
            if (object.id != null) message.id = object.id >>> 0;
            if (object.iteration != null) message.iteration = object.iteration >>> 0;
            if (object.ciphertext != null)
                if (typeof object.ciphertext === "string")
                    $util.base64.decode(
                        object.ciphertext,
                        (message.ciphertext = $util.newBuffer(
                            $util.base64.length(object.ciphertext)
                        )),
                        0
                    );
                else if (object.ciphertext.length >= 0) message.ciphertext = object.ciphertext;
            return message;
        };
        SenderKeyMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.iteration != null && message.hasOwnProperty("iteration")) {
                object.iteration = message.iteration;
                if (options.oneofs) object._iteration = "iteration";
            }
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext")) {
                object.ciphertext =
                    options.bytes === String
                        ? $util.base64.encode(message.ciphertext, 0, message.ciphertext.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.ciphertext)
                          : message.ciphertext;
                if (options.oneofs) object._ciphertext = "ciphertext";
            }
            return object;
        };
        SenderKeyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SenderKeyMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.SenderKeyMessage";
        };
        return SenderKeyMessage;
    })();
    SignalWhisperTextProtocol.KeyExchangeMessage = (function () {
        function KeyExchangeMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        KeyExchangeMessage.prototype.id = null;
        KeyExchangeMessage.prototype.baseKey = null;
        KeyExchangeMessage.prototype.ratchetKey = null;
        KeyExchangeMessage.prototype.identityKey = null;
        KeyExchangeMessage.prototype.baseKeySignature = null;
        var $oneOfFields;
        Object.defineProperty(KeyExchangeMessage.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(KeyExchangeMessage.prototype, "_baseKey", {
            get: $util.oneOfGetter(($oneOfFields = ["baseKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(KeyExchangeMessage.prototype, "_ratchetKey", {
            get: $util.oneOfGetter(($oneOfFields = ["ratchetKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(KeyExchangeMessage.prototype, "_identityKey", {
            get: $util.oneOfGetter(($oneOfFields = ["identityKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(KeyExchangeMessage.prototype, "_baseKeySignature", {
            get: $util.oneOfGetter(($oneOfFields = ["baseKeySignature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        KeyExchangeMessage.create = function create(properties) {
            return new KeyExchangeMessage(properties);
        };
        KeyExchangeMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(8).uint32(message.id);
            if (message.baseKey != null && Object.hasOwnProperty.call(message, "baseKey"))
                writer.uint32(18).bytes(message.baseKey);
            if (message.ratchetKey != null && Object.hasOwnProperty.call(message, "ratchetKey"))
                writer.uint32(26).bytes(message.ratchetKey);
            if (message.identityKey != null && Object.hasOwnProperty.call(message, "identityKey"))
                writer.uint32(34).bytes(message.identityKey);
            if (
                message.baseKeySignature != null &&
                Object.hasOwnProperty.call(message, "baseKeySignature")
            )
                writer.uint32(42).bytes(message.baseKeySignature);
            return writer;
        };
        KeyExchangeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        KeyExchangeMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.KeyExchangeMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.baseKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.ratchetKey = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.identityKey = reader.bytes();
                        break;
                    }
                    case 5: {
                        message.baseKeySignature = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        KeyExchangeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        KeyExchangeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isInteger(message.id)) return "id: integer expected";
            }
            if (message.baseKey != null && message.hasOwnProperty("baseKey")) {
                properties._baseKey = 1;
                if (
                    !(
                        (message.baseKey && typeof message.baseKey.length === "number") ||
                        $util.isString(message.baseKey)
                    )
                )
                    return "baseKey: buffer expected";
            }
            if (message.ratchetKey != null && message.hasOwnProperty("ratchetKey")) {
                properties._ratchetKey = 1;
                if (
                    !(
                        (message.ratchetKey && typeof message.ratchetKey.length === "number") ||
                        $util.isString(message.ratchetKey)
                    )
                )
                    return "ratchetKey: buffer expected";
            }
            if (message.identityKey != null && message.hasOwnProperty("identityKey")) {
                properties._identityKey = 1;
                if (
                    !(
                        (message.identityKey && typeof message.identityKey.length === "number") ||
                        $util.isString(message.identityKey)
                    )
                )
                    return "identityKey: buffer expected";
            }
            if (message.baseKeySignature != null && message.hasOwnProperty("baseKeySignature")) {
                properties._baseKeySignature = 1;
                if (
                    !(
                        (message.baseKeySignature &&
                            typeof message.baseKeySignature.length === "number") ||
                        $util.isString(message.baseKeySignature)
                    )
                )
                    return "baseKeySignature: buffer expected";
            }
            return null;
        };
        KeyExchangeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.KeyExchangeMessage) return object;
            var message = new $root.SignalWhisperTextProtocol.KeyExchangeMessage();
            if (object.id != null) message.id = object.id >>> 0;
            if (object.baseKey != null)
                if (typeof object.baseKey === "string")
                    $util.base64.decode(
                        object.baseKey,
                        (message.baseKey = $util.newBuffer($util.base64.length(object.baseKey))),
                        0
                    );
                else if (object.baseKey.length >= 0) message.baseKey = object.baseKey;
            if (object.ratchetKey != null)
                if (typeof object.ratchetKey === "string")
                    $util.base64.decode(
                        object.ratchetKey,
                        (message.ratchetKey = $util.newBuffer(
                            $util.base64.length(object.ratchetKey)
                        )),
                        0
                    );
                else if (object.ratchetKey.length >= 0) message.ratchetKey = object.ratchetKey;
            if (object.identityKey != null)
                if (typeof object.identityKey === "string")
                    $util.base64.decode(
                        object.identityKey,
                        (message.identityKey = $util.newBuffer(
                            $util.base64.length(object.identityKey)
                        )),
                        0
                    );
                else if (object.identityKey.length >= 0) message.identityKey = object.identityKey;
            if (object.baseKeySignature != null)
                if (typeof object.baseKeySignature === "string")
                    $util.base64.decode(
                        object.baseKeySignature,
                        (message.baseKeySignature = $util.newBuffer(
                            $util.base64.length(object.baseKeySignature)
                        )),
                        0
                    );
                else if (object.baseKeySignature.length >= 0)
                    message.baseKeySignature = object.baseKeySignature;
            return message;
        };
        KeyExchangeMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.baseKey != null && message.hasOwnProperty("baseKey")) {
                object.baseKey =
                    options.bytes === String
                        ? $util.base64.encode(message.baseKey, 0, message.baseKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.baseKey)
                          : message.baseKey;
                if (options.oneofs) object._baseKey = "baseKey";
            }
            if (message.ratchetKey != null && message.hasOwnProperty("ratchetKey")) {
                object.ratchetKey =
                    options.bytes === String
                        ? $util.base64.encode(message.ratchetKey, 0, message.ratchetKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.ratchetKey)
                          : message.ratchetKey;
                if (options.oneofs) object._ratchetKey = "ratchetKey";
            }
            if (message.identityKey != null && message.hasOwnProperty("identityKey")) {
                object.identityKey =
                    options.bytes === String
                        ? $util.base64.encode(message.identityKey, 0, message.identityKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.identityKey)
                          : message.identityKey;
                if (options.oneofs) object._identityKey = "identityKey";
            }
            if (message.baseKeySignature != null && message.hasOwnProperty("baseKeySignature")) {
                object.baseKeySignature =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.baseKeySignature,
                              0,
                              message.baseKeySignature.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.baseKeySignature)
                          : message.baseKeySignature;
                if (options.oneofs) object._baseKeySignature = "baseKeySignature";
            }
            return object;
        };
        KeyExchangeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        KeyExchangeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.KeyExchangeMessage";
        };
        return KeyExchangeMessage;
    })();
    SignalWhisperTextProtocol.PreKeySignalMessage = (function () {
        function PreKeySignalMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        PreKeySignalMessage.prototype.registrationId = null;
        PreKeySignalMessage.prototype.preKeyId = null;
        PreKeySignalMessage.prototype.signedPreKeyId = null;
        PreKeySignalMessage.prototype.baseKey = null;
        PreKeySignalMessage.prototype.identityKey = null;
        PreKeySignalMessage.prototype.message = null;
        var $oneOfFields;
        Object.defineProperty(PreKeySignalMessage.prototype, "_registrationId", {
            get: $util.oneOfGetter(($oneOfFields = ["registrationId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeySignalMessage.prototype, "_preKeyId", {
            get: $util.oneOfGetter(($oneOfFields = ["preKeyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeySignalMessage.prototype, "_signedPreKeyId", {
            get: $util.oneOfGetter(($oneOfFields = ["signedPreKeyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeySignalMessage.prototype, "_baseKey", {
            get: $util.oneOfGetter(($oneOfFields = ["baseKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeySignalMessage.prototype, "_identityKey", {
            get: $util.oneOfGetter(($oneOfFields = ["identityKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeySignalMessage.prototype, "_message", {
            get: $util.oneOfGetter(($oneOfFields = ["message"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        PreKeySignalMessage.create = function create(properties) {
            return new PreKeySignalMessage(properties);
        };
        PreKeySignalMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.preKeyId != null && Object.hasOwnProperty.call(message, "preKeyId"))
                writer.uint32(8).uint32(message.preKeyId);
            if (message.baseKey != null && Object.hasOwnProperty.call(message, "baseKey"))
                writer.uint32(18).bytes(message.baseKey);
            if (message.identityKey != null && Object.hasOwnProperty.call(message, "identityKey"))
                writer.uint32(26).bytes(message.identityKey);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(34).bytes(message.message);
            if (
                message.registrationId != null &&
                Object.hasOwnProperty.call(message, "registrationId")
            )
                writer.uint32(40).uint32(message.registrationId);
            if (
                message.signedPreKeyId != null &&
                Object.hasOwnProperty.call(message, "signedPreKeyId")
            )
                writer.uint32(48).uint32(message.signedPreKeyId);
            return writer;
        };
        PreKeySignalMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        PreKeySignalMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.PreKeySignalMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 5: {
                        message.registrationId = reader.uint32();
                        break;
                    }
                    case 1: {
                        message.preKeyId = reader.uint32();
                        break;
                    }
                    case 6: {
                        message.signedPreKeyId = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.baseKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.identityKey = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.message = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        PreKeySignalMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        PreKeySignalMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.registrationId != null && message.hasOwnProperty("registrationId")) {
                properties._registrationId = 1;
                if (!$util.isInteger(message.registrationId))
                    return "registrationId: integer expected";
            }
            if (message.preKeyId != null && message.hasOwnProperty("preKeyId")) {
                properties._preKeyId = 1;
                if (!$util.isInteger(message.preKeyId)) return "preKeyId: integer expected";
            }
            if (message.signedPreKeyId != null && message.hasOwnProperty("signedPreKeyId")) {
                properties._signedPreKeyId = 1;
                if (!$util.isInteger(message.signedPreKeyId))
                    return "signedPreKeyId: integer expected";
            }
            if (message.baseKey != null && message.hasOwnProperty("baseKey")) {
                properties._baseKey = 1;
                if (
                    !(
                        (message.baseKey && typeof message.baseKey.length === "number") ||
                        $util.isString(message.baseKey)
                    )
                )
                    return "baseKey: buffer expected";
            }
            if (message.identityKey != null && message.hasOwnProperty("identityKey")) {
                properties._identityKey = 1;
                if (
                    !(
                        (message.identityKey && typeof message.identityKey.length === "number") ||
                        $util.isString(message.identityKey)
                    )
                )
                    return "identityKey: buffer expected";
            }
            if (message.message != null && message.hasOwnProperty("message")) {
                properties._message = 1;
                if (
                    !(
                        (message.message && typeof message.message.length === "number") ||
                        $util.isString(message.message)
                    )
                )
                    return "message: buffer expected";
            }
            return null;
        };
        PreKeySignalMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.PreKeySignalMessage)
                return object;
            var message = new $root.SignalWhisperTextProtocol.PreKeySignalMessage();
            if (object.registrationId != null) message.registrationId = object.registrationId >>> 0;
            if (object.preKeyId != null) message.preKeyId = object.preKeyId >>> 0;
            if (object.signedPreKeyId != null) message.signedPreKeyId = object.signedPreKeyId >>> 0;
            if (object.baseKey != null)
                if (typeof object.baseKey === "string")
                    $util.base64.decode(
                        object.baseKey,
                        (message.baseKey = $util.newBuffer($util.base64.length(object.baseKey))),
                        0
                    );
                else if (object.baseKey.length >= 0) message.baseKey = object.baseKey;
            if (object.identityKey != null)
                if (typeof object.identityKey === "string")
                    $util.base64.decode(
                        object.identityKey,
                        (message.identityKey = $util.newBuffer(
                            $util.base64.length(object.identityKey)
                        )),
                        0
                    );
                else if (object.identityKey.length >= 0) message.identityKey = object.identityKey;
            if (object.message != null)
                if (typeof object.message === "string")
                    $util.base64.decode(
                        object.message,
                        (message.message = $util.newBuffer($util.base64.length(object.message))),
                        0
                    );
                else if (object.message.length >= 0) message.message = object.message;
            return message;
        };
        PreKeySignalMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.preKeyId != null && message.hasOwnProperty("preKeyId")) {
                object.preKeyId = message.preKeyId;
                if (options.oneofs) object._preKeyId = "preKeyId";
            }
            if (message.baseKey != null && message.hasOwnProperty("baseKey")) {
                object.baseKey =
                    options.bytes === String
                        ? $util.base64.encode(message.baseKey, 0, message.baseKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.baseKey)
                          : message.baseKey;
                if (options.oneofs) object._baseKey = "baseKey";
            }
            if (message.identityKey != null && message.hasOwnProperty("identityKey")) {
                object.identityKey =
                    options.bytes === String
                        ? $util.base64.encode(message.identityKey, 0, message.identityKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.identityKey)
                          : message.identityKey;
                if (options.oneofs) object._identityKey = "identityKey";
            }
            if (message.message != null && message.hasOwnProperty("message")) {
                object.message =
                    options.bytes === String
                        ? $util.base64.encode(message.message, 0, message.message.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.message)
                          : message.message;
                if (options.oneofs) object._message = "message";
            }
            if (message.registrationId != null && message.hasOwnProperty("registrationId")) {
                object.registrationId = message.registrationId;
                if (options.oneofs) object._registrationId = "registrationId";
            }
            if (message.signedPreKeyId != null && message.hasOwnProperty("signedPreKeyId")) {
                object.signedPreKeyId = message.signedPreKeyId;
                if (options.oneofs) object._signedPreKeyId = "signedPreKeyId";
            }
            return object;
        };
        PreKeySignalMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PreKeySignalMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.PreKeySignalMessage";
        };
        return PreKeySignalMessage;
    })();
    SignalWhisperTextProtocol.SignalMessage = (function () {
        function SignalMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SignalMessage.prototype.ratchetKey = null;
        SignalMessage.prototype.counter = null;
        SignalMessage.prototype.previousCounter = null;
        SignalMessage.prototype.ciphertext = null;
        var $oneOfFields;
        Object.defineProperty(SignalMessage.prototype, "_ratchetKey", {
            get: $util.oneOfGetter(($oneOfFields = ["ratchetKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignalMessage.prototype, "_counter", {
            get: $util.oneOfGetter(($oneOfFields = ["counter"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignalMessage.prototype, "_previousCounter", {
            get: $util.oneOfGetter(($oneOfFields = ["previousCounter"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignalMessage.prototype, "_ciphertext", {
            get: $util.oneOfGetter(($oneOfFields = ["ciphertext"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SignalMessage.create = function create(properties) {
            return new SignalMessage(properties);
        };
        SignalMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.ratchetKey != null && Object.hasOwnProperty.call(message, "ratchetKey"))
                writer.uint32(10).bytes(message.ratchetKey);
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                writer.uint32(16).uint32(message.counter);
            if (
                message.previousCounter != null &&
                Object.hasOwnProperty.call(message, "previousCounter")
            )
                writer.uint32(24).uint32(message.previousCounter);
            if (message.ciphertext != null && Object.hasOwnProperty.call(message, "ciphertext"))
                writer.uint32(34).bytes(message.ciphertext);
            return writer;
        };
        SignalMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SignalMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalWhisperTextProtocol.SignalMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.ratchetKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.counter = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.previousCounter = reader.uint32();
                        break;
                    }
                    case 4: {
                        message.ciphertext = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SignalMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SignalMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.ratchetKey != null && message.hasOwnProperty("ratchetKey")) {
                properties._ratchetKey = 1;
                if (
                    !(
                        (message.ratchetKey && typeof message.ratchetKey.length === "number") ||
                        $util.isString(message.ratchetKey)
                    )
                )
                    return "ratchetKey: buffer expected";
            }
            if (message.counter != null && message.hasOwnProperty("counter")) {
                properties._counter = 1;
                if (!$util.isInteger(message.counter)) return "counter: integer expected";
            }
            if (message.previousCounter != null && message.hasOwnProperty("previousCounter")) {
                properties._previousCounter = 1;
                if (!$util.isInteger(message.previousCounter))
                    return "previousCounter: integer expected";
            }
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext")) {
                properties._ciphertext = 1;
                if (
                    !(
                        (message.ciphertext && typeof message.ciphertext.length === "number") ||
                        $util.isString(message.ciphertext)
                    )
                )
                    return "ciphertext: buffer expected";
            }
            return null;
        };
        SignalMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalWhisperTextProtocol.SignalMessage) return object;
            var message = new $root.SignalWhisperTextProtocol.SignalMessage();
            if (object.ratchetKey != null)
                if (typeof object.ratchetKey === "string")
                    $util.base64.decode(
                        object.ratchetKey,
                        (message.ratchetKey = $util.newBuffer(
                            $util.base64.length(object.ratchetKey)
                        )),
                        0
                    );
                else if (object.ratchetKey.length >= 0) message.ratchetKey = object.ratchetKey;
            if (object.counter != null) message.counter = object.counter >>> 0;
            if (object.previousCounter != null)
                message.previousCounter = object.previousCounter >>> 0;
            if (object.ciphertext != null)
                if (typeof object.ciphertext === "string")
                    $util.base64.decode(
                        object.ciphertext,
                        (message.ciphertext = $util.newBuffer(
                            $util.base64.length(object.ciphertext)
                        )),
                        0
                    );
                else if (object.ciphertext.length >= 0) message.ciphertext = object.ciphertext;
            return message;
        };
        SignalMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.ratchetKey != null && message.hasOwnProperty("ratchetKey")) {
                object.ratchetKey =
                    options.bytes === String
                        ? $util.base64.encode(message.ratchetKey, 0, message.ratchetKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.ratchetKey)
                          : message.ratchetKey;
                if (options.oneofs) object._ratchetKey = "ratchetKey";
            }
            if (message.counter != null && message.hasOwnProperty("counter")) {
                object.counter = message.counter;
                if (options.oneofs) object._counter = "counter";
            }
            if (message.previousCounter != null && message.hasOwnProperty("previousCounter")) {
                object.previousCounter = message.previousCounter;
                if (options.oneofs) object._previousCounter = "previousCounter";
            }
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext")) {
                object.ciphertext =
                    options.bytes === String
                        ? $util.base64.encode(message.ciphertext, 0, message.ciphertext.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.ciphertext)
                          : message.ciphertext;
                if (options.oneofs) object._ciphertext = "ciphertext";
            }
            return object;
        };
        SignalMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SignalMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalWhisperTextProtocol.SignalMessage";
        };
        return SignalMessage;
    })();
    return SignalWhisperTextProtocol;
})();
module.exports = $root;

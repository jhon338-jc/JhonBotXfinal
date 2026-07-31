"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.SignalLocalStorageProtocol = (function () {
    var SignalLocalStorageProtocol = {};
    SignalLocalStorageProtocol.SenderKeyRecordStructure = (function () {
        function SenderKeyRecordStructure(properties) {
            this.senderKeyStates = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SenderKeyRecordStructure.prototype.senderKeyStates = $util.emptyArray;
        SenderKeyRecordStructure.create = function create(properties) {
            return new SenderKeyRecordStructure(properties);
        };
        SenderKeyRecordStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.senderKeyStates != null && message.senderKeyStates.length)
                for (var i = 0; i < message.senderKeyStates.length; ++i)
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.encode(
                        message.senderKeyStates[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        SenderKeyRecordStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SenderKeyRecordStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.SenderKeyRecordStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.senderKeyStates && message.senderKeyStates.length))
                            message.senderKeyStates = [];
                        message.senderKeyStates.push(
                            $root.SignalLocalStorageProtocol.SenderKeyStateStructure.decode(
                                reader,
                                reader.uint32()
                            )
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
        SenderKeyRecordStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SenderKeyRecordStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.senderKeyStates != null && message.hasOwnProperty("senderKeyStates")) {
                if (!Array.isArray(message.senderKeyStates))
                    return "senderKeyStates: array expected";
                for (var i = 0; i < message.senderKeyStates.length; ++i) {
                    var error = $root.SignalLocalStorageProtocol.SenderKeyStateStructure.verify(
                        message.senderKeyStates[i]
                    );
                    if (error) return "senderKeyStates." + error;
                }
            }
            return null;
        };
        SenderKeyRecordStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.SenderKeyRecordStructure)
                return object;
            var message = new $root.SignalLocalStorageProtocol.SenderKeyRecordStructure();
            if (object.senderKeyStates) {
                if (!Array.isArray(object.senderKeyStates))
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SenderKeyRecordStructure.senderKeyStates: array expected"
                    );
                message.senderKeyStates = [];
                for (var i = 0; i < object.senderKeyStates.length; ++i) {
                    if (typeof object.senderKeyStates[i] !== "object")
                        throw TypeError(
                            ".SignalLocalStorageProtocol.SenderKeyRecordStructure.senderKeyStates: object expected"
                        );
                    message.senderKeyStates[i] =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.fromObject(
                            object.senderKeyStates[i]
                        );
                }
            }
            return message;
        };
        SenderKeyRecordStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.senderKeyStates = [];
            if (message.senderKeyStates && message.senderKeyStates.length) {
                object.senderKeyStates = [];
                for (var j = 0; j < message.senderKeyStates.length; ++j)
                    object.senderKeyStates[j] =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.toObject(
                            message.senderKeyStates[j],
                            options
                        );
            }
            return object;
        };
        SenderKeyRecordStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SenderKeyRecordStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.SenderKeyRecordStructure";
        };
        return SenderKeyRecordStructure;
    })();
    SignalLocalStorageProtocol.SenderKeyStateStructure = (function () {
        function SenderKeyStateStructure(properties) {
            this.senderMessageKeys = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SenderKeyStateStructure.prototype.senderKeyId = null;
        SenderKeyStateStructure.prototype.senderChainKey = null;
        SenderKeyStateStructure.prototype.senderSigningKey = null;
        SenderKeyStateStructure.prototype.senderMessageKeys = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(SenderKeyStateStructure.prototype, "_senderKeyId", {
            get: $util.oneOfGetter(($oneOfFields = ["senderKeyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyStateStructure.prototype, "_senderChainKey", {
            get: $util.oneOfGetter(($oneOfFields = ["senderChainKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SenderKeyStateStructure.prototype, "_senderSigningKey", {
            get: $util.oneOfGetter(($oneOfFields = ["senderSigningKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SenderKeyStateStructure.create = function create(properties) {
            return new SenderKeyStateStructure(properties);
        };
        SenderKeyStateStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.senderKeyId != null && Object.hasOwnProperty.call(message, "senderKeyId"))
                writer.uint32(8).uint32(message.senderKeyId);
            if (
                message.senderChainKey != null &&
                Object.hasOwnProperty.call(message, "senderChainKey")
            )
                $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey.encode(
                    message.senderChainKey,
                    writer.uint32(18).fork()
                ).ldelim();
            if (
                message.senderSigningKey != null &&
                Object.hasOwnProperty.call(message, "senderSigningKey")
            )
                $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey.encode(
                    message.senderSigningKey,
                    writer.uint32(26).fork()
                ).ldelim();
            if (message.senderMessageKeys != null && message.senderMessageKeys.length)
                for (var i = 0; i < message.senderMessageKeys.length; ++i)
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey.encode(
                        message.senderMessageKeys[i],
                        writer.uint32(34).fork()
                    ).ldelim();
            return writer;
        };
        SenderKeyStateStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SenderKeyStateStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.SenderKeyStateStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.senderKeyId = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.senderChainKey =
                            $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 3: {
                        message.senderSigningKey =
                            $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 4: {
                        if (!(message.senderMessageKeys && message.senderMessageKeys.length))
                            message.senderMessageKeys = [];
                        message.senderMessageKeys.push(
                            $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey.decode(
                                reader,
                                reader.uint32()
                            )
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
        SenderKeyStateStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SenderKeyStateStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.senderKeyId != null && message.hasOwnProperty("senderKeyId")) {
                properties._senderKeyId = 1;
                if (!$util.isInteger(message.senderKeyId)) return "senderKeyId: integer expected";
            }
            if (message.senderChainKey != null && message.hasOwnProperty("senderChainKey")) {
                properties._senderChainKey = 1;
                {
                    var error =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey.verify(
                            message.senderChainKey
                        );
                    if (error) return "senderChainKey." + error;
                }
            }
            if (message.senderSigningKey != null && message.hasOwnProperty("senderSigningKey")) {
                properties._senderSigningKey = 1;
                {
                    var error =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey.verify(
                            message.senderSigningKey
                        );
                    if (error) return "senderSigningKey." + error;
                }
            }
            if (message.senderMessageKeys != null && message.hasOwnProperty("senderMessageKeys")) {
                if (!Array.isArray(message.senderMessageKeys))
                    return "senderMessageKeys: array expected";
                for (var i = 0; i < message.senderMessageKeys.length; ++i) {
                    var error =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey.verify(
                            message.senderMessageKeys[i]
                        );
                    if (error) return "senderMessageKeys." + error;
                }
            }
            return null;
        };
        SenderKeyStateStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.SenderKeyStateStructure)
                return object;
            var message = new $root.SignalLocalStorageProtocol.SenderKeyStateStructure();
            if (object.senderKeyId != null) message.senderKeyId = object.senderKeyId >>> 0;
            if (object.senderChainKey != null) {
                if (typeof object.senderChainKey !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SenderKeyStateStructure.senderChainKey: object expected"
                    );
                message.senderChainKey =
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey.fromObject(
                        object.senderChainKey
                    );
            }
            if (object.senderSigningKey != null) {
                if (typeof object.senderSigningKey !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SenderKeyStateStructure.senderSigningKey: object expected"
                    );
                message.senderSigningKey =
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey.fromObject(
                        object.senderSigningKey
                    );
            }
            if (object.senderMessageKeys) {
                if (!Array.isArray(object.senderMessageKeys))
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SenderKeyStateStructure.senderMessageKeys: array expected"
                    );
                message.senderMessageKeys = [];
                for (var i = 0; i < object.senderMessageKeys.length; ++i) {
                    if (typeof object.senderMessageKeys[i] !== "object")
                        throw TypeError(
                            ".SignalLocalStorageProtocol.SenderKeyStateStructure.senderMessageKeys: object expected"
                        );
                    message.senderMessageKeys[i] =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey.fromObject(
                            object.senderMessageKeys[i]
                        );
                }
            }
            return message;
        };
        SenderKeyStateStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.senderMessageKeys = [];
            if (message.senderKeyId != null && message.hasOwnProperty("senderKeyId")) {
                object.senderKeyId = message.senderKeyId;
                if (options.oneofs) object._senderKeyId = "senderKeyId";
            }
            if (message.senderChainKey != null && message.hasOwnProperty("senderChainKey")) {
                object.senderChainKey =
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey.toObject(
                        message.senderChainKey,
                        options
                    );
                if (options.oneofs) object._senderChainKey = "senderChainKey";
            }
            if (message.senderSigningKey != null && message.hasOwnProperty("senderSigningKey")) {
                object.senderSigningKey =
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey.toObject(
                        message.senderSigningKey,
                        options
                    );
                if (options.oneofs) object._senderSigningKey = "senderSigningKey";
            }
            if (message.senderMessageKeys && message.senderMessageKeys.length) {
                object.senderMessageKeys = [];
                for (var j = 0; j < message.senderMessageKeys.length; ++j)
                    object.senderMessageKeys[j] =
                        $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey.toObject(
                            message.senderMessageKeys[j],
                            options
                        );
            }
            return object;
        };
        SenderKeyStateStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SenderKeyStateStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.SenderKeyStateStructure";
        };
        SenderKeyStateStructure.SenderChainKey = (function () {
            function SenderChainKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SenderChainKey.prototype.iteration = null;
            SenderChainKey.prototype.seed = null;
            var $oneOfFields;
            Object.defineProperty(SenderChainKey.prototype, "_iteration", {
                get: $util.oneOfGetter(($oneOfFields = ["iteration"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SenderChainKey.prototype, "_seed", {
                get: $util.oneOfGetter(($oneOfFields = ["seed"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SenderChainKey.create = function create(properties) {
                return new SenderChainKey(properties);
            };
            SenderChainKey.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.iteration != null && Object.hasOwnProperty.call(message, "iteration"))
                    writer.uint32(8).uint32(message.iteration);
                if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                    writer.uint32(18).bytes(message.seed);
                return writer;
            };
            SenderChainKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SenderChainKey.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.iteration = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.seed = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SenderChainKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SenderChainKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.iteration != null && message.hasOwnProperty("iteration")) {
                    properties._iteration = 1;
                    if (!$util.isInteger(message.iteration)) return "iteration: integer expected";
                }
                if (message.seed != null && message.hasOwnProperty("seed")) {
                    properties._seed = 1;
                    if (
                        !(
                            (message.seed && typeof message.seed.length === "number") ||
                            $util.isString(message.seed)
                        )
                    )
                        return "seed: buffer expected";
                }
                return null;
            };
            SenderChainKey.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey
                )
                    return object;
                var message =
                    new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey();
                if (object.iteration != null) message.iteration = object.iteration >>> 0;
                if (object.seed != null)
                    if (typeof object.seed === "string")
                        $util.base64.decode(
                            object.seed,
                            (message.seed = $util.newBuffer($util.base64.length(object.seed))),
                            0
                        );
                    else if (object.seed.length >= 0) message.seed = object.seed;
                return message;
            };
            SenderChainKey.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.iteration != null && message.hasOwnProperty("iteration")) {
                    object.iteration = message.iteration;
                    if (options.oneofs) object._iteration = "iteration";
                }
                if (message.seed != null && message.hasOwnProperty("seed")) {
                    object.seed =
                        options.bytes === String
                            ? $util.base64.encode(message.seed, 0, message.seed.length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.seed)
                              : message.seed;
                    if (options.oneofs) object._seed = "seed";
                }
                return object;
            };
            SenderChainKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SenderChainKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SignalLocalStorageProtocol.SenderKeyStateStructure.SenderChainKey"
                );
            };
            return SenderChainKey;
        })();
        SenderKeyStateStructure.SenderMessageKey = (function () {
            function SenderMessageKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SenderMessageKey.prototype.iteration = null;
            SenderMessageKey.prototype.seed = null;
            var $oneOfFields;
            Object.defineProperty(SenderMessageKey.prototype, "_iteration", {
                get: $util.oneOfGetter(($oneOfFields = ["iteration"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SenderMessageKey.prototype, "_seed", {
                get: $util.oneOfGetter(($oneOfFields = ["seed"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SenderMessageKey.create = function create(properties) {
                return new SenderMessageKey(properties);
            };
            SenderMessageKey.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.iteration != null && Object.hasOwnProperty.call(message, "iteration"))
                    writer.uint32(8).uint32(message.iteration);
                if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                    writer.uint32(18).bytes(message.seed);
                return writer;
            };
            SenderMessageKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SenderMessageKey.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.iteration = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.seed = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SenderMessageKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SenderMessageKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.iteration != null && message.hasOwnProperty("iteration")) {
                    properties._iteration = 1;
                    if (!$util.isInteger(message.iteration)) return "iteration: integer expected";
                }
                if (message.seed != null && message.hasOwnProperty("seed")) {
                    properties._seed = 1;
                    if (
                        !(
                            (message.seed && typeof message.seed.length === "number") ||
                            $util.isString(message.seed)
                        )
                    )
                        return "seed: buffer expected";
                }
                return null;
            };
            SenderMessageKey.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey
                )
                    return object;
                var message =
                    new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey();
                if (object.iteration != null) message.iteration = object.iteration >>> 0;
                if (object.seed != null)
                    if (typeof object.seed === "string")
                        $util.base64.decode(
                            object.seed,
                            (message.seed = $util.newBuffer($util.base64.length(object.seed))),
                            0
                        );
                    else if (object.seed.length >= 0) message.seed = object.seed;
                return message;
            };
            SenderMessageKey.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.iteration != null && message.hasOwnProperty("iteration")) {
                    object.iteration = message.iteration;
                    if (options.oneofs) object._iteration = "iteration";
                }
                if (message.seed != null && message.hasOwnProperty("seed")) {
                    object.seed =
                        options.bytes === String
                            ? $util.base64.encode(message.seed, 0, message.seed.length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.seed)
                              : message.seed;
                    if (options.oneofs) object._seed = "seed";
                }
                return object;
            };
            SenderMessageKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SenderMessageKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SignalLocalStorageProtocol.SenderKeyStateStructure.SenderMessageKey"
                );
            };
            return SenderMessageKey;
        })();
        SenderKeyStateStructure.SenderSigningKey = (function () {
            function SenderSigningKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SenderSigningKey.prototype["public"] = null;
            SenderSigningKey.prototype["private"] = null;
            var $oneOfFields;
            Object.defineProperty(SenderSigningKey.prototype, "_public", {
                get: $util.oneOfGetter(($oneOfFields = ["public"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SenderSigningKey.prototype, "_private", {
                get: $util.oneOfGetter(($oneOfFields = ["private"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SenderSigningKey.create = function create(properties) {
                return new SenderSigningKey(properties);
            };
            SenderSigningKey.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message["public"] != null && Object.hasOwnProperty.call(message, "public"))
                    writer.uint32(10).bytes(message["public"]);
                if (message["private"] != null && Object.hasOwnProperty.call(message, "private"))
                    writer.uint32(18).bytes(message["private"]);
                return writer;
            };
            SenderSigningKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SenderSigningKey.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message["public"] = reader.bytes();
                            break;
                        }
                        case 2: {
                            message["private"] = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SenderSigningKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SenderSigningKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message["public"] != null && message.hasOwnProperty("public")) {
                    properties._public = 1;
                    if (
                        !(
                            (message["public"] && typeof message["public"].length === "number") ||
                            $util.isString(message["public"])
                        )
                    )
                        return "public: buffer expected";
                }
                if (message["private"] != null && message.hasOwnProperty("private")) {
                    properties._private = 1;
                    if (
                        !(
                            (message["private"] && typeof message["private"].length === "number") ||
                            $util.isString(message["private"])
                        )
                    )
                        return "private: buffer expected";
                }
                return null;
            };
            SenderSigningKey.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey
                )
                    return object;
                var message =
                    new $root.SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey();
                if (object["public"] != null)
                    if (typeof object["public"] === "string")
                        $util.base64.decode(
                            object["public"],
                            (message["public"] = $util.newBuffer(
                                $util.base64.length(object["public"])
                            )),
                            0
                        );
                    else if (object["public"].length >= 0) message["public"] = object["public"];
                if (object["private"] != null)
                    if (typeof object["private"] === "string")
                        $util.base64.decode(
                            object["private"],
                            (message["private"] = $util.newBuffer(
                                $util.base64.length(object["private"])
                            )),
                            0
                        );
                    else if (object["private"].length >= 0) message["private"] = object["private"];
                return message;
            };
            SenderSigningKey.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message["public"] != null && message.hasOwnProperty("public")) {
                    object["public"] =
                        options.bytes === String
                            ? $util.base64.encode(message["public"], 0, message["public"].length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message["public"])
                              : message["public"];
                    if (options.oneofs) object._public = "public";
                }
                if (message["private"] != null && message.hasOwnProperty("private")) {
                    object["private"] =
                        options.bytes === String
                            ? $util.base64.encode(message["private"], 0, message["private"].length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message["private"])
                              : message["private"];
                    if (options.oneofs) object._private = "private";
                }
                return object;
            };
            SenderSigningKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SenderSigningKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SignalLocalStorageProtocol.SenderKeyStateStructure.SenderSigningKey"
                );
            };
            return SenderSigningKey;
        })();
        return SenderKeyStateStructure;
    })();
    SignalLocalStorageProtocol.IdentityKeyPairStructure = (function () {
        function IdentityKeyPairStructure(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        IdentityKeyPairStructure.prototype.publicKey = null;
        IdentityKeyPairStructure.prototype.privateKey = null;
        var $oneOfFields;
        Object.defineProperty(IdentityKeyPairStructure.prototype, "_publicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["publicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(IdentityKeyPairStructure.prototype, "_privateKey", {
            get: $util.oneOfGetter(($oneOfFields = ["privateKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        IdentityKeyPairStructure.create = function create(properties) {
            return new IdentityKeyPairStructure(properties);
        };
        IdentityKeyPairStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(10).bytes(message.publicKey);
            if (message.privateKey != null && Object.hasOwnProperty.call(message, "privateKey"))
                writer.uint32(18).bytes(message.privateKey);
            return writer;
        };
        IdentityKeyPairStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        IdentityKeyPairStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.IdentityKeyPairStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.privateKey = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        IdentityKeyPairStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        IdentityKeyPairStructure.verify = function verify(message) {
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
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                properties._privateKey = 1;
                if (
                    !(
                        (message.privateKey && typeof message.privateKey.length === "number") ||
                        $util.isString(message.privateKey)
                    )
                )
                    return "privateKey: buffer expected";
            }
            return null;
        };
        IdentityKeyPairStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.IdentityKeyPairStructure)
                return object;
            var message = new $root.SignalLocalStorageProtocol.IdentityKeyPairStructure();
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
            if (object.privateKey != null)
                if (typeof object.privateKey === "string")
                    $util.base64.decode(
                        object.privateKey,
                        (message.privateKey = $util.newBuffer(
                            $util.base64.length(object.privateKey)
                        )),
                        0
                    );
                else if (object.privateKey.length >= 0) message.privateKey = object.privateKey;
            return message;
        };
        IdentityKeyPairStructure.toObject = function toObject(message, options) {
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
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                object.privateKey =
                    options.bytes === String
                        ? $util.base64.encode(message.privateKey, 0, message.privateKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.privateKey)
                          : message.privateKey;
                if (options.oneofs) object._privateKey = "privateKey";
            }
            return object;
        };
        IdentityKeyPairStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        IdentityKeyPairStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.IdentityKeyPairStructure";
        };
        return IdentityKeyPairStructure;
    })();
    SignalLocalStorageProtocol.SignedPreKeyRecordStructure = (function () {
        function SignedPreKeyRecordStructure(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SignedPreKeyRecordStructure.prototype.id = null;
        SignedPreKeyRecordStructure.prototype.publicKey = null;
        SignedPreKeyRecordStructure.prototype.privateKey = null;
        SignedPreKeyRecordStructure.prototype.signature = null;
        SignedPreKeyRecordStructure.prototype.timestamp = null;
        var $oneOfFields;
        Object.defineProperty(SignedPreKeyRecordStructure.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignedPreKeyRecordStructure.prototype, "_publicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["publicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignedPreKeyRecordStructure.prototype, "_privateKey", {
            get: $util.oneOfGetter(($oneOfFields = ["privateKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignedPreKeyRecordStructure.prototype, "_signature", {
            get: $util.oneOfGetter(($oneOfFields = ["signature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SignedPreKeyRecordStructure.prototype, "_timestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SignedPreKeyRecordStructure.create = function create(properties) {
            return new SignedPreKeyRecordStructure(properties);
        };
        SignedPreKeyRecordStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(8).uint32(message.id);
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(18).bytes(message.publicKey);
            if (message.privateKey != null && Object.hasOwnProperty.call(message, "privateKey"))
                writer.uint32(26).bytes(message.privateKey);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(34).bytes(message.signature);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(41).fixed64(message.timestamp);
            return writer;
        };
        SignedPreKeyRecordStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SignedPreKeyRecordStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.SignedPreKeyRecordStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.privateKey = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.signature = reader.bytes();
                        break;
                    }
                    case 5: {
                        message.timestamp = reader.fixed64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SignedPreKeyRecordStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SignedPreKeyRecordStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isInteger(message.id)) return "id: integer expected";
            }
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
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                properties._privateKey = 1;
                if (
                    !(
                        (message.privateKey && typeof message.privateKey.length === "number") ||
                        $util.isString(message.privateKey)
                    )
                )
                    return "privateKey: buffer expected";
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
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                properties._timestamp = 1;
                if (
                    !$util.isInteger(message.timestamp) &&
                    !(
                        message.timestamp &&
                        $util.isInteger(message.timestamp.low) &&
                        $util.isInteger(message.timestamp.high)
                    )
                )
                    return "timestamp: integer|Long expected";
            }
            return null;
        };
        SignedPreKeyRecordStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.SignedPreKeyRecordStructure)
                return object;
            var message = new $root.SignalLocalStorageProtocol.SignedPreKeyRecordStructure();
            if (object.id != null) message.id = object.id >>> 0;
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
            if (object.privateKey != null)
                if (typeof object.privateKey === "string")
                    $util.base64.decode(
                        object.privateKey,
                        (message.privateKey = $util.newBuffer(
                            $util.base64.length(object.privateKey)
                        )),
                        0
                    );
                else if (object.privateKey.length >= 0) message.privateKey = object.privateKey;
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
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number") message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(
                        object.timestamp.low >>> 0,
                        object.timestamp.high >>> 0
                    ).toNumber();
            return message;
        };
        SignedPreKeyRecordStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                object.publicKey =
                    options.bytes === String
                        ? $util.base64.encode(message.publicKey, 0, message.publicKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.publicKey)
                          : message.publicKey;
                if (options.oneofs) object._publicKey = "publicKey";
            }
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                object.privateKey =
                    options.bytes === String
                        ? $util.base64.encode(message.privateKey, 0, message.privateKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.privateKey)
                          : message.privateKey;
                if (options.oneofs) object._privateKey = "privateKey";
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
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                if (typeof message.timestamp === "number")
                    object.timestamp =
                        options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.timestamp)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.timestamp.low >>> 0,
                                    message.timestamp.high >>> 0
                                ).toNumber()
                              : message.timestamp;
                if (options.oneofs) object._timestamp = "timestamp";
            }
            return object;
        };
        SignedPreKeyRecordStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SignedPreKeyRecordStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.SignedPreKeyRecordStructure";
        };
        return SignedPreKeyRecordStructure;
    })();
    SignalLocalStorageProtocol.PreKeyRecordStructure = (function () {
        function PreKeyRecordStructure(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        PreKeyRecordStructure.prototype.id = null;
        PreKeyRecordStructure.prototype.publicKey = null;
        PreKeyRecordStructure.prototype.privateKey = null;
        var $oneOfFields;
        Object.defineProperty(PreKeyRecordStructure.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeyRecordStructure.prototype, "_publicKey", {
            get: $util.oneOfGetter(($oneOfFields = ["publicKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PreKeyRecordStructure.prototype, "_privateKey", {
            get: $util.oneOfGetter(($oneOfFields = ["privateKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        PreKeyRecordStructure.create = function create(properties) {
            return new PreKeyRecordStructure(properties);
        };
        PreKeyRecordStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(8).uint32(message.id);
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(18).bytes(message.publicKey);
            if (message.privateKey != null && Object.hasOwnProperty.call(message, "privateKey"))
                writer.uint32(26).bytes(message.privateKey);
            return writer;
        };
        PreKeyRecordStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        PreKeyRecordStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.PreKeyRecordStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.privateKey = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        PreKeyRecordStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        PreKeyRecordStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isInteger(message.id)) return "id: integer expected";
            }
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
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                properties._privateKey = 1;
                if (
                    !(
                        (message.privateKey && typeof message.privateKey.length === "number") ||
                        $util.isString(message.privateKey)
                    )
                )
                    return "privateKey: buffer expected";
            }
            return null;
        };
        PreKeyRecordStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.PreKeyRecordStructure)
                return object;
            var message = new $root.SignalLocalStorageProtocol.PreKeyRecordStructure();
            if (object.id != null) message.id = object.id >>> 0;
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
            if (object.privateKey != null)
                if (typeof object.privateKey === "string")
                    $util.base64.decode(
                        object.privateKey,
                        (message.privateKey = $util.newBuffer(
                            $util.base64.length(object.privateKey)
                        )),
                        0
                    );
                else if (object.privateKey.length >= 0) message.privateKey = object.privateKey;
            return message;
        };
        PreKeyRecordStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.publicKey != null && message.hasOwnProperty("publicKey")) {
                object.publicKey =
                    options.bytes === String
                        ? $util.base64.encode(message.publicKey, 0, message.publicKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.publicKey)
                          : message.publicKey;
                if (options.oneofs) object._publicKey = "publicKey";
            }
            if (message.privateKey != null && message.hasOwnProperty("privateKey")) {
                object.privateKey =
                    options.bytes === String
                        ? $util.base64.encode(message.privateKey, 0, message.privateKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.privateKey)
                          : message.privateKey;
                if (options.oneofs) object._privateKey = "privateKey";
            }
            return object;
        };
        PreKeyRecordStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PreKeyRecordStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.PreKeyRecordStructure";
        };
        return PreKeyRecordStructure;
    })();
    SignalLocalStorageProtocol.RecordStructure = (function () {
        function RecordStructure(properties) {
            this.previousSessions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        RecordStructure.prototype.currentSession = null;
        RecordStructure.prototype.previousSessions = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(RecordStructure.prototype, "_currentSession", {
            get: $util.oneOfGetter(($oneOfFields = ["currentSession"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        RecordStructure.create = function create(properties) {
            return new RecordStructure(properties);
        };
        RecordStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.currentSession != null &&
                Object.hasOwnProperty.call(message, "currentSession")
            )
                $root.SignalLocalStorageProtocol.SessionStructure.encode(
                    message.currentSession,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.previousSessions != null && message.previousSessions.length)
                for (var i = 0; i < message.previousSessions.length; ++i)
                    $root.SignalLocalStorageProtocol.SessionStructure.encode(
                        message.previousSessions[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        RecordStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        RecordStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.RecordStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.currentSession =
                            $root.SignalLocalStorageProtocol.SessionStructure.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 2: {
                        if (!(message.previousSessions && message.previousSessions.length))
                            message.previousSessions = [];
                        message.previousSessions.push(
                            $root.SignalLocalStorageProtocol.SessionStructure.decode(
                                reader,
                                reader.uint32()
                            )
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
        RecordStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        RecordStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.currentSession != null && message.hasOwnProperty("currentSession")) {
                properties._currentSession = 1;
                {
                    var error = $root.SignalLocalStorageProtocol.SessionStructure.verify(
                        message.currentSession
                    );
                    if (error) return "currentSession." + error;
                }
            }
            if (message.previousSessions != null && message.hasOwnProperty("previousSessions")) {
                if (!Array.isArray(message.previousSessions))
                    return "previousSessions: array expected";
                for (var i = 0; i < message.previousSessions.length; ++i) {
                    var error = $root.SignalLocalStorageProtocol.SessionStructure.verify(
                        message.previousSessions[i]
                    );
                    if (error) return "previousSessions." + error;
                }
            }
            return null;
        };
        RecordStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.RecordStructure) return object;
            var message = new $root.SignalLocalStorageProtocol.RecordStructure();
            if (object.currentSession != null) {
                if (typeof object.currentSession !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.RecordStructure.currentSession: object expected"
                    );
                message.currentSession =
                    $root.SignalLocalStorageProtocol.SessionStructure.fromObject(
                        object.currentSession
                    );
            }
            if (object.previousSessions) {
                if (!Array.isArray(object.previousSessions))
                    throw TypeError(
                        ".SignalLocalStorageProtocol.RecordStructure.previousSessions: array expected"
                    );
                message.previousSessions = [];
                for (var i = 0; i < object.previousSessions.length; ++i) {
                    if (typeof object.previousSessions[i] !== "object")
                        throw TypeError(
                            ".SignalLocalStorageProtocol.RecordStructure.previousSessions: object expected"
                        );
                    message.previousSessions[i] =
                        $root.SignalLocalStorageProtocol.SessionStructure.fromObject(
                            object.previousSessions[i]
                        );
                }
            }
            return message;
        };
        RecordStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.previousSessions = [];
            if (message.currentSession != null && message.hasOwnProperty("currentSession")) {
                object.currentSession = $root.SignalLocalStorageProtocol.SessionStructure.toObject(
                    message.currentSession,
                    options
                );
                if (options.oneofs) object._currentSession = "currentSession";
            }
            if (message.previousSessions && message.previousSessions.length) {
                object.previousSessions = [];
                for (var j = 0; j < message.previousSessions.length; ++j)
                    object.previousSessions[j] =
                        $root.SignalLocalStorageProtocol.SessionStructure.toObject(
                            message.previousSessions[j],
                            options
                        );
            }
            return object;
        };
        RecordStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        RecordStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.RecordStructure";
        };
        return RecordStructure;
    })();
    SignalLocalStorageProtocol.SessionStructure = (function () {
        function SessionStructure(properties) {
            this.receiverChains = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SessionStructure.prototype.sessionVersion = null;
        SessionStructure.prototype.localIdentityPublic = null;
        SessionStructure.prototype.remoteIdentityPublic = null;
        SessionStructure.prototype.rootKey = null;
        SessionStructure.prototype.previousCounter = null;
        SessionStructure.prototype.senderChain = null;
        SessionStructure.prototype.receiverChains = $util.emptyArray;
        SessionStructure.prototype.pendingKeyExchange = null;
        SessionStructure.prototype.pendingPreKey = null;
        SessionStructure.prototype.remoteRegistrationId = null;
        SessionStructure.prototype.localRegistrationId = null;
        SessionStructure.prototype.needsRefresh = null;
        SessionStructure.prototype.aliceBaseKey = null;
        var $oneOfFields;
        Object.defineProperty(SessionStructure.prototype, "_sessionVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_localIdentityPublic", {
            get: $util.oneOfGetter(($oneOfFields = ["localIdentityPublic"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_remoteIdentityPublic", {
            get: $util.oneOfGetter(($oneOfFields = ["remoteIdentityPublic"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_rootKey", {
            get: $util.oneOfGetter(($oneOfFields = ["rootKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_previousCounter", {
            get: $util.oneOfGetter(($oneOfFields = ["previousCounter"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_senderChain", {
            get: $util.oneOfGetter(($oneOfFields = ["senderChain"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_pendingKeyExchange", {
            get: $util.oneOfGetter(($oneOfFields = ["pendingKeyExchange"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_pendingPreKey", {
            get: $util.oneOfGetter(($oneOfFields = ["pendingPreKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_remoteRegistrationId", {
            get: $util.oneOfGetter(($oneOfFields = ["remoteRegistrationId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_localRegistrationId", {
            get: $util.oneOfGetter(($oneOfFields = ["localRegistrationId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_needsRefresh", {
            get: $util.oneOfGetter(($oneOfFields = ["needsRefresh"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionStructure.prototype, "_aliceBaseKey", {
            get: $util.oneOfGetter(($oneOfFields = ["aliceBaseKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SessionStructure.create = function create(properties) {
            return new SessionStructure(properties);
        };
        SessionStructure.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.sessionVersion != null &&
                Object.hasOwnProperty.call(message, "sessionVersion")
            )
                writer.uint32(8).uint32(message.sessionVersion);
            if (
                message.localIdentityPublic != null &&
                Object.hasOwnProperty.call(message, "localIdentityPublic")
            )
                writer.uint32(18).bytes(message.localIdentityPublic);
            if (
                message.remoteIdentityPublic != null &&
                Object.hasOwnProperty.call(message, "remoteIdentityPublic")
            )
                writer.uint32(26).bytes(message.remoteIdentityPublic);
            if (message.rootKey != null && Object.hasOwnProperty.call(message, "rootKey"))
                writer.uint32(34).bytes(message.rootKey);
            if (
                message.previousCounter != null &&
                Object.hasOwnProperty.call(message, "previousCounter")
            )
                writer.uint32(40).uint32(message.previousCounter);
            if (message.senderChain != null && Object.hasOwnProperty.call(message, "senderChain"))
                $root.SignalLocalStorageProtocol.SessionStructure.Chain.encode(
                    message.senderChain,
                    writer.uint32(50).fork()
                ).ldelim();
            if (message.receiverChains != null && message.receiverChains.length)
                for (var i = 0; i < message.receiverChains.length; ++i)
                    $root.SignalLocalStorageProtocol.SessionStructure.Chain.encode(
                        message.receiverChains[i],
                        writer.uint32(58).fork()
                    ).ldelim();
            if (
                message.pendingKeyExchange != null &&
                Object.hasOwnProperty.call(message, "pendingKeyExchange")
            )
                $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange.encode(
                    message.pendingKeyExchange,
                    writer.uint32(66).fork()
                ).ldelim();
            if (
                message.pendingPreKey != null &&
                Object.hasOwnProperty.call(message, "pendingPreKey")
            )
                $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey.encode(
                    message.pendingPreKey,
                    writer.uint32(74).fork()
                ).ldelim();
            if (
                message.remoteRegistrationId != null &&
                Object.hasOwnProperty.call(message, "remoteRegistrationId")
            )
                writer.uint32(80).uint32(message.remoteRegistrationId);
            if (
                message.localRegistrationId != null &&
                Object.hasOwnProperty.call(message, "localRegistrationId")
            )
                writer.uint32(88).uint32(message.localRegistrationId);
            if (message.needsRefresh != null && Object.hasOwnProperty.call(message, "needsRefresh"))
                writer.uint32(96).bool(message.needsRefresh);
            if (message.aliceBaseKey != null && Object.hasOwnProperty.call(message, "aliceBaseKey"))
                writer.uint32(106).bytes(message.aliceBaseKey);
            return writer;
        };
        SessionStructure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SessionStructure.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SignalLocalStorageProtocol.SessionStructure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.sessionVersion = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.localIdentityPublic = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.remoteIdentityPublic = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.rootKey = reader.bytes();
                        break;
                    }
                    case 5: {
                        message.previousCounter = reader.uint32();
                        break;
                    }
                    case 6: {
                        message.senderChain =
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 7: {
                        if (!(message.receiverChains && message.receiverChains.length))
                            message.receiverChains = [];
                        message.receiverChains.push(
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 8: {
                        message.pendingKeyExchange =
                            $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 9: {
                        message.pendingPreKey =
                            $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 10: {
                        message.remoteRegistrationId = reader.uint32();
                        break;
                    }
                    case 11: {
                        message.localRegistrationId = reader.uint32();
                        break;
                    }
                    case 12: {
                        message.needsRefresh = reader.bool();
                        break;
                    }
                    case 13: {
                        message.aliceBaseKey = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SessionStructure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SessionStructure.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.sessionVersion != null && message.hasOwnProperty("sessionVersion")) {
                properties._sessionVersion = 1;
                if (!$util.isInteger(message.sessionVersion))
                    return "sessionVersion: integer expected";
            }
            if (
                message.localIdentityPublic != null &&
                message.hasOwnProperty("localIdentityPublic")
            ) {
                properties._localIdentityPublic = 1;
                if (
                    !(
                        (message.localIdentityPublic &&
                            typeof message.localIdentityPublic.length === "number") ||
                        $util.isString(message.localIdentityPublic)
                    )
                )
                    return "localIdentityPublic: buffer expected";
            }
            if (
                message.remoteIdentityPublic != null &&
                message.hasOwnProperty("remoteIdentityPublic")
            ) {
                properties._remoteIdentityPublic = 1;
                if (
                    !(
                        (message.remoteIdentityPublic &&
                            typeof message.remoteIdentityPublic.length === "number") ||
                        $util.isString(message.remoteIdentityPublic)
                    )
                )
                    return "remoteIdentityPublic: buffer expected";
            }
            if (message.rootKey != null && message.hasOwnProperty("rootKey")) {
                properties._rootKey = 1;
                if (
                    !(
                        (message.rootKey && typeof message.rootKey.length === "number") ||
                        $util.isString(message.rootKey)
                    )
                )
                    return "rootKey: buffer expected";
            }
            if (message.previousCounter != null && message.hasOwnProperty("previousCounter")) {
                properties._previousCounter = 1;
                if (!$util.isInteger(message.previousCounter))
                    return "previousCounter: integer expected";
            }
            if (message.senderChain != null && message.hasOwnProperty("senderChain")) {
                properties._senderChain = 1;
                {
                    var error = $root.SignalLocalStorageProtocol.SessionStructure.Chain.verify(
                        message.senderChain
                    );
                    if (error) return "senderChain." + error;
                }
            }
            if (message.receiverChains != null && message.hasOwnProperty("receiverChains")) {
                if (!Array.isArray(message.receiverChains)) return "receiverChains: array expected";
                for (var i = 0; i < message.receiverChains.length; ++i) {
                    var error = $root.SignalLocalStorageProtocol.SessionStructure.Chain.verify(
                        message.receiverChains[i]
                    );
                    if (error) return "receiverChains." + error;
                }
            }
            if (
                message.pendingKeyExchange != null &&
                message.hasOwnProperty("pendingKeyExchange")
            ) {
                properties._pendingKeyExchange = 1;
                {
                    var error =
                        $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange.verify(
                            message.pendingKeyExchange
                        );
                    if (error) return "pendingKeyExchange." + error;
                }
            }
            if (message.pendingPreKey != null && message.hasOwnProperty("pendingPreKey")) {
                properties._pendingPreKey = 1;
                {
                    var error =
                        $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey.verify(
                            message.pendingPreKey
                        );
                    if (error) return "pendingPreKey." + error;
                }
            }
            if (
                message.remoteRegistrationId != null &&
                message.hasOwnProperty("remoteRegistrationId")
            ) {
                properties._remoteRegistrationId = 1;
                if (!$util.isInteger(message.remoteRegistrationId))
                    return "remoteRegistrationId: integer expected";
            }
            if (
                message.localRegistrationId != null &&
                message.hasOwnProperty("localRegistrationId")
            ) {
                properties._localRegistrationId = 1;
                if (!$util.isInteger(message.localRegistrationId))
                    return "localRegistrationId: integer expected";
            }
            if (message.needsRefresh != null && message.hasOwnProperty("needsRefresh")) {
                properties._needsRefresh = 1;
                if (typeof message.needsRefresh !== "boolean")
                    return "needsRefresh: boolean expected";
            }
            if (message.aliceBaseKey != null && message.hasOwnProperty("aliceBaseKey")) {
                properties._aliceBaseKey = 1;
                if (
                    !(
                        (message.aliceBaseKey && typeof message.aliceBaseKey.length === "number") ||
                        $util.isString(message.aliceBaseKey)
                    )
                )
                    return "aliceBaseKey: buffer expected";
            }
            return null;
        };
        SessionStructure.fromObject = function fromObject(object) {
            if (object instanceof $root.SignalLocalStorageProtocol.SessionStructure) return object;
            var message = new $root.SignalLocalStorageProtocol.SessionStructure();
            if (object.sessionVersion != null) message.sessionVersion = object.sessionVersion >>> 0;
            if (object.localIdentityPublic != null)
                if (typeof object.localIdentityPublic === "string")
                    $util.base64.decode(
                        object.localIdentityPublic,
                        (message.localIdentityPublic = $util.newBuffer(
                            $util.base64.length(object.localIdentityPublic)
                        )),
                        0
                    );
                else if (object.localIdentityPublic.length >= 0)
                    message.localIdentityPublic = object.localIdentityPublic;
            if (object.remoteIdentityPublic != null)
                if (typeof object.remoteIdentityPublic === "string")
                    $util.base64.decode(
                        object.remoteIdentityPublic,
                        (message.remoteIdentityPublic = $util.newBuffer(
                            $util.base64.length(object.remoteIdentityPublic)
                        )),
                        0
                    );
                else if (object.remoteIdentityPublic.length >= 0)
                    message.remoteIdentityPublic = object.remoteIdentityPublic;
            if (object.rootKey != null)
                if (typeof object.rootKey === "string")
                    $util.base64.decode(
                        object.rootKey,
                        (message.rootKey = $util.newBuffer($util.base64.length(object.rootKey))),
                        0
                    );
                else if (object.rootKey.length >= 0) message.rootKey = object.rootKey;
            if (object.previousCounter != null)
                message.previousCounter = object.previousCounter >>> 0;
            if (object.senderChain != null) {
                if (typeof object.senderChain !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SessionStructure.senderChain: object expected"
                    );
                message.senderChain =
                    $root.SignalLocalStorageProtocol.SessionStructure.Chain.fromObject(
                        object.senderChain
                    );
            }
            if (object.receiverChains) {
                if (!Array.isArray(object.receiverChains))
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SessionStructure.receiverChains: array expected"
                    );
                message.receiverChains = [];
                for (var i = 0; i < object.receiverChains.length; ++i) {
                    if (typeof object.receiverChains[i] !== "object")
                        throw TypeError(
                            ".SignalLocalStorageProtocol.SessionStructure.receiverChains: object expected"
                        );
                    message.receiverChains[i] =
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.fromObject(
                            object.receiverChains[i]
                        );
                }
            }
            if (object.pendingKeyExchange != null) {
                if (typeof object.pendingKeyExchange !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SessionStructure.pendingKeyExchange: object expected"
                    );
                message.pendingKeyExchange =
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange.fromObject(
                        object.pendingKeyExchange
                    );
            }
            if (object.pendingPreKey != null) {
                if (typeof object.pendingPreKey !== "object")
                    throw TypeError(
                        ".SignalLocalStorageProtocol.SessionStructure.pendingPreKey: object expected"
                    );
                message.pendingPreKey =
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey.fromObject(
                        object.pendingPreKey
                    );
            }
            if (object.remoteRegistrationId != null)
                message.remoteRegistrationId = object.remoteRegistrationId >>> 0;
            if (object.localRegistrationId != null)
                message.localRegistrationId = object.localRegistrationId >>> 0;
            if (object.needsRefresh != null) message.needsRefresh = Boolean(object.needsRefresh);
            if (object.aliceBaseKey != null)
                if (typeof object.aliceBaseKey === "string")
                    $util.base64.decode(
                        object.aliceBaseKey,
                        (message.aliceBaseKey = $util.newBuffer(
                            $util.base64.length(object.aliceBaseKey)
                        )),
                        0
                    );
                else if (object.aliceBaseKey.length >= 0)
                    message.aliceBaseKey = object.aliceBaseKey;
            return message;
        };
        SessionStructure.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.receiverChains = [];
            if (message.sessionVersion != null && message.hasOwnProperty("sessionVersion")) {
                object.sessionVersion = message.sessionVersion;
                if (options.oneofs) object._sessionVersion = "sessionVersion";
            }
            if (
                message.localIdentityPublic != null &&
                message.hasOwnProperty("localIdentityPublic")
            ) {
                object.localIdentityPublic =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.localIdentityPublic,
                              0,
                              message.localIdentityPublic.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.localIdentityPublic)
                          : message.localIdentityPublic;
                if (options.oneofs) object._localIdentityPublic = "localIdentityPublic";
            }
            if (
                message.remoteIdentityPublic != null &&
                message.hasOwnProperty("remoteIdentityPublic")
            ) {
                object.remoteIdentityPublic =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.remoteIdentityPublic,
                              0,
                              message.remoteIdentityPublic.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.remoteIdentityPublic)
                          : message.remoteIdentityPublic;
                if (options.oneofs) object._remoteIdentityPublic = "remoteIdentityPublic";
            }
            if (message.rootKey != null && message.hasOwnProperty("rootKey")) {
                object.rootKey =
                    options.bytes === String
                        ? $util.base64.encode(message.rootKey, 0, message.rootKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.rootKey)
                          : message.rootKey;
                if (options.oneofs) object._rootKey = "rootKey";
            }
            if (message.previousCounter != null && message.hasOwnProperty("previousCounter")) {
                object.previousCounter = message.previousCounter;
                if (options.oneofs) object._previousCounter = "previousCounter";
            }
            if (message.senderChain != null && message.hasOwnProperty("senderChain")) {
                object.senderChain =
                    $root.SignalLocalStorageProtocol.SessionStructure.Chain.toObject(
                        message.senderChain,
                        options
                    );
                if (options.oneofs) object._senderChain = "senderChain";
            }
            if (message.receiverChains && message.receiverChains.length) {
                object.receiverChains = [];
                for (var j = 0; j < message.receiverChains.length; ++j)
                    object.receiverChains[j] =
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.toObject(
                            message.receiverChains[j],
                            options
                        );
            }
            if (
                message.pendingKeyExchange != null &&
                message.hasOwnProperty("pendingKeyExchange")
            ) {
                object.pendingKeyExchange =
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange.toObject(
                        message.pendingKeyExchange,
                        options
                    );
                if (options.oneofs) object._pendingKeyExchange = "pendingKeyExchange";
            }
            if (message.pendingPreKey != null && message.hasOwnProperty("pendingPreKey")) {
                object.pendingPreKey =
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey.toObject(
                        message.pendingPreKey,
                        options
                    );
                if (options.oneofs) object._pendingPreKey = "pendingPreKey";
            }
            if (
                message.remoteRegistrationId != null &&
                message.hasOwnProperty("remoteRegistrationId")
            ) {
                object.remoteRegistrationId = message.remoteRegistrationId;
                if (options.oneofs) object._remoteRegistrationId = "remoteRegistrationId";
            }
            if (
                message.localRegistrationId != null &&
                message.hasOwnProperty("localRegistrationId")
            ) {
                object.localRegistrationId = message.localRegistrationId;
                if (options.oneofs) object._localRegistrationId = "localRegistrationId";
            }
            if (message.needsRefresh != null && message.hasOwnProperty("needsRefresh")) {
                object.needsRefresh = message.needsRefresh;
                if (options.oneofs) object._needsRefresh = "needsRefresh";
            }
            if (message.aliceBaseKey != null && message.hasOwnProperty("aliceBaseKey")) {
                object.aliceBaseKey =
                    options.bytes === String
                        ? $util.base64.encode(message.aliceBaseKey, 0, message.aliceBaseKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.aliceBaseKey)
                          : message.aliceBaseKey;
                if (options.oneofs) object._aliceBaseKey = "aliceBaseKey";
            }
            return object;
        };
        SessionStructure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SessionStructure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SignalLocalStorageProtocol.SessionStructure";
        };
        SessionStructure.Chain = (function () {
            function Chain(properties) {
                this.messageKeys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            Chain.prototype.senderRatchetKey = null;
            Chain.prototype.senderRatchetKeyPrivate = null;
            Chain.prototype.chainKey = null;
            Chain.prototype.messageKeys = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(Chain.prototype, "_senderRatchetKey", {
                get: $util.oneOfGetter(($oneOfFields = ["senderRatchetKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Chain.prototype, "_senderRatchetKeyPrivate", {
                get: $util.oneOfGetter(($oneOfFields = ["senderRatchetKeyPrivate"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Chain.prototype, "_chainKey", {
                get: $util.oneOfGetter(($oneOfFields = ["chainKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Chain.create = function create(properties) {
                return new Chain(properties);
            };
            Chain.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.senderRatchetKey != null &&
                    Object.hasOwnProperty.call(message, "senderRatchetKey")
                )
                    writer.uint32(10).bytes(message.senderRatchetKey);
                if (
                    message.senderRatchetKeyPrivate != null &&
                    Object.hasOwnProperty.call(message, "senderRatchetKeyPrivate")
                )
                    writer.uint32(18).bytes(message.senderRatchetKeyPrivate);
                if (message.chainKey != null && Object.hasOwnProperty.call(message, "chainKey"))
                    $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey.encode(
                        message.chainKey,
                        writer.uint32(26).fork()
                    ).ldelim();
                if (message.messageKeys != null && message.messageKeys.length)
                    for (var i = 0; i < message.messageKeys.length; ++i)
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey.encode(
                            message.messageKeys[i],
                            writer.uint32(34).fork()
                        ).ldelim();
                return writer;
            };
            Chain.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            Chain.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SignalLocalStorageProtocol.SessionStructure.Chain();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.senderRatchetKey = reader.bytes();
                            break;
                        }
                        case 2: {
                            message.senderRatchetKeyPrivate = reader.bytes();
                            break;
                        }
                        case 3: {
                            message.chainKey =
                                $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey.decode(
                                    reader,
                                    reader.uint32()
                                );
                            break;
                        }
                        case 4: {
                            if (!(message.messageKeys && message.messageKeys.length))
                                message.messageKeys = [];
                            message.messageKeys.push(
                                $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey.decode(
                                    reader,
                                    reader.uint32()
                                )
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
            Chain.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            Chain.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.senderRatchetKey != null &&
                    message.hasOwnProperty("senderRatchetKey")
                ) {
                    properties._senderRatchetKey = 1;
                    if (
                        !(
                            (message.senderRatchetKey &&
                                typeof message.senderRatchetKey.length === "number") ||
                            $util.isString(message.senderRatchetKey)
                        )
                    )
                        return "senderRatchetKey: buffer expected";
                }
                if (
                    message.senderRatchetKeyPrivate != null &&
                    message.hasOwnProperty("senderRatchetKeyPrivate")
                ) {
                    properties._senderRatchetKeyPrivate = 1;
                    if (
                        !(
                            (message.senderRatchetKeyPrivate &&
                                typeof message.senderRatchetKeyPrivate.length === "number") ||
                            $util.isString(message.senderRatchetKeyPrivate)
                        )
                    )
                        return "senderRatchetKeyPrivate: buffer expected";
                }
                if (message.chainKey != null && message.hasOwnProperty("chainKey")) {
                    properties._chainKey = 1;
                    {
                        var error =
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey.verify(
                                message.chainKey
                            );
                        if (error) return "chainKey." + error;
                    }
                }
                if (message.messageKeys != null && message.hasOwnProperty("messageKeys")) {
                    if (!Array.isArray(message.messageKeys)) return "messageKeys: array expected";
                    for (var i = 0; i < message.messageKeys.length; ++i) {
                        var error =
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey.verify(
                                message.messageKeys[i]
                            );
                        if (error) return "messageKeys." + error;
                    }
                }
                return null;
            };
            Chain.fromObject = function fromObject(object) {
                if (object instanceof $root.SignalLocalStorageProtocol.SessionStructure.Chain)
                    return object;
                var message = new $root.SignalLocalStorageProtocol.SessionStructure.Chain();
                if (object.senderRatchetKey != null)
                    if (typeof object.senderRatchetKey === "string")
                        $util.base64.decode(
                            object.senderRatchetKey,
                            (message.senderRatchetKey = $util.newBuffer(
                                $util.base64.length(object.senderRatchetKey)
                            )),
                            0
                        );
                    else if (object.senderRatchetKey.length >= 0)
                        message.senderRatchetKey = object.senderRatchetKey;
                if (object.senderRatchetKeyPrivate != null)
                    if (typeof object.senderRatchetKeyPrivate === "string")
                        $util.base64.decode(
                            object.senderRatchetKeyPrivate,
                            (message.senderRatchetKeyPrivate = $util.newBuffer(
                                $util.base64.length(object.senderRatchetKeyPrivate)
                            )),
                            0
                        );
                    else if (object.senderRatchetKeyPrivate.length >= 0)
                        message.senderRatchetKeyPrivate = object.senderRatchetKeyPrivate;
                if (object.chainKey != null) {
                    if (typeof object.chainKey !== "object")
                        throw TypeError(
                            ".SignalLocalStorageProtocol.SessionStructure.Chain.chainKey: object expected"
                        );
                    message.chainKey =
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey.fromObject(
                            object.chainKey
                        );
                }
                if (object.messageKeys) {
                    if (!Array.isArray(object.messageKeys))
                        throw TypeError(
                            ".SignalLocalStorageProtocol.SessionStructure.Chain.messageKeys: array expected"
                        );
                    message.messageKeys = [];
                    for (var i = 0; i < object.messageKeys.length; ++i) {
                        if (typeof object.messageKeys[i] !== "object")
                            throw TypeError(
                                ".SignalLocalStorageProtocol.SessionStructure.Chain.messageKeys: object expected"
                            );
                        message.messageKeys[i] =
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey.fromObject(
                                object.messageKeys[i]
                            );
                    }
                }
                return message;
            };
            Chain.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.messageKeys = [];
                if (
                    message.senderRatchetKey != null &&
                    message.hasOwnProperty("senderRatchetKey")
                ) {
                    object.senderRatchetKey =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.senderRatchetKey,
                                  0,
                                  message.senderRatchetKey.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.senderRatchetKey)
                              : message.senderRatchetKey;
                    if (options.oneofs) object._senderRatchetKey = "senderRatchetKey";
                }
                if (
                    message.senderRatchetKeyPrivate != null &&
                    message.hasOwnProperty("senderRatchetKeyPrivate")
                ) {
                    object.senderRatchetKeyPrivate =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.senderRatchetKeyPrivate,
                                  0,
                                  message.senderRatchetKeyPrivate.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.senderRatchetKeyPrivate)
                              : message.senderRatchetKeyPrivate;
                    if (options.oneofs) object._senderRatchetKeyPrivate = "senderRatchetKeyPrivate";
                }
                if (message.chainKey != null && message.hasOwnProperty("chainKey")) {
                    object.chainKey =
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey.toObject(
                            message.chainKey,
                            options
                        );
                    if (options.oneofs) object._chainKey = "chainKey";
                }
                if (message.messageKeys && message.messageKeys.length) {
                    object.messageKeys = [];
                    for (var j = 0; j < message.messageKeys.length; ++j)
                        object.messageKeys[j] =
                            $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey.toObject(
                                message.messageKeys[j],
                                options
                            );
                }
                return object;
            };
            Chain.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            Chain.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SignalLocalStorageProtocol.SessionStructure.Chain";
            };
            Chain.ChainKey = (function () {
                function ChainKey(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                ChainKey.prototype.index = null;
                ChainKey.prototype.key = null;
                var $oneOfFields;
                Object.defineProperty(ChainKey.prototype, "_index", {
                    get: $util.oneOfGetter(($oneOfFields = ["index"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(ChainKey.prototype, "_key", {
                    get: $util.oneOfGetter(($oneOfFields = ["key"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                ChainKey.create = function create(properties) {
                    return new ChainKey(properties);
                };
                ChainKey.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(8).uint32(message.index);
                    if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                        writer.uint32(18).bytes(message.key);
                    return writer;
                };
                ChainKey.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                ChainKey.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.index = reader.uint32();
                                break;
                            }
                            case 2: {
                                message.key = reader.bytes();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                ChainKey.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                ChainKey.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.index != null && message.hasOwnProperty("index")) {
                        properties._index = 1;
                        if (!$util.isInteger(message.index)) return "index: integer expected";
                    }
                    if (message.key != null && message.hasOwnProperty("key")) {
                        properties._key = 1;
                        if (
                            !(
                                (message.key && typeof message.key.length === "number") ||
                                $util.isString(message.key)
                            )
                        )
                            return "key: buffer expected";
                    }
                    return null;
                };
                ChainKey.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey
                    )
                        return object;
                    var message =
                        new $root.SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey();
                    if (object.index != null) message.index = object.index >>> 0;
                    if (object.key != null)
                        if (typeof object.key === "string")
                            $util.base64.decode(
                                object.key,
                                (message.key = $util.newBuffer($util.base64.length(object.key))),
                                0
                            );
                        else if (object.key.length >= 0) message.key = object.key;
                    return message;
                };
                ChainKey.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.index != null && message.hasOwnProperty("index")) {
                        object.index = message.index;
                        if (options.oneofs) object._index = "index";
                    }
                    if (message.key != null && message.hasOwnProperty("key")) {
                        object.key =
                            options.bytes === String
                                ? $util.base64.encode(message.key, 0, message.key.length)
                                : options.bytes === Array
                                  ? Array.prototype.slice.call(message.key)
                                  : message.key;
                        if (options.oneofs) object._key = "key";
                    }
                    return object;
                };
                ChainKey.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ChainKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/SignalLocalStorageProtocol.SessionStructure.Chain.ChainKey"
                    );
                };
                return ChainKey;
            })();
            Chain.MessageKey = (function () {
                function MessageKey(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                MessageKey.prototype.index = null;
                MessageKey.prototype.cipherKey = null;
                MessageKey.prototype.macKey = null;
                MessageKey.prototype.iv = null;
                var $oneOfFields;
                Object.defineProperty(MessageKey.prototype, "_index", {
                    get: $util.oneOfGetter(($oneOfFields = ["index"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(MessageKey.prototype, "_cipherKey", {
                    get: $util.oneOfGetter(($oneOfFields = ["cipherKey"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(MessageKey.prototype, "_macKey", {
                    get: $util.oneOfGetter(($oneOfFields = ["macKey"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(MessageKey.prototype, "_iv", {
                    get: $util.oneOfGetter(($oneOfFields = ["iv"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                MessageKey.create = function create(properties) {
                    return new MessageKey(properties);
                };
                MessageKey.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(8).uint32(message.index);
                    if (
                        message.cipherKey != null &&
                        Object.hasOwnProperty.call(message, "cipherKey")
                    )
                        writer.uint32(18).bytes(message.cipherKey);
                    if (message.macKey != null && Object.hasOwnProperty.call(message, "macKey"))
                        writer.uint32(26).bytes(message.macKey);
                    if (message.iv != null && Object.hasOwnProperty.call(message, "iv"))
                        writer.uint32(34).bytes(message.iv);
                    return writer;
                };
                MessageKey.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                MessageKey.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.index = reader.uint32();
                                break;
                            }
                            case 2: {
                                message.cipherKey = reader.bytes();
                                break;
                            }
                            case 3: {
                                message.macKey = reader.bytes();
                                break;
                            }
                            case 4: {
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
                MessageKey.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                MessageKey.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.index != null && message.hasOwnProperty("index")) {
                        properties._index = 1;
                        if (!$util.isInteger(message.index)) return "index: integer expected";
                    }
                    if (message.cipherKey != null && message.hasOwnProperty("cipherKey")) {
                        properties._cipherKey = 1;
                        if (
                            !(
                                (message.cipherKey &&
                                    typeof message.cipherKey.length === "number") ||
                                $util.isString(message.cipherKey)
                            )
                        )
                            return "cipherKey: buffer expected";
                    }
                    if (message.macKey != null && message.hasOwnProperty("macKey")) {
                        properties._macKey = 1;
                        if (
                            !(
                                (message.macKey && typeof message.macKey.length === "number") ||
                                $util.isString(message.macKey)
                            )
                        )
                            return "macKey: buffer expected";
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
                MessageKey.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey
                    )
                        return object;
                    var message =
                        new $root.SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey();
                    if (object.index != null) message.index = object.index >>> 0;
                    if (object.cipherKey != null)
                        if (typeof object.cipherKey === "string")
                            $util.base64.decode(
                                object.cipherKey,
                                (message.cipherKey = $util.newBuffer(
                                    $util.base64.length(object.cipherKey)
                                )),
                                0
                            );
                        else if (object.cipherKey.length >= 0) message.cipherKey = object.cipherKey;
                    if (object.macKey != null)
                        if (typeof object.macKey === "string")
                            $util.base64.decode(
                                object.macKey,
                                (message.macKey = $util.newBuffer(
                                    $util.base64.length(object.macKey)
                                )),
                                0
                            );
                        else if (object.macKey.length >= 0) message.macKey = object.macKey;
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
                MessageKey.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.index != null && message.hasOwnProperty("index")) {
                        object.index = message.index;
                        if (options.oneofs) object._index = "index";
                    }
                    if (message.cipherKey != null && message.hasOwnProperty("cipherKey")) {
                        object.cipherKey =
                            options.bytes === String
                                ? $util.base64.encode(
                                      message.cipherKey,
                                      0,
                                      message.cipherKey.length
                                  )
                                : options.bytes === Array
                                  ? Array.prototype.slice.call(message.cipherKey)
                                  : message.cipherKey;
                        if (options.oneofs) object._cipherKey = "cipherKey";
                    }
                    if (message.macKey != null && message.hasOwnProperty("macKey")) {
                        object.macKey =
                            options.bytes === String
                                ? $util.base64.encode(message.macKey, 0, message.macKey.length)
                                : options.bytes === Array
                                  ? Array.prototype.slice.call(message.macKey)
                                  : message.macKey;
                        if (options.oneofs) object._macKey = "macKey";
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
                MessageKey.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                MessageKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/SignalLocalStorageProtocol.SessionStructure.Chain.MessageKey"
                    );
                };
                return MessageKey;
            })();
            return Chain;
        })();
        SessionStructure.PendingKeyExchange = (function () {
            function PendingKeyExchange(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PendingKeyExchange.prototype.sequence = null;
            PendingKeyExchange.prototype.localBaseKey = null;
            PendingKeyExchange.prototype.localBaseKeyPrivate = null;
            PendingKeyExchange.prototype.localRatchetKey = null;
            PendingKeyExchange.prototype.localRatchetKeyPrivate = null;
            PendingKeyExchange.prototype.localIdentityKey = null;
            PendingKeyExchange.prototype.localIdentityKeyPrivate = null;
            var $oneOfFields;
            Object.defineProperty(PendingKeyExchange.prototype, "_sequence", {
                get: $util.oneOfGetter(($oneOfFields = ["sequence"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localBaseKey", {
                get: $util.oneOfGetter(($oneOfFields = ["localBaseKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localBaseKeyPrivate", {
                get: $util.oneOfGetter(($oneOfFields = ["localBaseKeyPrivate"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localRatchetKey", {
                get: $util.oneOfGetter(($oneOfFields = ["localRatchetKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localRatchetKeyPrivate", {
                get: $util.oneOfGetter(($oneOfFields = ["localRatchetKeyPrivate"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localIdentityKey", {
                get: $util.oneOfGetter(($oneOfFields = ["localIdentityKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingKeyExchange.prototype, "_localIdentityKeyPrivate", {
                get: $util.oneOfGetter(($oneOfFields = ["localIdentityKeyPrivate"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PendingKeyExchange.create = function create(properties) {
                return new PendingKeyExchange(properties);
            };
            PendingKeyExchange.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.sequence != null && Object.hasOwnProperty.call(message, "sequence"))
                    writer.uint32(8).uint32(message.sequence);
                if (
                    message.localBaseKey != null &&
                    Object.hasOwnProperty.call(message, "localBaseKey")
                )
                    writer.uint32(18).bytes(message.localBaseKey);
                if (
                    message.localBaseKeyPrivate != null &&
                    Object.hasOwnProperty.call(message, "localBaseKeyPrivate")
                )
                    writer.uint32(26).bytes(message.localBaseKeyPrivate);
                if (
                    message.localRatchetKey != null &&
                    Object.hasOwnProperty.call(message, "localRatchetKey")
                )
                    writer.uint32(34).bytes(message.localRatchetKey);
                if (
                    message.localRatchetKeyPrivate != null &&
                    Object.hasOwnProperty.call(message, "localRatchetKeyPrivate")
                )
                    writer.uint32(42).bytes(message.localRatchetKeyPrivate);
                if (
                    message.localIdentityKey != null &&
                    Object.hasOwnProperty.call(message, "localIdentityKey")
                )
                    writer.uint32(58).bytes(message.localIdentityKey);
                if (
                    message.localIdentityKeyPrivate != null &&
                    Object.hasOwnProperty.call(message, "localIdentityKeyPrivate")
                )
                    writer.uint32(66).bytes(message.localIdentityKeyPrivate);
                return writer;
            };
            PendingKeyExchange.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PendingKeyExchange.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.sequence = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.localBaseKey = reader.bytes();
                            break;
                        }
                        case 3: {
                            message.localBaseKeyPrivate = reader.bytes();
                            break;
                        }
                        case 4: {
                            message.localRatchetKey = reader.bytes();
                            break;
                        }
                        case 5: {
                            message.localRatchetKeyPrivate = reader.bytes();
                            break;
                        }
                        case 7: {
                            message.localIdentityKey = reader.bytes();
                            break;
                        }
                        case 8: {
                            message.localIdentityKeyPrivate = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PendingKeyExchange.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PendingKeyExchange.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.sequence != null && message.hasOwnProperty("sequence")) {
                    properties._sequence = 1;
                    if (!$util.isInteger(message.sequence)) return "sequence: integer expected";
                }
                if (message.localBaseKey != null && message.hasOwnProperty("localBaseKey")) {
                    properties._localBaseKey = 1;
                    if (
                        !(
                            (message.localBaseKey &&
                                typeof message.localBaseKey.length === "number") ||
                            $util.isString(message.localBaseKey)
                        )
                    )
                        return "localBaseKey: buffer expected";
                }
                if (
                    message.localBaseKeyPrivate != null &&
                    message.hasOwnProperty("localBaseKeyPrivate")
                ) {
                    properties._localBaseKeyPrivate = 1;
                    if (
                        !(
                            (message.localBaseKeyPrivate &&
                                typeof message.localBaseKeyPrivate.length === "number") ||
                            $util.isString(message.localBaseKeyPrivate)
                        )
                    )
                        return "localBaseKeyPrivate: buffer expected";
                }
                if (message.localRatchetKey != null && message.hasOwnProperty("localRatchetKey")) {
                    properties._localRatchetKey = 1;
                    if (
                        !(
                            (message.localRatchetKey &&
                                typeof message.localRatchetKey.length === "number") ||
                            $util.isString(message.localRatchetKey)
                        )
                    )
                        return "localRatchetKey: buffer expected";
                }
                if (
                    message.localRatchetKeyPrivate != null &&
                    message.hasOwnProperty("localRatchetKeyPrivate")
                ) {
                    properties._localRatchetKeyPrivate = 1;
                    if (
                        !(
                            (message.localRatchetKeyPrivate &&
                                typeof message.localRatchetKeyPrivate.length === "number") ||
                            $util.isString(message.localRatchetKeyPrivate)
                        )
                    )
                        return "localRatchetKeyPrivate: buffer expected";
                }
                if (
                    message.localIdentityKey != null &&
                    message.hasOwnProperty("localIdentityKey")
                ) {
                    properties._localIdentityKey = 1;
                    if (
                        !(
                            (message.localIdentityKey &&
                                typeof message.localIdentityKey.length === "number") ||
                            $util.isString(message.localIdentityKey)
                        )
                    )
                        return "localIdentityKey: buffer expected";
                }
                if (
                    message.localIdentityKeyPrivate != null &&
                    message.hasOwnProperty("localIdentityKeyPrivate")
                ) {
                    properties._localIdentityKeyPrivate = 1;
                    if (
                        !(
                            (message.localIdentityKeyPrivate &&
                                typeof message.localIdentityKeyPrivate.length === "number") ||
                            $util.isString(message.localIdentityKeyPrivate)
                        )
                    )
                        return "localIdentityKeyPrivate: buffer expected";
                }
                return null;
            };
            PendingKeyExchange.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange
                )
                    return object;
                var message =
                    new $root.SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange();
                if (object.sequence != null) message.sequence = object.sequence >>> 0;
                if (object.localBaseKey != null)
                    if (typeof object.localBaseKey === "string")
                        $util.base64.decode(
                            object.localBaseKey,
                            (message.localBaseKey = $util.newBuffer(
                                $util.base64.length(object.localBaseKey)
                            )),
                            0
                        );
                    else if (object.localBaseKey.length >= 0)
                        message.localBaseKey = object.localBaseKey;
                if (object.localBaseKeyPrivate != null)
                    if (typeof object.localBaseKeyPrivate === "string")
                        $util.base64.decode(
                            object.localBaseKeyPrivate,
                            (message.localBaseKeyPrivate = $util.newBuffer(
                                $util.base64.length(object.localBaseKeyPrivate)
                            )),
                            0
                        );
                    else if (object.localBaseKeyPrivate.length >= 0)
                        message.localBaseKeyPrivate = object.localBaseKeyPrivate;
                if (object.localRatchetKey != null)
                    if (typeof object.localRatchetKey === "string")
                        $util.base64.decode(
                            object.localRatchetKey,
                            (message.localRatchetKey = $util.newBuffer(
                                $util.base64.length(object.localRatchetKey)
                            )),
                            0
                        );
                    else if (object.localRatchetKey.length >= 0)
                        message.localRatchetKey = object.localRatchetKey;
                if (object.localRatchetKeyPrivate != null)
                    if (typeof object.localRatchetKeyPrivate === "string")
                        $util.base64.decode(
                            object.localRatchetKeyPrivate,
                            (message.localRatchetKeyPrivate = $util.newBuffer(
                                $util.base64.length(object.localRatchetKeyPrivate)
                            )),
                            0
                        );
                    else if (object.localRatchetKeyPrivate.length >= 0)
                        message.localRatchetKeyPrivate = object.localRatchetKeyPrivate;
                if (object.localIdentityKey != null)
                    if (typeof object.localIdentityKey === "string")
                        $util.base64.decode(
                            object.localIdentityKey,
                            (message.localIdentityKey = $util.newBuffer(
                                $util.base64.length(object.localIdentityKey)
                            )),
                            0
                        );
                    else if (object.localIdentityKey.length >= 0)
                        message.localIdentityKey = object.localIdentityKey;
                if (object.localIdentityKeyPrivate != null)
                    if (typeof object.localIdentityKeyPrivate === "string")
                        $util.base64.decode(
                            object.localIdentityKeyPrivate,
                            (message.localIdentityKeyPrivate = $util.newBuffer(
                                $util.base64.length(object.localIdentityKeyPrivate)
                            )),
                            0
                        );
                    else if (object.localIdentityKeyPrivate.length >= 0)
                        message.localIdentityKeyPrivate = object.localIdentityKeyPrivate;
                return message;
            };
            PendingKeyExchange.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.sequence != null && message.hasOwnProperty("sequence")) {
                    object.sequence = message.sequence;
                    if (options.oneofs) object._sequence = "sequence";
                }
                if (message.localBaseKey != null && message.hasOwnProperty("localBaseKey")) {
                    object.localBaseKey =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localBaseKey,
                                  0,
                                  message.localBaseKey.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localBaseKey)
                              : message.localBaseKey;
                    if (options.oneofs) object._localBaseKey = "localBaseKey";
                }
                if (
                    message.localBaseKeyPrivate != null &&
                    message.hasOwnProperty("localBaseKeyPrivate")
                ) {
                    object.localBaseKeyPrivate =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localBaseKeyPrivate,
                                  0,
                                  message.localBaseKeyPrivate.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localBaseKeyPrivate)
                              : message.localBaseKeyPrivate;
                    if (options.oneofs) object._localBaseKeyPrivate = "localBaseKeyPrivate";
                }
                if (message.localRatchetKey != null && message.hasOwnProperty("localRatchetKey")) {
                    object.localRatchetKey =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localRatchetKey,
                                  0,
                                  message.localRatchetKey.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localRatchetKey)
                              : message.localRatchetKey;
                    if (options.oneofs) object._localRatchetKey = "localRatchetKey";
                }
                if (
                    message.localRatchetKeyPrivate != null &&
                    message.hasOwnProperty("localRatchetKeyPrivate")
                ) {
                    object.localRatchetKeyPrivate =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localRatchetKeyPrivate,
                                  0,
                                  message.localRatchetKeyPrivate.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localRatchetKeyPrivate)
                              : message.localRatchetKeyPrivate;
                    if (options.oneofs) object._localRatchetKeyPrivate = "localRatchetKeyPrivate";
                }
                if (
                    message.localIdentityKey != null &&
                    message.hasOwnProperty("localIdentityKey")
                ) {
                    object.localIdentityKey =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localIdentityKey,
                                  0,
                                  message.localIdentityKey.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localIdentityKey)
                              : message.localIdentityKey;
                    if (options.oneofs) object._localIdentityKey = "localIdentityKey";
                }
                if (
                    message.localIdentityKeyPrivate != null &&
                    message.hasOwnProperty("localIdentityKeyPrivate")
                ) {
                    object.localIdentityKeyPrivate =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.localIdentityKeyPrivate,
                                  0,
                                  message.localIdentityKeyPrivate.length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.localIdentityKeyPrivate)
                              : message.localIdentityKeyPrivate;
                    if (options.oneofs) object._localIdentityKeyPrivate = "localIdentityKeyPrivate";
                }
                return object;
            };
            PendingKeyExchange.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PendingKeyExchange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SignalLocalStorageProtocol.SessionStructure.PendingKeyExchange"
                );
            };
            return PendingKeyExchange;
        })();
        SessionStructure.PendingPreKey = (function () {
            function PendingPreKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PendingPreKey.prototype.preKeyId = null;
            PendingPreKey.prototype.signedPreKeyId = null;
            PendingPreKey.prototype.baseKey = null;
            var $oneOfFields;
            Object.defineProperty(PendingPreKey.prototype, "_preKeyId", {
                get: $util.oneOfGetter(($oneOfFields = ["preKeyId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingPreKey.prototype, "_signedPreKeyId", {
                get: $util.oneOfGetter(($oneOfFields = ["signedPreKeyId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PendingPreKey.prototype, "_baseKey", {
                get: $util.oneOfGetter(($oneOfFields = ["baseKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PendingPreKey.create = function create(properties) {
                return new PendingPreKey(properties);
            };
            PendingPreKey.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.preKeyId != null && Object.hasOwnProperty.call(message, "preKeyId"))
                    writer.uint32(8).uint32(message.preKeyId);
                if (message.baseKey != null && Object.hasOwnProperty.call(message, "baseKey"))
                    writer.uint32(18).bytes(message.baseKey);
                if (
                    message.signedPreKeyId != null &&
                    Object.hasOwnProperty.call(message, "signedPreKeyId")
                )
                    writer.uint32(24).int32(message.signedPreKeyId);
                return writer;
            };
            PendingPreKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PendingPreKey.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.preKeyId = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.signedPreKeyId = reader.int32();
                            break;
                        }
                        case 2: {
                            message.baseKey = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PendingPreKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PendingPreKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
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
                return null;
            };
            PendingPreKey.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey
                )
                    return object;
                var message = new $root.SignalLocalStorageProtocol.SessionStructure.PendingPreKey();
                if (object.preKeyId != null) message.preKeyId = object.preKeyId >>> 0;
                if (object.signedPreKeyId != null)
                    message.signedPreKeyId = object.signedPreKeyId | 0;
                if (object.baseKey != null)
                    if (typeof object.baseKey === "string")
                        $util.base64.decode(
                            object.baseKey,
                            (message.baseKey = $util.newBuffer(
                                $util.base64.length(object.baseKey)
                            )),
                            0
                        );
                    else if (object.baseKey.length >= 0) message.baseKey = object.baseKey;
                return message;
            };
            PendingPreKey.toObject = function toObject(message, options) {
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
                if (message.signedPreKeyId != null && message.hasOwnProperty("signedPreKeyId")) {
                    object.signedPreKeyId = message.signedPreKeyId;
                    if (options.oneofs) object._signedPreKeyId = "signedPreKeyId";
                }
                return object;
            };
            PendingPreKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PendingPreKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SignalLocalStorageProtocol.SessionStructure.PendingPreKey";
            };
            return PendingPreKey;
        })();
        return SessionStructure;
    })();
    return SignalLocalStorageProtocol;
})();
module.exports = $root;

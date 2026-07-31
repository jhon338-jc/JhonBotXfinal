"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.ChatLockSettings = (function () {
    var ChatLockSettings = {};
    ChatLockSettings.ChatLockSettings = (function () {
        function ChatLockSettings(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ChatLockSettings.prototype.hideLockedChats = null;
        ChatLockSettings.prototype.secretCode = null;
        var $oneOfFields;
        Object.defineProperty(ChatLockSettings.prototype, "_hideLockedChats", {
            get: $util.oneOfGetter(($oneOfFields = ["hideLockedChats"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ChatLockSettings.prototype, "_secretCode", {
            get: $util.oneOfGetter(($oneOfFields = ["secretCode"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ChatLockSettings.create = function create(properties) {
            return new ChatLockSettings(properties);
        };
        ChatLockSettings.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.hideLockedChats != null &&
                Object.hasOwnProperty.call(message, "hideLockedChats")
            )
                writer.uint32(8).bool(message.hideLockedChats);
            if (message.secretCode != null && Object.hasOwnProperty.call(message, "secretCode"))
                $root.UserPassword.UserPassword.encode(
                    message.secretCode,
                    writer.uint32(18).fork()
                ).ldelim();
            return writer;
        };
        ChatLockSettings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ChatLockSettings.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ChatLockSettings.ChatLockSettings();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.hideLockedChats = reader.bool();
                        break;
                    }
                    case 2: {
                        message.secretCode = $root.UserPassword.UserPassword.decode(
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
        ChatLockSettings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ChatLockSettings.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.hideLockedChats != null && message.hasOwnProperty("hideLockedChats")) {
                properties._hideLockedChats = 1;
                if (typeof message.hideLockedChats !== "boolean")
                    return "hideLockedChats: boolean expected";
            }
            if (message.secretCode != null && message.hasOwnProperty("secretCode")) {
                properties._secretCode = 1;
                {
                    var error = $root.UserPassword.UserPassword.verify(message.secretCode);
                    if (error) return "secretCode." + error;
                }
            }
            return null;
        };
        ChatLockSettings.fromObject = function fromObject(object) {
            if (object instanceof $root.ChatLockSettings.ChatLockSettings) return object;
            var message = new $root.ChatLockSettings.ChatLockSettings();
            if (object.hideLockedChats != null)
                message.hideLockedChats = Boolean(object.hideLockedChats);
            if (object.secretCode != null) {
                if (typeof object.secretCode !== "object")
                    throw TypeError(
                        ".ChatLockSettings.ChatLockSettings.secretCode: object expected"
                    );
                message.secretCode = $root.UserPassword.UserPassword.fromObject(object.secretCode);
            }
            return message;
        };
        ChatLockSettings.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.hideLockedChats != null && message.hasOwnProperty("hideLockedChats")) {
                object.hideLockedChats = message.hideLockedChats;
                if (options.oneofs) object._hideLockedChats = "hideLockedChats";
            }
            if (message.secretCode != null && message.hasOwnProperty("secretCode")) {
                object.secretCode = $root.UserPassword.UserPassword.toObject(
                    message.secretCode,
                    options
                );
                if (options.oneofs) object._secretCode = "secretCode";
            }
            return object;
        };
        ChatLockSettings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ChatLockSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ChatLockSettings.ChatLockSettings";
        };
        return ChatLockSettings;
    })();
    return ChatLockSettings;
})();
$root.UserPassword = (function () {
    var UserPassword = {};
    UserPassword.UserPassword = (function () {
        function UserPassword(properties) {
            this.transformerArg = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        UserPassword.prototype.encoding = null;
        UserPassword.prototype.transformer = null;
        UserPassword.prototype.transformerArg = $util.emptyArray;
        UserPassword.prototype.transformedData = null;
        var $oneOfFields;
        Object.defineProperty(UserPassword.prototype, "_encoding", {
            get: $util.oneOfGetter(($oneOfFields = ["encoding"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(UserPassword.prototype, "_transformer", {
            get: $util.oneOfGetter(($oneOfFields = ["transformer"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(UserPassword.prototype, "_transformedData", {
            get: $util.oneOfGetter(($oneOfFields = ["transformedData"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        UserPassword.create = function create(properties) {
            return new UserPassword(properties);
        };
        UserPassword.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.encoding != null && Object.hasOwnProperty.call(message, "encoding"))
                writer.uint32(8).int32(message.encoding);
            if (message.transformer != null && Object.hasOwnProperty.call(message, "transformer"))
                writer.uint32(16).int32(message.transformer);
            if (message.transformerArg != null && message.transformerArg.length)
                for (var i = 0; i < message.transformerArg.length; ++i)
                    $root.UserPassword.UserPassword.TransformerArg.encode(
                        message.transformerArg[i],
                        writer.uint32(26).fork()
                    ).ldelim();
            if (
                message.transformedData != null &&
                Object.hasOwnProperty.call(message, "transformedData")
            )
                writer.uint32(34).bytes(message.transformedData);
            return writer;
        };
        UserPassword.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        UserPassword.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.UserPassword.UserPassword();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.encoding = reader.int32();
                        break;
                    }
                    case 2: {
                        message.transformer = reader.int32();
                        break;
                    }
                    case 3: {
                        if (!(message.transformerArg && message.transformerArg.length))
                            message.transformerArg = [];
                        message.transformerArg.push(
                            $root.UserPassword.UserPassword.TransformerArg.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 4: {
                        message.transformedData = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        UserPassword.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        UserPassword.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.encoding != null && message.hasOwnProperty("encoding")) {
                properties._encoding = 1;
                switch (message.encoding) {
                    default:
                        return "encoding: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.transformer != null && message.hasOwnProperty("transformer")) {
                properties._transformer = 1;
                switch (message.transformer) {
                    default:
                        return "transformer: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.transformerArg != null && message.hasOwnProperty("transformerArg")) {
                if (!Array.isArray(message.transformerArg)) return "transformerArg: array expected";
                for (var i = 0; i < message.transformerArg.length; ++i) {
                    var error = $root.UserPassword.UserPassword.TransformerArg.verify(
                        message.transformerArg[i]
                    );
                    if (error) return "transformerArg." + error;
                }
            }
            if (message.transformedData != null && message.hasOwnProperty("transformedData")) {
                properties._transformedData = 1;
                if (
                    !(
                        (message.transformedData &&
                            typeof message.transformedData.length === "number") ||
                        $util.isString(message.transformedData)
                    )
                )
                    return "transformedData: buffer expected";
            }
            return null;
        };
        UserPassword.fromObject = function fromObject(object) {
            if (object instanceof $root.UserPassword.UserPassword) return object;
            var message = new $root.UserPassword.UserPassword();
            switch (object.encoding) {
                default:
                    if (typeof object.encoding === "number") {
                        message.encoding = object.encoding;
                        break;
                    }
                    break;
                case "UTF8":
                case 0:
                    message.encoding = 0;
                    break;
                case "UTF8_BROKEN":
                case 1:
                    message.encoding = 1;
                    break;
            }
            switch (object.transformer) {
                default:
                    if (typeof object.transformer === "number") {
                        message.transformer = object.transformer;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.transformer = 0;
                    break;
                case "PBKDF2_HMAC_SHA512":
                case 1:
                    message.transformer = 1;
                    break;
                case "PBKDF2_HMAC_SHA384":
                case 2:
                    message.transformer = 2;
                    break;
            }
            if (object.transformerArg) {
                if (!Array.isArray(object.transformerArg))
                    throw TypeError(".UserPassword.UserPassword.transformerArg: array expected");
                message.transformerArg = [];
                for (var i = 0; i < object.transformerArg.length; ++i) {
                    if (typeof object.transformerArg[i] !== "object")
                        throw TypeError(
                            ".UserPassword.UserPassword.transformerArg: object expected"
                        );
                    message.transformerArg[i] =
                        $root.UserPassword.UserPassword.TransformerArg.fromObject(
                            object.transformerArg[i]
                        );
                }
            }
            if (object.transformedData != null)
                if (typeof object.transformedData === "string")
                    $util.base64.decode(
                        object.transformedData,
                        (message.transformedData = $util.newBuffer(
                            $util.base64.length(object.transformedData)
                        )),
                        0
                    );
                else if (object.transformedData.length >= 0)
                    message.transformedData = object.transformedData;
            return message;
        };
        UserPassword.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.transformerArg = [];
            if (message.encoding != null && message.hasOwnProperty("encoding")) {
                object.encoding =
                    options.enums === String
                        ? $root.UserPassword.UserPassword.Encoding[message.encoding] === undefined
                            ? message.encoding
                            : $root.UserPassword.UserPassword.Encoding[message.encoding]
                        : message.encoding;
                if (options.oneofs) object._encoding = "encoding";
            }
            if (message.transformer != null && message.hasOwnProperty("transformer")) {
                object.transformer =
                    options.enums === String
                        ? $root.UserPassword.UserPassword.Transformer[message.transformer] ===
                          undefined
                            ? message.transformer
                            : $root.UserPassword.UserPassword.Transformer[message.transformer]
                        : message.transformer;
                if (options.oneofs) object._transformer = "transformer";
            }
            if (message.transformerArg && message.transformerArg.length) {
                object.transformerArg = [];
                for (var j = 0; j < message.transformerArg.length; ++j)
                    object.transformerArg[j] =
                        $root.UserPassword.UserPassword.TransformerArg.toObject(
                            message.transformerArg[j],
                            options
                        );
            }
            if (message.transformedData != null && message.hasOwnProperty("transformedData")) {
                object.transformedData =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.transformedData,
                              0,
                              message.transformedData.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.transformedData)
                          : message.transformedData;
                if (options.oneofs) object._transformedData = "transformedData";
            }
            return object;
        };
        UserPassword.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        UserPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UserPassword.UserPassword";
        };
        UserPassword.Encoding = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UTF8")] = 0;
            values[(valuesById[1] = "UTF8_BROKEN")] = 1;
            return values;
        })();
        UserPassword.Transformer = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "NONE")] = 0;
            values[(valuesById[1] = "PBKDF2_HMAC_SHA512")] = 1;
            values[(valuesById[2] = "PBKDF2_HMAC_SHA384")] = 2;
            return values;
        })();
        UserPassword.TransformerArg = (function () {
            function TransformerArg(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            TransformerArg.prototype.key = null;
            TransformerArg.prototype.value = null;
            var $oneOfFields;
            Object.defineProperty(TransformerArg.prototype, "_key", {
                get: $util.oneOfGetter(($oneOfFields = ["key"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(TransformerArg.prototype, "_value", {
                get: $util.oneOfGetter(($oneOfFields = ["value"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            TransformerArg.create = function create(properties) {
                return new TransformerArg(properties);
            };
            TransformerArg.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(10).string(message.key);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    $root.UserPassword.UserPassword.TransformerArg.Value.encode(
                        message.value,
                        writer.uint32(18).fork()
                    ).ldelim();
                return writer;
            };
            TransformerArg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            TransformerArg.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.UserPassword.UserPassword.TransformerArg();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.key = reader.string();
                            break;
                        }
                        case 2: {
                            message.value =
                                $root.UserPassword.UserPassword.TransformerArg.Value.decode(
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
            TransformerArg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            TransformerArg.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    properties._key = 1;
                    if (!$util.isString(message.key)) return "key: string expected";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    properties._value = 1;
                    {
                        var error = $root.UserPassword.UserPassword.TransformerArg.Value.verify(
                            message.value
                        );
                        if (error) return "value." + error;
                    }
                }
                return null;
            };
            TransformerArg.fromObject = function fromObject(object) {
                if (object instanceof $root.UserPassword.UserPassword.TransformerArg) return object;
                var message = new $root.UserPassword.UserPassword.TransformerArg();
                if (object.key != null) message.key = String(object.key);
                if (object.value != null) {
                    if (typeof object.value !== "object")
                        throw TypeError(
                            ".UserPassword.UserPassword.TransformerArg.value: object expected"
                        );
                    message.value = $root.UserPassword.UserPassword.TransformerArg.Value.fromObject(
                        object.value
                    );
                }
                return message;
            };
            TransformerArg.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    object.key = message.key;
                    if (options.oneofs) object._key = "key";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    object.value = $root.UserPassword.UserPassword.TransformerArg.Value.toObject(
                        message.value,
                        options
                    );
                    if (options.oneofs) object._value = "value";
                }
                return object;
            };
            TransformerArg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            TransformerArg.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/UserPassword.UserPassword.TransformerArg";
            };
            TransformerArg.Value = (function () {
                function Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                Value.prototype.asBlob = null;
                Value.prototype.asUnsignedInteger = null;
                var $oneOfFields;
                Object.defineProperty(Value.prototype, "value", {
                    get: $util.oneOfGetter(($oneOfFields = ["asBlob", "asUnsignedInteger"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Value.create = function create(properties) {
                    return new Value(properties);
                };
                Value.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.asBlob != null && Object.hasOwnProperty.call(message, "asBlob"))
                        writer.uint32(10).bytes(message.asBlob);
                    if (
                        message.asUnsignedInteger != null &&
                        Object.hasOwnProperty.call(message, "asUnsignedInteger")
                    )
                        writer.uint32(16).uint32(message.asUnsignedInteger);
                    return writer;
                };
                Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                Value.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message = new $root.UserPassword.UserPassword.TransformerArg.Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.asBlob = reader.bytes();
                                break;
                            }
                            case 2: {
                                message.asUnsignedInteger = reader.uint32();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.asBlob != null && message.hasOwnProperty("asBlob")) {
                        properties.value = 1;
                        if (
                            !(
                                (message.asBlob && typeof message.asBlob.length === "number") ||
                                $util.isString(message.asBlob)
                            )
                        )
                            return "asBlob: buffer expected";
                    }
                    if (
                        message.asUnsignedInteger != null &&
                        message.hasOwnProperty("asUnsignedInteger")
                    ) {
                        if (properties.value === 1) return "value: multiple values";
                        properties.value = 1;
                        if (!$util.isInteger(message.asUnsignedInteger))
                            return "asUnsignedInteger: integer expected";
                    }
                    return null;
                };
                Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.UserPassword.UserPassword.TransformerArg.Value)
                        return object;
                    var message = new $root.UserPassword.UserPassword.TransformerArg.Value();
                    if (object.asBlob != null)
                        if (typeof object.asBlob === "string")
                            $util.base64.decode(
                                object.asBlob,
                                (message.asBlob = $util.newBuffer(
                                    $util.base64.length(object.asBlob)
                                )),
                                0
                            );
                        else if (object.asBlob.length >= 0) message.asBlob = object.asBlob;
                    if (object.asUnsignedInteger != null)
                        message.asUnsignedInteger = object.asUnsignedInteger >>> 0;
                    return message;
                };
                Value.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.asBlob != null && message.hasOwnProperty("asBlob")) {
                        object.asBlob =
                            options.bytes === String
                                ? $util.base64.encode(message.asBlob, 0, message.asBlob.length)
                                : options.bytes === Array
                                  ? Array.prototype.slice.call(message.asBlob)
                                  : message.asBlob;
                        if (options.oneofs) object.value = "asBlob";
                    }
                    if (
                        message.asUnsignedInteger != null &&
                        message.hasOwnProperty("asUnsignedInteger")
                    ) {
                        object.asUnsignedInteger = message.asUnsignedInteger;
                        if (options.oneofs) object.value = "asUnsignedInteger";
                    }
                    return object;
                };
                Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Value.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/UserPassword.UserPassword.TransformerArg.Value";
                };
                return Value;
            })();
            return TransformerArg;
        })();
        return UserPassword;
    })();
    return UserPassword;
})();
module.exports = $root;

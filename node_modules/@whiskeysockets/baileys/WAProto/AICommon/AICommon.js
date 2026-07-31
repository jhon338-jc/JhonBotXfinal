"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.AICommon = (function () {
    var AICommon = {};
    AICommon.AIHomeState = (function () {
        function AIHomeState(properties) {
            this.capabilityOptions = [];
            this.conversationOptions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIHomeState.prototype.lastFetchTime = null;
        AIHomeState.prototype.capabilityOptions = $util.emptyArray;
        AIHomeState.prototype.conversationOptions = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(AIHomeState.prototype, "_lastFetchTime", {
            get: $util.oneOfGetter(($oneOfFields = ["lastFetchTime"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIHomeState.create = function create(properties) {
            return new AIHomeState(properties);
        };
        AIHomeState.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.lastFetchTime != null &&
                Object.hasOwnProperty.call(message, "lastFetchTime")
            )
                writer.uint32(8).int64(message.lastFetchTime);
            if (message.capabilityOptions != null && message.capabilityOptions.length)
                for (var i = 0; i < message.capabilityOptions.length; ++i)
                    $root.AICommon.AIHomeState.AIHomeOption.encode(
                        message.capabilityOptions[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            if (message.conversationOptions != null && message.conversationOptions.length)
                for (var i = 0; i < message.conversationOptions.length; ++i)
                    $root.AICommon.AIHomeState.AIHomeOption.encode(
                        message.conversationOptions[i],
                        writer.uint32(26).fork()
                    ).ldelim();
            return writer;
        };
        AIHomeState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIHomeState.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIHomeState();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.lastFetchTime = reader.int64();
                        break;
                    }
                    case 2: {
                        if (!(message.capabilityOptions && message.capabilityOptions.length))
                            message.capabilityOptions = [];
                        message.capabilityOptions.push(
                            $root.AICommon.AIHomeState.AIHomeOption.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 3: {
                        if (!(message.conversationOptions && message.conversationOptions.length))
                            message.conversationOptions = [];
                        message.conversationOptions.push(
                            $root.AICommon.AIHomeState.AIHomeOption.decode(reader, reader.uint32())
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
        AIHomeState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIHomeState.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.lastFetchTime != null && message.hasOwnProperty("lastFetchTime")) {
                properties._lastFetchTime = 1;
                if (
                    !$util.isInteger(message.lastFetchTime) &&
                    !(
                        message.lastFetchTime &&
                        $util.isInteger(message.lastFetchTime.low) &&
                        $util.isInteger(message.lastFetchTime.high)
                    )
                )
                    return "lastFetchTime: integer|Long expected";
            }
            if (message.capabilityOptions != null && message.hasOwnProperty("capabilityOptions")) {
                if (!Array.isArray(message.capabilityOptions))
                    return "capabilityOptions: array expected";
                for (var i = 0; i < message.capabilityOptions.length; ++i) {
                    var error = $root.AICommon.AIHomeState.AIHomeOption.verify(
                        message.capabilityOptions[i]
                    );
                    if (error) return "capabilityOptions." + error;
                }
            }
            if (
                message.conversationOptions != null &&
                message.hasOwnProperty("conversationOptions")
            ) {
                if (!Array.isArray(message.conversationOptions))
                    return "conversationOptions: array expected";
                for (var i = 0; i < message.conversationOptions.length; ++i) {
                    var error = $root.AICommon.AIHomeState.AIHomeOption.verify(
                        message.conversationOptions[i]
                    );
                    if (error) return "conversationOptions." + error;
                }
            }
            return null;
        };
        AIHomeState.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIHomeState) return object;
            var message = new $root.AICommon.AIHomeState();
            if (object.lastFetchTime != null)
                if ($util.Long)
                    (message.lastFetchTime = $util.Long.fromValue(object.lastFetchTime)).unsigned =
                        false;
                else if (typeof object.lastFetchTime === "string")
                    message.lastFetchTime = parseInt(object.lastFetchTime, 10);
                else if (typeof object.lastFetchTime === "number")
                    message.lastFetchTime = object.lastFetchTime;
                else if (typeof object.lastFetchTime === "object")
                    message.lastFetchTime = new $util.LongBits(
                        object.lastFetchTime.low >>> 0,
                        object.lastFetchTime.high >>> 0
                    ).toNumber();
            if (object.capabilityOptions) {
                if (!Array.isArray(object.capabilityOptions))
                    throw TypeError(".AICommon.AIHomeState.capabilityOptions: array expected");
                message.capabilityOptions = [];
                for (var i = 0; i < object.capabilityOptions.length; ++i) {
                    if (typeof object.capabilityOptions[i] !== "object")
                        throw TypeError(".AICommon.AIHomeState.capabilityOptions: object expected");
                    message.capabilityOptions[i] =
                        $root.AICommon.AIHomeState.AIHomeOption.fromObject(
                            object.capabilityOptions[i]
                        );
                }
            }
            if (object.conversationOptions) {
                if (!Array.isArray(object.conversationOptions))
                    throw TypeError(".AICommon.AIHomeState.conversationOptions: array expected");
                message.conversationOptions = [];
                for (var i = 0; i < object.conversationOptions.length; ++i) {
                    if (typeof object.conversationOptions[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIHomeState.conversationOptions: object expected"
                        );
                    message.conversationOptions[i] =
                        $root.AICommon.AIHomeState.AIHomeOption.fromObject(
                            object.conversationOptions[i]
                        );
                }
            }
            return message;
        };
        AIHomeState.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.capabilityOptions = [];
                object.conversationOptions = [];
            }
            if (message.lastFetchTime != null && message.hasOwnProperty("lastFetchTime")) {
                if (typeof message.lastFetchTime === "number")
                    object.lastFetchTime =
                        options.longs === String
                            ? String(message.lastFetchTime)
                            : message.lastFetchTime;
                else
                    object.lastFetchTime =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.lastFetchTime)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.lastFetchTime.low >>> 0,
                                    message.lastFetchTime.high >>> 0
                                ).toNumber()
                              : message.lastFetchTime;
                if (options.oneofs) object._lastFetchTime = "lastFetchTime";
            }
            if (message.capabilityOptions && message.capabilityOptions.length) {
                object.capabilityOptions = [];
                for (var j = 0; j < message.capabilityOptions.length; ++j)
                    object.capabilityOptions[j] = $root.AICommon.AIHomeState.AIHomeOption.toObject(
                        message.capabilityOptions[j],
                        options
                    );
            }
            if (message.conversationOptions && message.conversationOptions.length) {
                object.conversationOptions = [];
                for (var j = 0; j < message.conversationOptions.length; ++j)
                    object.conversationOptions[j] =
                        $root.AICommon.AIHomeState.AIHomeOption.toObject(
                            message.conversationOptions[j],
                            options
                        );
            }
            return object;
        };
        AIHomeState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIHomeState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIHomeState";
        };
        AIHomeState.AIHomeOption = (function () {
            function AIHomeOption(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIHomeOption.prototype.type = null;
            AIHomeOption.prototype.title = null;
            AIHomeOption.prototype.promptText = null;
            AIHomeOption.prototype.sessionId = null;
            AIHomeOption.prototype.imageWdsIdentifier = null;
            AIHomeOption.prototype.imageTintColor = null;
            AIHomeOption.prototype.imageBackgroundColor = null;
            var $oneOfFields;
            Object.defineProperty(AIHomeOption.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_title", {
                get: $util.oneOfGetter(($oneOfFields = ["title"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_promptText", {
                get: $util.oneOfGetter(($oneOfFields = ["promptText"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_sessionId", {
                get: $util.oneOfGetter(($oneOfFields = ["sessionId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_imageWdsIdentifier", {
                get: $util.oneOfGetter(($oneOfFields = ["imageWdsIdentifier"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_imageTintColor", {
                get: $util.oneOfGetter(($oneOfFields = ["imageTintColor"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIHomeOption.prototype, "_imageBackgroundColor", {
                get: $util.oneOfGetter(($oneOfFields = ["imageBackgroundColor"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIHomeOption.create = function create(properties) {
                return new AIHomeOption(properties);
            };
            AIHomeOption.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(8).int32(message.type);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(18).string(message.title);
                if (message.promptText != null && Object.hasOwnProperty.call(message, "promptText"))
                    writer.uint32(26).string(message.promptText);
                if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                    writer.uint32(34).string(message.sessionId);
                if (
                    message.imageWdsIdentifier != null &&
                    Object.hasOwnProperty.call(message, "imageWdsIdentifier")
                )
                    writer.uint32(42).string(message.imageWdsIdentifier);
                if (
                    message.imageTintColor != null &&
                    Object.hasOwnProperty.call(message, "imageTintColor")
                )
                    writer.uint32(50).string(message.imageTintColor);
                if (
                    message.imageBackgroundColor != null &&
                    Object.hasOwnProperty.call(message, "imageBackgroundColor")
                )
                    writer.uint32(58).string(message.imageBackgroundColor);
                return writer;
            };
            AIHomeOption.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIHomeOption.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.AIHomeState.AIHomeOption();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.type = reader.int32();
                            break;
                        }
                        case 2: {
                            message.title = reader.string();
                            break;
                        }
                        case 3: {
                            message.promptText = reader.string();
                            break;
                        }
                        case 4: {
                            message.sessionId = reader.string();
                            break;
                        }
                        case 5: {
                            message.imageWdsIdentifier = reader.string();
                            break;
                        }
                        case 6: {
                            message.imageTintColor = reader.string();
                            break;
                        }
                        case 7: {
                            message.imageBackgroundColor = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIHomeOption.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIHomeOption.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    properties._title = 1;
                    if (!$util.isString(message.title)) return "title: string expected";
                }
                if (message.promptText != null && message.hasOwnProperty("promptText")) {
                    properties._promptText = 1;
                    if (!$util.isString(message.promptText)) return "promptText: string expected";
                }
                if (message.sessionId != null && message.hasOwnProperty("sessionId")) {
                    properties._sessionId = 1;
                    if (!$util.isString(message.sessionId)) return "sessionId: string expected";
                }
                if (
                    message.imageWdsIdentifier != null &&
                    message.hasOwnProperty("imageWdsIdentifier")
                ) {
                    properties._imageWdsIdentifier = 1;
                    if (!$util.isString(message.imageWdsIdentifier))
                        return "imageWdsIdentifier: string expected";
                }
                if (message.imageTintColor != null && message.hasOwnProperty("imageTintColor")) {
                    properties._imageTintColor = 1;
                    if (!$util.isString(message.imageTintColor))
                        return "imageTintColor: string expected";
                }
                if (
                    message.imageBackgroundColor != null &&
                    message.hasOwnProperty("imageBackgroundColor")
                ) {
                    properties._imageBackgroundColor = 1;
                    if (!$util.isString(message.imageBackgroundColor))
                        return "imageBackgroundColor: string expected";
                }
                return null;
            };
            AIHomeOption.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.AIHomeState.AIHomeOption) return object;
                var message = new $root.AICommon.AIHomeState.AIHomeOption();
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "PROMPT":
                    case 0:
                        message.type = 0;
                        break;
                    case "CREATE_IMAGE":
                    case 1:
                        message.type = 1;
                        break;
                    case "ANIMATE_PHOTO":
                    case 2:
                        message.type = 2;
                        break;
                    case "ANALYZE_FILE":
                    case 3:
                        message.type = 3;
                        break;
                }
                if (object.title != null) message.title = String(object.title);
                if (object.promptText != null) message.promptText = String(object.promptText);
                if (object.sessionId != null) message.sessionId = String(object.sessionId);
                if (object.imageWdsIdentifier != null)
                    message.imageWdsIdentifier = String(object.imageWdsIdentifier);
                if (object.imageTintColor != null)
                    message.imageTintColor = String(object.imageTintColor);
                if (object.imageBackgroundColor != null)
                    message.imageBackgroundColor = String(object.imageBackgroundColor);
                return message;
            };
            AIHomeOption.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.AICommon.AIHomeState.AIHomeOption.AIHomeActionType[
                                  message.type
                              ] === undefined
                                ? message.type
                                : $root.AICommon.AIHomeState.AIHomeOption.AIHomeActionType[
                                      message.type
                                  ]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    object.title = message.title;
                    if (options.oneofs) object._title = "title";
                }
                if (message.promptText != null && message.hasOwnProperty("promptText")) {
                    object.promptText = message.promptText;
                    if (options.oneofs) object._promptText = "promptText";
                }
                if (message.sessionId != null && message.hasOwnProperty("sessionId")) {
                    object.sessionId = message.sessionId;
                    if (options.oneofs) object._sessionId = "sessionId";
                }
                if (
                    message.imageWdsIdentifier != null &&
                    message.hasOwnProperty("imageWdsIdentifier")
                ) {
                    object.imageWdsIdentifier = message.imageWdsIdentifier;
                    if (options.oneofs) object._imageWdsIdentifier = "imageWdsIdentifier";
                }
                if (message.imageTintColor != null && message.hasOwnProperty("imageTintColor")) {
                    object.imageTintColor = message.imageTintColor;
                    if (options.oneofs) object._imageTintColor = "imageTintColor";
                }
                if (
                    message.imageBackgroundColor != null &&
                    message.hasOwnProperty("imageBackgroundColor")
                ) {
                    object.imageBackgroundColor = message.imageBackgroundColor;
                    if (options.oneofs) object._imageBackgroundColor = "imageBackgroundColor";
                }
                return object;
            };
            AIHomeOption.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIHomeOption.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.AIHomeState.AIHomeOption";
            };
            AIHomeOption.AIHomeActionType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "PROMPT")] = 0;
                values[(valuesById[1] = "CREATE_IMAGE")] = 1;
                values[(valuesById[2] = "ANIMATE_PHOTO")] = 2;
                values[(valuesById[3] = "ANALYZE_FILE")] = 3;
                return values;
            })();
            return AIHomeOption;
        })();
        return AIHomeState;
    })();
    AICommon.BotDocumentMessageMetadata = (function () {
        function BotDocumentMessageMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotDocumentMessageMetadata.prototype.pluginType = null;
        var $oneOfFields;
        Object.defineProperty(BotDocumentMessageMetadata.prototype, "_pluginType", {
            get: $util.oneOfGetter(($oneOfFields = ["pluginType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotDocumentMessageMetadata.create = function create(properties) {
            return new BotDocumentMessageMetadata(properties);
        };
        BotDocumentMessageMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.pluginType != null && Object.hasOwnProperty.call(message, "pluginType"))
                writer.uint32(8).int32(message.pluginType);
            return writer;
        };
        BotDocumentMessageMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotDocumentMessageMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotDocumentMessageMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.pluginType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotDocumentMessageMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotDocumentMessageMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.pluginType != null && message.hasOwnProperty("pluginType")) {
                properties._pluginType = 1;
                switch (message.pluginType) {
                    default:
                        return "pluginType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        BotDocumentMessageMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotDocumentMessageMetadata) return object;
            var message = new $root.AICommon.BotDocumentMessageMetadata();
            switch (object.pluginType) {
                default:
                    if (typeof object.pluginType === "number") {
                        message.pluginType = object.pluginType;
                        break;
                    }
                    break;
                case "TEXT_EXTRACTION":
                case 0:
                    message.pluginType = 0;
                    break;
                case "OCR_AND_IMAGES":
                case 1:
                    message.pluginType = 1;
                    break;
            }
            return message;
        };
        BotDocumentMessageMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.pluginType != null && message.hasOwnProperty("pluginType")) {
                object.pluginType =
                    options.enums === String
                        ? $root.AICommon.BotDocumentMessageMetadata.DocumentPluginType[
                              message.pluginType
                          ] === undefined
                            ? message.pluginType
                            : $root.AICommon.BotDocumentMessageMetadata.DocumentPluginType[
                                  message.pluginType
                              ]
                        : message.pluginType;
                if (options.oneofs) object._pluginType = "pluginType";
            }
            return object;
        };
        BotDocumentMessageMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotDocumentMessageMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotDocumentMessageMetadata";
        };
        BotDocumentMessageMetadata.DocumentPluginType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "TEXT_EXTRACTION")] = 0;
            values[(valuesById[1] = "OCR_AND_IMAGES")] = 1;
            return values;
        })();
        return BotDocumentMessageMetadata;
    })();
    AICommon.SessionTransparencyMetadata = (function () {
        function SessionTransparencyMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SessionTransparencyMetadata.prototype.disclaimerText = null;
        SessionTransparencyMetadata.prototype.hcaId = null;
        SessionTransparencyMetadata.prototype.sessionTransparencyType = null;
        var $oneOfFields;
        Object.defineProperty(SessionTransparencyMetadata.prototype, "_disclaimerText", {
            get: $util.oneOfGetter(($oneOfFields = ["disclaimerText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionTransparencyMetadata.prototype, "_hcaId", {
            get: $util.oneOfGetter(($oneOfFields = ["hcaId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SessionTransparencyMetadata.prototype, "_sessionTransparencyType", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionTransparencyType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SessionTransparencyMetadata.create = function create(properties) {
            return new SessionTransparencyMetadata(properties);
        };
        SessionTransparencyMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.disclaimerText != null &&
                Object.hasOwnProperty.call(message, "disclaimerText")
            )
                writer.uint32(10).string(message.disclaimerText);
            if (message.hcaId != null && Object.hasOwnProperty.call(message, "hcaId"))
                writer.uint32(18).string(message.hcaId);
            if (
                message.sessionTransparencyType != null &&
                Object.hasOwnProperty.call(message, "sessionTransparencyType")
            )
                writer.uint32(24).int32(message.sessionTransparencyType);
            return writer;
        };
        SessionTransparencyMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SessionTransparencyMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.SessionTransparencyMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.disclaimerText = reader.string();
                        break;
                    }
                    case 2: {
                        message.hcaId = reader.string();
                        break;
                    }
                    case 3: {
                        message.sessionTransparencyType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SessionTransparencyMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SessionTransparencyMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.disclaimerText != null && message.hasOwnProperty("disclaimerText")) {
                properties._disclaimerText = 1;
                if (!$util.isString(message.disclaimerText))
                    return "disclaimerText: string expected";
            }
            if (message.hcaId != null && message.hasOwnProperty("hcaId")) {
                properties._hcaId = 1;
                if (!$util.isString(message.hcaId)) return "hcaId: string expected";
            }
            if (
                message.sessionTransparencyType != null &&
                message.hasOwnProperty("sessionTransparencyType")
            ) {
                properties._sessionTransparencyType = 1;
                switch (message.sessionTransparencyType) {
                    default:
                        return "sessionTransparencyType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        SessionTransparencyMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.SessionTransparencyMetadata) return object;
            var message = new $root.AICommon.SessionTransparencyMetadata();
            if (object.disclaimerText != null)
                message.disclaimerText = String(object.disclaimerText);
            if (object.hcaId != null) message.hcaId = String(object.hcaId);
            switch (object.sessionTransparencyType) {
                default:
                    if (typeof object.sessionTransparencyType === "number") {
                        message.sessionTransparencyType = object.sessionTransparencyType;
                        break;
                    }
                    break;
                case "UNKNOWN_TYPE":
                case 0:
                    message.sessionTransparencyType = 0;
                    break;
                case "NY_AI_SAFETY_DISCLAIMER":
                case 1:
                    message.sessionTransparencyType = 1;
                    break;
            }
            return message;
        };
        SessionTransparencyMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.disclaimerText != null && message.hasOwnProperty("disclaimerText")) {
                object.disclaimerText = message.disclaimerText;
                if (options.oneofs) object._disclaimerText = "disclaimerText";
            }
            if (message.hcaId != null && message.hasOwnProperty("hcaId")) {
                object.hcaId = message.hcaId;
                if (options.oneofs) object._hcaId = "hcaId";
            }
            if (
                message.sessionTransparencyType != null &&
                message.hasOwnProperty("sessionTransparencyType")
            ) {
                object.sessionTransparencyType =
                    options.enums === String
                        ? $root.AICommon.SessionTransparencyType[
                              message.sessionTransparencyType
                          ] === undefined
                            ? message.sessionTransparencyType
                            : $root.AICommon.SessionTransparencyType[
                                  message.sessionTransparencyType
                              ]
                        : message.sessionTransparencyType;
                if (options.oneofs) object._sessionTransparencyType = "sessionTransparencyType";
            }
            return object;
        };
        SessionTransparencyMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SessionTransparencyMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.SessionTransparencyMetadata";
        };
        return SessionTransparencyMetadata;
    })();
    AICommon.AIRegenerateMetadata = (function () {
        function AIRegenerateMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRegenerateMetadata.prototype.messageKey = null;
        AIRegenerateMetadata.prototype.responseTimestampMs = null;
        var $oneOfFields;
        Object.defineProperty(AIRegenerateMetadata.prototype, "_messageKey", {
            get: $util.oneOfGetter(($oneOfFields = ["messageKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRegenerateMetadata.prototype, "_responseTimestampMs", {
            get: $util.oneOfGetter(($oneOfFields = ["responseTimestampMs"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRegenerateMetadata.create = function create(properties) {
            return new AIRegenerateMetadata(properties);
        };
        AIRegenerateMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.messageKey != null && Object.hasOwnProperty.call(message, "messageKey"))
                $root.Protocol.MessageKey.encode(
                    message.messageKey,
                    writer.uint32(10).fork()
                ).ldelim();
            if (
                message.responseTimestampMs != null &&
                Object.hasOwnProperty.call(message, "responseTimestampMs")
            )
                writer.uint32(16).int64(message.responseTimestampMs);
            return writer;
        };
        AIRegenerateMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRegenerateMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRegenerateMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.messageKey = $root.Protocol.MessageKey.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.responseTimestampMs = reader.int64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRegenerateMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRegenerateMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.messageKey != null && message.hasOwnProperty("messageKey")) {
                properties._messageKey = 1;
                {
                    var error = $root.Protocol.MessageKey.verify(message.messageKey);
                    if (error) return "messageKey." + error;
                }
            }
            if (
                message.responseTimestampMs != null &&
                message.hasOwnProperty("responseTimestampMs")
            ) {
                properties._responseTimestampMs = 1;
                if (
                    !$util.isInteger(message.responseTimestampMs) &&
                    !(
                        message.responseTimestampMs &&
                        $util.isInteger(message.responseTimestampMs.low) &&
                        $util.isInteger(message.responseTimestampMs.high)
                    )
                )
                    return "responseTimestampMs: integer|Long expected";
            }
            return null;
        };
        AIRegenerateMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRegenerateMetadata) return object;
            var message = new $root.AICommon.AIRegenerateMetadata();
            if (object.messageKey != null) {
                if (typeof object.messageKey !== "object")
                    throw TypeError(".AICommon.AIRegenerateMetadata.messageKey: object expected");
                message.messageKey = $root.Protocol.MessageKey.fromObject(object.messageKey);
            }
            if (object.responseTimestampMs != null)
                if ($util.Long)
                    (message.responseTimestampMs = $util.Long.fromValue(
                        object.responseTimestampMs
                    )).unsigned = false;
                else if (typeof object.responseTimestampMs === "string")
                    message.responseTimestampMs = parseInt(object.responseTimestampMs, 10);
                else if (typeof object.responseTimestampMs === "number")
                    message.responseTimestampMs = object.responseTimestampMs;
                else if (typeof object.responseTimestampMs === "object")
                    message.responseTimestampMs = new $util.LongBits(
                        object.responseTimestampMs.low >>> 0,
                        object.responseTimestampMs.high >>> 0
                    ).toNumber();
            return message;
        };
        AIRegenerateMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.messageKey != null && message.hasOwnProperty("messageKey")) {
                object.messageKey = $root.Protocol.MessageKey.toObject(message.messageKey, options);
                if (options.oneofs) object._messageKey = "messageKey";
            }
            if (
                message.responseTimestampMs != null &&
                message.hasOwnProperty("responseTimestampMs")
            ) {
                if (typeof message.responseTimestampMs === "number")
                    object.responseTimestampMs =
                        options.longs === String
                            ? String(message.responseTimestampMs)
                            : message.responseTimestampMs;
                else
                    object.responseTimestampMs =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.responseTimestampMs)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.responseTimestampMs.low >>> 0,
                                    message.responseTimestampMs.high >>> 0
                                ).toNumber()
                              : message.responseTimestampMs;
                if (options.oneofs) object._responseTimestampMs = "responseTimestampMs";
            }
            return object;
        };
        AIRegenerateMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRegenerateMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRegenerateMetadata";
        };
        return AIRegenerateMetadata;
    })();
    AICommon.AIRichResponseSubMessage = (function () {
        function AIRichResponseSubMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseSubMessage.prototype.messageType = null;
        AIRichResponseSubMessage.prototype.gridImageMetadata = null;
        AIRichResponseSubMessage.prototype.messageText = null;
        AIRichResponseSubMessage.prototype.imageMetadata = null;
        AIRichResponseSubMessage.prototype.codeMetadata = null;
        AIRichResponseSubMessage.prototype.tableMetadata = null;
        AIRichResponseSubMessage.prototype.dynamicMetadata = null;
        AIRichResponseSubMessage.prototype.latexMetadata = null;
        AIRichResponseSubMessage.prototype.mapMetadata = null;
        AIRichResponseSubMessage.prototype.contentItemsMetadata = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_messageType", {
            get: $util.oneOfGetter(($oneOfFields = ["messageType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_gridImageMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["gridImageMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_messageText", {
            get: $util.oneOfGetter(($oneOfFields = ["messageText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_imageMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["imageMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_codeMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["codeMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_tableMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["tableMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_dynamicMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["dynamicMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_latexMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["latexMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_mapMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["mapMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseSubMessage.prototype, "_contentItemsMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["contentItemsMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseSubMessage.create = function create(properties) {
            return new AIRichResponseSubMessage(properties);
        };
        AIRichResponseSubMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(8).int32(message.messageType);
            if (
                message.gridImageMetadata != null &&
                Object.hasOwnProperty.call(message, "gridImageMetadata")
            )
                $root.AICommon.AIRichResponseGridImageMetadata.encode(
                    message.gridImageMetadata,
                    writer.uint32(18).fork()
                ).ldelim();
            if (message.messageText != null && Object.hasOwnProperty.call(message, "messageText"))
                writer.uint32(26).string(message.messageText);
            if (
                message.imageMetadata != null &&
                Object.hasOwnProperty.call(message, "imageMetadata")
            )
                $root.AICommon.AIRichResponseInlineImageMetadata.encode(
                    message.imageMetadata,
                    writer.uint32(34).fork()
                ).ldelim();
            if (message.codeMetadata != null && Object.hasOwnProperty.call(message, "codeMetadata"))
                $root.AICommon.AIRichResponseCodeMetadata.encode(
                    message.codeMetadata,
                    writer.uint32(42).fork()
                ).ldelim();
            if (
                message.tableMetadata != null &&
                Object.hasOwnProperty.call(message, "tableMetadata")
            )
                $root.AICommon.AIRichResponseTableMetadata.encode(
                    message.tableMetadata,
                    writer.uint32(50).fork()
                ).ldelim();
            if (
                message.dynamicMetadata != null &&
                Object.hasOwnProperty.call(message, "dynamicMetadata")
            )
                $root.AICommon.AIRichResponseDynamicMetadata.encode(
                    message.dynamicMetadata,
                    writer.uint32(58).fork()
                ).ldelim();
            if (
                message.latexMetadata != null &&
                Object.hasOwnProperty.call(message, "latexMetadata")
            )
                $root.AICommon.AIRichResponseLatexMetadata.encode(
                    message.latexMetadata,
                    writer.uint32(66).fork()
                ).ldelim();
            if (message.mapMetadata != null && Object.hasOwnProperty.call(message, "mapMetadata"))
                $root.AICommon.AIRichResponseMapMetadata.encode(
                    message.mapMetadata,
                    writer.uint32(74).fork()
                ).ldelim();
            if (
                message.contentItemsMetadata != null &&
                Object.hasOwnProperty.call(message, "contentItemsMetadata")
            )
                $root.AICommon.AIRichResponseContentItemsMetadata.encode(
                    message.contentItemsMetadata,
                    writer.uint32(82).fork()
                ).ldelim();
            return writer;
        };
        AIRichResponseSubMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseSubMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseSubMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.messageType = reader.int32();
                        break;
                    }
                    case 2: {
                        message.gridImageMetadata =
                            $root.AICommon.AIRichResponseGridImageMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 3: {
                        message.messageText = reader.string();
                        break;
                    }
                    case 4: {
                        message.imageMetadata =
                            $root.AICommon.AIRichResponseInlineImageMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 5: {
                        message.codeMetadata = $root.AICommon.AIRichResponseCodeMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 6: {
                        message.tableMetadata = $root.AICommon.AIRichResponseTableMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 7: {
                        message.dynamicMetadata =
                            $root.AICommon.AIRichResponseDynamicMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 8: {
                        message.latexMetadata = $root.AICommon.AIRichResponseLatexMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 9: {
                        message.mapMetadata = $root.AICommon.AIRichResponseMapMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 10: {
                        message.contentItemsMetadata =
                            $root.AICommon.AIRichResponseContentItemsMetadata.decode(
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
        AIRichResponseSubMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseSubMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.messageType != null && message.hasOwnProperty("messageType")) {
                properties._messageType = 1;
                switch (message.messageType) {
                    default:
                        return "messageType: enum value expected";
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
                        break;
                }
            }
            if (message.gridImageMetadata != null && message.hasOwnProperty("gridImageMetadata")) {
                properties._gridImageMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseGridImageMetadata.verify(
                        message.gridImageMetadata
                    );
                    if (error) return "gridImageMetadata." + error;
                }
            }
            if (message.messageText != null && message.hasOwnProperty("messageText")) {
                properties._messageText = 1;
                if (!$util.isString(message.messageText)) return "messageText: string expected";
            }
            if (message.imageMetadata != null && message.hasOwnProperty("imageMetadata")) {
                properties._imageMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseInlineImageMetadata.verify(
                        message.imageMetadata
                    );
                    if (error) return "imageMetadata." + error;
                }
            }
            if (message.codeMetadata != null && message.hasOwnProperty("codeMetadata")) {
                properties._codeMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseCodeMetadata.verify(
                        message.codeMetadata
                    );
                    if (error) return "codeMetadata." + error;
                }
            }
            if (message.tableMetadata != null && message.hasOwnProperty("tableMetadata")) {
                properties._tableMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseTableMetadata.verify(
                        message.tableMetadata
                    );
                    if (error) return "tableMetadata." + error;
                }
            }
            if (message.dynamicMetadata != null && message.hasOwnProperty("dynamicMetadata")) {
                properties._dynamicMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseDynamicMetadata.verify(
                        message.dynamicMetadata
                    );
                    if (error) return "dynamicMetadata." + error;
                }
            }
            if (message.latexMetadata != null && message.hasOwnProperty("latexMetadata")) {
                properties._latexMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseLatexMetadata.verify(
                        message.latexMetadata
                    );
                    if (error) return "latexMetadata." + error;
                }
            }
            if (message.mapMetadata != null && message.hasOwnProperty("mapMetadata")) {
                properties._mapMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseMapMetadata.verify(
                        message.mapMetadata
                    );
                    if (error) return "mapMetadata." + error;
                }
            }
            if (
                message.contentItemsMetadata != null &&
                message.hasOwnProperty("contentItemsMetadata")
            ) {
                properties._contentItemsMetadata = 1;
                {
                    var error = $root.AICommon.AIRichResponseContentItemsMetadata.verify(
                        message.contentItemsMetadata
                    );
                    if (error) return "contentItemsMetadata." + error;
                }
            }
            return null;
        };
        AIRichResponseSubMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseSubMessage) return object;
            var message = new $root.AICommon.AIRichResponseSubMessage();
            switch (object.messageType) {
                default:
                    if (typeof object.messageType === "number") {
                        message.messageType = object.messageType;
                        break;
                    }
                    break;
                case "AI_RICH_RESPONSE_UNKNOWN":
                case 0:
                    message.messageType = 0;
                    break;
                case "AI_RICH_RESPONSE_GRID_IMAGE":
                case 1:
                    message.messageType = 1;
                    break;
                case "AI_RICH_RESPONSE_TEXT":
                case 2:
                    message.messageType = 2;
                    break;
                case "AI_RICH_RESPONSE_INLINE_IMAGE":
                case 3:
                    message.messageType = 3;
                    break;
                case "AI_RICH_RESPONSE_TABLE":
                case 4:
                    message.messageType = 4;
                    break;
                case "AI_RICH_RESPONSE_CODE":
                case 5:
                    message.messageType = 5;
                    break;
                case "AI_RICH_RESPONSE_DYNAMIC":
                case 6:
                    message.messageType = 6;
                    break;
                case "AI_RICH_RESPONSE_MAP":
                case 7:
                    message.messageType = 7;
                    break;
                case "AI_RICH_RESPONSE_LATEX":
                case 8:
                    message.messageType = 8;
                    break;
                case "AI_RICH_RESPONSE_CONTENT_ITEMS":
                case 9:
                    message.messageType = 9;
                    break;
            }
            if (object.gridImageMetadata != null) {
                if (typeof object.gridImageMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.gridImageMetadata: object expected"
                    );
                message.gridImageMetadata =
                    $root.AICommon.AIRichResponseGridImageMetadata.fromObject(
                        object.gridImageMetadata
                    );
            }
            if (object.messageText != null) message.messageText = String(object.messageText);
            if (object.imageMetadata != null) {
                if (typeof object.imageMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.imageMetadata: object expected"
                    );
                message.imageMetadata = $root.AICommon.AIRichResponseInlineImageMetadata.fromObject(
                    object.imageMetadata
                );
            }
            if (object.codeMetadata != null) {
                if (typeof object.codeMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.codeMetadata: object expected"
                    );
                message.codeMetadata = $root.AICommon.AIRichResponseCodeMetadata.fromObject(
                    object.codeMetadata
                );
            }
            if (object.tableMetadata != null) {
                if (typeof object.tableMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.tableMetadata: object expected"
                    );
                message.tableMetadata = $root.AICommon.AIRichResponseTableMetadata.fromObject(
                    object.tableMetadata
                );
            }
            if (object.dynamicMetadata != null) {
                if (typeof object.dynamicMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.dynamicMetadata: object expected"
                    );
                message.dynamicMetadata = $root.AICommon.AIRichResponseDynamicMetadata.fromObject(
                    object.dynamicMetadata
                );
            }
            if (object.latexMetadata != null) {
                if (typeof object.latexMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.latexMetadata: object expected"
                    );
                message.latexMetadata = $root.AICommon.AIRichResponseLatexMetadata.fromObject(
                    object.latexMetadata
                );
            }
            if (object.mapMetadata != null) {
                if (typeof object.mapMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.mapMetadata: object expected"
                    );
                message.mapMetadata = $root.AICommon.AIRichResponseMapMetadata.fromObject(
                    object.mapMetadata
                );
            }
            if (object.contentItemsMetadata != null) {
                if (typeof object.contentItemsMetadata !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseSubMessage.contentItemsMetadata: object expected"
                    );
                message.contentItemsMetadata =
                    $root.AICommon.AIRichResponseContentItemsMetadata.fromObject(
                        object.contentItemsMetadata
                    );
            }
            return message;
        };
        AIRichResponseSubMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.messageType != null && message.hasOwnProperty("messageType")) {
                object.messageType =
                    options.enums === String
                        ? $root.AICommon.AIRichResponseSubMessageType[message.messageType] ===
                          undefined
                            ? message.messageType
                            : $root.AICommon.AIRichResponseSubMessageType[message.messageType]
                        : message.messageType;
                if (options.oneofs) object._messageType = "messageType";
            }
            if (message.gridImageMetadata != null && message.hasOwnProperty("gridImageMetadata")) {
                object.gridImageMetadata = $root.AICommon.AIRichResponseGridImageMetadata.toObject(
                    message.gridImageMetadata,
                    options
                );
                if (options.oneofs) object._gridImageMetadata = "gridImageMetadata";
            }
            if (message.messageText != null && message.hasOwnProperty("messageText")) {
                object.messageText = message.messageText;
                if (options.oneofs) object._messageText = "messageText";
            }
            if (message.imageMetadata != null && message.hasOwnProperty("imageMetadata")) {
                object.imageMetadata = $root.AICommon.AIRichResponseInlineImageMetadata.toObject(
                    message.imageMetadata,
                    options
                );
                if (options.oneofs) object._imageMetadata = "imageMetadata";
            }
            if (message.codeMetadata != null && message.hasOwnProperty("codeMetadata")) {
                object.codeMetadata = $root.AICommon.AIRichResponseCodeMetadata.toObject(
                    message.codeMetadata,
                    options
                );
                if (options.oneofs) object._codeMetadata = "codeMetadata";
            }
            if (message.tableMetadata != null && message.hasOwnProperty("tableMetadata")) {
                object.tableMetadata = $root.AICommon.AIRichResponseTableMetadata.toObject(
                    message.tableMetadata,
                    options
                );
                if (options.oneofs) object._tableMetadata = "tableMetadata";
            }
            if (message.dynamicMetadata != null && message.hasOwnProperty("dynamicMetadata")) {
                object.dynamicMetadata = $root.AICommon.AIRichResponseDynamicMetadata.toObject(
                    message.dynamicMetadata,
                    options
                );
                if (options.oneofs) object._dynamicMetadata = "dynamicMetadata";
            }
            if (message.latexMetadata != null && message.hasOwnProperty("latexMetadata")) {
                object.latexMetadata = $root.AICommon.AIRichResponseLatexMetadata.toObject(
                    message.latexMetadata,
                    options
                );
                if (options.oneofs) object._latexMetadata = "latexMetadata";
            }
            if (message.mapMetadata != null && message.hasOwnProperty("mapMetadata")) {
                object.mapMetadata = $root.AICommon.AIRichResponseMapMetadata.toObject(
                    message.mapMetadata,
                    options
                );
                if (options.oneofs) object._mapMetadata = "mapMetadata";
            }
            if (
                message.contentItemsMetadata != null &&
                message.hasOwnProperty("contentItemsMetadata")
            ) {
                object.contentItemsMetadata =
                    $root.AICommon.AIRichResponseContentItemsMetadata.toObject(
                        message.contentItemsMetadata,
                        options
                    );
                if (options.oneofs) object._contentItemsMetadata = "contentItemsMetadata";
            }
            return object;
        };
        AIRichResponseSubMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseSubMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseSubMessage";
        };
        return AIRichResponseSubMessage;
    })();
    AICommon.AIRichResponseContentItemsMetadata = (function () {
        function AIRichResponseContentItemsMetadata(properties) {
            this.itemsMetadata = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseContentItemsMetadata.prototype.itemsMetadata = $util.emptyArray;
        AIRichResponseContentItemsMetadata.prototype.contentType = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseContentItemsMetadata.prototype, "_contentType", {
            get: $util.oneOfGetter(($oneOfFields = ["contentType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseContentItemsMetadata.create = function create(properties) {
            return new AIRichResponseContentItemsMetadata(properties);
        };
        AIRichResponseContentItemsMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.itemsMetadata != null && message.itemsMetadata.length)
                for (var i = 0; i < message.itemsMetadata.length; ++i)
                    $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.encode(
                        message.itemsMetadata[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            if (message.contentType != null && Object.hasOwnProperty.call(message, "contentType"))
                writer.uint32(16).int32(message.contentType);
            return writer;
        };
        AIRichResponseContentItemsMetadata.encodeDelimited = function encodeDelimited(
            message,
            writer
        ) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseContentItemsMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseContentItemsMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.itemsMetadata && message.itemsMetadata.length))
                            message.itemsMetadata = [];
                        message.itemsMetadata.push(
                            $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 2: {
                        message.contentType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseContentItemsMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseContentItemsMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.itemsMetadata != null && message.hasOwnProperty("itemsMetadata")) {
                if (!Array.isArray(message.itemsMetadata)) return "itemsMetadata: array expected";
                for (var i = 0; i < message.itemsMetadata.length; ++i) {
                    var error =
                        $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.verify(
                            message.itemsMetadata[i]
                        );
                    if (error) return "itemsMetadata." + error;
                }
            }
            if (message.contentType != null && message.hasOwnProperty("contentType")) {
                properties._contentType = 1;
                switch (message.contentType) {
                    default:
                        return "contentType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        AIRichResponseContentItemsMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseContentItemsMetadata) return object;
            var message = new $root.AICommon.AIRichResponseContentItemsMetadata();
            if (object.itemsMetadata) {
                if (!Array.isArray(object.itemsMetadata))
                    throw TypeError(
                        ".AICommon.AIRichResponseContentItemsMetadata.itemsMetadata: array expected"
                    );
                message.itemsMetadata = [];
                for (var i = 0; i < object.itemsMetadata.length; ++i) {
                    if (typeof object.itemsMetadata[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseContentItemsMetadata.itemsMetadata: object expected"
                        );
                    message.itemsMetadata[i] =
                        $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.fromObject(
                            object.itemsMetadata[i]
                        );
                }
            }
            switch (object.contentType) {
                default:
                    if (typeof object.contentType === "number") {
                        message.contentType = object.contentType;
                        break;
                    }
                    break;
                case "DEFAULT":
                case 0:
                    message.contentType = 0;
                    break;
                case "CAROUSEL":
                case 1:
                    message.contentType = 1;
                    break;
            }
            return message;
        };
        AIRichResponseContentItemsMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.itemsMetadata = [];
            if (message.itemsMetadata && message.itemsMetadata.length) {
                object.itemsMetadata = [];
                for (var j = 0; j < message.itemsMetadata.length; ++j)
                    object.itemsMetadata[j] =
                        $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.toObject(
                            message.itemsMetadata[j],
                            options
                        );
            }
            if (message.contentType != null && message.hasOwnProperty("contentType")) {
                object.contentType =
                    options.enums === String
                        ? $root.AICommon.AIRichResponseContentItemsMetadata.ContentType[
                              message.contentType
                          ] === undefined
                            ? message.contentType
                            : $root.AICommon.AIRichResponseContentItemsMetadata.ContentType[
                                  message.contentType
                              ]
                        : message.contentType;
                if (options.oneofs) object._contentType = "contentType";
            }
            return object;
        };
        AIRichResponseContentItemsMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseContentItemsMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseContentItemsMetadata";
        };
        AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata = (function () {
            function AIRichResponseContentItemMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseContentItemMetadata.prototype.reelItem = null;
            var $oneOfFields;
            Object.defineProperty(
                AIRichResponseContentItemMetadata.prototype,
                "aIRichResponseContentItem",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["reelItem"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            AIRichResponseContentItemMetadata.create = function create(properties) {
                return new AIRichResponseContentItemMetadata(properties);
            };
            AIRichResponseContentItemMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.reelItem != null && Object.hasOwnProperty.call(message, "reelItem"))
                    $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.encode(
                        message.reelItem,
                        writer.uint32(10).fork()
                    ).ldelim();
                return writer;
            };
            AIRichResponseContentItemMetadata.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseContentItemMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.reelItem =
                                $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.decode(
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
            AIRichResponseContentItemMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseContentItemMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.reelItem != null && message.hasOwnProperty("reelItem")) {
                    properties.aIRichResponseContentItem = 1;
                    {
                        var error =
                            $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.verify(
                                message.reelItem
                            );
                        if (error) return "reelItem." + error;
                    }
                }
                return null;
            };
            AIRichResponseContentItemMetadata.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseContentItemsMetadata
                        .AIRichResponseContentItemMetadata
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata();
                if (object.reelItem != null) {
                    if (typeof object.reelItem !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.reelItem: object expected"
                        );
                    message.reelItem =
                        $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.fromObject(
                            object.reelItem
                        );
                }
                return message;
            };
            AIRichResponseContentItemMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.reelItem != null && message.hasOwnProperty("reelItem")) {
                    object.reelItem =
                        $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.toObject(
                            message.reelItem,
                            options
                        );
                    if (options.oneofs) object.aIRichResponseContentItem = "reelItem";
                }
                return object;
            };
            AIRichResponseContentItemMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseContentItemMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/AICommon.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata"
                );
            };
            return AIRichResponseContentItemMetadata;
        })();
        AIRichResponseContentItemsMetadata.AIRichResponseReelItem = (function () {
            function AIRichResponseReelItem(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseReelItem.prototype.title = null;
            AIRichResponseReelItem.prototype.profileIconUrl = null;
            AIRichResponseReelItem.prototype.thumbnailUrl = null;
            AIRichResponseReelItem.prototype.videoUrl = null;
            var $oneOfFields;
            Object.defineProperty(AIRichResponseReelItem.prototype, "_title", {
                get: $util.oneOfGetter(($oneOfFields = ["title"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseReelItem.prototype, "_profileIconUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["profileIconUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseReelItem.prototype, "_thumbnailUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["thumbnailUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseReelItem.prototype, "_videoUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["videoUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIRichResponseReelItem.create = function create(properties) {
                return new AIRichResponseReelItem(properties);
            };
            AIRichResponseReelItem.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(10).string(message.title);
                if (
                    message.profileIconUrl != null &&
                    Object.hasOwnProperty.call(message, "profileIconUrl")
                )
                    writer.uint32(18).string(message.profileIconUrl);
                if (
                    message.thumbnailUrl != null &&
                    Object.hasOwnProperty.call(message, "thumbnailUrl")
                )
                    writer.uint32(26).string(message.thumbnailUrl);
                if (message.videoUrl != null && Object.hasOwnProperty.call(message, "videoUrl"))
                    writer.uint32(34).string(message.videoUrl);
                return writer;
            };
            AIRichResponseReelItem.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseReelItem.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.title = reader.string();
                            break;
                        }
                        case 2: {
                            message.profileIconUrl = reader.string();
                            break;
                        }
                        case 3: {
                            message.thumbnailUrl = reader.string();
                            break;
                        }
                        case 4: {
                            message.videoUrl = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIRichResponseReelItem.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseReelItem.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.title != null && message.hasOwnProperty("title")) {
                    properties._title = 1;
                    if (!$util.isString(message.title)) return "title: string expected";
                }
                if (message.profileIconUrl != null && message.hasOwnProperty("profileIconUrl")) {
                    properties._profileIconUrl = 1;
                    if (!$util.isString(message.profileIconUrl))
                        return "profileIconUrl: string expected";
                }
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl")) {
                    properties._thumbnailUrl = 1;
                    if (!$util.isString(message.thumbnailUrl))
                        return "thumbnailUrl: string expected";
                }
                if (message.videoUrl != null && message.hasOwnProperty("videoUrl")) {
                    properties._videoUrl = 1;
                    if (!$util.isString(message.videoUrl)) return "videoUrl: string expected";
                }
                return null;
            };
            AIRichResponseReelItem.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem();
                if (object.title != null) message.title = String(object.title);
                if (object.profileIconUrl != null)
                    message.profileIconUrl = String(object.profileIconUrl);
                if (object.thumbnailUrl != null) message.thumbnailUrl = String(object.thumbnailUrl);
                if (object.videoUrl != null) message.videoUrl = String(object.videoUrl);
                return message;
            };
            AIRichResponseReelItem.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.title != null && message.hasOwnProperty("title")) {
                    object.title = message.title;
                    if (options.oneofs) object._title = "title";
                }
                if (message.profileIconUrl != null && message.hasOwnProperty("profileIconUrl")) {
                    object.profileIconUrl = message.profileIconUrl;
                    if (options.oneofs) object._profileIconUrl = "profileIconUrl";
                }
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl")) {
                    object.thumbnailUrl = message.thumbnailUrl;
                    if (options.oneofs) object._thumbnailUrl = "thumbnailUrl";
                }
                if (message.videoUrl != null && message.hasOwnProperty("videoUrl")) {
                    object.videoUrl = message.videoUrl;
                    if (options.oneofs) object._videoUrl = "videoUrl";
                }
                return object;
            };
            AIRichResponseReelItem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseReelItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/AICommon.AIRichResponseContentItemsMetadata.AIRichResponseReelItem"
                );
            };
            return AIRichResponseReelItem;
        })();
        AIRichResponseContentItemsMetadata.ContentType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "DEFAULT")] = 0;
            values[(valuesById[1] = "CAROUSEL")] = 1;
            return values;
        })();
        return AIRichResponseContentItemsMetadata;
    })();
    AICommon.AIRichResponseMapMetadata = (function () {
        function AIRichResponseMapMetadata(properties) {
            this.annotations = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseMapMetadata.prototype.centerLatitude = null;
        AIRichResponseMapMetadata.prototype.centerLongitude = null;
        AIRichResponseMapMetadata.prototype.latitudeDelta = null;
        AIRichResponseMapMetadata.prototype.longitudeDelta = null;
        AIRichResponseMapMetadata.prototype.annotations = $util.emptyArray;
        AIRichResponseMapMetadata.prototype.showInfoList = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseMapMetadata.prototype, "_centerLatitude", {
            get: $util.oneOfGetter(($oneOfFields = ["centerLatitude"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseMapMetadata.prototype, "_centerLongitude", {
            get: $util.oneOfGetter(($oneOfFields = ["centerLongitude"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseMapMetadata.prototype, "_latitudeDelta", {
            get: $util.oneOfGetter(($oneOfFields = ["latitudeDelta"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseMapMetadata.prototype, "_longitudeDelta", {
            get: $util.oneOfGetter(($oneOfFields = ["longitudeDelta"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseMapMetadata.prototype, "_showInfoList", {
            get: $util.oneOfGetter(($oneOfFields = ["showInfoList"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseMapMetadata.create = function create(properties) {
            return new AIRichResponseMapMetadata(properties);
        };
        AIRichResponseMapMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.centerLatitude != null &&
                Object.hasOwnProperty.call(message, "centerLatitude")
            )
                writer.uint32(9).double(message.centerLatitude);
            if (
                message.centerLongitude != null &&
                Object.hasOwnProperty.call(message, "centerLongitude")
            )
                writer.uint32(17).double(message.centerLongitude);
            if (
                message.latitudeDelta != null &&
                Object.hasOwnProperty.call(message, "latitudeDelta")
            )
                writer.uint32(25).double(message.latitudeDelta);
            if (
                message.longitudeDelta != null &&
                Object.hasOwnProperty.call(message, "longitudeDelta")
            )
                writer.uint32(33).double(message.longitudeDelta);
            if (message.annotations != null && message.annotations.length)
                for (var i = 0; i < message.annotations.length; ++i)
                    $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.encode(
                        message.annotations[i],
                        writer.uint32(42).fork()
                    ).ldelim();
            if (message.showInfoList != null && Object.hasOwnProperty.call(message, "showInfoList"))
                writer.uint32(48).bool(message.showInfoList);
            return writer;
        };
        AIRichResponseMapMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseMapMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseMapMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.centerLatitude = reader.double();
                        break;
                    }
                    case 2: {
                        message.centerLongitude = reader.double();
                        break;
                    }
                    case 3: {
                        message.latitudeDelta = reader.double();
                        break;
                    }
                    case 4: {
                        message.longitudeDelta = reader.double();
                        break;
                    }
                    case 5: {
                        if (!(message.annotations && message.annotations.length))
                            message.annotations = [];
                        message.annotations.push(
                            $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 6: {
                        message.showInfoList = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseMapMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseMapMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.centerLatitude != null && message.hasOwnProperty("centerLatitude")) {
                properties._centerLatitude = 1;
                if (typeof message.centerLatitude !== "number")
                    return "centerLatitude: number expected";
            }
            if (message.centerLongitude != null && message.hasOwnProperty("centerLongitude")) {
                properties._centerLongitude = 1;
                if (typeof message.centerLongitude !== "number")
                    return "centerLongitude: number expected";
            }
            if (message.latitudeDelta != null && message.hasOwnProperty("latitudeDelta")) {
                properties._latitudeDelta = 1;
                if (typeof message.latitudeDelta !== "number")
                    return "latitudeDelta: number expected";
            }
            if (message.longitudeDelta != null && message.hasOwnProperty("longitudeDelta")) {
                properties._longitudeDelta = 1;
                if (typeof message.longitudeDelta !== "number")
                    return "longitudeDelta: number expected";
            }
            if (message.annotations != null && message.hasOwnProperty("annotations")) {
                if (!Array.isArray(message.annotations)) return "annotations: array expected";
                for (var i = 0; i < message.annotations.length; ++i) {
                    var error =
                        $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.verify(
                            message.annotations[i]
                        );
                    if (error) return "annotations." + error;
                }
            }
            if (message.showInfoList != null && message.hasOwnProperty("showInfoList")) {
                properties._showInfoList = 1;
                if (typeof message.showInfoList !== "boolean")
                    return "showInfoList: boolean expected";
            }
            return null;
        };
        AIRichResponseMapMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseMapMetadata) return object;
            var message = new $root.AICommon.AIRichResponseMapMetadata();
            if (object.centerLatitude != null)
                message.centerLatitude = Number(object.centerLatitude);
            if (object.centerLongitude != null)
                message.centerLongitude = Number(object.centerLongitude);
            if (object.latitudeDelta != null) message.latitudeDelta = Number(object.latitudeDelta);
            if (object.longitudeDelta != null)
                message.longitudeDelta = Number(object.longitudeDelta);
            if (object.annotations) {
                if (!Array.isArray(object.annotations))
                    throw TypeError(
                        ".AICommon.AIRichResponseMapMetadata.annotations: array expected"
                    );
                message.annotations = [];
                for (var i = 0; i < object.annotations.length; ++i) {
                    if (typeof object.annotations[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseMapMetadata.annotations: object expected"
                        );
                    message.annotations[i] =
                        $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.fromObject(
                            object.annotations[i]
                        );
                }
            }
            if (object.showInfoList != null) message.showInfoList = Boolean(object.showInfoList);
            return message;
        };
        AIRichResponseMapMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.annotations = [];
            if (message.centerLatitude != null && message.hasOwnProperty("centerLatitude")) {
                object.centerLatitude =
                    options.json && !isFinite(message.centerLatitude)
                        ? String(message.centerLatitude)
                        : message.centerLatitude;
                if (options.oneofs) object._centerLatitude = "centerLatitude";
            }
            if (message.centerLongitude != null && message.hasOwnProperty("centerLongitude")) {
                object.centerLongitude =
                    options.json && !isFinite(message.centerLongitude)
                        ? String(message.centerLongitude)
                        : message.centerLongitude;
                if (options.oneofs) object._centerLongitude = "centerLongitude";
            }
            if (message.latitudeDelta != null && message.hasOwnProperty("latitudeDelta")) {
                object.latitudeDelta =
                    options.json && !isFinite(message.latitudeDelta)
                        ? String(message.latitudeDelta)
                        : message.latitudeDelta;
                if (options.oneofs) object._latitudeDelta = "latitudeDelta";
            }
            if (message.longitudeDelta != null && message.hasOwnProperty("longitudeDelta")) {
                object.longitudeDelta =
                    options.json && !isFinite(message.longitudeDelta)
                        ? String(message.longitudeDelta)
                        : message.longitudeDelta;
                if (options.oneofs) object._longitudeDelta = "longitudeDelta";
            }
            if (message.annotations && message.annotations.length) {
                object.annotations = [];
                for (var j = 0; j < message.annotations.length; ++j)
                    object.annotations[j] =
                        $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.toObject(
                            message.annotations[j],
                            options
                        );
            }
            if (message.showInfoList != null && message.hasOwnProperty("showInfoList")) {
                object.showInfoList = message.showInfoList;
                if (options.oneofs) object._showInfoList = "showInfoList";
            }
            return object;
        };
        AIRichResponseMapMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseMapMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseMapMetadata";
        };
        AIRichResponseMapMetadata.AIRichResponseMapAnnotation = (function () {
            function AIRichResponseMapAnnotation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseMapAnnotation.prototype.annotationNumber = null;
            AIRichResponseMapAnnotation.prototype.latitude = null;
            AIRichResponseMapAnnotation.prototype.longitude = null;
            AIRichResponseMapAnnotation.prototype.title = null;
            AIRichResponseMapAnnotation.prototype.body = null;
            var $oneOfFields;
            Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_annotationNumber", {
                get: $util.oneOfGetter(($oneOfFields = ["annotationNumber"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_latitude", {
                get: $util.oneOfGetter(($oneOfFields = ["latitude"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_longitude", {
                get: $util.oneOfGetter(($oneOfFields = ["longitude"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_title", {
                get: $util.oneOfGetter(($oneOfFields = ["title"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_body", {
                get: $util.oneOfGetter(($oneOfFields = ["body"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIRichResponseMapAnnotation.create = function create(properties) {
                return new AIRichResponseMapAnnotation(properties);
            };
            AIRichResponseMapAnnotation.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.annotationNumber != null &&
                    Object.hasOwnProperty.call(message, "annotationNumber")
                )
                    writer.uint32(8).uint32(message.annotationNumber);
                if (message.latitude != null && Object.hasOwnProperty.call(message, "latitude"))
                    writer.uint32(17).double(message.latitude);
                if (message.longitude != null && Object.hasOwnProperty.call(message, "longitude"))
                    writer.uint32(25).double(message.longitude);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(34).string(message.title);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(42).string(message.body);
                return writer;
            };
            AIRichResponseMapAnnotation.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseMapAnnotation.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.annotationNumber = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.latitude = reader.double();
                            break;
                        }
                        case 3: {
                            message.longitude = reader.double();
                            break;
                        }
                        case 4: {
                            message.title = reader.string();
                            break;
                        }
                        case 5: {
                            message.body = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIRichResponseMapAnnotation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseMapAnnotation.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.annotationNumber != null &&
                    message.hasOwnProperty("annotationNumber")
                ) {
                    properties._annotationNumber = 1;
                    if (!$util.isInteger(message.annotationNumber))
                        return "annotationNumber: integer expected";
                }
                if (message.latitude != null && message.hasOwnProperty("latitude")) {
                    properties._latitude = 1;
                    if (typeof message.latitude !== "number") return "latitude: number expected";
                }
                if (message.longitude != null && message.hasOwnProperty("longitude")) {
                    properties._longitude = 1;
                    if (typeof message.longitude !== "number") return "longitude: number expected";
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    properties._title = 1;
                    if (!$util.isString(message.title)) return "title: string expected";
                }
                if (message.body != null && message.hasOwnProperty("body")) {
                    properties._body = 1;
                    if (!$util.isString(message.body)) return "body: string expected";
                }
                return null;
            };
            AIRichResponseMapAnnotation.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation();
                if (object.annotationNumber != null)
                    message.annotationNumber = object.annotationNumber >>> 0;
                if (object.latitude != null) message.latitude = Number(object.latitude);
                if (object.longitude != null) message.longitude = Number(object.longitude);
                if (object.title != null) message.title = String(object.title);
                if (object.body != null) message.body = String(object.body);
                return message;
            };
            AIRichResponseMapAnnotation.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.annotationNumber != null &&
                    message.hasOwnProperty("annotationNumber")
                ) {
                    object.annotationNumber = message.annotationNumber;
                    if (options.oneofs) object._annotationNumber = "annotationNumber";
                }
                if (message.latitude != null && message.hasOwnProperty("latitude")) {
                    object.latitude =
                        options.json && !isFinite(message.latitude)
                            ? String(message.latitude)
                            : message.latitude;
                    if (options.oneofs) object._latitude = "latitude";
                }
                if (message.longitude != null && message.hasOwnProperty("longitude")) {
                    object.longitude =
                        options.json && !isFinite(message.longitude)
                            ? String(message.longitude)
                            : message.longitude;
                    if (options.oneofs) object._longitude = "longitude";
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    object.title = message.title;
                    if (options.oneofs) object._title = "title";
                }
                if (message.body != null && message.hasOwnProperty("body")) {
                    object.body = message.body;
                    if (options.oneofs) object._body = "body";
                }
                return object;
            };
            AIRichResponseMapAnnotation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseMapAnnotation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/AICommon.AIRichResponseMapMetadata.AIRichResponseMapAnnotation"
                );
            };
            return AIRichResponseMapAnnotation;
        })();
        return AIRichResponseMapMetadata;
    })();
    AICommon.AIRichResponseLatexMetadata = (function () {
        function AIRichResponseLatexMetadata(properties) {
            this.expressions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseLatexMetadata.prototype.text = null;
        AIRichResponseLatexMetadata.prototype.expressions = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseLatexMetadata.prototype, "_text", {
            get: $util.oneOfGetter(($oneOfFields = ["text"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseLatexMetadata.create = function create(properties) {
            return new AIRichResponseLatexMetadata(properties);
        };
        AIRichResponseLatexMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(10).string(message.text);
            if (message.expressions != null && message.expressions.length)
                for (var i = 0; i < message.expressions.length; ++i)
                    $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.encode(
                        message.expressions[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        AIRichResponseLatexMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseLatexMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseLatexMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.text = reader.string();
                        break;
                    }
                    case 2: {
                        if (!(message.expressions && message.expressions.length))
                            message.expressions = [];
                        message.expressions.push(
                            $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.decode(
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
        AIRichResponseLatexMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseLatexMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.text != null && message.hasOwnProperty("text")) {
                properties._text = 1;
                if (!$util.isString(message.text)) return "text: string expected";
            }
            if (message.expressions != null && message.hasOwnProperty("expressions")) {
                if (!Array.isArray(message.expressions)) return "expressions: array expected";
                for (var i = 0; i < message.expressions.length; ++i) {
                    var error =
                        $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.verify(
                            message.expressions[i]
                        );
                    if (error) return "expressions." + error;
                }
            }
            return null;
        };
        AIRichResponseLatexMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseLatexMetadata) return object;
            var message = new $root.AICommon.AIRichResponseLatexMetadata();
            if (object.text != null) message.text = String(object.text);
            if (object.expressions) {
                if (!Array.isArray(object.expressions))
                    throw TypeError(
                        ".AICommon.AIRichResponseLatexMetadata.expressions: array expected"
                    );
                message.expressions = [];
                for (var i = 0; i < object.expressions.length; ++i) {
                    if (typeof object.expressions[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseLatexMetadata.expressions: object expected"
                        );
                    message.expressions[i] =
                        $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.fromObject(
                            object.expressions[i]
                        );
                }
            }
            return message;
        };
        AIRichResponseLatexMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.expressions = [];
            if (message.text != null && message.hasOwnProperty("text")) {
                object.text = message.text;
                if (options.oneofs) object._text = "text";
            }
            if (message.expressions && message.expressions.length) {
                object.expressions = [];
                for (var j = 0; j < message.expressions.length; ++j)
                    object.expressions[j] =
                        $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.toObject(
                            message.expressions[j],
                            options
                        );
            }
            return object;
        };
        AIRichResponseLatexMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseLatexMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseLatexMetadata";
        };
        AIRichResponseLatexMetadata.AIRichResponseLatexExpression = (function () {
            function AIRichResponseLatexExpression(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseLatexExpression.prototype.latexExpression = null;
            AIRichResponseLatexExpression.prototype.url = null;
            AIRichResponseLatexExpression.prototype.width = null;
            AIRichResponseLatexExpression.prototype.height = null;
            AIRichResponseLatexExpression.prototype.fontHeight = null;
            AIRichResponseLatexExpression.prototype.imageTopPadding = null;
            AIRichResponseLatexExpression.prototype.imageLeadingPadding = null;
            AIRichResponseLatexExpression.prototype.imageBottomPadding = null;
            AIRichResponseLatexExpression.prototype.imageTrailingPadding = null;
            var $oneOfFields;
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_latexExpression", {
                get: $util.oneOfGetter(($oneOfFields = ["latexExpression"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_url", {
                get: $util.oneOfGetter(($oneOfFields = ["url"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_width", {
                get: $util.oneOfGetter(($oneOfFields = ["width"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_height", {
                get: $util.oneOfGetter(($oneOfFields = ["height"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_fontHeight", {
                get: $util.oneOfGetter(($oneOfFields = ["fontHeight"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageTopPadding", {
                get: $util.oneOfGetter(($oneOfFields = ["imageTopPadding"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageLeadingPadding", {
                get: $util.oneOfGetter(($oneOfFields = ["imageLeadingPadding"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageBottomPadding", {
                get: $util.oneOfGetter(($oneOfFields = ["imageBottomPadding"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(
                AIRichResponseLatexExpression.prototype,
                "_imageTrailingPadding",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["imageTrailingPadding"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            AIRichResponseLatexExpression.create = function create(properties) {
                return new AIRichResponseLatexExpression(properties);
            };
            AIRichResponseLatexExpression.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.latexExpression != null &&
                    Object.hasOwnProperty.call(message, "latexExpression")
                )
                    writer.uint32(10).string(message.latexExpression);
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(18).string(message.url);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(25).double(message.width);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(33).double(message.height);
                if (message.fontHeight != null && Object.hasOwnProperty.call(message, "fontHeight"))
                    writer.uint32(41).double(message.fontHeight);
                if (
                    message.imageTopPadding != null &&
                    Object.hasOwnProperty.call(message, "imageTopPadding")
                )
                    writer.uint32(49).double(message.imageTopPadding);
                if (
                    message.imageLeadingPadding != null &&
                    Object.hasOwnProperty.call(message, "imageLeadingPadding")
                )
                    writer.uint32(57).double(message.imageLeadingPadding);
                if (
                    message.imageBottomPadding != null &&
                    Object.hasOwnProperty.call(message, "imageBottomPadding")
                )
                    writer.uint32(65).double(message.imageBottomPadding);
                if (
                    message.imageTrailingPadding != null &&
                    Object.hasOwnProperty.call(message, "imageTrailingPadding")
                )
                    writer.uint32(73).double(message.imageTrailingPadding);
                return writer;
            };
            AIRichResponseLatexExpression.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseLatexExpression.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.latexExpression = reader.string();
                            break;
                        }
                        case 2: {
                            message.url = reader.string();
                            break;
                        }
                        case 3: {
                            message.width = reader.double();
                            break;
                        }
                        case 4: {
                            message.height = reader.double();
                            break;
                        }
                        case 5: {
                            message.fontHeight = reader.double();
                            break;
                        }
                        case 6: {
                            message.imageTopPadding = reader.double();
                            break;
                        }
                        case 7: {
                            message.imageLeadingPadding = reader.double();
                            break;
                        }
                        case 8: {
                            message.imageBottomPadding = reader.double();
                            break;
                        }
                        case 9: {
                            message.imageTrailingPadding = reader.double();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIRichResponseLatexExpression.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseLatexExpression.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.latexExpression != null && message.hasOwnProperty("latexExpression")) {
                    properties._latexExpression = 1;
                    if (!$util.isString(message.latexExpression))
                        return "latexExpression: string expected";
                }
                if (message.url != null && message.hasOwnProperty("url")) {
                    properties._url = 1;
                    if (!$util.isString(message.url)) return "url: string expected";
                }
                if (message.width != null && message.hasOwnProperty("width")) {
                    properties._width = 1;
                    if (typeof message.width !== "number") return "width: number expected";
                }
                if (message.height != null && message.hasOwnProperty("height")) {
                    properties._height = 1;
                    if (typeof message.height !== "number") return "height: number expected";
                }
                if (message.fontHeight != null && message.hasOwnProperty("fontHeight")) {
                    properties._fontHeight = 1;
                    if (typeof message.fontHeight !== "number")
                        return "fontHeight: number expected";
                }
                if (message.imageTopPadding != null && message.hasOwnProperty("imageTopPadding")) {
                    properties._imageTopPadding = 1;
                    if (typeof message.imageTopPadding !== "number")
                        return "imageTopPadding: number expected";
                }
                if (
                    message.imageLeadingPadding != null &&
                    message.hasOwnProperty("imageLeadingPadding")
                ) {
                    properties._imageLeadingPadding = 1;
                    if (typeof message.imageLeadingPadding !== "number")
                        return "imageLeadingPadding: number expected";
                }
                if (
                    message.imageBottomPadding != null &&
                    message.hasOwnProperty("imageBottomPadding")
                ) {
                    properties._imageBottomPadding = 1;
                    if (typeof message.imageBottomPadding !== "number")
                        return "imageBottomPadding: number expected";
                }
                if (
                    message.imageTrailingPadding != null &&
                    message.hasOwnProperty("imageTrailingPadding")
                ) {
                    properties._imageTrailingPadding = 1;
                    if (typeof message.imageTrailingPadding !== "number")
                        return "imageTrailingPadding: number expected";
                }
                return null;
            };
            AIRichResponseLatexExpression.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression();
                if (object.latexExpression != null)
                    message.latexExpression = String(object.latexExpression);
                if (object.url != null) message.url = String(object.url);
                if (object.width != null) message.width = Number(object.width);
                if (object.height != null) message.height = Number(object.height);
                if (object.fontHeight != null) message.fontHeight = Number(object.fontHeight);
                if (object.imageTopPadding != null)
                    message.imageTopPadding = Number(object.imageTopPadding);
                if (object.imageLeadingPadding != null)
                    message.imageLeadingPadding = Number(object.imageLeadingPadding);
                if (object.imageBottomPadding != null)
                    message.imageBottomPadding = Number(object.imageBottomPadding);
                if (object.imageTrailingPadding != null)
                    message.imageTrailingPadding = Number(object.imageTrailingPadding);
                return message;
            };
            AIRichResponseLatexExpression.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.latexExpression != null && message.hasOwnProperty("latexExpression")) {
                    object.latexExpression = message.latexExpression;
                    if (options.oneofs) object._latexExpression = "latexExpression";
                }
                if (message.url != null && message.hasOwnProperty("url")) {
                    object.url = message.url;
                    if (options.oneofs) object._url = "url";
                }
                if (message.width != null && message.hasOwnProperty("width")) {
                    object.width =
                        options.json && !isFinite(message.width)
                            ? String(message.width)
                            : message.width;
                    if (options.oneofs) object._width = "width";
                }
                if (message.height != null && message.hasOwnProperty("height")) {
                    object.height =
                        options.json && !isFinite(message.height)
                            ? String(message.height)
                            : message.height;
                    if (options.oneofs) object._height = "height";
                }
                if (message.fontHeight != null && message.hasOwnProperty("fontHeight")) {
                    object.fontHeight =
                        options.json && !isFinite(message.fontHeight)
                            ? String(message.fontHeight)
                            : message.fontHeight;
                    if (options.oneofs) object._fontHeight = "fontHeight";
                }
                if (message.imageTopPadding != null && message.hasOwnProperty("imageTopPadding")) {
                    object.imageTopPadding =
                        options.json && !isFinite(message.imageTopPadding)
                            ? String(message.imageTopPadding)
                            : message.imageTopPadding;
                    if (options.oneofs) object._imageTopPadding = "imageTopPadding";
                }
                if (
                    message.imageLeadingPadding != null &&
                    message.hasOwnProperty("imageLeadingPadding")
                ) {
                    object.imageLeadingPadding =
                        options.json && !isFinite(message.imageLeadingPadding)
                            ? String(message.imageLeadingPadding)
                            : message.imageLeadingPadding;
                    if (options.oneofs) object._imageLeadingPadding = "imageLeadingPadding";
                }
                if (
                    message.imageBottomPadding != null &&
                    message.hasOwnProperty("imageBottomPadding")
                ) {
                    object.imageBottomPadding =
                        options.json && !isFinite(message.imageBottomPadding)
                            ? String(message.imageBottomPadding)
                            : message.imageBottomPadding;
                    if (options.oneofs) object._imageBottomPadding = "imageBottomPadding";
                }
                if (
                    message.imageTrailingPadding != null &&
                    message.hasOwnProperty("imageTrailingPadding")
                ) {
                    object.imageTrailingPadding =
                        options.json && !isFinite(message.imageTrailingPadding)
                            ? String(message.imageTrailingPadding)
                            : message.imageTrailingPadding;
                    if (options.oneofs) object._imageTrailingPadding = "imageTrailingPadding";
                }
                return object;
            };
            AIRichResponseLatexExpression.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseLatexExpression.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/AICommon.AIRichResponseLatexMetadata.AIRichResponseLatexExpression"
                );
            };
            return AIRichResponseLatexExpression;
        })();
        return AIRichResponseLatexMetadata;
    })();
    AICommon.AIRichResponseUnifiedResponse = (function () {
        function AIRichResponseUnifiedResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseUnifiedResponse.prototype.data = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseUnifiedResponse.prototype, "_data", {
            get: $util.oneOfGetter(($oneOfFields = ["data"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseUnifiedResponse.create = function create(properties) {
            return new AIRichResponseUnifiedResponse(properties);
        };
        AIRichResponseUnifiedResponse.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(10).bytes(message.data);
            return writer;
        };
        AIRichResponseUnifiedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseUnifiedResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseUnifiedResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.data = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseUnifiedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseUnifiedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.data != null && message.hasOwnProperty("data")) {
                properties._data = 1;
                if (
                    !(
                        (message.data && typeof message.data.length === "number") ||
                        $util.isString(message.data)
                    )
                )
                    return "data: buffer expected";
            }
            return null;
        };
        AIRichResponseUnifiedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseUnifiedResponse) return object;
            var message = new $root.AICommon.AIRichResponseUnifiedResponse();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(
                        object.data,
                        (message.data = $util.newBuffer($util.base64.length(object.data))),
                        0
                    );
                else if (object.data.length >= 0) message.data = object.data;
            return message;
        };
        AIRichResponseUnifiedResponse.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data =
                    options.bytes === String
                        ? $util.base64.encode(message.data, 0, message.data.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.data)
                          : message.data;
                if (options.oneofs) object._data = "data";
            }
            return object;
        };
        AIRichResponseUnifiedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseUnifiedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseUnifiedResponse";
        };
        return AIRichResponseUnifiedResponse;
    })();
    AICommon.AIRichResponseDynamicMetadata = (function () {
        function AIRichResponseDynamicMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseDynamicMetadata.prototype.type = null;
        AIRichResponseDynamicMetadata.prototype.version = null;
        AIRichResponseDynamicMetadata.prototype.url = null;
        AIRichResponseDynamicMetadata.prototype.loopCount = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_type", {
            get: $util.oneOfGetter(($oneOfFields = ["type"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_url", {
            get: $util.oneOfGetter(($oneOfFields = ["url"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_loopCount", {
            get: $util.oneOfGetter(($oneOfFields = ["loopCount"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseDynamicMetadata.create = function create(properties) {
            return new AIRichResponseDynamicMetadata(properties);
        };
        AIRichResponseDynamicMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(8).int32(message.type);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(16).uint64(message.version);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(26).string(message.url);
            if (message.loopCount != null && Object.hasOwnProperty.call(message, "loopCount"))
                writer.uint32(32).uint32(message.loopCount);
            return writer;
        };
        AIRichResponseDynamicMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseDynamicMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseDynamicMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.type = reader.int32();
                        break;
                    }
                    case 2: {
                        message.version = reader.uint64();
                        break;
                    }
                    case 3: {
                        message.url = reader.string();
                        break;
                    }
                    case 4: {
                        message.loopCount = reader.uint32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseDynamicMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseDynamicMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                properties._type = 1;
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                if (
                    !$util.isInteger(message.version) &&
                    !(
                        message.version &&
                        $util.isInteger(message.version.low) &&
                        $util.isInteger(message.version.high)
                    )
                )
                    return "version: integer|Long expected";
            }
            if (message.url != null && message.hasOwnProperty("url")) {
                properties._url = 1;
                if (!$util.isString(message.url)) return "url: string expected";
            }
            if (message.loopCount != null && message.hasOwnProperty("loopCount")) {
                properties._loopCount = 1;
                if (!$util.isInteger(message.loopCount)) return "loopCount: integer expected";
            }
            return null;
        };
        AIRichResponseDynamicMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseDynamicMetadata) return object;
            var message = new $root.AICommon.AIRichResponseDynamicMetadata();
            switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE":
                case 1:
                    message.type = 1;
                    break;
                case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF":
                case 2:
                    message.type = 2;
                    break;
            }
            if (object.version != null)
                if ($util.Long)
                    (message.version = $util.Long.fromValue(object.version)).unsigned = true;
                else if (typeof object.version === "string")
                    message.version = parseInt(object.version, 10);
                else if (typeof object.version === "number") message.version = object.version;
                else if (typeof object.version === "object")
                    message.version = new $util.LongBits(
                        object.version.low >>> 0,
                        object.version.high >>> 0
                    ).toNumber(true);
            if (object.url != null) message.url = String(object.url);
            if (object.loopCount != null) message.loopCount = object.loopCount >>> 0;
            return message;
        };
        AIRichResponseDynamicMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                object.type =
                    options.enums === String
                        ? $root.AICommon.AIRichResponseDynamicMetadata
                              .AIRichResponseDynamicMetadataType[message.type] === undefined
                            ? message.type
                            : $root.AICommon.AIRichResponseDynamicMetadata
                                  .AIRichResponseDynamicMetadataType[message.type]
                        : message.type;
                if (options.oneofs) object._type = "type";
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                if (typeof message.version === "number")
                    object.version =
                        options.longs === String ? String(message.version) : message.version;
                else
                    object.version =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.version)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.version.low >>> 0,
                                    message.version.high >>> 0
                                ).toNumber(true)
                              : message.version;
                if (options.oneofs) object._version = "version";
            }
            if (message.url != null && message.hasOwnProperty("url")) {
                object.url = message.url;
                if (options.oneofs) object._url = "url";
            }
            if (message.loopCount != null && message.hasOwnProperty("loopCount")) {
                object.loopCount = message.loopCount;
                if (options.oneofs) object._loopCount = "loopCount";
            }
            return object;
        };
        AIRichResponseDynamicMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseDynamicMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseDynamicMetadata";
        };
        AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN")] = 0;
            values[(valuesById[1] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE")] = 1;
            values[(valuesById[2] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF")] = 2;
            return values;
        })();
        return AIRichResponseDynamicMetadata;
    })();
    AICommon.AIRichResponseTableMetadata = (function () {
        function AIRichResponseTableMetadata(properties) {
            this.rows = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseTableMetadata.prototype.rows = $util.emptyArray;
        AIRichResponseTableMetadata.prototype.title = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseTableMetadata.prototype, "_title", {
            get: $util.oneOfGetter(($oneOfFields = ["title"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseTableMetadata.create = function create(properties) {
            return new AIRichResponseTableMetadata(properties);
        };
        AIRichResponseTableMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.rows != null && message.rows.length)
                for (var i = 0; i < message.rows.length; ++i)
                    $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.encode(
                        message.rows[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(18).string(message.title);
            return writer;
        };
        AIRichResponseTableMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseTableMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseTableMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.rows && message.rows.length)) message.rows = [];
                        message.rows.push(
                            $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 2: {
                        message.title = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseTableMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseTableMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.rows != null && message.hasOwnProperty("rows")) {
                if (!Array.isArray(message.rows)) return "rows: array expected";
                for (var i = 0; i < message.rows.length; ++i) {
                    var error =
                        $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.verify(
                            message.rows[i]
                        );
                    if (error) return "rows." + error;
                }
            }
            if (message.title != null && message.hasOwnProperty("title")) {
                properties._title = 1;
                if (!$util.isString(message.title)) return "title: string expected";
            }
            return null;
        };
        AIRichResponseTableMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseTableMetadata) return object;
            var message = new $root.AICommon.AIRichResponseTableMetadata();
            if (object.rows) {
                if (!Array.isArray(object.rows))
                    throw TypeError(".AICommon.AIRichResponseTableMetadata.rows: array expected");
                message.rows = [];
                for (var i = 0; i < object.rows.length; ++i) {
                    if (typeof object.rows[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseTableMetadata.rows: object expected"
                        );
                    message.rows[i] =
                        $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.fromObject(
                            object.rows[i]
                        );
                }
            }
            if (object.title != null) message.title = String(object.title);
            return message;
        };
        AIRichResponseTableMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.rows = [];
            if (message.rows && message.rows.length) {
                object.rows = [];
                for (var j = 0; j < message.rows.length; ++j)
                    object.rows[j] =
                        $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.toObject(
                            message.rows[j],
                            options
                        );
            }
            if (message.title != null && message.hasOwnProperty("title")) {
                object.title = message.title;
                if (options.oneofs) object._title = "title";
            }
            return object;
        };
        AIRichResponseTableMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseTableMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseTableMetadata";
        };
        AIRichResponseTableMetadata.AIRichResponseTableRow = (function () {
            function AIRichResponseTableRow(properties) {
                this.items = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseTableRow.prototype.items = $util.emptyArray;
            AIRichResponseTableRow.prototype.isHeading = null;
            var $oneOfFields;
            Object.defineProperty(AIRichResponseTableRow.prototype, "_isHeading", {
                get: $util.oneOfGetter(($oneOfFields = ["isHeading"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIRichResponseTableRow.create = function create(properties) {
                return new AIRichResponseTableRow(properties);
            };
            AIRichResponseTableRow.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.items != null && message.items.length)
                    for (var i = 0; i < message.items.length; ++i)
                        writer.uint32(10).string(message.items[i]);
                if (message.isHeading != null && Object.hasOwnProperty.call(message, "isHeading"))
                    writer.uint32(16).bool(message.isHeading);
                return writer;
            };
            AIRichResponseTableRow.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseTableRow.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (!(message.items && message.items.length)) message.items = [];
                            message.items.push(reader.string());
                            break;
                        }
                        case 2: {
                            message.isHeading = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIRichResponseTableRow.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseTableRow.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.items != null && message.hasOwnProperty("items")) {
                    if (!Array.isArray(message.items)) return "items: array expected";
                    for (var i = 0; i < message.items.length; ++i)
                        if (!$util.isString(message.items[i])) return "items: string[] expected";
                }
                if (message.isHeading != null && message.hasOwnProperty("isHeading")) {
                    properties._isHeading = 1;
                    if (typeof message.isHeading !== "boolean")
                        return "isHeading: boolean expected";
                }
                return null;
            };
            AIRichResponseTableRow.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow();
                if (object.items) {
                    if (!Array.isArray(object.items))
                        throw TypeError(
                            ".AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow.items: array expected"
                        );
                    message.items = [];
                    for (var i = 0; i < object.items.length; ++i)
                        message.items[i] = String(object.items[i]);
                }
                if (object.isHeading != null) message.isHeading = Boolean(object.isHeading);
                return message;
            };
            AIRichResponseTableRow.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.items = [];
                if (message.items && message.items.length) {
                    object.items = [];
                    for (var j = 0; j < message.items.length; ++j)
                        object.items[j] = message.items[j];
                }
                if (message.isHeading != null && message.hasOwnProperty("isHeading")) {
                    object.isHeading = message.isHeading;
                    if (options.oneofs) object._isHeading = "isHeading";
                }
                return object;
            };
            AIRichResponseTableRow.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseTableRow.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/AICommon.AIRichResponseTableMetadata.AIRichResponseTableRow"
                );
            };
            return AIRichResponseTableRow;
        })();
        return AIRichResponseTableMetadata;
    })();
    AICommon.AIRichResponseCodeMetadata = (function () {
        function AIRichResponseCodeMetadata(properties) {
            this.codeBlocks = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseCodeMetadata.prototype.codeLanguage = null;
        AIRichResponseCodeMetadata.prototype.codeBlocks = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseCodeMetadata.prototype, "_codeLanguage", {
            get: $util.oneOfGetter(($oneOfFields = ["codeLanguage"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseCodeMetadata.create = function create(properties) {
            return new AIRichResponseCodeMetadata(properties);
        };
        AIRichResponseCodeMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.codeLanguage != null && Object.hasOwnProperty.call(message, "codeLanguage"))
                writer.uint32(10).string(message.codeLanguage);
            if (message.codeBlocks != null && message.codeBlocks.length)
                for (var i = 0; i < message.codeBlocks.length; ++i)
                    $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.encode(
                        message.codeBlocks[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        AIRichResponseCodeMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseCodeMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseCodeMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.codeLanguage = reader.string();
                        break;
                    }
                    case 2: {
                        if (!(message.codeBlocks && message.codeBlocks.length))
                            message.codeBlocks = [];
                        message.codeBlocks.push(
                            $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.decode(
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
        AIRichResponseCodeMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseCodeMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.codeLanguage != null && message.hasOwnProperty("codeLanguage")) {
                properties._codeLanguage = 1;
                if (!$util.isString(message.codeLanguage)) return "codeLanguage: string expected";
            }
            if (message.codeBlocks != null && message.hasOwnProperty("codeBlocks")) {
                if (!Array.isArray(message.codeBlocks)) return "codeBlocks: array expected";
                for (var i = 0; i < message.codeBlocks.length; ++i) {
                    var error =
                        $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.verify(
                            message.codeBlocks[i]
                        );
                    if (error) return "codeBlocks." + error;
                }
            }
            return null;
        };
        AIRichResponseCodeMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseCodeMetadata) return object;
            var message = new $root.AICommon.AIRichResponseCodeMetadata();
            if (object.codeLanguage != null) message.codeLanguage = String(object.codeLanguage);
            if (object.codeBlocks) {
                if (!Array.isArray(object.codeBlocks))
                    throw TypeError(
                        ".AICommon.AIRichResponseCodeMetadata.codeBlocks: array expected"
                    );
                message.codeBlocks = [];
                for (var i = 0; i < object.codeBlocks.length; ++i) {
                    if (typeof object.codeBlocks[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseCodeMetadata.codeBlocks: object expected"
                        );
                    message.codeBlocks[i] =
                        $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.fromObject(
                            object.codeBlocks[i]
                        );
                }
            }
            return message;
        };
        AIRichResponseCodeMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.codeBlocks = [];
            if (message.codeLanguage != null && message.hasOwnProperty("codeLanguage")) {
                object.codeLanguage = message.codeLanguage;
                if (options.oneofs) object._codeLanguage = "codeLanguage";
            }
            if (message.codeBlocks && message.codeBlocks.length) {
                object.codeBlocks = [];
                for (var j = 0; j < message.codeBlocks.length; ++j)
                    object.codeBlocks[j] =
                        $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.toObject(
                            message.codeBlocks[j],
                            options
                        );
            }
            return object;
        };
        AIRichResponseCodeMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseCodeMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseCodeMetadata";
        };
        AIRichResponseCodeMetadata.AIRichResponseCodeBlock = (function () {
            function AIRichResponseCodeBlock(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIRichResponseCodeBlock.prototype.highlightType = null;
            AIRichResponseCodeBlock.prototype.codeContent = null;
            var $oneOfFields;
            Object.defineProperty(AIRichResponseCodeBlock.prototype, "_highlightType", {
                get: $util.oneOfGetter(($oneOfFields = ["highlightType"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AIRichResponseCodeBlock.prototype, "_codeContent", {
                get: $util.oneOfGetter(($oneOfFields = ["codeContent"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIRichResponseCodeBlock.create = function create(properties) {
                return new AIRichResponseCodeBlock(properties);
            };
            AIRichResponseCodeBlock.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.highlightType != null &&
                    Object.hasOwnProperty.call(message, "highlightType")
                )
                    writer.uint32(8).int32(message.highlightType);
                if (
                    message.codeContent != null &&
                    Object.hasOwnProperty.call(message, "codeContent")
                )
                    writer.uint32(18).string(message.codeContent);
                return writer;
            };
            AIRichResponseCodeBlock.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIRichResponseCodeBlock.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.highlightType = reader.int32();
                            break;
                        }
                        case 2: {
                            message.codeContent = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIRichResponseCodeBlock.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIRichResponseCodeBlock.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.highlightType != null && message.hasOwnProperty("highlightType")) {
                    properties._highlightType = 1;
                    switch (message.highlightType) {
                        default:
                            return "highlightType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                    }
                }
                if (message.codeContent != null && message.hasOwnProperty("codeContent")) {
                    properties._codeContent = 1;
                    if (!$util.isString(message.codeContent)) return "codeContent: string expected";
                }
                return null;
            };
            AIRichResponseCodeBlock.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock
                )
                    return object;
                var message =
                    new $root.AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock();
                switch (object.highlightType) {
                    default:
                        if (typeof object.highlightType === "number") {
                            message.highlightType = object.highlightType;
                            break;
                        }
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT":
                    case 0:
                        message.highlightType = 0;
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD":
                    case 1:
                        message.highlightType = 1;
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD":
                    case 2:
                        message.highlightType = 2;
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING":
                    case 3:
                        message.highlightType = 3;
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER":
                    case 4:
                        message.highlightType = 4;
                        break;
                    case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT":
                    case 5:
                        message.highlightType = 5;
                        break;
                }
                if (object.codeContent != null) message.codeContent = String(object.codeContent);
                return message;
            };
            AIRichResponseCodeBlock.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.highlightType != null && message.hasOwnProperty("highlightType")) {
                    object.highlightType =
                        options.enums === String
                            ? $root.AICommon.AIRichResponseCodeMetadata
                                  .AIRichResponseCodeHighlightType[message.highlightType] ===
                              undefined
                                ? message.highlightType
                                : $root.AICommon.AIRichResponseCodeMetadata
                                      .AIRichResponseCodeHighlightType[message.highlightType]
                            : message.highlightType;
                    if (options.oneofs) object._highlightType = "highlightType";
                }
                if (message.codeContent != null && message.hasOwnProperty("codeContent")) {
                    object.codeContent = message.codeContent;
                    if (options.oneofs) object._codeContent = "codeContent";
                }
                return object;
            };
            AIRichResponseCodeBlock.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIRichResponseCodeBlock.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/AICommon.AIRichResponseCodeMetadata.AIRichResponseCodeBlock"
                );
            };
            return AIRichResponseCodeBlock;
        })();
        AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT")] = 0;
            values[(valuesById[1] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD")] = 1;
            values[(valuesById[2] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD")] = 2;
            values[(valuesById[3] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING")] = 3;
            values[(valuesById[4] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER")] = 4;
            values[(valuesById[5] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT")] = 5;
            return values;
        })();
        return AIRichResponseCodeMetadata;
    })();
    AICommon.AIRichResponseInlineImageMetadata = (function () {
        function AIRichResponseInlineImageMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseInlineImageMetadata.prototype.imageUrl = null;
        AIRichResponseInlineImageMetadata.prototype.imageText = null;
        AIRichResponseInlineImageMetadata.prototype.alignment = null;
        AIRichResponseInlineImageMetadata.prototype.tapLinkUrl = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_imageUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["imageUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_imageText", {
            get: $util.oneOfGetter(($oneOfFields = ["imageText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_alignment", {
            get: $util.oneOfGetter(($oneOfFields = ["alignment"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_tapLinkUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["tapLinkUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseInlineImageMetadata.create = function create(properties) {
            return new AIRichResponseInlineImageMetadata(properties);
        };
        AIRichResponseInlineImageMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.imageUrl != null && Object.hasOwnProperty.call(message, "imageUrl"))
                $root.AICommon.AIRichResponseImageURL.encode(
                    message.imageUrl,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.imageText != null && Object.hasOwnProperty.call(message, "imageText"))
                writer.uint32(18).string(message.imageText);
            if (message.alignment != null && Object.hasOwnProperty.call(message, "alignment"))
                writer.uint32(24).int32(message.alignment);
            if (message.tapLinkUrl != null && Object.hasOwnProperty.call(message, "tapLinkUrl"))
                writer.uint32(34).string(message.tapLinkUrl);
            return writer;
        };
        AIRichResponseInlineImageMetadata.encodeDelimited = function encodeDelimited(
            message,
            writer
        ) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseInlineImageMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseInlineImageMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.imageUrl = $root.AICommon.AIRichResponseImageURL.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.imageText = reader.string();
                        break;
                    }
                    case 3: {
                        message.alignment = reader.int32();
                        break;
                    }
                    case 4: {
                        message.tapLinkUrl = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseInlineImageMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseInlineImageMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.imageUrl != null && message.hasOwnProperty("imageUrl")) {
                properties._imageUrl = 1;
                {
                    var error = $root.AICommon.AIRichResponseImageURL.verify(message.imageUrl);
                    if (error) return "imageUrl." + error;
                }
            }
            if (message.imageText != null && message.hasOwnProperty("imageText")) {
                properties._imageText = 1;
                if (!$util.isString(message.imageText)) return "imageText: string expected";
            }
            if (message.alignment != null && message.hasOwnProperty("alignment")) {
                properties._alignment = 1;
                switch (message.alignment) {
                    default:
                        return "alignment: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.tapLinkUrl != null && message.hasOwnProperty("tapLinkUrl")) {
                properties._tapLinkUrl = 1;
                if (!$util.isString(message.tapLinkUrl)) return "tapLinkUrl: string expected";
            }
            return null;
        };
        AIRichResponseInlineImageMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseInlineImageMetadata) return object;
            var message = new $root.AICommon.AIRichResponseInlineImageMetadata();
            if (object.imageUrl != null) {
                if (typeof object.imageUrl !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseInlineImageMetadata.imageUrl: object expected"
                    );
                message.imageUrl = $root.AICommon.AIRichResponseImageURL.fromObject(
                    object.imageUrl
                );
            }
            if (object.imageText != null) message.imageText = String(object.imageText);
            switch (object.alignment) {
                default:
                    if (typeof object.alignment === "number") {
                        message.alignment = object.alignment;
                        break;
                    }
                    break;
                case "AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED":
                case 0:
                    message.alignment = 0;
                    break;
                case "AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED":
                case 1:
                    message.alignment = 1;
                    break;
                case "AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED":
                case 2:
                    message.alignment = 2;
                    break;
            }
            if (object.tapLinkUrl != null) message.tapLinkUrl = String(object.tapLinkUrl);
            return message;
        };
        AIRichResponseInlineImageMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.imageUrl != null && message.hasOwnProperty("imageUrl")) {
                object.imageUrl = $root.AICommon.AIRichResponseImageURL.toObject(
                    message.imageUrl,
                    options
                );
                if (options.oneofs) object._imageUrl = "imageUrl";
            }
            if (message.imageText != null && message.hasOwnProperty("imageText")) {
                object.imageText = message.imageText;
                if (options.oneofs) object._imageText = "imageText";
            }
            if (message.alignment != null && message.hasOwnProperty("alignment")) {
                object.alignment =
                    options.enums === String
                        ? $root.AICommon.AIRichResponseInlineImageMetadata
                              .AIRichResponseImageAlignment[message.alignment] === undefined
                            ? message.alignment
                            : $root.AICommon.AIRichResponseInlineImageMetadata
                                  .AIRichResponseImageAlignment[message.alignment]
                        : message.alignment;
                if (options.oneofs) object._alignment = "alignment";
            }
            if (message.tapLinkUrl != null && message.hasOwnProperty("tapLinkUrl")) {
                object.tapLinkUrl = message.tapLinkUrl;
                if (options.oneofs) object._tapLinkUrl = "tapLinkUrl";
            }
            return object;
        };
        AIRichResponseInlineImageMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseInlineImageMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseInlineImageMetadata";
        };
        AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED")] = 0;
            values[(valuesById[1] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED")] = 1;
            values[(valuesById[2] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED")] = 2;
            return values;
        })();
        return AIRichResponseInlineImageMetadata;
    })();
    AICommon.AIRichResponseGridImageMetadata = (function () {
        function AIRichResponseGridImageMetadata(properties) {
            this.imageUrls = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseGridImageMetadata.prototype.gridImageUrl = null;
        AIRichResponseGridImageMetadata.prototype.imageUrls = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseGridImageMetadata.prototype, "_gridImageUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["gridImageUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseGridImageMetadata.create = function create(properties) {
            return new AIRichResponseGridImageMetadata(properties);
        };
        AIRichResponseGridImageMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.gridImageUrl != null && Object.hasOwnProperty.call(message, "gridImageUrl"))
                $root.AICommon.AIRichResponseImageURL.encode(
                    message.gridImageUrl,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.imageUrls != null && message.imageUrls.length)
                for (var i = 0; i < message.imageUrls.length; ++i)
                    $root.AICommon.AIRichResponseImageURL.encode(
                        message.imageUrls[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        AIRichResponseGridImageMetadata.encodeDelimited = function encodeDelimited(
            message,
            writer
        ) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseGridImageMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseGridImageMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.gridImageUrl = $root.AICommon.AIRichResponseImageURL.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        if (!(message.imageUrls && message.imageUrls.length))
                            message.imageUrls = [];
                        message.imageUrls.push(
                            $root.AICommon.AIRichResponseImageURL.decode(reader, reader.uint32())
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
        AIRichResponseGridImageMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseGridImageMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.gridImageUrl != null && message.hasOwnProperty("gridImageUrl")) {
                properties._gridImageUrl = 1;
                {
                    var error = $root.AICommon.AIRichResponseImageURL.verify(message.gridImageUrl);
                    if (error) return "gridImageUrl." + error;
                }
            }
            if (message.imageUrls != null && message.hasOwnProperty("imageUrls")) {
                if (!Array.isArray(message.imageUrls)) return "imageUrls: array expected";
                for (var i = 0; i < message.imageUrls.length; ++i) {
                    var error = $root.AICommon.AIRichResponseImageURL.verify(message.imageUrls[i]);
                    if (error) return "imageUrls." + error;
                }
            }
            return null;
        };
        AIRichResponseGridImageMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseGridImageMetadata) return object;
            var message = new $root.AICommon.AIRichResponseGridImageMetadata();
            if (object.gridImageUrl != null) {
                if (typeof object.gridImageUrl !== "object")
                    throw TypeError(
                        ".AICommon.AIRichResponseGridImageMetadata.gridImageUrl: object expected"
                    );
                message.gridImageUrl = $root.AICommon.AIRichResponseImageURL.fromObject(
                    object.gridImageUrl
                );
            }
            if (object.imageUrls) {
                if (!Array.isArray(object.imageUrls))
                    throw TypeError(
                        ".AICommon.AIRichResponseGridImageMetadata.imageUrls: array expected"
                    );
                message.imageUrls = [];
                for (var i = 0; i < object.imageUrls.length; ++i) {
                    if (typeof object.imageUrls[i] !== "object")
                        throw TypeError(
                            ".AICommon.AIRichResponseGridImageMetadata.imageUrls: object expected"
                        );
                    message.imageUrls[i] = $root.AICommon.AIRichResponseImageURL.fromObject(
                        object.imageUrls[i]
                    );
                }
            }
            return message;
        };
        AIRichResponseGridImageMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.imageUrls = [];
            if (message.gridImageUrl != null && message.hasOwnProperty("gridImageUrl")) {
                object.gridImageUrl = $root.AICommon.AIRichResponseImageURL.toObject(
                    message.gridImageUrl,
                    options
                );
                if (options.oneofs) object._gridImageUrl = "gridImageUrl";
            }
            if (message.imageUrls && message.imageUrls.length) {
                object.imageUrls = [];
                for (var j = 0; j < message.imageUrls.length; ++j)
                    object.imageUrls[j] = $root.AICommon.AIRichResponseImageURL.toObject(
                        message.imageUrls[j],
                        options
                    );
            }
            return object;
        };
        AIRichResponseGridImageMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseGridImageMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseGridImageMetadata";
        };
        return AIRichResponseGridImageMetadata;
    })();
    AICommon.AIRichResponseImageURL = (function () {
        function AIRichResponseImageURL(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIRichResponseImageURL.prototype.imagePreviewUrl = null;
        AIRichResponseImageURL.prototype.imageHighResUrl = null;
        AIRichResponseImageURL.prototype.sourceUrl = null;
        var $oneOfFields;
        Object.defineProperty(AIRichResponseImageURL.prototype, "_imagePreviewUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["imagePreviewUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseImageURL.prototype, "_imageHighResUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["imageHighResUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIRichResponseImageURL.prototype, "_sourceUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["sourceUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIRichResponseImageURL.create = function create(properties) {
            return new AIRichResponseImageURL(properties);
        };
        AIRichResponseImageURL.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.imagePreviewUrl != null &&
                Object.hasOwnProperty.call(message, "imagePreviewUrl")
            )
                writer.uint32(10).string(message.imagePreviewUrl);
            if (
                message.imageHighResUrl != null &&
                Object.hasOwnProperty.call(message, "imageHighResUrl")
            )
                writer.uint32(18).string(message.imageHighResUrl);
            if (message.sourceUrl != null && Object.hasOwnProperty.call(message, "sourceUrl"))
                writer.uint32(26).string(message.sourceUrl);
            return writer;
        };
        AIRichResponseImageURL.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIRichResponseImageURL.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIRichResponseImageURL();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.imagePreviewUrl = reader.string();
                        break;
                    }
                    case 2: {
                        message.imageHighResUrl = reader.string();
                        break;
                    }
                    case 3: {
                        message.sourceUrl = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        AIRichResponseImageURL.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIRichResponseImageURL.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.imagePreviewUrl != null && message.hasOwnProperty("imagePreviewUrl")) {
                properties._imagePreviewUrl = 1;
                if (!$util.isString(message.imagePreviewUrl))
                    return "imagePreviewUrl: string expected";
            }
            if (message.imageHighResUrl != null && message.hasOwnProperty("imageHighResUrl")) {
                properties._imageHighResUrl = 1;
                if (!$util.isString(message.imageHighResUrl))
                    return "imageHighResUrl: string expected";
            }
            if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                properties._sourceUrl = 1;
                if (!$util.isString(message.sourceUrl)) return "sourceUrl: string expected";
            }
            return null;
        };
        AIRichResponseImageURL.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIRichResponseImageURL) return object;
            var message = new $root.AICommon.AIRichResponseImageURL();
            if (object.imagePreviewUrl != null)
                message.imagePreviewUrl = String(object.imagePreviewUrl);
            if (object.imageHighResUrl != null)
                message.imageHighResUrl = String(object.imageHighResUrl);
            if (object.sourceUrl != null) message.sourceUrl = String(object.sourceUrl);
            return message;
        };
        AIRichResponseImageURL.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.imagePreviewUrl != null && message.hasOwnProperty("imagePreviewUrl")) {
                object.imagePreviewUrl = message.imagePreviewUrl;
                if (options.oneofs) object._imagePreviewUrl = "imagePreviewUrl";
            }
            if (message.imageHighResUrl != null && message.hasOwnProperty("imageHighResUrl")) {
                object.imageHighResUrl = message.imageHighResUrl;
                if (options.oneofs) object._imageHighResUrl = "imageHighResUrl";
            }
            if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                object.sourceUrl = message.sourceUrl;
                if (options.oneofs) object._sourceUrl = "sourceUrl";
            }
            return object;
        };
        AIRichResponseImageURL.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIRichResponseImageURL.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIRichResponseImageURL";
        };
        return AIRichResponseImageURL;
    })();
    AICommon.BotMessageSharingInfo = (function () {
        function BotMessageSharingInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMessageSharingInfo.prototype.botEntryPointOrigin = null;
        BotMessageSharingInfo.prototype.forwardScore = null;
        var $oneOfFields;
        Object.defineProperty(BotMessageSharingInfo.prototype, "_botEntryPointOrigin", {
            get: $util.oneOfGetter(($oneOfFields = ["botEntryPointOrigin"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMessageSharingInfo.prototype, "_forwardScore", {
            get: $util.oneOfGetter(($oneOfFields = ["forwardScore"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMessageSharingInfo.create = function create(properties) {
            return new BotMessageSharingInfo(properties);
        };
        BotMessageSharingInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.botEntryPointOrigin != null &&
                Object.hasOwnProperty.call(message, "botEntryPointOrigin")
            )
                writer.uint32(8).int32(message.botEntryPointOrigin);
            if (message.forwardScore != null && Object.hasOwnProperty.call(message, "forwardScore"))
                writer.uint32(16).uint32(message.forwardScore);
            return writer;
        };
        BotMessageSharingInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMessageSharingInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMessageSharingInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.botEntryPointOrigin = reader.int32();
                        break;
                    }
                    case 2: {
                        message.forwardScore = reader.uint32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMessageSharingInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMessageSharingInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.botEntryPointOrigin != null &&
                message.hasOwnProperty("botEntryPointOrigin")
            ) {
                properties._botEntryPointOrigin = 1;
                switch (message.botEntryPointOrigin) {
                    default:
                        return "botEntryPointOrigin: enum value expected";
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
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                        break;
                }
            }
            if (message.forwardScore != null && message.hasOwnProperty("forwardScore")) {
                properties._forwardScore = 1;
                if (!$util.isInteger(message.forwardScore)) return "forwardScore: integer expected";
            }
            return null;
        };
        BotMessageSharingInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMessageSharingInfo) return object;
            var message = new $root.AICommon.BotMessageSharingInfo();
            switch (object.botEntryPointOrigin) {
                default:
                    if (typeof object.botEntryPointOrigin === "number") {
                        message.botEntryPointOrigin = object.botEntryPointOrigin;
                        break;
                    }
                    break;
                case "UNDEFINED_ENTRY_POINT":
                case 0:
                    message.botEntryPointOrigin = 0;
                    break;
                case "FAVICON":
                case 1:
                    message.botEntryPointOrigin = 1;
                    break;
                case "CHATLIST":
                case 2:
                    message.botEntryPointOrigin = 2;
                    break;
                case "AISEARCH_NULL_STATE_PAPER_PLANE":
                case 3:
                    message.botEntryPointOrigin = 3;
                    break;
                case "AISEARCH_NULL_STATE_SUGGESTION":
                case 4:
                    message.botEntryPointOrigin = 4;
                    break;
                case "AISEARCH_TYPE_AHEAD_SUGGESTION":
                case 5:
                    message.botEntryPointOrigin = 5;
                    break;
                case "AISEARCH_TYPE_AHEAD_PAPER_PLANE":
                case 6:
                    message.botEntryPointOrigin = 6;
                    break;
                case "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST":
                case 7:
                    message.botEntryPointOrigin = 7;
                    break;
                case "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES":
                case 8:
                    message.botEntryPointOrigin = 8;
                    break;
                case "AIVOICE_SEARCH_BAR":
                case 9:
                    message.botEntryPointOrigin = 9;
                    break;
                case "AIVOICE_FAVICON":
                case 10:
                    message.botEntryPointOrigin = 10;
                    break;
                case "AISTUDIO":
                case 11:
                    message.botEntryPointOrigin = 11;
                    break;
                case "DEEPLINK":
                case 12:
                    message.botEntryPointOrigin = 12;
                    break;
                case "NOTIFICATION":
                case 13:
                    message.botEntryPointOrigin = 13;
                    break;
                case "PROFILE_MESSAGE_BUTTON":
                case 14:
                    message.botEntryPointOrigin = 14;
                    break;
                case "FORWARD":
                case 15:
                    message.botEntryPointOrigin = 15;
                    break;
                case "APP_SHORTCUT":
                case 16:
                    message.botEntryPointOrigin = 16;
                    break;
                case "FF_FAMILY":
                case 17:
                    message.botEntryPointOrigin = 17;
                    break;
                case "AI_TAB":
                case 18:
                    message.botEntryPointOrigin = 18;
                    break;
                case "AI_HOME":
                case 19:
                    message.botEntryPointOrigin = 19;
                    break;
                case "AI_DEEPLINK_IMMERSIVE":
                case 20:
                    message.botEntryPointOrigin = 20;
                    break;
                case "AI_DEEPLINK":
                case 21:
                    message.botEntryPointOrigin = 21;
                    break;
                case "META_AI_CHAT_SHORTCUT_AI_STUDIO":
                case 22:
                    message.botEntryPointOrigin = 22;
                    break;
                case "UGC_CHAT_SHORTCUT_AI_STUDIO":
                case 23:
                    message.botEntryPointOrigin = 23;
                    break;
                case "NEW_CHAT_AI_STUDIO":
                case 24:
                    message.botEntryPointOrigin = 24;
                    break;
                case "AIVOICE_FAVICON_CALL_HISTORY":
                case 25:
                    message.botEntryPointOrigin = 25;
                    break;
                case "ASK_META_AI_CONTEXT_MENU":
                case 26:
                    message.botEntryPointOrigin = 26;
                    break;
                case "ASK_META_AI_CONTEXT_MENU_1ON1":
                case 27:
                    message.botEntryPointOrigin = 27;
                    break;
                case "ASK_META_AI_CONTEXT_MENU_GROUP":
                case 28:
                    message.botEntryPointOrigin = 28;
                    break;
                case "INVOKE_META_AI_1ON1":
                case 29:
                    message.botEntryPointOrigin = 29;
                    break;
                case "INVOKE_META_AI_GROUP":
                case 30:
                    message.botEntryPointOrigin = 30;
                    break;
                case "META_AI_FORWARD":
                case 31:
                    message.botEntryPointOrigin = 31;
                    break;
                case "NEW_CHAT_AI_CONTACT":
                case 32:
                    message.botEntryPointOrigin = 32;
                    break;
                case "MESSAGE_QUICK_ACTION_1_ON_1_CHAT":
                case 33:
                    message.botEntryPointOrigin = 33;
                    break;
                case "MESSAGE_QUICK_ACTION_GROUP_CHAT":
                case 34:
                    message.botEntryPointOrigin = 34;
                    break;
                case "ATTACHMENT_TRAY_1_ON_1_CHAT":
                case 35:
                    message.botEntryPointOrigin = 35;
                    break;
                case "ATTACHMENT_TRAY_GROUP_CHAT":
                case 36:
                    message.botEntryPointOrigin = 36;
                    break;
                case "ASK_META_AI_MEDIA_VIEWER_1ON1":
                case 37:
                    message.botEntryPointOrigin = 37;
                    break;
                case "ASK_META_AI_MEDIA_VIEWER_GROUP":
                case 38:
                    message.botEntryPointOrigin = 38;
                    break;
            }
            if (object.forwardScore != null) message.forwardScore = object.forwardScore >>> 0;
            return message;
        };
        BotMessageSharingInfo.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.botEntryPointOrigin != null &&
                message.hasOwnProperty("botEntryPointOrigin")
            ) {
                object.botEntryPointOrigin =
                    options.enums === String
                        ? $root.AICommon.BotMetricsEntryPoint[message.botEntryPointOrigin] ===
                          undefined
                            ? message.botEntryPointOrigin
                            : $root.AICommon.BotMetricsEntryPoint[message.botEntryPointOrigin]
                        : message.botEntryPointOrigin;
                if (options.oneofs) object._botEntryPointOrigin = "botEntryPointOrigin";
            }
            if (message.forwardScore != null && message.hasOwnProperty("forwardScore")) {
                object.forwardScore = message.forwardScore;
                if (options.oneofs) object._forwardScore = "forwardScore";
            }
            return object;
        };
        BotMessageSharingInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMessageSharingInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMessageSharingInfo";
        };
        return BotMessageSharingInfo;
    })();
    AICommon.ForwardedAIBotMessageInfo = (function () {
        function ForwardedAIBotMessageInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ForwardedAIBotMessageInfo.prototype.botName = null;
        ForwardedAIBotMessageInfo.prototype.botJid = null;
        ForwardedAIBotMessageInfo.prototype.creatorName = null;
        var $oneOfFields;
        Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_botName", {
            get: $util.oneOfGetter(($oneOfFields = ["botName"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_botJid", {
            get: $util.oneOfGetter(($oneOfFields = ["botJid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_creatorName", {
            get: $util.oneOfGetter(($oneOfFields = ["creatorName"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ForwardedAIBotMessageInfo.create = function create(properties) {
            return new ForwardedAIBotMessageInfo(properties);
        };
        ForwardedAIBotMessageInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.botName != null && Object.hasOwnProperty.call(message, "botName"))
                writer.uint32(10).string(message.botName);
            if (message.botJid != null && Object.hasOwnProperty.call(message, "botJid"))
                writer.uint32(18).string(message.botJid);
            if (message.creatorName != null && Object.hasOwnProperty.call(message, "creatorName"))
                writer.uint32(26).string(message.creatorName);
            return writer;
        };
        ForwardedAIBotMessageInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ForwardedAIBotMessageInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.ForwardedAIBotMessageInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.botName = reader.string();
                        break;
                    }
                    case 2: {
                        message.botJid = reader.string();
                        break;
                    }
                    case 3: {
                        message.creatorName = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ForwardedAIBotMessageInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ForwardedAIBotMessageInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.botName != null && message.hasOwnProperty("botName")) {
                properties._botName = 1;
                if (!$util.isString(message.botName)) return "botName: string expected";
            }
            if (message.botJid != null && message.hasOwnProperty("botJid")) {
                properties._botJid = 1;
                if (!$util.isString(message.botJid)) return "botJid: string expected";
            }
            if (message.creatorName != null && message.hasOwnProperty("creatorName")) {
                properties._creatorName = 1;
                if (!$util.isString(message.creatorName)) return "creatorName: string expected";
            }
            return null;
        };
        ForwardedAIBotMessageInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.ForwardedAIBotMessageInfo) return object;
            var message = new $root.AICommon.ForwardedAIBotMessageInfo();
            if (object.botName != null) message.botName = String(object.botName);
            if (object.botJid != null) message.botJid = String(object.botJid);
            if (object.creatorName != null) message.creatorName = String(object.creatorName);
            return message;
        };
        ForwardedAIBotMessageInfo.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.botName != null && message.hasOwnProperty("botName")) {
                object.botName = message.botName;
                if (options.oneofs) object._botName = "botName";
            }
            if (message.botJid != null && message.hasOwnProperty("botJid")) {
                object.botJid = message.botJid;
                if (options.oneofs) object._botJid = "botJid";
            }
            if (message.creatorName != null && message.hasOwnProperty("creatorName")) {
                object.creatorName = message.creatorName;
                if (options.oneofs) object._creatorName = "creatorName";
            }
            return object;
        };
        ForwardedAIBotMessageInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ForwardedAIBotMessageInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.ForwardedAIBotMessageInfo";
        };
        return ForwardedAIBotMessageInfo;
    })();
    AICommon.BotFeedbackMessage = (function () {
        function BotFeedbackMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotFeedbackMessage.prototype.messageKey = null;
        BotFeedbackMessage.prototype.kind = null;
        BotFeedbackMessage.prototype.text = null;
        BotFeedbackMessage.prototype.kindNegative = null;
        BotFeedbackMessage.prototype.kindPositive = null;
        BotFeedbackMessage.prototype.kindReport = null;
        BotFeedbackMessage.prototype.sideBySideSurveyMetadata = null;
        var $oneOfFields;
        Object.defineProperty(BotFeedbackMessage.prototype, "_messageKey", {
            get: $util.oneOfGetter(($oneOfFields = ["messageKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_kind", {
            get: $util.oneOfGetter(($oneOfFields = ["kind"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_text", {
            get: $util.oneOfGetter(($oneOfFields = ["text"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_kindNegative", {
            get: $util.oneOfGetter(($oneOfFields = ["kindNegative"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_kindPositive", {
            get: $util.oneOfGetter(($oneOfFields = ["kindPositive"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_kindReport", {
            get: $util.oneOfGetter(($oneOfFields = ["kindReport"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotFeedbackMessage.prototype, "_sideBySideSurveyMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["sideBySideSurveyMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotFeedbackMessage.create = function create(properties) {
            return new BotFeedbackMessage(properties);
        };
        BotFeedbackMessage.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.messageKey != null && Object.hasOwnProperty.call(message, "messageKey"))
                $root.Protocol.MessageKey.encode(
                    message.messageKey,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                writer.uint32(16).int32(message.kind);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(26).string(message.text);
            if (message.kindNegative != null && Object.hasOwnProperty.call(message, "kindNegative"))
                writer.uint32(32).uint64(message.kindNegative);
            if (message.kindPositive != null && Object.hasOwnProperty.call(message, "kindPositive"))
                writer.uint32(40).uint64(message.kindPositive);
            if (message.kindReport != null && Object.hasOwnProperty.call(message, "kindReport"))
                writer.uint32(48).int32(message.kindReport);
            if (
                message.sideBySideSurveyMetadata != null &&
                Object.hasOwnProperty.call(message, "sideBySideSurveyMetadata")
            )
                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.encode(
                    message.sideBySideSurveyMetadata,
                    writer.uint32(58).fork()
                ).ldelim();
            return writer;
        };
        BotFeedbackMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotFeedbackMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotFeedbackMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.messageKey = $root.Protocol.MessageKey.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.kind = reader.int32();
                        break;
                    }
                    case 3: {
                        message.text = reader.string();
                        break;
                    }
                    case 4: {
                        message.kindNegative = reader.uint64();
                        break;
                    }
                    case 5: {
                        message.kindPositive = reader.uint64();
                        break;
                    }
                    case 6: {
                        message.kindReport = reader.int32();
                        break;
                    }
                    case 7: {
                        message.sideBySideSurveyMetadata =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.decode(
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
        BotFeedbackMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotFeedbackMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.messageKey != null && message.hasOwnProperty("messageKey")) {
                properties._messageKey = 1;
                {
                    var error = $root.Protocol.MessageKey.verify(message.messageKey);
                    if (error) return "messageKey." + error;
                }
            }
            if (message.kind != null && message.hasOwnProperty("kind")) {
                properties._kind = 1;
                switch (message.kind) {
                    default:
                        return "kind: enum value expected";
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
                        break;
                }
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                properties._text = 1;
                if (!$util.isString(message.text)) return "text: string expected";
            }
            if (message.kindNegative != null && message.hasOwnProperty("kindNegative")) {
                properties._kindNegative = 1;
                if (
                    !$util.isInteger(message.kindNegative) &&
                    !(
                        message.kindNegative &&
                        $util.isInteger(message.kindNegative.low) &&
                        $util.isInteger(message.kindNegative.high)
                    )
                )
                    return "kindNegative: integer|Long expected";
            }
            if (message.kindPositive != null && message.hasOwnProperty("kindPositive")) {
                properties._kindPositive = 1;
                if (
                    !$util.isInteger(message.kindPositive) &&
                    !(
                        message.kindPositive &&
                        $util.isInteger(message.kindPositive.low) &&
                        $util.isInteger(message.kindPositive.high)
                    )
                )
                    return "kindPositive: integer|Long expected";
            }
            if (message.kindReport != null && message.hasOwnProperty("kindReport")) {
                properties._kindReport = 1;
                switch (message.kindReport) {
                    default:
                        return "kindReport: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (
                message.sideBySideSurveyMetadata != null &&
                message.hasOwnProperty("sideBySideSurveyMetadata")
            ) {
                properties._sideBySideSurveyMetadata = 1;
                {
                    var error = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.verify(
                        message.sideBySideSurveyMetadata
                    );
                    if (error) return "sideBySideSurveyMetadata." + error;
                }
            }
            return null;
        };
        BotFeedbackMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotFeedbackMessage) return object;
            var message = new $root.AICommon.BotFeedbackMessage();
            if (object.messageKey != null) {
                if (typeof object.messageKey !== "object")
                    throw TypeError(".AICommon.BotFeedbackMessage.messageKey: object expected");
                message.messageKey = $root.Protocol.MessageKey.fromObject(object.messageKey);
            }
            switch (object.kind) {
                default:
                    if (typeof object.kind === "number") {
                        message.kind = object.kind;
                        break;
                    }
                    break;
                case "BOT_FEEDBACK_POSITIVE":
                case 0:
                    message.kind = 0;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_GENERIC":
                case 1:
                    message.kind = 1;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_HELPFUL":
                case 2:
                    message.kind = 2;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_INTERESTING":
                case 3:
                    message.kind = 3;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_ACCURATE":
                case 4:
                    message.kind = 4;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_SAFE":
                case 5:
                    message.kind = 5;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_OTHER":
                case 6:
                    message.kind = 6;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_REFUSED":
                case 7:
                    message.kind = 7;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING":
                case 8:
                    message.kind = 8;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT":
                case 9:
                    message.kind = 9;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_PERSONALIZED":
                case 10:
                    message.kind = 10;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_CLARITY":
                case 11:
                    message.kind = 11;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON":
                case 12:
                    message.kind = 12;
                    break;
                case "BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY":
                case 13:
                    message.kind = 13;
                    break;
                case "BOT_FEEDBACK_NEGATIVE":
                case 14:
                    message.kind = 14;
                    break;
            }
            if (object.text != null) message.text = String(object.text);
            if (object.kindNegative != null)
                if ($util.Long)
                    (message.kindNegative = $util.Long.fromValue(object.kindNegative)).unsigned =
                        true;
                else if (typeof object.kindNegative === "string")
                    message.kindNegative = parseInt(object.kindNegative, 10);
                else if (typeof object.kindNegative === "number")
                    message.kindNegative = object.kindNegative;
                else if (typeof object.kindNegative === "object")
                    message.kindNegative = new $util.LongBits(
                        object.kindNegative.low >>> 0,
                        object.kindNegative.high >>> 0
                    ).toNumber(true);
            if (object.kindPositive != null)
                if ($util.Long)
                    (message.kindPositive = $util.Long.fromValue(object.kindPositive)).unsigned =
                        true;
                else if (typeof object.kindPositive === "string")
                    message.kindPositive = parseInt(object.kindPositive, 10);
                else if (typeof object.kindPositive === "number")
                    message.kindPositive = object.kindPositive;
                else if (typeof object.kindPositive === "object")
                    message.kindPositive = new $util.LongBits(
                        object.kindPositive.low >>> 0,
                        object.kindPositive.high >>> 0
                    ).toNumber(true);
            switch (object.kindReport) {
                default:
                    if (typeof object.kindReport === "number") {
                        message.kindReport = object.kindReport;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.kindReport = 0;
                    break;
                case "GENERIC":
                case 1:
                    message.kindReport = 1;
                    break;
            }
            if (object.sideBySideSurveyMetadata != null) {
                if (typeof object.sideBySideSurveyMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotFeedbackMessage.sideBySideSurveyMetadata: object expected"
                    );
                message.sideBySideSurveyMetadata =
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.fromObject(
                        object.sideBySideSurveyMetadata
                    );
            }
            return message;
        };
        BotFeedbackMessage.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.messageKey != null && message.hasOwnProperty("messageKey")) {
                object.messageKey = $root.Protocol.MessageKey.toObject(message.messageKey, options);
                if (options.oneofs) object._messageKey = "messageKey";
            }
            if (message.kind != null && message.hasOwnProperty("kind")) {
                object.kind =
                    options.enums === String
                        ? $root.AICommon.BotFeedbackMessage.BotFeedbackKind[message.kind] ===
                          undefined
                            ? message.kind
                            : $root.AICommon.BotFeedbackMessage.BotFeedbackKind[message.kind]
                        : message.kind;
                if (options.oneofs) object._kind = "kind";
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                object.text = message.text;
                if (options.oneofs) object._text = "text";
            }
            if (message.kindNegative != null && message.hasOwnProperty("kindNegative")) {
                if (typeof message.kindNegative === "number")
                    object.kindNegative =
                        options.longs === String
                            ? String(message.kindNegative)
                            : message.kindNegative;
                else
                    object.kindNegative =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.kindNegative)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.kindNegative.low >>> 0,
                                    message.kindNegative.high >>> 0
                                ).toNumber(true)
                              : message.kindNegative;
                if (options.oneofs) object._kindNegative = "kindNegative";
            }
            if (message.kindPositive != null && message.hasOwnProperty("kindPositive")) {
                if (typeof message.kindPositive === "number")
                    object.kindPositive =
                        options.longs === String
                            ? String(message.kindPositive)
                            : message.kindPositive;
                else
                    object.kindPositive =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.kindPositive)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.kindPositive.low >>> 0,
                                    message.kindPositive.high >>> 0
                                ).toNumber(true)
                              : message.kindPositive;
                if (options.oneofs) object._kindPositive = "kindPositive";
            }
            if (message.kindReport != null && message.hasOwnProperty("kindReport")) {
                object.kindReport =
                    options.enums === String
                        ? $root.AICommon.BotFeedbackMessage.ReportKind[message.kindReport] ===
                          undefined
                            ? message.kindReport
                            : $root.AICommon.BotFeedbackMessage.ReportKind[message.kindReport]
                        : message.kindReport;
                if (options.oneofs) object._kindReport = "kindReport";
            }
            if (
                message.sideBySideSurveyMetadata != null &&
                message.hasOwnProperty("sideBySideSurveyMetadata")
            ) {
                object.sideBySideSurveyMetadata =
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.toObject(
                        message.sideBySideSurveyMetadata,
                        options
                    );
                if (options.oneofs) object._sideBySideSurveyMetadata = "sideBySideSurveyMetadata";
            }
            return object;
        };
        BotFeedbackMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotFeedbackMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotFeedbackMessage";
        };
        BotFeedbackMessage.BotFeedbackKind = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "BOT_FEEDBACK_POSITIVE")] = 0;
            values[(valuesById[1] = "BOT_FEEDBACK_NEGATIVE_GENERIC")] = 1;
            values[(valuesById[2] = "BOT_FEEDBACK_NEGATIVE_HELPFUL")] = 2;
            values[(valuesById[3] = "BOT_FEEDBACK_NEGATIVE_INTERESTING")] = 3;
            values[(valuesById[4] = "BOT_FEEDBACK_NEGATIVE_ACCURATE")] = 4;
            values[(valuesById[5] = "BOT_FEEDBACK_NEGATIVE_SAFE")] = 5;
            values[(valuesById[6] = "BOT_FEEDBACK_NEGATIVE_OTHER")] = 6;
            values[(valuesById[7] = "BOT_FEEDBACK_NEGATIVE_REFUSED")] = 7;
            values[(valuesById[8] = "BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING")] = 8;
            values[(valuesById[9] = "BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT")] = 9;
            values[(valuesById[10] = "BOT_FEEDBACK_NEGATIVE_PERSONALIZED")] = 10;
            values[(valuesById[11] = "BOT_FEEDBACK_NEGATIVE_CLARITY")] = 11;
            values[(valuesById[12] = "BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON")] = 12;
            values[(valuesById[13] = "BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY")] = 13;
            values[(valuesById[14] = "BOT_FEEDBACK_NEGATIVE")] = 14;
            return values;
        })();
        BotFeedbackMessage.BotFeedbackKindMultipleNegative = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[1] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_GENERIC")] = 1;
            values[(valuesById[2] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_HELPFUL")] = 2;
            values[(valuesById[4] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_INTERESTING")] = 4;
            values[(valuesById[8] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_ACCURATE")] = 8;
            values[(valuesById[16] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_SAFE")] = 16;
            values[(valuesById[32] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_OTHER")] = 32;
            values[(valuesById[64] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_REFUSED")] = 64;
            values[(valuesById[128] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_VISUALLY_APPEALING")] =
                128;
            values[(valuesById[256] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_RELEVANT_TO_TEXT")] = 256;
            return values;
        })();
        BotFeedbackMessage.BotFeedbackKindMultiplePositive = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[1] = "BOT_FEEDBACK_MULTIPLE_POSITIVE_GENERIC")] = 1;
            return values;
        })();
        BotFeedbackMessage.ReportKind = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "NONE")] = 0;
            values[(valuesById[1] = "GENERIC")] = 1;
            return values;
        })();
        BotFeedbackMessage.SideBySideSurveyMetadata = (function () {
            function SideBySideSurveyMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SideBySideSurveyMetadata.prototype.selectedRequestId = null;
            SideBySideSurveyMetadata.prototype.surveyId = null;
            SideBySideSurveyMetadata.prototype.simonSessionFbid = null;
            SideBySideSurveyMetadata.prototype.responseOtid = null;
            SideBySideSurveyMetadata.prototype.responseTimestampMsString = null;
            SideBySideSurveyMetadata.prototype.isSelectedResponsePrimary = null;
            SideBySideSurveyMetadata.prototype.messageIdToEdit = null;
            SideBySideSurveyMetadata.prototype.analyticsData = null;
            SideBySideSurveyMetadata.prototype.metaAiAnalyticsData = null;
            var $oneOfFields;
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_selectedRequestId", {
                get: $util.oneOfGetter(($oneOfFields = ["selectedRequestId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_surveyId", {
                get: $util.oneOfGetter(($oneOfFields = ["surveyId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_simonSessionFbid", {
                get: $util.oneOfGetter(($oneOfFields = ["simonSessionFbid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_responseOtid", {
                get: $util.oneOfGetter(($oneOfFields = ["responseOtid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(
                SideBySideSurveyMetadata.prototype,
                "_responseTimestampMsString",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["responseTimestampMsString"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(
                SideBySideSurveyMetadata.prototype,
                "_isSelectedResponsePrimary",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["isSelectedResponsePrimary"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_messageIdToEdit", {
                get: $util.oneOfGetter(($oneOfFields = ["messageIdToEdit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_analyticsData", {
                get: $util.oneOfGetter(($oneOfFields = ["analyticsData"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideSurveyMetadata.prototype, "_metaAiAnalyticsData", {
                get: $util.oneOfGetter(($oneOfFields = ["metaAiAnalyticsData"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SideBySideSurveyMetadata.create = function create(properties) {
                return new SideBySideSurveyMetadata(properties);
            };
            SideBySideSurveyMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.selectedRequestId != null &&
                    Object.hasOwnProperty.call(message, "selectedRequestId")
                )
                    writer.uint32(10).string(message.selectedRequestId);
                if (message.surveyId != null && Object.hasOwnProperty.call(message, "surveyId"))
                    writer.uint32(16).uint32(message.surveyId);
                if (
                    message.simonSessionFbid != null &&
                    Object.hasOwnProperty.call(message, "simonSessionFbid")
                )
                    writer.uint32(26).string(message.simonSessionFbid);
                if (
                    message.responseOtid != null &&
                    Object.hasOwnProperty.call(message, "responseOtid")
                )
                    writer.uint32(34).string(message.responseOtid);
                if (
                    message.responseTimestampMsString != null &&
                    Object.hasOwnProperty.call(message, "responseTimestampMsString")
                )
                    writer.uint32(42).string(message.responseTimestampMsString);
                if (
                    message.isSelectedResponsePrimary != null &&
                    Object.hasOwnProperty.call(message, "isSelectedResponsePrimary")
                )
                    writer.uint32(48).bool(message.isSelectedResponsePrimary);
                if (
                    message.messageIdToEdit != null &&
                    Object.hasOwnProperty.call(message, "messageIdToEdit")
                )
                    writer.uint32(58).string(message.messageIdToEdit);
                if (
                    message.analyticsData != null &&
                    Object.hasOwnProperty.call(message, "analyticsData")
                )
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.encode(
                        message.analyticsData,
                        writer.uint32(66).fork()
                    ).ldelim();
                if (
                    message.metaAiAnalyticsData != null &&
                    Object.hasOwnProperty.call(message, "metaAiAnalyticsData")
                )
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.encode(
                        message.metaAiAnalyticsData,
                        writer.uint32(74).fork()
                    ).ldelim();
                return writer;
            };
            SideBySideSurveyMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SideBySideSurveyMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.selectedRequestId = reader.string();
                            break;
                        }
                        case 2: {
                            message.surveyId = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.simonSessionFbid = reader.string();
                            break;
                        }
                        case 4: {
                            message.responseOtid = reader.string();
                            break;
                        }
                        case 5: {
                            message.responseTimestampMsString = reader.string();
                            break;
                        }
                        case 6: {
                            message.isSelectedResponsePrimary = reader.bool();
                            break;
                        }
                        case 7: {
                            message.messageIdToEdit = reader.string();
                            break;
                        }
                        case 8: {
                            message.analyticsData =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.decode(
                                    reader,
                                    reader.uint32()
                                );
                            break;
                        }
                        case 9: {
                            message.metaAiAnalyticsData =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.decode(
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
            SideBySideSurveyMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SideBySideSurveyMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.selectedRequestId != null &&
                    message.hasOwnProperty("selectedRequestId")
                ) {
                    properties._selectedRequestId = 1;
                    if (!$util.isString(message.selectedRequestId))
                        return "selectedRequestId: string expected";
                }
                if (message.surveyId != null && message.hasOwnProperty("surveyId")) {
                    properties._surveyId = 1;
                    if (!$util.isInteger(message.surveyId)) return "surveyId: integer expected";
                }
                if (
                    message.simonSessionFbid != null &&
                    message.hasOwnProperty("simonSessionFbid")
                ) {
                    properties._simonSessionFbid = 1;
                    if (!$util.isString(message.simonSessionFbid))
                        return "simonSessionFbid: string expected";
                }
                if (message.responseOtid != null && message.hasOwnProperty("responseOtid")) {
                    properties._responseOtid = 1;
                    if (!$util.isString(message.responseOtid))
                        return "responseOtid: string expected";
                }
                if (
                    message.responseTimestampMsString != null &&
                    message.hasOwnProperty("responseTimestampMsString")
                ) {
                    properties._responseTimestampMsString = 1;
                    if (!$util.isString(message.responseTimestampMsString))
                        return "responseTimestampMsString: string expected";
                }
                if (
                    message.isSelectedResponsePrimary != null &&
                    message.hasOwnProperty("isSelectedResponsePrimary")
                ) {
                    properties._isSelectedResponsePrimary = 1;
                    if (typeof message.isSelectedResponsePrimary !== "boolean")
                        return "isSelectedResponsePrimary: boolean expected";
                }
                if (message.messageIdToEdit != null && message.hasOwnProperty("messageIdToEdit")) {
                    properties._messageIdToEdit = 1;
                    if (!$util.isString(message.messageIdToEdit))
                        return "messageIdToEdit: string expected";
                }
                if (message.analyticsData != null && message.hasOwnProperty("analyticsData")) {
                    properties._analyticsData = 1;
                    {
                        var error =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.verify(
                                message.analyticsData
                            );
                        if (error) return "analyticsData." + error;
                    }
                }
                if (
                    message.metaAiAnalyticsData != null &&
                    message.hasOwnProperty("metaAiAnalyticsData")
                ) {
                    properties._metaAiAnalyticsData = 1;
                    {
                        var error =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.verify(
                                message.metaAiAnalyticsData
                            );
                        if (error) return "metaAiAnalyticsData." + error;
                    }
                }
                return null;
            };
            SideBySideSurveyMetadata.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata)
                    return object;
                var message = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata();
                if (object.selectedRequestId != null)
                    message.selectedRequestId = String(object.selectedRequestId);
                if (object.surveyId != null) message.surveyId = object.surveyId >>> 0;
                if (object.simonSessionFbid != null)
                    message.simonSessionFbid = String(object.simonSessionFbid);
                if (object.responseOtid != null) message.responseOtid = String(object.responseOtid);
                if (object.responseTimestampMsString != null)
                    message.responseTimestampMsString = String(object.responseTimestampMsString);
                if (object.isSelectedResponsePrimary != null)
                    message.isSelectedResponsePrimary = Boolean(object.isSelectedResponsePrimary);
                if (object.messageIdToEdit != null)
                    message.messageIdToEdit = String(object.messageIdToEdit);
                if (object.analyticsData != null) {
                    if (typeof object.analyticsData !== "object")
                        throw TypeError(
                            ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.analyticsData: object expected"
                        );
                    message.analyticsData =
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.fromObject(
                            object.analyticsData
                        );
                }
                if (object.metaAiAnalyticsData != null) {
                    if (typeof object.metaAiAnalyticsData !== "object")
                        throw TypeError(
                            ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.metaAiAnalyticsData: object expected"
                        );
                    message.metaAiAnalyticsData =
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.fromObject(
                            object.metaAiAnalyticsData
                        );
                }
                return message;
            };
            SideBySideSurveyMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.selectedRequestId != null &&
                    message.hasOwnProperty("selectedRequestId")
                ) {
                    object.selectedRequestId = message.selectedRequestId;
                    if (options.oneofs) object._selectedRequestId = "selectedRequestId";
                }
                if (message.surveyId != null && message.hasOwnProperty("surveyId")) {
                    object.surveyId = message.surveyId;
                    if (options.oneofs) object._surveyId = "surveyId";
                }
                if (
                    message.simonSessionFbid != null &&
                    message.hasOwnProperty("simonSessionFbid")
                ) {
                    object.simonSessionFbid = message.simonSessionFbid;
                    if (options.oneofs) object._simonSessionFbid = "simonSessionFbid";
                }
                if (message.responseOtid != null && message.hasOwnProperty("responseOtid")) {
                    object.responseOtid = message.responseOtid;
                    if (options.oneofs) object._responseOtid = "responseOtid";
                }
                if (
                    message.responseTimestampMsString != null &&
                    message.hasOwnProperty("responseTimestampMsString")
                ) {
                    object.responseTimestampMsString = message.responseTimestampMsString;
                    if (options.oneofs)
                        object._responseTimestampMsString = "responseTimestampMsString";
                }
                if (
                    message.isSelectedResponsePrimary != null &&
                    message.hasOwnProperty("isSelectedResponsePrimary")
                ) {
                    object.isSelectedResponsePrimary = message.isSelectedResponsePrimary;
                    if (options.oneofs)
                        object._isSelectedResponsePrimary = "isSelectedResponsePrimary";
                }
                if (message.messageIdToEdit != null && message.hasOwnProperty("messageIdToEdit")) {
                    object.messageIdToEdit = message.messageIdToEdit;
                    if (options.oneofs) object._messageIdToEdit = "messageIdToEdit";
                }
                if (message.analyticsData != null && message.hasOwnProperty("analyticsData")) {
                    object.analyticsData =
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.toObject(
                            message.analyticsData,
                            options
                        );
                    if (options.oneofs) object._analyticsData = "analyticsData";
                }
                if (
                    message.metaAiAnalyticsData != null &&
                    message.hasOwnProperty("metaAiAnalyticsData")
                ) {
                    object.metaAiAnalyticsData =
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.toObject(
                            message.metaAiAnalyticsData,
                            options
                        );
                    if (options.oneofs) object._metaAiAnalyticsData = "metaAiAnalyticsData";
                }
                return object;
            };
            SideBySideSurveyMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SideBySideSurveyMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata";
            };
            SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData = (function () {
                function SideBySideSurveyAnalyticsData(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                SideBySideSurveyAnalyticsData.prototype.tessaEvent = null;
                SideBySideSurveyAnalyticsData.prototype.tessaSessionFbid = null;
                SideBySideSurveyAnalyticsData.prototype.simonSessionFbid = null;
                var $oneOfFields;
                Object.defineProperty(SideBySideSurveyAnalyticsData.prototype, "_tessaEvent", {
                    get: $util.oneOfGetter(($oneOfFields = ["tessaEvent"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(
                    SideBySideSurveyAnalyticsData.prototype,
                    "_tessaSessionFbid",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["tessaSessionFbid"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SideBySideSurveyAnalyticsData.prototype,
                    "_simonSessionFbid",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["simonSessionFbid"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                SideBySideSurveyAnalyticsData.create = function create(properties) {
                    return new SideBySideSurveyAnalyticsData(properties);
                };
                SideBySideSurveyAnalyticsData.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (
                        message.tessaEvent != null &&
                        Object.hasOwnProperty.call(message, "tessaEvent")
                    )
                        writer.uint32(10).string(message.tessaEvent);
                    if (
                        message.tessaSessionFbid != null &&
                        Object.hasOwnProperty.call(message, "tessaSessionFbid")
                    )
                        writer.uint32(18).string(message.tessaSessionFbid);
                    if (
                        message.simonSessionFbid != null &&
                        Object.hasOwnProperty.call(message, "simonSessionFbid")
                    )
                        writer.uint32(26).string(message.simonSessionFbid);
                    return writer;
                };
                SideBySideSurveyAnalyticsData.encodeDelimited = function encodeDelimited(
                    message,
                    writer
                ) {
                    return this.encode(message, writer).ldelim();
                };
                SideBySideSurveyAnalyticsData.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.tessaEvent = reader.string();
                                break;
                            }
                            case 2: {
                                message.tessaSessionFbid = reader.string();
                                break;
                            }
                            case 3: {
                                message.simonSessionFbid = reader.string();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                SideBySideSurveyAnalyticsData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                SideBySideSurveyAnalyticsData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.tessaEvent != null && message.hasOwnProperty("tessaEvent")) {
                        properties._tessaEvent = 1;
                        if (!$util.isString(message.tessaEvent))
                            return "tessaEvent: string expected";
                    }
                    if (
                        message.tessaSessionFbid != null &&
                        message.hasOwnProperty("tessaSessionFbid")
                    ) {
                        properties._tessaSessionFbid = 1;
                        if (!$util.isString(message.tessaSessionFbid))
                            return "tessaSessionFbid: string expected";
                    }
                    if (
                        message.simonSessionFbid != null &&
                        message.hasOwnProperty("simonSessionFbid")
                    ) {
                        properties._simonSessionFbid = 1;
                        if (!$util.isString(message.simonSessionFbid))
                            return "simonSessionFbid: string expected";
                    }
                    return null;
                };
                SideBySideSurveyAnalyticsData.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                            .SideBySideSurveyAnalyticsData
                    )
                        return object;
                    var message =
                        new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData();
                    if (object.tessaEvent != null) message.tessaEvent = String(object.tessaEvent);
                    if (object.tessaSessionFbid != null)
                        message.tessaSessionFbid = String(object.tessaSessionFbid);
                    if (object.simonSessionFbid != null)
                        message.simonSessionFbid = String(object.simonSessionFbid);
                    return message;
                };
                SideBySideSurveyAnalyticsData.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.tessaEvent != null && message.hasOwnProperty("tessaEvent")) {
                        object.tessaEvent = message.tessaEvent;
                        if (options.oneofs) object._tessaEvent = "tessaEvent";
                    }
                    if (
                        message.tessaSessionFbid != null &&
                        message.hasOwnProperty("tessaSessionFbid")
                    ) {
                        object.tessaSessionFbid = message.tessaSessionFbid;
                        if (options.oneofs) object._tessaSessionFbid = "tessaSessionFbid";
                    }
                    if (
                        message.simonSessionFbid != null &&
                        message.hasOwnProperty("simonSessionFbid")
                    ) {
                        object.simonSessionFbid = message.simonSessionFbid;
                        if (options.oneofs) object._simonSessionFbid = "simonSessionFbid";
                    }
                    return object;
                };
                SideBySideSurveyAnalyticsData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                SideBySideSurveyAnalyticsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData"
                    );
                };
                return SideBySideSurveyAnalyticsData;
            })();
            SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData = (function () {
                function SidebySideSurveyMetaAiAnalyticsData(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                SidebySideSurveyMetaAiAnalyticsData.prototype.surveyId = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.primaryResponseId = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.testArmName = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.timestampMsString = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.ctaImpressionEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.ctaClickEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.cardImpressionEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.responseEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.abandonEvent = null;
                var $oneOfFields;
                Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_surveyId", {
                    get: $util.oneOfGetter(($oneOfFields = ["surveyId"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_primaryResponseId",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["primaryResponseId"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_testArmName",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["testArmName"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_timestampMsString",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["timestampMsString"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_ctaImpressionEvent",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["ctaImpressionEvent"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_ctaClickEvent",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["ctaClickEvent"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_cardImpressionEvent",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["cardImpressionEvent"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_responseEvent",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["responseEvent"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                Object.defineProperty(
                    SidebySideSurveyMetaAiAnalyticsData.prototype,
                    "_abandonEvent",
                    {
                        get: $util.oneOfGetter(($oneOfFields = ["abandonEvent"])),
                        set: $util.oneOfSetter($oneOfFields),
                    }
                );
                SidebySideSurveyMetaAiAnalyticsData.create = function create(properties) {
                    return new SidebySideSurveyMetaAiAnalyticsData(properties);
                };
                SidebySideSurveyMetaAiAnalyticsData.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.surveyId != null && Object.hasOwnProperty.call(message, "surveyId"))
                        writer.uint32(8).uint32(message.surveyId);
                    if (
                        message.primaryResponseId != null &&
                        Object.hasOwnProperty.call(message, "primaryResponseId")
                    )
                        writer.uint32(18).string(message.primaryResponseId);
                    if (
                        message.testArmName != null &&
                        Object.hasOwnProperty.call(message, "testArmName")
                    )
                        writer.uint32(26).string(message.testArmName);
                    if (
                        message.timestampMsString != null &&
                        Object.hasOwnProperty.call(message, "timestampMsString")
                    )
                        writer.uint32(34).string(message.timestampMsString);
                    if (
                        message.ctaImpressionEvent != null &&
                        Object.hasOwnProperty.call(message, "ctaImpressionEvent")
                    )
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.encode(
                            message.ctaImpressionEvent,
                            writer.uint32(42).fork()
                        ).ldelim();
                    if (
                        message.ctaClickEvent != null &&
                        Object.hasOwnProperty.call(message, "ctaClickEvent")
                    )
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.encode(
                            message.ctaClickEvent,
                            writer.uint32(50).fork()
                        ).ldelim();
                    if (
                        message.cardImpressionEvent != null &&
                        Object.hasOwnProperty.call(message, "cardImpressionEvent")
                    )
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.encode(
                            message.cardImpressionEvent,
                            writer.uint32(58).fork()
                        ).ldelim();
                    if (
                        message.responseEvent != null &&
                        Object.hasOwnProperty.call(message, "responseEvent")
                    )
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.encode(
                            message.responseEvent,
                            writer.uint32(66).fork()
                        ).ldelim();
                    if (
                        message.abandonEvent != null &&
                        Object.hasOwnProperty.call(message, "abandonEvent")
                    )
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.encode(
                            message.abandonEvent,
                            writer.uint32(74).fork()
                        ).ldelim();
                    return writer;
                };
                SidebySideSurveyMetaAiAnalyticsData.encodeDelimited = function encodeDelimited(
                    message,
                    writer
                ) {
                    return this.encode(message, writer).ldelim();
                };
                SidebySideSurveyMetaAiAnalyticsData.decode = function decode(
                    reader,
                    length,
                    error
                ) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.surveyId = reader.uint32();
                                break;
                            }
                            case 2: {
                                message.primaryResponseId = reader.string();
                                break;
                            }
                            case 3: {
                                message.testArmName = reader.string();
                                break;
                            }
                            case 4: {
                                message.timestampMsString = reader.string();
                                break;
                            }
                            case 5: {
                                message.ctaImpressionEvent =
                                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.decode(
                                        reader,
                                        reader.uint32()
                                    );
                                break;
                            }
                            case 6: {
                                message.ctaClickEvent =
                                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.decode(
                                        reader,
                                        reader.uint32()
                                    );
                                break;
                            }
                            case 7: {
                                message.cardImpressionEvent =
                                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.decode(
                                        reader,
                                        reader.uint32()
                                    );
                                break;
                            }
                            case 8: {
                                message.responseEvent =
                                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.decode(
                                        reader,
                                        reader.uint32()
                                    );
                                break;
                            }
                            case 9: {
                                message.abandonEvent =
                                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.decode(
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
                SidebySideSurveyMetaAiAnalyticsData.decodeDelimited = function decodeDelimited(
                    reader
                ) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                SidebySideSurveyMetaAiAnalyticsData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.surveyId != null && message.hasOwnProperty("surveyId")) {
                        properties._surveyId = 1;
                        if (!$util.isInteger(message.surveyId)) return "surveyId: integer expected";
                    }
                    if (
                        message.primaryResponseId != null &&
                        message.hasOwnProperty("primaryResponseId")
                    ) {
                        properties._primaryResponseId = 1;
                        if (!$util.isString(message.primaryResponseId))
                            return "primaryResponseId: string expected";
                    }
                    if (message.testArmName != null && message.hasOwnProperty("testArmName")) {
                        properties._testArmName = 1;
                        if (!$util.isString(message.testArmName))
                            return "testArmName: string expected";
                    }
                    if (
                        message.timestampMsString != null &&
                        message.hasOwnProperty("timestampMsString")
                    ) {
                        properties._timestampMsString = 1;
                        if (!$util.isString(message.timestampMsString))
                            return "timestampMsString: string expected";
                    }
                    if (
                        message.ctaImpressionEvent != null &&
                        message.hasOwnProperty("ctaImpressionEvent")
                    ) {
                        properties._ctaImpressionEvent = 1;
                        {
                            var error =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.verify(
                                    message.ctaImpressionEvent
                                );
                            if (error) return "ctaImpressionEvent." + error;
                        }
                    }
                    if (message.ctaClickEvent != null && message.hasOwnProperty("ctaClickEvent")) {
                        properties._ctaClickEvent = 1;
                        {
                            var error =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.verify(
                                    message.ctaClickEvent
                                );
                            if (error) return "ctaClickEvent." + error;
                        }
                    }
                    if (
                        message.cardImpressionEvent != null &&
                        message.hasOwnProperty("cardImpressionEvent")
                    ) {
                        properties._cardImpressionEvent = 1;
                        {
                            var error =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.verify(
                                    message.cardImpressionEvent
                                );
                            if (error) return "cardImpressionEvent." + error;
                        }
                    }
                    if (message.responseEvent != null && message.hasOwnProperty("responseEvent")) {
                        properties._responseEvent = 1;
                        {
                            var error =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.verify(
                                    message.responseEvent
                                );
                            if (error) return "responseEvent." + error;
                        }
                    }
                    if (message.abandonEvent != null && message.hasOwnProperty("abandonEvent")) {
                        properties._abandonEvent = 1;
                        {
                            var error =
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.verify(
                                    message.abandonEvent
                                );
                            if (error) return "abandonEvent." + error;
                        }
                    }
                    return null;
                };
                SidebySideSurveyMetaAiAnalyticsData.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                            .SidebySideSurveyMetaAiAnalyticsData
                    )
                        return object;
                    var message =
                        new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData();
                    if (object.surveyId != null) message.surveyId = object.surveyId >>> 0;
                    if (object.primaryResponseId != null)
                        message.primaryResponseId = String(object.primaryResponseId);
                    if (object.testArmName != null)
                        message.testArmName = String(object.testArmName);
                    if (object.timestampMsString != null)
                        message.timestampMsString = String(object.timestampMsString);
                    if (object.ctaImpressionEvent != null) {
                        if (typeof object.ctaImpressionEvent !== "object")
                            throw TypeError(
                                ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ctaImpressionEvent: object expected"
                            );
                        message.ctaImpressionEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.fromObject(
                                object.ctaImpressionEvent
                            );
                    }
                    if (object.ctaClickEvent != null) {
                        if (typeof object.ctaClickEvent !== "object")
                            throw TypeError(
                                ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ctaClickEvent: object expected"
                            );
                        message.ctaClickEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.fromObject(
                                object.ctaClickEvent
                            );
                    }
                    if (object.cardImpressionEvent != null) {
                        if (typeof object.cardImpressionEvent !== "object")
                            throw TypeError(
                                ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.cardImpressionEvent: object expected"
                            );
                        message.cardImpressionEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.fromObject(
                                object.cardImpressionEvent
                            );
                    }
                    if (object.responseEvent != null) {
                        if (typeof object.responseEvent !== "object")
                            throw TypeError(
                                ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.responseEvent: object expected"
                            );
                        message.responseEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.fromObject(
                                object.responseEvent
                            );
                    }
                    if (object.abandonEvent != null) {
                        if (typeof object.abandonEvent !== "object")
                            throw TypeError(
                                ".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.abandonEvent: object expected"
                            );
                        message.abandonEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.fromObject(
                                object.abandonEvent
                            );
                    }
                    return message;
                };
                SidebySideSurveyMetaAiAnalyticsData.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.surveyId != null && message.hasOwnProperty("surveyId")) {
                        object.surveyId = message.surveyId;
                        if (options.oneofs) object._surveyId = "surveyId";
                    }
                    if (
                        message.primaryResponseId != null &&
                        message.hasOwnProperty("primaryResponseId")
                    ) {
                        object.primaryResponseId = message.primaryResponseId;
                        if (options.oneofs) object._primaryResponseId = "primaryResponseId";
                    }
                    if (message.testArmName != null && message.hasOwnProperty("testArmName")) {
                        object.testArmName = message.testArmName;
                        if (options.oneofs) object._testArmName = "testArmName";
                    }
                    if (
                        message.timestampMsString != null &&
                        message.hasOwnProperty("timestampMsString")
                    ) {
                        object.timestampMsString = message.timestampMsString;
                        if (options.oneofs) object._timestampMsString = "timestampMsString";
                    }
                    if (
                        message.ctaImpressionEvent != null &&
                        message.hasOwnProperty("ctaImpressionEvent")
                    ) {
                        object.ctaImpressionEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.toObject(
                                message.ctaImpressionEvent,
                                options
                            );
                        if (options.oneofs) object._ctaImpressionEvent = "ctaImpressionEvent";
                    }
                    if (message.ctaClickEvent != null && message.hasOwnProperty("ctaClickEvent")) {
                        object.ctaClickEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.toObject(
                                message.ctaClickEvent,
                                options
                            );
                        if (options.oneofs) object._ctaClickEvent = "ctaClickEvent";
                    }
                    if (
                        message.cardImpressionEvent != null &&
                        message.hasOwnProperty("cardImpressionEvent")
                    ) {
                        object.cardImpressionEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.toObject(
                                message.cardImpressionEvent,
                                options
                            );
                        if (options.oneofs) object._cardImpressionEvent = "cardImpressionEvent";
                    }
                    if (message.responseEvent != null && message.hasOwnProperty("responseEvent")) {
                        object.responseEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.toObject(
                                message.responseEvent,
                                options
                            );
                        if (options.oneofs) object._responseEvent = "responseEvent";
                    }
                    if (message.abandonEvent != null && message.hasOwnProperty("abandonEvent")) {
                        object.abandonEvent =
                            $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.toObject(
                                message.abandonEvent,
                                options
                            );
                        if (options.oneofs) object._abandonEvent = "abandonEvent";
                    }
                    return object;
                };
                SidebySideSurveyMetaAiAnalyticsData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                SidebySideSurveyMetaAiAnalyticsData.getTypeUrl = function getTypeUrl(
                    typeUrlPrefix
                ) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData"
                    );
                };
                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData =
                    (function () {
                        function SideBySideSurveyAbandonEventData(properties) {
                            if (properties)
                                for (
                                    var keys = Object.keys(properties), i = 0;
                                    i < keys.length;
                                    ++i
                                )
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
                        SideBySideSurveyAbandonEventData.prototype.abandonDwellTimeMsString = null;
                        var $oneOfFields;
                        Object.defineProperty(
                            SideBySideSurveyAbandonEventData.prototype,
                            "_abandonDwellTimeMsString",
                            {
                                get: $util.oneOfGetter(
                                    ($oneOfFields = ["abandonDwellTimeMsString"])
                                ),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        SideBySideSurveyAbandonEventData.create = function create(properties) {
                            return new SideBySideSurveyAbandonEventData(properties);
                        };
                        SideBySideSurveyAbandonEventData.encode = function encode(message, writer) {
                            if (!writer) writer = $Writer.create();
                            if (
                                message.abandonDwellTimeMsString != null &&
                                Object.hasOwnProperty.call(message, "abandonDwellTimeMsString")
                            )
                                writer.uint32(10).string(message.abandonDwellTimeMsString);
                            return writer;
                        };
                        SideBySideSurveyAbandonEventData.encodeDelimited = function encodeDelimited(
                            message,
                            writer
                        ) {
                            return this.encode(message, writer).ldelim();
                        };
                        SideBySideSurveyAbandonEventData.decode = function decode(
                            reader,
                            length,
                            error
                        ) {
                            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length,
                                message =
                                    new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                if (tag === error) break;
                                switch (tag >>> 3) {
                                    case 1: {
                                        message.abandonDwellTimeMsString = reader.string();
                                        break;
                                    }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                }
                            }
                            return message;
                        };
                        SideBySideSurveyAbandonEventData.decodeDelimited = function decodeDelimited(
                            reader
                        ) {
                            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };
                        SideBySideSurveyAbandonEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (
                                message.abandonDwellTimeMsString != null &&
                                message.hasOwnProperty("abandonDwellTimeMsString")
                            ) {
                                properties._abandonDwellTimeMsString = 1;
                                if (!$util.isString(message.abandonDwellTimeMsString))
                                    return "abandonDwellTimeMsString: string expected";
                            }
                            return null;
                        };
                        SideBySideSurveyAbandonEventData.fromObject = function fromObject(object) {
                            if (
                                object instanceof
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                                    .SidebySideSurveyMetaAiAnalyticsData
                                    .SideBySideSurveyAbandonEventData
                            )
                                return object;
                            var message =
                                new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData();
                            if (object.abandonDwellTimeMsString != null)
                                message.abandonDwellTimeMsString = String(
                                    object.abandonDwellTimeMsString
                                );
                            return message;
                        };
                        SideBySideSurveyAbandonEventData.toObject = function toObject(
                            message,
                            options
                        ) {
                            if (!options) options = {};
                            var object = {};
                            if (
                                message.abandonDwellTimeMsString != null &&
                                message.hasOwnProperty("abandonDwellTimeMsString")
                            ) {
                                object.abandonDwellTimeMsString = message.abandonDwellTimeMsString;
                                if (options.oneofs)
                                    object._abandonDwellTimeMsString = "abandonDwellTimeMsString";
                            }
                            return object;
                        };
                        SideBySideSurveyAbandonEventData.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };
                        SideBySideSurveyAbandonEventData.getTypeUrl = function getTypeUrl(
                            typeUrlPrefix
                        ) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return (
                                typeUrlPrefix +
                                "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData"
                            );
                        };
                        return SideBySideSurveyAbandonEventData;
                    })();
                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData =
                    (function () {
                        function SideBySideSurveyCTAClickEventData(properties) {
                            if (properties)
                                for (
                                    var keys = Object.keys(properties), i = 0;
                                    i < keys.length;
                                    ++i
                                )
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
                        SideBySideSurveyCTAClickEventData.prototype.isSurveyExpired = null;
                        SideBySideSurveyCTAClickEventData.prototype.clickDwellTimeMsString = null;
                        var $oneOfFields;
                        Object.defineProperty(
                            SideBySideSurveyCTAClickEventData.prototype,
                            "_isSurveyExpired",
                            {
                                get: $util.oneOfGetter(($oneOfFields = ["isSurveyExpired"])),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        Object.defineProperty(
                            SideBySideSurveyCTAClickEventData.prototype,
                            "_clickDwellTimeMsString",
                            {
                                get: $util.oneOfGetter(($oneOfFields = ["clickDwellTimeMsString"])),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        SideBySideSurveyCTAClickEventData.create = function create(properties) {
                            return new SideBySideSurveyCTAClickEventData(properties);
                        };
                        SideBySideSurveyCTAClickEventData.encode = function encode(
                            message,
                            writer
                        ) {
                            if (!writer) writer = $Writer.create();
                            if (
                                message.isSurveyExpired != null &&
                                Object.hasOwnProperty.call(message, "isSurveyExpired")
                            )
                                writer.uint32(8).bool(message.isSurveyExpired);
                            if (
                                message.clickDwellTimeMsString != null &&
                                Object.hasOwnProperty.call(message, "clickDwellTimeMsString")
                            )
                                writer.uint32(18).string(message.clickDwellTimeMsString);
                            return writer;
                        };
                        SideBySideSurveyCTAClickEventData.encodeDelimited =
                            function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };
                        SideBySideSurveyCTAClickEventData.decode = function decode(
                            reader,
                            length,
                            error
                        ) {
                            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length,
                                message =
                                    new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                if (tag === error) break;
                                switch (tag >>> 3) {
                                    case 1: {
                                        message.isSurveyExpired = reader.bool();
                                        break;
                                    }
                                    case 2: {
                                        message.clickDwellTimeMsString = reader.string();
                                        break;
                                    }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                }
                            }
                            return message;
                        };
                        SideBySideSurveyCTAClickEventData.decodeDelimited =
                            function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };
                        SideBySideSurveyCTAClickEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (
                                message.isSurveyExpired != null &&
                                message.hasOwnProperty("isSurveyExpired")
                            ) {
                                properties._isSurveyExpired = 1;
                                if (typeof message.isSurveyExpired !== "boolean")
                                    return "isSurveyExpired: boolean expected";
                            }
                            if (
                                message.clickDwellTimeMsString != null &&
                                message.hasOwnProperty("clickDwellTimeMsString")
                            ) {
                                properties._clickDwellTimeMsString = 1;
                                if (!$util.isString(message.clickDwellTimeMsString))
                                    return "clickDwellTimeMsString: string expected";
                            }
                            return null;
                        };
                        SideBySideSurveyCTAClickEventData.fromObject = function fromObject(object) {
                            if (
                                object instanceof
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                                    .SidebySideSurveyMetaAiAnalyticsData
                                    .SideBySideSurveyCTAClickEventData
                            )
                                return object;
                            var message =
                                new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData();
                            if (object.isSurveyExpired != null)
                                message.isSurveyExpired = Boolean(object.isSurveyExpired);
                            if (object.clickDwellTimeMsString != null)
                                message.clickDwellTimeMsString = String(
                                    object.clickDwellTimeMsString
                                );
                            return message;
                        };
                        SideBySideSurveyCTAClickEventData.toObject = function toObject(
                            message,
                            options
                        ) {
                            if (!options) options = {};
                            var object = {};
                            if (
                                message.isSurveyExpired != null &&
                                message.hasOwnProperty("isSurveyExpired")
                            ) {
                                object.isSurveyExpired = message.isSurveyExpired;
                                if (options.oneofs) object._isSurveyExpired = "isSurveyExpired";
                            }
                            if (
                                message.clickDwellTimeMsString != null &&
                                message.hasOwnProperty("clickDwellTimeMsString")
                            ) {
                                object.clickDwellTimeMsString = message.clickDwellTimeMsString;
                                if (options.oneofs)
                                    object._clickDwellTimeMsString = "clickDwellTimeMsString";
                            }
                            return object;
                        };
                        SideBySideSurveyCTAClickEventData.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };
                        SideBySideSurveyCTAClickEventData.getTypeUrl = function getTypeUrl(
                            typeUrlPrefix
                        ) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return (
                                typeUrlPrefix +
                                "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData"
                            );
                        };
                        return SideBySideSurveyCTAClickEventData;
                    })();
                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData =
                    (function () {
                        function SideBySideSurveyCTAImpressionEventData(properties) {
                            if (properties)
                                for (
                                    var keys = Object.keys(properties), i = 0;
                                    i < keys.length;
                                    ++i
                                )
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
                        SideBySideSurveyCTAImpressionEventData.prototype.isSurveyExpired = null;
                        var $oneOfFields;
                        Object.defineProperty(
                            SideBySideSurveyCTAImpressionEventData.prototype,
                            "_isSurveyExpired",
                            {
                                get: $util.oneOfGetter(($oneOfFields = ["isSurveyExpired"])),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        SideBySideSurveyCTAImpressionEventData.create = function create(
                            properties
                        ) {
                            return new SideBySideSurveyCTAImpressionEventData(properties);
                        };
                        SideBySideSurveyCTAImpressionEventData.encode = function encode(
                            message,
                            writer
                        ) {
                            if (!writer) writer = $Writer.create();
                            if (
                                message.isSurveyExpired != null &&
                                Object.hasOwnProperty.call(message, "isSurveyExpired")
                            )
                                writer.uint32(8).bool(message.isSurveyExpired);
                            return writer;
                        };
                        SideBySideSurveyCTAImpressionEventData.encodeDelimited =
                            function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };
                        SideBySideSurveyCTAImpressionEventData.decode = function decode(
                            reader,
                            length,
                            error
                        ) {
                            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length,
                                message =
                                    new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                if (tag === error) break;
                                switch (tag >>> 3) {
                                    case 1: {
                                        message.isSurveyExpired = reader.bool();
                                        break;
                                    }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                }
                            }
                            return message;
                        };
                        SideBySideSurveyCTAImpressionEventData.decodeDelimited =
                            function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };
                        SideBySideSurveyCTAImpressionEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (
                                message.isSurveyExpired != null &&
                                message.hasOwnProperty("isSurveyExpired")
                            ) {
                                properties._isSurveyExpired = 1;
                                if (typeof message.isSurveyExpired !== "boolean")
                                    return "isSurveyExpired: boolean expected";
                            }
                            return null;
                        };
                        SideBySideSurveyCTAImpressionEventData.fromObject = function fromObject(
                            object
                        ) {
                            if (
                                object instanceof
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                                    .SidebySideSurveyMetaAiAnalyticsData
                                    .SideBySideSurveyCTAImpressionEventData
                            )
                                return object;
                            var message =
                                new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData();
                            if (object.isSurveyExpired != null)
                                message.isSurveyExpired = Boolean(object.isSurveyExpired);
                            return message;
                        };
                        SideBySideSurveyCTAImpressionEventData.toObject = function toObject(
                            message,
                            options
                        ) {
                            if (!options) options = {};
                            var object = {};
                            if (
                                message.isSurveyExpired != null &&
                                message.hasOwnProperty("isSurveyExpired")
                            ) {
                                object.isSurveyExpired = message.isSurveyExpired;
                                if (options.oneofs) object._isSurveyExpired = "isSurveyExpired";
                            }
                            return object;
                        };
                        SideBySideSurveyCTAImpressionEventData.prototype.toJSON =
                            function toJSON() {
                                return this.constructor.toObject(
                                    this,
                                    $protobuf.util.toJSONOptions
                                );
                            };
                        SideBySideSurveyCTAImpressionEventData.getTypeUrl = function getTypeUrl(
                            typeUrlPrefix
                        ) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return (
                                typeUrlPrefix +
                                "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData"
                            );
                        };
                        return SideBySideSurveyCTAImpressionEventData;
                    })();
                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData =
                    (function () {
                        function SideBySideSurveyCardImpressionEventData(properties) {
                            if (properties)
                                for (
                                    var keys = Object.keys(properties), i = 0;
                                    i < keys.length;
                                    ++i
                                )
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
                        SideBySideSurveyCardImpressionEventData.create = function create(
                            properties
                        ) {
                            return new SideBySideSurveyCardImpressionEventData(properties);
                        };
                        SideBySideSurveyCardImpressionEventData.encode = function encode(
                            message,
                            writer
                        ) {
                            if (!writer) writer = $Writer.create();
                            return writer;
                        };
                        SideBySideSurveyCardImpressionEventData.encodeDelimited =
                            function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };
                        SideBySideSurveyCardImpressionEventData.decode = function decode(
                            reader,
                            length,
                            error
                        ) {
                            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length,
                                message =
                                    new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                if (tag === error) break;
                                switch (tag >>> 3) {
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                }
                            }
                            return message;
                        };
                        SideBySideSurveyCardImpressionEventData.decodeDelimited =
                            function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };
                        SideBySideSurveyCardImpressionEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            return null;
                        };
                        SideBySideSurveyCardImpressionEventData.fromObject = function fromObject(
                            object
                        ) {
                            if (
                                object instanceof
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                                    .SidebySideSurveyMetaAiAnalyticsData
                                    .SideBySideSurveyCardImpressionEventData
                            )
                                return object;
                            return new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData();
                        };
                        SideBySideSurveyCardImpressionEventData.toObject = function toObject() {
                            return {};
                        };
                        SideBySideSurveyCardImpressionEventData.prototype.toJSON =
                            function toJSON() {
                                return this.constructor.toObject(
                                    this,
                                    $protobuf.util.toJSONOptions
                                );
                            };
                        SideBySideSurveyCardImpressionEventData.getTypeUrl = function getTypeUrl(
                            typeUrlPrefix
                        ) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return (
                                typeUrlPrefix +
                                "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData"
                            );
                        };
                        return SideBySideSurveyCardImpressionEventData;
                    })();
                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData =
                    (function () {
                        function SideBySideSurveyResponseEventData(properties) {
                            if (properties)
                                for (
                                    var keys = Object.keys(properties), i = 0;
                                    i < keys.length;
                                    ++i
                                )
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
                        SideBySideSurveyResponseEventData.prototype.responseDwellTimeMsString =
                            null;
                        SideBySideSurveyResponseEventData.prototype.selectedResponseId = null;
                        var $oneOfFields;
                        Object.defineProperty(
                            SideBySideSurveyResponseEventData.prototype,
                            "_responseDwellTimeMsString",
                            {
                                get: $util.oneOfGetter(
                                    ($oneOfFields = ["responseDwellTimeMsString"])
                                ),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        Object.defineProperty(
                            SideBySideSurveyResponseEventData.prototype,
                            "_selectedResponseId",
                            {
                                get: $util.oneOfGetter(($oneOfFields = ["selectedResponseId"])),
                                set: $util.oneOfSetter($oneOfFields),
                            }
                        );
                        SideBySideSurveyResponseEventData.create = function create(properties) {
                            return new SideBySideSurveyResponseEventData(properties);
                        };
                        SideBySideSurveyResponseEventData.encode = function encode(
                            message,
                            writer
                        ) {
                            if (!writer) writer = $Writer.create();
                            if (
                                message.responseDwellTimeMsString != null &&
                                Object.hasOwnProperty.call(message, "responseDwellTimeMsString")
                            )
                                writer.uint32(10).string(message.responseDwellTimeMsString);
                            if (
                                message.selectedResponseId != null &&
                                Object.hasOwnProperty.call(message, "selectedResponseId")
                            )
                                writer.uint32(18).string(message.selectedResponseId);
                            return writer;
                        };
                        SideBySideSurveyResponseEventData.encodeDelimited =
                            function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };
                        SideBySideSurveyResponseEventData.decode = function decode(
                            reader,
                            length,
                            error
                        ) {
                            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length,
                                message =
                                    new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                if (tag === error) break;
                                switch (tag >>> 3) {
                                    case 1: {
                                        message.responseDwellTimeMsString = reader.string();
                                        break;
                                    }
                                    case 2: {
                                        message.selectedResponseId = reader.string();
                                        break;
                                    }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                }
                            }
                            return message;
                        };
                        SideBySideSurveyResponseEventData.decodeDelimited =
                            function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };
                        SideBySideSurveyResponseEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (
                                message.responseDwellTimeMsString != null &&
                                message.hasOwnProperty("responseDwellTimeMsString")
                            ) {
                                properties._responseDwellTimeMsString = 1;
                                if (!$util.isString(message.responseDwellTimeMsString))
                                    return "responseDwellTimeMsString: string expected";
                            }
                            if (
                                message.selectedResponseId != null &&
                                message.hasOwnProperty("selectedResponseId")
                            ) {
                                properties._selectedResponseId = 1;
                                if (!$util.isString(message.selectedResponseId))
                                    return "selectedResponseId: string expected";
                            }
                            return null;
                        };
                        SideBySideSurveyResponseEventData.fromObject = function fromObject(object) {
                            if (
                                object instanceof
                                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata
                                    .SidebySideSurveyMetaAiAnalyticsData
                                    .SideBySideSurveyResponseEventData
                            )
                                return object;
                            var message =
                                new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData();
                            if (object.responseDwellTimeMsString != null)
                                message.responseDwellTimeMsString = String(
                                    object.responseDwellTimeMsString
                                );
                            if (object.selectedResponseId != null)
                                message.selectedResponseId = String(object.selectedResponseId);
                            return message;
                        };
                        SideBySideSurveyResponseEventData.toObject = function toObject(
                            message,
                            options
                        ) {
                            if (!options) options = {};
                            var object = {};
                            if (
                                message.responseDwellTimeMsString != null &&
                                message.hasOwnProperty("responseDwellTimeMsString")
                            ) {
                                object.responseDwellTimeMsString =
                                    message.responseDwellTimeMsString;
                                if (options.oneofs)
                                    object._responseDwellTimeMsString = "responseDwellTimeMsString";
                            }
                            if (
                                message.selectedResponseId != null &&
                                message.hasOwnProperty("selectedResponseId")
                            ) {
                                object.selectedResponseId = message.selectedResponseId;
                                if (options.oneofs)
                                    object._selectedResponseId = "selectedResponseId";
                            }
                            return object;
                        };
                        SideBySideSurveyResponseEventData.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };
                        SideBySideSurveyResponseEventData.getTypeUrl = function getTypeUrl(
                            typeUrlPrefix
                        ) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return (
                                typeUrlPrefix +
                                "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData"
                            );
                        };
                        return SideBySideSurveyResponseEventData;
                    })();
                return SidebySideSurveyMetaAiAnalyticsData;
            })();
            return SideBySideSurveyMetadata;
        })();
        return BotFeedbackMessage;
    })();
    AICommon.BotGroupParticipantMetadata = (function () {
        function BotGroupParticipantMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotGroupParticipantMetadata.prototype.botFbid = null;
        var $oneOfFields;
        Object.defineProperty(BotGroupParticipantMetadata.prototype, "_botFbid", {
            get: $util.oneOfGetter(($oneOfFields = ["botFbid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotGroupParticipantMetadata.create = function create(properties) {
            return new BotGroupParticipantMetadata(properties);
        };
        BotGroupParticipantMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.botFbid != null && Object.hasOwnProperty.call(message, "botFbid"))
                writer.uint32(10).string(message.botFbid);
            return writer;
        };
        BotGroupParticipantMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotGroupParticipantMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotGroupParticipantMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.botFbid = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotGroupParticipantMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotGroupParticipantMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.botFbid != null && message.hasOwnProperty("botFbid")) {
                properties._botFbid = 1;
                if (!$util.isString(message.botFbid)) return "botFbid: string expected";
            }
            return null;
        };
        BotGroupParticipantMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotGroupParticipantMetadata) return object;
            var message = new $root.AICommon.BotGroupParticipantMetadata();
            if (object.botFbid != null) message.botFbid = String(object.botFbid);
            return message;
        };
        BotGroupParticipantMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.botFbid != null && message.hasOwnProperty("botFbid")) {
                object.botFbid = message.botFbid;
                if (options.oneofs) object._botFbid = "botFbid";
            }
            return object;
        };
        BotGroupParticipantMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotGroupParticipantMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotGroupParticipantMetadata";
        };
        return BotGroupParticipantMetadata;
    })();
    AICommon.BotGroupMetadata = (function () {
        function BotGroupMetadata(properties) {
            this.participantsMetadata = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotGroupMetadata.prototype.participantsMetadata = $util.emptyArray;
        BotGroupMetadata.create = function create(properties) {
            return new BotGroupMetadata(properties);
        };
        BotGroupMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.participantsMetadata != null && message.participantsMetadata.length)
                for (var i = 0; i < message.participantsMetadata.length; ++i)
                    $root.AICommon.BotGroupParticipantMetadata.encode(
                        message.participantsMetadata[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotGroupMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotGroupMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotGroupMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.participantsMetadata && message.participantsMetadata.length))
                            message.participantsMetadata = [];
                        message.participantsMetadata.push(
                            $root.AICommon.BotGroupParticipantMetadata.decode(
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
        BotGroupMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotGroupMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (
                message.participantsMetadata != null &&
                message.hasOwnProperty("participantsMetadata")
            ) {
                if (!Array.isArray(message.participantsMetadata))
                    return "participantsMetadata: array expected";
                for (var i = 0; i < message.participantsMetadata.length; ++i) {
                    var error = $root.AICommon.BotGroupParticipantMetadata.verify(
                        message.participantsMetadata[i]
                    );
                    if (error) return "participantsMetadata." + error;
                }
            }
            return null;
        };
        BotGroupMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotGroupMetadata) return object;
            var message = new $root.AICommon.BotGroupMetadata();
            if (object.participantsMetadata) {
                if (!Array.isArray(object.participantsMetadata))
                    throw TypeError(
                        ".AICommon.BotGroupMetadata.participantsMetadata: array expected"
                    );
                message.participantsMetadata = [];
                for (var i = 0; i < object.participantsMetadata.length; ++i) {
                    if (typeof object.participantsMetadata[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotGroupMetadata.participantsMetadata: object expected"
                        );
                    message.participantsMetadata[i] =
                        $root.AICommon.BotGroupParticipantMetadata.fromObject(
                            object.participantsMetadata[i]
                        );
                }
            }
            return message;
        };
        BotGroupMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.participantsMetadata = [];
            if (message.participantsMetadata && message.participantsMetadata.length) {
                object.participantsMetadata = [];
                for (var j = 0; j < message.participantsMetadata.length; ++j)
                    object.participantsMetadata[j] =
                        $root.AICommon.BotGroupParticipantMetadata.toObject(
                            message.participantsMetadata[j],
                            options
                        );
            }
            return object;
        };
        BotGroupMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotGroupMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotGroupMetadata";
        };
        return BotGroupMetadata;
    })();
    AICommon.BotMetadata = (function () {
        function BotMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMetadata.prototype.avatarMetadata = null;
        BotMetadata.prototype.personaId = null;
        BotMetadata.prototype.pluginMetadata = null;
        BotMetadata.prototype.suggestedPromptMetadata = null;
        BotMetadata.prototype.invokerJid = null;
        BotMetadata.prototype.sessionMetadata = null;
        BotMetadata.prototype.memuMetadata = null;
        BotMetadata.prototype.timezone = null;
        BotMetadata.prototype.reminderMetadata = null;
        BotMetadata.prototype.modelMetadata = null;
        BotMetadata.prototype.messageDisclaimerText = null;
        BotMetadata.prototype.progressIndicatorMetadata = null;
        BotMetadata.prototype.capabilityMetadata = null;
        BotMetadata.prototype.imagineMetadata = null;
        BotMetadata.prototype.memoryMetadata = null;
        BotMetadata.prototype.renderingMetadata = null;
        BotMetadata.prototype.botMetricsMetadata = null;
        BotMetadata.prototype.botLinkedAccountsMetadata = null;
        BotMetadata.prototype.richResponseSourcesMetadata = null;
        BotMetadata.prototype.aiConversationContext = null;
        BotMetadata.prototype.botPromotionMessageMetadata = null;
        BotMetadata.prototype.botModeSelectionMetadata = null;
        BotMetadata.prototype.botQuotaMetadata = null;
        BotMetadata.prototype.botAgeCollectionMetadata = null;
        BotMetadata.prototype.conversationStarterPromptId = null;
        BotMetadata.prototype.botResponseId = null;
        BotMetadata.prototype.verificationMetadata = null;
        BotMetadata.prototype.unifiedResponseMutation = null;
        BotMetadata.prototype.botMessageOriginMetadata = null;
        BotMetadata.prototype.inThreadSurveyMetadata = null;
        BotMetadata.prototype.botThreadInfo = null;
        BotMetadata.prototype.regenerateMetadata = null;
        BotMetadata.prototype.sessionTransparencyMetadata = null;
        BotMetadata.prototype.botDocumentMessageMetadata = null;
        BotMetadata.prototype.botGroupMetadata = null;
        BotMetadata.prototype.internalMetadata = null;
        var $oneOfFields;
        Object.defineProperty(BotMetadata.prototype, "_avatarMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["avatarMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_personaId", {
            get: $util.oneOfGetter(($oneOfFields = ["personaId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_pluginMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["pluginMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_suggestedPromptMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["suggestedPromptMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_invokerJid", {
            get: $util.oneOfGetter(($oneOfFields = ["invokerJid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_sessionMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_memuMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["memuMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_timezone", {
            get: $util.oneOfGetter(($oneOfFields = ["timezone"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_reminderMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["reminderMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_modelMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["modelMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_messageDisclaimerText", {
            get: $util.oneOfGetter(($oneOfFields = ["messageDisclaimerText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_progressIndicatorMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["progressIndicatorMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_capabilityMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["capabilityMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_imagineMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["imagineMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_memoryMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["memoryMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_renderingMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["renderingMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botMetricsMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botMetricsMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botLinkedAccountsMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botLinkedAccountsMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_richResponseSourcesMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["richResponseSourcesMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_aiConversationContext", {
            get: $util.oneOfGetter(($oneOfFields = ["aiConversationContext"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botPromotionMessageMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botPromotionMessageMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botModeSelectionMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botModeSelectionMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botQuotaMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botQuotaMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botAgeCollectionMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botAgeCollectionMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_conversationStarterPromptId", {
            get: $util.oneOfGetter(($oneOfFields = ["conversationStarterPromptId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botResponseId", {
            get: $util.oneOfGetter(($oneOfFields = ["botResponseId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_verificationMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["verificationMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_unifiedResponseMutation", {
            get: $util.oneOfGetter(($oneOfFields = ["unifiedResponseMutation"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botMessageOriginMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botMessageOriginMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_inThreadSurveyMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["inThreadSurveyMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botThreadInfo", {
            get: $util.oneOfGetter(($oneOfFields = ["botThreadInfo"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_regenerateMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["regenerateMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_sessionTransparencyMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionTransparencyMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botDocumentMessageMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botDocumentMessageMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_botGroupMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["botGroupMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetadata.prototype, "_internalMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["internalMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMetadata.create = function create(properties) {
            return new BotMetadata(properties);
        };
        BotMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.avatarMetadata != null &&
                Object.hasOwnProperty.call(message, "avatarMetadata")
            )
                $root.AICommon.BotAvatarMetadata.encode(
                    message.avatarMetadata,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.personaId != null && Object.hasOwnProperty.call(message, "personaId"))
                writer.uint32(18).string(message.personaId);
            if (
                message.pluginMetadata != null &&
                Object.hasOwnProperty.call(message, "pluginMetadata")
            )
                $root.AICommon.BotPluginMetadata.encode(
                    message.pluginMetadata,
                    writer.uint32(26).fork()
                ).ldelim();
            if (
                message.suggestedPromptMetadata != null &&
                Object.hasOwnProperty.call(message, "suggestedPromptMetadata")
            )
                $root.AICommon.BotSuggestedPromptMetadata.encode(
                    message.suggestedPromptMetadata,
                    writer.uint32(34).fork()
                ).ldelim();
            if (message.invokerJid != null && Object.hasOwnProperty.call(message, "invokerJid"))
                writer.uint32(42).string(message.invokerJid);
            if (
                message.sessionMetadata != null &&
                Object.hasOwnProperty.call(message, "sessionMetadata")
            )
                $root.AICommon.BotSessionMetadata.encode(
                    message.sessionMetadata,
                    writer.uint32(50).fork()
                ).ldelim();
            if (message.memuMetadata != null && Object.hasOwnProperty.call(message, "memuMetadata"))
                $root.AICommon.BotMemuMetadata.encode(
                    message.memuMetadata,
                    writer.uint32(58).fork()
                ).ldelim();
            if (message.timezone != null && Object.hasOwnProperty.call(message, "timezone"))
                writer.uint32(66).string(message.timezone);
            if (
                message.reminderMetadata != null &&
                Object.hasOwnProperty.call(message, "reminderMetadata")
            )
                $root.AICommon.BotReminderMetadata.encode(
                    message.reminderMetadata,
                    writer.uint32(74).fork()
                ).ldelim();
            if (
                message.modelMetadata != null &&
                Object.hasOwnProperty.call(message, "modelMetadata")
            )
                $root.AICommon.BotModelMetadata.encode(
                    message.modelMetadata,
                    writer.uint32(82).fork()
                ).ldelim();
            if (
                message.messageDisclaimerText != null &&
                Object.hasOwnProperty.call(message, "messageDisclaimerText")
            )
                writer.uint32(90).string(message.messageDisclaimerText);
            if (
                message.progressIndicatorMetadata != null &&
                Object.hasOwnProperty.call(message, "progressIndicatorMetadata")
            )
                $root.AICommon.BotProgressIndicatorMetadata.encode(
                    message.progressIndicatorMetadata,
                    writer.uint32(98).fork()
                ).ldelim();
            if (
                message.capabilityMetadata != null &&
                Object.hasOwnProperty.call(message, "capabilityMetadata")
            )
                $root.AICommon.BotCapabilityMetadata.encode(
                    message.capabilityMetadata,
                    writer.uint32(106).fork()
                ).ldelim();
            if (
                message.imagineMetadata != null &&
                Object.hasOwnProperty.call(message, "imagineMetadata")
            )
                $root.AICommon.BotImagineMetadata.encode(
                    message.imagineMetadata,
                    writer.uint32(114).fork()
                ).ldelim();
            if (
                message.memoryMetadata != null &&
                Object.hasOwnProperty.call(message, "memoryMetadata")
            )
                $root.AICommon.BotMemoryMetadata.encode(
                    message.memoryMetadata,
                    writer.uint32(122).fork()
                ).ldelim();
            if (
                message.renderingMetadata != null &&
                Object.hasOwnProperty.call(message, "renderingMetadata")
            )
                $root.AICommon.BotRenderingMetadata.encode(
                    message.renderingMetadata,
                    writer.uint32(130).fork()
                ).ldelim();
            if (
                message.botMetricsMetadata != null &&
                Object.hasOwnProperty.call(message, "botMetricsMetadata")
            )
                $root.AICommon.BotMetricsMetadata.encode(
                    message.botMetricsMetadata,
                    writer.uint32(138).fork()
                ).ldelim();
            if (
                message.botLinkedAccountsMetadata != null &&
                Object.hasOwnProperty.call(message, "botLinkedAccountsMetadata")
            )
                $root.AICommon.BotLinkedAccountsMetadata.encode(
                    message.botLinkedAccountsMetadata,
                    writer.uint32(146).fork()
                ).ldelim();
            if (
                message.richResponseSourcesMetadata != null &&
                Object.hasOwnProperty.call(message, "richResponseSourcesMetadata")
            )
                $root.AICommon.BotSourcesMetadata.encode(
                    message.richResponseSourcesMetadata,
                    writer.uint32(154).fork()
                ).ldelim();
            if (
                message.aiConversationContext != null &&
                Object.hasOwnProperty.call(message, "aiConversationContext")
            )
                writer.uint32(162).bytes(message.aiConversationContext);
            if (
                message.botPromotionMessageMetadata != null &&
                Object.hasOwnProperty.call(message, "botPromotionMessageMetadata")
            )
                $root.AICommon.BotPromotionMessageMetadata.encode(
                    message.botPromotionMessageMetadata,
                    writer.uint32(170).fork()
                ).ldelim();
            if (
                message.botModeSelectionMetadata != null &&
                Object.hasOwnProperty.call(message, "botModeSelectionMetadata")
            )
                $root.AICommon.BotModeSelectionMetadata.encode(
                    message.botModeSelectionMetadata,
                    writer.uint32(178).fork()
                ).ldelim();
            if (
                message.botQuotaMetadata != null &&
                Object.hasOwnProperty.call(message, "botQuotaMetadata")
            )
                $root.AICommon.BotQuotaMetadata.encode(
                    message.botQuotaMetadata,
                    writer.uint32(186).fork()
                ).ldelim();
            if (
                message.botAgeCollectionMetadata != null &&
                Object.hasOwnProperty.call(message, "botAgeCollectionMetadata")
            )
                $root.AICommon.BotAgeCollectionMetadata.encode(
                    message.botAgeCollectionMetadata,
                    writer.uint32(194).fork()
                ).ldelim();
            if (
                message.conversationStarterPromptId != null &&
                Object.hasOwnProperty.call(message, "conversationStarterPromptId")
            )
                writer.uint32(202).string(message.conversationStarterPromptId);
            if (
                message.botResponseId != null &&
                Object.hasOwnProperty.call(message, "botResponseId")
            )
                writer.uint32(210).string(message.botResponseId);
            if (
                message.verificationMetadata != null &&
                Object.hasOwnProperty.call(message, "verificationMetadata")
            )
                $root.AICommon.BotSignatureVerificationMetadata.encode(
                    message.verificationMetadata,
                    writer.uint32(218).fork()
                ).ldelim();
            if (
                message.unifiedResponseMutation != null &&
                Object.hasOwnProperty.call(message, "unifiedResponseMutation")
            )
                $root.AICommon.BotUnifiedResponseMutation.encode(
                    message.unifiedResponseMutation,
                    writer.uint32(226).fork()
                ).ldelim();
            if (
                message.botMessageOriginMetadata != null &&
                Object.hasOwnProperty.call(message, "botMessageOriginMetadata")
            )
                $root.AICommon.BotMessageOriginMetadata.encode(
                    message.botMessageOriginMetadata,
                    writer.uint32(234).fork()
                ).ldelim();
            if (
                message.inThreadSurveyMetadata != null &&
                Object.hasOwnProperty.call(message, "inThreadSurveyMetadata")
            )
                $root.AICommon.InThreadSurveyMetadata.encode(
                    message.inThreadSurveyMetadata,
                    writer.uint32(242).fork()
                ).ldelim();
            if (
                message.botThreadInfo != null &&
                Object.hasOwnProperty.call(message, "botThreadInfo")
            )
                $root.AICommon.AIThreadInfo.encode(
                    message.botThreadInfo,
                    writer.uint32(250).fork()
                ).ldelim();
            if (
                message.regenerateMetadata != null &&
                Object.hasOwnProperty.call(message, "regenerateMetadata")
            )
                $root.AICommon.AIRegenerateMetadata.encode(
                    message.regenerateMetadata,
                    writer.uint32(258).fork()
                ).ldelim();
            if (
                message.sessionTransparencyMetadata != null &&
                Object.hasOwnProperty.call(message, "sessionTransparencyMetadata")
            )
                $root.AICommon.SessionTransparencyMetadata.encode(
                    message.sessionTransparencyMetadata,
                    writer.uint32(266).fork()
                ).ldelim();
            if (
                message.botDocumentMessageMetadata != null &&
                Object.hasOwnProperty.call(message, "botDocumentMessageMetadata")
            )
                $root.AICommon.BotDocumentMessageMetadata.encode(
                    message.botDocumentMessageMetadata,
                    writer.uint32(274).fork()
                ).ldelim();
            if (
                message.botGroupMetadata != null &&
                Object.hasOwnProperty.call(message, "botGroupMetadata")
            )
                $root.AICommon.BotGroupMetadata.encode(
                    message.botGroupMetadata,
                    writer.uint32(282).fork()
                ).ldelim();
            if (
                message.internalMetadata != null &&
                Object.hasOwnProperty.call(message, "internalMetadata")
            )
                writer.uint32(7994).bytes(message.internalMetadata);
            return writer;
        };
        BotMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.avatarMetadata = $root.AICommon.BotAvatarMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.personaId = reader.string();
                        break;
                    }
                    case 3: {
                        message.pluginMetadata = $root.AICommon.BotPluginMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 4: {
                        message.suggestedPromptMetadata =
                            $root.AICommon.BotSuggestedPromptMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 5: {
                        message.invokerJid = reader.string();
                        break;
                    }
                    case 6: {
                        message.sessionMetadata = $root.AICommon.BotSessionMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 7: {
                        message.memuMetadata = $root.AICommon.BotMemuMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 8: {
                        message.timezone = reader.string();
                        break;
                    }
                    case 9: {
                        message.reminderMetadata = $root.AICommon.BotReminderMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 10: {
                        message.modelMetadata = $root.AICommon.BotModelMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 11: {
                        message.messageDisclaimerText = reader.string();
                        break;
                    }
                    case 12: {
                        message.progressIndicatorMetadata =
                            $root.AICommon.BotProgressIndicatorMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 13: {
                        message.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 14: {
                        message.imagineMetadata = $root.AICommon.BotImagineMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 15: {
                        message.memoryMetadata = $root.AICommon.BotMemoryMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 16: {
                        message.renderingMetadata = $root.AICommon.BotRenderingMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 17: {
                        message.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 18: {
                        message.botLinkedAccountsMetadata =
                            $root.AICommon.BotLinkedAccountsMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 19: {
                        message.richResponseSourcesMetadata =
                            $root.AICommon.BotSourcesMetadata.decode(reader, reader.uint32());
                        break;
                    }
                    case 20: {
                        message.aiConversationContext = reader.bytes();
                        break;
                    }
                    case 21: {
                        message.botPromotionMessageMetadata =
                            $root.AICommon.BotPromotionMessageMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 22: {
                        message.botModeSelectionMetadata =
                            $root.AICommon.BotModeSelectionMetadata.decode(reader, reader.uint32());
                        break;
                    }
                    case 23: {
                        message.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 24: {
                        message.botAgeCollectionMetadata =
                            $root.AICommon.BotAgeCollectionMetadata.decode(reader, reader.uint32());
                        break;
                    }
                    case 25: {
                        message.conversationStarterPromptId = reader.string();
                        break;
                    }
                    case 26: {
                        message.botResponseId = reader.string();
                        break;
                    }
                    case 27: {
                        message.verificationMetadata =
                            $root.AICommon.BotSignatureVerificationMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 28: {
                        message.unifiedResponseMutation =
                            $root.AICommon.BotUnifiedResponseMutation.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 29: {
                        message.botMessageOriginMetadata =
                            $root.AICommon.BotMessageOriginMetadata.decode(reader, reader.uint32());
                        break;
                    }
                    case 30: {
                        message.inThreadSurveyMetadata =
                            $root.AICommon.InThreadSurveyMetadata.decode(reader, reader.uint32());
                        break;
                    }
                    case 31: {
                        message.botThreadInfo = $root.AICommon.AIThreadInfo.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 32: {
                        message.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 33: {
                        message.sessionTransparencyMetadata =
                            $root.AICommon.SessionTransparencyMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 34: {
                        message.botDocumentMessageMetadata =
                            $root.AICommon.BotDocumentMessageMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 35: {
                        message.botGroupMetadata = $root.AICommon.BotGroupMetadata.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 999: {
                        message.internalMetadata = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.avatarMetadata != null && message.hasOwnProperty("avatarMetadata")) {
                properties._avatarMetadata = 1;
                {
                    var error = $root.AICommon.BotAvatarMetadata.verify(message.avatarMetadata);
                    if (error) return "avatarMetadata." + error;
                }
            }
            if (message.personaId != null && message.hasOwnProperty("personaId")) {
                properties._personaId = 1;
                if (!$util.isString(message.personaId)) return "personaId: string expected";
            }
            if (message.pluginMetadata != null && message.hasOwnProperty("pluginMetadata")) {
                properties._pluginMetadata = 1;
                {
                    var error = $root.AICommon.BotPluginMetadata.verify(message.pluginMetadata);
                    if (error) return "pluginMetadata." + error;
                }
            }
            if (
                message.suggestedPromptMetadata != null &&
                message.hasOwnProperty("suggestedPromptMetadata")
            ) {
                properties._suggestedPromptMetadata = 1;
                {
                    var error = $root.AICommon.BotSuggestedPromptMetadata.verify(
                        message.suggestedPromptMetadata
                    );
                    if (error) return "suggestedPromptMetadata." + error;
                }
            }
            if (message.invokerJid != null && message.hasOwnProperty("invokerJid")) {
                properties._invokerJid = 1;
                if (!$util.isString(message.invokerJid)) return "invokerJid: string expected";
            }
            if (message.sessionMetadata != null && message.hasOwnProperty("sessionMetadata")) {
                properties._sessionMetadata = 1;
                {
                    var error = $root.AICommon.BotSessionMetadata.verify(message.sessionMetadata);
                    if (error) return "sessionMetadata." + error;
                }
            }
            if (message.memuMetadata != null && message.hasOwnProperty("memuMetadata")) {
                properties._memuMetadata = 1;
                {
                    var error = $root.AICommon.BotMemuMetadata.verify(message.memuMetadata);
                    if (error) return "memuMetadata." + error;
                }
            }
            if (message.timezone != null && message.hasOwnProperty("timezone")) {
                properties._timezone = 1;
                if (!$util.isString(message.timezone)) return "timezone: string expected";
            }
            if (message.reminderMetadata != null && message.hasOwnProperty("reminderMetadata")) {
                properties._reminderMetadata = 1;
                {
                    var error = $root.AICommon.BotReminderMetadata.verify(message.reminderMetadata);
                    if (error) return "reminderMetadata." + error;
                }
            }
            if (message.modelMetadata != null && message.hasOwnProperty("modelMetadata")) {
                properties._modelMetadata = 1;
                {
                    var error = $root.AICommon.BotModelMetadata.verify(message.modelMetadata);
                    if (error) return "modelMetadata." + error;
                }
            }
            if (
                message.messageDisclaimerText != null &&
                message.hasOwnProperty("messageDisclaimerText")
            ) {
                properties._messageDisclaimerText = 1;
                if (!$util.isString(message.messageDisclaimerText))
                    return "messageDisclaimerText: string expected";
            }
            if (
                message.progressIndicatorMetadata != null &&
                message.hasOwnProperty("progressIndicatorMetadata")
            ) {
                properties._progressIndicatorMetadata = 1;
                {
                    var error = $root.AICommon.BotProgressIndicatorMetadata.verify(
                        message.progressIndicatorMetadata
                    );
                    if (error) return "progressIndicatorMetadata." + error;
                }
            }
            if (
                message.capabilityMetadata != null &&
                message.hasOwnProperty("capabilityMetadata")
            ) {
                properties._capabilityMetadata = 1;
                {
                    var error = $root.AICommon.BotCapabilityMetadata.verify(
                        message.capabilityMetadata
                    );
                    if (error) return "capabilityMetadata." + error;
                }
            }
            if (message.imagineMetadata != null && message.hasOwnProperty("imagineMetadata")) {
                properties._imagineMetadata = 1;
                {
                    var error = $root.AICommon.BotImagineMetadata.verify(message.imagineMetadata);
                    if (error) return "imagineMetadata." + error;
                }
            }
            if (message.memoryMetadata != null && message.hasOwnProperty("memoryMetadata")) {
                properties._memoryMetadata = 1;
                {
                    var error = $root.AICommon.BotMemoryMetadata.verify(message.memoryMetadata);
                    if (error) return "memoryMetadata." + error;
                }
            }
            if (message.renderingMetadata != null && message.hasOwnProperty("renderingMetadata")) {
                properties._renderingMetadata = 1;
                {
                    var error = $root.AICommon.BotRenderingMetadata.verify(
                        message.renderingMetadata
                    );
                    if (error) return "renderingMetadata." + error;
                }
            }
            if (
                message.botMetricsMetadata != null &&
                message.hasOwnProperty("botMetricsMetadata")
            ) {
                properties._botMetricsMetadata = 1;
                {
                    var error = $root.AICommon.BotMetricsMetadata.verify(
                        message.botMetricsMetadata
                    );
                    if (error) return "botMetricsMetadata." + error;
                }
            }
            if (
                message.botLinkedAccountsMetadata != null &&
                message.hasOwnProperty("botLinkedAccountsMetadata")
            ) {
                properties._botLinkedAccountsMetadata = 1;
                {
                    var error = $root.AICommon.BotLinkedAccountsMetadata.verify(
                        message.botLinkedAccountsMetadata
                    );
                    if (error) return "botLinkedAccountsMetadata." + error;
                }
            }
            if (
                message.richResponseSourcesMetadata != null &&
                message.hasOwnProperty("richResponseSourcesMetadata")
            ) {
                properties._richResponseSourcesMetadata = 1;
                {
                    var error = $root.AICommon.BotSourcesMetadata.verify(
                        message.richResponseSourcesMetadata
                    );
                    if (error) return "richResponseSourcesMetadata." + error;
                }
            }
            if (
                message.aiConversationContext != null &&
                message.hasOwnProperty("aiConversationContext")
            ) {
                properties._aiConversationContext = 1;
                if (
                    !(
                        (message.aiConversationContext &&
                            typeof message.aiConversationContext.length === "number") ||
                        $util.isString(message.aiConversationContext)
                    )
                )
                    return "aiConversationContext: buffer expected";
            }
            if (
                message.botPromotionMessageMetadata != null &&
                message.hasOwnProperty("botPromotionMessageMetadata")
            ) {
                properties._botPromotionMessageMetadata = 1;
                {
                    var error = $root.AICommon.BotPromotionMessageMetadata.verify(
                        message.botPromotionMessageMetadata
                    );
                    if (error) return "botPromotionMessageMetadata." + error;
                }
            }
            if (
                message.botModeSelectionMetadata != null &&
                message.hasOwnProperty("botModeSelectionMetadata")
            ) {
                properties._botModeSelectionMetadata = 1;
                {
                    var error = $root.AICommon.BotModeSelectionMetadata.verify(
                        message.botModeSelectionMetadata
                    );
                    if (error) return "botModeSelectionMetadata." + error;
                }
            }
            if (message.botQuotaMetadata != null && message.hasOwnProperty("botQuotaMetadata")) {
                properties._botQuotaMetadata = 1;
                {
                    var error = $root.AICommon.BotQuotaMetadata.verify(message.botQuotaMetadata);
                    if (error) return "botQuotaMetadata." + error;
                }
            }
            if (
                message.botAgeCollectionMetadata != null &&
                message.hasOwnProperty("botAgeCollectionMetadata")
            ) {
                properties._botAgeCollectionMetadata = 1;
                {
                    var error = $root.AICommon.BotAgeCollectionMetadata.verify(
                        message.botAgeCollectionMetadata
                    );
                    if (error) return "botAgeCollectionMetadata." + error;
                }
            }
            if (
                message.conversationStarterPromptId != null &&
                message.hasOwnProperty("conversationStarterPromptId")
            ) {
                properties._conversationStarterPromptId = 1;
                if (!$util.isString(message.conversationStarterPromptId))
                    return "conversationStarterPromptId: string expected";
            }
            if (message.botResponseId != null && message.hasOwnProperty("botResponseId")) {
                properties._botResponseId = 1;
                if (!$util.isString(message.botResponseId)) return "botResponseId: string expected";
            }
            if (
                message.verificationMetadata != null &&
                message.hasOwnProperty("verificationMetadata")
            ) {
                properties._verificationMetadata = 1;
                {
                    var error = $root.AICommon.BotSignatureVerificationMetadata.verify(
                        message.verificationMetadata
                    );
                    if (error) return "verificationMetadata." + error;
                }
            }
            if (
                message.unifiedResponseMutation != null &&
                message.hasOwnProperty("unifiedResponseMutation")
            ) {
                properties._unifiedResponseMutation = 1;
                {
                    var error = $root.AICommon.BotUnifiedResponseMutation.verify(
                        message.unifiedResponseMutation
                    );
                    if (error) return "unifiedResponseMutation." + error;
                }
            }
            if (
                message.botMessageOriginMetadata != null &&
                message.hasOwnProperty("botMessageOriginMetadata")
            ) {
                properties._botMessageOriginMetadata = 1;
                {
                    var error = $root.AICommon.BotMessageOriginMetadata.verify(
                        message.botMessageOriginMetadata
                    );
                    if (error) return "botMessageOriginMetadata." + error;
                }
            }
            if (
                message.inThreadSurveyMetadata != null &&
                message.hasOwnProperty("inThreadSurveyMetadata")
            ) {
                properties._inThreadSurveyMetadata = 1;
                {
                    var error = $root.AICommon.InThreadSurveyMetadata.verify(
                        message.inThreadSurveyMetadata
                    );
                    if (error) return "inThreadSurveyMetadata." + error;
                }
            }
            if (message.botThreadInfo != null && message.hasOwnProperty("botThreadInfo")) {
                properties._botThreadInfo = 1;
                {
                    var error = $root.AICommon.AIThreadInfo.verify(message.botThreadInfo);
                    if (error) return "botThreadInfo." + error;
                }
            }
            if (
                message.regenerateMetadata != null &&
                message.hasOwnProperty("regenerateMetadata")
            ) {
                properties._regenerateMetadata = 1;
                {
                    var error = $root.AICommon.AIRegenerateMetadata.verify(
                        message.regenerateMetadata
                    );
                    if (error) return "regenerateMetadata." + error;
                }
            }
            if (
                message.sessionTransparencyMetadata != null &&
                message.hasOwnProperty("sessionTransparencyMetadata")
            ) {
                properties._sessionTransparencyMetadata = 1;
                {
                    var error = $root.AICommon.SessionTransparencyMetadata.verify(
                        message.sessionTransparencyMetadata
                    );
                    if (error) return "sessionTransparencyMetadata." + error;
                }
            }
            if (
                message.botDocumentMessageMetadata != null &&
                message.hasOwnProperty("botDocumentMessageMetadata")
            ) {
                properties._botDocumentMessageMetadata = 1;
                {
                    var error = $root.AICommon.BotDocumentMessageMetadata.verify(
                        message.botDocumentMessageMetadata
                    );
                    if (error) return "botDocumentMessageMetadata." + error;
                }
            }
            if (message.botGroupMetadata != null && message.hasOwnProperty("botGroupMetadata")) {
                properties._botGroupMetadata = 1;
                {
                    var error = $root.AICommon.BotGroupMetadata.verify(message.botGroupMetadata);
                    if (error) return "botGroupMetadata." + error;
                }
            }
            if (message.internalMetadata != null && message.hasOwnProperty("internalMetadata")) {
                properties._internalMetadata = 1;
                if (
                    !(
                        (message.internalMetadata &&
                            typeof message.internalMetadata.length === "number") ||
                        $util.isString(message.internalMetadata)
                    )
                )
                    return "internalMetadata: buffer expected";
            }
            return null;
        };
        BotMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMetadata) return object;
            var message = new $root.AICommon.BotMetadata();
            if (object.avatarMetadata != null) {
                if (typeof object.avatarMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.avatarMetadata: object expected");
                message.avatarMetadata = $root.AICommon.BotAvatarMetadata.fromObject(
                    object.avatarMetadata
                );
            }
            if (object.personaId != null) message.personaId = String(object.personaId);
            if (object.pluginMetadata != null) {
                if (typeof object.pluginMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.pluginMetadata: object expected");
                message.pluginMetadata = $root.AICommon.BotPluginMetadata.fromObject(
                    object.pluginMetadata
                );
            }
            if (object.suggestedPromptMetadata != null) {
                if (typeof object.suggestedPromptMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.suggestedPromptMetadata: object expected"
                    );
                message.suggestedPromptMetadata =
                    $root.AICommon.BotSuggestedPromptMetadata.fromObject(
                        object.suggestedPromptMetadata
                    );
            }
            if (object.invokerJid != null) message.invokerJid = String(object.invokerJid);
            if (object.sessionMetadata != null) {
                if (typeof object.sessionMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.sessionMetadata: object expected");
                message.sessionMetadata = $root.AICommon.BotSessionMetadata.fromObject(
                    object.sessionMetadata
                );
            }
            if (object.memuMetadata != null) {
                if (typeof object.memuMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.memuMetadata: object expected");
                message.memuMetadata = $root.AICommon.BotMemuMetadata.fromObject(
                    object.memuMetadata
                );
            }
            if (object.timezone != null) message.timezone = String(object.timezone);
            if (object.reminderMetadata != null) {
                if (typeof object.reminderMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.reminderMetadata: object expected");
                message.reminderMetadata = $root.AICommon.BotReminderMetadata.fromObject(
                    object.reminderMetadata
                );
            }
            if (object.modelMetadata != null) {
                if (typeof object.modelMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.modelMetadata: object expected");
                message.modelMetadata = $root.AICommon.BotModelMetadata.fromObject(
                    object.modelMetadata
                );
            }
            if (object.messageDisclaimerText != null)
                message.messageDisclaimerText = String(object.messageDisclaimerText);
            if (object.progressIndicatorMetadata != null) {
                if (typeof object.progressIndicatorMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.progressIndicatorMetadata: object expected"
                    );
                message.progressIndicatorMetadata =
                    $root.AICommon.BotProgressIndicatorMetadata.fromObject(
                        object.progressIndicatorMetadata
                    );
            }
            if (object.capabilityMetadata != null) {
                if (typeof object.capabilityMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.capabilityMetadata: object expected");
                message.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.fromObject(
                    object.capabilityMetadata
                );
            }
            if (object.imagineMetadata != null) {
                if (typeof object.imagineMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.imagineMetadata: object expected");
                message.imagineMetadata = $root.AICommon.BotImagineMetadata.fromObject(
                    object.imagineMetadata
                );
            }
            if (object.memoryMetadata != null) {
                if (typeof object.memoryMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.memoryMetadata: object expected");
                message.memoryMetadata = $root.AICommon.BotMemoryMetadata.fromObject(
                    object.memoryMetadata
                );
            }
            if (object.renderingMetadata != null) {
                if (typeof object.renderingMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.renderingMetadata: object expected");
                message.renderingMetadata = $root.AICommon.BotRenderingMetadata.fromObject(
                    object.renderingMetadata
                );
            }
            if (object.botMetricsMetadata != null) {
                if (typeof object.botMetricsMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.botMetricsMetadata: object expected");
                message.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.fromObject(
                    object.botMetricsMetadata
                );
            }
            if (object.botLinkedAccountsMetadata != null) {
                if (typeof object.botLinkedAccountsMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botLinkedAccountsMetadata: object expected"
                    );
                message.botLinkedAccountsMetadata =
                    $root.AICommon.BotLinkedAccountsMetadata.fromObject(
                        object.botLinkedAccountsMetadata
                    );
            }
            if (object.richResponseSourcesMetadata != null) {
                if (typeof object.richResponseSourcesMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.richResponseSourcesMetadata: object expected"
                    );
                message.richResponseSourcesMetadata = $root.AICommon.BotSourcesMetadata.fromObject(
                    object.richResponseSourcesMetadata
                );
            }
            if (object.aiConversationContext != null)
                if (typeof object.aiConversationContext === "string")
                    $util.base64.decode(
                        object.aiConversationContext,
                        (message.aiConversationContext = $util.newBuffer(
                            $util.base64.length(object.aiConversationContext)
                        )),
                        0
                    );
                else if (object.aiConversationContext.length >= 0)
                    message.aiConversationContext = object.aiConversationContext;
            if (object.botPromotionMessageMetadata != null) {
                if (typeof object.botPromotionMessageMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botPromotionMessageMetadata: object expected"
                    );
                message.botPromotionMessageMetadata =
                    $root.AICommon.BotPromotionMessageMetadata.fromObject(
                        object.botPromotionMessageMetadata
                    );
            }
            if (object.botModeSelectionMetadata != null) {
                if (typeof object.botModeSelectionMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botModeSelectionMetadata: object expected"
                    );
                message.botModeSelectionMetadata =
                    $root.AICommon.BotModeSelectionMetadata.fromObject(
                        object.botModeSelectionMetadata
                    );
            }
            if (object.botQuotaMetadata != null) {
                if (typeof object.botQuotaMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.botQuotaMetadata: object expected");
                message.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.fromObject(
                    object.botQuotaMetadata
                );
            }
            if (object.botAgeCollectionMetadata != null) {
                if (typeof object.botAgeCollectionMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botAgeCollectionMetadata: object expected"
                    );
                message.botAgeCollectionMetadata =
                    $root.AICommon.BotAgeCollectionMetadata.fromObject(
                        object.botAgeCollectionMetadata
                    );
            }
            if (object.conversationStarterPromptId != null)
                message.conversationStarterPromptId = String(object.conversationStarterPromptId);
            if (object.botResponseId != null) message.botResponseId = String(object.botResponseId);
            if (object.verificationMetadata != null) {
                if (typeof object.verificationMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.verificationMetadata: object expected");
                message.verificationMetadata =
                    $root.AICommon.BotSignatureVerificationMetadata.fromObject(
                        object.verificationMetadata
                    );
            }
            if (object.unifiedResponseMutation != null) {
                if (typeof object.unifiedResponseMutation !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.unifiedResponseMutation: object expected"
                    );
                message.unifiedResponseMutation =
                    $root.AICommon.BotUnifiedResponseMutation.fromObject(
                        object.unifiedResponseMutation
                    );
            }
            if (object.botMessageOriginMetadata != null) {
                if (typeof object.botMessageOriginMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botMessageOriginMetadata: object expected"
                    );
                message.botMessageOriginMetadata =
                    $root.AICommon.BotMessageOriginMetadata.fromObject(
                        object.botMessageOriginMetadata
                    );
            }
            if (object.inThreadSurveyMetadata != null) {
                if (typeof object.inThreadSurveyMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.inThreadSurveyMetadata: object expected"
                    );
                message.inThreadSurveyMetadata = $root.AICommon.InThreadSurveyMetadata.fromObject(
                    object.inThreadSurveyMetadata
                );
            }
            if (object.botThreadInfo != null) {
                if (typeof object.botThreadInfo !== "object")
                    throw TypeError(".AICommon.BotMetadata.botThreadInfo: object expected");
                message.botThreadInfo = $root.AICommon.AIThreadInfo.fromObject(
                    object.botThreadInfo
                );
            }
            if (object.regenerateMetadata != null) {
                if (typeof object.regenerateMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.regenerateMetadata: object expected");
                message.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.fromObject(
                    object.regenerateMetadata
                );
            }
            if (object.sessionTransparencyMetadata != null) {
                if (typeof object.sessionTransparencyMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.sessionTransparencyMetadata: object expected"
                    );
                message.sessionTransparencyMetadata =
                    $root.AICommon.SessionTransparencyMetadata.fromObject(
                        object.sessionTransparencyMetadata
                    );
            }
            if (object.botDocumentMessageMetadata != null) {
                if (typeof object.botDocumentMessageMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotMetadata.botDocumentMessageMetadata: object expected"
                    );
                message.botDocumentMessageMetadata =
                    $root.AICommon.BotDocumentMessageMetadata.fromObject(
                        object.botDocumentMessageMetadata
                    );
            }
            if (object.botGroupMetadata != null) {
                if (typeof object.botGroupMetadata !== "object")
                    throw TypeError(".AICommon.BotMetadata.botGroupMetadata: object expected");
                message.botGroupMetadata = $root.AICommon.BotGroupMetadata.fromObject(
                    object.botGroupMetadata
                );
            }
            if (object.internalMetadata != null)
                if (typeof object.internalMetadata === "string")
                    $util.base64.decode(
                        object.internalMetadata,
                        (message.internalMetadata = $util.newBuffer(
                            $util.base64.length(object.internalMetadata)
                        )),
                        0
                    );
                else if (object.internalMetadata.length >= 0)
                    message.internalMetadata = object.internalMetadata;
            return message;
        };
        BotMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.avatarMetadata != null && message.hasOwnProperty("avatarMetadata")) {
                object.avatarMetadata = $root.AICommon.BotAvatarMetadata.toObject(
                    message.avatarMetadata,
                    options
                );
                if (options.oneofs) object._avatarMetadata = "avatarMetadata";
            }
            if (message.personaId != null && message.hasOwnProperty("personaId")) {
                object.personaId = message.personaId;
                if (options.oneofs) object._personaId = "personaId";
            }
            if (message.pluginMetadata != null && message.hasOwnProperty("pluginMetadata")) {
                object.pluginMetadata = $root.AICommon.BotPluginMetadata.toObject(
                    message.pluginMetadata,
                    options
                );
                if (options.oneofs) object._pluginMetadata = "pluginMetadata";
            }
            if (
                message.suggestedPromptMetadata != null &&
                message.hasOwnProperty("suggestedPromptMetadata")
            ) {
                object.suggestedPromptMetadata = $root.AICommon.BotSuggestedPromptMetadata.toObject(
                    message.suggestedPromptMetadata,
                    options
                );
                if (options.oneofs) object._suggestedPromptMetadata = "suggestedPromptMetadata";
            }
            if (message.invokerJid != null && message.hasOwnProperty("invokerJid")) {
                object.invokerJid = message.invokerJid;
                if (options.oneofs) object._invokerJid = "invokerJid";
            }
            if (message.sessionMetadata != null && message.hasOwnProperty("sessionMetadata")) {
                object.sessionMetadata = $root.AICommon.BotSessionMetadata.toObject(
                    message.sessionMetadata,
                    options
                );
                if (options.oneofs) object._sessionMetadata = "sessionMetadata";
            }
            if (message.memuMetadata != null && message.hasOwnProperty("memuMetadata")) {
                object.memuMetadata = $root.AICommon.BotMemuMetadata.toObject(
                    message.memuMetadata,
                    options
                );
                if (options.oneofs) object._memuMetadata = "memuMetadata";
            }
            if (message.timezone != null && message.hasOwnProperty("timezone")) {
                object.timezone = message.timezone;
                if (options.oneofs) object._timezone = "timezone";
            }
            if (message.reminderMetadata != null && message.hasOwnProperty("reminderMetadata")) {
                object.reminderMetadata = $root.AICommon.BotReminderMetadata.toObject(
                    message.reminderMetadata,
                    options
                );
                if (options.oneofs) object._reminderMetadata = "reminderMetadata";
            }
            if (message.modelMetadata != null && message.hasOwnProperty("modelMetadata")) {
                object.modelMetadata = $root.AICommon.BotModelMetadata.toObject(
                    message.modelMetadata,
                    options
                );
                if (options.oneofs) object._modelMetadata = "modelMetadata";
            }
            if (
                message.messageDisclaimerText != null &&
                message.hasOwnProperty("messageDisclaimerText")
            ) {
                object.messageDisclaimerText = message.messageDisclaimerText;
                if (options.oneofs) object._messageDisclaimerText = "messageDisclaimerText";
            }
            if (
                message.progressIndicatorMetadata != null &&
                message.hasOwnProperty("progressIndicatorMetadata")
            ) {
                object.progressIndicatorMetadata =
                    $root.AICommon.BotProgressIndicatorMetadata.toObject(
                        message.progressIndicatorMetadata,
                        options
                    );
                if (options.oneofs) object._progressIndicatorMetadata = "progressIndicatorMetadata";
            }
            if (
                message.capabilityMetadata != null &&
                message.hasOwnProperty("capabilityMetadata")
            ) {
                object.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.toObject(
                    message.capabilityMetadata,
                    options
                );
                if (options.oneofs) object._capabilityMetadata = "capabilityMetadata";
            }
            if (message.imagineMetadata != null && message.hasOwnProperty("imagineMetadata")) {
                object.imagineMetadata = $root.AICommon.BotImagineMetadata.toObject(
                    message.imagineMetadata,
                    options
                );
                if (options.oneofs) object._imagineMetadata = "imagineMetadata";
            }
            if (message.memoryMetadata != null && message.hasOwnProperty("memoryMetadata")) {
                object.memoryMetadata = $root.AICommon.BotMemoryMetadata.toObject(
                    message.memoryMetadata,
                    options
                );
                if (options.oneofs) object._memoryMetadata = "memoryMetadata";
            }
            if (message.renderingMetadata != null && message.hasOwnProperty("renderingMetadata")) {
                object.renderingMetadata = $root.AICommon.BotRenderingMetadata.toObject(
                    message.renderingMetadata,
                    options
                );
                if (options.oneofs) object._renderingMetadata = "renderingMetadata";
            }
            if (
                message.botMetricsMetadata != null &&
                message.hasOwnProperty("botMetricsMetadata")
            ) {
                object.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.toObject(
                    message.botMetricsMetadata,
                    options
                );
                if (options.oneofs) object._botMetricsMetadata = "botMetricsMetadata";
            }
            if (
                message.botLinkedAccountsMetadata != null &&
                message.hasOwnProperty("botLinkedAccountsMetadata")
            ) {
                object.botLinkedAccountsMetadata =
                    $root.AICommon.BotLinkedAccountsMetadata.toObject(
                        message.botLinkedAccountsMetadata,
                        options
                    );
                if (options.oneofs) object._botLinkedAccountsMetadata = "botLinkedAccountsMetadata";
            }
            if (
                message.richResponseSourcesMetadata != null &&
                message.hasOwnProperty("richResponseSourcesMetadata")
            ) {
                object.richResponseSourcesMetadata = $root.AICommon.BotSourcesMetadata.toObject(
                    message.richResponseSourcesMetadata,
                    options
                );
                if (options.oneofs)
                    object._richResponseSourcesMetadata = "richResponseSourcesMetadata";
            }
            if (
                message.aiConversationContext != null &&
                message.hasOwnProperty("aiConversationContext")
            ) {
                object.aiConversationContext =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.aiConversationContext,
                              0,
                              message.aiConversationContext.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.aiConversationContext)
                          : message.aiConversationContext;
                if (options.oneofs) object._aiConversationContext = "aiConversationContext";
            }
            if (
                message.botPromotionMessageMetadata != null &&
                message.hasOwnProperty("botPromotionMessageMetadata")
            ) {
                object.botPromotionMessageMetadata =
                    $root.AICommon.BotPromotionMessageMetadata.toObject(
                        message.botPromotionMessageMetadata,
                        options
                    );
                if (options.oneofs)
                    object._botPromotionMessageMetadata = "botPromotionMessageMetadata";
            }
            if (
                message.botModeSelectionMetadata != null &&
                message.hasOwnProperty("botModeSelectionMetadata")
            ) {
                object.botModeSelectionMetadata = $root.AICommon.BotModeSelectionMetadata.toObject(
                    message.botModeSelectionMetadata,
                    options
                );
                if (options.oneofs) object._botModeSelectionMetadata = "botModeSelectionMetadata";
            }
            if (message.botQuotaMetadata != null && message.hasOwnProperty("botQuotaMetadata")) {
                object.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.toObject(
                    message.botQuotaMetadata,
                    options
                );
                if (options.oneofs) object._botQuotaMetadata = "botQuotaMetadata";
            }
            if (
                message.botAgeCollectionMetadata != null &&
                message.hasOwnProperty("botAgeCollectionMetadata")
            ) {
                object.botAgeCollectionMetadata = $root.AICommon.BotAgeCollectionMetadata.toObject(
                    message.botAgeCollectionMetadata,
                    options
                );
                if (options.oneofs) object._botAgeCollectionMetadata = "botAgeCollectionMetadata";
            }
            if (
                message.conversationStarterPromptId != null &&
                message.hasOwnProperty("conversationStarterPromptId")
            ) {
                object.conversationStarterPromptId = message.conversationStarterPromptId;
                if (options.oneofs)
                    object._conversationStarterPromptId = "conversationStarterPromptId";
            }
            if (message.botResponseId != null && message.hasOwnProperty("botResponseId")) {
                object.botResponseId = message.botResponseId;
                if (options.oneofs) object._botResponseId = "botResponseId";
            }
            if (
                message.verificationMetadata != null &&
                message.hasOwnProperty("verificationMetadata")
            ) {
                object.verificationMetadata =
                    $root.AICommon.BotSignatureVerificationMetadata.toObject(
                        message.verificationMetadata,
                        options
                    );
                if (options.oneofs) object._verificationMetadata = "verificationMetadata";
            }
            if (
                message.unifiedResponseMutation != null &&
                message.hasOwnProperty("unifiedResponseMutation")
            ) {
                object.unifiedResponseMutation = $root.AICommon.BotUnifiedResponseMutation.toObject(
                    message.unifiedResponseMutation,
                    options
                );
                if (options.oneofs) object._unifiedResponseMutation = "unifiedResponseMutation";
            }
            if (
                message.botMessageOriginMetadata != null &&
                message.hasOwnProperty("botMessageOriginMetadata")
            ) {
                object.botMessageOriginMetadata = $root.AICommon.BotMessageOriginMetadata.toObject(
                    message.botMessageOriginMetadata,
                    options
                );
                if (options.oneofs) object._botMessageOriginMetadata = "botMessageOriginMetadata";
            }
            if (
                message.inThreadSurveyMetadata != null &&
                message.hasOwnProperty("inThreadSurveyMetadata")
            ) {
                object.inThreadSurveyMetadata = $root.AICommon.InThreadSurveyMetadata.toObject(
                    message.inThreadSurveyMetadata,
                    options
                );
                if (options.oneofs) object._inThreadSurveyMetadata = "inThreadSurveyMetadata";
            }
            if (message.botThreadInfo != null && message.hasOwnProperty("botThreadInfo")) {
                object.botThreadInfo = $root.AICommon.AIThreadInfo.toObject(
                    message.botThreadInfo,
                    options
                );
                if (options.oneofs) object._botThreadInfo = "botThreadInfo";
            }
            if (
                message.regenerateMetadata != null &&
                message.hasOwnProperty("regenerateMetadata")
            ) {
                object.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.toObject(
                    message.regenerateMetadata,
                    options
                );
                if (options.oneofs) object._regenerateMetadata = "regenerateMetadata";
            }
            if (
                message.sessionTransparencyMetadata != null &&
                message.hasOwnProperty("sessionTransparencyMetadata")
            ) {
                object.sessionTransparencyMetadata =
                    $root.AICommon.SessionTransparencyMetadata.toObject(
                        message.sessionTransparencyMetadata,
                        options
                    );
                if (options.oneofs)
                    object._sessionTransparencyMetadata = "sessionTransparencyMetadata";
            }
            if (
                message.botDocumentMessageMetadata != null &&
                message.hasOwnProperty("botDocumentMessageMetadata")
            ) {
                object.botDocumentMessageMetadata =
                    $root.AICommon.BotDocumentMessageMetadata.toObject(
                        message.botDocumentMessageMetadata,
                        options
                    );
                if (options.oneofs)
                    object._botDocumentMessageMetadata = "botDocumentMessageMetadata";
            }
            if (message.botGroupMetadata != null && message.hasOwnProperty("botGroupMetadata")) {
                object.botGroupMetadata = $root.AICommon.BotGroupMetadata.toObject(
                    message.botGroupMetadata,
                    options
                );
                if (options.oneofs) object._botGroupMetadata = "botGroupMetadata";
            }
            if (message.internalMetadata != null && message.hasOwnProperty("internalMetadata")) {
                object.internalMetadata =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.internalMetadata,
                              0,
                              message.internalMetadata.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.internalMetadata)
                          : message.internalMetadata;
                if (options.oneofs) object._internalMetadata = "internalMetadata";
            }
            return object;
        };
        BotMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMetadata";
        };
        return BotMetadata;
    })();
    AICommon.AIThreadInfo = (function () {
        function AIThreadInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        AIThreadInfo.prototype.serverInfo = null;
        AIThreadInfo.prototype.clientInfo = null;
        var $oneOfFields;
        Object.defineProperty(AIThreadInfo.prototype, "_serverInfo", {
            get: $util.oneOfGetter(($oneOfFields = ["serverInfo"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(AIThreadInfo.prototype, "_clientInfo", {
            get: $util.oneOfGetter(($oneOfFields = ["clientInfo"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        AIThreadInfo.create = function create(properties) {
            return new AIThreadInfo(properties);
        };
        AIThreadInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.serverInfo != null && Object.hasOwnProperty.call(message, "serverInfo"))
                $root.AICommon.AIThreadInfo.AIThreadServerInfo.encode(
                    message.serverInfo,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.clientInfo != null && Object.hasOwnProperty.call(message, "clientInfo"))
                $root.AICommon.AIThreadInfo.AIThreadClientInfo.encode(
                    message.clientInfo,
                    writer.uint32(18).fork()
                ).ldelim();
            return writer;
        };
        AIThreadInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        AIThreadInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.AIThreadInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.decode(
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
        AIThreadInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        AIThreadInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) {
                properties._serverInfo = 1;
                {
                    var error = $root.AICommon.AIThreadInfo.AIThreadServerInfo.verify(
                        message.serverInfo
                    );
                    if (error) return "serverInfo." + error;
                }
            }
            if (message.clientInfo != null && message.hasOwnProperty("clientInfo")) {
                properties._clientInfo = 1;
                {
                    var error = $root.AICommon.AIThreadInfo.AIThreadClientInfo.verify(
                        message.clientInfo
                    );
                    if (error) return "clientInfo." + error;
                }
            }
            return null;
        };
        AIThreadInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.AIThreadInfo) return object;
            var message = new $root.AICommon.AIThreadInfo();
            if (object.serverInfo != null) {
                if (typeof object.serverInfo !== "object")
                    throw TypeError(".AICommon.AIThreadInfo.serverInfo: object expected");
                message.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.fromObject(
                    object.serverInfo
                );
            }
            if (object.clientInfo != null) {
                if (typeof object.clientInfo !== "object")
                    throw TypeError(".AICommon.AIThreadInfo.clientInfo: object expected");
                message.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.fromObject(
                    object.clientInfo
                );
            }
            return message;
        };
        AIThreadInfo.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) {
                object.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.toObject(
                    message.serverInfo,
                    options
                );
                if (options.oneofs) object._serverInfo = "serverInfo";
            }
            if (message.clientInfo != null && message.hasOwnProperty("clientInfo")) {
                object.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.toObject(
                    message.clientInfo,
                    options
                );
                if (options.oneofs) object._clientInfo = "clientInfo";
            }
            return object;
        };
        AIThreadInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AIThreadInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.AIThreadInfo";
        };
        AIThreadInfo.AIThreadClientInfo = (function () {
            function AIThreadClientInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIThreadClientInfo.prototype.type = null;
            var $oneOfFields;
            Object.defineProperty(AIThreadClientInfo.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIThreadClientInfo.create = function create(properties) {
                return new AIThreadClientInfo(properties);
            };
            AIThreadClientInfo.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(8).int32(message.type);
                return writer;
            };
            AIThreadClientInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIThreadClientInfo.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.AIThreadInfo.AIThreadClientInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.type = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIThreadClientInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIThreadClientInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            AIThreadClientInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.AIThreadInfo.AIThreadClientInfo) return object;
                var message = new $root.AICommon.AIThreadInfo.AIThreadClientInfo();
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.type = 0;
                        break;
                    case "DEFAULT":
                    case 1:
                        message.type = 1;
                        break;
                    case "INCOGNITO":
                    case 2:
                        message.type = 2;
                        break;
                }
                return message;
            };
            AIThreadClientInfo.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType[
                                  message.type
                              ] === undefined
                                ? message.type
                                : $root.AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType[
                                      message.type
                                  ]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                return object;
            };
            AIThreadClientInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIThreadClientInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.AIThreadInfo.AIThreadClientInfo";
            };
            AIThreadClientInfo.AIThreadType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "DEFAULT")] = 1;
                values[(valuesById[2] = "INCOGNITO")] = 2;
                return values;
            })();
            return AIThreadClientInfo;
        })();
        AIThreadInfo.AIThreadServerInfo = (function () {
            function AIThreadServerInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AIThreadServerInfo.prototype.title = null;
            var $oneOfFields;
            Object.defineProperty(AIThreadServerInfo.prototype, "_title", {
                get: $util.oneOfGetter(($oneOfFields = ["title"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AIThreadServerInfo.create = function create(properties) {
                return new AIThreadServerInfo(properties);
            };
            AIThreadServerInfo.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(10).string(message.title);
                return writer;
            };
            AIThreadServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AIThreadServerInfo.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.AIThreadInfo.AIThreadServerInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.title = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AIThreadServerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AIThreadServerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.title != null && message.hasOwnProperty("title")) {
                    properties._title = 1;
                    if (!$util.isString(message.title)) return "title: string expected";
                }
                return null;
            };
            AIThreadServerInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.AIThreadInfo.AIThreadServerInfo) return object;
                var message = new $root.AICommon.AIThreadInfo.AIThreadServerInfo();
                if (object.title != null) message.title = String(object.title);
                return message;
            };
            AIThreadServerInfo.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.title != null && message.hasOwnProperty("title")) {
                    object.title = message.title;
                    if (options.oneofs) object._title = "title";
                }
                return object;
            };
            AIThreadServerInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AIThreadServerInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.AIThreadInfo.AIThreadServerInfo";
            };
            return AIThreadServerInfo;
        })();
        return AIThreadInfo;
    })();
    AICommon.BotUnifiedResponseMutation = (function () {
        function BotUnifiedResponseMutation(properties) {
            this.mediaDetailsMetadataList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotUnifiedResponseMutation.prototype.sbsMetadata = null;
        BotUnifiedResponseMutation.prototype.mediaDetailsMetadataList = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(BotUnifiedResponseMutation.prototype, "_sbsMetadata", {
            get: $util.oneOfGetter(($oneOfFields = ["sbsMetadata"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotUnifiedResponseMutation.create = function create(properties) {
            return new BotUnifiedResponseMutation(properties);
        };
        BotUnifiedResponseMutation.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.sbsMetadata != null && Object.hasOwnProperty.call(message, "sbsMetadata"))
                $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.encode(
                    message.sbsMetadata,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.mediaDetailsMetadataList != null && message.mediaDetailsMetadataList.length)
                for (var i = 0; i < message.mediaDetailsMetadataList.length; ++i)
                    $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.encode(
                        message.mediaDetailsMetadataList[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        BotUnifiedResponseMutation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotUnifiedResponseMutation.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotUnifiedResponseMutation();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.sbsMetadata =
                            $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 2: {
                        if (
                            !(
                                message.mediaDetailsMetadataList &&
                                message.mediaDetailsMetadataList.length
                            )
                        )
                            message.mediaDetailsMetadataList = [];
                        message.mediaDetailsMetadataList.push(
                            $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.decode(
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
        BotUnifiedResponseMutation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotUnifiedResponseMutation.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.sbsMetadata != null && message.hasOwnProperty("sbsMetadata")) {
                properties._sbsMetadata = 1;
                {
                    var error = $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.verify(
                        message.sbsMetadata
                    );
                    if (error) return "sbsMetadata." + error;
                }
            }
            if (
                message.mediaDetailsMetadataList != null &&
                message.hasOwnProperty("mediaDetailsMetadataList")
            ) {
                if (!Array.isArray(message.mediaDetailsMetadataList))
                    return "mediaDetailsMetadataList: array expected";
                for (var i = 0; i < message.mediaDetailsMetadataList.length; ++i) {
                    var error =
                        $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.verify(
                            message.mediaDetailsMetadataList[i]
                        );
                    if (error) return "mediaDetailsMetadataList." + error;
                }
            }
            return null;
        };
        BotUnifiedResponseMutation.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotUnifiedResponseMutation) return object;
            var message = new $root.AICommon.BotUnifiedResponseMutation();
            if (object.sbsMetadata != null) {
                if (typeof object.sbsMetadata !== "object")
                    throw TypeError(
                        ".AICommon.BotUnifiedResponseMutation.sbsMetadata: object expected"
                    );
                message.sbsMetadata =
                    $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.fromObject(
                        object.sbsMetadata
                    );
            }
            if (object.mediaDetailsMetadataList) {
                if (!Array.isArray(object.mediaDetailsMetadataList))
                    throw TypeError(
                        ".AICommon.BotUnifiedResponseMutation.mediaDetailsMetadataList: array expected"
                    );
                message.mediaDetailsMetadataList = [];
                for (var i = 0; i < object.mediaDetailsMetadataList.length; ++i) {
                    if (typeof object.mediaDetailsMetadataList[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotUnifiedResponseMutation.mediaDetailsMetadataList: object expected"
                        );
                    message.mediaDetailsMetadataList[i] =
                        $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.fromObject(
                            object.mediaDetailsMetadataList[i]
                        );
                }
            }
            return message;
        };
        BotUnifiedResponseMutation.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.mediaDetailsMetadataList = [];
            if (message.sbsMetadata != null && message.hasOwnProperty("sbsMetadata")) {
                object.sbsMetadata =
                    $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.toObject(
                        message.sbsMetadata,
                        options
                    );
                if (options.oneofs) object._sbsMetadata = "sbsMetadata";
            }
            if (message.mediaDetailsMetadataList && message.mediaDetailsMetadataList.length) {
                object.mediaDetailsMetadataList = [];
                for (var j = 0; j < message.mediaDetailsMetadataList.length; ++j)
                    object.mediaDetailsMetadataList[j] =
                        $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.toObject(
                            message.mediaDetailsMetadataList[j],
                            options
                        );
            }
            return object;
        };
        BotUnifiedResponseMutation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotUnifiedResponseMutation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotUnifiedResponseMutation";
        };
        BotUnifiedResponseMutation.MediaDetailsMetadata = (function () {
            function MediaDetailsMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MediaDetailsMetadata.prototype.id = null;
            MediaDetailsMetadata.prototype.highResMedia = null;
            MediaDetailsMetadata.prototype.previewMedia = null;
            var $oneOfFields;
            Object.defineProperty(MediaDetailsMetadata.prototype, "_id", {
                get: $util.oneOfGetter(($oneOfFields = ["id"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MediaDetailsMetadata.prototype, "_highResMedia", {
                get: $util.oneOfGetter(($oneOfFields = ["highResMedia"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MediaDetailsMetadata.prototype, "_previewMedia", {
                get: $util.oneOfGetter(($oneOfFields = ["previewMedia"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MediaDetailsMetadata.create = function create(properties) {
                return new MediaDetailsMetadata(properties);
            };
            MediaDetailsMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(10).string(message.id);
                if (
                    message.highResMedia != null &&
                    Object.hasOwnProperty.call(message, "highResMedia")
                )
                    $root.AICommon.BotMediaMetadata.encode(
                        message.highResMedia,
                        writer.uint32(18).fork()
                    ).ldelim();
                if (
                    message.previewMedia != null &&
                    Object.hasOwnProperty.call(message, "previewMedia")
                )
                    $root.AICommon.BotMediaMetadata.encode(
                        message.previewMedia,
                        writer.uint32(26).fork()
                    ).ldelim();
                return writer;
            };
            MediaDetailsMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            MediaDetailsMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.id = reader.string();
                            break;
                        }
                        case 2: {
                            message.highResMedia = $root.AICommon.BotMediaMetadata.decode(
                                reader,
                                reader.uint32()
                            );
                            break;
                        }
                        case 3: {
                            message.previewMedia = $root.AICommon.BotMediaMetadata.decode(
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
            MediaDetailsMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MediaDetailsMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.id != null && message.hasOwnProperty("id")) {
                    properties._id = 1;
                    if (!$util.isString(message.id)) return "id: string expected";
                }
                if (message.highResMedia != null && message.hasOwnProperty("highResMedia")) {
                    properties._highResMedia = 1;
                    {
                        var error = $root.AICommon.BotMediaMetadata.verify(message.highResMedia);
                        if (error) return "highResMedia." + error;
                    }
                }
                if (message.previewMedia != null && message.hasOwnProperty("previewMedia")) {
                    properties._previewMedia = 1;
                    {
                        var error = $root.AICommon.BotMediaMetadata.verify(message.previewMedia);
                        if (error) return "previewMedia." + error;
                    }
                }
                return null;
            };
            MediaDetailsMetadata.fromObject = function fromObject(object) {
                if (
                    object instanceof $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata
                )
                    return object;
                var message = new $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata();
                if (object.id != null) message.id = String(object.id);
                if (object.highResMedia != null) {
                    if (typeof object.highResMedia !== "object")
                        throw TypeError(
                            ".AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.highResMedia: object expected"
                        );
                    message.highResMedia = $root.AICommon.BotMediaMetadata.fromObject(
                        object.highResMedia
                    );
                }
                if (object.previewMedia != null) {
                    if (typeof object.previewMedia !== "object")
                        throw TypeError(
                            ".AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.previewMedia: object expected"
                        );
                    message.previewMedia = $root.AICommon.BotMediaMetadata.fromObject(
                        object.previewMedia
                    );
                }
                return message;
            };
            MediaDetailsMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.id != null && message.hasOwnProperty("id")) {
                    object.id = message.id;
                    if (options.oneofs) object._id = "id";
                }
                if (message.highResMedia != null && message.hasOwnProperty("highResMedia")) {
                    object.highResMedia = $root.AICommon.BotMediaMetadata.toObject(
                        message.highResMedia,
                        options
                    );
                    if (options.oneofs) object._highResMedia = "highResMedia";
                }
                if (message.previewMedia != null && message.hasOwnProperty("previewMedia")) {
                    object.previewMedia = $root.AICommon.BotMediaMetadata.toObject(
                        message.previewMedia,
                        options
                    );
                    if (options.oneofs) object._previewMedia = "previewMedia";
                }
                return object;
            };
            MediaDetailsMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MediaDetailsMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata";
            };
            return MediaDetailsMetadata;
        })();
        BotUnifiedResponseMutation.SideBySideMetadata = (function () {
            function SideBySideMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SideBySideMetadata.prototype.primaryResponseId = null;
            SideBySideMetadata.prototype.surveyCtaHasRendered = null;
            var $oneOfFields;
            Object.defineProperty(SideBySideMetadata.prototype, "_primaryResponseId", {
                get: $util.oneOfGetter(($oneOfFields = ["primaryResponseId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SideBySideMetadata.prototype, "_surveyCtaHasRendered", {
                get: $util.oneOfGetter(($oneOfFields = ["surveyCtaHasRendered"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SideBySideMetadata.create = function create(properties) {
                return new SideBySideMetadata(properties);
            };
            SideBySideMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.primaryResponseId != null &&
                    Object.hasOwnProperty.call(message, "primaryResponseId")
                )
                    writer.uint32(10).string(message.primaryResponseId);
                if (
                    message.surveyCtaHasRendered != null &&
                    Object.hasOwnProperty.call(message, "surveyCtaHasRendered")
                )
                    writer.uint32(16).bool(message.surveyCtaHasRendered);
                return writer;
            };
            SideBySideMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SideBySideMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.primaryResponseId = reader.string();
                            break;
                        }
                        case 2: {
                            message.surveyCtaHasRendered = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SideBySideMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SideBySideMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.primaryResponseId != null &&
                    message.hasOwnProperty("primaryResponseId")
                ) {
                    properties._primaryResponseId = 1;
                    if (!$util.isString(message.primaryResponseId))
                        return "primaryResponseId: string expected";
                }
                if (
                    message.surveyCtaHasRendered != null &&
                    message.hasOwnProperty("surveyCtaHasRendered")
                ) {
                    properties._surveyCtaHasRendered = 1;
                    if (typeof message.surveyCtaHasRendered !== "boolean")
                        return "surveyCtaHasRendered: boolean expected";
                }
                return null;
            };
            SideBySideMetadata.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata)
                    return object;
                var message = new $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata();
                if (object.primaryResponseId != null)
                    message.primaryResponseId = String(object.primaryResponseId);
                if (object.surveyCtaHasRendered != null)
                    message.surveyCtaHasRendered = Boolean(object.surveyCtaHasRendered);
                return message;
            };
            SideBySideMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.primaryResponseId != null &&
                    message.hasOwnProperty("primaryResponseId")
                ) {
                    object.primaryResponseId = message.primaryResponseId;
                    if (options.oneofs) object._primaryResponseId = "primaryResponseId";
                }
                if (
                    message.surveyCtaHasRendered != null &&
                    message.hasOwnProperty("surveyCtaHasRendered")
                ) {
                    object.surveyCtaHasRendered = message.surveyCtaHasRendered;
                    if (options.oneofs) object._surveyCtaHasRendered = "surveyCtaHasRendered";
                }
                return object;
            };
            SideBySideMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SideBySideMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotUnifiedResponseMutation.SideBySideMetadata";
            };
            return SideBySideMetadata;
        })();
        return BotUnifiedResponseMutation;
    })();
    AICommon.BotMessageOrigin = (function () {
        function BotMessageOrigin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMessageOrigin.prototype.type = null;
        var $oneOfFields;
        Object.defineProperty(BotMessageOrigin.prototype, "_type", {
            get: $util.oneOfGetter(($oneOfFields = ["type"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMessageOrigin.create = function create(properties) {
            return new BotMessageOrigin(properties);
        };
        BotMessageOrigin.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(8).int32(message.type);
            return writer;
        };
        BotMessageOrigin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMessageOrigin.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMessageOrigin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.type = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMessageOrigin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMessageOrigin.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                properties._type = 1;
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                        break;
                }
            }
            return null;
        };
        BotMessageOrigin.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMessageOrigin) return object;
            var message = new $root.AICommon.BotMessageOrigin();
            switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED":
                case 0:
                    message.type = 0;
                    break;
            }
            return message;
        };
        BotMessageOrigin.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                object.type =
                    options.enums === String
                        ? $root.AICommon.BotMessageOrigin.BotMessageOriginType[message.type] ===
                          undefined
                            ? message.type
                            : $root.AICommon.BotMessageOrigin.BotMessageOriginType[message.type]
                        : message.type;
                if (options.oneofs) object._type = "type";
            }
            return object;
        };
        BotMessageOrigin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMessageOrigin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMessageOrigin";
        };
        BotMessageOrigin.BotMessageOriginType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED")] = 0;
            return values;
        })();
        return BotMessageOrigin;
    })();
    AICommon.BotMessageOriginMetadata = (function () {
        function BotMessageOriginMetadata(properties) {
            this.origins = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMessageOriginMetadata.prototype.origins = $util.emptyArray;
        BotMessageOriginMetadata.create = function create(properties) {
            return new BotMessageOriginMetadata(properties);
        };
        BotMessageOriginMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.origins != null && message.origins.length)
                for (var i = 0; i < message.origins.length; ++i)
                    $root.AICommon.BotMessageOrigin.encode(
                        message.origins[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotMessageOriginMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMessageOriginMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMessageOriginMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.origins && message.origins.length)) message.origins = [];
                        message.origins.push(
                            $root.AICommon.BotMessageOrigin.decode(reader, reader.uint32())
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
        BotMessageOriginMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMessageOriginMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.origins != null && message.hasOwnProperty("origins")) {
                if (!Array.isArray(message.origins)) return "origins: array expected";
                for (var i = 0; i < message.origins.length; ++i) {
                    var error = $root.AICommon.BotMessageOrigin.verify(message.origins[i]);
                    if (error) return "origins." + error;
                }
            }
            return null;
        };
        BotMessageOriginMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMessageOriginMetadata) return object;
            var message = new $root.AICommon.BotMessageOriginMetadata();
            if (object.origins) {
                if (!Array.isArray(object.origins))
                    throw TypeError(".AICommon.BotMessageOriginMetadata.origins: array expected");
                message.origins = [];
                for (var i = 0; i < object.origins.length; ++i) {
                    if (typeof object.origins[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotMessageOriginMetadata.origins: object expected"
                        );
                    message.origins[i] = $root.AICommon.BotMessageOrigin.fromObject(
                        object.origins[i]
                    );
                }
            }
            return message;
        };
        BotMessageOriginMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.origins = [];
            if (message.origins && message.origins.length) {
                object.origins = [];
                for (var j = 0; j < message.origins.length; ++j)
                    object.origins[j] = $root.AICommon.BotMessageOrigin.toObject(
                        message.origins[j],
                        options
                    );
            }
            return object;
        };
        BotMessageOriginMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMessageOriginMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMessageOriginMetadata";
        };
        return BotMessageOriginMetadata;
    })();
    AICommon.InThreadSurveyMetadata = (function () {
        function InThreadSurveyMetadata(properties) {
            this.questions = [];
            this.privacyStatementParts = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        InThreadSurveyMetadata.prototype.tessaSessionId = null;
        InThreadSurveyMetadata.prototype.simonSessionId = null;
        InThreadSurveyMetadata.prototype.simonSurveyId = null;
        InThreadSurveyMetadata.prototype.tessaRootId = null;
        InThreadSurveyMetadata.prototype.requestId = null;
        InThreadSurveyMetadata.prototype.tessaEvent = null;
        InThreadSurveyMetadata.prototype.invitationHeaderText = null;
        InThreadSurveyMetadata.prototype.invitationBodyText = null;
        InThreadSurveyMetadata.prototype.invitationCtaText = null;
        InThreadSurveyMetadata.prototype.invitationCtaUrl = null;
        InThreadSurveyMetadata.prototype.surveyTitle = null;
        InThreadSurveyMetadata.prototype.questions = $util.emptyArray;
        InThreadSurveyMetadata.prototype.surveyContinueButtonText = null;
        InThreadSurveyMetadata.prototype.surveySubmitButtonText = null;
        InThreadSurveyMetadata.prototype.privacyStatementFull = null;
        InThreadSurveyMetadata.prototype.privacyStatementParts = $util.emptyArray;
        InThreadSurveyMetadata.prototype.feedbackToastText = null;
        InThreadSurveyMetadata.prototype.startQuestionIndex = null;
        var $oneOfFields;
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaSessionId", {
            get: $util.oneOfGetter(($oneOfFields = ["tessaSessionId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSessionId", {
            get: $util.oneOfGetter(($oneOfFields = ["simonSessionId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSurveyId", {
            get: $util.oneOfGetter(($oneOfFields = ["simonSurveyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaRootId", {
            get: $util.oneOfGetter(($oneOfFields = ["tessaRootId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_requestId", {
            get: $util.oneOfGetter(($oneOfFields = ["requestId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaEvent", {
            get: $util.oneOfGetter(($oneOfFields = ["tessaEvent"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationHeaderText", {
            get: $util.oneOfGetter(($oneOfFields = ["invitationHeaderText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationBodyText", {
            get: $util.oneOfGetter(($oneOfFields = ["invitationBodyText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaText", {
            get: $util.oneOfGetter(($oneOfFields = ["invitationCtaText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["invitationCtaUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyTitle", {
            get: $util.oneOfGetter(($oneOfFields = ["surveyTitle"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyContinueButtonText", {
            get: $util.oneOfGetter(($oneOfFields = ["surveyContinueButtonText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveySubmitButtonText", {
            get: $util.oneOfGetter(($oneOfFields = ["surveySubmitButtonText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_privacyStatementFull", {
            get: $util.oneOfGetter(($oneOfFields = ["privacyStatementFull"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_feedbackToastText", {
            get: $util.oneOfGetter(($oneOfFields = ["feedbackToastText"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(InThreadSurveyMetadata.prototype, "_startQuestionIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["startQuestionIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        InThreadSurveyMetadata.create = function create(properties) {
            return new InThreadSurveyMetadata(properties);
        };
        InThreadSurveyMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.tessaSessionId != null &&
                Object.hasOwnProperty.call(message, "tessaSessionId")
            )
                writer.uint32(10).string(message.tessaSessionId);
            if (
                message.simonSessionId != null &&
                Object.hasOwnProperty.call(message, "simonSessionId")
            )
                writer.uint32(18).string(message.simonSessionId);
            if (
                message.simonSurveyId != null &&
                Object.hasOwnProperty.call(message, "simonSurveyId")
            )
                writer.uint32(26).string(message.simonSurveyId);
            if (message.tessaRootId != null && Object.hasOwnProperty.call(message, "tessaRootId"))
                writer.uint32(34).string(message.tessaRootId);
            if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                writer.uint32(42).string(message.requestId);
            if (message.tessaEvent != null && Object.hasOwnProperty.call(message, "tessaEvent"))
                writer.uint32(50).string(message.tessaEvent);
            if (
                message.invitationHeaderText != null &&
                Object.hasOwnProperty.call(message, "invitationHeaderText")
            )
                writer.uint32(58).string(message.invitationHeaderText);
            if (
                message.invitationBodyText != null &&
                Object.hasOwnProperty.call(message, "invitationBodyText")
            )
                writer.uint32(66).string(message.invitationBodyText);
            if (
                message.invitationCtaText != null &&
                Object.hasOwnProperty.call(message, "invitationCtaText")
            )
                writer.uint32(74).string(message.invitationCtaText);
            if (
                message.invitationCtaUrl != null &&
                Object.hasOwnProperty.call(message, "invitationCtaUrl")
            )
                writer.uint32(82).string(message.invitationCtaUrl);
            if (message.surveyTitle != null && Object.hasOwnProperty.call(message, "surveyTitle"))
                writer.uint32(90).string(message.surveyTitle);
            if (message.questions != null && message.questions.length)
                for (var i = 0; i < message.questions.length; ++i)
                    $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.encode(
                        message.questions[i],
                        writer.uint32(98).fork()
                    ).ldelim();
            if (
                message.surveyContinueButtonText != null &&
                Object.hasOwnProperty.call(message, "surveyContinueButtonText")
            )
                writer.uint32(106).string(message.surveyContinueButtonText);
            if (
                message.surveySubmitButtonText != null &&
                Object.hasOwnProperty.call(message, "surveySubmitButtonText")
            )
                writer.uint32(114).string(message.surveySubmitButtonText);
            if (
                message.privacyStatementFull != null &&
                Object.hasOwnProperty.call(message, "privacyStatementFull")
            )
                writer.uint32(122).string(message.privacyStatementFull);
            if (message.privacyStatementParts != null && message.privacyStatementParts.length)
                for (var i = 0; i < message.privacyStatementParts.length; ++i)
                    $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.encode(
                        message.privacyStatementParts[i],
                        writer.uint32(130).fork()
                    ).ldelim();
            if (
                message.feedbackToastText != null &&
                Object.hasOwnProperty.call(message, "feedbackToastText")
            )
                writer.uint32(138).string(message.feedbackToastText);
            if (
                message.startQuestionIndex != null &&
                Object.hasOwnProperty.call(message, "startQuestionIndex")
            )
                writer.uint32(144).int32(message.startQuestionIndex);
            return writer;
        };
        InThreadSurveyMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        InThreadSurveyMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.InThreadSurveyMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.tessaSessionId = reader.string();
                        break;
                    }
                    case 2: {
                        message.simonSessionId = reader.string();
                        break;
                    }
                    case 3: {
                        message.simonSurveyId = reader.string();
                        break;
                    }
                    case 4: {
                        message.tessaRootId = reader.string();
                        break;
                    }
                    case 5: {
                        message.requestId = reader.string();
                        break;
                    }
                    case 6: {
                        message.tessaEvent = reader.string();
                        break;
                    }
                    case 7: {
                        message.invitationHeaderText = reader.string();
                        break;
                    }
                    case 8: {
                        message.invitationBodyText = reader.string();
                        break;
                    }
                    case 9: {
                        message.invitationCtaText = reader.string();
                        break;
                    }
                    case 10: {
                        message.invitationCtaUrl = reader.string();
                        break;
                    }
                    case 11: {
                        message.surveyTitle = reader.string();
                        break;
                    }
                    case 12: {
                        if (!(message.questions && message.questions.length))
                            message.questions = [];
                        message.questions.push(
                            $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 13: {
                        message.surveyContinueButtonText = reader.string();
                        break;
                    }
                    case 14: {
                        message.surveySubmitButtonText = reader.string();
                        break;
                    }
                    case 15: {
                        message.privacyStatementFull = reader.string();
                        break;
                    }
                    case 16: {
                        if (
                            !(message.privacyStatementParts && message.privacyStatementParts.length)
                        )
                            message.privacyStatementParts = [];
                        message.privacyStatementParts.push(
                            $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 17: {
                        message.feedbackToastText = reader.string();
                        break;
                    }
                    case 18: {
                        message.startQuestionIndex = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        InThreadSurveyMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        InThreadSurveyMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.tessaSessionId != null && message.hasOwnProperty("tessaSessionId")) {
                properties._tessaSessionId = 1;
                if (!$util.isString(message.tessaSessionId))
                    return "tessaSessionId: string expected";
            }
            if (message.simonSessionId != null && message.hasOwnProperty("simonSessionId")) {
                properties._simonSessionId = 1;
                if (!$util.isString(message.simonSessionId))
                    return "simonSessionId: string expected";
            }
            if (message.simonSurveyId != null && message.hasOwnProperty("simonSurveyId")) {
                properties._simonSurveyId = 1;
                if (!$util.isString(message.simonSurveyId)) return "simonSurveyId: string expected";
            }
            if (message.tessaRootId != null && message.hasOwnProperty("tessaRootId")) {
                properties._tessaRootId = 1;
                if (!$util.isString(message.tessaRootId)) return "tessaRootId: string expected";
            }
            if (message.requestId != null && message.hasOwnProperty("requestId")) {
                properties._requestId = 1;
                if (!$util.isString(message.requestId)) return "requestId: string expected";
            }
            if (message.tessaEvent != null && message.hasOwnProperty("tessaEvent")) {
                properties._tessaEvent = 1;
                if (!$util.isString(message.tessaEvent)) return "tessaEvent: string expected";
            }
            if (
                message.invitationHeaderText != null &&
                message.hasOwnProperty("invitationHeaderText")
            ) {
                properties._invitationHeaderText = 1;
                if (!$util.isString(message.invitationHeaderText))
                    return "invitationHeaderText: string expected";
            }
            if (
                message.invitationBodyText != null &&
                message.hasOwnProperty("invitationBodyText")
            ) {
                properties._invitationBodyText = 1;
                if (!$util.isString(message.invitationBodyText))
                    return "invitationBodyText: string expected";
            }
            if (message.invitationCtaText != null && message.hasOwnProperty("invitationCtaText")) {
                properties._invitationCtaText = 1;
                if (!$util.isString(message.invitationCtaText))
                    return "invitationCtaText: string expected";
            }
            if (message.invitationCtaUrl != null && message.hasOwnProperty("invitationCtaUrl")) {
                properties._invitationCtaUrl = 1;
                if (!$util.isString(message.invitationCtaUrl))
                    return "invitationCtaUrl: string expected";
            }
            if (message.surveyTitle != null && message.hasOwnProperty("surveyTitle")) {
                properties._surveyTitle = 1;
                if (!$util.isString(message.surveyTitle)) return "surveyTitle: string expected";
            }
            if (message.questions != null && message.hasOwnProperty("questions")) {
                if (!Array.isArray(message.questions)) return "questions: array expected";
                for (var i = 0; i < message.questions.length; ++i) {
                    var error = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.verify(
                        message.questions[i]
                    );
                    if (error) return "questions." + error;
                }
            }
            if (
                message.surveyContinueButtonText != null &&
                message.hasOwnProperty("surveyContinueButtonText")
            ) {
                properties._surveyContinueButtonText = 1;
                if (!$util.isString(message.surveyContinueButtonText))
                    return "surveyContinueButtonText: string expected";
            }
            if (
                message.surveySubmitButtonText != null &&
                message.hasOwnProperty("surveySubmitButtonText")
            ) {
                properties._surveySubmitButtonText = 1;
                if (!$util.isString(message.surveySubmitButtonText))
                    return "surveySubmitButtonText: string expected";
            }
            if (
                message.privacyStatementFull != null &&
                message.hasOwnProperty("privacyStatementFull")
            ) {
                properties._privacyStatementFull = 1;
                if (!$util.isString(message.privacyStatementFull))
                    return "privacyStatementFull: string expected";
            }
            if (
                message.privacyStatementParts != null &&
                message.hasOwnProperty("privacyStatementParts")
            ) {
                if (!Array.isArray(message.privacyStatementParts))
                    return "privacyStatementParts: array expected";
                for (var i = 0; i < message.privacyStatementParts.length; ++i) {
                    var error =
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.verify(
                            message.privacyStatementParts[i]
                        );
                    if (error) return "privacyStatementParts." + error;
                }
            }
            if (message.feedbackToastText != null && message.hasOwnProperty("feedbackToastText")) {
                properties._feedbackToastText = 1;
                if (!$util.isString(message.feedbackToastText))
                    return "feedbackToastText: string expected";
            }
            if (
                message.startQuestionIndex != null &&
                message.hasOwnProperty("startQuestionIndex")
            ) {
                properties._startQuestionIndex = 1;
                if (!$util.isInteger(message.startQuestionIndex))
                    return "startQuestionIndex: integer expected";
            }
            return null;
        };
        InThreadSurveyMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.InThreadSurveyMetadata) return object;
            var message = new $root.AICommon.InThreadSurveyMetadata();
            if (object.tessaSessionId != null)
                message.tessaSessionId = String(object.tessaSessionId);
            if (object.simonSessionId != null)
                message.simonSessionId = String(object.simonSessionId);
            if (object.simonSurveyId != null) message.simonSurveyId = String(object.simonSurveyId);
            if (object.tessaRootId != null) message.tessaRootId = String(object.tessaRootId);
            if (object.requestId != null) message.requestId = String(object.requestId);
            if (object.tessaEvent != null) message.tessaEvent = String(object.tessaEvent);
            if (object.invitationHeaderText != null)
                message.invitationHeaderText = String(object.invitationHeaderText);
            if (object.invitationBodyText != null)
                message.invitationBodyText = String(object.invitationBodyText);
            if (object.invitationCtaText != null)
                message.invitationCtaText = String(object.invitationCtaText);
            if (object.invitationCtaUrl != null)
                message.invitationCtaUrl = String(object.invitationCtaUrl);
            if (object.surveyTitle != null) message.surveyTitle = String(object.surveyTitle);
            if (object.questions) {
                if (!Array.isArray(object.questions))
                    throw TypeError(".AICommon.InThreadSurveyMetadata.questions: array expected");
                message.questions = [];
                for (var i = 0; i < object.questions.length; ++i) {
                    if (typeof object.questions[i] !== "object")
                        throw TypeError(
                            ".AICommon.InThreadSurveyMetadata.questions: object expected"
                        );
                    message.questions[i] =
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.fromObject(
                            object.questions[i]
                        );
                }
            }
            if (object.surveyContinueButtonText != null)
                message.surveyContinueButtonText = String(object.surveyContinueButtonText);
            if (object.surveySubmitButtonText != null)
                message.surveySubmitButtonText = String(object.surveySubmitButtonText);
            if (object.privacyStatementFull != null)
                message.privacyStatementFull = String(object.privacyStatementFull);
            if (object.privacyStatementParts) {
                if (!Array.isArray(object.privacyStatementParts))
                    throw TypeError(
                        ".AICommon.InThreadSurveyMetadata.privacyStatementParts: array expected"
                    );
                message.privacyStatementParts = [];
                for (var i = 0; i < object.privacyStatementParts.length; ++i) {
                    if (typeof object.privacyStatementParts[i] !== "object")
                        throw TypeError(
                            ".AICommon.InThreadSurveyMetadata.privacyStatementParts: object expected"
                        );
                    message.privacyStatementParts[i] =
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.fromObject(
                            object.privacyStatementParts[i]
                        );
                }
            }
            if (object.feedbackToastText != null)
                message.feedbackToastText = String(object.feedbackToastText);
            if (object.startQuestionIndex != null)
                message.startQuestionIndex = object.startQuestionIndex | 0;
            return message;
        };
        InThreadSurveyMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.questions = [];
                object.privacyStatementParts = [];
            }
            if (message.tessaSessionId != null && message.hasOwnProperty("tessaSessionId")) {
                object.tessaSessionId = message.tessaSessionId;
                if (options.oneofs) object._tessaSessionId = "tessaSessionId";
            }
            if (message.simonSessionId != null && message.hasOwnProperty("simonSessionId")) {
                object.simonSessionId = message.simonSessionId;
                if (options.oneofs) object._simonSessionId = "simonSessionId";
            }
            if (message.simonSurveyId != null && message.hasOwnProperty("simonSurveyId")) {
                object.simonSurveyId = message.simonSurveyId;
                if (options.oneofs) object._simonSurveyId = "simonSurveyId";
            }
            if (message.tessaRootId != null && message.hasOwnProperty("tessaRootId")) {
                object.tessaRootId = message.tessaRootId;
                if (options.oneofs) object._tessaRootId = "tessaRootId";
            }
            if (message.requestId != null && message.hasOwnProperty("requestId")) {
                object.requestId = message.requestId;
                if (options.oneofs) object._requestId = "requestId";
            }
            if (message.tessaEvent != null && message.hasOwnProperty("tessaEvent")) {
                object.tessaEvent = message.tessaEvent;
                if (options.oneofs) object._tessaEvent = "tessaEvent";
            }
            if (
                message.invitationHeaderText != null &&
                message.hasOwnProperty("invitationHeaderText")
            ) {
                object.invitationHeaderText = message.invitationHeaderText;
                if (options.oneofs) object._invitationHeaderText = "invitationHeaderText";
            }
            if (
                message.invitationBodyText != null &&
                message.hasOwnProperty("invitationBodyText")
            ) {
                object.invitationBodyText = message.invitationBodyText;
                if (options.oneofs) object._invitationBodyText = "invitationBodyText";
            }
            if (message.invitationCtaText != null && message.hasOwnProperty("invitationCtaText")) {
                object.invitationCtaText = message.invitationCtaText;
                if (options.oneofs) object._invitationCtaText = "invitationCtaText";
            }
            if (message.invitationCtaUrl != null && message.hasOwnProperty("invitationCtaUrl")) {
                object.invitationCtaUrl = message.invitationCtaUrl;
                if (options.oneofs) object._invitationCtaUrl = "invitationCtaUrl";
            }
            if (message.surveyTitle != null && message.hasOwnProperty("surveyTitle")) {
                object.surveyTitle = message.surveyTitle;
                if (options.oneofs) object._surveyTitle = "surveyTitle";
            }
            if (message.questions && message.questions.length) {
                object.questions = [];
                for (var j = 0; j < message.questions.length; ++j)
                    object.questions[j] =
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.toObject(
                            message.questions[j],
                            options
                        );
            }
            if (
                message.surveyContinueButtonText != null &&
                message.hasOwnProperty("surveyContinueButtonText")
            ) {
                object.surveyContinueButtonText = message.surveyContinueButtonText;
                if (options.oneofs) object._surveyContinueButtonText = "surveyContinueButtonText";
            }
            if (
                message.surveySubmitButtonText != null &&
                message.hasOwnProperty("surveySubmitButtonText")
            ) {
                object.surveySubmitButtonText = message.surveySubmitButtonText;
                if (options.oneofs) object._surveySubmitButtonText = "surveySubmitButtonText";
            }
            if (
                message.privacyStatementFull != null &&
                message.hasOwnProperty("privacyStatementFull")
            ) {
                object.privacyStatementFull = message.privacyStatementFull;
                if (options.oneofs) object._privacyStatementFull = "privacyStatementFull";
            }
            if (message.privacyStatementParts && message.privacyStatementParts.length) {
                object.privacyStatementParts = [];
                for (var j = 0; j < message.privacyStatementParts.length; ++j)
                    object.privacyStatementParts[j] =
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.toObject(
                            message.privacyStatementParts[j],
                            options
                        );
            }
            if (message.feedbackToastText != null && message.hasOwnProperty("feedbackToastText")) {
                object.feedbackToastText = message.feedbackToastText;
                if (options.oneofs) object._feedbackToastText = "feedbackToastText";
            }
            if (
                message.startQuestionIndex != null &&
                message.hasOwnProperty("startQuestionIndex")
            ) {
                object.startQuestionIndex = message.startQuestionIndex;
                if (options.oneofs) object._startQuestionIndex = "startQuestionIndex";
            }
            return object;
        };
        InThreadSurveyMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        InThreadSurveyMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.InThreadSurveyMetadata";
        };
        InThreadSurveyMetadata.InThreadSurveyOption = (function () {
            function InThreadSurveyOption(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            InThreadSurveyOption.prototype.stringValue = null;
            InThreadSurveyOption.prototype.numericValue = null;
            InThreadSurveyOption.prototype.textTranslated = null;
            var $oneOfFields;
            Object.defineProperty(InThreadSurveyOption.prototype, "_stringValue", {
                get: $util.oneOfGetter(($oneOfFields = ["stringValue"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(InThreadSurveyOption.prototype, "_numericValue", {
                get: $util.oneOfGetter(($oneOfFields = ["numericValue"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(InThreadSurveyOption.prototype, "_textTranslated", {
                get: $util.oneOfGetter(($oneOfFields = ["textTranslated"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            InThreadSurveyOption.create = function create(properties) {
                return new InThreadSurveyOption(properties);
            };
            InThreadSurveyOption.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.stringValue != null &&
                    Object.hasOwnProperty.call(message, "stringValue")
                )
                    writer.uint32(10).string(message.stringValue);
                if (
                    message.numericValue != null &&
                    Object.hasOwnProperty.call(message, "numericValue")
                )
                    writer.uint32(16).uint32(message.numericValue);
                if (
                    message.textTranslated != null &&
                    Object.hasOwnProperty.call(message, "textTranslated")
                )
                    writer.uint32(26).string(message.textTranslated);
                return writer;
            };
            InThreadSurveyOption.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            InThreadSurveyOption.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.stringValue = reader.string();
                            break;
                        }
                        case 2: {
                            message.numericValue = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.textTranslated = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            InThreadSurveyOption.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            InThreadSurveyOption.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    properties._stringValue = 1;
                    if (!$util.isString(message.stringValue)) return "stringValue: string expected";
                }
                if (message.numericValue != null && message.hasOwnProperty("numericValue")) {
                    properties._numericValue = 1;
                    if (!$util.isInteger(message.numericValue))
                        return "numericValue: integer expected";
                }
                if (message.textTranslated != null && message.hasOwnProperty("textTranslated")) {
                    properties._textTranslated = 1;
                    if (!$util.isString(message.textTranslated))
                        return "textTranslated: string expected";
                }
                return null;
            };
            InThreadSurveyOption.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption)
                    return object;
                var message = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption();
                if (object.stringValue != null) message.stringValue = String(object.stringValue);
                if (object.numericValue != null) message.numericValue = object.numericValue >>> 0;
                if (object.textTranslated != null)
                    message.textTranslated = String(object.textTranslated);
                return message;
            };
            InThreadSurveyOption.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs) object._stringValue = "stringValue";
                }
                if (message.numericValue != null && message.hasOwnProperty("numericValue")) {
                    object.numericValue = message.numericValue;
                    if (options.oneofs) object._numericValue = "numericValue";
                }
                if (message.textTranslated != null && message.hasOwnProperty("textTranslated")) {
                    object.textTranslated = message.textTranslated;
                    if (options.oneofs) object._textTranslated = "textTranslated";
                }
                return object;
            };
            InThreadSurveyOption.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            InThreadSurveyOption.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.InThreadSurveyMetadata.InThreadSurveyOption";
            };
            return InThreadSurveyOption;
        })();
        InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart = (function () {
            function InThreadSurveyPrivacyStatementPart(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            InThreadSurveyPrivacyStatementPart.prototype.text = null;
            InThreadSurveyPrivacyStatementPart.prototype.url = null;
            var $oneOfFields;
            Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_text", {
                get: $util.oneOfGetter(($oneOfFields = ["text"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_url", {
                get: $util.oneOfGetter(($oneOfFields = ["url"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            InThreadSurveyPrivacyStatementPart.create = function create(properties) {
                return new InThreadSurveyPrivacyStatementPart(properties);
            };
            InThreadSurveyPrivacyStatementPart.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                    writer.uint32(10).string(message.text);
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(18).string(message.url);
                return writer;
            };
            InThreadSurveyPrivacyStatementPart.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            InThreadSurveyPrivacyStatementPart.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.text = reader.string();
                            break;
                        }
                        case 2: {
                            message.url = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            InThreadSurveyPrivacyStatementPart.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            InThreadSurveyPrivacyStatementPart.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.text != null && message.hasOwnProperty("text")) {
                    properties._text = 1;
                    if (!$util.isString(message.text)) return "text: string expected";
                }
                if (message.url != null && message.hasOwnProperty("url")) {
                    properties._url = 1;
                    if (!$util.isString(message.url)) return "url: string expected";
                }
                return null;
            };
            InThreadSurveyPrivacyStatementPart.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart
                )
                    return object;
                var message =
                    new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
                if (object.text != null) message.text = String(object.text);
                if (object.url != null) message.url = String(object.url);
                return message;
            };
            InThreadSurveyPrivacyStatementPart.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.text != null && message.hasOwnProperty("text")) {
                    object.text = message.text;
                    if (options.oneofs) object._text = "text";
                }
                if (message.url != null && message.hasOwnProperty("url")) {
                    object.url = message.url;
                    if (options.oneofs) object._url = "url";
                }
                return object;
            };
            InThreadSurveyPrivacyStatementPart.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            InThreadSurveyPrivacyStatementPart.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart"
                );
            };
            return InThreadSurveyPrivacyStatementPart;
        })();
        InThreadSurveyMetadata.InThreadSurveyQuestion = (function () {
            function InThreadSurveyQuestion(properties) {
                this.questionOptions = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            InThreadSurveyQuestion.prototype.questionText = null;
            InThreadSurveyQuestion.prototype.questionId = null;
            InThreadSurveyQuestion.prototype.questionOptions = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionText", {
                get: $util.oneOfGetter(($oneOfFields = ["questionText"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionId", {
                get: $util.oneOfGetter(($oneOfFields = ["questionId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            InThreadSurveyQuestion.create = function create(properties) {
                return new InThreadSurveyQuestion(properties);
            };
            InThreadSurveyQuestion.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.questionText != null &&
                    Object.hasOwnProperty.call(message, "questionText")
                )
                    writer.uint32(10).string(message.questionText);
                if (message.questionId != null && Object.hasOwnProperty.call(message, "questionId"))
                    writer.uint32(18).string(message.questionId);
                if (message.questionOptions != null && message.questionOptions.length)
                    for (var i = 0; i < message.questionOptions.length; ++i)
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.encode(
                            message.questionOptions[i],
                            writer.uint32(26).fork()
                        ).ldelim();
                return writer;
            };
            InThreadSurveyQuestion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            InThreadSurveyQuestion.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.questionText = reader.string();
                            break;
                        }
                        case 2: {
                            message.questionId = reader.string();
                            break;
                        }
                        case 3: {
                            if (!(message.questionOptions && message.questionOptions.length))
                                message.questionOptions = [];
                            message.questionOptions.push(
                                $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.decode(
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
            InThreadSurveyQuestion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            InThreadSurveyQuestion.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.questionText != null && message.hasOwnProperty("questionText")) {
                    properties._questionText = 1;
                    if (!$util.isString(message.questionText))
                        return "questionText: string expected";
                }
                if (message.questionId != null && message.hasOwnProperty("questionId")) {
                    properties._questionId = 1;
                    if (!$util.isString(message.questionId)) return "questionId: string expected";
                }
                if (message.questionOptions != null && message.hasOwnProperty("questionOptions")) {
                    if (!Array.isArray(message.questionOptions))
                        return "questionOptions: array expected";
                    for (var i = 0; i < message.questionOptions.length; ++i) {
                        var error =
                            $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.verify(
                                message.questionOptions[i]
                            );
                        if (error) return "questionOptions." + error;
                    }
                }
                return null;
            };
            InThreadSurveyQuestion.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion)
                    return object;
                var message = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion();
                if (object.questionText != null) message.questionText = String(object.questionText);
                if (object.questionId != null) message.questionId = String(object.questionId);
                if (object.questionOptions) {
                    if (!Array.isArray(object.questionOptions))
                        throw TypeError(
                            ".AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: array expected"
                        );
                    message.questionOptions = [];
                    for (var i = 0; i < object.questionOptions.length; ++i) {
                        if (typeof object.questionOptions[i] !== "object")
                            throw TypeError(
                                ".AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: object expected"
                            );
                        message.questionOptions[i] =
                            $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.fromObject(
                                object.questionOptions[i]
                            );
                    }
                }
                return message;
            };
            InThreadSurveyQuestion.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.questionOptions = [];
                if (message.questionText != null && message.hasOwnProperty("questionText")) {
                    object.questionText = message.questionText;
                    if (options.oneofs) object._questionText = "questionText";
                }
                if (message.questionId != null && message.hasOwnProperty("questionId")) {
                    object.questionId = message.questionId;
                    if (options.oneofs) object._questionId = "questionId";
                }
                if (message.questionOptions && message.questionOptions.length) {
                    object.questionOptions = [];
                    for (var j = 0; j < message.questionOptions.length; ++j)
                        object.questionOptions[j] =
                            $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.toObject(
                                message.questionOptions[j],
                                options
                            );
                }
                return object;
            };
            InThreadSurveyQuestion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            InThreadSurveyQuestion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion";
            };
            return InThreadSurveyQuestion;
        })();
        return InThreadSurveyMetadata;
    })();
    AICommon.BotSourcesMetadata = (function () {
        function BotSourcesMetadata(properties) {
            this.sources = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotSourcesMetadata.prototype.sources = $util.emptyArray;
        BotSourcesMetadata.create = function create(properties) {
            return new BotSourcesMetadata(properties);
        };
        BotSourcesMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.sources != null && message.sources.length)
                for (var i = 0; i < message.sources.length; ++i)
                    $root.AICommon.BotSourcesMetadata.BotSourceItem.encode(
                        message.sources[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotSourcesMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotSourcesMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotSourcesMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.sources && message.sources.length)) message.sources = [];
                        message.sources.push(
                            $root.AICommon.BotSourcesMetadata.BotSourceItem.decode(
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
        BotSourcesMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotSourcesMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.sources != null && message.hasOwnProperty("sources")) {
                if (!Array.isArray(message.sources)) return "sources: array expected";
                for (var i = 0; i < message.sources.length; ++i) {
                    var error = $root.AICommon.BotSourcesMetadata.BotSourceItem.verify(
                        message.sources[i]
                    );
                    if (error) return "sources." + error;
                }
            }
            return null;
        };
        BotSourcesMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotSourcesMetadata) return object;
            var message = new $root.AICommon.BotSourcesMetadata();
            if (object.sources) {
                if (!Array.isArray(object.sources))
                    throw TypeError(".AICommon.BotSourcesMetadata.sources: array expected");
                message.sources = [];
                for (var i = 0; i < object.sources.length; ++i) {
                    if (typeof object.sources[i] !== "object")
                        throw TypeError(".AICommon.BotSourcesMetadata.sources: object expected");
                    message.sources[i] = $root.AICommon.BotSourcesMetadata.BotSourceItem.fromObject(
                        object.sources[i]
                    );
                }
            }
            return message;
        };
        BotSourcesMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.sources = [];
            if (message.sources && message.sources.length) {
                object.sources = [];
                for (var j = 0; j < message.sources.length; ++j)
                    object.sources[j] = $root.AICommon.BotSourcesMetadata.BotSourceItem.toObject(
                        message.sources[j],
                        options
                    );
            }
            return object;
        };
        BotSourcesMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotSourcesMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotSourcesMetadata";
        };
        BotSourcesMetadata.BotSourceItem = (function () {
            function BotSourceItem(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BotSourceItem.prototype.provider = null;
            BotSourceItem.prototype.thumbnailCdnUrl = null;
            BotSourceItem.prototype.sourceProviderUrl = null;
            BotSourceItem.prototype.sourceQuery = null;
            BotSourceItem.prototype.faviconCdnUrl = null;
            BotSourceItem.prototype.citationNumber = null;
            BotSourceItem.prototype.sourceTitle = null;
            var $oneOfFields;
            Object.defineProperty(BotSourceItem.prototype, "_provider", {
                get: $util.oneOfGetter(($oneOfFields = ["provider"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_thumbnailCdnUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["thumbnailCdnUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_sourceProviderUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["sourceProviderUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_sourceQuery", {
                get: $util.oneOfGetter(($oneOfFields = ["sourceQuery"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_faviconCdnUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["faviconCdnUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_citationNumber", {
                get: $util.oneOfGetter(($oneOfFields = ["citationNumber"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotSourceItem.prototype, "_sourceTitle", {
                get: $util.oneOfGetter(($oneOfFields = ["sourceTitle"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BotSourceItem.create = function create(properties) {
                return new BotSourceItem(properties);
            };
            BotSourceItem.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.provider != null && Object.hasOwnProperty.call(message, "provider"))
                    writer.uint32(8).int32(message.provider);
                if (
                    message.thumbnailCdnUrl != null &&
                    Object.hasOwnProperty.call(message, "thumbnailCdnUrl")
                )
                    writer.uint32(18).string(message.thumbnailCdnUrl);
                if (
                    message.sourceProviderUrl != null &&
                    Object.hasOwnProperty.call(message, "sourceProviderUrl")
                )
                    writer.uint32(26).string(message.sourceProviderUrl);
                if (
                    message.sourceQuery != null &&
                    Object.hasOwnProperty.call(message, "sourceQuery")
                )
                    writer.uint32(34).string(message.sourceQuery);
                if (
                    message.faviconCdnUrl != null &&
                    Object.hasOwnProperty.call(message, "faviconCdnUrl")
                )
                    writer.uint32(42).string(message.faviconCdnUrl);
                if (
                    message.citationNumber != null &&
                    Object.hasOwnProperty.call(message, "citationNumber")
                )
                    writer.uint32(48).uint32(message.citationNumber);
                if (
                    message.sourceTitle != null &&
                    Object.hasOwnProperty.call(message, "sourceTitle")
                )
                    writer.uint32(58).string(message.sourceTitle);
                return writer;
            };
            BotSourceItem.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BotSourceItem.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotSourcesMetadata.BotSourceItem();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.provider = reader.int32();
                            break;
                        }
                        case 2: {
                            message.thumbnailCdnUrl = reader.string();
                            break;
                        }
                        case 3: {
                            message.sourceProviderUrl = reader.string();
                            break;
                        }
                        case 4: {
                            message.sourceQuery = reader.string();
                            break;
                        }
                        case 5: {
                            message.faviconCdnUrl = reader.string();
                            break;
                        }
                        case 6: {
                            message.citationNumber = reader.uint32();
                            break;
                        }
                        case 7: {
                            message.sourceTitle = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BotSourceItem.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BotSourceItem.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.provider != null && message.hasOwnProperty("provider")) {
                    properties._provider = 1;
                    switch (message.provider) {
                        default:
                            return "provider: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                    }
                }
                if (message.thumbnailCdnUrl != null && message.hasOwnProperty("thumbnailCdnUrl")) {
                    properties._thumbnailCdnUrl = 1;
                    if (!$util.isString(message.thumbnailCdnUrl))
                        return "thumbnailCdnUrl: string expected";
                }
                if (
                    message.sourceProviderUrl != null &&
                    message.hasOwnProperty("sourceProviderUrl")
                ) {
                    properties._sourceProviderUrl = 1;
                    if (!$util.isString(message.sourceProviderUrl))
                        return "sourceProviderUrl: string expected";
                }
                if (message.sourceQuery != null && message.hasOwnProperty("sourceQuery")) {
                    properties._sourceQuery = 1;
                    if (!$util.isString(message.sourceQuery)) return "sourceQuery: string expected";
                }
                if (message.faviconCdnUrl != null && message.hasOwnProperty("faviconCdnUrl")) {
                    properties._faviconCdnUrl = 1;
                    if (!$util.isString(message.faviconCdnUrl))
                        return "faviconCdnUrl: string expected";
                }
                if (message.citationNumber != null && message.hasOwnProperty("citationNumber")) {
                    properties._citationNumber = 1;
                    if (!$util.isInteger(message.citationNumber))
                        return "citationNumber: integer expected";
                }
                if (message.sourceTitle != null && message.hasOwnProperty("sourceTitle")) {
                    properties._sourceTitle = 1;
                    if (!$util.isString(message.sourceTitle)) return "sourceTitle: string expected";
                }
                return null;
            };
            BotSourceItem.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.BotSourcesMetadata.BotSourceItem)
                    return object;
                var message = new $root.AICommon.BotSourcesMetadata.BotSourceItem();
                switch (object.provider) {
                    default:
                        if (typeof object.provider === "number") {
                            message.provider = object.provider;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.provider = 0;
                        break;
                    case "BING":
                    case 1:
                        message.provider = 1;
                        break;
                    case "GOOGLE":
                    case 2:
                        message.provider = 2;
                        break;
                    case "SUPPORT":
                    case 3:
                        message.provider = 3;
                        break;
                    case "OTHER":
                    case 4:
                        message.provider = 4;
                        break;
                }
                if (object.thumbnailCdnUrl != null)
                    message.thumbnailCdnUrl = String(object.thumbnailCdnUrl);
                if (object.sourceProviderUrl != null)
                    message.sourceProviderUrl = String(object.sourceProviderUrl);
                if (object.sourceQuery != null) message.sourceQuery = String(object.sourceQuery);
                if (object.faviconCdnUrl != null)
                    message.faviconCdnUrl = String(object.faviconCdnUrl);
                if (object.citationNumber != null)
                    message.citationNumber = object.citationNumber >>> 0;
                if (object.sourceTitle != null) message.sourceTitle = String(object.sourceTitle);
                return message;
            };
            BotSourceItem.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.provider != null && message.hasOwnProperty("provider")) {
                    object.provider =
                        options.enums === String
                            ? $root.AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider[
                                  message.provider
                              ] === undefined
                                ? message.provider
                                : $root.AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider[
                                      message.provider
                                  ]
                            : message.provider;
                    if (options.oneofs) object._provider = "provider";
                }
                if (message.thumbnailCdnUrl != null && message.hasOwnProperty("thumbnailCdnUrl")) {
                    object.thumbnailCdnUrl = message.thumbnailCdnUrl;
                    if (options.oneofs) object._thumbnailCdnUrl = "thumbnailCdnUrl";
                }
                if (
                    message.sourceProviderUrl != null &&
                    message.hasOwnProperty("sourceProviderUrl")
                ) {
                    object.sourceProviderUrl = message.sourceProviderUrl;
                    if (options.oneofs) object._sourceProviderUrl = "sourceProviderUrl";
                }
                if (message.sourceQuery != null && message.hasOwnProperty("sourceQuery")) {
                    object.sourceQuery = message.sourceQuery;
                    if (options.oneofs) object._sourceQuery = "sourceQuery";
                }
                if (message.faviconCdnUrl != null && message.hasOwnProperty("faviconCdnUrl")) {
                    object.faviconCdnUrl = message.faviconCdnUrl;
                    if (options.oneofs) object._faviconCdnUrl = "faviconCdnUrl";
                }
                if (message.citationNumber != null && message.hasOwnProperty("citationNumber")) {
                    object.citationNumber = message.citationNumber;
                    if (options.oneofs) object._citationNumber = "citationNumber";
                }
                if (message.sourceTitle != null && message.hasOwnProperty("sourceTitle")) {
                    object.sourceTitle = message.sourceTitle;
                    if (options.oneofs) object._sourceTitle = "sourceTitle";
                }
                return object;
            };
            BotSourceItem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BotSourceItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotSourcesMetadata.BotSourceItem";
            };
            BotSourceItem.SourceProvider = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "BING")] = 1;
                values[(valuesById[2] = "GOOGLE")] = 2;
                values[(valuesById[3] = "SUPPORT")] = 3;
                values[(valuesById[4] = "OTHER")] = 4;
                return values;
            })();
            return BotSourceItem;
        })();
        return BotSourcesMetadata;
    })();
    AICommon.BotAgeCollectionMetadata = (function () {
        function BotAgeCollectionMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotAgeCollectionMetadata.prototype.ageCollectionEligible = null;
        BotAgeCollectionMetadata.prototype.shouldTriggerAgeCollectionOnClient = null;
        BotAgeCollectionMetadata.prototype.ageCollectionType = null;
        var $oneOfFields;
        Object.defineProperty(BotAgeCollectionMetadata.prototype, "_ageCollectionEligible", {
            get: $util.oneOfGetter(($oneOfFields = ["ageCollectionEligible"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(
            BotAgeCollectionMetadata.prototype,
            "_shouldTriggerAgeCollectionOnClient",
            {
                get: $util.oneOfGetter(($oneOfFields = ["shouldTriggerAgeCollectionOnClient"])),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        Object.defineProperty(BotAgeCollectionMetadata.prototype, "_ageCollectionType", {
            get: $util.oneOfGetter(($oneOfFields = ["ageCollectionType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotAgeCollectionMetadata.create = function create(properties) {
            return new BotAgeCollectionMetadata(properties);
        };
        BotAgeCollectionMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.ageCollectionEligible != null &&
                Object.hasOwnProperty.call(message, "ageCollectionEligible")
            )
                writer.uint32(8).bool(message.ageCollectionEligible);
            if (
                message.shouldTriggerAgeCollectionOnClient != null &&
                Object.hasOwnProperty.call(message, "shouldTriggerAgeCollectionOnClient")
            )
                writer.uint32(16).bool(message.shouldTriggerAgeCollectionOnClient);
            if (
                message.ageCollectionType != null &&
                Object.hasOwnProperty.call(message, "ageCollectionType")
            )
                writer.uint32(24).int32(message.ageCollectionType);
            return writer;
        };
        BotAgeCollectionMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotAgeCollectionMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotAgeCollectionMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.ageCollectionEligible = reader.bool();
                        break;
                    }
                    case 2: {
                        message.shouldTriggerAgeCollectionOnClient = reader.bool();
                        break;
                    }
                    case 3: {
                        message.ageCollectionType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotAgeCollectionMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotAgeCollectionMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.ageCollectionEligible != null &&
                message.hasOwnProperty("ageCollectionEligible")
            ) {
                properties._ageCollectionEligible = 1;
                if (typeof message.ageCollectionEligible !== "boolean")
                    return "ageCollectionEligible: boolean expected";
            }
            if (
                message.shouldTriggerAgeCollectionOnClient != null &&
                message.hasOwnProperty("shouldTriggerAgeCollectionOnClient")
            ) {
                properties._shouldTriggerAgeCollectionOnClient = 1;
                if (typeof message.shouldTriggerAgeCollectionOnClient !== "boolean")
                    return "shouldTriggerAgeCollectionOnClient: boolean expected";
            }
            if (message.ageCollectionType != null && message.hasOwnProperty("ageCollectionType")) {
                properties._ageCollectionType = 1;
                switch (message.ageCollectionType) {
                    default:
                        return "ageCollectionType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        BotAgeCollectionMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotAgeCollectionMetadata) return object;
            var message = new $root.AICommon.BotAgeCollectionMetadata();
            if (object.ageCollectionEligible != null)
                message.ageCollectionEligible = Boolean(object.ageCollectionEligible);
            if (object.shouldTriggerAgeCollectionOnClient != null)
                message.shouldTriggerAgeCollectionOnClient = Boolean(
                    object.shouldTriggerAgeCollectionOnClient
                );
            switch (object.ageCollectionType) {
                default:
                    if (typeof object.ageCollectionType === "number") {
                        message.ageCollectionType = object.ageCollectionType;
                        break;
                    }
                    break;
                case "O18_BINARY":
                case 0:
                    message.ageCollectionType = 0;
                    break;
                case "WAFFLE":
                case 1:
                    message.ageCollectionType = 1;
                    break;
            }
            return message;
        };
        BotAgeCollectionMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.ageCollectionEligible != null &&
                message.hasOwnProperty("ageCollectionEligible")
            ) {
                object.ageCollectionEligible = message.ageCollectionEligible;
                if (options.oneofs) object._ageCollectionEligible = "ageCollectionEligible";
            }
            if (
                message.shouldTriggerAgeCollectionOnClient != null &&
                message.hasOwnProperty("shouldTriggerAgeCollectionOnClient")
            ) {
                object.shouldTriggerAgeCollectionOnClient =
                    message.shouldTriggerAgeCollectionOnClient;
                if (options.oneofs)
                    object._shouldTriggerAgeCollectionOnClient =
                        "shouldTriggerAgeCollectionOnClient";
            }
            if (message.ageCollectionType != null && message.hasOwnProperty("ageCollectionType")) {
                object.ageCollectionType =
                    options.enums === String
                        ? $root.AICommon.BotAgeCollectionMetadata.AgeCollectionType[
                              message.ageCollectionType
                          ] === undefined
                            ? message.ageCollectionType
                            : $root.AICommon.BotAgeCollectionMetadata.AgeCollectionType[
                                  message.ageCollectionType
                              ]
                        : message.ageCollectionType;
                if (options.oneofs) object._ageCollectionType = "ageCollectionType";
            }
            return object;
        };
        BotAgeCollectionMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotAgeCollectionMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotAgeCollectionMetadata";
        };
        BotAgeCollectionMetadata.AgeCollectionType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "O18_BINARY")] = 0;
            values[(valuesById[1] = "WAFFLE")] = 1;
            return values;
        })();
        return BotAgeCollectionMetadata;
    })();
    AICommon.BotImagineMetadata = (function () {
        function BotImagineMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotImagineMetadata.prototype.imagineType = null;
        var $oneOfFields;
        Object.defineProperty(BotImagineMetadata.prototype, "_imagineType", {
            get: $util.oneOfGetter(($oneOfFields = ["imagineType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotImagineMetadata.create = function create(properties) {
            return new BotImagineMetadata(properties);
        };
        BotImagineMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.imagineType != null && Object.hasOwnProperty.call(message, "imagineType"))
                writer.uint32(8).int32(message.imagineType);
            return writer;
        };
        BotImagineMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotImagineMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotImagineMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.imagineType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotImagineMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotImagineMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.imagineType != null && message.hasOwnProperty("imagineType")) {
                properties._imagineType = 1;
                switch (message.imagineType) {
                    default:
                        return "imagineType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                }
            }
            return null;
        };
        BotImagineMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotImagineMetadata) return object;
            var message = new $root.AICommon.BotImagineMetadata();
            switch (object.imagineType) {
                default:
                    if (typeof object.imagineType === "number") {
                        message.imagineType = object.imagineType;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.imagineType = 0;
                    break;
                case "IMAGINE":
                case 1:
                    message.imagineType = 1;
                    break;
                case "MEMU":
                case 2:
                    message.imagineType = 2;
                    break;
                case "FLASH":
                case 3:
                    message.imagineType = 3;
                    break;
                case "EDIT":
                case 4:
                    message.imagineType = 4;
                    break;
            }
            return message;
        };
        BotImagineMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.imagineType != null && message.hasOwnProperty("imagineType")) {
                object.imagineType =
                    options.enums === String
                        ? $root.AICommon.BotImagineMetadata.ImagineType[message.imagineType] ===
                          undefined
                            ? message.imagineType
                            : $root.AICommon.BotImagineMetadata.ImagineType[message.imagineType]
                        : message.imagineType;
                if (options.oneofs) object._imagineType = "imagineType";
            }
            return object;
        };
        BotImagineMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotImagineMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotImagineMetadata";
        };
        BotImagineMetadata.ImagineType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "IMAGINE")] = 1;
            values[(valuesById[2] = "MEMU")] = 2;
            values[(valuesById[3] = "FLASH")] = 3;
            values[(valuesById[4] = "EDIT")] = 4;
            return values;
        })();
        return BotImagineMetadata;
    })();
    AICommon.BotQuotaMetadata = (function () {
        function BotQuotaMetadata(properties) {
            this.botFeatureQuotaMetadata = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotQuotaMetadata.prototype.botFeatureQuotaMetadata = $util.emptyArray;
        BotQuotaMetadata.create = function create(properties) {
            return new BotQuotaMetadata(properties);
        };
        BotQuotaMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.botFeatureQuotaMetadata != null && message.botFeatureQuotaMetadata.length)
                for (var i = 0; i < message.botFeatureQuotaMetadata.length; ++i)
                    $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.encode(
                        message.botFeatureQuotaMetadata[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotQuotaMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotQuotaMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotQuotaMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (
                            !(
                                message.botFeatureQuotaMetadata &&
                                message.botFeatureQuotaMetadata.length
                            )
                        )
                            message.botFeatureQuotaMetadata = [];
                        message.botFeatureQuotaMetadata.push(
                            $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.decode(
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
        BotQuotaMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotQuotaMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (
                message.botFeatureQuotaMetadata != null &&
                message.hasOwnProperty("botFeatureQuotaMetadata")
            ) {
                if (!Array.isArray(message.botFeatureQuotaMetadata))
                    return "botFeatureQuotaMetadata: array expected";
                for (var i = 0; i < message.botFeatureQuotaMetadata.length; ++i) {
                    var error = $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.verify(
                        message.botFeatureQuotaMetadata[i]
                    );
                    if (error) return "botFeatureQuotaMetadata." + error;
                }
            }
            return null;
        };
        BotQuotaMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotQuotaMetadata) return object;
            var message = new $root.AICommon.BotQuotaMetadata();
            if (object.botFeatureQuotaMetadata) {
                if (!Array.isArray(object.botFeatureQuotaMetadata))
                    throw TypeError(
                        ".AICommon.BotQuotaMetadata.botFeatureQuotaMetadata: array expected"
                    );
                message.botFeatureQuotaMetadata = [];
                for (var i = 0; i < object.botFeatureQuotaMetadata.length; ++i) {
                    if (typeof object.botFeatureQuotaMetadata[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotQuotaMetadata.botFeatureQuotaMetadata: object expected"
                        );
                    message.botFeatureQuotaMetadata[i] =
                        $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.fromObject(
                            object.botFeatureQuotaMetadata[i]
                        );
                }
            }
            return message;
        };
        BotQuotaMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.botFeatureQuotaMetadata = [];
            if (message.botFeatureQuotaMetadata && message.botFeatureQuotaMetadata.length) {
                object.botFeatureQuotaMetadata = [];
                for (var j = 0; j < message.botFeatureQuotaMetadata.length; ++j)
                    object.botFeatureQuotaMetadata[j] =
                        $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.toObject(
                            message.botFeatureQuotaMetadata[j],
                            options
                        );
            }
            return object;
        };
        BotQuotaMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotQuotaMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotQuotaMetadata";
        };
        BotQuotaMetadata.BotFeatureQuotaMetadata = (function () {
            function BotFeatureQuotaMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BotFeatureQuotaMetadata.prototype.featureType = null;
            BotFeatureQuotaMetadata.prototype.remainingQuota = null;
            BotFeatureQuotaMetadata.prototype.expirationTimestamp = null;
            var $oneOfFields;
            Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_featureType", {
                get: $util.oneOfGetter(($oneOfFields = ["featureType"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_remainingQuota", {
                get: $util.oneOfGetter(($oneOfFields = ["remainingQuota"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_expirationTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["expirationTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BotFeatureQuotaMetadata.create = function create(properties) {
                return new BotFeatureQuotaMetadata(properties);
            };
            BotFeatureQuotaMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.featureType != null &&
                    Object.hasOwnProperty.call(message, "featureType")
                )
                    writer.uint32(8).int32(message.featureType);
                if (
                    message.remainingQuota != null &&
                    Object.hasOwnProperty.call(message, "remainingQuota")
                )
                    writer.uint32(16).uint32(message.remainingQuota);
                if (
                    message.expirationTimestamp != null &&
                    Object.hasOwnProperty.call(message, "expirationTimestamp")
                )
                    writer.uint32(24).uint64(message.expirationTimestamp);
                return writer;
            };
            BotFeatureQuotaMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BotFeatureQuotaMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.featureType = reader.int32();
                            break;
                        }
                        case 2: {
                            message.remainingQuota = reader.uint32();
                            break;
                        }
                        case 3: {
                            message.expirationTimestamp = reader.uint64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BotFeatureQuotaMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BotFeatureQuotaMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.featureType != null && message.hasOwnProperty("featureType")) {
                    properties._featureType = 1;
                    switch (message.featureType) {
                        default:
                            return "featureType: enum value expected";
                        case 0:
                        case 1:
                            break;
                    }
                }
                if (message.remainingQuota != null && message.hasOwnProperty("remainingQuota")) {
                    properties._remainingQuota = 1;
                    if (!$util.isInteger(message.remainingQuota))
                        return "remainingQuota: integer expected";
                }
                if (
                    message.expirationTimestamp != null &&
                    message.hasOwnProperty("expirationTimestamp")
                ) {
                    properties._expirationTimestamp = 1;
                    if (
                        !$util.isInteger(message.expirationTimestamp) &&
                        !(
                            message.expirationTimestamp &&
                            $util.isInteger(message.expirationTimestamp.low) &&
                            $util.isInteger(message.expirationTimestamp.high)
                        )
                    )
                        return "expirationTimestamp: integer|Long expected";
                }
                return null;
            };
            BotFeatureQuotaMetadata.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata)
                    return object;
                var message = new $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata();
                switch (object.featureType) {
                    default:
                        if (typeof object.featureType === "number") {
                            message.featureType = object.featureType;
                            break;
                        }
                        break;
                    case "UNKNOWN_FEATURE":
                    case 0:
                        message.featureType = 0;
                        break;
                    case "REASONING_FEATURE":
                    case 1:
                        message.featureType = 1;
                        break;
                }
                if (object.remainingQuota != null)
                    message.remainingQuota = object.remainingQuota >>> 0;
                if (object.expirationTimestamp != null)
                    if ($util.Long)
                        (message.expirationTimestamp = $util.Long.fromValue(
                            object.expirationTimestamp
                        )).unsigned = true;
                    else if (typeof object.expirationTimestamp === "string")
                        message.expirationTimestamp = parseInt(object.expirationTimestamp, 10);
                    else if (typeof object.expirationTimestamp === "number")
                        message.expirationTimestamp = object.expirationTimestamp;
                    else if (typeof object.expirationTimestamp === "object")
                        message.expirationTimestamp = new $util.LongBits(
                            object.expirationTimestamp.low >>> 0,
                            object.expirationTimestamp.high >>> 0
                        ).toNumber(true);
                return message;
            };
            BotFeatureQuotaMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.featureType != null && message.hasOwnProperty("featureType")) {
                    object.featureType =
                        options.enums === String
                            ? $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata
                                  .BotFeatureType[message.featureType] === undefined
                                ? message.featureType
                                : $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata
                                      .BotFeatureType[message.featureType]
                            : message.featureType;
                    if (options.oneofs) object._featureType = "featureType";
                }
                if (message.remainingQuota != null && message.hasOwnProperty("remainingQuota")) {
                    object.remainingQuota = message.remainingQuota;
                    if (options.oneofs) object._remainingQuota = "remainingQuota";
                }
                if (
                    message.expirationTimestamp != null &&
                    message.hasOwnProperty("expirationTimestamp")
                ) {
                    if (typeof message.expirationTimestamp === "number")
                        object.expirationTimestamp =
                            options.longs === String
                                ? String(message.expirationTimestamp)
                                : message.expirationTimestamp;
                    else
                        object.expirationTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.expirationTimestamp)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.expirationTimestamp.low >>> 0,
                                        message.expirationTimestamp.high >>> 0
                                    ).toNumber(true)
                                  : message.expirationTimestamp;
                    if (options.oneofs) object._expirationTimestamp = "expirationTimestamp";
                }
                return object;
            };
            BotFeatureQuotaMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BotFeatureQuotaMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata";
            };
            BotFeatureQuotaMetadata.BotFeatureType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN_FEATURE")] = 0;
                values[(valuesById[1] = "REASONING_FEATURE")] = 1;
                return values;
            })();
            return BotFeatureQuotaMetadata;
        })();
        return BotQuotaMetadata;
    })();
    AICommon.BotModeSelectionMetadata = (function () {
        function BotModeSelectionMetadata(properties) {
            this.mode = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotModeSelectionMetadata.prototype.mode = $util.emptyArray;
        BotModeSelectionMetadata.create = function create(properties) {
            return new BotModeSelectionMetadata(properties);
        };
        BotModeSelectionMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.mode != null && message.mode.length) {
                writer.uint32(10).fork();
                for (var i = 0; i < message.mode.length; ++i) writer.int32(message.mode[i]);
                writer.ldelim();
            }
            return writer;
        };
        BotModeSelectionMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotModeSelectionMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotModeSelectionMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.mode && message.mode.length)) message.mode = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) message.mode.push(reader.int32());
                        } else message.mode.push(reader.int32());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotModeSelectionMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotModeSelectionMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode")) {
                if (!Array.isArray(message.mode)) return "mode: array expected";
                for (var i = 0; i < message.mode.length; ++i)
                    switch (message.mode[i]) {
                        default:
                            return "mode: enum value[] expected";
                        case 0:
                        case 1:
                            break;
                    }
            }
            return null;
        };
        BotModeSelectionMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotModeSelectionMetadata) return object;
            var message = new $root.AICommon.BotModeSelectionMetadata();
            if (object.mode) {
                if (!Array.isArray(object.mode))
                    throw TypeError(".AICommon.BotModeSelectionMetadata.mode: array expected");
                message.mode = [];
                for (var i = 0; i < object.mode.length; ++i)
                    switch (object.mode[i]) {
                        default:
                            if (typeof object.mode[i] === "number") {
                                message.mode[i] = object.mode[i];
                                break;
                            }
                        case "UNKNOWN_MODE":
                        case 0:
                            message.mode[i] = 0;
                            break;
                        case "REASONING_MODE":
                        case 1:
                            message.mode[i] = 1;
                            break;
                    }
            }
            return message;
        };
        BotModeSelectionMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.mode = [];
            if (message.mode && message.mode.length) {
                object.mode = [];
                for (var j = 0; j < message.mode.length; ++j)
                    object.mode[j] =
                        options.enums === String
                            ? $root.AICommon.BotModeSelectionMetadata.BotUserSelectionMode[
                                  message.mode[j]
                              ] === undefined
                                ? message.mode[j]
                                : $root.AICommon.BotModeSelectionMetadata.BotUserSelectionMode[
                                      message.mode[j]
                                  ]
                            : message.mode[j];
            }
            return object;
        };
        BotModeSelectionMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotModeSelectionMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotModeSelectionMetadata";
        };
        BotModeSelectionMetadata.BotUserSelectionMode = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN_MODE")] = 0;
            values[(valuesById[1] = "REASONING_MODE")] = 1;
            return values;
        })();
        return BotModeSelectionMetadata;
    })();
    AICommon.BotCapabilityMetadata = (function () {
        function BotCapabilityMetadata(properties) {
            this.capabilities = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotCapabilityMetadata.prototype.capabilities = $util.emptyArray;
        BotCapabilityMetadata.create = function create(properties) {
            return new BotCapabilityMetadata(properties);
        };
        BotCapabilityMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.capabilities != null && message.capabilities.length) {
                writer.uint32(10).fork();
                for (var i = 0; i < message.capabilities.length; ++i)
                    writer.int32(message.capabilities[i]);
                writer.ldelim();
            }
            return writer;
        };
        BotCapabilityMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotCapabilityMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotCapabilityMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.capabilities && message.capabilities.length))
                            message.capabilities = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) message.capabilities.push(reader.int32());
                        } else message.capabilities.push(reader.int32());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotCapabilityMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotCapabilityMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.capabilities != null && message.hasOwnProperty("capabilities")) {
                if (!Array.isArray(message.capabilities)) return "capabilities: array expected";
                for (var i = 0; i < message.capabilities.length; ++i)
                    switch (message.capabilities[i]) {
                        default:
                            return "capabilities: enum value[] expected";
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
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                        case 48:
                        case 49:
                            break;
                    }
            }
            return null;
        };
        BotCapabilityMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotCapabilityMetadata) return object;
            var message = new $root.AICommon.BotCapabilityMetadata();
            if (object.capabilities) {
                if (!Array.isArray(object.capabilities))
                    throw TypeError(".AICommon.BotCapabilityMetadata.capabilities: array expected");
                message.capabilities = [];
                for (var i = 0; i < object.capabilities.length; ++i)
                    switch (object.capabilities[i]) {
                        default:
                            if (typeof object.capabilities[i] === "number") {
                                message.capabilities[i] = object.capabilities[i];
                                break;
                            }
                        case "UNKNOWN":
                        case 0:
                            message.capabilities[i] = 0;
                            break;
                        case "PROGRESS_INDICATOR":
                        case 1:
                            message.capabilities[i] = 1;
                            break;
                        case "RICH_RESPONSE_HEADING":
                        case 2:
                            message.capabilities[i] = 2;
                            break;
                        case "RICH_RESPONSE_NESTED_LIST":
                        case 3:
                            message.capabilities[i] = 3;
                            break;
                        case "AI_MEMORY":
                        case 4:
                            message.capabilities[i] = 4;
                            break;
                        case "RICH_RESPONSE_THREAD_SURFING":
                        case 5:
                            message.capabilities[i] = 5;
                            break;
                        case "RICH_RESPONSE_TABLE":
                        case 6:
                            message.capabilities[i] = 6;
                            break;
                        case "RICH_RESPONSE_CODE":
                        case 7:
                            message.capabilities[i] = 7;
                            break;
                        case "RICH_RESPONSE_STRUCTURED_RESPONSE":
                        case 8:
                            message.capabilities[i] = 8;
                            break;
                        case "RICH_RESPONSE_INLINE_IMAGE":
                        case 9:
                            message.capabilities[i] = 9;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_CONTROL":
                        case 10:
                            message.capabilities[i] = 10;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_1":
                        case 11:
                            message.capabilities[i] = 11;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_2":
                        case 12:
                            message.capabilities[i] = 12;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_3":
                        case 13:
                            message.capabilities[i] = 13;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_4":
                        case 14:
                            message.capabilities[i] = 14;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_5":
                        case 15:
                            message.capabilities[i] = 15;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_6":
                        case 16:
                            message.capabilities[i] = 16;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_7":
                        case 17:
                            message.capabilities[i] = 17;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_8":
                        case 18:
                            message.capabilities[i] = 18;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_9":
                        case 19:
                            message.capabilities[i] = 19;
                            break;
                        case "WA_IG_1P_PLUGIN_RANKING_UPDATE_10":
                        case 20:
                            message.capabilities[i] = 20;
                            break;
                        case "RICH_RESPONSE_SUB_HEADING":
                        case 21:
                            message.capabilities[i] = 21;
                            break;
                        case "RICH_RESPONSE_GRID_IMAGE":
                        case 22:
                            message.capabilities[i] = 22;
                            break;
                        case "AI_STUDIO_UGC_MEMORY":
                        case 23:
                            message.capabilities[i] = 23;
                            break;
                        case "RICH_RESPONSE_LATEX":
                        case 24:
                            message.capabilities[i] = 24;
                            break;
                        case "RICH_RESPONSE_MAPS":
                        case 25:
                            message.capabilities[i] = 25;
                            break;
                        case "RICH_RESPONSE_INLINE_REELS":
                        case 26:
                            message.capabilities[i] = 26;
                            break;
                        case "AGENTIC_PLANNING":
                        case 27:
                            message.capabilities[i] = 27;
                            break;
                        case "ACCOUNT_LINKING":
                        case 28:
                            message.capabilities[i] = 28;
                            break;
                        case "STREAMING_DISAGGREGATION":
                        case 29:
                            message.capabilities[i] = 29;
                            break;
                        case "RICH_RESPONSE_GRID_IMAGE_3P":
                        case 30:
                            message.capabilities[i] = 30;
                            break;
                        case "RICH_RESPONSE_LATEX_INLINE":
                        case 31:
                            message.capabilities[i] = 31;
                            break;
                        case "QUERY_PLAN":
                        case 32:
                            message.capabilities[i] = 32;
                            break;
                        case "PROACTIVE_MESSAGE":
                        case 33:
                            message.capabilities[i] = 33;
                            break;
                        case "RICH_RESPONSE_UNIFIED_RESPONSE":
                        case 34:
                            message.capabilities[i] = 34;
                            break;
                        case "PROMOTION_MESSAGE":
                        case 35:
                            message.capabilities[i] = 35;
                            break;
                        case "SIMPLIFIED_PROFILE_PAGE":
                        case 36:
                            message.capabilities[i] = 36;
                            break;
                        case "RICH_RESPONSE_SOURCES_IN_MESSAGE":
                        case 37:
                            message.capabilities[i] = 37;
                            break;
                        case "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY":
                        case 38:
                            message.capabilities[i] = 38;
                            break;
                        case "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT":
                        case 39:
                            message.capabilities[i] = 39;
                            break;
                        case "AI_SHARED_MEMORY":
                        case 40:
                            message.capabilities[i] = 40;
                            break;
                        case "RICH_RESPONSE_UNIFIED_SOURCES":
                        case 41:
                            message.capabilities[i] = 41;
                            break;
                        case "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS":
                        case 42:
                            message.capabilities[i] = 42;
                            break;
                        case "RICH_RESPONSE_UR_INLINE_REELS_ENABLED":
                        case 43:
                            message.capabilities[i] = 43;
                            break;
                        case "RICH_RESPONSE_UR_MEDIA_GRID_ENABLED":
                        case 44:
                            message.capabilities[i] = 44;
                            break;
                        case "RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER":
                        case 45:
                            message.capabilities[i] = 45;
                            break;
                        case "RICH_RESPONSE_IN_APP_SURVEY":
                        case 46:
                            message.capabilities[i] = 46;
                            break;
                        case "AI_RESPONSE_MODEL_BRANDING":
                        case 47:
                            message.capabilities[i] = 47;
                            break;
                        case "SESSION_TRANSPARENCY_SYSTEM_MESSAGE":
                        case 48:
                            message.capabilities[i] = 48;
                            break;
                        case "RICH_RESPONSE_UR_REASONING":
                        case 49:
                            message.capabilities[i] = 49;
                            break;
                    }
            }
            return message;
        };
        BotCapabilityMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.capabilities = [];
            if (message.capabilities && message.capabilities.length) {
                object.capabilities = [];
                for (var j = 0; j < message.capabilities.length; ++j)
                    object.capabilities[j] =
                        options.enums === String
                            ? $root.AICommon.BotCapabilityMetadata.BotCapabilityType[
                                  message.capabilities[j]
                              ] === undefined
                                ? message.capabilities[j]
                                : $root.AICommon.BotCapabilityMetadata.BotCapabilityType[
                                      message.capabilities[j]
                                  ]
                            : message.capabilities[j];
            }
            return object;
        };
        BotCapabilityMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotCapabilityMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotCapabilityMetadata";
        };
        BotCapabilityMetadata.BotCapabilityType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "PROGRESS_INDICATOR")] = 1;
            values[(valuesById[2] = "RICH_RESPONSE_HEADING")] = 2;
            values[(valuesById[3] = "RICH_RESPONSE_NESTED_LIST")] = 3;
            values[(valuesById[4] = "AI_MEMORY")] = 4;
            values[(valuesById[5] = "RICH_RESPONSE_THREAD_SURFING")] = 5;
            values[(valuesById[6] = "RICH_RESPONSE_TABLE")] = 6;
            values[(valuesById[7] = "RICH_RESPONSE_CODE")] = 7;
            values[(valuesById[8] = "RICH_RESPONSE_STRUCTURED_RESPONSE")] = 8;
            values[(valuesById[9] = "RICH_RESPONSE_INLINE_IMAGE")] = 9;
            values[(valuesById[10] = "WA_IG_1P_PLUGIN_RANKING_CONTROL")] = 10;
            values[(valuesById[11] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_1")] = 11;
            values[(valuesById[12] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_2")] = 12;
            values[(valuesById[13] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_3")] = 13;
            values[(valuesById[14] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_4")] = 14;
            values[(valuesById[15] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_5")] = 15;
            values[(valuesById[16] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_6")] = 16;
            values[(valuesById[17] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_7")] = 17;
            values[(valuesById[18] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_8")] = 18;
            values[(valuesById[19] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_9")] = 19;
            values[(valuesById[20] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_10")] = 20;
            values[(valuesById[21] = "RICH_RESPONSE_SUB_HEADING")] = 21;
            values[(valuesById[22] = "RICH_RESPONSE_GRID_IMAGE")] = 22;
            values[(valuesById[23] = "AI_STUDIO_UGC_MEMORY")] = 23;
            values[(valuesById[24] = "RICH_RESPONSE_LATEX")] = 24;
            values[(valuesById[25] = "RICH_RESPONSE_MAPS")] = 25;
            values[(valuesById[26] = "RICH_RESPONSE_INLINE_REELS")] = 26;
            values[(valuesById[27] = "AGENTIC_PLANNING")] = 27;
            values[(valuesById[28] = "ACCOUNT_LINKING")] = 28;
            values[(valuesById[29] = "STREAMING_DISAGGREGATION")] = 29;
            values[(valuesById[30] = "RICH_RESPONSE_GRID_IMAGE_3P")] = 30;
            values[(valuesById[31] = "RICH_RESPONSE_LATEX_INLINE")] = 31;
            values[(valuesById[32] = "QUERY_PLAN")] = 32;
            values[(valuesById[33] = "PROACTIVE_MESSAGE")] = 33;
            values[(valuesById[34] = "RICH_RESPONSE_UNIFIED_RESPONSE")] = 34;
            values[(valuesById[35] = "PROMOTION_MESSAGE")] = 35;
            values[(valuesById[36] = "SIMPLIFIED_PROFILE_PAGE")] = 36;
            values[(valuesById[37] = "RICH_RESPONSE_SOURCES_IN_MESSAGE")] = 37;
            values[(valuesById[38] = "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY")] = 38;
            values[(valuesById[39] = "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT")] = 39;
            values[(valuesById[40] = "AI_SHARED_MEMORY")] = 40;
            values[(valuesById[41] = "RICH_RESPONSE_UNIFIED_SOURCES")] = 41;
            values[(valuesById[42] = "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS")] = 42;
            values[(valuesById[43] = "RICH_RESPONSE_UR_INLINE_REELS_ENABLED")] = 43;
            values[(valuesById[44] = "RICH_RESPONSE_UR_MEDIA_GRID_ENABLED")] = 44;
            values[(valuesById[45] = "RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER")] = 45;
            values[(valuesById[46] = "RICH_RESPONSE_IN_APP_SURVEY")] = 46;
            values[(valuesById[47] = "AI_RESPONSE_MODEL_BRANDING")] = 47;
            values[(valuesById[48] = "SESSION_TRANSPARENCY_SYSTEM_MESSAGE")] = 48;
            values[(valuesById[49] = "RICH_RESPONSE_UR_REASONING")] = 49;
            return values;
        })();
        return BotCapabilityMetadata;
    })();
    AICommon.BotProgressIndicatorMetadata = (function () {
        function BotProgressIndicatorMetadata(properties) {
            this.stepsMetadata = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotProgressIndicatorMetadata.prototype.progressDescription = null;
        BotProgressIndicatorMetadata.prototype.stepsMetadata = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(BotProgressIndicatorMetadata.prototype, "_progressDescription", {
            get: $util.oneOfGetter(($oneOfFields = ["progressDescription"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotProgressIndicatorMetadata.create = function create(properties) {
            return new BotProgressIndicatorMetadata(properties);
        };
        BotProgressIndicatorMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.progressDescription != null &&
                Object.hasOwnProperty.call(message, "progressDescription")
            )
                writer.uint32(10).string(message.progressDescription);
            if (message.stepsMetadata != null && message.stepsMetadata.length)
                for (var i = 0; i < message.stepsMetadata.length; ++i)
                    $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.encode(
                        message.stepsMetadata[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            return writer;
        };
        BotProgressIndicatorMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotProgressIndicatorMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotProgressIndicatorMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.progressDescription = reader.string();
                        break;
                    }
                    case 2: {
                        if (!(message.stepsMetadata && message.stepsMetadata.length))
                            message.stepsMetadata = [];
                        message.stepsMetadata.push(
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.decode(
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
        BotProgressIndicatorMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotProgressIndicatorMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.progressDescription != null &&
                message.hasOwnProperty("progressDescription")
            ) {
                properties._progressDescription = 1;
                if (!$util.isString(message.progressDescription))
                    return "progressDescription: string expected";
            }
            if (message.stepsMetadata != null && message.hasOwnProperty("stepsMetadata")) {
                if (!Array.isArray(message.stepsMetadata)) return "stepsMetadata: array expected";
                for (var i = 0; i < message.stepsMetadata.length; ++i) {
                    var error =
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.verify(
                            message.stepsMetadata[i]
                        );
                    if (error) return "stepsMetadata." + error;
                }
            }
            return null;
        };
        BotProgressIndicatorMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotProgressIndicatorMetadata) return object;
            var message = new $root.AICommon.BotProgressIndicatorMetadata();
            if (object.progressDescription != null)
                message.progressDescription = String(object.progressDescription);
            if (object.stepsMetadata) {
                if (!Array.isArray(object.stepsMetadata))
                    throw TypeError(
                        ".AICommon.BotProgressIndicatorMetadata.stepsMetadata: array expected"
                    );
                message.stepsMetadata = [];
                for (var i = 0; i < object.stepsMetadata.length; ++i) {
                    if (typeof object.stepsMetadata[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotProgressIndicatorMetadata.stepsMetadata: object expected"
                        );
                    message.stepsMetadata[i] =
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.fromObject(
                            object.stepsMetadata[i]
                        );
                }
            }
            return message;
        };
        BotProgressIndicatorMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.stepsMetadata = [];
            if (
                message.progressDescription != null &&
                message.hasOwnProperty("progressDescription")
            ) {
                object.progressDescription = message.progressDescription;
                if (options.oneofs) object._progressDescription = "progressDescription";
            }
            if (message.stepsMetadata && message.stepsMetadata.length) {
                object.stepsMetadata = [];
                for (var j = 0; j < message.stepsMetadata.length; ++j)
                    object.stepsMetadata[j] =
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.toObject(
                            message.stepsMetadata[j],
                            options
                        );
            }
            return object;
        };
        BotProgressIndicatorMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotProgressIndicatorMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotProgressIndicatorMetadata";
        };
        BotProgressIndicatorMetadata.BotPlanningStepMetadata = (function () {
            function BotPlanningStepMetadata(properties) {
                this.sourcesMetadata = [];
                this.sections = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BotPlanningStepMetadata.prototype.statusTitle = null;
            BotPlanningStepMetadata.prototype.statusBody = null;
            BotPlanningStepMetadata.prototype.sourcesMetadata = $util.emptyArray;
            BotPlanningStepMetadata.prototype.status = null;
            BotPlanningStepMetadata.prototype.isReasoning = null;
            BotPlanningStepMetadata.prototype.isEnhancedSearch = null;
            BotPlanningStepMetadata.prototype.sections = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusTitle", {
                get: $util.oneOfGetter(($oneOfFields = ["statusTitle"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusBody", {
                get: $util.oneOfGetter(($oneOfFields = ["statusBody"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotPlanningStepMetadata.prototype, "_status", {
                get: $util.oneOfGetter(($oneOfFields = ["status"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotPlanningStepMetadata.prototype, "_isReasoning", {
                get: $util.oneOfGetter(($oneOfFields = ["isReasoning"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BotPlanningStepMetadata.prototype, "_isEnhancedSearch", {
                get: $util.oneOfGetter(($oneOfFields = ["isEnhancedSearch"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BotPlanningStepMetadata.create = function create(properties) {
                return new BotPlanningStepMetadata(properties);
            };
            BotPlanningStepMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.statusTitle != null &&
                    Object.hasOwnProperty.call(message, "statusTitle")
                )
                    writer.uint32(10).string(message.statusTitle);
                if (message.statusBody != null && Object.hasOwnProperty.call(message, "statusBody"))
                    writer.uint32(18).string(message.statusBody);
                if (message.sourcesMetadata != null && message.sourcesMetadata.length)
                    for (var i = 0; i < message.sourcesMetadata.length; ++i)
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.encode(
                            message.sourcesMetadata[i],
                            writer.uint32(26).fork()
                        ).ldelim();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(32).int32(message.status);
                if (
                    message.isReasoning != null &&
                    Object.hasOwnProperty.call(message, "isReasoning")
                )
                    writer.uint32(40).bool(message.isReasoning);
                if (
                    message.isEnhancedSearch != null &&
                    Object.hasOwnProperty.call(message, "isEnhancedSearch")
                )
                    writer.uint32(48).bool(message.isEnhancedSearch);
                if (message.sections != null && message.sections.length)
                    for (var i = 0; i < message.sections.length; ++i)
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.encode(
                            message.sections[i],
                            writer.uint32(58).fork()
                        ).ldelim();
                return writer;
            };
            BotPlanningStepMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BotPlanningStepMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.statusTitle = reader.string();
                            break;
                        }
                        case 2: {
                            message.statusBody = reader.string();
                            break;
                        }
                        case 3: {
                            if (!(message.sourcesMetadata && message.sourcesMetadata.length))
                                message.sourcesMetadata = [];
                            message.sourcesMetadata.push(
                                $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.decode(
                                    reader,
                                    reader.uint32()
                                )
                            );
                            break;
                        }
                        case 4: {
                            message.status = reader.int32();
                            break;
                        }
                        case 5: {
                            message.isReasoning = reader.bool();
                            break;
                        }
                        case 6: {
                            message.isEnhancedSearch = reader.bool();
                            break;
                        }
                        case 7: {
                            if (!(message.sections && message.sections.length))
                                message.sections = [];
                            message.sections.push(
                                $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.decode(
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
            BotPlanningStepMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BotPlanningStepMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.statusTitle != null && message.hasOwnProperty("statusTitle")) {
                    properties._statusTitle = 1;
                    if (!$util.isString(message.statusTitle)) return "statusTitle: string expected";
                }
                if (message.statusBody != null && message.hasOwnProperty("statusBody")) {
                    properties._statusBody = 1;
                    if (!$util.isString(message.statusBody)) return "statusBody: string expected";
                }
                if (message.sourcesMetadata != null && message.hasOwnProperty("sourcesMetadata")) {
                    if (!Array.isArray(message.sourcesMetadata))
                        return "sourcesMetadata: array expected";
                    for (var i = 0; i < message.sourcesMetadata.length; ++i) {
                        var error =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.verify(
                                message.sourcesMetadata[i]
                            );
                        if (error) return "sourcesMetadata." + error;
                    }
                }
                if (message.status != null && message.hasOwnProperty("status")) {
                    properties._status = 1;
                    switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                if (message.isReasoning != null && message.hasOwnProperty("isReasoning")) {
                    properties._isReasoning = 1;
                    if (typeof message.isReasoning !== "boolean")
                        return "isReasoning: boolean expected";
                }
                if (
                    message.isEnhancedSearch != null &&
                    message.hasOwnProperty("isEnhancedSearch")
                ) {
                    properties._isEnhancedSearch = 1;
                    if (typeof message.isEnhancedSearch !== "boolean")
                        return "isEnhancedSearch: boolean expected";
                }
                if (message.sections != null && message.hasOwnProperty("sections")) {
                    if (!Array.isArray(message.sections)) return "sections: array expected";
                    for (var i = 0; i < message.sections.length; ++i) {
                        var error =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.verify(
                                message.sections[i]
                            );
                        if (error) return "sections." + error;
                    }
                }
                return null;
            };
            BotPlanningStepMetadata.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata
                )
                    return object;
                var message =
                    new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
                if (object.statusTitle != null) message.statusTitle = String(object.statusTitle);
                if (object.statusBody != null) message.statusBody = String(object.statusBody);
                if (object.sourcesMetadata) {
                    if (!Array.isArray(object.sourcesMetadata))
                        throw TypeError(
                            ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: array expected"
                        );
                    message.sourcesMetadata = [];
                    for (var i = 0; i < object.sourcesMetadata.length; ++i) {
                        if (typeof object.sourcesMetadata[i] !== "object")
                            throw TypeError(
                                ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: object expected"
                            );
                        message.sourcesMetadata[i] =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.fromObject(
                                object.sourcesMetadata[i]
                            );
                    }
                }
                switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.status = 0;
                        break;
                    case "PLANNED":
                    case 1:
                        message.status = 1;
                        break;
                    case "EXECUTING":
                    case 2:
                        message.status = 2;
                        break;
                    case "FINISHED":
                    case 3:
                        message.status = 3;
                        break;
                }
                if (object.isReasoning != null) message.isReasoning = Boolean(object.isReasoning);
                if (object.isEnhancedSearch != null)
                    message.isEnhancedSearch = Boolean(object.isEnhancedSearch);
                if (object.sections) {
                    if (!Array.isArray(object.sections))
                        throw TypeError(
                            ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: array expected"
                        );
                    message.sections = [];
                    for (var i = 0; i < object.sections.length; ++i) {
                        if (typeof object.sections[i] !== "object")
                            throw TypeError(
                                ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: object expected"
                            );
                        message.sections[i] =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.fromObject(
                                object.sections[i]
                            );
                    }
                }
                return message;
            };
            BotPlanningStepMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.sourcesMetadata = [];
                    object.sections = [];
                }
                if (message.statusTitle != null && message.hasOwnProperty("statusTitle")) {
                    object.statusTitle = message.statusTitle;
                    if (options.oneofs) object._statusTitle = "statusTitle";
                }
                if (message.statusBody != null && message.hasOwnProperty("statusBody")) {
                    object.statusBody = message.statusBody;
                    if (options.oneofs) object._statusBody = "statusBody";
                }
                if (message.sourcesMetadata && message.sourcesMetadata.length) {
                    object.sourcesMetadata = [];
                    for (var j = 0; j < message.sourcesMetadata.length; ++j)
                        object.sourcesMetadata[j] =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.toObject(
                                message.sourcesMetadata[j],
                                options
                            );
                }
                if (message.status != null && message.hasOwnProperty("status")) {
                    object.status =
                        options.enums === String
                            ? $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata
                                  .PlanningStepStatus[message.status] === undefined
                                ? message.status
                                : $root.AICommon.BotProgressIndicatorMetadata
                                      .BotPlanningStepMetadata.PlanningStepStatus[message.status]
                            : message.status;
                    if (options.oneofs) object._status = "status";
                }
                if (message.isReasoning != null && message.hasOwnProperty("isReasoning")) {
                    object.isReasoning = message.isReasoning;
                    if (options.oneofs) object._isReasoning = "isReasoning";
                }
                if (
                    message.isEnhancedSearch != null &&
                    message.hasOwnProperty("isEnhancedSearch")
                ) {
                    object.isEnhancedSearch = message.isEnhancedSearch;
                    if (options.oneofs) object._isEnhancedSearch = "isEnhancedSearch";
                }
                if (message.sections && message.sections.length) {
                    object.sections = [];
                    for (var j = 0; j < message.sections.length; ++j)
                        object.sections[j] =
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.toObject(
                                message.sections[j],
                                options
                            );
                }
                return object;
            };
            BotPlanningStepMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BotPlanningStepMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata"
                );
            };
            BotPlanningStepMetadata.BotPlanningSearchSourceMetadata = (function () {
                function BotPlanningSearchSourceMetadata(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                BotPlanningSearchSourceMetadata.prototype.title = null;
                BotPlanningSearchSourceMetadata.prototype.provider = null;
                BotPlanningSearchSourceMetadata.prototype.sourceUrl = null;
                BotPlanningSearchSourceMetadata.prototype.favIconUrl = null;
                var $oneOfFields;
                Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_title", {
                    get: $util.oneOfGetter(($oneOfFields = ["title"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter(($oneOfFields = ["provider"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter(($oneOfFields = ["sourceUrl"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_favIconUrl", {
                    get: $util.oneOfGetter(($oneOfFields = ["favIconUrl"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                BotPlanningSearchSourceMetadata.create = function create(properties) {
                    return new BotPlanningSearchSourceMetadata(properties);
                };
                BotPlanningSearchSourceMetadata.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                        writer.uint32(10).string(message.title);
                    if (message.provider != null && Object.hasOwnProperty.call(message, "provider"))
                        writer.uint32(16).int32(message.provider);
                    if (
                        message.sourceUrl != null &&
                        Object.hasOwnProperty.call(message, "sourceUrl")
                    )
                        writer.uint32(26).string(message.sourceUrl);
                    if (
                        message.favIconUrl != null &&
                        Object.hasOwnProperty.call(message, "favIconUrl")
                    )
                        writer.uint32(34).string(message.favIconUrl);
                    return writer;
                };
                BotPlanningSearchSourceMetadata.encodeDelimited = function encodeDelimited(
                    message,
                    writer
                ) {
                    return this.encode(message, writer).ldelim();
                };
                BotPlanningSearchSourceMetadata.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.title = reader.string();
                                break;
                            }
                            case 2: {
                                message.provider = reader.int32();
                                break;
                            }
                            case 3: {
                                message.sourceUrl = reader.string();
                                break;
                            }
                            case 4: {
                                message.favIconUrl = reader.string();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                BotPlanningSearchSourceMetadata.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                BotPlanningSearchSourceMetadata.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.title != null && message.hasOwnProperty("title")) {
                        properties._title = 1;
                        if (!$util.isString(message.title)) return "title: string expected";
                    }
                    if (message.provider != null && message.hasOwnProperty("provider")) {
                        properties._provider = 1;
                        switch (message.provider) {
                            default:
                                return "provider: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                        }
                    }
                    if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                        properties._sourceUrl = 1;
                        if (!$util.isString(message.sourceUrl)) return "sourceUrl: string expected";
                    }
                    if (message.favIconUrl != null && message.hasOwnProperty("favIconUrl")) {
                        properties._favIconUrl = 1;
                        if (!$util.isString(message.favIconUrl))
                            return "favIconUrl: string expected";
                    }
                    return null;
                };
                BotPlanningSearchSourceMetadata.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata
                            .BotPlanningSearchSourceMetadata
                    )
                        return object;
                    var message =
                        new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
                    if (object.title != null) message.title = String(object.title);
                    switch (object.provider) {
                        default:
                            if (typeof object.provider === "number") {
                                message.provider = object.provider;
                                break;
                            }
                            break;
                        case "UNKNOWN_PROVIDER":
                        case 0:
                            message.provider = 0;
                            break;
                        case "OTHER":
                        case 1:
                            message.provider = 1;
                            break;
                        case "GOOGLE":
                        case 2:
                            message.provider = 2;
                            break;
                        case "BING":
                        case 3:
                            message.provider = 3;
                            break;
                    }
                    if (object.sourceUrl != null) message.sourceUrl = String(object.sourceUrl);
                    if (object.favIconUrl != null) message.favIconUrl = String(object.favIconUrl);
                    return message;
                };
                BotPlanningSearchSourceMetadata.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.title != null && message.hasOwnProperty("title")) {
                        object.title = message.title;
                        if (options.oneofs) object._title = "title";
                    }
                    if (message.provider != null && message.hasOwnProperty("provider")) {
                        object.provider =
                            options.enums === String
                                ? $root.AICommon.BotProgressIndicatorMetadata
                                      .BotPlanningStepMetadata.BotSearchSourceProvider[
                                      message.provider
                                  ] === undefined
                                    ? message.provider
                                    : $root.AICommon.BotProgressIndicatorMetadata
                                          .BotPlanningStepMetadata.BotSearchSourceProvider[
                                          message.provider
                                      ]
                                : message.provider;
                        if (options.oneofs) object._provider = "provider";
                    }
                    if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                        object.sourceUrl = message.sourceUrl;
                        if (options.oneofs) object._sourceUrl = "sourceUrl";
                    }
                    if (message.favIconUrl != null && message.hasOwnProperty("favIconUrl")) {
                        object.favIconUrl = message.favIconUrl;
                        if (options.oneofs) object._favIconUrl = "favIconUrl";
                    }
                    return object;
                };
                BotPlanningSearchSourceMetadata.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                BotPlanningSearchSourceMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata"
                    );
                };
                return BotPlanningSearchSourceMetadata;
            })();
            BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata = (function () {
                function BotPlanningSearchSourcesMetadata(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                BotPlanningSearchSourcesMetadata.prototype.sourceTitle = null;
                BotPlanningSearchSourcesMetadata.prototype.provider = null;
                BotPlanningSearchSourcesMetadata.prototype.sourceUrl = null;
                var $oneOfFields;
                Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceTitle", {
                    get: $util.oneOfGetter(($oneOfFields = ["sourceTitle"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter(($oneOfFields = ["provider"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter(($oneOfFields = ["sourceUrl"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                BotPlanningSearchSourcesMetadata.create = function create(properties) {
                    return new BotPlanningSearchSourcesMetadata(properties);
                };
                BotPlanningSearchSourcesMetadata.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (
                        message.sourceTitle != null &&
                        Object.hasOwnProperty.call(message, "sourceTitle")
                    )
                        writer.uint32(10).string(message.sourceTitle);
                    if (message.provider != null && Object.hasOwnProperty.call(message, "provider"))
                        writer.uint32(16).int32(message.provider);
                    if (
                        message.sourceUrl != null &&
                        Object.hasOwnProperty.call(message, "sourceUrl")
                    )
                        writer.uint32(26).string(message.sourceUrl);
                    return writer;
                };
                BotPlanningSearchSourcesMetadata.encodeDelimited = function encodeDelimited(
                    message,
                    writer
                ) {
                    return this.encode(message, writer).ldelim();
                };
                BotPlanningSearchSourcesMetadata.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.sourceTitle = reader.string();
                                break;
                            }
                            case 2: {
                                message.provider = reader.int32();
                                break;
                            }
                            case 3: {
                                message.sourceUrl = reader.string();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                BotPlanningSearchSourcesMetadata.decodeDelimited = function decodeDelimited(
                    reader
                ) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                BotPlanningSearchSourcesMetadata.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.sourceTitle != null && message.hasOwnProperty("sourceTitle")) {
                        properties._sourceTitle = 1;
                        if (!$util.isString(message.sourceTitle))
                            return "sourceTitle: string expected";
                    }
                    if (message.provider != null && message.hasOwnProperty("provider")) {
                        properties._provider = 1;
                        switch (message.provider) {
                            default:
                                return "provider: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                        }
                    }
                    if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                        properties._sourceUrl = 1;
                        if (!$util.isString(message.sourceUrl)) return "sourceUrl: string expected";
                    }
                    return null;
                };
                BotPlanningSearchSourcesMetadata.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata
                            .BotPlanningSearchSourcesMetadata
                    )
                        return object;
                    var message =
                        new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
                    if (object.sourceTitle != null)
                        message.sourceTitle = String(object.sourceTitle);
                    switch (object.provider) {
                        default:
                            if (typeof object.provider === "number") {
                                message.provider = object.provider;
                                break;
                            }
                            break;
                        case "UNKNOWN":
                        case 0:
                            message.provider = 0;
                            break;
                        case "OTHER":
                        case 1:
                            message.provider = 1;
                            break;
                        case "GOOGLE":
                        case 2:
                            message.provider = 2;
                            break;
                        case "BING":
                        case 3:
                            message.provider = 3;
                            break;
                    }
                    if (object.sourceUrl != null) message.sourceUrl = String(object.sourceUrl);
                    return message;
                };
                BotPlanningSearchSourcesMetadata.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.sourceTitle != null && message.hasOwnProperty("sourceTitle")) {
                        object.sourceTitle = message.sourceTitle;
                        if (options.oneofs) object._sourceTitle = "sourceTitle";
                    }
                    if (message.provider != null && message.hasOwnProperty("provider")) {
                        object.provider =
                            options.enums === String
                                ? $root.AICommon.BotProgressIndicatorMetadata
                                      .BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata
                                      .BotPlanningSearchSourceProvider[message.provider] ===
                                  undefined
                                    ? message.provider
                                    : $root.AICommon.BotProgressIndicatorMetadata
                                          .BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata
                                          .BotPlanningSearchSourceProvider[message.provider]
                                : message.provider;
                        if (options.oneofs) object._provider = "provider";
                    }
                    if (message.sourceUrl != null && message.hasOwnProperty("sourceUrl")) {
                        object.sourceUrl = message.sourceUrl;
                        if (options.oneofs) object._sourceUrl = "sourceUrl";
                    }
                    return object;
                };
                BotPlanningSearchSourcesMetadata.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                BotPlanningSearchSourcesMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata"
                    );
                };
                BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider = (function () {
                    var valuesById = {},
                        values = Object.create(valuesById);
                    values[(valuesById[0] = "UNKNOWN")] = 0;
                    values[(valuesById[1] = "OTHER")] = 1;
                    values[(valuesById[2] = "GOOGLE")] = 2;
                    values[(valuesById[3] = "BING")] = 3;
                    return values;
                })();
                return BotPlanningSearchSourcesMetadata;
            })();
            BotPlanningStepMetadata.BotPlanningStepSectionMetadata = (function () {
                function BotPlanningStepSectionMetadata(properties) {
                    this.sourcesMetadata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                BotPlanningStepSectionMetadata.prototype.sectionTitle = null;
                BotPlanningStepSectionMetadata.prototype.sectionBody = null;
                BotPlanningStepSectionMetadata.prototype.sourcesMetadata = $util.emptyArray;
                var $oneOfFields;
                Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionTitle", {
                    get: $util.oneOfGetter(($oneOfFields = ["sectionTitle"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionBody", {
                    get: $util.oneOfGetter(($oneOfFields = ["sectionBody"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                BotPlanningStepSectionMetadata.create = function create(properties) {
                    return new BotPlanningStepSectionMetadata(properties);
                };
                BotPlanningStepSectionMetadata.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (
                        message.sectionTitle != null &&
                        Object.hasOwnProperty.call(message, "sectionTitle")
                    )
                        writer.uint32(10).string(message.sectionTitle);
                    if (
                        message.sectionBody != null &&
                        Object.hasOwnProperty.call(message, "sectionBody")
                    )
                        writer.uint32(18).string(message.sectionBody);
                    if (message.sourcesMetadata != null && message.sourcesMetadata.length)
                        for (var i = 0; i < message.sourcesMetadata.length; ++i)
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.encode(
                                message.sourcesMetadata[i],
                                writer.uint32(26).fork()
                            ).ldelim();
                    return writer;
                };
                BotPlanningStepSectionMetadata.encodeDelimited = function encodeDelimited(
                    message,
                    writer
                ) {
                    return this.encode(message, writer).ldelim();
                };
                BotPlanningStepSectionMetadata.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.sectionTitle = reader.string();
                                break;
                            }
                            case 2: {
                                message.sectionBody = reader.string();
                                break;
                            }
                            case 3: {
                                if (!(message.sourcesMetadata && message.sourcesMetadata.length))
                                    message.sourcesMetadata = [];
                                message.sourcesMetadata.push(
                                    $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.decode(
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
                BotPlanningStepSectionMetadata.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                BotPlanningStepSectionMetadata.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.sectionTitle != null && message.hasOwnProperty("sectionTitle")) {
                        properties._sectionTitle = 1;
                        if (!$util.isString(message.sectionTitle))
                            return "sectionTitle: string expected";
                    }
                    if (message.sectionBody != null && message.hasOwnProperty("sectionBody")) {
                        properties._sectionBody = 1;
                        if (!$util.isString(message.sectionBody))
                            return "sectionBody: string expected";
                    }
                    if (
                        message.sourcesMetadata != null &&
                        message.hasOwnProperty("sourcesMetadata")
                    ) {
                        if (!Array.isArray(message.sourcesMetadata))
                            return "sourcesMetadata: array expected";
                        for (var i = 0; i < message.sourcesMetadata.length; ++i) {
                            var error =
                                $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.verify(
                                    message.sourcesMetadata[i]
                                );
                            if (error) return "sourcesMetadata." + error;
                        }
                    }
                    return null;
                };
                BotPlanningStepSectionMetadata.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata
                            .BotPlanningStepSectionMetadata
                    )
                        return object;
                    var message =
                        new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
                    if (object.sectionTitle != null)
                        message.sectionTitle = String(object.sectionTitle);
                    if (object.sectionBody != null)
                        message.sectionBody = String(object.sectionBody);
                    if (object.sourcesMetadata) {
                        if (!Array.isArray(object.sourcesMetadata))
                            throw TypeError(
                                ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: array expected"
                            );
                        message.sourcesMetadata = [];
                        for (var i = 0; i < object.sourcesMetadata.length; ++i) {
                            if (typeof object.sourcesMetadata[i] !== "object")
                                throw TypeError(
                                    ".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: object expected"
                                );
                            message.sourcesMetadata[i] =
                                $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.fromObject(
                                    object.sourcesMetadata[i]
                                );
                        }
                    }
                    return message;
                };
                BotPlanningStepSectionMetadata.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (options.arrays || options.defaults) object.sourcesMetadata = [];
                    if (message.sectionTitle != null && message.hasOwnProperty("sectionTitle")) {
                        object.sectionTitle = message.sectionTitle;
                        if (options.oneofs) object._sectionTitle = "sectionTitle";
                    }
                    if (message.sectionBody != null && message.hasOwnProperty("sectionBody")) {
                        object.sectionBody = message.sectionBody;
                        if (options.oneofs) object._sectionBody = "sectionBody";
                    }
                    if (message.sourcesMetadata && message.sourcesMetadata.length) {
                        object.sourcesMetadata = [];
                        for (var j = 0; j < message.sourcesMetadata.length; ++j)
                            object.sourcesMetadata[j] =
                                $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.toObject(
                                    message.sourcesMetadata[j],
                                    options
                                );
                    }
                    return object;
                };
                BotPlanningStepSectionMetadata.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                BotPlanningStepSectionMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata"
                    );
                };
                return BotPlanningStepSectionMetadata;
            })();
            BotPlanningStepMetadata.BotSearchSourceProvider = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN_PROVIDER")] = 0;
                values[(valuesById[1] = "OTHER")] = 1;
                values[(valuesById[2] = "GOOGLE")] = 2;
                values[(valuesById[3] = "BING")] = 3;
                return values;
            })();
            BotPlanningStepMetadata.PlanningStepStatus = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "PLANNED")] = 1;
                values[(valuesById[2] = "EXECUTING")] = 2;
                values[(valuesById[3] = "FINISHED")] = 3;
                return values;
            })();
            return BotPlanningStepMetadata;
        })();
        return BotProgressIndicatorMetadata;
    })();
    AICommon.BotModelMetadata = (function () {
        function BotModelMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotModelMetadata.prototype.modelType = null;
        BotModelMetadata.prototype.premiumModelStatus = null;
        BotModelMetadata.prototype.modelNameOverride = null;
        var $oneOfFields;
        Object.defineProperty(BotModelMetadata.prototype, "_modelType", {
            get: $util.oneOfGetter(($oneOfFields = ["modelType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotModelMetadata.prototype, "_premiumModelStatus", {
            get: $util.oneOfGetter(($oneOfFields = ["premiumModelStatus"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotModelMetadata.prototype, "_modelNameOverride", {
            get: $util.oneOfGetter(($oneOfFields = ["modelNameOverride"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotModelMetadata.create = function create(properties) {
            return new BotModelMetadata(properties);
        };
        BotModelMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.modelType != null && Object.hasOwnProperty.call(message, "modelType"))
                writer.uint32(8).int32(message.modelType);
            if (
                message.premiumModelStatus != null &&
                Object.hasOwnProperty.call(message, "premiumModelStatus")
            )
                writer.uint32(16).int32(message.premiumModelStatus);
            if (
                message.modelNameOverride != null &&
                Object.hasOwnProperty.call(message, "modelNameOverride")
            )
                writer.uint32(26).string(message.modelNameOverride);
            return writer;
        };
        BotModelMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotModelMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotModelMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.modelType = reader.int32();
                        break;
                    }
                    case 2: {
                        message.premiumModelStatus = reader.int32();
                        break;
                    }
                    case 3: {
                        message.modelNameOverride = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotModelMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotModelMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.modelType != null && message.hasOwnProperty("modelType")) {
                properties._modelType = 1;
                switch (message.modelType) {
                    default:
                        return "modelType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (
                message.premiumModelStatus != null &&
                message.hasOwnProperty("premiumModelStatus")
            ) {
                properties._premiumModelStatus = 1;
                switch (message.premiumModelStatus) {
                    default:
                        return "premiumModelStatus: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.modelNameOverride != null && message.hasOwnProperty("modelNameOverride")) {
                properties._modelNameOverride = 1;
                if (!$util.isString(message.modelNameOverride))
                    return "modelNameOverride: string expected";
            }
            return null;
        };
        BotModelMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotModelMetadata) return object;
            var message = new $root.AICommon.BotModelMetadata();
            switch (object.modelType) {
                default:
                    if (typeof object.modelType === "number") {
                        message.modelType = object.modelType;
                        break;
                    }
                    break;
                case "UNKNOWN_TYPE":
                case 0:
                    message.modelType = 0;
                    break;
                case "LLAMA_PROD":
                case 1:
                    message.modelType = 1;
                    break;
                case "LLAMA_PROD_PREMIUM":
                case 2:
                    message.modelType = 2;
                    break;
            }
            switch (object.premiumModelStatus) {
                default:
                    if (typeof object.premiumModelStatus === "number") {
                        message.premiumModelStatus = object.premiumModelStatus;
                        break;
                    }
                    break;
                case "UNKNOWN_STATUS":
                case 0:
                    message.premiumModelStatus = 0;
                    break;
                case "AVAILABLE":
                case 1:
                    message.premiumModelStatus = 1;
                    break;
                case "QUOTA_EXCEED_LIMIT":
                case 2:
                    message.premiumModelStatus = 2;
                    break;
            }
            if (object.modelNameOverride != null)
                message.modelNameOverride = String(object.modelNameOverride);
            return message;
        };
        BotModelMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.modelType != null && message.hasOwnProperty("modelType")) {
                object.modelType =
                    options.enums === String
                        ? $root.AICommon.BotModelMetadata.ModelType[message.modelType] === undefined
                            ? message.modelType
                            : $root.AICommon.BotModelMetadata.ModelType[message.modelType]
                        : message.modelType;
                if (options.oneofs) object._modelType = "modelType";
            }
            if (
                message.premiumModelStatus != null &&
                message.hasOwnProperty("premiumModelStatus")
            ) {
                object.premiumModelStatus =
                    options.enums === String
                        ? $root.AICommon.BotModelMetadata.PremiumModelStatus[
                              message.premiumModelStatus
                          ] === undefined
                            ? message.premiumModelStatus
                            : $root.AICommon.BotModelMetadata.PremiumModelStatus[
                                  message.premiumModelStatus
                              ]
                        : message.premiumModelStatus;
                if (options.oneofs) object._premiumModelStatus = "premiumModelStatus";
            }
            if (message.modelNameOverride != null && message.hasOwnProperty("modelNameOverride")) {
                object.modelNameOverride = message.modelNameOverride;
                if (options.oneofs) object._modelNameOverride = "modelNameOverride";
            }
            return object;
        };
        BotModelMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotModelMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotModelMetadata";
        };
        BotModelMetadata.ModelType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN_TYPE")] = 0;
            values[(valuesById[1] = "LLAMA_PROD")] = 1;
            values[(valuesById[2] = "LLAMA_PROD_PREMIUM")] = 2;
            return values;
        })();
        BotModelMetadata.PremiumModelStatus = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN_STATUS")] = 0;
            values[(valuesById[1] = "AVAILABLE")] = 1;
            values[(valuesById[2] = "QUOTA_EXCEED_LIMIT")] = 2;
            return values;
        })();
        return BotModelMetadata;
    })();
    AICommon.BotReminderMetadata = (function () {
        function BotReminderMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotReminderMetadata.prototype.requestMessageKey = null;
        BotReminderMetadata.prototype.action = null;
        BotReminderMetadata.prototype.name = null;
        BotReminderMetadata.prototype.nextTriggerTimestamp = null;
        BotReminderMetadata.prototype.frequency = null;
        var $oneOfFields;
        Object.defineProperty(BotReminderMetadata.prototype, "_requestMessageKey", {
            get: $util.oneOfGetter(($oneOfFields = ["requestMessageKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotReminderMetadata.prototype, "_action", {
            get: $util.oneOfGetter(($oneOfFields = ["action"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotReminderMetadata.prototype, "_name", {
            get: $util.oneOfGetter(($oneOfFields = ["name"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotReminderMetadata.prototype, "_nextTriggerTimestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["nextTriggerTimestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotReminderMetadata.prototype, "_frequency", {
            get: $util.oneOfGetter(($oneOfFields = ["frequency"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotReminderMetadata.create = function create(properties) {
            return new BotReminderMetadata(properties);
        };
        BotReminderMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.requestMessageKey != null &&
                Object.hasOwnProperty.call(message, "requestMessageKey")
            )
                $root.Protocol.MessageKey.encode(
                    message.requestMessageKey,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                writer.uint32(16).int32(message.action);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(26).string(message.name);
            if (
                message.nextTriggerTimestamp != null &&
                Object.hasOwnProperty.call(message, "nextTriggerTimestamp")
            )
                writer.uint32(32).uint64(message.nextTriggerTimestamp);
            if (message.frequency != null && Object.hasOwnProperty.call(message, "frequency"))
                writer.uint32(40).int32(message.frequency);
            return writer;
        };
        BotReminderMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotReminderMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotReminderMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.requestMessageKey = $root.Protocol.MessageKey.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.action = reader.int32();
                        break;
                    }
                    case 3: {
                        message.name = reader.string();
                        break;
                    }
                    case 4: {
                        message.nextTriggerTimestamp = reader.uint64();
                        break;
                    }
                    case 5: {
                        message.frequency = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotReminderMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotReminderMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.requestMessageKey != null && message.hasOwnProperty("requestMessageKey")) {
                properties._requestMessageKey = 1;
                {
                    var error = $root.Protocol.MessageKey.verify(message.requestMessageKey);
                    if (error) return "requestMessageKey." + error;
                }
            }
            if (message.action != null && message.hasOwnProperty("action")) {
                properties._action = 1;
                switch (message.action) {
                    default:
                        return "action: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                }
            }
            if (message.name != null && message.hasOwnProperty("name")) {
                properties._name = 1;
                if (!$util.isString(message.name)) return "name: string expected";
            }
            if (
                message.nextTriggerTimestamp != null &&
                message.hasOwnProperty("nextTriggerTimestamp")
            ) {
                properties._nextTriggerTimestamp = 1;
                if (
                    !$util.isInteger(message.nextTriggerTimestamp) &&
                    !(
                        message.nextTriggerTimestamp &&
                        $util.isInteger(message.nextTriggerTimestamp.low) &&
                        $util.isInteger(message.nextTriggerTimestamp.high)
                    )
                )
                    return "nextTriggerTimestamp: integer|Long expected";
            }
            if (message.frequency != null && message.hasOwnProperty("frequency")) {
                properties._frequency = 1;
                switch (message.frequency) {
                    default:
                        return "frequency: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                }
            }
            return null;
        };
        BotReminderMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotReminderMetadata) return object;
            var message = new $root.AICommon.BotReminderMetadata();
            if (object.requestMessageKey != null) {
                if (typeof object.requestMessageKey !== "object")
                    throw TypeError(
                        ".AICommon.BotReminderMetadata.requestMessageKey: object expected"
                    );
                message.requestMessageKey = $root.Protocol.MessageKey.fromObject(
                    object.requestMessageKey
                );
            }
            switch (object.action) {
                default:
                    if (typeof object.action === "number") {
                        message.action = object.action;
                        break;
                    }
                    break;
                case "NOTIFY":
                case 1:
                    message.action = 1;
                    break;
                case "CREATE":
                case 2:
                    message.action = 2;
                    break;
                case "DELETE":
                case 3:
                    message.action = 3;
                    break;
                case "UPDATE":
                case 4:
                    message.action = 4;
                    break;
            }
            if (object.name != null) message.name = String(object.name);
            if (object.nextTriggerTimestamp != null)
                if ($util.Long)
                    (message.nextTriggerTimestamp = $util.Long.fromValue(
                        object.nextTriggerTimestamp
                    )).unsigned = true;
                else if (typeof object.nextTriggerTimestamp === "string")
                    message.nextTriggerTimestamp = parseInt(object.nextTriggerTimestamp, 10);
                else if (typeof object.nextTriggerTimestamp === "number")
                    message.nextTriggerTimestamp = object.nextTriggerTimestamp;
                else if (typeof object.nextTriggerTimestamp === "object")
                    message.nextTriggerTimestamp = new $util.LongBits(
                        object.nextTriggerTimestamp.low >>> 0,
                        object.nextTriggerTimestamp.high >>> 0
                    ).toNumber(true);
            switch (object.frequency) {
                default:
                    if (typeof object.frequency === "number") {
                        message.frequency = object.frequency;
                        break;
                    }
                    break;
                case "ONCE":
                case 1:
                    message.frequency = 1;
                    break;
                case "DAILY":
                case 2:
                    message.frequency = 2;
                    break;
                case "WEEKLY":
                case 3:
                    message.frequency = 3;
                    break;
                case "BIWEEKLY":
                case 4:
                    message.frequency = 4;
                    break;
                case "MONTHLY":
                case 5:
                    message.frequency = 5;
                    break;
            }
            return message;
        };
        BotReminderMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.requestMessageKey != null && message.hasOwnProperty("requestMessageKey")) {
                object.requestMessageKey = $root.Protocol.MessageKey.toObject(
                    message.requestMessageKey,
                    options
                );
                if (options.oneofs) object._requestMessageKey = "requestMessageKey";
            }
            if (message.action != null && message.hasOwnProperty("action")) {
                object.action =
                    options.enums === String
                        ? $root.AICommon.BotReminderMetadata.ReminderAction[message.action] ===
                          undefined
                            ? message.action
                            : $root.AICommon.BotReminderMetadata.ReminderAction[message.action]
                        : message.action;
                if (options.oneofs) object._action = "action";
            }
            if (message.name != null && message.hasOwnProperty("name")) {
                object.name = message.name;
                if (options.oneofs) object._name = "name";
            }
            if (
                message.nextTriggerTimestamp != null &&
                message.hasOwnProperty("nextTriggerTimestamp")
            ) {
                if (typeof message.nextTriggerTimestamp === "number")
                    object.nextTriggerTimestamp =
                        options.longs === String
                            ? String(message.nextTriggerTimestamp)
                            : message.nextTriggerTimestamp;
                else
                    object.nextTriggerTimestamp =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.nextTriggerTimestamp)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.nextTriggerTimestamp.low >>> 0,
                                    message.nextTriggerTimestamp.high >>> 0
                                ).toNumber(true)
                              : message.nextTriggerTimestamp;
                if (options.oneofs) object._nextTriggerTimestamp = "nextTriggerTimestamp";
            }
            if (message.frequency != null && message.hasOwnProperty("frequency")) {
                object.frequency =
                    options.enums === String
                        ? $root.AICommon.BotReminderMetadata.ReminderFrequency[
                              message.frequency
                          ] === undefined
                            ? message.frequency
                            : $root.AICommon.BotReminderMetadata.ReminderFrequency[
                                  message.frequency
                              ]
                        : message.frequency;
                if (options.oneofs) object._frequency = "frequency";
            }
            return object;
        };
        BotReminderMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotReminderMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotReminderMetadata";
        };
        BotReminderMetadata.ReminderAction = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[1] = "NOTIFY")] = 1;
            values[(valuesById[2] = "CREATE")] = 2;
            values[(valuesById[3] = "DELETE")] = 3;
            values[(valuesById[4] = "UPDATE")] = 4;
            return values;
        })();
        BotReminderMetadata.ReminderFrequency = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[1] = "ONCE")] = 1;
            values[(valuesById[2] = "DAILY")] = 2;
            values[(valuesById[3] = "WEEKLY")] = 3;
            values[(valuesById[4] = "BIWEEKLY")] = 4;
            values[(valuesById[5] = "MONTHLY")] = 5;
            return values;
        })();
        return BotReminderMetadata;
    })();
    AICommon.BotMemuMetadata = (function () {
        function BotMemuMetadata(properties) {
            this.faceImages = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMemuMetadata.prototype.faceImages = $util.emptyArray;
        BotMemuMetadata.create = function create(properties) {
            return new BotMemuMetadata(properties);
        };
        BotMemuMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.faceImages != null && message.faceImages.length)
                for (var i = 0; i < message.faceImages.length; ++i)
                    $root.AICommon.BotMediaMetadata.encode(
                        message.faceImages[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotMemuMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMemuMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMemuMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.faceImages && message.faceImages.length))
                            message.faceImages = [];
                        message.faceImages.push(
                            $root.AICommon.BotMediaMetadata.decode(reader, reader.uint32())
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
        BotMemuMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMemuMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.faceImages != null && message.hasOwnProperty("faceImages")) {
                if (!Array.isArray(message.faceImages)) return "faceImages: array expected";
                for (var i = 0; i < message.faceImages.length; ++i) {
                    var error = $root.AICommon.BotMediaMetadata.verify(message.faceImages[i]);
                    if (error) return "faceImages." + error;
                }
            }
            return null;
        };
        BotMemuMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMemuMetadata) return object;
            var message = new $root.AICommon.BotMemuMetadata();
            if (object.faceImages) {
                if (!Array.isArray(object.faceImages))
                    throw TypeError(".AICommon.BotMemuMetadata.faceImages: array expected");
                message.faceImages = [];
                for (var i = 0; i < object.faceImages.length; ++i) {
                    if (typeof object.faceImages[i] !== "object")
                        throw TypeError(".AICommon.BotMemuMetadata.faceImages: object expected");
                    message.faceImages[i] = $root.AICommon.BotMediaMetadata.fromObject(
                        object.faceImages[i]
                    );
                }
            }
            return message;
        };
        BotMemuMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.faceImages = [];
            if (message.faceImages && message.faceImages.length) {
                object.faceImages = [];
                for (var j = 0; j < message.faceImages.length; ++j)
                    object.faceImages[j] = $root.AICommon.BotMediaMetadata.toObject(
                        message.faceImages[j],
                        options
                    );
            }
            return object;
        };
        BotMemuMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMemuMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMemuMetadata";
        };
        return BotMemuMetadata;
    })();
    AICommon.BotMediaMetadata = (function () {
        function BotMediaMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMediaMetadata.prototype.fileSha256 = null;
        BotMediaMetadata.prototype.mediaKey = null;
        BotMediaMetadata.prototype.fileEncSha256 = null;
        BotMediaMetadata.prototype.directPath = null;
        BotMediaMetadata.prototype.mediaKeyTimestamp = null;
        BotMediaMetadata.prototype.mimetype = null;
        BotMediaMetadata.prototype.orientationType = null;
        var $oneOfFields;
        Object.defineProperty(BotMediaMetadata.prototype, "_fileSha256", {
            get: $util.oneOfGetter(($oneOfFields = ["fileSha256"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_mediaKey", {
            get: $util.oneOfGetter(($oneOfFields = ["mediaKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_fileEncSha256", {
            get: $util.oneOfGetter(($oneOfFields = ["fileEncSha256"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_directPath", {
            get: $util.oneOfGetter(($oneOfFields = ["directPath"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_mediaKeyTimestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["mediaKeyTimestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_mimetype", {
            get: $util.oneOfGetter(($oneOfFields = ["mimetype"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMediaMetadata.prototype, "_orientationType", {
            get: $util.oneOfGetter(($oneOfFields = ["orientationType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMediaMetadata.create = function create(properties) {
            return new BotMediaMetadata(properties);
        };
        BotMediaMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.fileSha256 != null && Object.hasOwnProperty.call(message, "fileSha256"))
                writer.uint32(10).string(message.fileSha256);
            if (message.mediaKey != null && Object.hasOwnProperty.call(message, "mediaKey"))
                writer.uint32(18).string(message.mediaKey);
            if (
                message.fileEncSha256 != null &&
                Object.hasOwnProperty.call(message, "fileEncSha256")
            )
                writer.uint32(26).string(message.fileEncSha256);
            if (message.directPath != null && Object.hasOwnProperty.call(message, "directPath"))
                writer.uint32(34).string(message.directPath);
            if (
                message.mediaKeyTimestamp != null &&
                Object.hasOwnProperty.call(message, "mediaKeyTimestamp")
            )
                writer.uint32(40).int64(message.mediaKeyTimestamp);
            if (message.mimetype != null && Object.hasOwnProperty.call(message, "mimetype"))
                writer.uint32(50).string(message.mimetype);
            if (
                message.orientationType != null &&
                Object.hasOwnProperty.call(message, "orientationType")
            )
                writer.uint32(56).int32(message.orientationType);
            return writer;
        };
        BotMediaMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMediaMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMediaMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.fileSha256 = reader.string();
                        break;
                    }
                    case 2: {
                        message.mediaKey = reader.string();
                        break;
                    }
                    case 3: {
                        message.fileEncSha256 = reader.string();
                        break;
                    }
                    case 4: {
                        message.directPath = reader.string();
                        break;
                    }
                    case 5: {
                        message.mediaKeyTimestamp = reader.int64();
                        break;
                    }
                    case 6: {
                        message.mimetype = reader.string();
                        break;
                    }
                    case 7: {
                        message.orientationType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMediaMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMediaMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.fileSha256 != null && message.hasOwnProperty("fileSha256")) {
                properties._fileSha256 = 1;
                if (!$util.isString(message.fileSha256)) return "fileSha256: string expected";
            }
            if (message.mediaKey != null && message.hasOwnProperty("mediaKey")) {
                properties._mediaKey = 1;
                if (!$util.isString(message.mediaKey)) return "mediaKey: string expected";
            }
            if (message.fileEncSha256 != null && message.hasOwnProperty("fileEncSha256")) {
                properties._fileEncSha256 = 1;
                if (!$util.isString(message.fileEncSha256)) return "fileEncSha256: string expected";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                properties._directPath = 1;
                if (!$util.isString(message.directPath)) return "directPath: string expected";
            }
            if (message.mediaKeyTimestamp != null && message.hasOwnProperty("mediaKeyTimestamp")) {
                properties._mediaKeyTimestamp = 1;
                if (
                    !$util.isInteger(message.mediaKeyTimestamp) &&
                    !(
                        message.mediaKeyTimestamp &&
                        $util.isInteger(message.mediaKeyTimestamp.low) &&
                        $util.isInteger(message.mediaKeyTimestamp.high)
                    )
                )
                    return "mediaKeyTimestamp: integer|Long expected";
            }
            if (message.mimetype != null && message.hasOwnProperty("mimetype")) {
                properties._mimetype = 1;
                if (!$util.isString(message.mimetype)) return "mimetype: string expected";
            }
            if (message.orientationType != null && message.hasOwnProperty("orientationType")) {
                properties._orientationType = 1;
                switch (message.orientationType) {
                    default:
                        return "orientationType: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            }
            return null;
        };
        BotMediaMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMediaMetadata) return object;
            var message = new $root.AICommon.BotMediaMetadata();
            if (object.fileSha256 != null) message.fileSha256 = String(object.fileSha256);
            if (object.mediaKey != null) message.mediaKey = String(object.mediaKey);
            if (object.fileEncSha256 != null) message.fileEncSha256 = String(object.fileEncSha256);
            if (object.directPath != null) message.directPath = String(object.directPath);
            if (object.mediaKeyTimestamp != null)
                if ($util.Long)
                    (message.mediaKeyTimestamp = $util.Long.fromValue(
                        object.mediaKeyTimestamp
                    )).unsigned = false;
                else if (typeof object.mediaKeyTimestamp === "string")
                    message.mediaKeyTimestamp = parseInt(object.mediaKeyTimestamp, 10);
                else if (typeof object.mediaKeyTimestamp === "number")
                    message.mediaKeyTimestamp = object.mediaKeyTimestamp;
                else if (typeof object.mediaKeyTimestamp === "object")
                    message.mediaKeyTimestamp = new $util.LongBits(
                        object.mediaKeyTimestamp.low >>> 0,
                        object.mediaKeyTimestamp.high >>> 0
                    ).toNumber();
            if (object.mimetype != null) message.mimetype = String(object.mimetype);
            switch (object.orientationType) {
                default:
                    if (typeof object.orientationType === "number") {
                        message.orientationType = object.orientationType;
                        break;
                    }
                    break;
                case "CENTER":
                case 1:
                    message.orientationType = 1;
                    break;
                case "LEFT":
                case 2:
                    message.orientationType = 2;
                    break;
                case "RIGHT":
                case 3:
                    message.orientationType = 3;
                    break;
            }
            return message;
        };
        BotMediaMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.fileSha256 != null && message.hasOwnProperty("fileSha256")) {
                object.fileSha256 = message.fileSha256;
                if (options.oneofs) object._fileSha256 = "fileSha256";
            }
            if (message.mediaKey != null && message.hasOwnProperty("mediaKey")) {
                object.mediaKey = message.mediaKey;
                if (options.oneofs) object._mediaKey = "mediaKey";
            }
            if (message.fileEncSha256 != null && message.hasOwnProperty("fileEncSha256")) {
                object.fileEncSha256 = message.fileEncSha256;
                if (options.oneofs) object._fileEncSha256 = "fileEncSha256";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                object.directPath = message.directPath;
                if (options.oneofs) object._directPath = "directPath";
            }
            if (message.mediaKeyTimestamp != null && message.hasOwnProperty("mediaKeyTimestamp")) {
                if (typeof message.mediaKeyTimestamp === "number")
                    object.mediaKeyTimestamp =
                        options.longs === String
                            ? String(message.mediaKeyTimestamp)
                            : message.mediaKeyTimestamp;
                else
                    object.mediaKeyTimestamp =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.mediaKeyTimestamp)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.mediaKeyTimestamp.low >>> 0,
                                    message.mediaKeyTimestamp.high >>> 0
                                ).toNumber()
                              : message.mediaKeyTimestamp;
                if (options.oneofs) object._mediaKeyTimestamp = "mediaKeyTimestamp";
            }
            if (message.mimetype != null && message.hasOwnProperty("mimetype")) {
                object.mimetype = message.mimetype;
                if (options.oneofs) object._mimetype = "mimetype";
            }
            if (message.orientationType != null && message.hasOwnProperty("orientationType")) {
                object.orientationType =
                    options.enums === String
                        ? $root.AICommon.BotMediaMetadata.OrientationType[
                              message.orientationType
                          ] === undefined
                            ? message.orientationType
                            : $root.AICommon.BotMediaMetadata.OrientationType[
                                  message.orientationType
                              ]
                        : message.orientationType;
                if (options.oneofs) object._orientationType = "orientationType";
            }
            return object;
        };
        BotMediaMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMediaMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMediaMetadata";
        };
        BotMediaMetadata.OrientationType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[1] = "CENTER")] = 1;
            values[(valuesById[2] = "LEFT")] = 2;
            values[(valuesById[3] = "RIGHT")] = 3;
            return values;
        })();
        return BotMediaMetadata;
    })();
    AICommon.BotSessionMetadata = (function () {
        function BotSessionMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotSessionMetadata.prototype.sessionId = null;
        BotSessionMetadata.prototype.sessionSource = null;
        var $oneOfFields;
        Object.defineProperty(BotSessionMetadata.prototype, "_sessionId", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotSessionMetadata.prototype, "_sessionSource", {
            get: $util.oneOfGetter(($oneOfFields = ["sessionSource"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotSessionMetadata.create = function create(properties) {
            return new BotSessionMetadata(properties);
        };
        BotSessionMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                writer.uint32(10).string(message.sessionId);
            if (
                message.sessionSource != null &&
                Object.hasOwnProperty.call(message, "sessionSource")
            )
                writer.uint32(16).int32(message.sessionSource);
            return writer;
        };
        BotSessionMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotSessionMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotSessionMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.sessionId = reader.string();
                        break;
                    }
                    case 2: {
                        message.sessionSource = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotSessionMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotSessionMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.sessionId != null && message.hasOwnProperty("sessionId")) {
                properties._sessionId = 1;
                if (!$util.isString(message.sessionId)) return "sessionId: string expected";
            }
            if (message.sessionSource != null && message.hasOwnProperty("sessionSource")) {
                properties._sessionSource = 1;
                switch (message.sessionSource) {
                    default:
                        return "sessionSource: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                }
            }
            return null;
        };
        BotSessionMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotSessionMetadata) return object;
            var message = new $root.AICommon.BotSessionMetadata();
            if (object.sessionId != null) message.sessionId = String(object.sessionId);
            switch (object.sessionSource) {
                default:
                    if (typeof object.sessionSource === "number") {
                        message.sessionSource = object.sessionSource;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.sessionSource = 0;
                    break;
                case "NULL_STATE":
                case 1:
                    message.sessionSource = 1;
                    break;
                case "TYPEAHEAD":
                case 2:
                    message.sessionSource = 2;
                    break;
                case "USER_INPUT":
                case 3:
                    message.sessionSource = 3;
                    break;
                case "EMU_FLASH":
                case 4:
                    message.sessionSource = 4;
                    break;
                case "EMU_FLASH_FOLLOWUP":
                case 5:
                    message.sessionSource = 5;
                    break;
                case "VOICE":
                case 6:
                    message.sessionSource = 6;
                    break;
            }
            return message;
        };
        BotSessionMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.sessionId != null && message.hasOwnProperty("sessionId")) {
                object.sessionId = message.sessionId;
                if (options.oneofs) object._sessionId = "sessionId";
            }
            if (message.sessionSource != null && message.hasOwnProperty("sessionSource")) {
                object.sessionSource =
                    options.enums === String
                        ? $root.AICommon.BotSessionSource[message.sessionSource] === undefined
                            ? message.sessionSource
                            : $root.AICommon.BotSessionSource[message.sessionSource]
                        : message.sessionSource;
                if (options.oneofs) object._sessionSource = "sessionSource";
            }
            return object;
        };
        BotSessionMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotSessionMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotSessionMetadata";
        };
        return BotSessionMetadata;
    })();
    AICommon.BotMetricsMetadata = (function () {
        function BotMetricsMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMetricsMetadata.prototype.destinationId = null;
        BotMetricsMetadata.prototype.destinationEntryPoint = null;
        BotMetricsMetadata.prototype.threadOrigin = null;
        var $oneOfFields;
        Object.defineProperty(BotMetricsMetadata.prototype, "_destinationId", {
            get: $util.oneOfGetter(($oneOfFields = ["destinationId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetricsMetadata.prototype, "_destinationEntryPoint", {
            get: $util.oneOfGetter(($oneOfFields = ["destinationEntryPoint"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMetricsMetadata.prototype, "_threadOrigin", {
            get: $util.oneOfGetter(($oneOfFields = ["threadOrigin"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMetricsMetadata.create = function create(properties) {
            return new BotMetricsMetadata(properties);
        };
        BotMetricsMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.destinationId != null &&
                Object.hasOwnProperty.call(message, "destinationId")
            )
                writer.uint32(10).string(message.destinationId);
            if (
                message.destinationEntryPoint != null &&
                Object.hasOwnProperty.call(message, "destinationEntryPoint")
            )
                writer.uint32(16).int32(message.destinationEntryPoint);
            if (message.threadOrigin != null && Object.hasOwnProperty.call(message, "threadOrigin"))
                writer.uint32(24).int32(message.threadOrigin);
            return writer;
        };
        BotMetricsMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMetricsMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMetricsMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.destinationId = reader.string();
                        break;
                    }
                    case 2: {
                        message.destinationEntryPoint = reader.int32();
                        break;
                    }
                    case 3: {
                        message.threadOrigin = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMetricsMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMetricsMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.destinationId != null && message.hasOwnProperty("destinationId")) {
                properties._destinationId = 1;
                if (!$util.isString(message.destinationId)) return "destinationId: string expected";
            }
            if (
                message.destinationEntryPoint != null &&
                message.hasOwnProperty("destinationEntryPoint")
            ) {
                properties._destinationEntryPoint = 1;
                switch (message.destinationEntryPoint) {
                    default:
                        return "destinationEntryPoint: enum value expected";
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
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                        break;
                }
            }
            if (message.threadOrigin != null && message.hasOwnProperty("threadOrigin")) {
                properties._threadOrigin = 1;
                switch (message.threadOrigin) {
                    default:
                        return "threadOrigin: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                }
            }
            return null;
        };
        BotMetricsMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMetricsMetadata) return object;
            var message = new $root.AICommon.BotMetricsMetadata();
            if (object.destinationId != null) message.destinationId = String(object.destinationId);
            switch (object.destinationEntryPoint) {
                default:
                    if (typeof object.destinationEntryPoint === "number") {
                        message.destinationEntryPoint = object.destinationEntryPoint;
                        break;
                    }
                    break;
                case "UNDEFINED_ENTRY_POINT":
                case 0:
                    message.destinationEntryPoint = 0;
                    break;
                case "FAVICON":
                case 1:
                    message.destinationEntryPoint = 1;
                    break;
                case "CHATLIST":
                case 2:
                    message.destinationEntryPoint = 2;
                    break;
                case "AISEARCH_NULL_STATE_PAPER_PLANE":
                case 3:
                    message.destinationEntryPoint = 3;
                    break;
                case "AISEARCH_NULL_STATE_SUGGESTION":
                case 4:
                    message.destinationEntryPoint = 4;
                    break;
                case "AISEARCH_TYPE_AHEAD_SUGGESTION":
                case 5:
                    message.destinationEntryPoint = 5;
                    break;
                case "AISEARCH_TYPE_AHEAD_PAPER_PLANE":
                case 6:
                    message.destinationEntryPoint = 6;
                    break;
                case "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST":
                case 7:
                    message.destinationEntryPoint = 7;
                    break;
                case "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES":
                case 8:
                    message.destinationEntryPoint = 8;
                    break;
                case "AIVOICE_SEARCH_BAR":
                case 9:
                    message.destinationEntryPoint = 9;
                    break;
                case "AIVOICE_FAVICON":
                case 10:
                    message.destinationEntryPoint = 10;
                    break;
                case "AISTUDIO":
                case 11:
                    message.destinationEntryPoint = 11;
                    break;
                case "DEEPLINK":
                case 12:
                    message.destinationEntryPoint = 12;
                    break;
                case "NOTIFICATION":
                case 13:
                    message.destinationEntryPoint = 13;
                    break;
                case "PROFILE_MESSAGE_BUTTON":
                case 14:
                    message.destinationEntryPoint = 14;
                    break;
                case "FORWARD":
                case 15:
                    message.destinationEntryPoint = 15;
                    break;
                case "APP_SHORTCUT":
                case 16:
                    message.destinationEntryPoint = 16;
                    break;
                case "FF_FAMILY":
                case 17:
                    message.destinationEntryPoint = 17;
                    break;
                case "AI_TAB":
                case 18:
                    message.destinationEntryPoint = 18;
                    break;
                case "AI_HOME":
                case 19:
                    message.destinationEntryPoint = 19;
                    break;
                case "AI_DEEPLINK_IMMERSIVE":
                case 20:
                    message.destinationEntryPoint = 20;
                    break;
                case "AI_DEEPLINK":
                case 21:
                    message.destinationEntryPoint = 21;
                    break;
                case "META_AI_CHAT_SHORTCUT_AI_STUDIO":
                case 22:
                    message.destinationEntryPoint = 22;
                    break;
                case "UGC_CHAT_SHORTCUT_AI_STUDIO":
                case 23:
                    message.destinationEntryPoint = 23;
                    break;
                case "NEW_CHAT_AI_STUDIO":
                case 24:
                    message.destinationEntryPoint = 24;
                    break;
                case "AIVOICE_FAVICON_CALL_HISTORY":
                case 25:
                    message.destinationEntryPoint = 25;
                    break;
                case "ASK_META_AI_CONTEXT_MENU":
                case 26:
                    message.destinationEntryPoint = 26;
                    break;
                case "ASK_META_AI_CONTEXT_MENU_1ON1":
                case 27:
                    message.destinationEntryPoint = 27;
                    break;
                case "ASK_META_AI_CONTEXT_MENU_GROUP":
                case 28:
                    message.destinationEntryPoint = 28;
                    break;
                case "INVOKE_META_AI_1ON1":
                case 29:
                    message.destinationEntryPoint = 29;
                    break;
                case "INVOKE_META_AI_GROUP":
                case 30:
                    message.destinationEntryPoint = 30;
                    break;
                case "META_AI_FORWARD":
                case 31:
                    message.destinationEntryPoint = 31;
                    break;
                case "NEW_CHAT_AI_CONTACT":
                case 32:
                    message.destinationEntryPoint = 32;
                    break;
                case "MESSAGE_QUICK_ACTION_1_ON_1_CHAT":
                case 33:
                    message.destinationEntryPoint = 33;
                    break;
                case "MESSAGE_QUICK_ACTION_GROUP_CHAT":
                case 34:
                    message.destinationEntryPoint = 34;
                    break;
                case "ATTACHMENT_TRAY_1_ON_1_CHAT":
                case 35:
                    message.destinationEntryPoint = 35;
                    break;
                case "ATTACHMENT_TRAY_GROUP_CHAT":
                case 36:
                    message.destinationEntryPoint = 36;
                    break;
                case "ASK_META_AI_MEDIA_VIEWER_1ON1":
                case 37:
                    message.destinationEntryPoint = 37;
                    break;
                case "ASK_META_AI_MEDIA_VIEWER_GROUP":
                case 38:
                    message.destinationEntryPoint = 38;
                    break;
            }
            switch (object.threadOrigin) {
                default:
                    if (typeof object.threadOrigin === "number") {
                        message.threadOrigin = object.threadOrigin;
                        break;
                    }
                    break;
                case "AI_TAB_THREAD":
                case 1:
                    message.threadOrigin = 1;
                    break;
                case "AI_HOME_THREAD":
                case 2:
                    message.threadOrigin = 2;
                    break;
                case "AI_DEEPLINK_IMMERSIVE_THREAD":
                case 3:
                    message.threadOrigin = 3;
                    break;
                case "AI_DEEPLINK_THREAD":
                case 4:
                    message.threadOrigin = 4;
                    break;
                case "ASK_META_AI_CONTEXT_MENU_THREAD":
                case 5:
                    message.threadOrigin = 5;
                    break;
            }
            return message;
        };
        BotMetricsMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.destinationId != null && message.hasOwnProperty("destinationId")) {
                object.destinationId = message.destinationId;
                if (options.oneofs) object._destinationId = "destinationId";
            }
            if (
                message.destinationEntryPoint != null &&
                message.hasOwnProperty("destinationEntryPoint")
            ) {
                object.destinationEntryPoint =
                    options.enums === String
                        ? $root.AICommon.BotMetricsEntryPoint[message.destinationEntryPoint] ===
                          undefined
                            ? message.destinationEntryPoint
                            : $root.AICommon.BotMetricsEntryPoint[message.destinationEntryPoint]
                        : message.destinationEntryPoint;
                if (options.oneofs) object._destinationEntryPoint = "destinationEntryPoint";
            }
            if (message.threadOrigin != null && message.hasOwnProperty("threadOrigin")) {
                object.threadOrigin =
                    options.enums === String
                        ? $root.AICommon.BotMetricsThreadEntryPoint[message.threadOrigin] ===
                          undefined
                            ? message.threadOrigin
                            : $root.AICommon.BotMetricsThreadEntryPoint[message.threadOrigin]
                        : message.threadOrigin;
                if (options.oneofs) object._threadOrigin = "threadOrigin";
            }
            return object;
        };
        BotMetricsMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMetricsMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMetricsMetadata";
        };
        return BotMetricsMetadata;
    })();
    AICommon.BotRenderingMetadata = (function () {
        function BotRenderingMetadata(properties) {
            this.keywords = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotRenderingMetadata.prototype.keywords = $util.emptyArray;
        BotRenderingMetadata.create = function create(properties) {
            return new BotRenderingMetadata(properties);
        };
        BotRenderingMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.keywords != null && message.keywords.length)
                for (var i = 0; i < message.keywords.length; ++i)
                    $root.AICommon.BotRenderingMetadata.Keyword.encode(
                        message.keywords[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotRenderingMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotRenderingMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotRenderingMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.keywords && message.keywords.length)) message.keywords = [];
                        message.keywords.push(
                            $root.AICommon.BotRenderingMetadata.Keyword.decode(
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
        BotRenderingMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotRenderingMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.keywords != null && message.hasOwnProperty("keywords")) {
                if (!Array.isArray(message.keywords)) return "keywords: array expected";
                for (var i = 0; i < message.keywords.length; ++i) {
                    var error = $root.AICommon.BotRenderingMetadata.Keyword.verify(
                        message.keywords[i]
                    );
                    if (error) return "keywords." + error;
                }
            }
            return null;
        };
        BotRenderingMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotRenderingMetadata) return object;
            var message = new $root.AICommon.BotRenderingMetadata();
            if (object.keywords) {
                if (!Array.isArray(object.keywords))
                    throw TypeError(".AICommon.BotRenderingMetadata.keywords: array expected");
                message.keywords = [];
                for (var i = 0; i < object.keywords.length; ++i) {
                    if (typeof object.keywords[i] !== "object")
                        throw TypeError(".AICommon.BotRenderingMetadata.keywords: object expected");
                    message.keywords[i] = $root.AICommon.BotRenderingMetadata.Keyword.fromObject(
                        object.keywords[i]
                    );
                }
            }
            return message;
        };
        BotRenderingMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.keywords = [];
            if (message.keywords && message.keywords.length) {
                object.keywords = [];
                for (var j = 0; j < message.keywords.length; ++j)
                    object.keywords[j] = $root.AICommon.BotRenderingMetadata.Keyword.toObject(
                        message.keywords[j],
                        options
                    );
            }
            return object;
        };
        BotRenderingMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotRenderingMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotRenderingMetadata";
        };
        BotRenderingMetadata.Keyword = (function () {
            function Keyword(properties) {
                this.associatedPrompts = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            Keyword.prototype.value = null;
            Keyword.prototype.associatedPrompts = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(Keyword.prototype, "_value", {
                get: $util.oneOfGetter(($oneOfFields = ["value"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Keyword.create = function create(properties) {
                return new Keyword(properties);
            };
            Keyword.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(10).string(message.value);
                if (message.associatedPrompts != null && message.associatedPrompts.length)
                    for (var i = 0; i < message.associatedPrompts.length; ++i)
                        writer.uint32(18).string(message.associatedPrompts[i]);
                return writer;
            };
            Keyword.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            Keyword.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.AICommon.BotRenderingMetadata.Keyword();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.value = reader.string();
                            break;
                        }
                        case 2: {
                            if (!(message.associatedPrompts && message.associatedPrompts.length))
                                message.associatedPrompts = [];
                            message.associatedPrompts.push(reader.string());
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            Keyword.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            Keyword.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.value != null && message.hasOwnProperty("value")) {
                    properties._value = 1;
                    if (!$util.isString(message.value)) return "value: string expected";
                }
                if (
                    message.associatedPrompts != null &&
                    message.hasOwnProperty("associatedPrompts")
                ) {
                    if (!Array.isArray(message.associatedPrompts))
                        return "associatedPrompts: array expected";
                    for (var i = 0; i < message.associatedPrompts.length; ++i)
                        if (!$util.isString(message.associatedPrompts[i]))
                            return "associatedPrompts: string[] expected";
                }
                return null;
            };
            Keyword.fromObject = function fromObject(object) {
                if (object instanceof $root.AICommon.BotRenderingMetadata.Keyword) return object;
                var message = new $root.AICommon.BotRenderingMetadata.Keyword();
                if (object.value != null) message.value = String(object.value);
                if (object.associatedPrompts) {
                    if (!Array.isArray(object.associatedPrompts))
                        throw TypeError(
                            ".AICommon.BotRenderingMetadata.Keyword.associatedPrompts: array expected"
                        );
                    message.associatedPrompts = [];
                    for (var i = 0; i < object.associatedPrompts.length; ++i)
                        message.associatedPrompts[i] = String(object.associatedPrompts[i]);
                }
                return message;
            };
            Keyword.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.associatedPrompts = [];
                if (message.value != null && message.hasOwnProperty("value")) {
                    object.value = message.value;
                    if (options.oneofs) object._value = "value";
                }
                if (message.associatedPrompts && message.associatedPrompts.length) {
                    object.associatedPrompts = [];
                    for (var j = 0; j < message.associatedPrompts.length; ++j)
                        object.associatedPrompts[j] = message.associatedPrompts[j];
                }
                return object;
            };
            Keyword.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            Keyword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/AICommon.BotRenderingMetadata.Keyword";
            };
            return Keyword;
        })();
        return BotRenderingMetadata;
    })();
    AICommon.BotPromotionMessageMetadata = (function () {
        function BotPromotionMessageMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotPromotionMessageMetadata.prototype.promotionType = null;
        BotPromotionMessageMetadata.prototype.buttonTitle = null;
        var $oneOfFields;
        Object.defineProperty(BotPromotionMessageMetadata.prototype, "_promotionType", {
            get: $util.oneOfGetter(($oneOfFields = ["promotionType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPromotionMessageMetadata.prototype, "_buttonTitle", {
            get: $util.oneOfGetter(($oneOfFields = ["buttonTitle"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotPromotionMessageMetadata.create = function create(properties) {
            return new BotPromotionMessageMetadata(properties);
        };
        BotPromotionMessageMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.promotionType != null &&
                Object.hasOwnProperty.call(message, "promotionType")
            )
                writer.uint32(8).int32(message.promotionType);
            if (message.buttonTitle != null && Object.hasOwnProperty.call(message, "buttonTitle"))
                writer.uint32(18).string(message.buttonTitle);
            return writer;
        };
        BotPromotionMessageMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotPromotionMessageMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotPromotionMessageMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.promotionType = reader.int32();
                        break;
                    }
                    case 2: {
                        message.buttonTitle = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotPromotionMessageMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotPromotionMessageMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.promotionType != null && message.hasOwnProperty("promotionType")) {
                properties._promotionType = 1;
                switch (message.promotionType) {
                    default:
                        return "promotionType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.buttonTitle != null && message.hasOwnProperty("buttonTitle")) {
                properties._buttonTitle = 1;
                if (!$util.isString(message.buttonTitle)) return "buttonTitle: string expected";
            }
            return null;
        };
        BotPromotionMessageMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotPromotionMessageMetadata) return object;
            var message = new $root.AICommon.BotPromotionMessageMetadata();
            switch (object.promotionType) {
                default:
                    if (typeof object.promotionType === "number") {
                        message.promotionType = object.promotionType;
                        break;
                    }
                    break;
                case "UNKNOWN_TYPE":
                case 0:
                    message.promotionType = 0;
                    break;
                case "C50":
                case 1:
                    message.promotionType = 1;
                    break;
                case "SURVEY_PLATFORM":
                case 2:
                    message.promotionType = 2;
                    break;
            }
            if (object.buttonTitle != null) message.buttonTitle = String(object.buttonTitle);
            return message;
        };
        BotPromotionMessageMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.promotionType != null && message.hasOwnProperty("promotionType")) {
                object.promotionType =
                    options.enums === String
                        ? $root.AICommon.BotPromotionMessageMetadata.BotPromotionType[
                              message.promotionType
                          ] === undefined
                            ? message.promotionType
                            : $root.AICommon.BotPromotionMessageMetadata.BotPromotionType[
                                  message.promotionType
                              ]
                        : message.promotionType;
                if (options.oneofs) object._promotionType = "promotionType";
            }
            if (message.buttonTitle != null && message.hasOwnProperty("buttonTitle")) {
                object.buttonTitle = message.buttonTitle;
                if (options.oneofs) object._buttonTitle = "buttonTitle";
            }
            return object;
        };
        BotPromotionMessageMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotPromotionMessageMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotPromotionMessageMetadata";
        };
        BotPromotionMessageMetadata.BotPromotionType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN_TYPE")] = 0;
            values[(valuesById[1] = "C50")] = 1;
            values[(valuesById[2] = "SURVEY_PLATFORM")] = 2;
            return values;
        })();
        return BotPromotionMessageMetadata;
    })();
    AICommon.BotSignatureVerificationUseCaseProof = (function () {
        function BotSignatureVerificationUseCaseProof(properties) {
            this.certificateChain = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotSignatureVerificationUseCaseProof.prototype.version = null;
        BotSignatureVerificationUseCaseProof.prototype.useCase = null;
        BotSignatureVerificationUseCaseProof.prototype.signature = null;
        BotSignatureVerificationUseCaseProof.prototype.certificateChain = $util.emptyArray;
        var $oneOfFields;
        Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_useCase", {
            get: $util.oneOfGetter(($oneOfFields = ["useCase"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_signature", {
            get: $util.oneOfGetter(($oneOfFields = ["signature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotSignatureVerificationUseCaseProof.create = function create(properties) {
            return new BotSignatureVerificationUseCaseProof(properties);
        };
        BotSignatureVerificationUseCaseProof.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(8).int32(message.version);
            if (message.useCase != null && Object.hasOwnProperty.call(message, "useCase"))
                writer.uint32(16).int32(message.useCase);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(26).bytes(message.signature);
            if (message.certificateChain != null && message.certificateChain.length)
                for (var i = 0; i < message.certificateChain.length; ++i)
                    writer.uint32(34).bytes(message.certificateChain[i]);
            return writer;
        };
        BotSignatureVerificationUseCaseProof.encodeDelimited = function encodeDelimited(
            message,
            writer
        ) {
            return this.encode(message, writer).ldelim();
        };
        BotSignatureVerificationUseCaseProof.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotSignatureVerificationUseCaseProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.version = reader.int32();
                        break;
                    }
                    case 2: {
                        message.useCase = reader.int32();
                        break;
                    }
                    case 3: {
                        message.signature = reader.bytes();
                        break;
                    }
                    case 4: {
                        if (!(message.certificateChain && message.certificateChain.length))
                            message.certificateChain = [];
                        message.certificateChain.push(reader.bytes());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotSignatureVerificationUseCaseProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotSignatureVerificationUseCaseProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                if (!$util.isInteger(message.version)) return "version: integer expected";
            }
            if (message.useCase != null && message.hasOwnProperty("useCase")) {
                properties._useCase = 1;
                switch (message.useCase) {
                    default:
                        return "useCase: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
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
            if (message.certificateChain != null && message.hasOwnProperty("certificateChain")) {
                if (!Array.isArray(message.certificateChain))
                    return "certificateChain: array expected";
                for (var i = 0; i < message.certificateChain.length; ++i)
                    if (
                        !(
                            (message.certificateChain[i] &&
                                typeof message.certificateChain[i].length === "number") ||
                            $util.isString(message.certificateChain[i])
                        )
                    )
                        return "certificateChain: buffer[] expected";
            }
            return null;
        };
        BotSignatureVerificationUseCaseProof.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotSignatureVerificationUseCaseProof)
                return object;
            var message = new $root.AICommon.BotSignatureVerificationUseCaseProof();
            if (object.version != null) message.version = object.version | 0;
            switch (object.useCase) {
                default:
                    if (typeof object.useCase === "number") {
                        message.useCase = object.useCase;
                        break;
                    }
                    break;
                case "UNSPECIFIED":
                case 0:
                    message.useCase = 0;
                    break;
                case "WA_BOT_MSG":
                case 1:
                    message.useCase = 1;
                    break;
            }
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
            if (object.certificateChain) {
                if (!Array.isArray(object.certificateChain))
                    throw TypeError(
                        ".AICommon.BotSignatureVerificationUseCaseProof.certificateChain: array expected"
                    );
                message.certificateChain = [];
                for (var i = 0; i < object.certificateChain.length; ++i)
                    if (typeof object.certificateChain[i] === "string")
                        $util.base64.decode(
                            object.certificateChain[i],
                            (message.certificateChain[i] = $util.newBuffer(
                                $util.base64.length(object.certificateChain[i])
                            )),
                            0
                        );
                    else if (object.certificateChain[i].length >= 0)
                        message.certificateChain[i] = object.certificateChain[i];
            }
            return message;
        };
        BotSignatureVerificationUseCaseProof.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.certificateChain = [];
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = message.version;
                if (options.oneofs) object._version = "version";
            }
            if (message.useCase != null && message.hasOwnProperty("useCase")) {
                object.useCase =
                    options.enums === String
                        ? $root.AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[
                              message.useCase
                          ] === undefined
                            ? message.useCase
                            : $root.AICommon.BotSignatureVerificationUseCaseProof
                                  .BotSignatureUseCase[message.useCase]
                        : message.useCase;
                if (options.oneofs) object._useCase = "useCase";
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
            if (message.certificateChain && message.certificateChain.length) {
                object.certificateChain = [];
                for (var j = 0; j < message.certificateChain.length; ++j)
                    object.certificateChain[j] =
                        options.bytes === String
                            ? $util.base64.encode(
                                  message.certificateChain[j],
                                  0,
                                  message.certificateChain[j].length
                              )
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.certificateChain[j])
                              : message.certificateChain[j];
            }
            return object;
        };
        BotSignatureVerificationUseCaseProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotSignatureVerificationUseCaseProof.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotSignatureVerificationUseCaseProof";
        };
        BotSignatureVerificationUseCaseProof.BotSignatureUseCase = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNSPECIFIED")] = 0;
            values[(valuesById[1] = "WA_BOT_MSG")] = 1;
            return values;
        })();
        return BotSignatureVerificationUseCaseProof;
    })();
    AICommon.BotSignatureVerificationMetadata = (function () {
        function BotSignatureVerificationMetadata(properties) {
            this.proofs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotSignatureVerificationMetadata.prototype.proofs = $util.emptyArray;
        BotSignatureVerificationMetadata.create = function create(properties) {
            return new BotSignatureVerificationMetadata(properties);
        };
        BotSignatureVerificationMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.proofs != null && message.proofs.length)
                for (var i = 0; i < message.proofs.length; ++i)
                    $root.AICommon.BotSignatureVerificationUseCaseProof.encode(
                        message.proofs[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotSignatureVerificationMetadata.encodeDelimited = function encodeDelimited(
            message,
            writer
        ) {
            return this.encode(message, writer).ldelim();
        };
        BotSignatureVerificationMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotSignatureVerificationMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.proofs && message.proofs.length)) message.proofs = [];
                        message.proofs.push(
                            $root.AICommon.BotSignatureVerificationUseCaseProof.decode(
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
        BotSignatureVerificationMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotSignatureVerificationMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.proofs != null && message.hasOwnProperty("proofs")) {
                if (!Array.isArray(message.proofs)) return "proofs: array expected";
                for (var i = 0; i < message.proofs.length; ++i) {
                    var error = $root.AICommon.BotSignatureVerificationUseCaseProof.verify(
                        message.proofs[i]
                    );
                    if (error) return "proofs." + error;
                }
            }
            return null;
        };
        BotSignatureVerificationMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotSignatureVerificationMetadata) return object;
            var message = new $root.AICommon.BotSignatureVerificationMetadata();
            if (object.proofs) {
                if (!Array.isArray(object.proofs))
                    throw TypeError(
                        ".AICommon.BotSignatureVerificationMetadata.proofs: array expected"
                    );
                message.proofs = [];
                for (var i = 0; i < object.proofs.length; ++i) {
                    if (typeof object.proofs[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotSignatureVerificationMetadata.proofs: object expected"
                        );
                    message.proofs[i] =
                        $root.AICommon.BotSignatureVerificationUseCaseProof.fromObject(
                            object.proofs[i]
                        );
                }
            }
            return message;
        };
        BotSignatureVerificationMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.proofs = [];
            if (message.proofs && message.proofs.length) {
                object.proofs = [];
                for (var j = 0; j < message.proofs.length; ++j)
                    object.proofs[j] = $root.AICommon.BotSignatureVerificationUseCaseProof.toObject(
                        message.proofs[j],
                        options
                    );
            }
            return object;
        };
        BotSignatureVerificationMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotSignatureVerificationMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotSignatureVerificationMetadata";
        };
        return BotSignatureVerificationMetadata;
    })();
    AICommon.BotMemoryFact = (function () {
        function BotMemoryFact(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMemoryFact.prototype.fact = null;
        BotMemoryFact.prototype.factId = null;
        var $oneOfFields;
        Object.defineProperty(BotMemoryFact.prototype, "_fact", {
            get: $util.oneOfGetter(($oneOfFields = ["fact"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotMemoryFact.prototype, "_factId", {
            get: $util.oneOfGetter(($oneOfFields = ["factId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMemoryFact.create = function create(properties) {
            return new BotMemoryFact(properties);
        };
        BotMemoryFact.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.fact != null && Object.hasOwnProperty.call(message, "fact"))
                writer.uint32(10).string(message.fact);
            if (message.factId != null && Object.hasOwnProperty.call(message, "factId"))
                writer.uint32(18).string(message.factId);
            return writer;
        };
        BotMemoryFact.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMemoryFact.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMemoryFact();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.fact = reader.string();
                        break;
                    }
                    case 2: {
                        message.factId = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMemoryFact.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMemoryFact.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.fact != null && message.hasOwnProperty("fact")) {
                properties._fact = 1;
                if (!$util.isString(message.fact)) return "fact: string expected";
            }
            if (message.factId != null && message.hasOwnProperty("factId")) {
                properties._factId = 1;
                if (!$util.isString(message.factId)) return "factId: string expected";
            }
            return null;
        };
        BotMemoryFact.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMemoryFact) return object;
            var message = new $root.AICommon.BotMemoryFact();
            if (object.fact != null) message.fact = String(object.fact);
            if (object.factId != null) message.factId = String(object.factId);
            return message;
        };
        BotMemoryFact.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.fact != null && message.hasOwnProperty("fact")) {
                object.fact = message.fact;
                if (options.oneofs) object._fact = "fact";
            }
            if (message.factId != null && message.hasOwnProperty("factId")) {
                object.factId = message.factId;
                if (options.oneofs) object._factId = "factId";
            }
            return object;
        };
        BotMemoryFact.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMemoryFact.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMemoryFact";
        };
        return BotMemoryFact;
    })();
    AICommon.BotMemoryMetadata = (function () {
        function BotMemoryMetadata(properties) {
            this.addedFacts = [];
            this.removedFacts = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotMemoryMetadata.prototype.addedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.removedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.disclaimer = null;
        var $oneOfFields;
        Object.defineProperty(BotMemoryMetadata.prototype, "_disclaimer", {
            get: $util.oneOfGetter(($oneOfFields = ["disclaimer"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotMemoryMetadata.create = function create(properties) {
            return new BotMemoryMetadata(properties);
        };
        BotMemoryMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.addedFacts != null && message.addedFacts.length)
                for (var i = 0; i < message.addedFacts.length; ++i)
                    $root.AICommon.BotMemoryFact.encode(
                        message.addedFacts[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            if (message.removedFacts != null && message.removedFacts.length)
                for (var i = 0; i < message.removedFacts.length; ++i)
                    $root.AICommon.BotMemoryFact.encode(
                        message.removedFacts[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            if (message.disclaimer != null && Object.hasOwnProperty.call(message, "disclaimer"))
                writer.uint32(26).string(message.disclaimer);
            return writer;
        };
        BotMemoryMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotMemoryMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotMemoryMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.addedFacts && message.addedFacts.length))
                            message.addedFacts = [];
                        message.addedFacts.push(
                            $root.AICommon.BotMemoryFact.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 2: {
                        if (!(message.removedFacts && message.removedFacts.length))
                            message.removedFacts = [];
                        message.removedFacts.push(
                            $root.AICommon.BotMemoryFact.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 3: {
                        message.disclaimer = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotMemoryMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotMemoryMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.addedFacts != null && message.hasOwnProperty("addedFacts")) {
                if (!Array.isArray(message.addedFacts)) return "addedFacts: array expected";
                for (var i = 0; i < message.addedFacts.length; ++i) {
                    var error = $root.AICommon.BotMemoryFact.verify(message.addedFacts[i]);
                    if (error) return "addedFacts." + error;
                }
            }
            if (message.removedFacts != null && message.hasOwnProperty("removedFacts")) {
                if (!Array.isArray(message.removedFacts)) return "removedFacts: array expected";
                for (var i = 0; i < message.removedFacts.length; ++i) {
                    var error = $root.AICommon.BotMemoryFact.verify(message.removedFacts[i]);
                    if (error) return "removedFacts." + error;
                }
            }
            if (message.disclaimer != null && message.hasOwnProperty("disclaimer")) {
                properties._disclaimer = 1;
                if (!$util.isString(message.disclaimer)) return "disclaimer: string expected";
            }
            return null;
        };
        BotMemoryMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotMemoryMetadata) return object;
            var message = new $root.AICommon.BotMemoryMetadata();
            if (object.addedFacts) {
                if (!Array.isArray(object.addedFacts))
                    throw TypeError(".AICommon.BotMemoryMetadata.addedFacts: array expected");
                message.addedFacts = [];
                for (var i = 0; i < object.addedFacts.length; ++i) {
                    if (typeof object.addedFacts[i] !== "object")
                        throw TypeError(".AICommon.BotMemoryMetadata.addedFacts: object expected");
                    message.addedFacts[i] = $root.AICommon.BotMemoryFact.fromObject(
                        object.addedFacts[i]
                    );
                }
            }
            if (object.removedFacts) {
                if (!Array.isArray(object.removedFacts))
                    throw TypeError(".AICommon.BotMemoryMetadata.removedFacts: array expected");
                message.removedFacts = [];
                for (var i = 0; i < object.removedFacts.length; ++i) {
                    if (typeof object.removedFacts[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotMemoryMetadata.removedFacts: object expected"
                        );
                    message.removedFacts[i] = $root.AICommon.BotMemoryFact.fromObject(
                        object.removedFacts[i]
                    );
                }
            }
            if (object.disclaimer != null) message.disclaimer = String(object.disclaimer);
            return message;
        };
        BotMemoryMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.addedFacts = [];
                object.removedFacts = [];
            }
            if (message.addedFacts && message.addedFacts.length) {
                object.addedFacts = [];
                for (var j = 0; j < message.addedFacts.length; ++j)
                    object.addedFacts[j] = $root.AICommon.BotMemoryFact.toObject(
                        message.addedFacts[j],
                        options
                    );
            }
            if (message.removedFacts && message.removedFacts.length) {
                object.removedFacts = [];
                for (var j = 0; j < message.removedFacts.length; ++j)
                    object.removedFacts[j] = $root.AICommon.BotMemoryFact.toObject(
                        message.removedFacts[j],
                        options
                    );
            }
            if (message.disclaimer != null && message.hasOwnProperty("disclaimer")) {
                object.disclaimer = message.disclaimer;
                if (options.oneofs) object._disclaimer = "disclaimer";
            }
            return object;
        };
        BotMemoryMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotMemoryMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotMemoryMetadata";
        };
        return BotMemoryMetadata;
    })();
    AICommon.BotLinkedAccount = (function () {
        function BotLinkedAccount(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotLinkedAccount.prototype.type = null;
        var $oneOfFields;
        Object.defineProperty(BotLinkedAccount.prototype, "_type", {
            get: $util.oneOfGetter(($oneOfFields = ["type"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotLinkedAccount.create = function create(properties) {
            return new BotLinkedAccount(properties);
        };
        BotLinkedAccount.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(8).int32(message.type);
            return writer;
        };
        BotLinkedAccount.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotLinkedAccount.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotLinkedAccount();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.type = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotLinkedAccount.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotLinkedAccount.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                properties._type = 1;
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                        break;
                }
            }
            return null;
        };
        BotLinkedAccount.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotLinkedAccount) return object;
            var message = new $root.AICommon.BotLinkedAccount();
            switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "BOT_LINKED_ACCOUNT_TYPE_1P":
                case 0:
                    message.type = 0;
                    break;
            }
            return message;
        };
        BotLinkedAccount.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                object.type =
                    options.enums === String
                        ? $root.AICommon.BotLinkedAccount.BotLinkedAccountType[message.type] ===
                          undefined
                            ? message.type
                            : $root.AICommon.BotLinkedAccount.BotLinkedAccountType[message.type]
                        : message.type;
                if (options.oneofs) object._type = "type";
            }
            return object;
        };
        BotLinkedAccount.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotLinkedAccount.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotLinkedAccount";
        };
        BotLinkedAccount.BotLinkedAccountType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "BOT_LINKED_ACCOUNT_TYPE_1P")] = 0;
            return values;
        })();
        return BotLinkedAccount;
    })();
    AICommon.BotLinkedAccountsMetadata = (function () {
        function BotLinkedAccountsMetadata(properties) {
            this.accounts = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotLinkedAccountsMetadata.prototype.accounts = $util.emptyArray;
        BotLinkedAccountsMetadata.prototype.acAuthTokens = null;
        BotLinkedAccountsMetadata.prototype.acErrorCode = null;
        var $oneOfFields;
        Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acAuthTokens", {
            get: $util.oneOfGetter(($oneOfFields = ["acAuthTokens"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acErrorCode", {
            get: $util.oneOfGetter(($oneOfFields = ["acErrorCode"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotLinkedAccountsMetadata.create = function create(properties) {
            return new BotLinkedAccountsMetadata(properties);
        };
        BotLinkedAccountsMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.accounts != null && message.accounts.length)
                for (var i = 0; i < message.accounts.length; ++i)
                    $root.AICommon.BotLinkedAccount.encode(
                        message.accounts[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            if (message.acAuthTokens != null && Object.hasOwnProperty.call(message, "acAuthTokens"))
                writer.uint32(18).bytes(message.acAuthTokens);
            if (message.acErrorCode != null && Object.hasOwnProperty.call(message, "acErrorCode"))
                writer.uint32(24).int32(message.acErrorCode);
            return writer;
        };
        BotLinkedAccountsMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotLinkedAccountsMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotLinkedAccountsMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.accounts && message.accounts.length)) message.accounts = [];
                        message.accounts.push(
                            $root.AICommon.BotLinkedAccount.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 2: {
                        message.acAuthTokens = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.acErrorCode = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotLinkedAccountsMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotLinkedAccountsMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.accounts != null && message.hasOwnProperty("accounts")) {
                if (!Array.isArray(message.accounts)) return "accounts: array expected";
                for (var i = 0; i < message.accounts.length; ++i) {
                    var error = $root.AICommon.BotLinkedAccount.verify(message.accounts[i]);
                    if (error) return "accounts." + error;
                }
            }
            if (message.acAuthTokens != null && message.hasOwnProperty("acAuthTokens")) {
                properties._acAuthTokens = 1;
                if (
                    !(
                        (message.acAuthTokens && typeof message.acAuthTokens.length === "number") ||
                        $util.isString(message.acAuthTokens)
                    )
                )
                    return "acAuthTokens: buffer expected";
            }
            if (message.acErrorCode != null && message.hasOwnProperty("acErrorCode")) {
                properties._acErrorCode = 1;
                if (!$util.isInteger(message.acErrorCode)) return "acErrorCode: integer expected";
            }
            return null;
        };
        BotLinkedAccountsMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotLinkedAccountsMetadata) return object;
            var message = new $root.AICommon.BotLinkedAccountsMetadata();
            if (object.accounts) {
                if (!Array.isArray(object.accounts))
                    throw TypeError(".AICommon.BotLinkedAccountsMetadata.accounts: array expected");
                message.accounts = [];
                for (var i = 0; i < object.accounts.length; ++i) {
                    if (typeof object.accounts[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotLinkedAccountsMetadata.accounts: object expected"
                        );
                    message.accounts[i] = $root.AICommon.BotLinkedAccount.fromObject(
                        object.accounts[i]
                    );
                }
            }
            if (object.acAuthTokens != null)
                if (typeof object.acAuthTokens === "string")
                    $util.base64.decode(
                        object.acAuthTokens,
                        (message.acAuthTokens = $util.newBuffer(
                            $util.base64.length(object.acAuthTokens)
                        )),
                        0
                    );
                else if (object.acAuthTokens.length >= 0)
                    message.acAuthTokens = object.acAuthTokens;
            if (object.acErrorCode != null) message.acErrorCode = object.acErrorCode | 0;
            return message;
        };
        BotLinkedAccountsMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.accounts = [];
            if (message.accounts && message.accounts.length) {
                object.accounts = [];
                for (var j = 0; j < message.accounts.length; ++j)
                    object.accounts[j] = $root.AICommon.BotLinkedAccount.toObject(
                        message.accounts[j],
                        options
                    );
            }
            if (message.acAuthTokens != null && message.hasOwnProperty("acAuthTokens")) {
                object.acAuthTokens =
                    options.bytes === String
                        ? $util.base64.encode(message.acAuthTokens, 0, message.acAuthTokens.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.acAuthTokens)
                          : message.acAuthTokens;
                if (options.oneofs) object._acAuthTokens = "acAuthTokens";
            }
            if (message.acErrorCode != null && message.hasOwnProperty("acErrorCode")) {
                object.acErrorCode = message.acErrorCode;
                if (options.oneofs) object._acErrorCode = "acErrorCode";
            }
            return object;
        };
        BotLinkedAccountsMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotLinkedAccountsMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotLinkedAccountsMetadata";
        };
        return BotLinkedAccountsMetadata;
    })();
    AICommon.BotPromptSuggestion = (function () {
        function BotPromptSuggestion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotPromptSuggestion.prototype.prompt = null;
        BotPromptSuggestion.prototype.promptId = null;
        var $oneOfFields;
        Object.defineProperty(BotPromptSuggestion.prototype, "_prompt", {
            get: $util.oneOfGetter(($oneOfFields = ["prompt"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPromptSuggestion.prototype, "_promptId", {
            get: $util.oneOfGetter(($oneOfFields = ["promptId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotPromptSuggestion.create = function create(properties) {
            return new BotPromptSuggestion(properties);
        };
        BotPromptSuggestion.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.prompt != null && Object.hasOwnProperty.call(message, "prompt"))
                writer.uint32(10).string(message.prompt);
            if (message.promptId != null && Object.hasOwnProperty.call(message, "promptId"))
                writer.uint32(18).string(message.promptId);
            return writer;
        };
        BotPromptSuggestion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotPromptSuggestion.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotPromptSuggestion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.prompt = reader.string();
                        break;
                    }
                    case 2: {
                        message.promptId = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotPromptSuggestion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotPromptSuggestion.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.prompt != null && message.hasOwnProperty("prompt")) {
                properties._prompt = 1;
                if (!$util.isString(message.prompt)) return "prompt: string expected";
            }
            if (message.promptId != null && message.hasOwnProperty("promptId")) {
                properties._promptId = 1;
                if (!$util.isString(message.promptId)) return "promptId: string expected";
            }
            return null;
        };
        BotPromptSuggestion.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotPromptSuggestion) return object;
            var message = new $root.AICommon.BotPromptSuggestion();
            if (object.prompt != null) message.prompt = String(object.prompt);
            if (object.promptId != null) message.promptId = String(object.promptId);
            return message;
        };
        BotPromptSuggestion.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.prompt != null && message.hasOwnProperty("prompt")) {
                object.prompt = message.prompt;
                if (options.oneofs) object._prompt = "prompt";
            }
            if (message.promptId != null && message.hasOwnProperty("promptId")) {
                object.promptId = message.promptId;
                if (options.oneofs) object._promptId = "promptId";
            }
            return object;
        };
        BotPromptSuggestion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotPromptSuggestion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotPromptSuggestion";
        };
        return BotPromptSuggestion;
    })();
    AICommon.BotPromptSuggestions = (function () {
        function BotPromptSuggestions(properties) {
            this.suggestions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotPromptSuggestions.prototype.suggestions = $util.emptyArray;
        BotPromptSuggestions.create = function create(properties) {
            return new BotPromptSuggestions(properties);
        };
        BotPromptSuggestions.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.suggestions != null && message.suggestions.length)
                for (var i = 0; i < message.suggestions.length; ++i)
                    $root.AICommon.BotPromptSuggestion.encode(
                        message.suggestions[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        BotPromptSuggestions.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotPromptSuggestions.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotPromptSuggestions();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.suggestions && message.suggestions.length))
                            message.suggestions = [];
                        message.suggestions.push(
                            $root.AICommon.BotPromptSuggestion.decode(reader, reader.uint32())
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
        BotPromptSuggestions.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotPromptSuggestions.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.suggestions != null && message.hasOwnProperty("suggestions")) {
                if (!Array.isArray(message.suggestions)) return "suggestions: array expected";
                for (var i = 0; i < message.suggestions.length; ++i) {
                    var error = $root.AICommon.BotPromptSuggestion.verify(message.suggestions[i]);
                    if (error) return "suggestions." + error;
                }
            }
            return null;
        };
        BotPromptSuggestions.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotPromptSuggestions) return object;
            var message = new $root.AICommon.BotPromptSuggestions();
            if (object.suggestions) {
                if (!Array.isArray(object.suggestions))
                    throw TypeError(".AICommon.BotPromptSuggestions.suggestions: array expected");
                message.suggestions = [];
                for (var i = 0; i < object.suggestions.length; ++i) {
                    if (typeof object.suggestions[i] !== "object")
                        throw TypeError(
                            ".AICommon.BotPromptSuggestions.suggestions: object expected"
                        );
                    message.suggestions[i] = $root.AICommon.BotPromptSuggestion.fromObject(
                        object.suggestions[i]
                    );
                }
            }
            return message;
        };
        BotPromptSuggestions.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.suggestions = [];
            if (message.suggestions && message.suggestions.length) {
                object.suggestions = [];
                for (var j = 0; j < message.suggestions.length; ++j)
                    object.suggestions[j] = $root.AICommon.BotPromptSuggestion.toObject(
                        message.suggestions[j],
                        options
                    );
            }
            return object;
        };
        BotPromptSuggestions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotPromptSuggestions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotPromptSuggestions";
        };
        return BotPromptSuggestions;
    })();
    AICommon.BotSuggestedPromptMetadata = (function () {
        function BotSuggestedPromptMetadata(properties) {
            this.suggestedPrompts = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotSuggestedPromptMetadata.prototype.suggestedPrompts = $util.emptyArray;
        BotSuggestedPromptMetadata.prototype.selectedPromptIndex = null;
        BotSuggestedPromptMetadata.prototype.promptSuggestions = null;
        BotSuggestedPromptMetadata.prototype.selectedPromptId = null;
        var $oneOfFields;
        Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["selectedPromptIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_promptSuggestions", {
            get: $util.oneOfGetter(($oneOfFields = ["promptSuggestions"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptId", {
            get: $util.oneOfGetter(($oneOfFields = ["selectedPromptId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotSuggestedPromptMetadata.create = function create(properties) {
            return new BotSuggestedPromptMetadata(properties);
        };
        BotSuggestedPromptMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.suggestedPrompts != null && message.suggestedPrompts.length)
                for (var i = 0; i < message.suggestedPrompts.length; ++i)
                    writer.uint32(10).string(message.suggestedPrompts[i]);
            if (
                message.selectedPromptIndex != null &&
                Object.hasOwnProperty.call(message, "selectedPromptIndex")
            )
                writer.uint32(16).uint32(message.selectedPromptIndex);
            if (
                message.promptSuggestions != null &&
                Object.hasOwnProperty.call(message, "promptSuggestions")
            )
                $root.AICommon.BotPromptSuggestions.encode(
                    message.promptSuggestions,
                    writer.uint32(26).fork()
                ).ldelim();
            if (
                message.selectedPromptId != null &&
                Object.hasOwnProperty.call(message, "selectedPromptId")
            )
                writer.uint32(34).string(message.selectedPromptId);
            return writer;
        };
        BotSuggestedPromptMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotSuggestedPromptMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotSuggestedPromptMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.suggestedPrompts && message.suggestedPrompts.length))
                            message.suggestedPrompts = [];
                        message.suggestedPrompts.push(reader.string());
                        break;
                    }
                    case 2: {
                        message.selectedPromptIndex = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.promptSuggestions = $root.AICommon.BotPromptSuggestions.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 4: {
                        message.selectedPromptId = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotSuggestedPromptMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotSuggestedPromptMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.suggestedPrompts != null && message.hasOwnProperty("suggestedPrompts")) {
                if (!Array.isArray(message.suggestedPrompts))
                    return "suggestedPrompts: array expected";
                for (var i = 0; i < message.suggestedPrompts.length; ++i)
                    if (!$util.isString(message.suggestedPrompts[i]))
                        return "suggestedPrompts: string[] expected";
            }
            if (
                message.selectedPromptIndex != null &&
                message.hasOwnProperty("selectedPromptIndex")
            ) {
                properties._selectedPromptIndex = 1;
                if (!$util.isInteger(message.selectedPromptIndex))
                    return "selectedPromptIndex: integer expected";
            }
            if (message.promptSuggestions != null && message.hasOwnProperty("promptSuggestions")) {
                properties._promptSuggestions = 1;
                {
                    var error = $root.AICommon.BotPromptSuggestions.verify(
                        message.promptSuggestions
                    );
                    if (error) return "promptSuggestions." + error;
                }
            }
            if (message.selectedPromptId != null && message.hasOwnProperty("selectedPromptId")) {
                properties._selectedPromptId = 1;
                if (!$util.isString(message.selectedPromptId))
                    return "selectedPromptId: string expected";
            }
            return null;
        };
        BotSuggestedPromptMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotSuggestedPromptMetadata) return object;
            var message = new $root.AICommon.BotSuggestedPromptMetadata();
            if (object.suggestedPrompts) {
                if (!Array.isArray(object.suggestedPrompts))
                    throw TypeError(
                        ".AICommon.BotSuggestedPromptMetadata.suggestedPrompts: array expected"
                    );
                message.suggestedPrompts = [];
                for (var i = 0; i < object.suggestedPrompts.length; ++i)
                    message.suggestedPrompts[i] = String(object.suggestedPrompts[i]);
            }
            if (object.selectedPromptIndex != null)
                message.selectedPromptIndex = object.selectedPromptIndex >>> 0;
            if (object.promptSuggestions != null) {
                if (typeof object.promptSuggestions !== "object")
                    throw TypeError(
                        ".AICommon.BotSuggestedPromptMetadata.promptSuggestions: object expected"
                    );
                message.promptSuggestions = $root.AICommon.BotPromptSuggestions.fromObject(
                    object.promptSuggestions
                );
            }
            if (object.selectedPromptId != null)
                message.selectedPromptId = String(object.selectedPromptId);
            return message;
        };
        BotSuggestedPromptMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.suggestedPrompts = [];
            if (message.suggestedPrompts && message.suggestedPrompts.length) {
                object.suggestedPrompts = [];
                for (var j = 0; j < message.suggestedPrompts.length; ++j)
                    object.suggestedPrompts[j] = message.suggestedPrompts[j];
            }
            if (
                message.selectedPromptIndex != null &&
                message.hasOwnProperty("selectedPromptIndex")
            ) {
                object.selectedPromptIndex = message.selectedPromptIndex;
                if (options.oneofs) object._selectedPromptIndex = "selectedPromptIndex";
            }
            if (message.promptSuggestions != null && message.hasOwnProperty("promptSuggestions")) {
                object.promptSuggestions = $root.AICommon.BotPromptSuggestions.toObject(
                    message.promptSuggestions,
                    options
                );
                if (options.oneofs) object._promptSuggestions = "promptSuggestions";
            }
            if (message.selectedPromptId != null && message.hasOwnProperty("selectedPromptId")) {
                object.selectedPromptId = message.selectedPromptId;
                if (options.oneofs) object._selectedPromptId = "selectedPromptId";
            }
            return object;
        };
        BotSuggestedPromptMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotSuggestedPromptMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotSuggestedPromptMetadata";
        };
        return BotSuggestedPromptMetadata;
    })();
    AICommon.BotPluginMetadata = (function () {
        function BotPluginMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotPluginMetadata.prototype.provider = null;
        BotPluginMetadata.prototype.pluginType = null;
        BotPluginMetadata.prototype.thumbnailCdnUrl = null;
        BotPluginMetadata.prototype.profilePhotoCdnUrl = null;
        BotPluginMetadata.prototype.searchProviderUrl = null;
        BotPluginMetadata.prototype.referenceIndex = null;
        BotPluginMetadata.prototype.expectedLinksCount = null;
        BotPluginMetadata.prototype.searchQuery = null;
        BotPluginMetadata.prototype.parentPluginMessageKey = null;
        BotPluginMetadata.prototype.deprecatedField = null;
        BotPluginMetadata.prototype.parentPluginType = null;
        BotPluginMetadata.prototype.faviconCdnUrl = null;
        var $oneOfFields;
        Object.defineProperty(BotPluginMetadata.prototype, "_provider", {
            get: $util.oneOfGetter(($oneOfFields = ["provider"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_pluginType", {
            get: $util.oneOfGetter(($oneOfFields = ["pluginType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_thumbnailCdnUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["thumbnailCdnUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_profilePhotoCdnUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["profilePhotoCdnUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_searchProviderUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["searchProviderUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_referenceIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["referenceIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_expectedLinksCount", {
            get: $util.oneOfGetter(($oneOfFields = ["expectedLinksCount"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_searchQuery", {
            get: $util.oneOfGetter(($oneOfFields = ["searchQuery"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginMessageKey", {
            get: $util.oneOfGetter(($oneOfFields = ["parentPluginMessageKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_deprecatedField", {
            get: $util.oneOfGetter(($oneOfFields = ["deprecatedField"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginType", {
            get: $util.oneOfGetter(($oneOfFields = ["parentPluginType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotPluginMetadata.prototype, "_faviconCdnUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["faviconCdnUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotPluginMetadata.create = function create(properties) {
            return new BotPluginMetadata(properties);
        };
        BotPluginMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.provider != null && Object.hasOwnProperty.call(message, "provider"))
                writer.uint32(8).int32(message.provider);
            if (message.pluginType != null && Object.hasOwnProperty.call(message, "pluginType"))
                writer.uint32(16).int32(message.pluginType);
            if (
                message.thumbnailCdnUrl != null &&
                Object.hasOwnProperty.call(message, "thumbnailCdnUrl")
            )
                writer.uint32(26).string(message.thumbnailCdnUrl);
            if (
                message.profilePhotoCdnUrl != null &&
                Object.hasOwnProperty.call(message, "profilePhotoCdnUrl")
            )
                writer.uint32(34).string(message.profilePhotoCdnUrl);
            if (
                message.searchProviderUrl != null &&
                Object.hasOwnProperty.call(message, "searchProviderUrl")
            )
                writer.uint32(42).string(message.searchProviderUrl);
            if (
                message.referenceIndex != null &&
                Object.hasOwnProperty.call(message, "referenceIndex")
            )
                writer.uint32(48).uint32(message.referenceIndex);
            if (
                message.expectedLinksCount != null &&
                Object.hasOwnProperty.call(message, "expectedLinksCount")
            )
                writer.uint32(56).uint32(message.expectedLinksCount);
            if (message.searchQuery != null && Object.hasOwnProperty.call(message, "searchQuery"))
                writer.uint32(74).string(message.searchQuery);
            if (
                message.parentPluginMessageKey != null &&
                Object.hasOwnProperty.call(message, "parentPluginMessageKey")
            )
                $root.Protocol.MessageKey.encode(
                    message.parentPluginMessageKey,
                    writer.uint32(82).fork()
                ).ldelim();
            if (
                message.deprecatedField != null &&
                Object.hasOwnProperty.call(message, "deprecatedField")
            )
                writer.uint32(88).int32(message.deprecatedField);
            if (
                message.parentPluginType != null &&
                Object.hasOwnProperty.call(message, "parentPluginType")
            )
                writer.uint32(96).int32(message.parentPluginType);
            if (
                message.faviconCdnUrl != null &&
                Object.hasOwnProperty.call(message, "faviconCdnUrl")
            )
                writer.uint32(106).string(message.faviconCdnUrl);
            return writer;
        };
        BotPluginMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotPluginMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotPluginMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.provider = reader.int32();
                        break;
                    }
                    case 2: {
                        message.pluginType = reader.int32();
                        break;
                    }
                    case 3: {
                        message.thumbnailCdnUrl = reader.string();
                        break;
                    }
                    case 4: {
                        message.profilePhotoCdnUrl = reader.string();
                        break;
                    }
                    case 5: {
                        message.searchProviderUrl = reader.string();
                        break;
                    }
                    case 6: {
                        message.referenceIndex = reader.uint32();
                        break;
                    }
                    case 7: {
                        message.expectedLinksCount = reader.uint32();
                        break;
                    }
                    case 9: {
                        message.searchQuery = reader.string();
                        break;
                    }
                    case 10: {
                        message.parentPluginMessageKey = $root.Protocol.MessageKey.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 11: {
                        message.deprecatedField = reader.int32();
                        break;
                    }
                    case 12: {
                        message.parentPluginType = reader.int32();
                        break;
                    }
                    case 13: {
                        message.faviconCdnUrl = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotPluginMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotPluginMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.provider != null && message.hasOwnProperty("provider")) {
                properties._provider = 1;
                switch (message.provider) {
                    default:
                        return "provider: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            }
            if (message.pluginType != null && message.hasOwnProperty("pluginType")) {
                properties._pluginType = 1;
                switch (message.pluginType) {
                    default:
                        return "pluginType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.thumbnailCdnUrl != null && message.hasOwnProperty("thumbnailCdnUrl")) {
                properties._thumbnailCdnUrl = 1;
                if (!$util.isString(message.thumbnailCdnUrl))
                    return "thumbnailCdnUrl: string expected";
            }
            if (
                message.profilePhotoCdnUrl != null &&
                message.hasOwnProperty("profilePhotoCdnUrl")
            ) {
                properties._profilePhotoCdnUrl = 1;
                if (!$util.isString(message.profilePhotoCdnUrl))
                    return "profilePhotoCdnUrl: string expected";
            }
            if (message.searchProviderUrl != null && message.hasOwnProperty("searchProviderUrl")) {
                properties._searchProviderUrl = 1;
                if (!$util.isString(message.searchProviderUrl))
                    return "searchProviderUrl: string expected";
            }
            if (message.referenceIndex != null && message.hasOwnProperty("referenceIndex")) {
                properties._referenceIndex = 1;
                if (!$util.isInteger(message.referenceIndex))
                    return "referenceIndex: integer expected";
            }
            if (
                message.expectedLinksCount != null &&
                message.hasOwnProperty("expectedLinksCount")
            ) {
                properties._expectedLinksCount = 1;
                if (!$util.isInteger(message.expectedLinksCount))
                    return "expectedLinksCount: integer expected";
            }
            if (message.searchQuery != null && message.hasOwnProperty("searchQuery")) {
                properties._searchQuery = 1;
                if (!$util.isString(message.searchQuery)) return "searchQuery: string expected";
            }
            if (
                message.parentPluginMessageKey != null &&
                message.hasOwnProperty("parentPluginMessageKey")
            ) {
                properties._parentPluginMessageKey = 1;
                {
                    var error = $root.Protocol.MessageKey.verify(message.parentPluginMessageKey);
                    if (error) return "parentPluginMessageKey." + error;
                }
            }
            if (message.deprecatedField != null && message.hasOwnProperty("deprecatedField")) {
                properties._deprecatedField = 1;
                switch (message.deprecatedField) {
                    default:
                        return "deprecatedField: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.parentPluginType != null && message.hasOwnProperty("parentPluginType")) {
                properties._parentPluginType = 1;
                switch (message.parentPluginType) {
                    default:
                        return "parentPluginType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.faviconCdnUrl != null && message.hasOwnProperty("faviconCdnUrl")) {
                properties._faviconCdnUrl = 1;
                if (!$util.isString(message.faviconCdnUrl)) return "faviconCdnUrl: string expected";
            }
            return null;
        };
        BotPluginMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotPluginMetadata) return object;
            var message = new $root.AICommon.BotPluginMetadata();
            switch (object.provider) {
                default:
                    if (typeof object.provider === "number") {
                        message.provider = object.provider;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.provider = 0;
                    break;
                case "BING":
                case 1:
                    message.provider = 1;
                    break;
                case "GOOGLE":
                case 2:
                    message.provider = 2;
                    break;
                case "SUPPORT":
                case 3:
                    message.provider = 3;
                    break;
            }
            switch (object.pluginType) {
                default:
                    if (typeof object.pluginType === "number") {
                        message.pluginType = object.pluginType;
                        break;
                    }
                    break;
                case "UNKNOWN_PLUGIN":
                case 0:
                    message.pluginType = 0;
                    break;
                case "REELS":
                case 1:
                    message.pluginType = 1;
                    break;
                case "SEARCH":
                case 2:
                    message.pluginType = 2;
                    break;
            }
            if (object.thumbnailCdnUrl != null)
                message.thumbnailCdnUrl = String(object.thumbnailCdnUrl);
            if (object.profilePhotoCdnUrl != null)
                message.profilePhotoCdnUrl = String(object.profilePhotoCdnUrl);
            if (object.searchProviderUrl != null)
                message.searchProviderUrl = String(object.searchProviderUrl);
            if (object.referenceIndex != null) message.referenceIndex = object.referenceIndex >>> 0;
            if (object.expectedLinksCount != null)
                message.expectedLinksCount = object.expectedLinksCount >>> 0;
            if (object.searchQuery != null) message.searchQuery = String(object.searchQuery);
            if (object.parentPluginMessageKey != null) {
                if (typeof object.parentPluginMessageKey !== "object")
                    throw TypeError(
                        ".AICommon.BotPluginMetadata.parentPluginMessageKey: object expected"
                    );
                message.parentPluginMessageKey = $root.Protocol.MessageKey.fromObject(
                    object.parentPluginMessageKey
                );
            }
            switch (object.deprecatedField) {
                default:
                    if (typeof object.deprecatedField === "number") {
                        message.deprecatedField = object.deprecatedField;
                        break;
                    }
                    break;
                case "UNKNOWN_PLUGIN":
                case 0:
                    message.deprecatedField = 0;
                    break;
                case "REELS":
                case 1:
                    message.deprecatedField = 1;
                    break;
                case "SEARCH":
                case 2:
                    message.deprecatedField = 2;
                    break;
            }
            switch (object.parentPluginType) {
                default:
                    if (typeof object.parentPluginType === "number") {
                        message.parentPluginType = object.parentPluginType;
                        break;
                    }
                    break;
                case "UNKNOWN_PLUGIN":
                case 0:
                    message.parentPluginType = 0;
                    break;
                case "REELS":
                case 1:
                    message.parentPluginType = 1;
                    break;
                case "SEARCH":
                case 2:
                    message.parentPluginType = 2;
                    break;
            }
            if (object.faviconCdnUrl != null) message.faviconCdnUrl = String(object.faviconCdnUrl);
            return message;
        };
        BotPluginMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.provider != null && message.hasOwnProperty("provider")) {
                object.provider =
                    options.enums === String
                        ? $root.AICommon.BotPluginMetadata.SearchProvider[message.provider] ===
                          undefined
                            ? message.provider
                            : $root.AICommon.BotPluginMetadata.SearchProvider[message.provider]
                        : message.provider;
                if (options.oneofs) object._provider = "provider";
            }
            if (message.pluginType != null && message.hasOwnProperty("pluginType")) {
                object.pluginType =
                    options.enums === String
                        ? $root.AICommon.BotPluginMetadata.PluginType[message.pluginType] ===
                          undefined
                            ? message.pluginType
                            : $root.AICommon.BotPluginMetadata.PluginType[message.pluginType]
                        : message.pluginType;
                if (options.oneofs) object._pluginType = "pluginType";
            }
            if (message.thumbnailCdnUrl != null && message.hasOwnProperty("thumbnailCdnUrl")) {
                object.thumbnailCdnUrl = message.thumbnailCdnUrl;
                if (options.oneofs) object._thumbnailCdnUrl = "thumbnailCdnUrl";
            }
            if (
                message.profilePhotoCdnUrl != null &&
                message.hasOwnProperty("profilePhotoCdnUrl")
            ) {
                object.profilePhotoCdnUrl = message.profilePhotoCdnUrl;
                if (options.oneofs) object._profilePhotoCdnUrl = "profilePhotoCdnUrl";
            }
            if (message.searchProviderUrl != null && message.hasOwnProperty("searchProviderUrl")) {
                object.searchProviderUrl = message.searchProviderUrl;
                if (options.oneofs) object._searchProviderUrl = "searchProviderUrl";
            }
            if (message.referenceIndex != null && message.hasOwnProperty("referenceIndex")) {
                object.referenceIndex = message.referenceIndex;
                if (options.oneofs) object._referenceIndex = "referenceIndex";
            }
            if (
                message.expectedLinksCount != null &&
                message.hasOwnProperty("expectedLinksCount")
            ) {
                object.expectedLinksCount = message.expectedLinksCount;
                if (options.oneofs) object._expectedLinksCount = "expectedLinksCount";
            }
            if (message.searchQuery != null && message.hasOwnProperty("searchQuery")) {
                object.searchQuery = message.searchQuery;
                if (options.oneofs) object._searchQuery = "searchQuery";
            }
            if (
                message.parentPluginMessageKey != null &&
                message.hasOwnProperty("parentPluginMessageKey")
            ) {
                object.parentPluginMessageKey = $root.Protocol.MessageKey.toObject(
                    message.parentPluginMessageKey,
                    options
                );
                if (options.oneofs) object._parentPluginMessageKey = "parentPluginMessageKey";
            }
            if (message.deprecatedField != null && message.hasOwnProperty("deprecatedField")) {
                object.deprecatedField =
                    options.enums === String
                        ? $root.AICommon.BotPluginMetadata.PluginType[message.deprecatedField] ===
                          undefined
                            ? message.deprecatedField
                            : $root.AICommon.BotPluginMetadata.PluginType[message.deprecatedField]
                        : message.deprecatedField;
                if (options.oneofs) object._deprecatedField = "deprecatedField";
            }
            if (message.parentPluginType != null && message.hasOwnProperty("parentPluginType")) {
                object.parentPluginType =
                    options.enums === String
                        ? $root.AICommon.BotPluginMetadata.PluginType[message.parentPluginType] ===
                          undefined
                            ? message.parentPluginType
                            : $root.AICommon.BotPluginMetadata.PluginType[message.parentPluginType]
                        : message.parentPluginType;
                if (options.oneofs) object._parentPluginType = "parentPluginType";
            }
            if (message.faviconCdnUrl != null && message.hasOwnProperty("faviconCdnUrl")) {
                object.faviconCdnUrl = message.faviconCdnUrl;
                if (options.oneofs) object._faviconCdnUrl = "faviconCdnUrl";
            }
            return object;
        };
        BotPluginMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotPluginMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotPluginMetadata";
        };
        BotPluginMetadata.PluginType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN_PLUGIN")] = 0;
            values[(valuesById[1] = "REELS")] = 1;
            values[(valuesById[2] = "SEARCH")] = 2;
            return values;
        })();
        BotPluginMetadata.SearchProvider = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "BING")] = 1;
            values[(valuesById[2] = "GOOGLE")] = 2;
            values[(valuesById[3] = "SUPPORT")] = 3;
            return values;
        })();
        return BotPluginMetadata;
    })();
    AICommon.BotAvatarMetadata = (function () {
        function BotAvatarMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BotAvatarMetadata.prototype.sentiment = null;
        BotAvatarMetadata.prototype.behaviorGraph = null;
        BotAvatarMetadata.prototype.action = null;
        BotAvatarMetadata.prototype.intensity = null;
        BotAvatarMetadata.prototype.wordCount = null;
        var $oneOfFields;
        Object.defineProperty(BotAvatarMetadata.prototype, "_sentiment", {
            get: $util.oneOfGetter(($oneOfFields = ["sentiment"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotAvatarMetadata.prototype, "_behaviorGraph", {
            get: $util.oneOfGetter(($oneOfFields = ["behaviorGraph"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotAvatarMetadata.prototype, "_action", {
            get: $util.oneOfGetter(($oneOfFields = ["action"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotAvatarMetadata.prototype, "_intensity", {
            get: $util.oneOfGetter(($oneOfFields = ["intensity"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BotAvatarMetadata.prototype, "_wordCount", {
            get: $util.oneOfGetter(($oneOfFields = ["wordCount"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BotAvatarMetadata.create = function create(properties) {
            return new BotAvatarMetadata(properties);
        };
        BotAvatarMetadata.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.sentiment != null && Object.hasOwnProperty.call(message, "sentiment"))
                writer.uint32(8).uint32(message.sentiment);
            if (
                message.behaviorGraph != null &&
                Object.hasOwnProperty.call(message, "behaviorGraph")
            )
                writer.uint32(18).string(message.behaviorGraph);
            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                writer.uint32(24).uint32(message.action);
            if (message.intensity != null && Object.hasOwnProperty.call(message, "intensity"))
                writer.uint32(32).uint32(message.intensity);
            if (message.wordCount != null && Object.hasOwnProperty.call(message, "wordCount"))
                writer.uint32(40).uint32(message.wordCount);
            return writer;
        };
        BotAvatarMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BotAvatarMetadata.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.AICommon.BotAvatarMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.sentiment = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.behaviorGraph = reader.string();
                        break;
                    }
                    case 3: {
                        message.action = reader.uint32();
                        break;
                    }
                    case 4: {
                        message.intensity = reader.uint32();
                        break;
                    }
                    case 5: {
                        message.wordCount = reader.uint32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BotAvatarMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BotAvatarMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.sentiment != null && message.hasOwnProperty("sentiment")) {
                properties._sentiment = 1;
                if (!$util.isInteger(message.sentiment)) return "sentiment: integer expected";
            }
            if (message.behaviorGraph != null && message.hasOwnProperty("behaviorGraph")) {
                properties._behaviorGraph = 1;
                if (!$util.isString(message.behaviorGraph)) return "behaviorGraph: string expected";
            }
            if (message.action != null && message.hasOwnProperty("action")) {
                properties._action = 1;
                if (!$util.isInteger(message.action)) return "action: integer expected";
            }
            if (message.intensity != null && message.hasOwnProperty("intensity")) {
                properties._intensity = 1;
                if (!$util.isInteger(message.intensity)) return "intensity: integer expected";
            }
            if (message.wordCount != null && message.hasOwnProperty("wordCount")) {
                properties._wordCount = 1;
                if (!$util.isInteger(message.wordCount)) return "wordCount: integer expected";
            }
            return null;
        };
        BotAvatarMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.AICommon.BotAvatarMetadata) return object;
            var message = new $root.AICommon.BotAvatarMetadata();
            if (object.sentiment != null) message.sentiment = object.sentiment >>> 0;
            if (object.behaviorGraph != null) message.behaviorGraph = String(object.behaviorGraph);
            if (object.action != null) message.action = object.action >>> 0;
            if (object.intensity != null) message.intensity = object.intensity >>> 0;
            if (object.wordCount != null) message.wordCount = object.wordCount >>> 0;
            return message;
        };
        BotAvatarMetadata.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.sentiment != null && message.hasOwnProperty("sentiment")) {
                object.sentiment = message.sentiment;
                if (options.oneofs) object._sentiment = "sentiment";
            }
            if (message.behaviorGraph != null && message.hasOwnProperty("behaviorGraph")) {
                object.behaviorGraph = message.behaviorGraph;
                if (options.oneofs) object._behaviorGraph = "behaviorGraph";
            }
            if (message.action != null && message.hasOwnProperty("action")) {
                object.action = message.action;
                if (options.oneofs) object._action = "action";
            }
            if (message.intensity != null && message.hasOwnProperty("intensity")) {
                object.intensity = message.intensity;
                if (options.oneofs) object._intensity = "intensity";
            }
            if (message.wordCount != null && message.hasOwnProperty("wordCount")) {
                object.wordCount = message.wordCount;
                if (options.oneofs) object._wordCount = "wordCount";
            }
            return object;
        };
        BotAvatarMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BotAvatarMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AICommon.BotAvatarMetadata";
        };
        return BotAvatarMetadata;
    })();
    AICommon.SessionTransparencyType = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "UNKNOWN_TYPE")] = 0;
        values[(valuesById[1] = "NY_AI_SAFETY_DISCLAIMER")] = 1;
        return values;
    })();
    AICommon.AIRichResponseSubMessageType = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "AI_RICH_RESPONSE_UNKNOWN")] = 0;
        values[(valuesById[1] = "AI_RICH_RESPONSE_GRID_IMAGE")] = 1;
        values[(valuesById[2] = "AI_RICH_RESPONSE_TEXT")] = 2;
        values[(valuesById[3] = "AI_RICH_RESPONSE_INLINE_IMAGE")] = 3;
        values[(valuesById[4] = "AI_RICH_RESPONSE_TABLE")] = 4;
        values[(valuesById[5] = "AI_RICH_RESPONSE_CODE")] = 5;
        values[(valuesById[6] = "AI_RICH_RESPONSE_DYNAMIC")] = 6;
        values[(valuesById[7] = "AI_RICH_RESPONSE_MAP")] = 7;
        values[(valuesById[8] = "AI_RICH_RESPONSE_LATEX")] = 8;
        values[(valuesById[9] = "AI_RICH_RESPONSE_CONTENT_ITEMS")] = 9;
        return values;
    })();
    AICommon.AIRichResponseMessageType = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "AI_RICH_RESPONSE_TYPE_UNKNOWN")] = 0;
        values[(valuesById[1] = "AI_RICH_RESPONSE_TYPE_STANDARD")] = 1;
        return values;
    })();
    AICommon.BotSessionSource = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "NONE")] = 0;
        values[(valuesById[1] = "NULL_STATE")] = 1;
        values[(valuesById[2] = "TYPEAHEAD")] = 2;
        values[(valuesById[3] = "USER_INPUT")] = 3;
        values[(valuesById[4] = "EMU_FLASH")] = 4;
        values[(valuesById[5] = "EMU_FLASH_FOLLOWUP")] = 5;
        values[(valuesById[6] = "VOICE")] = 6;
        return values;
    })();
    AICommon.BotMetricsThreadEntryPoint = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[1] = "AI_TAB_THREAD")] = 1;
        values[(valuesById[2] = "AI_HOME_THREAD")] = 2;
        values[(valuesById[3] = "AI_DEEPLINK_IMMERSIVE_THREAD")] = 3;
        values[(valuesById[4] = "AI_DEEPLINK_THREAD")] = 4;
        values[(valuesById[5] = "ASK_META_AI_CONTEXT_MENU_THREAD")] = 5;
        return values;
    })();
    AICommon.BotMetricsEntryPoint = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "UNDEFINED_ENTRY_POINT")] = 0;
        values[(valuesById[1] = "FAVICON")] = 1;
        values[(valuesById[2] = "CHATLIST")] = 2;
        values[(valuesById[3] = "AISEARCH_NULL_STATE_PAPER_PLANE")] = 3;
        values[(valuesById[4] = "AISEARCH_NULL_STATE_SUGGESTION")] = 4;
        values[(valuesById[5] = "AISEARCH_TYPE_AHEAD_SUGGESTION")] = 5;
        values[(valuesById[6] = "AISEARCH_TYPE_AHEAD_PAPER_PLANE")] = 6;
        values[(valuesById[7] = "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST")] = 7;
        values[(valuesById[8] = "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES")] = 8;
        values[(valuesById[9] = "AIVOICE_SEARCH_BAR")] = 9;
        values[(valuesById[10] = "AIVOICE_FAVICON")] = 10;
        values[(valuesById[11] = "AISTUDIO")] = 11;
        values[(valuesById[12] = "DEEPLINK")] = 12;
        values[(valuesById[13] = "NOTIFICATION")] = 13;
        values[(valuesById[14] = "PROFILE_MESSAGE_BUTTON")] = 14;
        values[(valuesById[15] = "FORWARD")] = 15;
        values[(valuesById[16] = "APP_SHORTCUT")] = 16;
        values[(valuesById[17] = "FF_FAMILY")] = 17;
        values[(valuesById[18] = "AI_TAB")] = 18;
        values[(valuesById[19] = "AI_HOME")] = 19;
        values[(valuesById[20] = "AI_DEEPLINK_IMMERSIVE")] = 20;
        values[(valuesById[21] = "AI_DEEPLINK")] = 21;
        values[(valuesById[22] = "META_AI_CHAT_SHORTCUT_AI_STUDIO")] = 22;
        values[(valuesById[23] = "UGC_CHAT_SHORTCUT_AI_STUDIO")] = 23;
        values[(valuesById[24] = "NEW_CHAT_AI_STUDIO")] = 24;
        values[(valuesById[25] = "AIVOICE_FAVICON_CALL_HISTORY")] = 25;
        values[(valuesById[26] = "ASK_META_AI_CONTEXT_MENU")] = 26;
        values[(valuesById[27] = "ASK_META_AI_CONTEXT_MENU_1ON1")] = 27;
        values[(valuesById[28] = "ASK_META_AI_CONTEXT_MENU_GROUP")] = 28;
        values[(valuesById[29] = "INVOKE_META_AI_1ON1")] = 29;
        values[(valuesById[30] = "INVOKE_META_AI_GROUP")] = 30;
        values[(valuesById[31] = "META_AI_FORWARD")] = 31;
        values[(valuesById[32] = "NEW_CHAT_AI_CONTACT")] = 32;
        values[(valuesById[33] = "MESSAGE_QUICK_ACTION_1_ON_1_CHAT")] = 33;
        values[(valuesById[34] = "MESSAGE_QUICK_ACTION_GROUP_CHAT")] = 34;
        values[(valuesById[35] = "ATTACHMENT_TRAY_1_ON_1_CHAT")] = 35;
        values[(valuesById[36] = "ATTACHMENT_TRAY_GROUP_CHAT")] = 36;
        values[(valuesById[37] = "ASK_META_AI_MEDIA_VIEWER_1ON1")] = 37;
        values[(valuesById[38] = "ASK_META_AI_MEDIA_VIEWER_GROUP")] = 38;
        return values;
    })();
    return AICommon;
})();
$root.Protocol = (function () {
    var Protocol = {};
    Protocol.LimitSharing = (function () {
        function LimitSharing(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        LimitSharing.prototype.sharingLimited = null;
        LimitSharing.prototype.trigger = null;
        LimitSharing.prototype.limitSharingSettingTimestamp = null;
        LimitSharing.prototype.initiatedByMe = null;
        var $oneOfFields;
        Object.defineProperty(LimitSharing.prototype, "_sharingLimited", {
            get: $util.oneOfGetter(($oneOfFields = ["sharingLimited"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LimitSharing.prototype, "_trigger", {
            get: $util.oneOfGetter(($oneOfFields = ["trigger"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LimitSharing.prototype, "_limitSharingSettingTimestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["limitSharingSettingTimestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LimitSharing.prototype, "_initiatedByMe", {
            get: $util.oneOfGetter(($oneOfFields = ["initiatedByMe"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        LimitSharing.create = function create(properties) {
            return new LimitSharing(properties);
        };
        LimitSharing.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.sharingLimited != null &&
                Object.hasOwnProperty.call(message, "sharingLimited")
            )
                writer.uint32(8).bool(message.sharingLimited);
            if (message.trigger != null && Object.hasOwnProperty.call(message, "trigger"))
                writer.uint32(16).int32(message.trigger);
            if (
                message.limitSharingSettingTimestamp != null &&
                Object.hasOwnProperty.call(message, "limitSharingSettingTimestamp")
            )
                writer.uint32(24).int64(message.limitSharingSettingTimestamp);
            if (
                message.initiatedByMe != null &&
                Object.hasOwnProperty.call(message, "initiatedByMe")
            )
                writer.uint32(32).bool(message.initiatedByMe);
            return writer;
        };
        LimitSharing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        LimitSharing.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Protocol.LimitSharing();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.sharingLimited = reader.bool();
                        break;
                    }
                    case 2: {
                        message.trigger = reader.int32();
                        break;
                    }
                    case 3: {
                        message.limitSharingSettingTimestamp = reader.int64();
                        break;
                    }
                    case 4: {
                        message.initiatedByMe = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        LimitSharing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        LimitSharing.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.sharingLimited != null && message.hasOwnProperty("sharingLimited")) {
                properties._sharingLimited = 1;
                if (typeof message.sharingLimited !== "boolean")
                    return "sharingLimited: boolean expected";
            }
            if (message.trigger != null && message.hasOwnProperty("trigger")) {
                properties._trigger = 1;
                switch (message.trigger) {
                    default:
                        return "trigger: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            }
            if (
                message.limitSharingSettingTimestamp != null &&
                message.hasOwnProperty("limitSharingSettingTimestamp")
            ) {
                properties._limitSharingSettingTimestamp = 1;
                if (
                    !$util.isInteger(message.limitSharingSettingTimestamp) &&
                    !(
                        message.limitSharingSettingTimestamp &&
                        $util.isInteger(message.limitSharingSettingTimestamp.low) &&
                        $util.isInteger(message.limitSharingSettingTimestamp.high)
                    )
                )
                    return "limitSharingSettingTimestamp: integer|Long expected";
            }
            if (message.initiatedByMe != null && message.hasOwnProperty("initiatedByMe")) {
                properties._initiatedByMe = 1;
                if (typeof message.initiatedByMe !== "boolean")
                    return "initiatedByMe: boolean expected";
            }
            return null;
        };
        LimitSharing.fromObject = function fromObject(object) {
            if (object instanceof $root.Protocol.LimitSharing) return object;
            var message = new $root.Protocol.LimitSharing();
            if (object.sharingLimited != null)
                message.sharingLimited = Boolean(object.sharingLimited);
            switch (object.trigger) {
                default:
                    if (typeof object.trigger === "number") {
                        message.trigger = object.trigger;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.trigger = 0;
                    break;
                case "CHAT_SETTING":
                case 1:
                    message.trigger = 1;
                    break;
                case "BIZ_SUPPORTS_FB_HOSTING":
                case 2:
                    message.trigger = 2;
                    break;
                case "UNKNOWN_GROUP":
                case 3:
                    message.trigger = 3;
                    break;
            }
            if (object.limitSharingSettingTimestamp != null)
                if ($util.Long)
                    (message.limitSharingSettingTimestamp = $util.Long.fromValue(
                        object.limitSharingSettingTimestamp
                    )).unsigned = false;
                else if (typeof object.limitSharingSettingTimestamp === "string")
                    message.limitSharingSettingTimestamp = parseInt(
                        object.limitSharingSettingTimestamp,
                        10
                    );
                else if (typeof object.limitSharingSettingTimestamp === "number")
                    message.limitSharingSettingTimestamp = object.limitSharingSettingTimestamp;
                else if (typeof object.limitSharingSettingTimestamp === "object")
                    message.limitSharingSettingTimestamp = new $util.LongBits(
                        object.limitSharingSettingTimestamp.low >>> 0,
                        object.limitSharingSettingTimestamp.high >>> 0
                    ).toNumber();
            if (object.initiatedByMe != null) message.initiatedByMe = Boolean(object.initiatedByMe);
            return message;
        };
        LimitSharing.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.sharingLimited != null && message.hasOwnProperty("sharingLimited")) {
                object.sharingLimited = message.sharingLimited;
                if (options.oneofs) object._sharingLimited = "sharingLimited";
            }
            if (message.trigger != null && message.hasOwnProperty("trigger")) {
                object.trigger =
                    options.enums === String
                        ? $root.Protocol.LimitSharing.TriggerType[message.trigger] === undefined
                            ? message.trigger
                            : $root.Protocol.LimitSharing.TriggerType[message.trigger]
                        : message.trigger;
                if (options.oneofs) object._trigger = "trigger";
            }
            if (
                message.limitSharingSettingTimestamp != null &&
                message.hasOwnProperty("limitSharingSettingTimestamp")
            ) {
                if (typeof message.limitSharingSettingTimestamp === "number")
                    object.limitSharingSettingTimestamp =
                        options.longs === String
                            ? String(message.limitSharingSettingTimestamp)
                            : message.limitSharingSettingTimestamp;
                else
                    object.limitSharingSettingTimestamp =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(
                                  message.limitSharingSettingTimestamp
                              )
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.limitSharingSettingTimestamp.low >>> 0,
                                    message.limitSharingSettingTimestamp.high >>> 0
                                ).toNumber()
                              : message.limitSharingSettingTimestamp;
                if (options.oneofs)
                    object._limitSharingSettingTimestamp = "limitSharingSettingTimestamp";
            }
            if (message.initiatedByMe != null && message.hasOwnProperty("initiatedByMe")) {
                object.initiatedByMe = message.initiatedByMe;
                if (options.oneofs) object._initiatedByMe = "initiatedByMe";
            }
            return object;
        };
        LimitSharing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        LimitSharing.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Protocol.LimitSharing";
        };
        LimitSharing.TriggerType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "CHAT_SETTING")] = 1;
            values[(valuesById[2] = "BIZ_SUPPORTS_FB_HOSTING")] = 2;
            values[(valuesById[3] = "UNKNOWN_GROUP")] = 3;
            return values;
        })();
        return LimitSharing;
    })();
    Protocol.MessageKey = (function () {
        function MessageKey(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        MessageKey.prototype.remoteJid = null;
        MessageKey.prototype.fromMe = null;
        MessageKey.prototype.id = null;
        MessageKey.prototype.participant = null;
        var $oneOfFields;
        Object.defineProperty(MessageKey.prototype, "_remoteJid", {
            get: $util.oneOfGetter(($oneOfFields = ["remoteJid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MessageKey.prototype, "_fromMe", {
            get: $util.oneOfGetter(($oneOfFields = ["fromMe"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MessageKey.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MessageKey.prototype, "_participant", {
            get: $util.oneOfGetter(($oneOfFields = ["participant"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        MessageKey.create = function create(properties) {
            return new MessageKey(properties);
        };
        MessageKey.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.remoteJid != null && Object.hasOwnProperty.call(message, "remoteJid"))
                writer.uint32(10).string(message.remoteJid);
            if (message.fromMe != null && Object.hasOwnProperty.call(message, "fromMe"))
                writer.uint32(16).bool(message.fromMe);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(26).string(message.id);
            if (message.participant != null && Object.hasOwnProperty.call(message, "participant"))
                writer.uint32(34).string(message.participant);
            return writer;
        };
        MessageKey.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        MessageKey.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Protocol.MessageKey();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.remoteJid = reader.string();
                        break;
                    }
                    case 2: {
                        message.fromMe = reader.bool();
                        break;
                    }
                    case 3: {
                        message.id = reader.string();
                        break;
                    }
                    case 4: {
                        message.participant = reader.string();
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
            if (message.remoteJid != null && message.hasOwnProperty("remoteJid")) {
                properties._remoteJid = 1;
                if (!$util.isString(message.remoteJid)) return "remoteJid: string expected";
            }
            if (message.fromMe != null && message.hasOwnProperty("fromMe")) {
                properties._fromMe = 1;
                if (typeof message.fromMe !== "boolean") return "fromMe: boolean expected";
            }
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (!$util.isString(message.id)) return "id: string expected";
            }
            if (message.participant != null && message.hasOwnProperty("participant")) {
                properties._participant = 1;
                if (!$util.isString(message.participant)) return "participant: string expected";
            }
            return null;
        };
        MessageKey.fromObject = function fromObject(object) {
            if (object instanceof $root.Protocol.MessageKey) return object;
            var message = new $root.Protocol.MessageKey();
            if (object.remoteJid != null) message.remoteJid = String(object.remoteJid);
            if (object.fromMe != null) message.fromMe = Boolean(object.fromMe);
            if (object.id != null) message.id = String(object.id);
            if (object.participant != null) message.participant = String(object.participant);
            return message;
        };
        MessageKey.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.remoteJid != null && message.hasOwnProperty("remoteJid")) {
                object.remoteJid = message.remoteJid;
                if (options.oneofs) object._remoteJid = "remoteJid";
            }
            if (message.fromMe != null && message.hasOwnProperty("fromMe")) {
                object.fromMe = message.fromMe;
                if (options.oneofs) object._fromMe = "fromMe";
            }
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id = message.id;
                if (options.oneofs) object._id = "id";
            }
            if (message.participant != null && message.hasOwnProperty("participant")) {
                object.participant = message.participant;
                if (options.oneofs) object._participant = "participant";
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
            return typeUrlPrefix + "/Protocol.MessageKey";
        };
        return MessageKey;
    })();
    return Protocol;
})();
$root.StatusAttributions = (function () {
    var StatusAttributions = {};
    StatusAttributions.StatusAttribution = (function () {
        function StatusAttribution(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        StatusAttribution.prototype.type = null;
        StatusAttribution.prototype.actionUrl = null;
        StatusAttribution.prototype.statusReshare = null;
        StatusAttribution.prototype.externalShare = null;
        StatusAttribution.prototype.music = null;
        StatusAttribution.prototype.groupStatus = null;
        StatusAttribution.prototype.rlAttribution = null;
        StatusAttribution.prototype.aiCreatedAttribution = null;
        var $oneOfFields;
        Object.defineProperty(StatusAttribution.prototype, "_type", {
            get: $util.oneOfGetter(($oneOfFields = ["type"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(StatusAttribution.prototype, "_actionUrl", {
            get: $util.oneOfGetter(($oneOfFields = ["actionUrl"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(StatusAttribution.prototype, "attributionData", {
            get: $util.oneOfGetter(
                ($oneOfFields = [
                    "statusReshare",
                    "externalShare",
                    "music",
                    "groupStatus",
                    "rlAttribution",
                    "aiCreatedAttribution",
                ])
            ),
            set: $util.oneOfSetter($oneOfFields),
        });
        StatusAttribution.create = function create(properties) {
            return new StatusAttribution(properties);
        };
        StatusAttribution.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(8).int32(message.type);
            if (message.actionUrl != null && Object.hasOwnProperty.call(message, "actionUrl"))
                writer.uint32(18).string(message.actionUrl);
            if (
                message.statusReshare != null &&
                Object.hasOwnProperty.call(message, "statusReshare")
            )
                $root.StatusAttributions.StatusAttribution.StatusReshare.encode(
                    message.statusReshare,
                    writer.uint32(26).fork()
                ).ldelim();
            if (
                message.externalShare != null &&
                Object.hasOwnProperty.call(message, "externalShare")
            )
                $root.StatusAttributions.StatusAttribution.ExternalShare.encode(
                    message.externalShare,
                    writer.uint32(34).fork()
                ).ldelim();
            if (message.music != null && Object.hasOwnProperty.call(message, "music"))
                $root.StatusAttributions.StatusAttribution.Music.encode(
                    message.music,
                    writer.uint32(42).fork()
                ).ldelim();
            if (message.groupStatus != null && Object.hasOwnProperty.call(message, "groupStatus"))
                $root.StatusAttributions.StatusAttribution.GroupStatus.encode(
                    message.groupStatus,
                    writer.uint32(50).fork()
                ).ldelim();
            if (
                message.rlAttribution != null &&
                Object.hasOwnProperty.call(message, "rlAttribution")
            )
                $root.StatusAttributions.StatusAttribution.RLAttribution.encode(
                    message.rlAttribution,
                    writer.uint32(58).fork()
                ).ldelim();
            if (
                message.aiCreatedAttribution != null &&
                Object.hasOwnProperty.call(message, "aiCreatedAttribution")
            )
                $root.StatusAttributions.StatusAttribution.AiCreatedAttribution.encode(
                    message.aiCreatedAttribution,
                    writer.uint32(66).fork()
                ).ldelim();
            return writer;
        };
        StatusAttribution.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        StatusAttribution.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.StatusAttributions.StatusAttribution();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.type = reader.int32();
                        break;
                    }
                    case 2: {
                        message.actionUrl = reader.string();
                        break;
                    }
                    case 3: {
                        message.statusReshare =
                            $root.StatusAttributions.StatusAttribution.StatusReshare.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 4: {
                        message.externalShare =
                            $root.StatusAttributions.StatusAttribution.ExternalShare.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 5: {
                        message.music = $root.StatusAttributions.StatusAttribution.Music.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 6: {
                        message.groupStatus =
                            $root.StatusAttributions.StatusAttribution.GroupStatus.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 7: {
                        message.rlAttribution =
                            $root.StatusAttributions.StatusAttribution.RLAttribution.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 8: {
                        message.aiCreatedAttribution =
                            $root.StatusAttributions.StatusAttribution.AiCreatedAttribution.decode(
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
        StatusAttribution.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        StatusAttribution.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                properties._type = 1;
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        break;
                }
            }
            if (message.actionUrl != null && message.hasOwnProperty("actionUrl")) {
                properties._actionUrl = 1;
                if (!$util.isString(message.actionUrl)) return "actionUrl: string expected";
            }
            if (message.statusReshare != null && message.hasOwnProperty("statusReshare")) {
                properties.attributionData = 1;
                {
                    var error = $root.StatusAttributions.StatusAttribution.StatusReshare.verify(
                        message.statusReshare
                    );
                    if (error) return "statusReshare." + error;
                }
            }
            if (message.externalShare != null && message.hasOwnProperty("externalShare")) {
                if (properties.attributionData === 1) return "attributionData: multiple values";
                properties.attributionData = 1;
                {
                    var error = $root.StatusAttributions.StatusAttribution.ExternalShare.verify(
                        message.externalShare
                    );
                    if (error) return "externalShare." + error;
                }
            }
            if (message.music != null && message.hasOwnProperty("music")) {
                if (properties.attributionData === 1) return "attributionData: multiple values";
                properties.attributionData = 1;
                {
                    var error = $root.StatusAttributions.StatusAttribution.Music.verify(
                        message.music
                    );
                    if (error) return "music." + error;
                }
            }
            if (message.groupStatus != null && message.hasOwnProperty("groupStatus")) {
                if (properties.attributionData === 1) return "attributionData: multiple values";
                properties.attributionData = 1;
                {
                    var error = $root.StatusAttributions.StatusAttribution.GroupStatus.verify(
                        message.groupStatus
                    );
                    if (error) return "groupStatus." + error;
                }
            }
            if (message.rlAttribution != null && message.hasOwnProperty("rlAttribution")) {
                if (properties.attributionData === 1) return "attributionData: multiple values";
                properties.attributionData = 1;
                {
                    var error = $root.StatusAttributions.StatusAttribution.RLAttribution.verify(
                        message.rlAttribution
                    );
                    if (error) return "rlAttribution." + error;
                }
            }
            if (
                message.aiCreatedAttribution != null &&
                message.hasOwnProperty("aiCreatedAttribution")
            ) {
                if (properties.attributionData === 1) return "attributionData: multiple values";
                properties.attributionData = 1;
                {
                    var error =
                        $root.StatusAttributions.StatusAttribution.AiCreatedAttribution.verify(
                            message.aiCreatedAttribution
                        );
                    if (error) return "aiCreatedAttribution." + error;
                }
            }
            return null;
        };
        StatusAttribution.fromObject = function fromObject(object) {
            if (object instanceof $root.StatusAttributions.StatusAttribution) return object;
            var message = new $root.StatusAttributions.StatusAttribution();
            switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "RESHARE":
                case 1:
                    message.type = 1;
                    break;
                case "EXTERNAL_SHARE":
                case 2:
                    message.type = 2;
                    break;
                case "MUSIC":
                case 3:
                    message.type = 3;
                    break;
                case "STATUS_MENTION":
                case 4:
                    message.type = 4;
                    break;
                case "GROUP_STATUS":
                case 5:
                    message.type = 5;
                    break;
                case "RL_ATTRIBUTION":
                case 6:
                    message.type = 6;
                    break;
                case "AI_CREATED":
                case 7:
                    message.type = 7;
                    break;
                case "LAYOUTS":
                case 8:
                    message.type = 8;
                    break;
            }
            if (object.actionUrl != null) message.actionUrl = String(object.actionUrl);
            if (object.statusReshare != null) {
                if (typeof object.statusReshare !== "object")
                    throw TypeError(
                        ".StatusAttributions.StatusAttribution.statusReshare: object expected"
                    );
                message.statusReshare =
                    $root.StatusAttributions.StatusAttribution.StatusReshare.fromObject(
                        object.statusReshare
                    );
            }
            if (object.externalShare != null) {
                if (typeof object.externalShare !== "object")
                    throw TypeError(
                        ".StatusAttributions.StatusAttribution.externalShare: object expected"
                    );
                message.externalShare =
                    $root.StatusAttributions.StatusAttribution.ExternalShare.fromObject(
                        object.externalShare
                    );
            }
            if (object.music != null) {
                if (typeof object.music !== "object")
                    throw TypeError(".StatusAttributions.StatusAttribution.music: object expected");
                message.music = $root.StatusAttributions.StatusAttribution.Music.fromObject(
                    object.music
                );
            }
            if (object.groupStatus != null) {
                if (typeof object.groupStatus !== "object")
                    throw TypeError(
                        ".StatusAttributions.StatusAttribution.groupStatus: object expected"
                    );
                message.groupStatus =
                    $root.StatusAttributions.StatusAttribution.GroupStatus.fromObject(
                        object.groupStatus
                    );
            }
            if (object.rlAttribution != null) {
                if (typeof object.rlAttribution !== "object")
                    throw TypeError(
                        ".StatusAttributions.StatusAttribution.rlAttribution: object expected"
                    );
                message.rlAttribution =
                    $root.StatusAttributions.StatusAttribution.RLAttribution.fromObject(
                        object.rlAttribution
                    );
            }
            if (object.aiCreatedAttribution != null) {
                if (typeof object.aiCreatedAttribution !== "object")
                    throw TypeError(
                        ".StatusAttributions.StatusAttribution.aiCreatedAttribution: object expected"
                    );
                message.aiCreatedAttribution =
                    $root.StatusAttributions.StatusAttribution.AiCreatedAttribution.fromObject(
                        object.aiCreatedAttribution
                    );
            }
            return message;
        };
        StatusAttribution.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.type != null && message.hasOwnProperty("type")) {
                object.type =
                    options.enums === String
                        ? $root.StatusAttributions.StatusAttribution.Type[message.type] ===
                          undefined
                            ? message.type
                            : $root.StatusAttributions.StatusAttribution.Type[message.type]
                        : message.type;
                if (options.oneofs) object._type = "type";
            }
            if (message.actionUrl != null && message.hasOwnProperty("actionUrl")) {
                object.actionUrl = message.actionUrl;
                if (options.oneofs) object._actionUrl = "actionUrl";
            }
            if (message.statusReshare != null && message.hasOwnProperty("statusReshare")) {
                object.statusReshare =
                    $root.StatusAttributions.StatusAttribution.StatusReshare.toObject(
                        message.statusReshare,
                        options
                    );
                if (options.oneofs) object.attributionData = "statusReshare";
            }
            if (message.externalShare != null && message.hasOwnProperty("externalShare")) {
                object.externalShare =
                    $root.StatusAttributions.StatusAttribution.ExternalShare.toObject(
                        message.externalShare,
                        options
                    );
                if (options.oneofs) object.attributionData = "externalShare";
            }
            if (message.music != null && message.hasOwnProperty("music")) {
                object.music = $root.StatusAttributions.StatusAttribution.Music.toObject(
                    message.music,
                    options
                );
                if (options.oneofs) object.attributionData = "music";
            }
            if (message.groupStatus != null && message.hasOwnProperty("groupStatus")) {
                object.groupStatus =
                    $root.StatusAttributions.StatusAttribution.GroupStatus.toObject(
                        message.groupStatus,
                        options
                    );
                if (options.oneofs) object.attributionData = "groupStatus";
            }
            if (message.rlAttribution != null && message.hasOwnProperty("rlAttribution")) {
                object.rlAttribution =
                    $root.StatusAttributions.StatusAttribution.RLAttribution.toObject(
                        message.rlAttribution,
                        options
                    );
                if (options.oneofs) object.attributionData = "rlAttribution";
            }
            if (
                message.aiCreatedAttribution != null &&
                message.hasOwnProperty("aiCreatedAttribution")
            ) {
                object.aiCreatedAttribution =
                    $root.StatusAttributions.StatusAttribution.AiCreatedAttribution.toObject(
                        message.aiCreatedAttribution,
                        options
                    );
                if (options.oneofs) object.attributionData = "aiCreatedAttribution";
            }
            return object;
        };
        StatusAttribution.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        StatusAttribution.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/StatusAttributions.StatusAttribution";
        };
        StatusAttribution.AiCreatedAttribution = (function () {
            function AiCreatedAttribution(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AiCreatedAttribution.prototype.source = null;
            var $oneOfFields;
            Object.defineProperty(AiCreatedAttribution.prototype, "_source", {
                get: $util.oneOfGetter(($oneOfFields = ["source"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AiCreatedAttribution.create = function create(properties) {
                return new AiCreatedAttribution(properties);
            };
            AiCreatedAttribution.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(8).int32(message.source);
                return writer;
            };
            AiCreatedAttribution.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AiCreatedAttribution.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.AiCreatedAttribution();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.source = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AiCreatedAttribution.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AiCreatedAttribution.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    properties._source = 1;
                    switch (message.source) {
                        default:
                            return "source: enum value expected";
                        case 0:
                        case 1:
                            break;
                    }
                }
                return null;
            };
            AiCreatedAttribution.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.StatusAttributions.StatusAttribution.AiCreatedAttribution
                )
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.AiCreatedAttribution();
                switch (object.source) {
                    default:
                        if (typeof object.source === "number") {
                            message.source = object.source;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.source = 0;
                        break;
                    case "STATUS_MIMICRY":
                    case 1:
                        message.source = 1;
                        break;
                }
                return message;
            };
            AiCreatedAttribution.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    object.source =
                        options.enums === String
                            ? $root.StatusAttributions.StatusAttribution.AiCreatedAttribution
                                  .Source[message.source] === undefined
                                ? message.source
                                : $root.StatusAttributions.StatusAttribution.AiCreatedAttribution
                                      .Source[message.source]
                            : message.source;
                    if (options.oneofs) object._source = "source";
                }
                return object;
            };
            AiCreatedAttribution.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AiCreatedAttribution.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.AiCreatedAttribution";
            };
            AiCreatedAttribution.Source = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "STATUS_MIMICRY")] = 1;
                return values;
            })();
            return AiCreatedAttribution;
        })();
        StatusAttribution.ExternalShare = (function () {
            function ExternalShare(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ExternalShare.prototype.actionUrl = null;
            ExternalShare.prototype.source = null;
            ExternalShare.prototype.duration = null;
            ExternalShare.prototype.actionFallbackUrl = null;
            var $oneOfFields;
            Object.defineProperty(ExternalShare.prototype, "_actionUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["actionUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ExternalShare.prototype, "_source", {
                get: $util.oneOfGetter(($oneOfFields = ["source"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ExternalShare.prototype, "_duration", {
                get: $util.oneOfGetter(($oneOfFields = ["duration"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ExternalShare.prototype, "_actionFallbackUrl", {
                get: $util.oneOfGetter(($oneOfFields = ["actionFallbackUrl"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ExternalShare.create = function create(properties) {
                return new ExternalShare(properties);
            };
            ExternalShare.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.actionUrl != null && Object.hasOwnProperty.call(message, "actionUrl"))
                    writer.uint32(10).string(message.actionUrl);
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(16).int32(message.source);
                if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                    writer.uint32(24).int32(message.duration);
                if (
                    message.actionFallbackUrl != null &&
                    Object.hasOwnProperty.call(message, "actionFallbackUrl")
                )
                    writer.uint32(34).string(message.actionFallbackUrl);
                return writer;
            };
            ExternalShare.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ExternalShare.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.ExternalShare();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.actionUrl = reader.string();
                            break;
                        }
                        case 2: {
                            message.source = reader.int32();
                            break;
                        }
                        case 3: {
                            message.duration = reader.int32();
                            break;
                        }
                        case 4: {
                            message.actionFallbackUrl = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ExternalShare.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ExternalShare.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.actionUrl != null && message.hasOwnProperty("actionUrl")) {
                    properties._actionUrl = 1;
                    if (!$util.isString(message.actionUrl)) return "actionUrl: string expected";
                }
                if (message.source != null && message.hasOwnProperty("source")) {
                    properties._source = 1;
                    switch (message.source) {
                        default:
                            return "source: enum value expected";
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
                            break;
                    }
                }
                if (message.duration != null && message.hasOwnProperty("duration")) {
                    properties._duration = 1;
                    if (!$util.isInteger(message.duration)) return "duration: integer expected";
                }
                if (
                    message.actionFallbackUrl != null &&
                    message.hasOwnProperty("actionFallbackUrl")
                ) {
                    properties._actionFallbackUrl = 1;
                    if (!$util.isString(message.actionFallbackUrl))
                        return "actionFallbackUrl: string expected";
                }
                return null;
            };
            ExternalShare.fromObject = function fromObject(object) {
                if (object instanceof $root.StatusAttributions.StatusAttribution.ExternalShare)
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.ExternalShare();
                if (object.actionUrl != null) message.actionUrl = String(object.actionUrl);
                switch (object.source) {
                    default:
                        if (typeof object.source === "number") {
                            message.source = object.source;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.source = 0;
                        break;
                    case "INSTAGRAM":
                    case 1:
                        message.source = 1;
                        break;
                    case "FACEBOOK":
                    case 2:
                        message.source = 2;
                        break;
                    case "MESSENGER":
                    case 3:
                        message.source = 3;
                        break;
                    case "SPOTIFY":
                    case 4:
                        message.source = 4;
                        break;
                    case "YOUTUBE":
                    case 5:
                        message.source = 5;
                        break;
                    case "PINTEREST":
                    case 6:
                        message.source = 6;
                        break;
                    case "THREADS":
                    case 7:
                        message.source = 7;
                        break;
                    case "APPLE_MUSIC":
                    case 8:
                        message.source = 8;
                        break;
                    case "SHARECHAT":
                    case 9:
                        message.source = 9;
                        break;
                    case "GOOGLE_PHOTOS":
                    case 10:
                        message.source = 10;
                        break;
                }
                if (object.duration != null) message.duration = object.duration | 0;
                if (object.actionFallbackUrl != null)
                    message.actionFallbackUrl = String(object.actionFallbackUrl);
                return message;
            };
            ExternalShare.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.actionUrl != null && message.hasOwnProperty("actionUrl")) {
                    object.actionUrl = message.actionUrl;
                    if (options.oneofs) object._actionUrl = "actionUrl";
                }
                if (message.source != null && message.hasOwnProperty("source")) {
                    object.source =
                        options.enums === String
                            ? $root.StatusAttributions.StatusAttribution.ExternalShare.Source[
                                  message.source
                              ] === undefined
                                ? message.source
                                : $root.StatusAttributions.StatusAttribution.ExternalShare.Source[
                                      message.source
                                  ]
                            : message.source;
                    if (options.oneofs) object._source = "source";
                }
                if (message.duration != null && message.hasOwnProperty("duration")) {
                    object.duration = message.duration;
                    if (options.oneofs) object._duration = "duration";
                }
                if (
                    message.actionFallbackUrl != null &&
                    message.hasOwnProperty("actionFallbackUrl")
                ) {
                    object.actionFallbackUrl = message.actionFallbackUrl;
                    if (options.oneofs) object._actionFallbackUrl = "actionFallbackUrl";
                }
                return object;
            };
            ExternalShare.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ExternalShare.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.ExternalShare";
            };
            ExternalShare.Source = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "INSTAGRAM")] = 1;
                values[(valuesById[2] = "FACEBOOK")] = 2;
                values[(valuesById[3] = "MESSENGER")] = 3;
                values[(valuesById[4] = "SPOTIFY")] = 4;
                values[(valuesById[5] = "YOUTUBE")] = 5;
                values[(valuesById[6] = "PINTEREST")] = 6;
                values[(valuesById[7] = "THREADS")] = 7;
                values[(valuesById[8] = "APPLE_MUSIC")] = 8;
                values[(valuesById[9] = "SHARECHAT")] = 9;
                values[(valuesById[10] = "GOOGLE_PHOTOS")] = 10;
                return values;
            })();
            return ExternalShare;
        })();
        StatusAttribution.GroupStatus = (function () {
            function GroupStatus(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            GroupStatus.prototype.authorJid = null;
            var $oneOfFields;
            Object.defineProperty(GroupStatus.prototype, "_authorJid", {
                get: $util.oneOfGetter(($oneOfFields = ["authorJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            GroupStatus.create = function create(properties) {
                return new GroupStatus(properties);
            };
            GroupStatus.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.authorJid != null && Object.hasOwnProperty.call(message, "authorJid"))
                    writer.uint32(10).string(message.authorJid);
                return writer;
            };
            GroupStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            GroupStatus.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.GroupStatus();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.authorJid = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            GroupStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            GroupStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.authorJid != null && message.hasOwnProperty("authorJid")) {
                    properties._authorJid = 1;
                    if (!$util.isString(message.authorJid)) return "authorJid: string expected";
                }
                return null;
            };
            GroupStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.StatusAttributions.StatusAttribution.GroupStatus)
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.GroupStatus();
                if (object.authorJid != null) message.authorJid = String(object.authorJid);
                return message;
            };
            GroupStatus.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.authorJid != null && message.hasOwnProperty("authorJid")) {
                    object.authorJid = message.authorJid;
                    if (options.oneofs) object._authorJid = "authorJid";
                }
                return object;
            };
            GroupStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            GroupStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.GroupStatus";
            };
            return GroupStatus;
        })();
        StatusAttribution.Music = (function () {
            function Music(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            Music.prototype.authorName = null;
            Music.prototype.songId = null;
            Music.prototype.title = null;
            Music.prototype.author = null;
            Music.prototype.artistAttribution = null;
            Music.prototype.isExplicit = null;
            var $oneOfFields;
            Object.defineProperty(Music.prototype, "_authorName", {
                get: $util.oneOfGetter(($oneOfFields = ["authorName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Music.prototype, "_songId", {
                get: $util.oneOfGetter(($oneOfFields = ["songId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Music.prototype, "_title", {
                get: $util.oneOfGetter(($oneOfFields = ["title"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Music.prototype, "_author", {
                get: $util.oneOfGetter(($oneOfFields = ["author"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Music.prototype, "_artistAttribution", {
                get: $util.oneOfGetter(($oneOfFields = ["artistAttribution"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Music.prototype, "_isExplicit", {
                get: $util.oneOfGetter(($oneOfFields = ["isExplicit"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Music.create = function create(properties) {
                return new Music(properties);
            };
            Music.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.authorName != null && Object.hasOwnProperty.call(message, "authorName"))
                    writer.uint32(10).string(message.authorName);
                if (message.songId != null && Object.hasOwnProperty.call(message, "songId"))
                    writer.uint32(18).string(message.songId);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(26).string(message.title);
                if (message.author != null && Object.hasOwnProperty.call(message, "author"))
                    writer.uint32(34).string(message.author);
                if (
                    message.artistAttribution != null &&
                    Object.hasOwnProperty.call(message, "artistAttribution")
                )
                    writer.uint32(42).string(message.artistAttribution);
                if (message.isExplicit != null && Object.hasOwnProperty.call(message, "isExplicit"))
                    writer.uint32(48).bool(message.isExplicit);
                return writer;
            };
            Music.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            Music.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.Music();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.authorName = reader.string();
                            break;
                        }
                        case 2: {
                            message.songId = reader.string();
                            break;
                        }
                        case 3: {
                            message.title = reader.string();
                            break;
                        }
                        case 4: {
                            message.author = reader.string();
                            break;
                        }
                        case 5: {
                            message.artistAttribution = reader.string();
                            break;
                        }
                        case 6: {
                            message.isExplicit = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            Music.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            Music.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.authorName != null && message.hasOwnProperty("authorName")) {
                    properties._authorName = 1;
                    if (!$util.isString(message.authorName)) return "authorName: string expected";
                }
                if (message.songId != null && message.hasOwnProperty("songId")) {
                    properties._songId = 1;
                    if (!$util.isString(message.songId)) return "songId: string expected";
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    properties._title = 1;
                    if (!$util.isString(message.title)) return "title: string expected";
                }
                if (message.author != null && message.hasOwnProperty("author")) {
                    properties._author = 1;
                    if (!$util.isString(message.author)) return "author: string expected";
                }
                if (
                    message.artistAttribution != null &&
                    message.hasOwnProperty("artistAttribution")
                ) {
                    properties._artistAttribution = 1;
                    if (!$util.isString(message.artistAttribution))
                        return "artistAttribution: string expected";
                }
                if (message.isExplicit != null && message.hasOwnProperty("isExplicit")) {
                    properties._isExplicit = 1;
                    if (typeof message.isExplicit !== "boolean")
                        return "isExplicit: boolean expected";
                }
                return null;
            };
            Music.fromObject = function fromObject(object) {
                if (object instanceof $root.StatusAttributions.StatusAttribution.Music)
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.Music();
                if (object.authorName != null) message.authorName = String(object.authorName);
                if (object.songId != null) message.songId = String(object.songId);
                if (object.title != null) message.title = String(object.title);
                if (object.author != null) message.author = String(object.author);
                if (object.artistAttribution != null)
                    message.artistAttribution = String(object.artistAttribution);
                if (object.isExplicit != null) message.isExplicit = Boolean(object.isExplicit);
                return message;
            };
            Music.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.authorName != null && message.hasOwnProperty("authorName")) {
                    object.authorName = message.authorName;
                    if (options.oneofs) object._authorName = "authorName";
                }
                if (message.songId != null && message.hasOwnProperty("songId")) {
                    object.songId = message.songId;
                    if (options.oneofs) object._songId = "songId";
                }
                if (message.title != null && message.hasOwnProperty("title")) {
                    object.title = message.title;
                    if (options.oneofs) object._title = "title";
                }
                if (message.author != null && message.hasOwnProperty("author")) {
                    object.author = message.author;
                    if (options.oneofs) object._author = "author";
                }
                if (
                    message.artistAttribution != null &&
                    message.hasOwnProperty("artistAttribution")
                ) {
                    object.artistAttribution = message.artistAttribution;
                    if (options.oneofs) object._artistAttribution = "artistAttribution";
                }
                if (message.isExplicit != null && message.hasOwnProperty("isExplicit")) {
                    object.isExplicit = message.isExplicit;
                    if (options.oneofs) object._isExplicit = "isExplicit";
                }
                return object;
            };
            Music.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            Music.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.Music";
            };
            return Music;
        })();
        StatusAttribution.RLAttribution = (function () {
            function RLAttribution(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            RLAttribution.prototype.source = null;
            var $oneOfFields;
            Object.defineProperty(RLAttribution.prototype, "_source", {
                get: $util.oneOfGetter(($oneOfFields = ["source"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            RLAttribution.create = function create(properties) {
                return new RLAttribution(properties);
            };
            RLAttribution.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(8).int32(message.source);
                return writer;
            };
            RLAttribution.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            RLAttribution.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.RLAttribution();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.source = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            RLAttribution.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            RLAttribution.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    properties._source = 1;
                    switch (message.source) {
                        default:
                            return "source: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                return null;
            };
            RLAttribution.fromObject = function fromObject(object) {
                if (object instanceof $root.StatusAttributions.StatusAttribution.RLAttribution)
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.RLAttribution();
                switch (object.source) {
                    default:
                        if (typeof object.source === "number") {
                            message.source = object.source;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.source = 0;
                        break;
                    case "RAY_BAN_META_GLASSES":
                    case 1:
                        message.source = 1;
                        break;
                    case "OAKLEY_META_GLASSES":
                    case 2:
                        message.source = 2;
                        break;
                    case "HYPERNOVA_GLASSES":
                    case 3:
                        message.source = 3;
                        break;
                }
                return message;
            };
            RLAttribution.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    object.source =
                        options.enums === String
                            ? $root.StatusAttributions.StatusAttribution.RLAttribution.Source[
                                  message.source
                              ] === undefined
                                ? message.source
                                : $root.StatusAttributions.StatusAttribution.RLAttribution.Source[
                                      message.source
                                  ]
                            : message.source;
                    if (options.oneofs) object._source = "source";
                }
                return object;
            };
            RLAttribution.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            RLAttribution.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.RLAttribution";
            };
            RLAttribution.Source = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "RAY_BAN_META_GLASSES")] = 1;
                values[(valuesById[2] = "OAKLEY_META_GLASSES")] = 2;
                values[(valuesById[3] = "HYPERNOVA_GLASSES")] = 3;
                return values;
            })();
            return RLAttribution;
        })();
        StatusAttribution.StatusReshare = (function () {
            function StatusReshare(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            StatusReshare.prototype.source = null;
            StatusReshare.prototype.metadata = null;
            var $oneOfFields;
            Object.defineProperty(StatusReshare.prototype, "_source", {
                get: $util.oneOfGetter(($oneOfFields = ["source"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StatusReshare.prototype, "_metadata", {
                get: $util.oneOfGetter(($oneOfFields = ["metadata"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            StatusReshare.create = function create(properties) {
                return new StatusReshare(properties);
            };
            StatusReshare.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(8).int32(message.source);
                if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                    $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata.encode(
                        message.metadata,
                        writer.uint32(18).fork()
                    ).ldelim();
                return writer;
            };
            StatusReshare.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            StatusReshare.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.StatusAttributions.StatusAttribution.StatusReshare();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.source = reader.int32();
                            break;
                        }
                        case 2: {
                            message.metadata =
                                $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata.decode(
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
            StatusReshare.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            StatusReshare.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    properties._source = 1;
                    switch (message.source) {
                        default:
                            return "source: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                    }
                }
                if (message.metadata != null && message.hasOwnProperty("metadata")) {
                    properties._metadata = 1;
                    {
                        var error =
                            $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata.verify(
                                message.metadata
                            );
                        if (error) return "metadata." + error;
                    }
                }
                return null;
            };
            StatusReshare.fromObject = function fromObject(object) {
                if (object instanceof $root.StatusAttributions.StatusAttribution.StatusReshare)
                    return object;
                var message = new $root.StatusAttributions.StatusAttribution.StatusReshare();
                switch (object.source) {
                    default:
                        if (typeof object.source === "number") {
                            message.source = object.source;
                            break;
                        }
                        break;
                    case "UNKNOWN":
                    case 0:
                        message.source = 0;
                        break;
                    case "INTERNAL_RESHARE":
                    case 1:
                        message.source = 1;
                        break;
                    case "MENTION_RESHARE":
                    case 2:
                        message.source = 2;
                        break;
                    case "CHANNEL_RESHARE":
                    case 3:
                        message.source = 3;
                        break;
                    case "FORWARD":
                    case 4:
                        message.source = 4;
                        break;
                }
                if (object.metadata != null) {
                    if (typeof object.metadata !== "object")
                        throw TypeError(
                            ".StatusAttributions.StatusAttribution.StatusReshare.metadata: object expected"
                        );
                    message.metadata =
                        $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata.fromObject(
                            object.metadata
                        );
                }
                return message;
            };
            StatusReshare.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.source != null && message.hasOwnProperty("source")) {
                    object.source =
                        options.enums === String
                            ? $root.StatusAttributions.StatusAttribution.StatusReshare.Source[
                                  message.source
                              ] === undefined
                                ? message.source
                                : $root.StatusAttributions.StatusAttribution.StatusReshare.Source[
                                      message.source
                                  ]
                            : message.source;
                    if (options.oneofs) object._source = "source";
                }
                if (message.metadata != null && message.hasOwnProperty("metadata")) {
                    object.metadata =
                        $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata.toObject(
                            message.metadata,
                            options
                        );
                    if (options.oneofs) object._metadata = "metadata";
                }
                return object;
            };
            StatusReshare.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            StatusReshare.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/StatusAttributions.StatusAttribution.StatusReshare";
            };
            StatusReshare.Metadata = (function () {
                function Metadata(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                Metadata.prototype.duration = null;
                Metadata.prototype.channelJid = null;
                Metadata.prototype.channelMessageId = null;
                Metadata.prototype.hasMultipleReshares = null;
                var $oneOfFields;
                Object.defineProperty(Metadata.prototype, "_duration", {
                    get: $util.oneOfGetter(($oneOfFields = ["duration"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Metadata.prototype, "_channelJid", {
                    get: $util.oneOfGetter(($oneOfFields = ["channelJid"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Metadata.prototype, "_channelMessageId", {
                    get: $util.oneOfGetter(($oneOfFields = ["channelMessageId"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Metadata.prototype, "_hasMultipleReshares", {
                    get: $util.oneOfGetter(($oneOfFields = ["hasMultipleReshares"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Metadata.create = function create(properties) {
                    return new Metadata(properties);
                };
                Metadata.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                        writer.uint32(8).int32(message.duration);
                    if (
                        message.channelJid != null &&
                        Object.hasOwnProperty.call(message, "channelJid")
                    )
                        writer.uint32(18).string(message.channelJid);
                    if (
                        message.channelMessageId != null &&
                        Object.hasOwnProperty.call(message, "channelMessageId")
                    )
                        writer.uint32(24).int32(message.channelMessageId);
                    if (
                        message.hasMultipleReshares != null &&
                        Object.hasOwnProperty.call(message, "hasMultipleReshares")
                    )
                        writer.uint32(32).bool(message.hasMultipleReshares);
                    return writer;
                };
                Metadata.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                Metadata.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message =
                            new $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.duration = reader.int32();
                                break;
                            }
                            case 2: {
                                message.channelJid = reader.string();
                                break;
                            }
                            case 3: {
                                message.channelMessageId = reader.int32();
                                break;
                            }
                            case 4: {
                                message.hasMultipleReshares = reader.bool();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                Metadata.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                Metadata.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        properties._duration = 1;
                        if (!$util.isInteger(message.duration)) return "duration: integer expected";
                    }
                    if (message.channelJid != null && message.hasOwnProperty("channelJid")) {
                        properties._channelJid = 1;
                        if (!$util.isString(message.channelJid))
                            return "channelJid: string expected";
                    }
                    if (
                        message.channelMessageId != null &&
                        message.hasOwnProperty("channelMessageId")
                    ) {
                        properties._channelMessageId = 1;
                        if (!$util.isInteger(message.channelMessageId))
                            return "channelMessageId: integer expected";
                    }
                    if (
                        message.hasMultipleReshares != null &&
                        message.hasOwnProperty("hasMultipleReshares")
                    ) {
                        properties._hasMultipleReshares = 1;
                        if (typeof message.hasMultipleReshares !== "boolean")
                            return "hasMultipleReshares: boolean expected";
                    }
                    return null;
                };
                Metadata.fromObject = function fromObject(object) {
                    if (
                        object instanceof
                        $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata
                    )
                        return object;
                    var message =
                        new $root.StatusAttributions.StatusAttribution.StatusReshare.Metadata();
                    if (object.duration != null) message.duration = object.duration | 0;
                    if (object.channelJid != null) message.channelJid = String(object.channelJid);
                    if (object.channelMessageId != null)
                        message.channelMessageId = object.channelMessageId | 0;
                    if (object.hasMultipleReshares != null)
                        message.hasMultipleReshares = Boolean(object.hasMultipleReshares);
                    return message;
                };
                Metadata.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        object.duration = message.duration;
                        if (options.oneofs) object._duration = "duration";
                    }
                    if (message.channelJid != null && message.hasOwnProperty("channelJid")) {
                        object.channelJid = message.channelJid;
                        if (options.oneofs) object._channelJid = "channelJid";
                    }
                    if (
                        message.channelMessageId != null &&
                        message.hasOwnProperty("channelMessageId")
                    ) {
                        object.channelMessageId = message.channelMessageId;
                        if (options.oneofs) object._channelMessageId = "channelMessageId";
                    }
                    if (
                        message.hasMultipleReshares != null &&
                        message.hasOwnProperty("hasMultipleReshares")
                    ) {
                        object.hasMultipleReshares = message.hasMultipleReshares;
                        if (options.oneofs) object._hasMultipleReshares = "hasMultipleReshares";
                    }
                    return object;
                };
                Metadata.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Metadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return (
                        typeUrlPrefix +
                        "/StatusAttributions.StatusAttribution.StatusReshare.Metadata"
                    );
                };
                return Metadata;
            })();
            StatusReshare.Source = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNKNOWN")] = 0;
                values[(valuesById[1] = "INTERNAL_RESHARE")] = 1;
                values[(valuesById[2] = "MENTION_RESHARE")] = 2;
                values[(valuesById[3] = "CHANNEL_RESHARE")] = 3;
                values[(valuesById[4] = "FORWARD")] = 4;
                return values;
            })();
            return StatusReshare;
        })();
        StatusAttribution.Type = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "RESHARE")] = 1;
            values[(valuesById[2] = "EXTERNAL_SHARE")] = 2;
            values[(valuesById[3] = "MUSIC")] = 3;
            values[(valuesById[4] = "STATUS_MENTION")] = 4;
            values[(valuesById[5] = "GROUP_STATUS")] = 5;
            values[(valuesById[6] = "RL_ATTRIBUTION")] = 6;
            values[(valuesById[7] = "AI_CREATED")] = 7;
            values[(valuesById[8] = "LAYOUTS")] = 8;
            return values;
        })();
        return StatusAttribution;
    })();
    return StatusAttributions;
})();
module.exports = $root;

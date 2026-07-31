"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
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

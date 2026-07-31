"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.DeviceCapabilities = (function () {
    var DeviceCapabilities = {};
    DeviceCapabilities.DeviceCapabilities = (function () {
        function DeviceCapabilities(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        DeviceCapabilities.prototype.chatLockSupportLevel = null;
        DeviceCapabilities.prototype.lidMigration = null;
        DeviceCapabilities.prototype.businessBroadcast = null;
        DeviceCapabilities.prototype.userHasAvatar = null;
        DeviceCapabilities.prototype.memberNameTagPrimarySupport = null;
        DeviceCapabilities.prototype.aiThread = null;
        var $oneOfFields;
        Object.defineProperty(DeviceCapabilities.prototype, "_chatLockSupportLevel", {
            get: $util.oneOfGetter(($oneOfFields = ["chatLockSupportLevel"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceCapabilities.prototype, "_lidMigration", {
            get: $util.oneOfGetter(($oneOfFields = ["lidMigration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceCapabilities.prototype, "_businessBroadcast", {
            get: $util.oneOfGetter(($oneOfFields = ["businessBroadcast"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceCapabilities.prototype, "_userHasAvatar", {
            get: $util.oneOfGetter(($oneOfFields = ["userHasAvatar"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceCapabilities.prototype, "_memberNameTagPrimarySupport", {
            get: $util.oneOfGetter(($oneOfFields = ["memberNameTagPrimarySupport"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(DeviceCapabilities.prototype, "_aiThread", {
            get: $util.oneOfGetter(($oneOfFields = ["aiThread"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        DeviceCapabilities.create = function create(properties) {
            return new DeviceCapabilities(properties);
        };
        DeviceCapabilities.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.chatLockSupportLevel != null &&
                Object.hasOwnProperty.call(message, "chatLockSupportLevel")
            )
                writer.uint32(8).int32(message.chatLockSupportLevel);
            if (message.lidMigration != null && Object.hasOwnProperty.call(message, "lidMigration"))
                $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.encode(
                    message.lidMigration,
                    writer.uint32(18).fork()
                ).ldelim();
            if (
                message.businessBroadcast != null &&
                Object.hasOwnProperty.call(message, "businessBroadcast")
            )
                $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.encode(
                    message.businessBroadcast,
                    writer.uint32(26).fork()
                ).ldelim();
            if (
                message.userHasAvatar != null &&
                Object.hasOwnProperty.call(message, "userHasAvatar")
            )
                $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.encode(
                    message.userHasAvatar,
                    writer.uint32(34).fork()
                ).ldelim();
            if (
                message.memberNameTagPrimarySupport != null &&
                Object.hasOwnProperty.call(message, "memberNameTagPrimarySupport")
            )
                writer.uint32(40).int32(message.memberNameTagPrimarySupport);
            if (message.aiThread != null && Object.hasOwnProperty.call(message, "aiThread"))
                $root.DeviceCapabilities.DeviceCapabilities.AiThread.encode(
                    message.aiThread,
                    writer.uint32(50).fork()
                ).ldelim();
            return writer;
        };
        DeviceCapabilities.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        DeviceCapabilities.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.DeviceCapabilities.DeviceCapabilities();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.chatLockSupportLevel = reader.int32();
                        break;
                    }
                    case 2: {
                        message.lidMigration =
                            $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 3: {
                        message.businessBroadcast =
                            $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 4: {
                        message.userHasAvatar =
                            $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 5: {
                        message.memberNameTagPrimarySupport = reader.int32();
                        break;
                    }
                    case 6: {
                        message.aiThread =
                            $root.DeviceCapabilities.DeviceCapabilities.AiThread.decode(
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
        DeviceCapabilities.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        DeviceCapabilities.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.chatLockSupportLevel != null &&
                message.hasOwnProperty("chatLockSupportLevel")
            ) {
                properties._chatLockSupportLevel = 1;
                switch (message.chatLockSupportLevel) {
                    default:
                        return "chatLockSupportLevel: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.lidMigration != null && message.hasOwnProperty("lidMigration")) {
                properties._lidMigration = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.verify(
                        message.lidMigration
                    );
                    if (error) return "lidMigration." + error;
                }
            }
            if (message.businessBroadcast != null && message.hasOwnProperty("businessBroadcast")) {
                properties._businessBroadcast = 1;
                {
                    var error =
                        $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify(
                            message.businessBroadcast
                        );
                    if (error) return "businessBroadcast." + error;
                }
            }
            if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                properties._userHasAvatar = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify(
                        message.userHasAvatar
                    );
                    if (error) return "userHasAvatar." + error;
                }
            }
            if (
                message.memberNameTagPrimarySupport != null &&
                message.hasOwnProperty("memberNameTagPrimarySupport")
            ) {
                properties._memberNameTagPrimarySupport = 1;
                switch (message.memberNameTagPrimarySupport) {
                    default:
                        return "memberNameTagPrimarySupport: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.aiThread != null && message.hasOwnProperty("aiThread")) {
                properties._aiThread = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.AiThread.verify(
                        message.aiThread
                    );
                    if (error) return "aiThread." + error;
                }
            }
            return null;
        };
        DeviceCapabilities.fromObject = function fromObject(object) {
            if (object instanceof $root.DeviceCapabilities.DeviceCapabilities) return object;
            var message = new $root.DeviceCapabilities.DeviceCapabilities();
            switch (object.chatLockSupportLevel) {
                default:
                    if (typeof object.chatLockSupportLevel === "number") {
                        message.chatLockSupportLevel = object.chatLockSupportLevel;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.chatLockSupportLevel = 0;
                    break;
                case "MINIMAL":
                case 1:
                    message.chatLockSupportLevel = 1;
                    break;
                case "FULL":
                case 2:
                    message.chatLockSupportLevel = 2;
                    break;
            }
            if (object.lidMigration != null) {
                if (typeof object.lidMigration !== "object")
                    throw TypeError(
                        ".DeviceCapabilities.DeviceCapabilities.lidMigration: object expected"
                    );
                message.lidMigration =
                    $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.fromObject(
                        object.lidMigration
                    );
            }
            if (object.businessBroadcast != null) {
                if (typeof object.businessBroadcast !== "object")
                    throw TypeError(
                        ".DeviceCapabilities.DeviceCapabilities.businessBroadcast: object expected"
                    );
                message.businessBroadcast =
                    $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.fromObject(
                        object.businessBroadcast
                    );
            }
            if (object.userHasAvatar != null) {
                if (typeof object.userHasAvatar !== "object")
                    throw TypeError(
                        ".DeviceCapabilities.DeviceCapabilities.userHasAvatar: object expected"
                    );
                message.userHasAvatar =
                    $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.fromObject(
                        object.userHasAvatar
                    );
            }
            switch (object.memberNameTagPrimarySupport) {
                default:
                    if (typeof object.memberNameTagPrimarySupport === "number") {
                        message.memberNameTagPrimarySupport = object.memberNameTagPrimarySupport;
                        break;
                    }
                    break;
                case "DISABLED":
                case 0:
                    message.memberNameTagPrimarySupport = 0;
                    break;
                case "RECEIVER_ENABLED":
                case 1:
                    message.memberNameTagPrimarySupport = 1;
                    break;
                case "SENDER_ENABLED":
                case 2:
                    message.memberNameTagPrimarySupport = 2;
                    break;
            }
            if (object.aiThread != null) {
                if (typeof object.aiThread !== "object")
                    throw TypeError(
                        ".DeviceCapabilities.DeviceCapabilities.aiThread: object expected"
                    );
                message.aiThread = $root.DeviceCapabilities.DeviceCapabilities.AiThread.fromObject(
                    object.aiThread
                );
            }
            return message;
        };
        DeviceCapabilities.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.chatLockSupportLevel != null &&
                message.hasOwnProperty("chatLockSupportLevel")
            ) {
                object.chatLockSupportLevel =
                    options.enums === String
                        ? $root.DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel[
                              message.chatLockSupportLevel
                          ] === undefined
                            ? message.chatLockSupportLevel
                            : $root.DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel[
                                  message.chatLockSupportLevel
                              ]
                        : message.chatLockSupportLevel;
                if (options.oneofs) object._chatLockSupportLevel = "chatLockSupportLevel";
            }
            if (message.lidMigration != null && message.hasOwnProperty("lidMigration")) {
                object.lidMigration =
                    $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.toObject(
                        message.lidMigration,
                        options
                    );
                if (options.oneofs) object._lidMigration = "lidMigration";
            }
            if (message.businessBroadcast != null && message.hasOwnProperty("businessBroadcast")) {
                object.businessBroadcast =
                    $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.toObject(
                        message.businessBroadcast,
                        options
                    );
                if (options.oneofs) object._businessBroadcast = "businessBroadcast";
            }
            if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                object.userHasAvatar =
                    $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.toObject(
                        message.userHasAvatar,
                        options
                    );
                if (options.oneofs) object._userHasAvatar = "userHasAvatar";
            }
            if (
                message.memberNameTagPrimarySupport != null &&
                message.hasOwnProperty("memberNameTagPrimarySupport")
            ) {
                object.memberNameTagPrimarySupport =
                    options.enums === String
                        ? $root.DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport[
                              message.memberNameTagPrimarySupport
                          ] === undefined
                            ? message.memberNameTagPrimarySupport
                            : $root.DeviceCapabilities.DeviceCapabilities
                                  .MemberNameTagPrimarySupport[message.memberNameTagPrimarySupport]
                        : message.memberNameTagPrimarySupport;
                if (options.oneofs)
                    object._memberNameTagPrimarySupport = "memberNameTagPrimarySupport";
            }
            if (message.aiThread != null && message.hasOwnProperty("aiThread")) {
                object.aiThread = $root.DeviceCapabilities.DeviceCapabilities.AiThread.toObject(
                    message.aiThread,
                    options
                );
                if (options.oneofs) object._aiThread = "aiThread";
            }
            return object;
        };
        DeviceCapabilities.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        DeviceCapabilities.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities";
        };
        DeviceCapabilities.AiThread = (function () {
            function AiThread(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AiThread.prototype.supportLevel = null;
            var $oneOfFields;
            Object.defineProperty(AiThread.prototype, "_supportLevel", {
                get: $util.oneOfGetter(($oneOfFields = ["supportLevel"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AiThread.create = function create(properties) {
                return new AiThread(properties);
            };
            AiThread.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.supportLevel != null &&
                    Object.hasOwnProperty.call(message, "supportLevel")
                )
                    writer.uint32(8).int32(message.supportLevel);
                return writer;
            };
            AiThread.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AiThread.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.DeviceCapabilities.DeviceCapabilities.AiThread();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.supportLevel = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AiThread.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AiThread.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.supportLevel != null && message.hasOwnProperty("supportLevel")) {
                    properties._supportLevel = 1;
                    switch (message.supportLevel) {
                        default:
                            return "supportLevel: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            AiThread.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.AiThread)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.AiThread();
                switch (object.supportLevel) {
                    default:
                        if (typeof object.supportLevel === "number") {
                            message.supportLevel = object.supportLevel;
                            break;
                        }
                        break;
                    case "NONE":
                    case 0:
                        message.supportLevel = 0;
                        break;
                    case "INFRA":
                    case 1:
                        message.supportLevel = 1;
                        break;
                    case "FULL":
                    case 2:
                        message.supportLevel = 2;
                        break;
                }
                return message;
            };
            AiThread.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.supportLevel != null && message.hasOwnProperty("supportLevel")) {
                    object.supportLevel =
                        options.enums === String
                            ? $root.DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel[
                                  message.supportLevel
                              ] === undefined
                                ? message.supportLevel
                                : $root.DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel[
                                      message.supportLevel
                                  ]
                            : message.supportLevel;
                    if (options.oneofs) object._supportLevel = "supportLevel";
                }
                return object;
            };
            AiThread.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AiThread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.AiThread";
            };
            AiThread.SupportLevel = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "NONE")] = 0;
                values[(valuesById[1] = "INFRA")] = 1;
                values[(valuesById[2] = "FULL")] = 2;
                return values;
            })();
            return AiThread;
        })();
        DeviceCapabilities.BusinessBroadcast = (function () {
            function BusinessBroadcast(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BusinessBroadcast.prototype.importListEnabled = null;
            var $oneOfFields;
            Object.defineProperty(BusinessBroadcast.prototype, "_importListEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["importListEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BusinessBroadcast.create = function create(properties) {
                return new BusinessBroadcast(properties);
            };
            BusinessBroadcast.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.importListEnabled != null &&
                    Object.hasOwnProperty.call(message, "importListEnabled")
                )
                    writer.uint32(8).bool(message.importListEnabled);
                return writer;
            };
            BusinessBroadcast.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BusinessBroadcast.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.importListEnabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BusinessBroadcast.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BusinessBroadcast.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.importListEnabled != null &&
                    message.hasOwnProperty("importListEnabled")
                ) {
                    properties._importListEnabled = 1;
                    if (typeof message.importListEnabled !== "boolean")
                        return "importListEnabled: boolean expected";
                }
                return null;
            };
            BusinessBroadcast.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast();
                if (object.importListEnabled != null)
                    message.importListEnabled = Boolean(object.importListEnabled);
                return message;
            };
            BusinessBroadcast.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.importListEnabled != null &&
                    message.hasOwnProperty("importListEnabled")
                ) {
                    object.importListEnabled = message.importListEnabled;
                    if (options.oneofs) object._importListEnabled = "importListEnabled";
                }
                return object;
            };
            BusinessBroadcast.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BusinessBroadcast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.BusinessBroadcast";
            };
            return BusinessBroadcast;
        })();
        DeviceCapabilities.ChatLockSupportLevel = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "NONE")] = 0;
            values[(valuesById[1] = "MINIMAL")] = 1;
            values[(valuesById[2] = "FULL")] = 2;
            return values;
        })();
        DeviceCapabilities.LIDMigration = (function () {
            function LIDMigration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LIDMigration.prototype.chatDbMigrationTimestamp = null;
            var $oneOfFields;
            Object.defineProperty(LIDMigration.prototype, "_chatDbMigrationTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["chatDbMigrationTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LIDMigration.create = function create(properties) {
                return new LIDMigration(properties);
            };
            LIDMigration.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.chatDbMigrationTimestamp != null &&
                    Object.hasOwnProperty.call(message, "chatDbMigrationTimestamp")
                )
                    writer.uint32(8).uint64(message.chatDbMigrationTimestamp);
                return writer;
            };
            LIDMigration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LIDMigration.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.DeviceCapabilities.DeviceCapabilities.LIDMigration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.chatDbMigrationTimestamp = reader.uint64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LIDMigration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LIDMigration.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.chatDbMigrationTimestamp != null &&
                    message.hasOwnProperty("chatDbMigrationTimestamp")
                ) {
                    properties._chatDbMigrationTimestamp = 1;
                    if (
                        !$util.isInteger(message.chatDbMigrationTimestamp) &&
                        !(
                            message.chatDbMigrationTimestamp &&
                            $util.isInteger(message.chatDbMigrationTimestamp.low) &&
                            $util.isInteger(message.chatDbMigrationTimestamp.high)
                        )
                    )
                        return "chatDbMigrationTimestamp: integer|Long expected";
                }
                return null;
            };
            LIDMigration.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.LIDMigration)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.LIDMigration();
                if (object.chatDbMigrationTimestamp != null)
                    if ($util.Long)
                        (message.chatDbMigrationTimestamp = $util.Long.fromValue(
                            object.chatDbMigrationTimestamp
                        )).unsigned = true;
                    else if (typeof object.chatDbMigrationTimestamp === "string")
                        message.chatDbMigrationTimestamp = parseInt(
                            object.chatDbMigrationTimestamp,
                            10
                        );
                    else if (typeof object.chatDbMigrationTimestamp === "number")
                        message.chatDbMigrationTimestamp = object.chatDbMigrationTimestamp;
                    else if (typeof object.chatDbMigrationTimestamp === "object")
                        message.chatDbMigrationTimestamp = new $util.LongBits(
                            object.chatDbMigrationTimestamp.low >>> 0,
                            object.chatDbMigrationTimestamp.high >>> 0
                        ).toNumber(true);
                return message;
            };
            LIDMigration.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.chatDbMigrationTimestamp != null &&
                    message.hasOwnProperty("chatDbMigrationTimestamp")
                ) {
                    if (typeof message.chatDbMigrationTimestamp === "number")
                        object.chatDbMigrationTimestamp =
                            options.longs === String
                                ? String(message.chatDbMigrationTimestamp)
                                : message.chatDbMigrationTimestamp;
                    else
                        object.chatDbMigrationTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(
                                      message.chatDbMigrationTimestamp
                                  )
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.chatDbMigrationTimestamp.low >>> 0,
                                        message.chatDbMigrationTimestamp.high >>> 0
                                    ).toNumber(true)
                                  : message.chatDbMigrationTimestamp;
                    if (options.oneofs)
                        object._chatDbMigrationTimestamp = "chatDbMigrationTimestamp";
                }
                return object;
            };
            LIDMigration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LIDMigration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.LIDMigration";
            };
            return LIDMigration;
        })();
        DeviceCapabilities.MemberNameTagPrimarySupport = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "DISABLED")] = 0;
            values[(valuesById[1] = "RECEIVER_ENABLED")] = 1;
            values[(valuesById[2] = "SENDER_ENABLED")] = 2;
            return values;
        })();
        DeviceCapabilities.UserHasAvatar = (function () {
            function UserHasAvatar(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            UserHasAvatar.prototype.userHasAvatar = null;
            var $oneOfFields;
            Object.defineProperty(UserHasAvatar.prototype, "_userHasAvatar", {
                get: $util.oneOfGetter(($oneOfFields = ["userHasAvatar"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            UserHasAvatar.create = function create(properties) {
                return new UserHasAvatar(properties);
            };
            UserHasAvatar.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.userHasAvatar != null &&
                    Object.hasOwnProperty.call(message, "userHasAvatar")
                )
                    writer.uint32(8).bool(message.userHasAvatar);
                return writer;
            };
            UserHasAvatar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            UserHasAvatar.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.userHasAvatar = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            UserHasAvatar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            UserHasAvatar.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                    properties._userHasAvatar = 1;
                    if (typeof message.userHasAvatar !== "boolean")
                        return "userHasAvatar: boolean expected";
                }
                return null;
            };
            UserHasAvatar.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar();
                if (object.userHasAvatar != null)
                    message.userHasAvatar = Boolean(object.userHasAvatar);
                return message;
            };
            UserHasAvatar.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                    object.userHasAvatar = message.userHasAvatar;
                    if (options.oneofs) object._userHasAvatar = "userHasAvatar";
                }
                return object;
            };
            UserHasAvatar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            UserHasAvatar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.UserHasAvatar";
            };
            return UserHasAvatar;
        })();
        return DeviceCapabilities;
    })();
    return DeviceCapabilities;
})();
module.exports = $root;

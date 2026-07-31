"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
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
module.exports = $root;

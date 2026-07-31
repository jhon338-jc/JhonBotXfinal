"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.Ephemeral = (function () {
    var Ephemeral = {};
    Ephemeral.EphemeralSetting = (function () {
        function EphemeralSetting(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        EphemeralSetting.prototype.duration = null;
        EphemeralSetting.prototype.timestamp = null;
        var $oneOfFields;
        Object.defineProperty(EphemeralSetting.prototype, "_duration", {
            get: $util.oneOfGetter(($oneOfFields = ["duration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(EphemeralSetting.prototype, "_timestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        EphemeralSetting.create = function create(properties) {
            return new EphemeralSetting(properties);
        };
        EphemeralSetting.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                writer.uint32(13).sfixed32(message.duration);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(17).sfixed64(message.timestamp);
            return writer;
        };
        EphemeralSetting.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        EphemeralSetting.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Ephemeral.EphemeralSetting();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.duration = reader.sfixed32();
                        break;
                    }
                    case 2: {
                        message.timestamp = reader.sfixed64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        EphemeralSetting.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        EphemeralSetting.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.duration != null && message.hasOwnProperty("duration")) {
                properties._duration = 1;
                if (!$util.isInteger(message.duration)) return "duration: integer expected";
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
        EphemeralSetting.fromObject = function fromObject(object) {
            if (object instanceof $root.Ephemeral.EphemeralSetting) return object;
            var message = new $root.Ephemeral.EphemeralSetting();
            if (object.duration != null) message.duration = object.duration | 0;
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
        EphemeralSetting.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.duration != null && message.hasOwnProperty("duration")) {
                object.duration = message.duration;
                if (options.oneofs) object._duration = "duration";
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
        EphemeralSetting.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        EphemeralSetting.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Ephemeral.EphemeralSetting";
        };
        return EphemeralSetting;
    })();
    return Ephemeral;
})();
module.exports = $root;

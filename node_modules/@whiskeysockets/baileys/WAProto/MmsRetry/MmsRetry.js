"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.MmsRetry = (function () {
    var MmsRetry = {};
    MmsRetry.ServerErrorReceipt = (function () {
        function ServerErrorReceipt(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ServerErrorReceipt.prototype.stanzaId = null;
        var $oneOfFields;
        Object.defineProperty(ServerErrorReceipt.prototype, "_stanzaId", {
            get: $util.oneOfGetter(($oneOfFields = ["stanzaId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ServerErrorReceipt.create = function create(properties) {
            return new ServerErrorReceipt(properties);
        };
        ServerErrorReceipt.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.stanzaId != null && Object.hasOwnProperty.call(message, "stanzaId"))
                writer.uint32(10).string(message.stanzaId);
            return writer;
        };
        ServerErrorReceipt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ServerErrorReceipt.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.MmsRetry.ServerErrorReceipt();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.stanzaId = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ServerErrorReceipt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ServerErrorReceipt.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.stanzaId != null && message.hasOwnProperty("stanzaId")) {
                properties._stanzaId = 1;
                if (!$util.isString(message.stanzaId)) return "stanzaId: string expected";
            }
            return null;
        };
        ServerErrorReceipt.fromObject = function fromObject(object) {
            if (object instanceof $root.MmsRetry.ServerErrorReceipt) return object;
            var message = new $root.MmsRetry.ServerErrorReceipt();
            if (object.stanzaId != null) message.stanzaId = String(object.stanzaId);
            return message;
        };
        ServerErrorReceipt.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.stanzaId != null && message.hasOwnProperty("stanzaId")) {
                object.stanzaId = message.stanzaId;
                if (options.oneofs) object._stanzaId = "stanzaId";
            }
            return object;
        };
        ServerErrorReceipt.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ServerErrorReceipt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/MmsRetry.ServerErrorReceipt";
        };
        return ServerErrorReceipt;
    })();
    MmsRetry.MediaRetryNotification = (function () {
        function MediaRetryNotification(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        MediaRetryNotification.prototype.stanzaId = null;
        MediaRetryNotification.prototype.directPath = null;
        MediaRetryNotification.prototype.result = null;
        MediaRetryNotification.prototype.messageSecret = null;
        var $oneOfFields;
        Object.defineProperty(MediaRetryNotification.prototype, "_stanzaId", {
            get: $util.oneOfGetter(($oneOfFields = ["stanzaId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MediaRetryNotification.prototype, "_directPath", {
            get: $util.oneOfGetter(($oneOfFields = ["directPath"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MediaRetryNotification.prototype, "_result", {
            get: $util.oneOfGetter(($oneOfFields = ["result"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(MediaRetryNotification.prototype, "_messageSecret", {
            get: $util.oneOfGetter(($oneOfFields = ["messageSecret"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        MediaRetryNotification.create = function create(properties) {
            return new MediaRetryNotification(properties);
        };
        MediaRetryNotification.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.stanzaId != null && Object.hasOwnProperty.call(message, "stanzaId"))
                writer.uint32(10).string(message.stanzaId);
            if (message.directPath != null && Object.hasOwnProperty.call(message, "directPath"))
                writer.uint32(18).string(message.directPath);
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(24).int32(message.result);
            if (
                message.messageSecret != null &&
                Object.hasOwnProperty.call(message, "messageSecret")
            )
                writer.uint32(34).bytes(message.messageSecret);
            return writer;
        };
        MediaRetryNotification.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        MediaRetryNotification.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.MmsRetry.MediaRetryNotification();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.stanzaId = reader.string();
                        break;
                    }
                    case 2: {
                        message.directPath = reader.string();
                        break;
                    }
                    case 3: {
                        message.result = reader.int32();
                        break;
                    }
                    case 4: {
                        message.messageSecret = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        MediaRetryNotification.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        MediaRetryNotification.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.stanzaId != null && message.hasOwnProperty("stanzaId")) {
                properties._stanzaId = 1;
                if (!$util.isString(message.stanzaId)) return "stanzaId: string expected";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                properties._directPath = 1;
                if (!$util.isString(message.directPath)) return "directPath: string expected";
            }
            if (message.result != null && message.hasOwnProperty("result")) {
                properties._result = 1;
                switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            }
            if (message.messageSecret != null && message.hasOwnProperty("messageSecret")) {
                properties._messageSecret = 1;
                if (
                    !(
                        (message.messageSecret &&
                            typeof message.messageSecret.length === "number") ||
                        $util.isString(message.messageSecret)
                    )
                )
                    return "messageSecret: buffer expected";
            }
            return null;
        };
        MediaRetryNotification.fromObject = function fromObject(object) {
            if (object instanceof $root.MmsRetry.MediaRetryNotification) return object;
            var message = new $root.MmsRetry.MediaRetryNotification();
            if (object.stanzaId != null) message.stanzaId = String(object.stanzaId);
            if (object.directPath != null) message.directPath = String(object.directPath);
            switch (object.result) {
                default:
                    if (typeof object.result === "number") {
                        message.result = object.result;
                        break;
                    }
                    break;
                case "GENERAL_ERROR":
                case 0:
                    message.result = 0;
                    break;
                case "SUCCESS":
                case 1:
                    message.result = 1;
                    break;
                case "NOT_FOUND":
                case 2:
                    message.result = 2;
                    break;
                case "DECRYPTION_ERROR":
                case 3:
                    message.result = 3;
                    break;
            }
            if (object.messageSecret != null)
                if (typeof object.messageSecret === "string")
                    $util.base64.decode(
                        object.messageSecret,
                        (message.messageSecret = $util.newBuffer(
                            $util.base64.length(object.messageSecret)
                        )),
                        0
                    );
                else if (object.messageSecret.length >= 0)
                    message.messageSecret = object.messageSecret;
            return message;
        };
        MediaRetryNotification.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.stanzaId != null && message.hasOwnProperty("stanzaId")) {
                object.stanzaId = message.stanzaId;
                if (options.oneofs) object._stanzaId = "stanzaId";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                object.directPath = message.directPath;
                if (options.oneofs) object._directPath = "directPath";
            }
            if (message.result != null && message.hasOwnProperty("result")) {
                object.result =
                    options.enums === String
                        ? $root.MmsRetry.MediaRetryNotification.ResultType[message.result] ===
                          undefined
                            ? message.result
                            : $root.MmsRetry.MediaRetryNotification.ResultType[message.result]
                        : message.result;
                if (options.oneofs) object._result = "result";
            }
            if (message.messageSecret != null && message.hasOwnProperty("messageSecret")) {
                object.messageSecret =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.messageSecret,
                              0,
                              message.messageSecret.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.messageSecret)
                          : message.messageSecret;
                if (options.oneofs) object._messageSecret = "messageSecret";
            }
            return object;
        };
        MediaRetryNotification.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        MediaRetryNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/MmsRetry.MediaRetryNotification";
        };
        MediaRetryNotification.ResultType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "GENERAL_ERROR")] = 0;
            values[(valuesById[1] = "SUCCESS")] = 1;
            values[(valuesById[2] = "NOT_FOUND")] = 2;
            values[(valuesById[3] = "DECRYPTION_ERROR")] = 3;
            return values;
        })();
        return MediaRetryNotification;
    })();
    return MmsRetry;
})();
module.exports = $root;

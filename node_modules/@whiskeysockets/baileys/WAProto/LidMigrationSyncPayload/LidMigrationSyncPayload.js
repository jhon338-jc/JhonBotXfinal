"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.LidMigrationSyncPayload = (function () {
    var LidMigrationSyncPayload = {};
    LidMigrationSyncPayload.LIDMigrationMappingSyncPayload = (function () {
        function LIDMigrationMappingSyncPayload(properties) {
            this.pnToLidMappings = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        LIDMigrationMappingSyncPayload.prototype.pnToLidMappings = $util.emptyArray;
        LIDMigrationMappingSyncPayload.prototype.chatDbMigrationTimestamp = null;
        var $oneOfFields;
        Object.defineProperty(
            LIDMigrationMappingSyncPayload.prototype,
            "_chatDbMigrationTimestamp",
            {
                get: $util.oneOfGetter(($oneOfFields = ["chatDbMigrationTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        LIDMigrationMappingSyncPayload.create = function create(properties) {
            return new LIDMigrationMappingSyncPayload(properties);
        };
        LIDMigrationMappingSyncPayload.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.pnToLidMappings != null && message.pnToLidMappings.length)
                for (var i = 0; i < message.pnToLidMappings.length; ++i)
                    $root.LidMigrationSyncPayload.LIDMigrationMapping.encode(
                        message.pnToLidMappings[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            if (
                message.chatDbMigrationTimestamp != null &&
                Object.hasOwnProperty.call(message, "chatDbMigrationTimestamp")
            )
                writer.uint32(16).uint64(message.chatDbMigrationTimestamp);
            return writer;
        };
        LIDMigrationMappingSyncPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        LIDMigrationMappingSyncPayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.LidMigrationSyncPayload.LIDMigrationMappingSyncPayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.pnToLidMappings && message.pnToLidMappings.length))
                            message.pnToLidMappings = [];
                        message.pnToLidMappings.push(
                            $root.LidMigrationSyncPayload.LIDMigrationMapping.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 2: {
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
        LIDMigrationMappingSyncPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        LIDMigrationMappingSyncPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.pnToLidMappings != null && message.hasOwnProperty("pnToLidMappings")) {
                if (!Array.isArray(message.pnToLidMappings))
                    return "pnToLidMappings: array expected";
                for (var i = 0; i < message.pnToLidMappings.length; ++i) {
                    var error = $root.LidMigrationSyncPayload.LIDMigrationMapping.verify(
                        message.pnToLidMappings[i]
                    );
                    if (error) return "pnToLidMappings." + error;
                }
            }
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
        LIDMigrationMappingSyncPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.LidMigrationSyncPayload.LIDMigrationMappingSyncPayload)
                return object;
            var message = new $root.LidMigrationSyncPayload.LIDMigrationMappingSyncPayload();
            if (object.pnToLidMappings) {
                if (!Array.isArray(object.pnToLidMappings))
                    throw TypeError(
                        ".LidMigrationSyncPayload.LIDMigrationMappingSyncPayload.pnToLidMappings: array expected"
                    );
                message.pnToLidMappings = [];
                for (var i = 0; i < object.pnToLidMappings.length; ++i) {
                    if (typeof object.pnToLidMappings[i] !== "object")
                        throw TypeError(
                            ".LidMigrationSyncPayload.LIDMigrationMappingSyncPayload.pnToLidMappings: object expected"
                        );
                    message.pnToLidMappings[i] =
                        $root.LidMigrationSyncPayload.LIDMigrationMapping.fromObject(
                            object.pnToLidMappings[i]
                        );
                }
            }
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
        LIDMigrationMappingSyncPayload.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.pnToLidMappings = [];
            if (message.pnToLidMappings && message.pnToLidMappings.length) {
                object.pnToLidMappings = [];
                for (var j = 0; j < message.pnToLidMappings.length; ++j)
                    object.pnToLidMappings[j] =
                        $root.LidMigrationSyncPayload.LIDMigrationMapping.toObject(
                            message.pnToLidMappings[j],
                            options
                        );
            }
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
                            ? $util.Long.prototype.toString.call(message.chatDbMigrationTimestamp)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.chatDbMigrationTimestamp.low >>> 0,
                                    message.chatDbMigrationTimestamp.high >>> 0
                                ).toNumber(true)
                              : message.chatDbMigrationTimestamp;
                if (options.oneofs) object._chatDbMigrationTimestamp = "chatDbMigrationTimestamp";
            }
            return object;
        };
        LIDMigrationMappingSyncPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        LIDMigrationMappingSyncPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/LidMigrationSyncPayload.LIDMigrationMappingSyncPayload";
        };
        return LIDMigrationMappingSyncPayload;
    })();
    LidMigrationSyncPayload.LIDMigrationMapping = (function () {
        function LIDMigrationMapping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        LIDMigrationMapping.prototype.pn = null;
        LIDMigrationMapping.prototype.assignedLid = null;
        LIDMigrationMapping.prototype.latestLid = null;
        var $oneOfFields;
        Object.defineProperty(LIDMigrationMapping.prototype, "_pn", {
            get: $util.oneOfGetter(($oneOfFields = ["pn"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LIDMigrationMapping.prototype, "_assignedLid", {
            get: $util.oneOfGetter(($oneOfFields = ["assignedLid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LIDMigrationMapping.prototype, "_latestLid", {
            get: $util.oneOfGetter(($oneOfFields = ["latestLid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        LIDMigrationMapping.create = function create(properties) {
            return new LIDMigrationMapping(properties);
        };
        LIDMigrationMapping.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.pn != null && Object.hasOwnProperty.call(message, "pn"))
                writer.uint32(8).uint64(message.pn);
            if (message.assignedLid != null && Object.hasOwnProperty.call(message, "assignedLid"))
                writer.uint32(16).uint64(message.assignedLid);
            if (message.latestLid != null && Object.hasOwnProperty.call(message, "latestLid"))
                writer.uint32(24).uint64(message.latestLid);
            return writer;
        };
        LIDMigrationMapping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        LIDMigrationMapping.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.LidMigrationSyncPayload.LIDMigrationMapping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.pn = reader.uint64();
                        break;
                    }
                    case 2: {
                        message.assignedLid = reader.uint64();
                        break;
                    }
                    case 3: {
                        message.latestLid = reader.uint64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        LIDMigrationMapping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        LIDMigrationMapping.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.pn != null && message.hasOwnProperty("pn")) {
                properties._pn = 1;
                if (
                    !$util.isInteger(message.pn) &&
                    !(
                        message.pn &&
                        $util.isInteger(message.pn.low) &&
                        $util.isInteger(message.pn.high)
                    )
                )
                    return "pn: integer|Long expected";
            }
            if (message.assignedLid != null && message.hasOwnProperty("assignedLid")) {
                properties._assignedLid = 1;
                if (
                    !$util.isInteger(message.assignedLid) &&
                    !(
                        message.assignedLid &&
                        $util.isInteger(message.assignedLid.low) &&
                        $util.isInteger(message.assignedLid.high)
                    )
                )
                    return "assignedLid: integer|Long expected";
            }
            if (message.latestLid != null && message.hasOwnProperty("latestLid")) {
                properties._latestLid = 1;
                if (
                    !$util.isInteger(message.latestLid) &&
                    !(
                        message.latestLid &&
                        $util.isInteger(message.latestLid.low) &&
                        $util.isInteger(message.latestLid.high)
                    )
                )
                    return "latestLid: integer|Long expected";
            }
            return null;
        };
        LIDMigrationMapping.fromObject = function fromObject(object) {
            if (object instanceof $root.LidMigrationSyncPayload.LIDMigrationMapping) return object;
            var message = new $root.LidMigrationSyncPayload.LIDMigrationMapping();
            if (object.pn != null)
                if ($util.Long) (message.pn = $util.Long.fromValue(object.pn)).unsigned = true;
                else if (typeof object.pn === "string") message.pn = parseInt(object.pn, 10);
                else if (typeof object.pn === "number") message.pn = object.pn;
                else if (typeof object.pn === "object")
                    message.pn = new $util.LongBits(
                        object.pn.low >>> 0,
                        object.pn.high >>> 0
                    ).toNumber(true);
            if (object.assignedLid != null)
                if ($util.Long)
                    (message.assignedLid = $util.Long.fromValue(object.assignedLid)).unsigned =
                        true;
                else if (typeof object.assignedLid === "string")
                    message.assignedLid = parseInt(object.assignedLid, 10);
                else if (typeof object.assignedLid === "number")
                    message.assignedLid = object.assignedLid;
                else if (typeof object.assignedLid === "object")
                    message.assignedLid = new $util.LongBits(
                        object.assignedLid.low >>> 0,
                        object.assignedLid.high >>> 0
                    ).toNumber(true);
            if (object.latestLid != null)
                if ($util.Long)
                    (message.latestLid = $util.Long.fromValue(object.latestLid)).unsigned = true;
                else if (typeof object.latestLid === "string")
                    message.latestLid = parseInt(object.latestLid, 10);
                else if (typeof object.latestLid === "number") message.latestLid = object.latestLid;
                else if (typeof object.latestLid === "object")
                    message.latestLid = new $util.LongBits(
                        object.latestLid.low >>> 0,
                        object.latestLid.high >>> 0
                    ).toNumber(true);
            return message;
        };
        LIDMigrationMapping.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.pn != null && message.hasOwnProperty("pn")) {
                if (typeof message.pn === "number")
                    object.pn = options.longs === String ? String(message.pn) : message.pn;
                else
                    object.pn =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.pn)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.pn.low >>> 0,
                                    message.pn.high >>> 0
                                ).toNumber(true)
                              : message.pn;
                if (options.oneofs) object._pn = "pn";
            }
            if (message.assignedLid != null && message.hasOwnProperty("assignedLid")) {
                if (typeof message.assignedLid === "number")
                    object.assignedLid =
                        options.longs === String
                            ? String(message.assignedLid)
                            : message.assignedLid;
                else
                    object.assignedLid =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.assignedLid)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.assignedLid.low >>> 0,
                                    message.assignedLid.high >>> 0
                                ).toNumber(true)
                              : message.assignedLid;
                if (options.oneofs) object._assignedLid = "assignedLid";
            }
            if (message.latestLid != null && message.hasOwnProperty("latestLid")) {
                if (typeof message.latestLid === "number")
                    object.latestLid =
                        options.longs === String ? String(message.latestLid) : message.latestLid;
                else
                    object.latestLid =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.latestLid)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.latestLid.low >>> 0,
                                    message.latestLid.high >>> 0
                                ).toNumber(true)
                              : message.latestLid;
                if (options.oneofs) object._latestLid = "latestLid";
            }
            return object;
        };
        LIDMigrationMapping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        LIDMigrationMapping.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/LidMigrationSyncPayload.LIDMigrationMapping";
        };
        return LIDMigrationMapping;
    })();
    return LidMigrationSyncPayload;
})();
module.exports = $root;

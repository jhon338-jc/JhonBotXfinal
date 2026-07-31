"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.Reporting = (function () {
    var Reporting = {};
    Reporting.Field = (function () {
        function Field(properties) {
            this.subfield = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        Field.prototype.minVersion = null;
        Field.prototype.maxVersion = null;
        Field.prototype.notReportableMinVersion = null;
        Field.prototype.isMessage = null;
        Field.prototype.subfield = $util.emptyObject;
        var $oneOfFields;
        Object.defineProperty(Field.prototype, "_minVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["minVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Field.prototype, "_maxVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["maxVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Field.prototype, "_notReportableMinVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["notReportableMinVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Field.prototype, "_isMessage", {
            get: $util.oneOfGetter(($oneOfFields = ["isMessage"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Field.create = function create(properties) {
            return new Field(properties);
        };
        Field.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.minVersion != null && Object.hasOwnProperty.call(message, "minVersion"))
                writer.uint32(8).uint32(message.minVersion);
            if (message.maxVersion != null && Object.hasOwnProperty.call(message, "maxVersion"))
                writer.uint32(16).uint32(message.maxVersion);
            if (
                message.notReportableMinVersion != null &&
                Object.hasOwnProperty.call(message, "notReportableMinVersion")
            )
                writer.uint32(24).uint32(message.notReportableMinVersion);
            if (message.isMessage != null && Object.hasOwnProperty.call(message, "isMessage"))
                writer.uint32(32).bool(message.isMessage);
            if (message.subfield != null && Object.hasOwnProperty.call(message, "subfield"))
                for (var keys = Object.keys(message.subfield), i = 0; i < keys.length; ++i) {
                    writer.uint32(42).fork().uint32(8).uint32(keys[i]);
                    $root.Reporting.Field.encode(
                        message.subfield[keys[i]],
                        writer.uint32(18).fork()
                    )
                        .ldelim()
                        .ldelim();
                }
            return writer;
        };
        Field.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        Field.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Reporting.Field(),
                key,
                value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.minVersion = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.maxVersion = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.notReportableMinVersion = reader.uint32();
                        break;
                    }
                    case 4: {
                        message.isMessage = reader.bool();
                        break;
                    }
                    case 5: {
                        if (message.subfield === $util.emptyObject) message.subfield = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.uint32();
                                    break;
                                case 2:
                                    value = $root.Reporting.Field.decode(reader, reader.uint32());
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                            }
                        }
                        message.subfield[key] = value;
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        Field.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        Field.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.minVersion != null && message.hasOwnProperty("minVersion")) {
                properties._minVersion = 1;
                if (!$util.isInteger(message.minVersion)) return "minVersion: integer expected";
            }
            if (message.maxVersion != null && message.hasOwnProperty("maxVersion")) {
                properties._maxVersion = 1;
                if (!$util.isInteger(message.maxVersion)) return "maxVersion: integer expected";
            }
            if (
                message.notReportableMinVersion != null &&
                message.hasOwnProperty("notReportableMinVersion")
            ) {
                properties._notReportableMinVersion = 1;
                if (!$util.isInteger(message.notReportableMinVersion))
                    return "notReportableMinVersion: integer expected";
            }
            if (message.isMessage != null && message.hasOwnProperty("isMessage")) {
                properties._isMessage = 1;
                if (typeof message.isMessage !== "boolean") return "isMessage: boolean expected";
            }
            if (message.subfield != null && message.hasOwnProperty("subfield")) {
                if (!$util.isObject(message.subfield)) return "subfield: object expected";
                var key = Object.keys(message.subfield);
                for (var i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "subfield: integer key{k:uint32} expected";
                    {
                        var error = $root.Reporting.Field.verify(message.subfield[key[i]]);
                        if (error) return "subfield." + error;
                    }
                }
            }
            return null;
        };
        Field.fromObject = function fromObject(object) {
            if (object instanceof $root.Reporting.Field) return object;
            var message = new $root.Reporting.Field();
            if (object.minVersion != null) message.minVersion = object.minVersion >>> 0;
            if (object.maxVersion != null) message.maxVersion = object.maxVersion >>> 0;
            if (object.notReportableMinVersion != null)
                message.notReportableMinVersion = object.notReportableMinVersion >>> 0;
            if (object.isMessage != null) message.isMessage = Boolean(object.isMessage);
            if (object.subfield) {
                if (typeof object.subfield !== "object")
                    throw TypeError(".Reporting.Field.subfield: object expected");
                message.subfield = {};
                for (var keys = Object.keys(object.subfield), i = 0; i < keys.length; ++i) {
                    if (typeof object.subfield[keys[i]] !== "object")
                        throw TypeError(".Reporting.Field.subfield: object expected");
                    message.subfield[keys[i]] = $root.Reporting.Field.fromObject(
                        object.subfield[keys[i]]
                    );
                }
            }
            return message;
        };
        Field.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.objects || options.defaults) object.subfield = {};
            if (message.minVersion != null && message.hasOwnProperty("minVersion")) {
                object.minVersion = message.minVersion;
                if (options.oneofs) object._minVersion = "minVersion";
            }
            if (message.maxVersion != null && message.hasOwnProperty("maxVersion")) {
                object.maxVersion = message.maxVersion;
                if (options.oneofs) object._maxVersion = "maxVersion";
            }
            if (
                message.notReportableMinVersion != null &&
                message.hasOwnProperty("notReportableMinVersion")
            ) {
                object.notReportableMinVersion = message.notReportableMinVersion;
                if (options.oneofs) object._notReportableMinVersion = "notReportableMinVersion";
            }
            if (message.isMessage != null && message.hasOwnProperty("isMessage")) {
                object.isMessage = message.isMessage;
                if (options.oneofs) object._isMessage = "isMessage";
            }
            var keys2;
            if (message.subfield && (keys2 = Object.keys(message.subfield)).length) {
                object.subfield = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.subfield[keys2[j]] = $root.Reporting.Field.toObject(
                        message.subfield[keys2[j]],
                        options
                    );
            }
            return object;
        };
        Field.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        Field.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Reporting.Field";
        };
        return Field;
    })();
    Reporting.Config = (function () {
        function Config(properties) {
            this.field = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        Config.prototype.field = $util.emptyObject;
        Config.prototype.version = null;
        var $oneOfFields;
        Object.defineProperty(Config.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Config.create = function create(properties) {
            return new Config(properties);
        };
        Config.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                for (var keys = Object.keys(message.field), i = 0; i < keys.length; ++i) {
                    writer.uint32(10).fork().uint32(8).uint32(keys[i]);
                    $root.Reporting.Field.encode(message.field[keys[i]], writer.uint32(18).fork())
                        .ldelim()
                        .ldelim();
                }
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(16).uint32(message.version);
            return writer;
        };
        Config.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        Config.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Reporting.Config(),
                key,
                value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (message.field === $util.emptyObject) message.field = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.uint32();
                                    break;
                                case 2:
                                    value = $root.Reporting.Field.decode(reader, reader.uint32());
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                            }
                        }
                        message.field[key] = value;
                        break;
                    }
                    case 2: {
                        message.version = reader.uint32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        Config.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        Config.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.field != null && message.hasOwnProperty("field")) {
                if (!$util.isObject(message.field)) return "field: object expected";
                var key = Object.keys(message.field);
                for (var i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i])) return "field: integer key{k:uint32} expected";
                    {
                        var error = $root.Reporting.Field.verify(message.field[key[i]]);
                        if (error) return "field." + error;
                    }
                }
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                if (!$util.isInteger(message.version)) return "version: integer expected";
            }
            return null;
        };
        Config.fromObject = function fromObject(object) {
            if (object instanceof $root.Reporting.Config) return object;
            var message = new $root.Reporting.Config();
            if (object.field) {
                if (typeof object.field !== "object")
                    throw TypeError(".Reporting.Config.field: object expected");
                message.field = {};
                for (var keys = Object.keys(object.field), i = 0; i < keys.length; ++i) {
                    if (typeof object.field[keys[i]] !== "object")
                        throw TypeError(".Reporting.Config.field: object expected");
                    message.field[keys[i]] = $root.Reporting.Field.fromObject(
                        object.field[keys[i]]
                    );
                }
            }
            if (object.version != null) message.version = object.version >>> 0;
            return message;
        };
        Config.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.objects || options.defaults) object.field = {};
            var keys2;
            if (message.field && (keys2 = Object.keys(message.field)).length) {
                object.field = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.field[keys2[j]] = $root.Reporting.Field.toObject(
                        message.field[keys2[j]],
                        options
                    );
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = message.version;
                if (options.oneofs) object._version = "version";
            }
            return object;
        };
        Config.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        Config.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Reporting.Config";
        };
        return Config;
    })();
    Reporting.Reportable = (function () {
        function Reportable(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        Reportable.prototype.minVersion = null;
        Reportable.prototype.maxVersion = null;
        Reportable.prototype.notReportableMinVersion = null;
        Reportable.prototype.never = null;
        var $oneOfFields;
        Object.defineProperty(Reportable.prototype, "_minVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["minVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Reportable.prototype, "_maxVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["maxVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Reportable.prototype, "_notReportableMinVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["notReportableMinVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(Reportable.prototype, "_never", {
            get: $util.oneOfGetter(($oneOfFields = ["never"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Reportable.create = function create(properties) {
            return new Reportable(properties);
        };
        Reportable.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.minVersion != null && Object.hasOwnProperty.call(message, "minVersion"))
                writer.uint32(8).uint32(message.minVersion);
            if (message.maxVersion != null && Object.hasOwnProperty.call(message, "maxVersion"))
                writer.uint32(16).uint32(message.maxVersion);
            if (
                message.notReportableMinVersion != null &&
                Object.hasOwnProperty.call(message, "notReportableMinVersion")
            )
                writer.uint32(24).uint32(message.notReportableMinVersion);
            if (message.never != null && Object.hasOwnProperty.call(message, "never"))
                writer.uint32(32).bool(message.never);
            return writer;
        };
        Reportable.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        Reportable.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Reporting.Reportable();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.minVersion = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.maxVersion = reader.uint32();
                        break;
                    }
                    case 3: {
                        message.notReportableMinVersion = reader.uint32();
                        break;
                    }
                    case 4: {
                        message.never = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        Reportable.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        Reportable.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.minVersion != null && message.hasOwnProperty("minVersion")) {
                properties._minVersion = 1;
                if (!$util.isInteger(message.minVersion)) return "minVersion: integer expected";
            }
            if (message.maxVersion != null && message.hasOwnProperty("maxVersion")) {
                properties._maxVersion = 1;
                if (!$util.isInteger(message.maxVersion)) return "maxVersion: integer expected";
            }
            if (
                message.notReportableMinVersion != null &&
                message.hasOwnProperty("notReportableMinVersion")
            ) {
                properties._notReportableMinVersion = 1;
                if (!$util.isInteger(message.notReportableMinVersion))
                    return "notReportableMinVersion: integer expected";
            }
            if (message.never != null && message.hasOwnProperty("never")) {
                properties._never = 1;
                if (typeof message.never !== "boolean") return "never: boolean expected";
            }
            return null;
        };
        Reportable.fromObject = function fromObject(object) {
            if (object instanceof $root.Reporting.Reportable) return object;
            var message = new $root.Reporting.Reportable();
            if (object.minVersion != null) message.minVersion = object.minVersion >>> 0;
            if (object.maxVersion != null) message.maxVersion = object.maxVersion >>> 0;
            if (object.notReportableMinVersion != null)
                message.notReportableMinVersion = object.notReportableMinVersion >>> 0;
            if (object.never != null) message.never = Boolean(object.never);
            return message;
        };
        Reportable.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.minVersion != null && message.hasOwnProperty("minVersion")) {
                object.minVersion = message.minVersion;
                if (options.oneofs) object._minVersion = "minVersion";
            }
            if (message.maxVersion != null && message.hasOwnProperty("maxVersion")) {
                object.maxVersion = message.maxVersion;
                if (options.oneofs) object._maxVersion = "maxVersion";
            }
            if (
                message.notReportableMinVersion != null &&
                message.hasOwnProperty("notReportableMinVersion")
            ) {
                object.notReportableMinVersion = message.notReportableMinVersion;
                if (options.oneofs) object._notReportableMinVersion = "notReportableMinVersion";
            }
            if (message.never != null && message.hasOwnProperty("never")) {
                object.never = message.never;
                if (options.oneofs) object._never = "never";
            }
            return object;
        };
        Reportable.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        Reportable.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Reporting.Reportable";
        };
        return Reportable;
    })();
    return Reporting;
})();
module.exports = $root;

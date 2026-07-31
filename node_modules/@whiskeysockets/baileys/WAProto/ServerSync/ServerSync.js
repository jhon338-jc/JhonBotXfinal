"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.ServerSync = (function () {
    var ServerSync = {};
    ServerSync.SyncdPatch = (function () {
        function SyncdPatch(properties) {
            this.mutations = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdPatch.prototype.version = null;
        SyncdPatch.prototype.mutations = $util.emptyArray;
        SyncdPatch.prototype.externalMutations = null;
        SyncdPatch.prototype.snapshotMac = null;
        SyncdPatch.prototype.patchMac = null;
        SyncdPatch.prototype.keyId = null;
        SyncdPatch.prototype.exitCode = null;
        SyncdPatch.prototype.deviceIndex = null;
        SyncdPatch.prototype.clientDebugData = null;
        var $oneOfFields;
        Object.defineProperty(SyncdPatch.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_externalMutations", {
            get: $util.oneOfGetter(($oneOfFields = ["externalMutations"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_snapshotMac", {
            get: $util.oneOfGetter(($oneOfFields = ["snapshotMac"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_patchMac", {
            get: $util.oneOfGetter(($oneOfFields = ["patchMac"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_keyId", {
            get: $util.oneOfGetter(($oneOfFields = ["keyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_exitCode", {
            get: $util.oneOfGetter(($oneOfFields = ["exitCode"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_deviceIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["deviceIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdPatch.prototype, "_clientDebugData", {
            get: $util.oneOfGetter(($oneOfFields = ["clientDebugData"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdPatch.create = function create(properties) {
            return new SyncdPatch(properties);
        };
        SyncdPatch.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                $root.ServerSync.SyncdVersion.encode(
                    message.version,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.mutations != null && message.mutations.length)
                for (var i = 0; i < message.mutations.length; ++i)
                    $root.ServerSync.SyncdMutation.encode(
                        message.mutations[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            if (
                message.externalMutations != null &&
                Object.hasOwnProperty.call(message, "externalMutations")
            )
                $root.ServerSync.ExternalBlobReference.encode(
                    message.externalMutations,
                    writer.uint32(26).fork()
                ).ldelim();
            if (message.snapshotMac != null && Object.hasOwnProperty.call(message, "snapshotMac"))
                writer.uint32(34).bytes(message.snapshotMac);
            if (message.patchMac != null && Object.hasOwnProperty.call(message, "patchMac"))
                writer.uint32(42).bytes(message.patchMac);
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                $root.ServerSync.KeyId.encode(message.keyId, writer.uint32(50).fork()).ldelim();
            if (message.exitCode != null && Object.hasOwnProperty.call(message, "exitCode"))
                $root.ServerSync.ExitCode.encode(
                    message.exitCode,
                    writer.uint32(58).fork()
                ).ldelim();
            if (message.deviceIndex != null && Object.hasOwnProperty.call(message, "deviceIndex"))
                writer.uint32(64).uint32(message.deviceIndex);
            if (
                message.clientDebugData != null &&
                Object.hasOwnProperty.call(message, "clientDebugData")
            )
                writer.uint32(74).bytes(message.clientDebugData);
            return writer;
        };
        SyncdPatch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdPatch.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdPatch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.version = $root.ServerSync.SyncdVersion.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        if (!(message.mutations && message.mutations.length))
                            message.mutations = [];
                        message.mutations.push(
                            $root.ServerSync.SyncdMutation.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 3: {
                        message.externalMutations = $root.ServerSync.ExternalBlobReference.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 4: {
                        message.snapshotMac = reader.bytes();
                        break;
                    }
                    case 5: {
                        message.patchMac = reader.bytes();
                        break;
                    }
                    case 6: {
                        message.keyId = $root.ServerSync.KeyId.decode(reader, reader.uint32());
                        break;
                    }
                    case 7: {
                        message.exitCode = $root.ServerSync.ExitCode.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 8: {
                        message.deviceIndex = reader.uint32();
                        break;
                    }
                    case 9: {
                        message.clientDebugData = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdPatch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdPatch.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                {
                    var error = $root.ServerSync.SyncdVersion.verify(message.version);
                    if (error) return "version." + error;
                }
            }
            if (message.mutations != null && message.hasOwnProperty("mutations")) {
                if (!Array.isArray(message.mutations)) return "mutations: array expected";
                for (var i = 0; i < message.mutations.length; ++i) {
                    var error = $root.ServerSync.SyncdMutation.verify(message.mutations[i]);
                    if (error) return "mutations." + error;
                }
            }
            if (message.externalMutations != null && message.hasOwnProperty("externalMutations")) {
                properties._externalMutations = 1;
                {
                    var error = $root.ServerSync.ExternalBlobReference.verify(
                        message.externalMutations
                    );
                    if (error) return "externalMutations." + error;
                }
            }
            if (message.snapshotMac != null && message.hasOwnProperty("snapshotMac")) {
                properties._snapshotMac = 1;
                if (
                    !(
                        (message.snapshotMac && typeof message.snapshotMac.length === "number") ||
                        $util.isString(message.snapshotMac)
                    )
                )
                    return "snapshotMac: buffer expected";
            }
            if (message.patchMac != null && message.hasOwnProperty("patchMac")) {
                properties._patchMac = 1;
                if (
                    !(
                        (message.patchMac && typeof message.patchMac.length === "number") ||
                        $util.isString(message.patchMac)
                    )
                )
                    return "patchMac: buffer expected";
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                properties._keyId = 1;
                {
                    var error = $root.ServerSync.KeyId.verify(message.keyId);
                    if (error) return "keyId." + error;
                }
            }
            if (message.exitCode != null && message.hasOwnProperty("exitCode")) {
                properties._exitCode = 1;
                {
                    var error = $root.ServerSync.ExitCode.verify(message.exitCode);
                    if (error) return "exitCode." + error;
                }
            }
            if (message.deviceIndex != null && message.hasOwnProperty("deviceIndex")) {
                properties._deviceIndex = 1;
                if (!$util.isInteger(message.deviceIndex)) return "deviceIndex: integer expected";
            }
            if (message.clientDebugData != null && message.hasOwnProperty("clientDebugData")) {
                properties._clientDebugData = 1;
                if (
                    !(
                        (message.clientDebugData &&
                            typeof message.clientDebugData.length === "number") ||
                        $util.isString(message.clientDebugData)
                    )
                )
                    return "clientDebugData: buffer expected";
            }
            return null;
        };
        SyncdPatch.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdPatch) return object;
            var message = new $root.ServerSync.SyncdPatch();
            if (object.version != null) {
                if (typeof object.version !== "object")
                    throw TypeError(".ServerSync.SyncdPatch.version: object expected");
                message.version = $root.ServerSync.SyncdVersion.fromObject(object.version);
            }
            if (object.mutations) {
                if (!Array.isArray(object.mutations))
                    throw TypeError(".ServerSync.SyncdPatch.mutations: array expected");
                message.mutations = [];
                for (var i = 0; i < object.mutations.length; ++i) {
                    if (typeof object.mutations[i] !== "object")
                        throw TypeError(".ServerSync.SyncdPatch.mutations: object expected");
                    message.mutations[i] = $root.ServerSync.SyncdMutation.fromObject(
                        object.mutations[i]
                    );
                }
            }
            if (object.externalMutations != null) {
                if (typeof object.externalMutations !== "object")
                    throw TypeError(".ServerSync.SyncdPatch.externalMutations: object expected");
                message.externalMutations = $root.ServerSync.ExternalBlobReference.fromObject(
                    object.externalMutations
                );
            }
            if (object.snapshotMac != null)
                if (typeof object.snapshotMac === "string")
                    $util.base64.decode(
                        object.snapshotMac,
                        (message.snapshotMac = $util.newBuffer(
                            $util.base64.length(object.snapshotMac)
                        )),
                        0
                    );
                else if (object.snapshotMac.length >= 0) message.snapshotMac = object.snapshotMac;
            if (object.patchMac != null)
                if (typeof object.patchMac === "string")
                    $util.base64.decode(
                        object.patchMac,
                        (message.patchMac = $util.newBuffer($util.base64.length(object.patchMac))),
                        0
                    );
                else if (object.patchMac.length >= 0) message.patchMac = object.patchMac;
            if (object.keyId != null) {
                if (typeof object.keyId !== "object")
                    throw TypeError(".ServerSync.SyncdPatch.keyId: object expected");
                message.keyId = $root.ServerSync.KeyId.fromObject(object.keyId);
            }
            if (object.exitCode != null) {
                if (typeof object.exitCode !== "object")
                    throw TypeError(".ServerSync.SyncdPatch.exitCode: object expected");
                message.exitCode = $root.ServerSync.ExitCode.fromObject(object.exitCode);
            }
            if (object.deviceIndex != null) message.deviceIndex = object.deviceIndex >>> 0;
            if (object.clientDebugData != null)
                if (typeof object.clientDebugData === "string")
                    $util.base64.decode(
                        object.clientDebugData,
                        (message.clientDebugData = $util.newBuffer(
                            $util.base64.length(object.clientDebugData)
                        )),
                        0
                    );
                else if (object.clientDebugData.length >= 0)
                    message.clientDebugData = object.clientDebugData;
            return message;
        };
        SyncdPatch.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.mutations = [];
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = $root.ServerSync.SyncdVersion.toObject(message.version, options);
                if (options.oneofs) object._version = "version";
            }
            if (message.mutations && message.mutations.length) {
                object.mutations = [];
                for (var j = 0; j < message.mutations.length; ++j)
                    object.mutations[j] = $root.ServerSync.SyncdMutation.toObject(
                        message.mutations[j],
                        options
                    );
            }
            if (message.externalMutations != null && message.hasOwnProperty("externalMutations")) {
                object.externalMutations = $root.ServerSync.ExternalBlobReference.toObject(
                    message.externalMutations,
                    options
                );
                if (options.oneofs) object._externalMutations = "externalMutations";
            }
            if (message.snapshotMac != null && message.hasOwnProperty("snapshotMac")) {
                object.snapshotMac =
                    options.bytes === String
                        ? $util.base64.encode(message.snapshotMac, 0, message.snapshotMac.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.snapshotMac)
                          : message.snapshotMac;
                if (options.oneofs) object._snapshotMac = "snapshotMac";
            }
            if (message.patchMac != null && message.hasOwnProperty("patchMac")) {
                object.patchMac =
                    options.bytes === String
                        ? $util.base64.encode(message.patchMac, 0, message.patchMac.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.patchMac)
                          : message.patchMac;
                if (options.oneofs) object._patchMac = "patchMac";
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                object.keyId = $root.ServerSync.KeyId.toObject(message.keyId, options);
                if (options.oneofs) object._keyId = "keyId";
            }
            if (message.exitCode != null && message.hasOwnProperty("exitCode")) {
                object.exitCode = $root.ServerSync.ExitCode.toObject(message.exitCode, options);
                if (options.oneofs) object._exitCode = "exitCode";
            }
            if (message.deviceIndex != null && message.hasOwnProperty("deviceIndex")) {
                object.deviceIndex = message.deviceIndex;
                if (options.oneofs) object._deviceIndex = "deviceIndex";
            }
            if (message.clientDebugData != null && message.hasOwnProperty("clientDebugData")) {
                object.clientDebugData =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.clientDebugData,
                              0,
                              message.clientDebugData.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.clientDebugData)
                          : message.clientDebugData;
                if (options.oneofs) object._clientDebugData = "clientDebugData";
            }
            return object;
        };
        SyncdPatch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdPatch.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdPatch";
        };
        return SyncdPatch;
    })();
    ServerSync.SyncdMutation = (function () {
        function SyncdMutation(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdMutation.prototype.operation = null;
        SyncdMutation.prototype.record = null;
        var $oneOfFields;
        Object.defineProperty(SyncdMutation.prototype, "_operation", {
            get: $util.oneOfGetter(($oneOfFields = ["operation"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdMutation.prototype, "_record", {
            get: $util.oneOfGetter(($oneOfFields = ["record"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdMutation.create = function create(properties) {
            return new SyncdMutation(properties);
        };
        SyncdMutation.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.operation != null && Object.hasOwnProperty.call(message, "operation"))
                writer.uint32(8).int32(message.operation);
            if (message.record != null && Object.hasOwnProperty.call(message, "record"))
                $root.ServerSync.SyncdRecord.encode(
                    message.record,
                    writer.uint32(18).fork()
                ).ldelim();
            return writer;
        };
        SyncdMutation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdMutation.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdMutation();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.operation = reader.int32();
                        break;
                    }
                    case 2: {
                        message.record = $root.ServerSync.SyncdRecord.decode(
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
        SyncdMutation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdMutation.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.operation != null && message.hasOwnProperty("operation")) {
                properties._operation = 1;
                switch (message.operation) {
                    default:
                        return "operation: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.record != null && message.hasOwnProperty("record")) {
                properties._record = 1;
                {
                    var error = $root.ServerSync.SyncdRecord.verify(message.record);
                    if (error) return "record." + error;
                }
            }
            return null;
        };
        SyncdMutation.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdMutation) return object;
            var message = new $root.ServerSync.SyncdMutation();
            switch (object.operation) {
                default:
                    if (typeof object.operation === "number") {
                        message.operation = object.operation;
                        break;
                    }
                    break;
                case "SET":
                case 0:
                    message.operation = 0;
                    break;
                case "REMOVE":
                case 1:
                    message.operation = 1;
                    break;
            }
            if (object.record != null) {
                if (typeof object.record !== "object")
                    throw TypeError(".ServerSync.SyncdMutation.record: object expected");
                message.record = $root.ServerSync.SyncdRecord.fromObject(object.record);
            }
            return message;
        };
        SyncdMutation.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.operation != null && message.hasOwnProperty("operation")) {
                object.operation =
                    options.enums === String
                        ? $root.ServerSync.SyncdMutation.SyncdOperation[message.operation] ===
                          undefined
                            ? message.operation
                            : $root.ServerSync.SyncdMutation.SyncdOperation[message.operation]
                        : message.operation;
                if (options.oneofs) object._operation = "operation";
            }
            if (message.record != null && message.hasOwnProperty("record")) {
                object.record = $root.ServerSync.SyncdRecord.toObject(message.record, options);
                if (options.oneofs) object._record = "record";
            }
            return object;
        };
        SyncdMutation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdMutation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdMutation";
        };
        SyncdMutation.SyncdOperation = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "SET")] = 0;
            values[(valuesById[1] = "REMOVE")] = 1;
            return values;
        })();
        return SyncdMutation;
    })();
    ServerSync.SyncdMutations = (function () {
        function SyncdMutations(properties) {
            this.mutations = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdMutations.prototype.mutations = $util.emptyArray;
        SyncdMutations.create = function create(properties) {
            return new SyncdMutations(properties);
        };
        SyncdMutations.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.mutations != null && message.mutations.length)
                for (var i = 0; i < message.mutations.length; ++i)
                    $root.ServerSync.SyncdMutation.encode(
                        message.mutations[i],
                        writer.uint32(10).fork()
                    ).ldelim();
            return writer;
        };
        SyncdMutations.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdMutations.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdMutations();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.mutations && message.mutations.length))
                            message.mutations = [];
                        message.mutations.push(
                            $root.ServerSync.SyncdMutation.decode(reader, reader.uint32())
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
        SyncdMutations.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdMutations.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            if (message.mutations != null && message.hasOwnProperty("mutations")) {
                if (!Array.isArray(message.mutations)) return "mutations: array expected";
                for (var i = 0; i < message.mutations.length; ++i) {
                    var error = $root.ServerSync.SyncdMutation.verify(message.mutations[i]);
                    if (error) return "mutations." + error;
                }
            }
            return null;
        };
        SyncdMutations.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdMutations) return object;
            var message = new $root.ServerSync.SyncdMutations();
            if (object.mutations) {
                if (!Array.isArray(object.mutations))
                    throw TypeError(".ServerSync.SyncdMutations.mutations: array expected");
                message.mutations = [];
                for (var i = 0; i < object.mutations.length; ++i) {
                    if (typeof object.mutations[i] !== "object")
                        throw TypeError(".ServerSync.SyncdMutations.mutations: object expected");
                    message.mutations[i] = $root.ServerSync.SyncdMutation.fromObject(
                        object.mutations[i]
                    );
                }
            }
            return message;
        };
        SyncdMutations.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.mutations = [];
            if (message.mutations && message.mutations.length) {
                object.mutations = [];
                for (var j = 0; j < message.mutations.length; ++j)
                    object.mutations[j] = $root.ServerSync.SyncdMutation.toObject(
                        message.mutations[j],
                        options
                    );
            }
            return object;
        };
        SyncdMutations.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdMutations.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdMutations";
        };
        return SyncdMutations;
    })();
    ServerSync.SyncdSnapshot = (function () {
        function SyncdSnapshot(properties) {
            this.records = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdSnapshot.prototype.version = null;
        SyncdSnapshot.prototype.records = $util.emptyArray;
        SyncdSnapshot.prototype.mac = null;
        SyncdSnapshot.prototype.keyId = null;
        var $oneOfFields;
        Object.defineProperty(SyncdSnapshot.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdSnapshot.prototype, "_mac", {
            get: $util.oneOfGetter(($oneOfFields = ["mac"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdSnapshot.prototype, "_keyId", {
            get: $util.oneOfGetter(($oneOfFields = ["keyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdSnapshot.create = function create(properties) {
            return new SyncdSnapshot(properties);
        };
        SyncdSnapshot.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                $root.ServerSync.SyncdVersion.encode(
                    message.version,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.records != null && message.records.length)
                for (var i = 0; i < message.records.length; ++i)
                    $root.ServerSync.SyncdRecord.encode(
                        message.records[i],
                        writer.uint32(18).fork()
                    ).ldelim();
            if (message.mac != null && Object.hasOwnProperty.call(message, "mac"))
                writer.uint32(26).bytes(message.mac);
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                $root.ServerSync.KeyId.encode(message.keyId, writer.uint32(34).fork()).ldelim();
            return writer;
        };
        SyncdSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdSnapshot.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdSnapshot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.version = $root.ServerSync.SyncdVersion.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        if (!(message.records && message.records.length)) message.records = [];
                        message.records.push(
                            $root.ServerSync.SyncdRecord.decode(reader, reader.uint32())
                        );
                        break;
                    }
                    case 3: {
                        message.mac = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.keyId = $root.ServerSync.KeyId.decode(reader, reader.uint32());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdSnapshot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdSnapshot.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                {
                    var error = $root.ServerSync.SyncdVersion.verify(message.version);
                    if (error) return "version." + error;
                }
            }
            if (message.records != null && message.hasOwnProperty("records")) {
                if (!Array.isArray(message.records)) return "records: array expected";
                for (var i = 0; i < message.records.length; ++i) {
                    var error = $root.ServerSync.SyncdRecord.verify(message.records[i]);
                    if (error) return "records." + error;
                }
            }
            if (message.mac != null && message.hasOwnProperty("mac")) {
                properties._mac = 1;
                if (
                    !(
                        (message.mac && typeof message.mac.length === "number") ||
                        $util.isString(message.mac)
                    )
                )
                    return "mac: buffer expected";
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                properties._keyId = 1;
                {
                    var error = $root.ServerSync.KeyId.verify(message.keyId);
                    if (error) return "keyId." + error;
                }
            }
            return null;
        };
        SyncdSnapshot.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdSnapshot) return object;
            var message = new $root.ServerSync.SyncdSnapshot();
            if (object.version != null) {
                if (typeof object.version !== "object")
                    throw TypeError(".ServerSync.SyncdSnapshot.version: object expected");
                message.version = $root.ServerSync.SyncdVersion.fromObject(object.version);
            }
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".ServerSync.SyncdSnapshot.records: array expected");
                message.records = [];
                for (var i = 0; i < object.records.length; ++i) {
                    if (typeof object.records[i] !== "object")
                        throw TypeError(".ServerSync.SyncdSnapshot.records: object expected");
                    message.records[i] = $root.ServerSync.SyncdRecord.fromObject(object.records[i]);
                }
            }
            if (object.mac != null)
                if (typeof object.mac === "string")
                    $util.base64.decode(
                        object.mac,
                        (message.mac = $util.newBuffer($util.base64.length(object.mac))),
                        0
                    );
                else if (object.mac.length >= 0) message.mac = object.mac;
            if (object.keyId != null) {
                if (typeof object.keyId !== "object")
                    throw TypeError(".ServerSync.SyncdSnapshot.keyId: object expected");
                message.keyId = $root.ServerSync.KeyId.fromObject(object.keyId);
            }
            return message;
        };
        SyncdSnapshot.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.records = [];
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = $root.ServerSync.SyncdVersion.toObject(message.version, options);
                if (options.oneofs) object._version = "version";
            }
            if (message.records && message.records.length) {
                object.records = [];
                for (var j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.ServerSync.SyncdRecord.toObject(
                        message.records[j],
                        options
                    );
            }
            if (message.mac != null && message.hasOwnProperty("mac")) {
                object.mac =
                    options.bytes === String
                        ? $util.base64.encode(message.mac, 0, message.mac.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.mac)
                          : message.mac;
                if (options.oneofs) object._mac = "mac";
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                object.keyId = $root.ServerSync.KeyId.toObject(message.keyId, options);
                if (options.oneofs) object._keyId = "keyId";
            }
            return object;
        };
        SyncdSnapshot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdSnapshot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdSnapshot";
        };
        return SyncdSnapshot;
    })();
    ServerSync.ExternalBlobReference = (function () {
        function ExternalBlobReference(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ExternalBlobReference.prototype.mediaKey = null;
        ExternalBlobReference.prototype.directPath = null;
        ExternalBlobReference.prototype.handle = null;
        ExternalBlobReference.prototype.fileSizeBytes = null;
        ExternalBlobReference.prototype.fileSha256 = null;
        ExternalBlobReference.prototype.fileEncSha256 = null;
        var $oneOfFields;
        Object.defineProperty(ExternalBlobReference.prototype, "_mediaKey", {
            get: $util.oneOfGetter(($oneOfFields = ["mediaKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExternalBlobReference.prototype, "_directPath", {
            get: $util.oneOfGetter(($oneOfFields = ["directPath"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExternalBlobReference.prototype, "_handle", {
            get: $util.oneOfGetter(($oneOfFields = ["handle"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExternalBlobReference.prototype, "_fileSizeBytes", {
            get: $util.oneOfGetter(($oneOfFields = ["fileSizeBytes"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExternalBlobReference.prototype, "_fileSha256", {
            get: $util.oneOfGetter(($oneOfFields = ["fileSha256"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExternalBlobReference.prototype, "_fileEncSha256", {
            get: $util.oneOfGetter(($oneOfFields = ["fileEncSha256"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ExternalBlobReference.create = function create(properties) {
            return new ExternalBlobReference(properties);
        };
        ExternalBlobReference.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.mediaKey != null && Object.hasOwnProperty.call(message, "mediaKey"))
                writer.uint32(10).bytes(message.mediaKey);
            if (message.directPath != null && Object.hasOwnProperty.call(message, "directPath"))
                writer.uint32(18).string(message.directPath);
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(26).string(message.handle);
            if (
                message.fileSizeBytes != null &&
                Object.hasOwnProperty.call(message, "fileSizeBytes")
            )
                writer.uint32(32).uint64(message.fileSizeBytes);
            if (message.fileSha256 != null && Object.hasOwnProperty.call(message, "fileSha256"))
                writer.uint32(42).bytes(message.fileSha256);
            if (
                message.fileEncSha256 != null &&
                Object.hasOwnProperty.call(message, "fileEncSha256")
            )
                writer.uint32(50).bytes(message.fileEncSha256);
            return writer;
        };
        ExternalBlobReference.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ExternalBlobReference.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.ExternalBlobReference();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.mediaKey = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.directPath = reader.string();
                        break;
                    }
                    case 3: {
                        message.handle = reader.string();
                        break;
                    }
                    case 4: {
                        message.fileSizeBytes = reader.uint64();
                        break;
                    }
                    case 5: {
                        message.fileSha256 = reader.bytes();
                        break;
                    }
                    case 6: {
                        message.fileEncSha256 = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ExternalBlobReference.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ExternalBlobReference.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.mediaKey != null && message.hasOwnProperty("mediaKey")) {
                properties._mediaKey = 1;
                if (
                    !(
                        (message.mediaKey && typeof message.mediaKey.length === "number") ||
                        $util.isString(message.mediaKey)
                    )
                )
                    return "mediaKey: buffer expected";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                properties._directPath = 1;
                if (!$util.isString(message.directPath)) return "directPath: string expected";
            }
            if (message.handle != null && message.hasOwnProperty("handle")) {
                properties._handle = 1;
                if (!$util.isString(message.handle)) return "handle: string expected";
            }
            if (message.fileSizeBytes != null && message.hasOwnProperty("fileSizeBytes")) {
                properties._fileSizeBytes = 1;
                if (
                    !$util.isInteger(message.fileSizeBytes) &&
                    !(
                        message.fileSizeBytes &&
                        $util.isInteger(message.fileSizeBytes.low) &&
                        $util.isInteger(message.fileSizeBytes.high)
                    )
                )
                    return "fileSizeBytes: integer|Long expected";
            }
            if (message.fileSha256 != null && message.hasOwnProperty("fileSha256")) {
                properties._fileSha256 = 1;
                if (
                    !(
                        (message.fileSha256 && typeof message.fileSha256.length === "number") ||
                        $util.isString(message.fileSha256)
                    )
                )
                    return "fileSha256: buffer expected";
            }
            if (message.fileEncSha256 != null && message.hasOwnProperty("fileEncSha256")) {
                properties._fileEncSha256 = 1;
                if (
                    !(
                        (message.fileEncSha256 &&
                            typeof message.fileEncSha256.length === "number") ||
                        $util.isString(message.fileEncSha256)
                    )
                )
                    return "fileEncSha256: buffer expected";
            }
            return null;
        };
        ExternalBlobReference.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.ExternalBlobReference) return object;
            var message = new $root.ServerSync.ExternalBlobReference();
            if (object.mediaKey != null)
                if (typeof object.mediaKey === "string")
                    $util.base64.decode(
                        object.mediaKey,
                        (message.mediaKey = $util.newBuffer($util.base64.length(object.mediaKey))),
                        0
                    );
                else if (object.mediaKey.length >= 0) message.mediaKey = object.mediaKey;
            if (object.directPath != null) message.directPath = String(object.directPath);
            if (object.handle != null) message.handle = String(object.handle);
            if (object.fileSizeBytes != null)
                if ($util.Long)
                    (message.fileSizeBytes = $util.Long.fromValue(object.fileSizeBytes)).unsigned =
                        true;
                else if (typeof object.fileSizeBytes === "string")
                    message.fileSizeBytes = parseInt(object.fileSizeBytes, 10);
                else if (typeof object.fileSizeBytes === "number")
                    message.fileSizeBytes = object.fileSizeBytes;
                else if (typeof object.fileSizeBytes === "object")
                    message.fileSizeBytes = new $util.LongBits(
                        object.fileSizeBytes.low >>> 0,
                        object.fileSizeBytes.high >>> 0
                    ).toNumber(true);
            if (object.fileSha256 != null)
                if (typeof object.fileSha256 === "string")
                    $util.base64.decode(
                        object.fileSha256,
                        (message.fileSha256 = $util.newBuffer(
                            $util.base64.length(object.fileSha256)
                        )),
                        0
                    );
                else if (object.fileSha256.length >= 0) message.fileSha256 = object.fileSha256;
            if (object.fileEncSha256 != null)
                if (typeof object.fileEncSha256 === "string")
                    $util.base64.decode(
                        object.fileEncSha256,
                        (message.fileEncSha256 = $util.newBuffer(
                            $util.base64.length(object.fileEncSha256)
                        )),
                        0
                    );
                else if (object.fileEncSha256.length >= 0)
                    message.fileEncSha256 = object.fileEncSha256;
            return message;
        };
        ExternalBlobReference.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.mediaKey != null && message.hasOwnProperty("mediaKey")) {
                object.mediaKey =
                    options.bytes === String
                        ? $util.base64.encode(message.mediaKey, 0, message.mediaKey.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.mediaKey)
                          : message.mediaKey;
                if (options.oneofs) object._mediaKey = "mediaKey";
            }
            if (message.directPath != null && message.hasOwnProperty("directPath")) {
                object.directPath = message.directPath;
                if (options.oneofs) object._directPath = "directPath";
            }
            if (message.handle != null && message.hasOwnProperty("handle")) {
                object.handle = message.handle;
                if (options.oneofs) object._handle = "handle";
            }
            if (message.fileSizeBytes != null && message.hasOwnProperty("fileSizeBytes")) {
                if (typeof message.fileSizeBytes === "number")
                    object.fileSizeBytes =
                        options.longs === String
                            ? String(message.fileSizeBytes)
                            : message.fileSizeBytes;
                else
                    object.fileSizeBytes =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.fileSizeBytes)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.fileSizeBytes.low >>> 0,
                                    message.fileSizeBytes.high >>> 0
                                ).toNumber(true)
                              : message.fileSizeBytes;
                if (options.oneofs) object._fileSizeBytes = "fileSizeBytes";
            }
            if (message.fileSha256 != null && message.hasOwnProperty("fileSha256")) {
                object.fileSha256 =
                    options.bytes === String
                        ? $util.base64.encode(message.fileSha256, 0, message.fileSha256.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.fileSha256)
                          : message.fileSha256;
                if (options.oneofs) object._fileSha256 = "fileSha256";
            }
            if (message.fileEncSha256 != null && message.hasOwnProperty("fileEncSha256")) {
                object.fileEncSha256 =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.fileEncSha256,
                              0,
                              message.fileEncSha256.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.fileEncSha256)
                          : message.fileEncSha256;
                if (options.oneofs) object._fileEncSha256 = "fileEncSha256";
            }
            return object;
        };
        ExternalBlobReference.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ExternalBlobReference.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.ExternalBlobReference";
        };
        return ExternalBlobReference;
    })();
    ServerSync.SyncdRecord = (function () {
        function SyncdRecord(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdRecord.prototype.index = null;
        SyncdRecord.prototype.value = null;
        SyncdRecord.prototype.keyId = null;
        var $oneOfFields;
        Object.defineProperty(SyncdRecord.prototype, "_index", {
            get: $util.oneOfGetter(($oneOfFields = ["index"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdRecord.prototype, "_value", {
            get: $util.oneOfGetter(($oneOfFields = ["value"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncdRecord.prototype, "_keyId", {
            get: $util.oneOfGetter(($oneOfFields = ["keyId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdRecord.create = function create(properties) {
            return new SyncdRecord(properties);
        };
        SyncdRecord.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                $root.ServerSync.SyncdIndex.encode(
                    message.index,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                $root.ServerSync.SyncdValue.encode(
                    message.value,
                    writer.uint32(18).fork()
                ).ldelim();
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                $root.ServerSync.KeyId.encode(message.keyId, writer.uint32(26).fork()).ldelim();
            return writer;
        };
        SyncdRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdRecord.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdRecord();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.index = $root.ServerSync.SyncdIndex.decode(reader, reader.uint32());
                        break;
                    }
                    case 2: {
                        message.value = $root.ServerSync.SyncdValue.decode(reader, reader.uint32());
                        break;
                    }
                    case 3: {
                        message.keyId = $root.ServerSync.KeyId.decode(reader, reader.uint32());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.index != null && message.hasOwnProperty("index")) {
                properties._index = 1;
                {
                    var error = $root.ServerSync.SyncdIndex.verify(message.index);
                    if (error) return "index." + error;
                }
            }
            if (message.value != null && message.hasOwnProperty("value")) {
                properties._value = 1;
                {
                    var error = $root.ServerSync.SyncdValue.verify(message.value);
                    if (error) return "value." + error;
                }
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                properties._keyId = 1;
                {
                    var error = $root.ServerSync.KeyId.verify(message.keyId);
                    if (error) return "keyId." + error;
                }
            }
            return null;
        };
        SyncdRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdRecord) return object;
            var message = new $root.ServerSync.SyncdRecord();
            if (object.index != null) {
                if (typeof object.index !== "object")
                    throw TypeError(".ServerSync.SyncdRecord.index: object expected");
                message.index = $root.ServerSync.SyncdIndex.fromObject(object.index);
            }
            if (object.value != null) {
                if (typeof object.value !== "object")
                    throw TypeError(".ServerSync.SyncdRecord.value: object expected");
                message.value = $root.ServerSync.SyncdValue.fromObject(object.value);
            }
            if (object.keyId != null) {
                if (typeof object.keyId !== "object")
                    throw TypeError(".ServerSync.SyncdRecord.keyId: object expected");
                message.keyId = $root.ServerSync.KeyId.fromObject(object.keyId);
            }
            return message;
        };
        SyncdRecord.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.index != null && message.hasOwnProperty("index")) {
                object.index = $root.ServerSync.SyncdIndex.toObject(message.index, options);
                if (options.oneofs) object._index = "index";
            }
            if (message.value != null && message.hasOwnProperty("value")) {
                object.value = $root.ServerSync.SyncdValue.toObject(message.value, options);
                if (options.oneofs) object._value = "value";
            }
            if (message.keyId != null && message.hasOwnProperty("keyId")) {
                object.keyId = $root.ServerSync.KeyId.toObject(message.keyId, options);
                if (options.oneofs) object._keyId = "keyId";
            }
            return object;
        };
        SyncdRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdRecord";
        };
        return SyncdRecord;
    })();
    ServerSync.KeyId = (function () {
        function KeyId(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        KeyId.prototype.id = null;
        var $oneOfFields;
        Object.defineProperty(KeyId.prototype, "_id", {
            get: $util.oneOfGetter(($oneOfFields = ["id"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        KeyId.create = function create(properties) {
            return new KeyId(properties);
        };
        KeyId.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(10).bytes(message.id);
            return writer;
        };
        KeyId.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        KeyId.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.KeyId();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.id = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        KeyId.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        KeyId.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                properties._id = 1;
                if (
                    !(
                        (message.id && typeof message.id.length === "number") ||
                        $util.isString(message.id)
                    )
                )
                    return "id: buffer expected";
            }
            return null;
        };
        KeyId.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.KeyId) return object;
            var message = new $root.ServerSync.KeyId();
            if (object.id != null)
                if (typeof object.id === "string")
                    $util.base64.decode(
                        object.id,
                        (message.id = $util.newBuffer($util.base64.length(object.id))),
                        0
                    );
                else if (object.id.length >= 0) message.id = object.id;
            return message;
        };
        KeyId.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.id != null && message.hasOwnProperty("id")) {
                object.id =
                    options.bytes === String
                        ? $util.base64.encode(message.id, 0, message.id.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.id)
                          : message.id;
                if (options.oneofs) object._id = "id";
            }
            return object;
        };
        KeyId.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        KeyId.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.KeyId";
        };
        return KeyId;
    })();
    ServerSync.SyncdValue = (function () {
        function SyncdValue(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdValue.prototype.blob = null;
        var $oneOfFields;
        Object.defineProperty(SyncdValue.prototype, "_blob", {
            get: $util.oneOfGetter(($oneOfFields = ["blob"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdValue.create = function create(properties) {
            return new SyncdValue(properties);
        };
        SyncdValue.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.blob != null && Object.hasOwnProperty.call(message, "blob"))
                writer.uint32(10).bytes(message.blob);
            return writer;
        };
        SyncdValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdValue.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdValue();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.blob = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdValue.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.blob != null && message.hasOwnProperty("blob")) {
                properties._blob = 1;
                if (
                    !(
                        (message.blob && typeof message.blob.length === "number") ||
                        $util.isString(message.blob)
                    )
                )
                    return "blob: buffer expected";
            }
            return null;
        };
        SyncdValue.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdValue) return object;
            var message = new $root.ServerSync.SyncdValue();
            if (object.blob != null)
                if (typeof object.blob === "string")
                    $util.base64.decode(
                        object.blob,
                        (message.blob = $util.newBuffer($util.base64.length(object.blob))),
                        0
                    );
                else if (object.blob.length >= 0) message.blob = object.blob;
            return message;
        };
        SyncdValue.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.blob != null && message.hasOwnProperty("blob")) {
                object.blob =
                    options.bytes === String
                        ? $util.base64.encode(message.blob, 0, message.blob.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.blob)
                          : message.blob;
                if (options.oneofs) object._blob = "blob";
            }
            return object;
        };
        SyncdValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdValue";
        };
        return SyncdValue;
    })();
    ServerSync.SyncdIndex = (function () {
        function SyncdIndex(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdIndex.prototype.blob = null;
        var $oneOfFields;
        Object.defineProperty(SyncdIndex.prototype, "_blob", {
            get: $util.oneOfGetter(($oneOfFields = ["blob"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdIndex.create = function create(properties) {
            return new SyncdIndex(properties);
        };
        SyncdIndex.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.blob != null && Object.hasOwnProperty.call(message, "blob"))
                writer.uint32(10).bytes(message.blob);
            return writer;
        };
        SyncdIndex.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdIndex.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdIndex();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.blob = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdIndex.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdIndex.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.blob != null && message.hasOwnProperty("blob")) {
                properties._blob = 1;
                if (
                    !(
                        (message.blob && typeof message.blob.length === "number") ||
                        $util.isString(message.blob)
                    )
                )
                    return "blob: buffer expected";
            }
            return null;
        };
        SyncdIndex.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdIndex) return object;
            var message = new $root.ServerSync.SyncdIndex();
            if (object.blob != null)
                if (typeof object.blob === "string")
                    $util.base64.decode(
                        object.blob,
                        (message.blob = $util.newBuffer($util.base64.length(object.blob))),
                        0
                    );
                else if (object.blob.length >= 0) message.blob = object.blob;
            return message;
        };
        SyncdIndex.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.blob != null && message.hasOwnProperty("blob")) {
                object.blob =
                    options.bytes === String
                        ? $util.base64.encode(message.blob, 0, message.blob.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.blob)
                          : message.blob;
                if (options.oneofs) object._blob = "blob";
            }
            return object;
        };
        SyncdIndex.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdIndex.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdIndex";
        };
        return SyncdIndex;
    })();
    ServerSync.ExitCode = (function () {
        function ExitCode(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ExitCode.prototype.code = null;
        ExitCode.prototype.text = null;
        var $oneOfFields;
        Object.defineProperty(ExitCode.prototype, "_code", {
            get: $util.oneOfGetter(($oneOfFields = ["code"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ExitCode.prototype, "_text", {
            get: $util.oneOfGetter(($oneOfFields = ["text"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ExitCode.create = function create(properties) {
            return new ExitCode(properties);
        };
        ExitCode.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(8).uint64(message.code);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(18).string(message.text);
            return writer;
        };
        ExitCode.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ExitCode.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.ExitCode();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.code = reader.uint64();
                        break;
                    }
                    case 2: {
                        message.text = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ExitCode.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ExitCode.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.code != null && message.hasOwnProperty("code")) {
                properties._code = 1;
                if (
                    !$util.isInteger(message.code) &&
                    !(
                        message.code &&
                        $util.isInteger(message.code.low) &&
                        $util.isInteger(message.code.high)
                    )
                )
                    return "code: integer|Long expected";
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                properties._text = 1;
                if (!$util.isString(message.text)) return "text: string expected";
            }
            return null;
        };
        ExitCode.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.ExitCode) return object;
            var message = new $root.ServerSync.ExitCode();
            if (object.code != null)
                if ($util.Long) (message.code = $util.Long.fromValue(object.code)).unsigned = true;
                else if (typeof object.code === "string") message.code = parseInt(object.code, 10);
                else if (typeof object.code === "number") message.code = object.code;
                else if (typeof object.code === "object")
                    message.code = new $util.LongBits(
                        object.code.low >>> 0,
                        object.code.high >>> 0
                    ).toNumber(true);
            if (object.text != null) message.text = String(object.text);
            return message;
        };
        ExitCode.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.code != null && message.hasOwnProperty("code")) {
                if (typeof message.code === "number")
                    object.code = options.longs === String ? String(message.code) : message.code;
                else
                    object.code =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.code)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.code.low >>> 0,
                                    message.code.high >>> 0
                                ).toNumber(true)
                              : message.code;
                if (options.oneofs) object._code = "code";
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                object.text = message.text;
                if (options.oneofs) object._text = "text";
            }
            return object;
        };
        ExitCode.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ExitCode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.ExitCode";
        };
        return ExitCode;
    })();
    ServerSync.SyncdVersion = (function () {
        function SyncdVersion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncdVersion.prototype.version = null;
        var $oneOfFields;
        Object.defineProperty(SyncdVersion.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncdVersion.create = function create(properties) {
            return new SyncdVersion(properties);
        };
        SyncdVersion.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(8).uint64(message.version);
            return writer;
        };
        SyncdVersion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncdVersion.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ServerSync.SyncdVersion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.version = reader.uint64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncdVersion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncdVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
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
            return null;
        };
        SyncdVersion.fromObject = function fromObject(object) {
            if (object instanceof $root.ServerSync.SyncdVersion) return object;
            var message = new $root.ServerSync.SyncdVersion();
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
            return message;
        };
        SyncdVersion.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
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
            return object;
        };
        SyncdVersion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncdVersion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServerSync.SyncdVersion";
        };
        return SyncdVersion;
    })();
    return ServerSync;
})();
module.exports = $root;

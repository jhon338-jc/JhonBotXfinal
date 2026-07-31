"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.SyncAction = (function () {
    var SyncAction = {};
    SyncAction.PatchDebugData = (function () {
        function PatchDebugData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        PatchDebugData.prototype.currentLthash = null;
        PatchDebugData.prototype.newLthash = null;
        PatchDebugData.prototype.patchVersion = null;
        PatchDebugData.prototype.collectionName = null;
        PatchDebugData.prototype.firstFourBytesFromAHashOfSnapshotMacKey = null;
        PatchDebugData.prototype.newLthashSubtract = null;
        PatchDebugData.prototype.numberAdd = null;
        PatchDebugData.prototype.numberRemove = null;
        PatchDebugData.prototype.numberOverride = null;
        PatchDebugData.prototype.senderPlatform = null;
        PatchDebugData.prototype.isSenderPrimary = null;
        var $oneOfFields;
        Object.defineProperty(PatchDebugData.prototype, "_currentLthash", {
            get: $util.oneOfGetter(($oneOfFields = ["currentLthash"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_newLthash", {
            get: $util.oneOfGetter(($oneOfFields = ["newLthash"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_patchVersion", {
            get: $util.oneOfGetter(($oneOfFields = ["patchVersion"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_collectionName", {
            get: $util.oneOfGetter(($oneOfFields = ["collectionName"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(
            PatchDebugData.prototype,
            "_firstFourBytesFromAHashOfSnapshotMacKey",
            {
                get: $util.oneOfGetter(
                    ($oneOfFields = ["firstFourBytesFromAHashOfSnapshotMacKey"])
                ),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        Object.defineProperty(PatchDebugData.prototype, "_newLthashSubtract", {
            get: $util.oneOfGetter(($oneOfFields = ["newLthashSubtract"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_numberAdd", {
            get: $util.oneOfGetter(($oneOfFields = ["numberAdd"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_numberRemove", {
            get: $util.oneOfGetter(($oneOfFields = ["numberRemove"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_numberOverride", {
            get: $util.oneOfGetter(($oneOfFields = ["numberOverride"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_senderPlatform", {
            get: $util.oneOfGetter(($oneOfFields = ["senderPlatform"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(PatchDebugData.prototype, "_isSenderPrimary", {
            get: $util.oneOfGetter(($oneOfFields = ["isSenderPrimary"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        PatchDebugData.create = function create(properties) {
            return new PatchDebugData(properties);
        };
        PatchDebugData.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.currentLthash != null &&
                Object.hasOwnProperty.call(message, "currentLthash")
            )
                writer.uint32(10).bytes(message.currentLthash);
            if (message.newLthash != null && Object.hasOwnProperty.call(message, "newLthash"))
                writer.uint32(18).bytes(message.newLthash);
            if (message.patchVersion != null && Object.hasOwnProperty.call(message, "patchVersion"))
                writer.uint32(26).bytes(message.patchVersion);
            if (
                message.collectionName != null &&
                Object.hasOwnProperty.call(message, "collectionName")
            )
                writer.uint32(34).bytes(message.collectionName);
            if (
                message.firstFourBytesFromAHashOfSnapshotMacKey != null &&
                Object.hasOwnProperty.call(message, "firstFourBytesFromAHashOfSnapshotMacKey")
            )
                writer.uint32(42).bytes(message.firstFourBytesFromAHashOfSnapshotMacKey);
            if (
                message.newLthashSubtract != null &&
                Object.hasOwnProperty.call(message, "newLthashSubtract")
            )
                writer.uint32(50).bytes(message.newLthashSubtract);
            if (message.numberAdd != null && Object.hasOwnProperty.call(message, "numberAdd"))
                writer.uint32(56).int32(message.numberAdd);
            if (message.numberRemove != null && Object.hasOwnProperty.call(message, "numberRemove"))
                writer.uint32(64).int32(message.numberRemove);
            if (
                message.numberOverride != null &&
                Object.hasOwnProperty.call(message, "numberOverride")
            )
                writer.uint32(72).int32(message.numberOverride);
            if (
                message.senderPlatform != null &&
                Object.hasOwnProperty.call(message, "senderPlatform")
            )
                writer.uint32(80).int32(message.senderPlatform);
            if (
                message.isSenderPrimary != null &&
                Object.hasOwnProperty.call(message, "isSenderPrimary")
            )
                writer.uint32(88).bool(message.isSenderPrimary);
            return writer;
        };
        PatchDebugData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        PatchDebugData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SyncAction.PatchDebugData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.currentLthash = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.newLthash = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.patchVersion = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.collectionName = reader.bytes();
                        break;
                    }
                    case 5: {
                        message.firstFourBytesFromAHashOfSnapshotMacKey = reader.bytes();
                        break;
                    }
                    case 6: {
                        message.newLthashSubtract = reader.bytes();
                        break;
                    }
                    case 7: {
                        message.numberAdd = reader.int32();
                        break;
                    }
                    case 8: {
                        message.numberRemove = reader.int32();
                        break;
                    }
                    case 9: {
                        message.numberOverride = reader.int32();
                        break;
                    }
                    case 10: {
                        message.senderPlatform = reader.int32();
                        break;
                    }
                    case 11: {
                        message.isSenderPrimary = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        PatchDebugData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        PatchDebugData.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.currentLthash != null && message.hasOwnProperty("currentLthash")) {
                properties._currentLthash = 1;
                if (
                    !(
                        (message.currentLthash &&
                            typeof message.currentLthash.length === "number") ||
                        $util.isString(message.currentLthash)
                    )
                )
                    return "currentLthash: buffer expected";
            }
            if (message.newLthash != null && message.hasOwnProperty("newLthash")) {
                properties._newLthash = 1;
                if (
                    !(
                        (message.newLthash && typeof message.newLthash.length === "number") ||
                        $util.isString(message.newLthash)
                    )
                )
                    return "newLthash: buffer expected";
            }
            if (message.patchVersion != null && message.hasOwnProperty("patchVersion")) {
                properties._patchVersion = 1;
                if (
                    !(
                        (message.patchVersion && typeof message.patchVersion.length === "number") ||
                        $util.isString(message.patchVersion)
                    )
                )
                    return "patchVersion: buffer expected";
            }
            if (message.collectionName != null && message.hasOwnProperty("collectionName")) {
                properties._collectionName = 1;
                if (
                    !(
                        (message.collectionName &&
                            typeof message.collectionName.length === "number") ||
                        $util.isString(message.collectionName)
                    )
                )
                    return "collectionName: buffer expected";
            }
            if (
                message.firstFourBytesFromAHashOfSnapshotMacKey != null &&
                message.hasOwnProperty("firstFourBytesFromAHashOfSnapshotMacKey")
            ) {
                properties._firstFourBytesFromAHashOfSnapshotMacKey = 1;
                if (
                    !(
                        (message.firstFourBytesFromAHashOfSnapshotMacKey &&
                            typeof message.firstFourBytesFromAHashOfSnapshotMacKey.length ===
                                "number") ||
                        $util.isString(message.firstFourBytesFromAHashOfSnapshotMacKey)
                    )
                )
                    return "firstFourBytesFromAHashOfSnapshotMacKey: buffer expected";
            }
            if (message.newLthashSubtract != null && message.hasOwnProperty("newLthashSubtract")) {
                properties._newLthashSubtract = 1;
                if (
                    !(
                        (message.newLthashSubtract &&
                            typeof message.newLthashSubtract.length === "number") ||
                        $util.isString(message.newLthashSubtract)
                    )
                )
                    return "newLthashSubtract: buffer expected";
            }
            if (message.numberAdd != null && message.hasOwnProperty("numberAdd")) {
                properties._numberAdd = 1;
                if (!$util.isInteger(message.numberAdd)) return "numberAdd: integer expected";
            }
            if (message.numberRemove != null && message.hasOwnProperty("numberRemove")) {
                properties._numberRemove = 1;
                if (!$util.isInteger(message.numberRemove)) return "numberRemove: integer expected";
            }
            if (message.numberOverride != null && message.hasOwnProperty("numberOverride")) {
                properties._numberOverride = 1;
                if (!$util.isInteger(message.numberOverride))
                    return "numberOverride: integer expected";
            }
            if (message.senderPlatform != null && message.hasOwnProperty("senderPlatform")) {
                properties._senderPlatform = 1;
                switch (message.senderPlatform) {
                    default:
                        return "senderPlatform: enum value expected";
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
                        break;
                }
            }
            if (message.isSenderPrimary != null && message.hasOwnProperty("isSenderPrimary")) {
                properties._isSenderPrimary = 1;
                if (typeof message.isSenderPrimary !== "boolean")
                    return "isSenderPrimary: boolean expected";
            }
            return null;
        };
        PatchDebugData.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncAction.PatchDebugData) return object;
            var message = new $root.SyncAction.PatchDebugData();
            if (object.currentLthash != null)
                if (typeof object.currentLthash === "string")
                    $util.base64.decode(
                        object.currentLthash,
                        (message.currentLthash = $util.newBuffer(
                            $util.base64.length(object.currentLthash)
                        )),
                        0
                    );
                else if (object.currentLthash.length >= 0)
                    message.currentLthash = object.currentLthash;
            if (object.newLthash != null)
                if (typeof object.newLthash === "string")
                    $util.base64.decode(
                        object.newLthash,
                        (message.newLthash = $util.newBuffer(
                            $util.base64.length(object.newLthash)
                        )),
                        0
                    );
                else if (object.newLthash.length >= 0) message.newLthash = object.newLthash;
            if (object.patchVersion != null)
                if (typeof object.patchVersion === "string")
                    $util.base64.decode(
                        object.patchVersion,
                        (message.patchVersion = $util.newBuffer(
                            $util.base64.length(object.patchVersion)
                        )),
                        0
                    );
                else if (object.patchVersion.length >= 0)
                    message.patchVersion = object.patchVersion;
            if (object.collectionName != null)
                if (typeof object.collectionName === "string")
                    $util.base64.decode(
                        object.collectionName,
                        (message.collectionName = $util.newBuffer(
                            $util.base64.length(object.collectionName)
                        )),
                        0
                    );
                else if (object.collectionName.length >= 0)
                    message.collectionName = object.collectionName;
            if (object.firstFourBytesFromAHashOfSnapshotMacKey != null)
                if (typeof object.firstFourBytesFromAHashOfSnapshotMacKey === "string")
                    $util.base64.decode(
                        object.firstFourBytesFromAHashOfSnapshotMacKey,
                        (message.firstFourBytesFromAHashOfSnapshotMacKey = $util.newBuffer(
                            $util.base64.length(object.firstFourBytesFromAHashOfSnapshotMacKey)
                        )),
                        0
                    );
                else if (object.firstFourBytesFromAHashOfSnapshotMacKey.length >= 0)
                    message.firstFourBytesFromAHashOfSnapshotMacKey =
                        object.firstFourBytesFromAHashOfSnapshotMacKey;
            if (object.newLthashSubtract != null)
                if (typeof object.newLthashSubtract === "string")
                    $util.base64.decode(
                        object.newLthashSubtract,
                        (message.newLthashSubtract = $util.newBuffer(
                            $util.base64.length(object.newLthashSubtract)
                        )),
                        0
                    );
                else if (object.newLthashSubtract.length >= 0)
                    message.newLthashSubtract = object.newLthashSubtract;
            if (object.numberAdd != null) message.numberAdd = object.numberAdd | 0;
            if (object.numberRemove != null) message.numberRemove = object.numberRemove | 0;
            if (object.numberOverride != null) message.numberOverride = object.numberOverride | 0;
            switch (object.senderPlatform) {
                default:
                    if (typeof object.senderPlatform === "number") {
                        message.senderPlatform = object.senderPlatform;
                        break;
                    }
                    break;
                case "ANDROID":
                case 0:
                    message.senderPlatform = 0;
                    break;
                case "SMBA":
                case 1:
                    message.senderPlatform = 1;
                    break;
                case "IPHONE":
                case 2:
                    message.senderPlatform = 2;
                    break;
                case "SMBI":
                case 3:
                    message.senderPlatform = 3;
                    break;
                case "WEB":
                case 4:
                    message.senderPlatform = 4;
                    break;
                case "UWP":
                case 5:
                    message.senderPlatform = 5;
                    break;
                case "DARWIN":
                case 6:
                    message.senderPlatform = 6;
                    break;
                case "IPAD":
                case 7:
                    message.senderPlatform = 7;
                    break;
                case "WEAROS":
                case 8:
                    message.senderPlatform = 8;
                    break;
                case "WASG":
                case 9:
                    message.senderPlatform = 9;
                    break;
                case "WEARM":
                case 10:
                    message.senderPlatform = 10;
                    break;
                case "CAPI":
                case 11:
                    message.senderPlatform = 11;
                    break;
            }
            if (object.isSenderPrimary != null)
                message.isSenderPrimary = Boolean(object.isSenderPrimary);
            return message;
        };
        PatchDebugData.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.currentLthash != null && message.hasOwnProperty("currentLthash")) {
                object.currentLthash =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.currentLthash,
                              0,
                              message.currentLthash.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.currentLthash)
                          : message.currentLthash;
                if (options.oneofs) object._currentLthash = "currentLthash";
            }
            if (message.newLthash != null && message.hasOwnProperty("newLthash")) {
                object.newLthash =
                    options.bytes === String
                        ? $util.base64.encode(message.newLthash, 0, message.newLthash.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.newLthash)
                          : message.newLthash;
                if (options.oneofs) object._newLthash = "newLthash";
            }
            if (message.patchVersion != null && message.hasOwnProperty("patchVersion")) {
                object.patchVersion =
                    options.bytes === String
                        ? $util.base64.encode(message.patchVersion, 0, message.patchVersion.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.patchVersion)
                          : message.patchVersion;
                if (options.oneofs) object._patchVersion = "patchVersion";
            }
            if (message.collectionName != null && message.hasOwnProperty("collectionName")) {
                object.collectionName =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.collectionName,
                              0,
                              message.collectionName.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.collectionName)
                          : message.collectionName;
                if (options.oneofs) object._collectionName = "collectionName";
            }
            if (
                message.firstFourBytesFromAHashOfSnapshotMacKey != null &&
                message.hasOwnProperty("firstFourBytesFromAHashOfSnapshotMacKey")
            ) {
                object.firstFourBytesFromAHashOfSnapshotMacKey =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.firstFourBytesFromAHashOfSnapshotMacKey,
                              0,
                              message.firstFourBytesFromAHashOfSnapshotMacKey.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(
                                message.firstFourBytesFromAHashOfSnapshotMacKey
                            )
                          : message.firstFourBytesFromAHashOfSnapshotMacKey;
                if (options.oneofs)
                    object._firstFourBytesFromAHashOfSnapshotMacKey =
                        "firstFourBytesFromAHashOfSnapshotMacKey";
            }
            if (message.newLthashSubtract != null && message.hasOwnProperty("newLthashSubtract")) {
                object.newLthashSubtract =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.newLthashSubtract,
                              0,
                              message.newLthashSubtract.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.newLthashSubtract)
                          : message.newLthashSubtract;
                if (options.oneofs) object._newLthashSubtract = "newLthashSubtract";
            }
            if (message.numberAdd != null && message.hasOwnProperty("numberAdd")) {
                object.numberAdd = message.numberAdd;
                if (options.oneofs) object._numberAdd = "numberAdd";
            }
            if (message.numberRemove != null && message.hasOwnProperty("numberRemove")) {
                object.numberRemove = message.numberRemove;
                if (options.oneofs) object._numberRemove = "numberRemove";
            }
            if (message.numberOverride != null && message.hasOwnProperty("numberOverride")) {
                object.numberOverride = message.numberOverride;
                if (options.oneofs) object._numberOverride = "numberOverride";
            }
            if (message.senderPlatform != null && message.hasOwnProperty("senderPlatform")) {
                object.senderPlatform =
                    options.enums === String
                        ? $root.SyncAction.PatchDebugData.Platform[message.senderPlatform] ===
                          undefined
                            ? message.senderPlatform
                            : $root.SyncAction.PatchDebugData.Platform[message.senderPlatform]
                        : message.senderPlatform;
                if (options.oneofs) object._senderPlatform = "senderPlatform";
            }
            if (message.isSenderPrimary != null && message.hasOwnProperty("isSenderPrimary")) {
                object.isSenderPrimary = message.isSenderPrimary;
                if (options.oneofs) object._isSenderPrimary = "isSenderPrimary";
            }
            return object;
        };
        PatchDebugData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PatchDebugData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SyncAction.PatchDebugData";
        };
        PatchDebugData.Platform = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "ANDROID")] = 0;
            values[(valuesById[1] = "SMBA")] = 1;
            values[(valuesById[2] = "IPHONE")] = 2;
            values[(valuesById[3] = "SMBI")] = 3;
            values[(valuesById[4] = "WEB")] = 4;
            values[(valuesById[5] = "UWP")] = 5;
            values[(valuesById[6] = "DARWIN")] = 6;
            values[(valuesById[7] = "IPAD")] = 7;
            values[(valuesById[8] = "WEAROS")] = 8;
            values[(valuesById[9] = "WASG")] = 9;
            values[(valuesById[10] = "WEARM")] = 10;
            values[(valuesById[11] = "CAPI")] = 11;
            return values;
        })();
        return PatchDebugData;
    })();
    SyncAction.SyncActionData = (function () {
        function SyncActionData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncActionData.prototype.index = null;
        SyncActionData.prototype.value = null;
        SyncActionData.prototype.padding = null;
        SyncActionData.prototype.version = null;
        var $oneOfFields;
        Object.defineProperty(SyncActionData.prototype, "_index", {
            get: $util.oneOfGetter(($oneOfFields = ["index"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionData.prototype, "_value", {
            get: $util.oneOfGetter(($oneOfFields = ["value"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionData.prototype, "_padding", {
            get: $util.oneOfGetter(($oneOfFields = ["padding"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionData.prototype, "_version", {
            get: $util.oneOfGetter(($oneOfFields = ["version"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncActionData.create = function create(properties) {
            return new SyncActionData(properties);
        };
        SyncActionData.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(10).bytes(message.index);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                $root.SyncAction.SyncActionValue.encode(
                    message.value,
                    writer.uint32(18).fork()
                ).ldelim();
            if (message.padding != null && Object.hasOwnProperty.call(message, "padding"))
                writer.uint32(26).bytes(message.padding);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(32).int32(message.version);
            return writer;
        };
        SyncActionData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncActionData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SyncAction.SyncActionData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.index = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.value = $root.SyncAction.SyncActionValue.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 3: {
                        message.padding = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.version = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        SyncActionData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncActionData.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.index != null && message.hasOwnProperty("index")) {
                properties._index = 1;
                if (
                    !(
                        (message.index && typeof message.index.length === "number") ||
                        $util.isString(message.index)
                    )
                )
                    return "index: buffer expected";
            }
            if (message.value != null && message.hasOwnProperty("value")) {
                properties._value = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.verify(message.value);
                    if (error) return "value." + error;
                }
            }
            if (message.padding != null && message.hasOwnProperty("padding")) {
                properties._padding = 1;
                if (
                    !(
                        (message.padding && typeof message.padding.length === "number") ||
                        $util.isString(message.padding)
                    )
                )
                    return "padding: buffer expected";
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                properties._version = 1;
                if (!$util.isInteger(message.version)) return "version: integer expected";
            }
            return null;
        };
        SyncActionData.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncAction.SyncActionData) return object;
            var message = new $root.SyncAction.SyncActionData();
            if (object.index != null)
                if (typeof object.index === "string")
                    $util.base64.decode(
                        object.index,
                        (message.index = $util.newBuffer($util.base64.length(object.index))),
                        0
                    );
                else if (object.index.length >= 0) message.index = object.index;
            if (object.value != null) {
                if (typeof object.value !== "object")
                    throw TypeError(".SyncAction.SyncActionData.value: object expected");
                message.value = $root.SyncAction.SyncActionValue.fromObject(object.value);
            }
            if (object.padding != null)
                if (typeof object.padding === "string")
                    $util.base64.decode(
                        object.padding,
                        (message.padding = $util.newBuffer($util.base64.length(object.padding))),
                        0
                    );
                else if (object.padding.length >= 0) message.padding = object.padding;
            if (object.version != null) message.version = object.version | 0;
            return message;
        };
        SyncActionData.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.index != null && message.hasOwnProperty("index")) {
                object.index =
                    options.bytes === String
                        ? $util.base64.encode(message.index, 0, message.index.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.index)
                          : message.index;
                if (options.oneofs) object._index = "index";
            }
            if (message.value != null && message.hasOwnProperty("value")) {
                object.value = $root.SyncAction.SyncActionValue.toObject(message.value, options);
                if (options.oneofs) object._value = "value";
            }
            if (message.padding != null && message.hasOwnProperty("padding")) {
                object.padding =
                    options.bytes === String
                        ? $util.base64.encode(message.padding, 0, message.padding.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.padding)
                          : message.padding;
                if (options.oneofs) object._padding = "padding";
            }
            if (message.version != null && message.hasOwnProperty("version")) {
                object.version = message.version;
                if (options.oneofs) object._version = "version";
            }
            return object;
        };
        SyncActionData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncActionData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SyncAction.SyncActionData";
        };
        return SyncActionData;
    })();
    SyncAction.SyncActionValue = (function () {
        function SyncActionValue(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        SyncActionValue.prototype.timestamp = null;
        SyncActionValue.prototype.starAction = null;
        SyncActionValue.prototype.contactAction = null;
        SyncActionValue.prototype.muteAction = null;
        SyncActionValue.prototype.pinAction = null;
        SyncActionValue.prototype.pushNameSetting = null;
        SyncActionValue.prototype.quickReplyAction = null;
        SyncActionValue.prototype.recentEmojiWeightsAction = null;
        SyncActionValue.prototype.labelEditAction = null;
        SyncActionValue.prototype.labelAssociationAction = null;
        SyncActionValue.prototype.localeSetting = null;
        SyncActionValue.prototype.archiveChatAction = null;
        SyncActionValue.prototype.deleteMessageForMeAction = null;
        SyncActionValue.prototype.keyExpiration = null;
        SyncActionValue.prototype.markChatAsReadAction = null;
        SyncActionValue.prototype.clearChatAction = null;
        SyncActionValue.prototype.deleteChatAction = null;
        SyncActionValue.prototype.unarchiveChatsSetting = null;
        SyncActionValue.prototype.primaryFeature = null;
        SyncActionValue.prototype.androidUnsupportedActions = null;
        SyncActionValue.prototype.agentAction = null;
        SyncActionValue.prototype.subscriptionAction = null;
        SyncActionValue.prototype.userStatusMuteAction = null;
        SyncActionValue.prototype.timeFormatAction = null;
        SyncActionValue.prototype.nuxAction = null;
        SyncActionValue.prototype.primaryVersionAction = null;
        SyncActionValue.prototype.stickerAction = null;
        SyncActionValue.prototype.removeRecentStickerAction = null;
        SyncActionValue.prototype.chatAssignment = null;
        SyncActionValue.prototype.chatAssignmentOpenedStatus = null;
        SyncActionValue.prototype.pnForLidChatAction = null;
        SyncActionValue.prototype.marketingMessageAction = null;
        SyncActionValue.prototype.marketingMessageBroadcastAction = null;
        SyncActionValue.prototype.externalWebBetaAction = null;
        SyncActionValue.prototype.privacySettingRelayAllCalls = null;
        SyncActionValue.prototype.callLogAction = null;
        SyncActionValue.prototype.ugcBot = null;
        SyncActionValue.prototype.statusPrivacy = null;
        SyncActionValue.prototype.botWelcomeRequestAction = null;
        SyncActionValue.prototype.deleteIndividualCallLog = null;
        SyncActionValue.prototype.labelReorderingAction = null;
        SyncActionValue.prototype.paymentInfoAction = null;
        SyncActionValue.prototype.customPaymentMethodsAction = null;
        SyncActionValue.prototype.lockChatAction = null;
        SyncActionValue.prototype.chatLockSettings = null;
        SyncActionValue.prototype.wamoUserIdentifierAction = null;
        SyncActionValue.prototype.privacySettingDisableLinkPreviewsAction = null;
        SyncActionValue.prototype.deviceCapabilities = null;
        SyncActionValue.prototype.noteEditAction = null;
        SyncActionValue.prototype.favoritesAction = null;
        SyncActionValue.prototype.merchantPaymentPartnerAction = null;
        SyncActionValue.prototype.waffleAccountLinkStateAction = null;
        SyncActionValue.prototype.usernameChatStartMode = null;
        SyncActionValue.prototype.notificationActivitySettingAction = null;
        SyncActionValue.prototype.lidContactAction = null;
        SyncActionValue.prototype.ctwaPerCustomerDataSharingAction = null;
        SyncActionValue.prototype.paymentTosAction = null;
        SyncActionValue.prototype.privacySettingChannelsPersonalisedRecommendationAction = null;
        SyncActionValue.prototype.detectedOutcomesStatusAction = null;
        SyncActionValue.prototype.maibaAiFeaturesControlAction = null;
        SyncActionValue.prototype.businessBroadcastListAction = null;
        SyncActionValue.prototype.musicUserIdAction = null;
        SyncActionValue.prototype.statusPostOptInNotificationPreferencesAction = null;
        SyncActionValue.prototype.avatarUpdatedAction = null;
        SyncActionValue.prototype.privateProcessingSettingAction = null;
        SyncActionValue.prototype.newsletterSavedInterestsAction = null;
        SyncActionValue.prototype.aiThreadRenameAction = null;
        SyncActionValue.prototype.interactiveMessageAction = null;
        SyncActionValue.prototype.settingsSyncAction = null;
        var $oneOfFields;
        Object.defineProperty(SyncActionValue.prototype, "_timestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_starAction", {
            get: $util.oneOfGetter(($oneOfFields = ["starAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_contactAction", {
            get: $util.oneOfGetter(($oneOfFields = ["contactAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_muteAction", {
            get: $util.oneOfGetter(($oneOfFields = ["muteAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_pinAction", {
            get: $util.oneOfGetter(($oneOfFields = ["pinAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_pushNameSetting", {
            get: $util.oneOfGetter(($oneOfFields = ["pushNameSetting"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_quickReplyAction", {
            get: $util.oneOfGetter(($oneOfFields = ["quickReplyAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_recentEmojiWeightsAction", {
            get: $util.oneOfGetter(($oneOfFields = ["recentEmojiWeightsAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_labelEditAction", {
            get: $util.oneOfGetter(($oneOfFields = ["labelEditAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_labelAssociationAction", {
            get: $util.oneOfGetter(($oneOfFields = ["labelAssociationAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_localeSetting", {
            get: $util.oneOfGetter(($oneOfFields = ["localeSetting"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_archiveChatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["archiveChatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_deleteMessageForMeAction", {
            get: $util.oneOfGetter(($oneOfFields = ["deleteMessageForMeAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_keyExpiration", {
            get: $util.oneOfGetter(($oneOfFields = ["keyExpiration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_markChatAsReadAction", {
            get: $util.oneOfGetter(($oneOfFields = ["markChatAsReadAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_clearChatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["clearChatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_deleteChatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["deleteChatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_unarchiveChatsSetting", {
            get: $util.oneOfGetter(($oneOfFields = ["unarchiveChatsSetting"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_primaryFeature", {
            get: $util.oneOfGetter(($oneOfFields = ["primaryFeature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_androidUnsupportedActions", {
            get: $util.oneOfGetter(($oneOfFields = ["androidUnsupportedActions"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_agentAction", {
            get: $util.oneOfGetter(($oneOfFields = ["agentAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_subscriptionAction", {
            get: $util.oneOfGetter(($oneOfFields = ["subscriptionAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_userStatusMuteAction", {
            get: $util.oneOfGetter(($oneOfFields = ["userStatusMuteAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_timeFormatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["timeFormatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_nuxAction", {
            get: $util.oneOfGetter(($oneOfFields = ["nuxAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_primaryVersionAction", {
            get: $util.oneOfGetter(($oneOfFields = ["primaryVersionAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_stickerAction", {
            get: $util.oneOfGetter(($oneOfFields = ["stickerAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_removeRecentStickerAction", {
            get: $util.oneOfGetter(($oneOfFields = ["removeRecentStickerAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_chatAssignment", {
            get: $util.oneOfGetter(($oneOfFields = ["chatAssignment"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_chatAssignmentOpenedStatus", {
            get: $util.oneOfGetter(($oneOfFields = ["chatAssignmentOpenedStatus"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_pnForLidChatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["pnForLidChatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_marketingMessageAction", {
            get: $util.oneOfGetter(($oneOfFields = ["marketingMessageAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_marketingMessageBroadcastAction", {
            get: $util.oneOfGetter(($oneOfFields = ["marketingMessageBroadcastAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_externalWebBetaAction", {
            get: $util.oneOfGetter(($oneOfFields = ["externalWebBetaAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_privacySettingRelayAllCalls", {
            get: $util.oneOfGetter(($oneOfFields = ["privacySettingRelayAllCalls"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_callLogAction", {
            get: $util.oneOfGetter(($oneOfFields = ["callLogAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_ugcBot", {
            get: $util.oneOfGetter(($oneOfFields = ["ugcBot"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_statusPrivacy", {
            get: $util.oneOfGetter(($oneOfFields = ["statusPrivacy"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_botWelcomeRequestAction", {
            get: $util.oneOfGetter(($oneOfFields = ["botWelcomeRequestAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_deleteIndividualCallLog", {
            get: $util.oneOfGetter(($oneOfFields = ["deleteIndividualCallLog"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_labelReorderingAction", {
            get: $util.oneOfGetter(($oneOfFields = ["labelReorderingAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_paymentInfoAction", {
            get: $util.oneOfGetter(($oneOfFields = ["paymentInfoAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_customPaymentMethodsAction", {
            get: $util.oneOfGetter(($oneOfFields = ["customPaymentMethodsAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_lockChatAction", {
            get: $util.oneOfGetter(($oneOfFields = ["lockChatAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_chatLockSettings", {
            get: $util.oneOfGetter(($oneOfFields = ["chatLockSettings"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_wamoUserIdentifierAction", {
            get: $util.oneOfGetter(($oneOfFields = ["wamoUserIdentifierAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(
            SyncActionValue.prototype,
            "_privacySettingDisableLinkPreviewsAction",
            {
                get: $util.oneOfGetter(
                    ($oneOfFields = ["privacySettingDisableLinkPreviewsAction"])
                ),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        Object.defineProperty(SyncActionValue.prototype, "_deviceCapabilities", {
            get: $util.oneOfGetter(($oneOfFields = ["deviceCapabilities"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_noteEditAction", {
            get: $util.oneOfGetter(($oneOfFields = ["noteEditAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_favoritesAction", {
            get: $util.oneOfGetter(($oneOfFields = ["favoritesAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_merchantPaymentPartnerAction", {
            get: $util.oneOfGetter(($oneOfFields = ["merchantPaymentPartnerAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_waffleAccountLinkStateAction", {
            get: $util.oneOfGetter(($oneOfFields = ["waffleAccountLinkStateAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_usernameChatStartMode", {
            get: $util.oneOfGetter(($oneOfFields = ["usernameChatStartMode"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_notificationActivitySettingAction", {
            get: $util.oneOfGetter(($oneOfFields = ["notificationActivitySettingAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_lidContactAction", {
            get: $util.oneOfGetter(($oneOfFields = ["lidContactAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_ctwaPerCustomerDataSharingAction", {
            get: $util.oneOfGetter(($oneOfFields = ["ctwaPerCustomerDataSharingAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_paymentTosAction", {
            get: $util.oneOfGetter(($oneOfFields = ["paymentTosAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(
            SyncActionValue.prototype,
            "_privacySettingChannelsPersonalisedRecommendationAction",
            {
                get: $util.oneOfGetter(
                    ($oneOfFields = ["privacySettingChannelsPersonalisedRecommendationAction"])
                ),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        Object.defineProperty(SyncActionValue.prototype, "_detectedOutcomesStatusAction", {
            get: $util.oneOfGetter(($oneOfFields = ["detectedOutcomesStatusAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_maibaAiFeaturesControlAction", {
            get: $util.oneOfGetter(($oneOfFields = ["maibaAiFeaturesControlAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_businessBroadcastListAction", {
            get: $util.oneOfGetter(($oneOfFields = ["businessBroadcastListAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_musicUserIdAction", {
            get: $util.oneOfGetter(($oneOfFields = ["musicUserIdAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(
            SyncActionValue.prototype,
            "_statusPostOptInNotificationPreferencesAction",
            {
                get: $util.oneOfGetter(
                    ($oneOfFields = ["statusPostOptInNotificationPreferencesAction"])
                ),
                set: $util.oneOfSetter($oneOfFields),
            }
        );
        Object.defineProperty(SyncActionValue.prototype, "_avatarUpdatedAction", {
            get: $util.oneOfGetter(($oneOfFields = ["avatarUpdatedAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_privateProcessingSettingAction", {
            get: $util.oneOfGetter(($oneOfFields = ["privateProcessingSettingAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_newsletterSavedInterestsAction", {
            get: $util.oneOfGetter(($oneOfFields = ["newsletterSavedInterestsAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_aiThreadRenameAction", {
            get: $util.oneOfGetter(($oneOfFields = ["aiThreadRenameAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_interactiveMessageAction", {
            get: $util.oneOfGetter(($oneOfFields = ["interactiveMessageAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(SyncActionValue.prototype, "_settingsSyncAction", {
            get: $util.oneOfGetter(($oneOfFields = ["settingsSyncAction"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        SyncActionValue.create = function create(properties) {
            return new SyncActionValue(properties);
        };
        SyncActionValue.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(8).int64(message.timestamp);
            if (message.starAction != null && Object.hasOwnProperty.call(message, "starAction"))
                $root.SyncAction.SyncActionValue.StarAction.encode(
                    message.starAction,
                    writer.uint32(18).fork()
                ).ldelim();
            if (
                message.contactAction != null &&
                Object.hasOwnProperty.call(message, "contactAction")
            )
                $root.SyncAction.SyncActionValue.ContactAction.encode(
                    message.contactAction,
                    writer.uint32(26).fork()
                ).ldelim();
            if (message.muteAction != null && Object.hasOwnProperty.call(message, "muteAction"))
                $root.SyncAction.SyncActionValue.MuteAction.encode(
                    message.muteAction,
                    writer.uint32(34).fork()
                ).ldelim();
            if (message.pinAction != null && Object.hasOwnProperty.call(message, "pinAction"))
                $root.SyncAction.SyncActionValue.PinAction.encode(
                    message.pinAction,
                    writer.uint32(42).fork()
                ).ldelim();
            if (
                message.pushNameSetting != null &&
                Object.hasOwnProperty.call(message, "pushNameSetting")
            )
                $root.SyncAction.SyncActionValue.PushNameSetting.encode(
                    message.pushNameSetting,
                    writer.uint32(58).fork()
                ).ldelim();
            if (
                message.quickReplyAction != null &&
                Object.hasOwnProperty.call(message, "quickReplyAction")
            )
                $root.SyncAction.SyncActionValue.QuickReplyAction.encode(
                    message.quickReplyAction,
                    writer.uint32(66).fork()
                ).ldelim();
            if (
                message.recentEmojiWeightsAction != null &&
                Object.hasOwnProperty.call(message, "recentEmojiWeightsAction")
            )
                $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction.encode(
                    message.recentEmojiWeightsAction,
                    writer.uint32(90).fork()
                ).ldelim();
            if (
                message.labelEditAction != null &&
                Object.hasOwnProperty.call(message, "labelEditAction")
            )
                $root.SyncAction.SyncActionValue.LabelEditAction.encode(
                    message.labelEditAction,
                    writer.uint32(114).fork()
                ).ldelim();
            if (
                message.labelAssociationAction != null &&
                Object.hasOwnProperty.call(message, "labelAssociationAction")
            )
                $root.SyncAction.SyncActionValue.LabelAssociationAction.encode(
                    message.labelAssociationAction,
                    writer.uint32(122).fork()
                ).ldelim();
            if (
                message.localeSetting != null &&
                Object.hasOwnProperty.call(message, "localeSetting")
            )
                $root.SyncAction.SyncActionValue.LocaleSetting.encode(
                    message.localeSetting,
                    writer.uint32(130).fork()
                ).ldelim();
            if (
                message.archiveChatAction != null &&
                Object.hasOwnProperty.call(message, "archiveChatAction")
            )
                $root.SyncAction.SyncActionValue.ArchiveChatAction.encode(
                    message.archiveChatAction,
                    writer.uint32(138).fork()
                ).ldelim();
            if (
                message.deleteMessageForMeAction != null &&
                Object.hasOwnProperty.call(message, "deleteMessageForMeAction")
            )
                $root.SyncAction.SyncActionValue.DeleteMessageForMeAction.encode(
                    message.deleteMessageForMeAction,
                    writer.uint32(146).fork()
                ).ldelim();
            if (
                message.keyExpiration != null &&
                Object.hasOwnProperty.call(message, "keyExpiration")
            )
                $root.SyncAction.SyncActionValue.KeyExpiration.encode(
                    message.keyExpiration,
                    writer.uint32(154).fork()
                ).ldelim();
            if (
                message.markChatAsReadAction != null &&
                Object.hasOwnProperty.call(message, "markChatAsReadAction")
            )
                $root.SyncAction.SyncActionValue.MarkChatAsReadAction.encode(
                    message.markChatAsReadAction,
                    writer.uint32(162).fork()
                ).ldelim();
            if (
                message.clearChatAction != null &&
                Object.hasOwnProperty.call(message, "clearChatAction")
            )
                $root.SyncAction.SyncActionValue.ClearChatAction.encode(
                    message.clearChatAction,
                    writer.uint32(170).fork()
                ).ldelim();
            if (
                message.deleteChatAction != null &&
                Object.hasOwnProperty.call(message, "deleteChatAction")
            )
                $root.SyncAction.SyncActionValue.DeleteChatAction.encode(
                    message.deleteChatAction,
                    writer.uint32(178).fork()
                ).ldelim();
            if (
                message.unarchiveChatsSetting != null &&
                Object.hasOwnProperty.call(message, "unarchiveChatsSetting")
            )
                $root.SyncAction.SyncActionValue.UnarchiveChatsSetting.encode(
                    message.unarchiveChatsSetting,
                    writer.uint32(186).fork()
                ).ldelim();
            if (
                message.primaryFeature != null &&
                Object.hasOwnProperty.call(message, "primaryFeature")
            )
                $root.SyncAction.SyncActionValue.PrimaryFeature.encode(
                    message.primaryFeature,
                    writer.uint32(194).fork()
                ).ldelim();
            if (
                message.androidUnsupportedActions != null &&
                Object.hasOwnProperty.call(message, "androidUnsupportedActions")
            )
                $root.SyncAction.SyncActionValue.AndroidUnsupportedActions.encode(
                    message.androidUnsupportedActions,
                    writer.uint32(210).fork()
                ).ldelim();
            if (message.agentAction != null && Object.hasOwnProperty.call(message, "agentAction"))
                $root.SyncAction.SyncActionValue.AgentAction.encode(
                    message.agentAction,
                    writer.uint32(218).fork()
                ).ldelim();
            if (
                message.subscriptionAction != null &&
                Object.hasOwnProperty.call(message, "subscriptionAction")
            )
                $root.SyncAction.SyncActionValue.SubscriptionAction.encode(
                    message.subscriptionAction,
                    writer.uint32(226).fork()
                ).ldelim();
            if (
                message.userStatusMuteAction != null &&
                Object.hasOwnProperty.call(message, "userStatusMuteAction")
            )
                $root.SyncAction.SyncActionValue.UserStatusMuteAction.encode(
                    message.userStatusMuteAction,
                    writer.uint32(234).fork()
                ).ldelim();
            if (
                message.timeFormatAction != null &&
                Object.hasOwnProperty.call(message, "timeFormatAction")
            )
                $root.SyncAction.SyncActionValue.TimeFormatAction.encode(
                    message.timeFormatAction,
                    writer.uint32(242).fork()
                ).ldelim();
            if (message.nuxAction != null && Object.hasOwnProperty.call(message, "nuxAction"))
                $root.SyncAction.SyncActionValue.NuxAction.encode(
                    message.nuxAction,
                    writer.uint32(250).fork()
                ).ldelim();
            if (
                message.primaryVersionAction != null &&
                Object.hasOwnProperty.call(message, "primaryVersionAction")
            )
                $root.SyncAction.SyncActionValue.PrimaryVersionAction.encode(
                    message.primaryVersionAction,
                    writer.uint32(258).fork()
                ).ldelim();
            if (
                message.stickerAction != null &&
                Object.hasOwnProperty.call(message, "stickerAction")
            )
                $root.SyncAction.SyncActionValue.StickerAction.encode(
                    message.stickerAction,
                    writer.uint32(266).fork()
                ).ldelim();
            if (
                message.removeRecentStickerAction != null &&
                Object.hasOwnProperty.call(message, "removeRecentStickerAction")
            )
                $root.SyncAction.SyncActionValue.RemoveRecentStickerAction.encode(
                    message.removeRecentStickerAction,
                    writer.uint32(274).fork()
                ).ldelim();
            if (
                message.chatAssignment != null &&
                Object.hasOwnProperty.call(message, "chatAssignment")
            )
                $root.SyncAction.SyncActionValue.ChatAssignmentAction.encode(
                    message.chatAssignment,
                    writer.uint32(282).fork()
                ).ldelim();
            if (
                message.chatAssignmentOpenedStatus != null &&
                Object.hasOwnProperty.call(message, "chatAssignmentOpenedStatus")
            )
                $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.encode(
                    message.chatAssignmentOpenedStatus,
                    writer.uint32(290).fork()
                ).ldelim();
            if (
                message.pnForLidChatAction != null &&
                Object.hasOwnProperty.call(message, "pnForLidChatAction")
            )
                $root.SyncAction.SyncActionValue.PnForLidChatAction.encode(
                    message.pnForLidChatAction,
                    writer.uint32(298).fork()
                ).ldelim();
            if (
                message.marketingMessageAction != null &&
                Object.hasOwnProperty.call(message, "marketingMessageAction")
            )
                $root.SyncAction.SyncActionValue.MarketingMessageAction.encode(
                    message.marketingMessageAction,
                    writer.uint32(306).fork()
                ).ldelim();
            if (
                message.marketingMessageBroadcastAction != null &&
                Object.hasOwnProperty.call(message, "marketingMessageBroadcastAction")
            )
                $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction.encode(
                    message.marketingMessageBroadcastAction,
                    writer.uint32(314).fork()
                ).ldelim();
            if (
                message.externalWebBetaAction != null &&
                Object.hasOwnProperty.call(message, "externalWebBetaAction")
            )
                $root.SyncAction.SyncActionValue.ExternalWebBetaAction.encode(
                    message.externalWebBetaAction,
                    writer.uint32(322).fork()
                ).ldelim();
            if (
                message.privacySettingRelayAllCalls != null &&
                Object.hasOwnProperty.call(message, "privacySettingRelayAllCalls")
            )
                $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.encode(
                    message.privacySettingRelayAllCalls,
                    writer.uint32(330).fork()
                ).ldelim();
            if (
                message.callLogAction != null &&
                Object.hasOwnProperty.call(message, "callLogAction")
            )
                $root.SyncAction.SyncActionValue.CallLogAction.encode(
                    message.callLogAction,
                    writer.uint32(338).fork()
                ).ldelim();
            if (message.ugcBot != null && Object.hasOwnProperty.call(message, "ugcBot"))
                $root.SyncAction.SyncActionValue.UGCBot.encode(
                    message.ugcBot,
                    writer.uint32(346).fork()
                ).ldelim();
            if (
                message.statusPrivacy != null &&
                Object.hasOwnProperty.call(message, "statusPrivacy")
            )
                $root.SyncAction.SyncActionValue.StatusPrivacyAction.encode(
                    message.statusPrivacy,
                    writer.uint32(354).fork()
                ).ldelim();
            if (
                message.botWelcomeRequestAction != null &&
                Object.hasOwnProperty.call(message, "botWelcomeRequestAction")
            )
                $root.SyncAction.SyncActionValue.BotWelcomeRequestAction.encode(
                    message.botWelcomeRequestAction,
                    writer.uint32(362).fork()
                ).ldelim();
            if (
                message.deleteIndividualCallLog != null &&
                Object.hasOwnProperty.call(message, "deleteIndividualCallLog")
            )
                $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction.encode(
                    message.deleteIndividualCallLog,
                    writer.uint32(370).fork()
                ).ldelim();
            if (
                message.labelReorderingAction != null &&
                Object.hasOwnProperty.call(message, "labelReorderingAction")
            )
                $root.SyncAction.SyncActionValue.LabelReorderingAction.encode(
                    message.labelReorderingAction,
                    writer.uint32(378).fork()
                ).ldelim();
            if (
                message.paymentInfoAction != null &&
                Object.hasOwnProperty.call(message, "paymentInfoAction")
            )
                $root.SyncAction.SyncActionValue.PaymentInfoAction.encode(
                    message.paymentInfoAction,
                    writer.uint32(386).fork()
                ).ldelim();
            if (
                message.customPaymentMethodsAction != null &&
                Object.hasOwnProperty.call(message, "customPaymentMethodsAction")
            )
                $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction.encode(
                    message.customPaymentMethodsAction,
                    writer.uint32(394).fork()
                ).ldelim();
            if (
                message.lockChatAction != null &&
                Object.hasOwnProperty.call(message, "lockChatAction")
            )
                $root.SyncAction.SyncActionValue.LockChatAction.encode(
                    message.lockChatAction,
                    writer.uint32(402).fork()
                ).ldelim();
            if (
                message.chatLockSettings != null &&
                Object.hasOwnProperty.call(message, "chatLockSettings")
            )
                $root.ChatLockSettings.ChatLockSettings.encode(
                    message.chatLockSettings,
                    writer.uint32(410).fork()
                ).ldelim();
            if (
                message.wamoUserIdentifierAction != null &&
                Object.hasOwnProperty.call(message, "wamoUserIdentifierAction")
            )
                $root.SyncAction.SyncActionValue.WamoUserIdentifierAction.encode(
                    message.wamoUserIdentifierAction,
                    writer.uint32(418).fork()
                ).ldelim();
            if (
                message.privacySettingDisableLinkPreviewsAction != null &&
                Object.hasOwnProperty.call(message, "privacySettingDisableLinkPreviewsAction")
            )
                $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.encode(
                    message.privacySettingDisableLinkPreviewsAction,
                    writer.uint32(426).fork()
                ).ldelim();
            if (
                message.deviceCapabilities != null &&
                Object.hasOwnProperty.call(message, "deviceCapabilities")
            )
                $root.DeviceCapabilities.DeviceCapabilities.encode(
                    message.deviceCapabilities,
                    writer.uint32(434).fork()
                ).ldelim();
            if (
                message.noteEditAction != null &&
                Object.hasOwnProperty.call(message, "noteEditAction")
            )
                $root.SyncAction.SyncActionValue.NoteEditAction.encode(
                    message.noteEditAction,
                    writer.uint32(442).fork()
                ).ldelim();
            if (
                message.favoritesAction != null &&
                Object.hasOwnProperty.call(message, "favoritesAction")
            )
                $root.SyncAction.SyncActionValue.FavoritesAction.encode(
                    message.favoritesAction,
                    writer.uint32(450).fork()
                ).ldelim();
            if (
                message.merchantPaymentPartnerAction != null &&
                Object.hasOwnProperty.call(message, "merchantPaymentPartnerAction")
            )
                $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.encode(
                    message.merchantPaymentPartnerAction,
                    writer.uint32(458).fork()
                ).ldelim();
            if (
                message.waffleAccountLinkStateAction != null &&
                Object.hasOwnProperty.call(message, "waffleAccountLinkStateAction")
            )
                $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction.encode(
                    message.waffleAccountLinkStateAction,
                    writer.uint32(466).fork()
                ).ldelim();
            if (
                message.usernameChatStartMode != null &&
                Object.hasOwnProperty.call(message, "usernameChatStartMode")
            )
                $root.SyncAction.SyncActionValue.UsernameChatStartModeAction.encode(
                    message.usernameChatStartMode,
                    writer.uint32(474).fork()
                ).ldelim();
            if (
                message.notificationActivitySettingAction != null &&
                Object.hasOwnProperty.call(message, "notificationActivitySettingAction")
            )
                $root.SyncAction.SyncActionValue.NotificationActivitySettingAction.encode(
                    message.notificationActivitySettingAction,
                    writer.uint32(482).fork()
                ).ldelim();
            if (
                message.lidContactAction != null &&
                Object.hasOwnProperty.call(message, "lidContactAction")
            )
                $root.SyncAction.SyncActionValue.LidContactAction.encode(
                    message.lidContactAction,
                    writer.uint32(490).fork()
                ).ldelim();
            if (
                message.ctwaPerCustomerDataSharingAction != null &&
                Object.hasOwnProperty.call(message, "ctwaPerCustomerDataSharingAction")
            )
                $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.encode(
                    message.ctwaPerCustomerDataSharingAction,
                    writer.uint32(498).fork()
                ).ldelim();
            if (
                message.paymentTosAction != null &&
                Object.hasOwnProperty.call(message, "paymentTosAction")
            )
                $root.SyncAction.SyncActionValue.PaymentTosAction.encode(
                    message.paymentTosAction,
                    writer.uint32(506).fork()
                ).ldelim();
            if (
                message.privacySettingChannelsPersonalisedRecommendationAction != null &&
                Object.hasOwnProperty.call(
                    message,
                    "privacySettingChannelsPersonalisedRecommendationAction"
                )
            )
                $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.encode(
                    message.privacySettingChannelsPersonalisedRecommendationAction,
                    writer.uint32(514).fork()
                ).ldelim();
            if (
                message.detectedOutcomesStatusAction != null &&
                Object.hasOwnProperty.call(message, "detectedOutcomesStatusAction")
            )
                $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction.encode(
                    message.detectedOutcomesStatusAction,
                    writer.uint32(530).fork()
                ).ldelim();
            if (
                message.maibaAiFeaturesControlAction != null &&
                Object.hasOwnProperty.call(message, "maibaAiFeaturesControlAction")
            )
                $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.encode(
                    message.maibaAiFeaturesControlAction,
                    writer.uint32(546).fork()
                ).ldelim();
            if (
                message.businessBroadcastListAction != null &&
                Object.hasOwnProperty.call(message, "businessBroadcastListAction")
            )
                $root.SyncAction.SyncActionValue.BusinessBroadcastListAction.encode(
                    message.businessBroadcastListAction,
                    writer.uint32(554).fork()
                ).ldelim();
            if (
                message.musicUserIdAction != null &&
                Object.hasOwnProperty.call(message, "musicUserIdAction")
            )
                $root.SyncAction.SyncActionValue.MusicUserIdAction.encode(
                    message.musicUserIdAction,
                    writer.uint32(562).fork()
                ).ldelim();
            if (
                message.statusPostOptInNotificationPreferencesAction != null &&
                Object.hasOwnProperty.call(message, "statusPostOptInNotificationPreferencesAction")
            )
                $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.encode(
                    message.statusPostOptInNotificationPreferencesAction,
                    writer.uint32(570).fork()
                ).ldelim();
            if (
                message.avatarUpdatedAction != null &&
                Object.hasOwnProperty.call(message, "avatarUpdatedAction")
            )
                $root.SyncAction.SyncActionValue.AvatarUpdatedAction.encode(
                    message.avatarUpdatedAction,
                    writer.uint32(578).fork()
                ).ldelim();
            if (
                message.privateProcessingSettingAction != null &&
                Object.hasOwnProperty.call(message, "privateProcessingSettingAction")
            )
                $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction.encode(
                    message.privateProcessingSettingAction,
                    writer.uint32(594).fork()
                ).ldelim();
            if (
                message.newsletterSavedInterestsAction != null &&
                Object.hasOwnProperty.call(message, "newsletterSavedInterestsAction")
            )
                $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction.encode(
                    message.newsletterSavedInterestsAction,
                    writer.uint32(602).fork()
                ).ldelim();
            if (
                message.aiThreadRenameAction != null &&
                Object.hasOwnProperty.call(message, "aiThreadRenameAction")
            )
                $root.SyncAction.SyncActionValue.AiThreadRenameAction.encode(
                    message.aiThreadRenameAction,
                    writer.uint32(610).fork()
                ).ldelim();
            if (
                message.interactiveMessageAction != null &&
                Object.hasOwnProperty.call(message, "interactiveMessageAction")
            )
                $root.SyncAction.SyncActionValue.InteractiveMessageAction.encode(
                    message.interactiveMessageAction,
                    writer.uint32(618).fork()
                ).ldelim();
            if (
                message.settingsSyncAction != null &&
                Object.hasOwnProperty.call(message, "settingsSyncAction")
            )
                $root.SyncAction.SyncActionValue.SettingsSyncAction.encode(
                    message.settingsSyncAction,
                    writer.uint32(626).fork()
                ).ldelim();
            return writer;
        };
        SyncActionValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        SyncActionValue.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SyncAction.SyncActionValue();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.timestamp = reader.int64();
                        break;
                    }
                    case 2: {
                        message.starAction = $root.SyncAction.SyncActionValue.StarAction.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 3: {
                        message.contactAction =
                            $root.SyncAction.SyncActionValue.ContactAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 4: {
                        message.muteAction = $root.SyncAction.SyncActionValue.MuteAction.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 5: {
                        message.pinAction = $root.SyncAction.SyncActionValue.PinAction.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 7: {
                        message.pushNameSetting =
                            $root.SyncAction.SyncActionValue.PushNameSetting.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 8: {
                        message.quickReplyAction =
                            $root.SyncAction.SyncActionValue.QuickReplyAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 11: {
                        message.recentEmojiWeightsAction =
                            $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 14: {
                        message.labelEditAction =
                            $root.SyncAction.SyncActionValue.LabelEditAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 15: {
                        message.labelAssociationAction =
                            $root.SyncAction.SyncActionValue.LabelAssociationAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 16: {
                        message.localeSetting =
                            $root.SyncAction.SyncActionValue.LocaleSetting.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 17: {
                        message.archiveChatAction =
                            $root.SyncAction.SyncActionValue.ArchiveChatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 18: {
                        message.deleteMessageForMeAction =
                            $root.SyncAction.SyncActionValue.DeleteMessageForMeAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 19: {
                        message.keyExpiration =
                            $root.SyncAction.SyncActionValue.KeyExpiration.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 20: {
                        message.markChatAsReadAction =
                            $root.SyncAction.SyncActionValue.MarkChatAsReadAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 21: {
                        message.clearChatAction =
                            $root.SyncAction.SyncActionValue.ClearChatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 22: {
                        message.deleteChatAction =
                            $root.SyncAction.SyncActionValue.DeleteChatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 23: {
                        message.unarchiveChatsSetting =
                            $root.SyncAction.SyncActionValue.UnarchiveChatsSetting.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 24: {
                        message.primaryFeature =
                            $root.SyncAction.SyncActionValue.PrimaryFeature.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 26: {
                        message.androidUnsupportedActions =
                            $root.SyncAction.SyncActionValue.AndroidUnsupportedActions.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 27: {
                        message.agentAction = $root.SyncAction.SyncActionValue.AgentAction.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 28: {
                        message.subscriptionAction =
                            $root.SyncAction.SyncActionValue.SubscriptionAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 29: {
                        message.userStatusMuteAction =
                            $root.SyncAction.SyncActionValue.UserStatusMuteAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 30: {
                        message.timeFormatAction =
                            $root.SyncAction.SyncActionValue.TimeFormatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 31: {
                        message.nuxAction = $root.SyncAction.SyncActionValue.NuxAction.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 32: {
                        message.primaryVersionAction =
                            $root.SyncAction.SyncActionValue.PrimaryVersionAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 33: {
                        message.stickerAction =
                            $root.SyncAction.SyncActionValue.StickerAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 34: {
                        message.removeRecentStickerAction =
                            $root.SyncAction.SyncActionValue.RemoveRecentStickerAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 35: {
                        message.chatAssignment =
                            $root.SyncAction.SyncActionValue.ChatAssignmentAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 36: {
                        message.chatAssignmentOpenedStatus =
                            $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 37: {
                        message.pnForLidChatAction =
                            $root.SyncAction.SyncActionValue.PnForLidChatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 38: {
                        message.marketingMessageAction =
                            $root.SyncAction.SyncActionValue.MarketingMessageAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 39: {
                        message.marketingMessageBroadcastAction =
                            $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 40: {
                        message.externalWebBetaAction =
                            $root.SyncAction.SyncActionValue.ExternalWebBetaAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 41: {
                        message.privacySettingRelayAllCalls =
                            $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 42: {
                        message.callLogAction =
                            $root.SyncAction.SyncActionValue.CallLogAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 43: {
                        message.ugcBot = $root.SyncAction.SyncActionValue.UGCBot.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 44: {
                        message.statusPrivacy =
                            $root.SyncAction.SyncActionValue.StatusPrivacyAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 45: {
                        message.botWelcomeRequestAction =
                            $root.SyncAction.SyncActionValue.BotWelcomeRequestAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 46: {
                        message.deleteIndividualCallLog =
                            $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 47: {
                        message.labelReorderingAction =
                            $root.SyncAction.SyncActionValue.LabelReorderingAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 48: {
                        message.paymentInfoAction =
                            $root.SyncAction.SyncActionValue.PaymentInfoAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 49: {
                        message.customPaymentMethodsAction =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 50: {
                        message.lockChatAction =
                            $root.SyncAction.SyncActionValue.LockChatAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 51: {
                        message.chatLockSettings = $root.ChatLockSettings.ChatLockSettings.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 52: {
                        message.wamoUserIdentifierAction =
                            $root.SyncAction.SyncActionValue.WamoUserIdentifierAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 53: {
                        message.privacySettingDisableLinkPreviewsAction =
                            $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 54: {
                        message.deviceCapabilities =
                            $root.DeviceCapabilities.DeviceCapabilities.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 55: {
                        message.noteEditAction =
                            $root.SyncAction.SyncActionValue.NoteEditAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 56: {
                        message.favoritesAction =
                            $root.SyncAction.SyncActionValue.FavoritesAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 57: {
                        message.merchantPaymentPartnerAction =
                            $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 58: {
                        message.waffleAccountLinkStateAction =
                            $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 59: {
                        message.usernameChatStartMode =
                            $root.SyncAction.SyncActionValue.UsernameChatStartModeAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 60: {
                        message.notificationActivitySettingAction =
                            $root.SyncAction.SyncActionValue.NotificationActivitySettingAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 61: {
                        message.lidContactAction =
                            $root.SyncAction.SyncActionValue.LidContactAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 62: {
                        message.ctwaPerCustomerDataSharingAction =
                            $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 63: {
                        message.paymentTosAction =
                            $root.SyncAction.SyncActionValue.PaymentTosAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 64: {
                        message.privacySettingChannelsPersonalisedRecommendationAction =
                            $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 66: {
                        message.detectedOutcomesStatusAction =
                            $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 68: {
                        message.maibaAiFeaturesControlAction =
                            $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 69: {
                        message.businessBroadcastListAction =
                            $root.SyncAction.SyncActionValue.BusinessBroadcastListAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 70: {
                        message.musicUserIdAction =
                            $root.SyncAction.SyncActionValue.MusicUserIdAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 71: {
                        message.statusPostOptInNotificationPreferencesAction =
                            $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 72: {
                        message.avatarUpdatedAction =
                            $root.SyncAction.SyncActionValue.AvatarUpdatedAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 74: {
                        message.privateProcessingSettingAction =
                            $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 75: {
                        message.newsletterSavedInterestsAction =
                            $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 76: {
                        message.aiThreadRenameAction =
                            $root.SyncAction.SyncActionValue.AiThreadRenameAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 77: {
                        message.interactiveMessageAction =
                            $root.SyncAction.SyncActionValue.InteractiveMessageAction.decode(
                                reader,
                                reader.uint32()
                            );
                        break;
                    }
                    case 78: {
                        message.settingsSyncAction =
                            $root.SyncAction.SyncActionValue.SettingsSyncAction.decode(
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
        SyncActionValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        SyncActionValue.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
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
            if (message.starAction != null && message.hasOwnProperty("starAction")) {
                properties._starAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.StarAction.verify(
                        message.starAction
                    );
                    if (error) return "starAction." + error;
                }
            }
            if (message.contactAction != null && message.hasOwnProperty("contactAction")) {
                properties._contactAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.ContactAction.verify(
                        message.contactAction
                    );
                    if (error) return "contactAction." + error;
                }
            }
            if (message.muteAction != null && message.hasOwnProperty("muteAction")) {
                properties._muteAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.MuteAction.verify(
                        message.muteAction
                    );
                    if (error) return "muteAction." + error;
                }
            }
            if (message.pinAction != null && message.hasOwnProperty("pinAction")) {
                properties._pinAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PinAction.verify(
                        message.pinAction
                    );
                    if (error) return "pinAction." + error;
                }
            }
            if (message.pushNameSetting != null && message.hasOwnProperty("pushNameSetting")) {
                properties._pushNameSetting = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PushNameSetting.verify(
                        message.pushNameSetting
                    );
                    if (error) return "pushNameSetting." + error;
                }
            }
            if (message.quickReplyAction != null && message.hasOwnProperty("quickReplyAction")) {
                properties._quickReplyAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.QuickReplyAction.verify(
                        message.quickReplyAction
                    );
                    if (error) return "quickReplyAction." + error;
                }
            }
            if (
                message.recentEmojiWeightsAction != null &&
                message.hasOwnProperty("recentEmojiWeightsAction")
            ) {
                properties._recentEmojiWeightsAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction.verify(
                        message.recentEmojiWeightsAction
                    );
                    if (error) return "recentEmojiWeightsAction." + error;
                }
            }
            if (message.labelEditAction != null && message.hasOwnProperty("labelEditAction")) {
                properties._labelEditAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LabelEditAction.verify(
                        message.labelEditAction
                    );
                    if (error) return "labelEditAction." + error;
                }
            }
            if (
                message.labelAssociationAction != null &&
                message.hasOwnProperty("labelAssociationAction")
            ) {
                properties._labelAssociationAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LabelAssociationAction.verify(
                        message.labelAssociationAction
                    );
                    if (error) return "labelAssociationAction." + error;
                }
            }
            if (message.localeSetting != null && message.hasOwnProperty("localeSetting")) {
                properties._localeSetting = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LocaleSetting.verify(
                        message.localeSetting
                    );
                    if (error) return "localeSetting." + error;
                }
            }
            if (message.archiveChatAction != null && message.hasOwnProperty("archiveChatAction")) {
                properties._archiveChatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.ArchiveChatAction.verify(
                        message.archiveChatAction
                    );
                    if (error) return "archiveChatAction." + error;
                }
            }
            if (
                message.deleteMessageForMeAction != null &&
                message.hasOwnProperty("deleteMessageForMeAction")
            ) {
                properties._deleteMessageForMeAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.DeleteMessageForMeAction.verify(
                        message.deleteMessageForMeAction
                    );
                    if (error) return "deleteMessageForMeAction." + error;
                }
            }
            if (message.keyExpiration != null && message.hasOwnProperty("keyExpiration")) {
                properties._keyExpiration = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.KeyExpiration.verify(
                        message.keyExpiration
                    );
                    if (error) return "keyExpiration." + error;
                }
            }
            if (
                message.markChatAsReadAction != null &&
                message.hasOwnProperty("markChatAsReadAction")
            ) {
                properties._markChatAsReadAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.MarkChatAsReadAction.verify(
                        message.markChatAsReadAction
                    );
                    if (error) return "markChatAsReadAction." + error;
                }
            }
            if (message.clearChatAction != null && message.hasOwnProperty("clearChatAction")) {
                properties._clearChatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.ClearChatAction.verify(
                        message.clearChatAction
                    );
                    if (error) return "clearChatAction." + error;
                }
            }
            if (message.deleteChatAction != null && message.hasOwnProperty("deleteChatAction")) {
                properties._deleteChatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.DeleteChatAction.verify(
                        message.deleteChatAction
                    );
                    if (error) return "deleteChatAction." + error;
                }
            }
            if (
                message.unarchiveChatsSetting != null &&
                message.hasOwnProperty("unarchiveChatsSetting")
            ) {
                properties._unarchiveChatsSetting = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.UnarchiveChatsSetting.verify(
                        message.unarchiveChatsSetting
                    );
                    if (error) return "unarchiveChatsSetting." + error;
                }
            }
            if (message.primaryFeature != null && message.hasOwnProperty("primaryFeature")) {
                properties._primaryFeature = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PrimaryFeature.verify(
                        message.primaryFeature
                    );
                    if (error) return "primaryFeature." + error;
                }
            }
            if (
                message.androidUnsupportedActions != null &&
                message.hasOwnProperty("androidUnsupportedActions")
            ) {
                properties._androidUnsupportedActions = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.AndroidUnsupportedActions.verify(
                        message.androidUnsupportedActions
                    );
                    if (error) return "androidUnsupportedActions." + error;
                }
            }
            if (message.agentAction != null && message.hasOwnProperty("agentAction")) {
                properties._agentAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.AgentAction.verify(
                        message.agentAction
                    );
                    if (error) return "agentAction." + error;
                }
            }
            if (
                message.subscriptionAction != null &&
                message.hasOwnProperty("subscriptionAction")
            ) {
                properties._subscriptionAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.SubscriptionAction.verify(
                        message.subscriptionAction
                    );
                    if (error) return "subscriptionAction." + error;
                }
            }
            if (
                message.userStatusMuteAction != null &&
                message.hasOwnProperty("userStatusMuteAction")
            ) {
                properties._userStatusMuteAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.UserStatusMuteAction.verify(
                        message.userStatusMuteAction
                    );
                    if (error) return "userStatusMuteAction." + error;
                }
            }
            if (message.timeFormatAction != null && message.hasOwnProperty("timeFormatAction")) {
                properties._timeFormatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.TimeFormatAction.verify(
                        message.timeFormatAction
                    );
                    if (error) return "timeFormatAction." + error;
                }
            }
            if (message.nuxAction != null && message.hasOwnProperty("nuxAction")) {
                properties._nuxAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.NuxAction.verify(
                        message.nuxAction
                    );
                    if (error) return "nuxAction." + error;
                }
            }
            if (
                message.primaryVersionAction != null &&
                message.hasOwnProperty("primaryVersionAction")
            ) {
                properties._primaryVersionAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PrimaryVersionAction.verify(
                        message.primaryVersionAction
                    );
                    if (error) return "primaryVersionAction." + error;
                }
            }
            if (message.stickerAction != null && message.hasOwnProperty("stickerAction")) {
                properties._stickerAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.StickerAction.verify(
                        message.stickerAction
                    );
                    if (error) return "stickerAction." + error;
                }
            }
            if (
                message.removeRecentStickerAction != null &&
                message.hasOwnProperty("removeRecentStickerAction")
            ) {
                properties._removeRecentStickerAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.RemoveRecentStickerAction.verify(
                        message.removeRecentStickerAction
                    );
                    if (error) return "removeRecentStickerAction." + error;
                }
            }
            if (message.chatAssignment != null && message.hasOwnProperty("chatAssignment")) {
                properties._chatAssignment = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.ChatAssignmentAction.verify(
                        message.chatAssignment
                    );
                    if (error) return "chatAssignment." + error;
                }
            }
            if (
                message.chatAssignmentOpenedStatus != null &&
                message.hasOwnProperty("chatAssignmentOpenedStatus")
            ) {
                properties._chatAssignmentOpenedStatus = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.verify(
                            message.chatAssignmentOpenedStatus
                        );
                    if (error) return "chatAssignmentOpenedStatus." + error;
                }
            }
            if (
                message.pnForLidChatAction != null &&
                message.hasOwnProperty("pnForLidChatAction")
            ) {
                properties._pnForLidChatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PnForLidChatAction.verify(
                        message.pnForLidChatAction
                    );
                    if (error) return "pnForLidChatAction." + error;
                }
            }
            if (
                message.marketingMessageAction != null &&
                message.hasOwnProperty("marketingMessageAction")
            ) {
                properties._marketingMessageAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.MarketingMessageAction.verify(
                        message.marketingMessageAction
                    );
                    if (error) return "marketingMessageAction." + error;
                }
            }
            if (
                message.marketingMessageBroadcastAction != null &&
                message.hasOwnProperty("marketingMessageBroadcastAction")
            ) {
                properties._marketingMessageBroadcastAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction.verify(
                            message.marketingMessageBroadcastAction
                        );
                    if (error) return "marketingMessageBroadcastAction." + error;
                }
            }
            if (
                message.externalWebBetaAction != null &&
                message.hasOwnProperty("externalWebBetaAction")
            ) {
                properties._externalWebBetaAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.ExternalWebBetaAction.verify(
                        message.externalWebBetaAction
                    );
                    if (error) return "externalWebBetaAction." + error;
                }
            }
            if (
                message.privacySettingRelayAllCalls != null &&
                message.hasOwnProperty("privacySettingRelayAllCalls")
            ) {
                properties._privacySettingRelayAllCalls = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.verify(
                        message.privacySettingRelayAllCalls
                    );
                    if (error) return "privacySettingRelayAllCalls." + error;
                }
            }
            if (message.callLogAction != null && message.hasOwnProperty("callLogAction")) {
                properties._callLogAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.CallLogAction.verify(
                        message.callLogAction
                    );
                    if (error) return "callLogAction." + error;
                }
            }
            if (message.ugcBot != null && message.hasOwnProperty("ugcBot")) {
                properties._ugcBot = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.UGCBot.verify(message.ugcBot);
                    if (error) return "ugcBot." + error;
                }
            }
            if (message.statusPrivacy != null && message.hasOwnProperty("statusPrivacy")) {
                properties._statusPrivacy = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.StatusPrivacyAction.verify(
                        message.statusPrivacy
                    );
                    if (error) return "statusPrivacy." + error;
                }
            }
            if (
                message.botWelcomeRequestAction != null &&
                message.hasOwnProperty("botWelcomeRequestAction")
            ) {
                properties._botWelcomeRequestAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.BotWelcomeRequestAction.verify(
                        message.botWelcomeRequestAction
                    );
                    if (error) return "botWelcomeRequestAction." + error;
                }
            }
            if (
                message.deleteIndividualCallLog != null &&
                message.hasOwnProperty("deleteIndividualCallLog")
            ) {
                properties._deleteIndividualCallLog = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction.verify(
                            message.deleteIndividualCallLog
                        );
                    if (error) return "deleteIndividualCallLog." + error;
                }
            }
            if (
                message.labelReorderingAction != null &&
                message.hasOwnProperty("labelReorderingAction")
            ) {
                properties._labelReorderingAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LabelReorderingAction.verify(
                        message.labelReorderingAction
                    );
                    if (error) return "labelReorderingAction." + error;
                }
            }
            if (message.paymentInfoAction != null && message.hasOwnProperty("paymentInfoAction")) {
                properties._paymentInfoAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PaymentInfoAction.verify(
                        message.paymentInfoAction
                    );
                    if (error) return "paymentInfoAction." + error;
                }
            }
            if (
                message.customPaymentMethodsAction != null &&
                message.hasOwnProperty("customPaymentMethodsAction")
            ) {
                properties._customPaymentMethodsAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction.verify(
                        message.customPaymentMethodsAction
                    );
                    if (error) return "customPaymentMethodsAction." + error;
                }
            }
            if (message.lockChatAction != null && message.hasOwnProperty("lockChatAction")) {
                properties._lockChatAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LockChatAction.verify(
                        message.lockChatAction
                    );
                    if (error) return "lockChatAction." + error;
                }
            }
            if (message.chatLockSettings != null && message.hasOwnProperty("chatLockSettings")) {
                properties._chatLockSettings = 1;
                {
                    var error = $root.ChatLockSettings.ChatLockSettings.verify(
                        message.chatLockSettings
                    );
                    if (error) return "chatLockSettings." + error;
                }
            }
            if (
                message.wamoUserIdentifierAction != null &&
                message.hasOwnProperty("wamoUserIdentifierAction")
            ) {
                properties._wamoUserIdentifierAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.WamoUserIdentifierAction.verify(
                        message.wamoUserIdentifierAction
                    );
                    if (error) return "wamoUserIdentifierAction." + error;
                }
            }
            if (
                message.privacySettingDisableLinkPreviewsAction != null &&
                message.hasOwnProperty("privacySettingDisableLinkPreviewsAction")
            ) {
                properties._privacySettingDisableLinkPreviewsAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.verify(
                            message.privacySettingDisableLinkPreviewsAction
                        );
                    if (error) return "privacySettingDisableLinkPreviewsAction." + error;
                }
            }
            if (
                message.deviceCapabilities != null &&
                message.hasOwnProperty("deviceCapabilities")
            ) {
                properties._deviceCapabilities = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.verify(
                        message.deviceCapabilities
                    );
                    if (error) return "deviceCapabilities." + error;
                }
            }
            if (message.noteEditAction != null && message.hasOwnProperty("noteEditAction")) {
                properties._noteEditAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.NoteEditAction.verify(
                        message.noteEditAction
                    );
                    if (error) return "noteEditAction." + error;
                }
            }
            if (message.favoritesAction != null && message.hasOwnProperty("favoritesAction")) {
                properties._favoritesAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.FavoritesAction.verify(
                        message.favoritesAction
                    );
                    if (error) return "favoritesAction." + error;
                }
            }
            if (
                message.merchantPaymentPartnerAction != null &&
                message.hasOwnProperty("merchantPaymentPartnerAction")
            ) {
                properties._merchantPaymentPartnerAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.verify(
                            message.merchantPaymentPartnerAction
                        );
                    if (error) return "merchantPaymentPartnerAction." + error;
                }
            }
            if (
                message.waffleAccountLinkStateAction != null &&
                message.hasOwnProperty("waffleAccountLinkStateAction")
            ) {
                properties._waffleAccountLinkStateAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction.verify(
                            message.waffleAccountLinkStateAction
                        );
                    if (error) return "waffleAccountLinkStateAction." + error;
                }
            }
            if (
                message.usernameChatStartMode != null &&
                message.hasOwnProperty("usernameChatStartMode")
            ) {
                properties._usernameChatStartMode = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.UsernameChatStartModeAction.verify(
                        message.usernameChatStartMode
                    );
                    if (error) return "usernameChatStartMode." + error;
                }
            }
            if (
                message.notificationActivitySettingAction != null &&
                message.hasOwnProperty("notificationActivitySettingAction")
            ) {
                properties._notificationActivitySettingAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.NotificationActivitySettingAction.verify(
                            message.notificationActivitySettingAction
                        );
                    if (error) return "notificationActivitySettingAction." + error;
                }
            }
            if (message.lidContactAction != null && message.hasOwnProperty("lidContactAction")) {
                properties._lidContactAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.LidContactAction.verify(
                        message.lidContactAction
                    );
                    if (error) return "lidContactAction." + error;
                }
            }
            if (
                message.ctwaPerCustomerDataSharingAction != null &&
                message.hasOwnProperty("ctwaPerCustomerDataSharingAction")
            ) {
                properties._ctwaPerCustomerDataSharingAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.verify(
                            message.ctwaPerCustomerDataSharingAction
                        );
                    if (error) return "ctwaPerCustomerDataSharingAction." + error;
                }
            }
            if (message.paymentTosAction != null && message.hasOwnProperty("paymentTosAction")) {
                properties._paymentTosAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.PaymentTosAction.verify(
                        message.paymentTosAction
                    );
                    if (error) return "paymentTosAction." + error;
                }
            }
            if (
                message.privacySettingChannelsPersonalisedRecommendationAction != null &&
                message.hasOwnProperty("privacySettingChannelsPersonalisedRecommendationAction")
            ) {
                properties._privacySettingChannelsPersonalisedRecommendationAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.verify(
                            message.privacySettingChannelsPersonalisedRecommendationAction
                        );
                    if (error)
                        return "privacySettingChannelsPersonalisedRecommendationAction." + error;
                }
            }
            if (
                message.detectedOutcomesStatusAction != null &&
                message.hasOwnProperty("detectedOutcomesStatusAction")
            ) {
                properties._detectedOutcomesStatusAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction.verify(
                            message.detectedOutcomesStatusAction
                        );
                    if (error) return "detectedOutcomesStatusAction." + error;
                }
            }
            if (
                message.maibaAiFeaturesControlAction != null &&
                message.hasOwnProperty("maibaAiFeaturesControlAction")
            ) {
                properties._maibaAiFeaturesControlAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.verify(
                            message.maibaAiFeaturesControlAction
                        );
                    if (error) return "maibaAiFeaturesControlAction." + error;
                }
            }
            if (
                message.businessBroadcastListAction != null &&
                message.hasOwnProperty("businessBroadcastListAction")
            ) {
                properties._businessBroadcastListAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.BusinessBroadcastListAction.verify(
                        message.businessBroadcastListAction
                    );
                    if (error) return "businessBroadcastListAction." + error;
                }
            }
            if (message.musicUserIdAction != null && message.hasOwnProperty("musicUserIdAction")) {
                properties._musicUserIdAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.MusicUserIdAction.verify(
                        message.musicUserIdAction
                    );
                    if (error) return "musicUserIdAction." + error;
                }
            }
            if (
                message.statusPostOptInNotificationPreferencesAction != null &&
                message.hasOwnProperty("statusPostOptInNotificationPreferencesAction")
            ) {
                properties._statusPostOptInNotificationPreferencesAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.verify(
                            message.statusPostOptInNotificationPreferencesAction
                        );
                    if (error) return "statusPostOptInNotificationPreferencesAction." + error;
                }
            }
            if (
                message.avatarUpdatedAction != null &&
                message.hasOwnProperty("avatarUpdatedAction")
            ) {
                properties._avatarUpdatedAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.AvatarUpdatedAction.verify(
                        message.avatarUpdatedAction
                    );
                    if (error) return "avatarUpdatedAction." + error;
                }
            }
            if (
                message.privateProcessingSettingAction != null &&
                message.hasOwnProperty("privateProcessingSettingAction")
            ) {
                properties._privateProcessingSettingAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction.verify(
                            message.privateProcessingSettingAction
                        );
                    if (error) return "privateProcessingSettingAction." + error;
                }
            }
            if (
                message.newsletterSavedInterestsAction != null &&
                message.hasOwnProperty("newsletterSavedInterestsAction")
            ) {
                properties._newsletterSavedInterestsAction = 1;
                {
                    var error =
                        $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction.verify(
                            message.newsletterSavedInterestsAction
                        );
                    if (error) return "newsletterSavedInterestsAction." + error;
                }
            }
            if (
                message.aiThreadRenameAction != null &&
                message.hasOwnProperty("aiThreadRenameAction")
            ) {
                properties._aiThreadRenameAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.AiThreadRenameAction.verify(
                        message.aiThreadRenameAction
                    );
                    if (error) return "aiThreadRenameAction." + error;
                }
            }
            if (
                message.interactiveMessageAction != null &&
                message.hasOwnProperty("interactiveMessageAction")
            ) {
                properties._interactiveMessageAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.InteractiveMessageAction.verify(
                        message.interactiveMessageAction
                    );
                    if (error) return "interactiveMessageAction." + error;
                }
            }
            if (
                message.settingsSyncAction != null &&
                message.hasOwnProperty("settingsSyncAction")
            ) {
                properties._settingsSyncAction = 1;
                {
                    var error = $root.SyncAction.SyncActionValue.SettingsSyncAction.verify(
                        message.settingsSyncAction
                    );
                    if (error) return "settingsSyncAction." + error;
                }
            }
            return null;
        };
        SyncActionValue.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncAction.SyncActionValue) return object;
            var message = new $root.SyncAction.SyncActionValue();
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
            if (object.starAction != null) {
                if (typeof object.starAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.starAction: object expected");
                message.starAction = $root.SyncAction.SyncActionValue.StarAction.fromObject(
                    object.starAction
                );
            }
            if (object.contactAction != null) {
                if (typeof object.contactAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.contactAction: object expected");
                message.contactAction = $root.SyncAction.SyncActionValue.ContactAction.fromObject(
                    object.contactAction
                );
            }
            if (object.muteAction != null) {
                if (typeof object.muteAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.muteAction: object expected");
                message.muteAction = $root.SyncAction.SyncActionValue.MuteAction.fromObject(
                    object.muteAction
                );
            }
            if (object.pinAction != null) {
                if (typeof object.pinAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.pinAction: object expected");
                message.pinAction = $root.SyncAction.SyncActionValue.PinAction.fromObject(
                    object.pinAction
                );
            }
            if (object.pushNameSetting != null) {
                if (typeof object.pushNameSetting !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.pushNameSetting: object expected");
                message.pushNameSetting =
                    $root.SyncAction.SyncActionValue.PushNameSetting.fromObject(
                        object.pushNameSetting
                    );
            }
            if (object.quickReplyAction != null) {
                if (typeof object.quickReplyAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.quickReplyAction: object expected"
                    );
                message.quickReplyAction =
                    $root.SyncAction.SyncActionValue.QuickReplyAction.fromObject(
                        object.quickReplyAction
                    );
            }
            if (object.recentEmojiWeightsAction != null) {
                if (typeof object.recentEmojiWeightsAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.recentEmojiWeightsAction: object expected"
                    );
                message.recentEmojiWeightsAction =
                    $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction.fromObject(
                        object.recentEmojiWeightsAction
                    );
            }
            if (object.labelEditAction != null) {
                if (typeof object.labelEditAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.labelEditAction: object expected");
                message.labelEditAction =
                    $root.SyncAction.SyncActionValue.LabelEditAction.fromObject(
                        object.labelEditAction
                    );
            }
            if (object.labelAssociationAction != null) {
                if (typeof object.labelAssociationAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.labelAssociationAction: object expected"
                    );
                message.labelAssociationAction =
                    $root.SyncAction.SyncActionValue.LabelAssociationAction.fromObject(
                        object.labelAssociationAction
                    );
            }
            if (object.localeSetting != null) {
                if (typeof object.localeSetting !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.localeSetting: object expected");
                message.localeSetting = $root.SyncAction.SyncActionValue.LocaleSetting.fromObject(
                    object.localeSetting
                );
            }
            if (object.archiveChatAction != null) {
                if (typeof object.archiveChatAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.archiveChatAction: object expected"
                    );
                message.archiveChatAction =
                    $root.SyncAction.SyncActionValue.ArchiveChatAction.fromObject(
                        object.archiveChatAction
                    );
            }
            if (object.deleteMessageForMeAction != null) {
                if (typeof object.deleteMessageForMeAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.deleteMessageForMeAction: object expected"
                    );
                message.deleteMessageForMeAction =
                    $root.SyncAction.SyncActionValue.DeleteMessageForMeAction.fromObject(
                        object.deleteMessageForMeAction
                    );
            }
            if (object.keyExpiration != null) {
                if (typeof object.keyExpiration !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.keyExpiration: object expected");
                message.keyExpiration = $root.SyncAction.SyncActionValue.KeyExpiration.fromObject(
                    object.keyExpiration
                );
            }
            if (object.markChatAsReadAction != null) {
                if (typeof object.markChatAsReadAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.markChatAsReadAction: object expected"
                    );
                message.markChatAsReadAction =
                    $root.SyncAction.SyncActionValue.MarkChatAsReadAction.fromObject(
                        object.markChatAsReadAction
                    );
            }
            if (object.clearChatAction != null) {
                if (typeof object.clearChatAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.clearChatAction: object expected");
                message.clearChatAction =
                    $root.SyncAction.SyncActionValue.ClearChatAction.fromObject(
                        object.clearChatAction
                    );
            }
            if (object.deleteChatAction != null) {
                if (typeof object.deleteChatAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.deleteChatAction: object expected"
                    );
                message.deleteChatAction =
                    $root.SyncAction.SyncActionValue.DeleteChatAction.fromObject(
                        object.deleteChatAction
                    );
            }
            if (object.unarchiveChatsSetting != null) {
                if (typeof object.unarchiveChatsSetting !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.unarchiveChatsSetting: object expected"
                    );
                message.unarchiveChatsSetting =
                    $root.SyncAction.SyncActionValue.UnarchiveChatsSetting.fromObject(
                        object.unarchiveChatsSetting
                    );
            }
            if (object.primaryFeature != null) {
                if (typeof object.primaryFeature !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.primaryFeature: object expected");
                message.primaryFeature = $root.SyncAction.SyncActionValue.PrimaryFeature.fromObject(
                    object.primaryFeature
                );
            }
            if (object.androidUnsupportedActions != null) {
                if (typeof object.androidUnsupportedActions !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.androidUnsupportedActions: object expected"
                    );
                message.androidUnsupportedActions =
                    $root.SyncAction.SyncActionValue.AndroidUnsupportedActions.fromObject(
                        object.androidUnsupportedActions
                    );
            }
            if (object.agentAction != null) {
                if (typeof object.agentAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.agentAction: object expected");
                message.agentAction = $root.SyncAction.SyncActionValue.AgentAction.fromObject(
                    object.agentAction
                );
            }
            if (object.subscriptionAction != null) {
                if (typeof object.subscriptionAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.subscriptionAction: object expected"
                    );
                message.subscriptionAction =
                    $root.SyncAction.SyncActionValue.SubscriptionAction.fromObject(
                        object.subscriptionAction
                    );
            }
            if (object.userStatusMuteAction != null) {
                if (typeof object.userStatusMuteAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.userStatusMuteAction: object expected"
                    );
                message.userStatusMuteAction =
                    $root.SyncAction.SyncActionValue.UserStatusMuteAction.fromObject(
                        object.userStatusMuteAction
                    );
            }
            if (object.timeFormatAction != null) {
                if (typeof object.timeFormatAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.timeFormatAction: object expected"
                    );
                message.timeFormatAction =
                    $root.SyncAction.SyncActionValue.TimeFormatAction.fromObject(
                        object.timeFormatAction
                    );
            }
            if (object.nuxAction != null) {
                if (typeof object.nuxAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.nuxAction: object expected");
                message.nuxAction = $root.SyncAction.SyncActionValue.NuxAction.fromObject(
                    object.nuxAction
                );
            }
            if (object.primaryVersionAction != null) {
                if (typeof object.primaryVersionAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.primaryVersionAction: object expected"
                    );
                message.primaryVersionAction =
                    $root.SyncAction.SyncActionValue.PrimaryVersionAction.fromObject(
                        object.primaryVersionAction
                    );
            }
            if (object.stickerAction != null) {
                if (typeof object.stickerAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.stickerAction: object expected");
                message.stickerAction = $root.SyncAction.SyncActionValue.StickerAction.fromObject(
                    object.stickerAction
                );
            }
            if (object.removeRecentStickerAction != null) {
                if (typeof object.removeRecentStickerAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.removeRecentStickerAction: object expected"
                    );
                message.removeRecentStickerAction =
                    $root.SyncAction.SyncActionValue.RemoveRecentStickerAction.fromObject(
                        object.removeRecentStickerAction
                    );
            }
            if (object.chatAssignment != null) {
                if (typeof object.chatAssignment !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.chatAssignment: object expected");
                message.chatAssignment =
                    $root.SyncAction.SyncActionValue.ChatAssignmentAction.fromObject(
                        object.chatAssignment
                    );
            }
            if (object.chatAssignmentOpenedStatus != null) {
                if (typeof object.chatAssignmentOpenedStatus !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.chatAssignmentOpenedStatus: object expected"
                    );
                message.chatAssignmentOpenedStatus =
                    $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.fromObject(
                        object.chatAssignmentOpenedStatus
                    );
            }
            if (object.pnForLidChatAction != null) {
                if (typeof object.pnForLidChatAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.pnForLidChatAction: object expected"
                    );
                message.pnForLidChatAction =
                    $root.SyncAction.SyncActionValue.PnForLidChatAction.fromObject(
                        object.pnForLidChatAction
                    );
            }
            if (object.marketingMessageAction != null) {
                if (typeof object.marketingMessageAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.marketingMessageAction: object expected"
                    );
                message.marketingMessageAction =
                    $root.SyncAction.SyncActionValue.MarketingMessageAction.fromObject(
                        object.marketingMessageAction
                    );
            }
            if (object.marketingMessageBroadcastAction != null) {
                if (typeof object.marketingMessageBroadcastAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.marketingMessageBroadcastAction: object expected"
                    );
                message.marketingMessageBroadcastAction =
                    $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction.fromObject(
                        object.marketingMessageBroadcastAction
                    );
            }
            if (object.externalWebBetaAction != null) {
                if (typeof object.externalWebBetaAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.externalWebBetaAction: object expected"
                    );
                message.externalWebBetaAction =
                    $root.SyncAction.SyncActionValue.ExternalWebBetaAction.fromObject(
                        object.externalWebBetaAction
                    );
            }
            if (object.privacySettingRelayAllCalls != null) {
                if (typeof object.privacySettingRelayAllCalls !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.privacySettingRelayAllCalls: object expected"
                    );
                message.privacySettingRelayAllCalls =
                    $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.fromObject(
                        object.privacySettingRelayAllCalls
                    );
            }
            if (object.callLogAction != null) {
                if (typeof object.callLogAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.callLogAction: object expected");
                message.callLogAction = $root.SyncAction.SyncActionValue.CallLogAction.fromObject(
                    object.callLogAction
                );
            }
            if (object.ugcBot != null) {
                if (typeof object.ugcBot !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.ugcBot: object expected");
                message.ugcBot = $root.SyncAction.SyncActionValue.UGCBot.fromObject(object.ugcBot);
            }
            if (object.statusPrivacy != null) {
                if (typeof object.statusPrivacy !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.statusPrivacy: object expected");
                message.statusPrivacy =
                    $root.SyncAction.SyncActionValue.StatusPrivacyAction.fromObject(
                        object.statusPrivacy
                    );
            }
            if (object.botWelcomeRequestAction != null) {
                if (typeof object.botWelcomeRequestAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.botWelcomeRequestAction: object expected"
                    );
                message.botWelcomeRequestAction =
                    $root.SyncAction.SyncActionValue.BotWelcomeRequestAction.fromObject(
                        object.botWelcomeRequestAction
                    );
            }
            if (object.deleteIndividualCallLog != null) {
                if (typeof object.deleteIndividualCallLog !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.deleteIndividualCallLog: object expected"
                    );
                message.deleteIndividualCallLog =
                    $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction.fromObject(
                        object.deleteIndividualCallLog
                    );
            }
            if (object.labelReorderingAction != null) {
                if (typeof object.labelReorderingAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.labelReorderingAction: object expected"
                    );
                message.labelReorderingAction =
                    $root.SyncAction.SyncActionValue.LabelReorderingAction.fromObject(
                        object.labelReorderingAction
                    );
            }
            if (object.paymentInfoAction != null) {
                if (typeof object.paymentInfoAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.paymentInfoAction: object expected"
                    );
                message.paymentInfoAction =
                    $root.SyncAction.SyncActionValue.PaymentInfoAction.fromObject(
                        object.paymentInfoAction
                    );
            }
            if (object.customPaymentMethodsAction != null) {
                if (typeof object.customPaymentMethodsAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.customPaymentMethodsAction: object expected"
                    );
                message.customPaymentMethodsAction =
                    $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction.fromObject(
                        object.customPaymentMethodsAction
                    );
            }
            if (object.lockChatAction != null) {
                if (typeof object.lockChatAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.lockChatAction: object expected");
                message.lockChatAction = $root.SyncAction.SyncActionValue.LockChatAction.fromObject(
                    object.lockChatAction
                );
            }
            if (object.chatLockSettings != null) {
                if (typeof object.chatLockSettings !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.chatLockSettings: object expected"
                    );
                message.chatLockSettings = $root.ChatLockSettings.ChatLockSettings.fromObject(
                    object.chatLockSettings
                );
            }
            if (object.wamoUserIdentifierAction != null) {
                if (typeof object.wamoUserIdentifierAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.wamoUserIdentifierAction: object expected"
                    );
                message.wamoUserIdentifierAction =
                    $root.SyncAction.SyncActionValue.WamoUserIdentifierAction.fromObject(
                        object.wamoUserIdentifierAction
                    );
            }
            if (object.privacySettingDisableLinkPreviewsAction != null) {
                if (typeof object.privacySettingDisableLinkPreviewsAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.privacySettingDisableLinkPreviewsAction: object expected"
                    );
                message.privacySettingDisableLinkPreviewsAction =
                    $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.fromObject(
                        object.privacySettingDisableLinkPreviewsAction
                    );
            }
            if (object.deviceCapabilities != null) {
                if (typeof object.deviceCapabilities !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.deviceCapabilities: object expected"
                    );
                message.deviceCapabilities = $root.DeviceCapabilities.DeviceCapabilities.fromObject(
                    object.deviceCapabilities
                );
            }
            if (object.noteEditAction != null) {
                if (typeof object.noteEditAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.noteEditAction: object expected");
                message.noteEditAction = $root.SyncAction.SyncActionValue.NoteEditAction.fromObject(
                    object.noteEditAction
                );
            }
            if (object.favoritesAction != null) {
                if (typeof object.favoritesAction !== "object")
                    throw TypeError(".SyncAction.SyncActionValue.favoritesAction: object expected");
                message.favoritesAction =
                    $root.SyncAction.SyncActionValue.FavoritesAction.fromObject(
                        object.favoritesAction
                    );
            }
            if (object.merchantPaymentPartnerAction != null) {
                if (typeof object.merchantPaymentPartnerAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.merchantPaymentPartnerAction: object expected"
                    );
                message.merchantPaymentPartnerAction =
                    $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.fromObject(
                        object.merchantPaymentPartnerAction
                    );
            }
            if (object.waffleAccountLinkStateAction != null) {
                if (typeof object.waffleAccountLinkStateAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.waffleAccountLinkStateAction: object expected"
                    );
                message.waffleAccountLinkStateAction =
                    $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction.fromObject(
                        object.waffleAccountLinkStateAction
                    );
            }
            if (object.usernameChatStartMode != null) {
                if (typeof object.usernameChatStartMode !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.usernameChatStartMode: object expected"
                    );
                message.usernameChatStartMode =
                    $root.SyncAction.SyncActionValue.UsernameChatStartModeAction.fromObject(
                        object.usernameChatStartMode
                    );
            }
            if (object.notificationActivitySettingAction != null) {
                if (typeof object.notificationActivitySettingAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.notificationActivitySettingAction: object expected"
                    );
                message.notificationActivitySettingAction =
                    $root.SyncAction.SyncActionValue.NotificationActivitySettingAction.fromObject(
                        object.notificationActivitySettingAction
                    );
            }
            if (object.lidContactAction != null) {
                if (typeof object.lidContactAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.lidContactAction: object expected"
                    );
                message.lidContactAction =
                    $root.SyncAction.SyncActionValue.LidContactAction.fromObject(
                        object.lidContactAction
                    );
            }
            if (object.ctwaPerCustomerDataSharingAction != null) {
                if (typeof object.ctwaPerCustomerDataSharingAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.ctwaPerCustomerDataSharingAction: object expected"
                    );
                message.ctwaPerCustomerDataSharingAction =
                    $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.fromObject(
                        object.ctwaPerCustomerDataSharingAction
                    );
            }
            if (object.paymentTosAction != null) {
                if (typeof object.paymentTosAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.paymentTosAction: object expected"
                    );
                message.paymentTosAction =
                    $root.SyncAction.SyncActionValue.PaymentTosAction.fromObject(
                        object.paymentTosAction
                    );
            }
            if (object.privacySettingChannelsPersonalisedRecommendationAction != null) {
                if (
                    typeof object.privacySettingChannelsPersonalisedRecommendationAction !==
                    "object"
                )
                    throw TypeError(
                        ".SyncAction.SyncActionValue.privacySettingChannelsPersonalisedRecommendationAction: object expected"
                    );
                message.privacySettingChannelsPersonalisedRecommendationAction =
                    $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.fromObject(
                        object.privacySettingChannelsPersonalisedRecommendationAction
                    );
            }
            if (object.detectedOutcomesStatusAction != null) {
                if (typeof object.detectedOutcomesStatusAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.detectedOutcomesStatusAction: object expected"
                    );
                message.detectedOutcomesStatusAction =
                    $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction.fromObject(
                        object.detectedOutcomesStatusAction
                    );
            }
            if (object.maibaAiFeaturesControlAction != null) {
                if (typeof object.maibaAiFeaturesControlAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.maibaAiFeaturesControlAction: object expected"
                    );
                message.maibaAiFeaturesControlAction =
                    $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.fromObject(
                        object.maibaAiFeaturesControlAction
                    );
            }
            if (object.businessBroadcastListAction != null) {
                if (typeof object.businessBroadcastListAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.businessBroadcastListAction: object expected"
                    );
                message.businessBroadcastListAction =
                    $root.SyncAction.SyncActionValue.BusinessBroadcastListAction.fromObject(
                        object.businessBroadcastListAction
                    );
            }
            if (object.musicUserIdAction != null) {
                if (typeof object.musicUserIdAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.musicUserIdAction: object expected"
                    );
                message.musicUserIdAction =
                    $root.SyncAction.SyncActionValue.MusicUserIdAction.fromObject(
                        object.musicUserIdAction
                    );
            }
            if (object.statusPostOptInNotificationPreferencesAction != null) {
                if (typeof object.statusPostOptInNotificationPreferencesAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.statusPostOptInNotificationPreferencesAction: object expected"
                    );
                message.statusPostOptInNotificationPreferencesAction =
                    $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.fromObject(
                        object.statusPostOptInNotificationPreferencesAction
                    );
            }
            if (object.avatarUpdatedAction != null) {
                if (typeof object.avatarUpdatedAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.avatarUpdatedAction: object expected"
                    );
                message.avatarUpdatedAction =
                    $root.SyncAction.SyncActionValue.AvatarUpdatedAction.fromObject(
                        object.avatarUpdatedAction
                    );
            }
            if (object.privateProcessingSettingAction != null) {
                if (typeof object.privateProcessingSettingAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.privateProcessingSettingAction: object expected"
                    );
                message.privateProcessingSettingAction =
                    $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction.fromObject(
                        object.privateProcessingSettingAction
                    );
            }
            if (object.newsletterSavedInterestsAction != null) {
                if (typeof object.newsletterSavedInterestsAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.newsletterSavedInterestsAction: object expected"
                    );
                message.newsletterSavedInterestsAction =
                    $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction.fromObject(
                        object.newsletterSavedInterestsAction
                    );
            }
            if (object.aiThreadRenameAction != null) {
                if (typeof object.aiThreadRenameAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.aiThreadRenameAction: object expected"
                    );
                message.aiThreadRenameAction =
                    $root.SyncAction.SyncActionValue.AiThreadRenameAction.fromObject(
                        object.aiThreadRenameAction
                    );
            }
            if (object.interactiveMessageAction != null) {
                if (typeof object.interactiveMessageAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.interactiveMessageAction: object expected"
                    );
                message.interactiveMessageAction =
                    $root.SyncAction.SyncActionValue.InteractiveMessageAction.fromObject(
                        object.interactiveMessageAction
                    );
            }
            if (object.settingsSyncAction != null) {
                if (typeof object.settingsSyncAction !== "object")
                    throw TypeError(
                        ".SyncAction.SyncActionValue.settingsSyncAction: object expected"
                    );
                message.settingsSyncAction =
                    $root.SyncAction.SyncActionValue.SettingsSyncAction.fromObject(
                        object.settingsSyncAction
                    );
            }
            return message;
        };
        SyncActionValue.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
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
            if (message.starAction != null && message.hasOwnProperty("starAction")) {
                object.starAction = $root.SyncAction.SyncActionValue.StarAction.toObject(
                    message.starAction,
                    options
                );
                if (options.oneofs) object._starAction = "starAction";
            }
            if (message.contactAction != null && message.hasOwnProperty("contactAction")) {
                object.contactAction = $root.SyncAction.SyncActionValue.ContactAction.toObject(
                    message.contactAction,
                    options
                );
                if (options.oneofs) object._contactAction = "contactAction";
            }
            if (message.muteAction != null && message.hasOwnProperty("muteAction")) {
                object.muteAction = $root.SyncAction.SyncActionValue.MuteAction.toObject(
                    message.muteAction,
                    options
                );
                if (options.oneofs) object._muteAction = "muteAction";
            }
            if (message.pinAction != null && message.hasOwnProperty("pinAction")) {
                object.pinAction = $root.SyncAction.SyncActionValue.PinAction.toObject(
                    message.pinAction,
                    options
                );
                if (options.oneofs) object._pinAction = "pinAction";
            }
            if (message.pushNameSetting != null && message.hasOwnProperty("pushNameSetting")) {
                object.pushNameSetting = $root.SyncAction.SyncActionValue.PushNameSetting.toObject(
                    message.pushNameSetting,
                    options
                );
                if (options.oneofs) object._pushNameSetting = "pushNameSetting";
            }
            if (message.quickReplyAction != null && message.hasOwnProperty("quickReplyAction")) {
                object.quickReplyAction =
                    $root.SyncAction.SyncActionValue.QuickReplyAction.toObject(
                        message.quickReplyAction,
                        options
                    );
                if (options.oneofs) object._quickReplyAction = "quickReplyAction";
            }
            if (
                message.recentEmojiWeightsAction != null &&
                message.hasOwnProperty("recentEmojiWeightsAction")
            ) {
                object.recentEmojiWeightsAction =
                    $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction.toObject(
                        message.recentEmojiWeightsAction,
                        options
                    );
                if (options.oneofs) object._recentEmojiWeightsAction = "recentEmojiWeightsAction";
            }
            if (message.labelEditAction != null && message.hasOwnProperty("labelEditAction")) {
                object.labelEditAction = $root.SyncAction.SyncActionValue.LabelEditAction.toObject(
                    message.labelEditAction,
                    options
                );
                if (options.oneofs) object._labelEditAction = "labelEditAction";
            }
            if (
                message.labelAssociationAction != null &&
                message.hasOwnProperty("labelAssociationAction")
            ) {
                object.labelAssociationAction =
                    $root.SyncAction.SyncActionValue.LabelAssociationAction.toObject(
                        message.labelAssociationAction,
                        options
                    );
                if (options.oneofs) object._labelAssociationAction = "labelAssociationAction";
            }
            if (message.localeSetting != null && message.hasOwnProperty("localeSetting")) {
                object.localeSetting = $root.SyncAction.SyncActionValue.LocaleSetting.toObject(
                    message.localeSetting,
                    options
                );
                if (options.oneofs) object._localeSetting = "localeSetting";
            }
            if (message.archiveChatAction != null && message.hasOwnProperty("archiveChatAction")) {
                object.archiveChatAction =
                    $root.SyncAction.SyncActionValue.ArchiveChatAction.toObject(
                        message.archiveChatAction,
                        options
                    );
                if (options.oneofs) object._archiveChatAction = "archiveChatAction";
            }
            if (
                message.deleteMessageForMeAction != null &&
                message.hasOwnProperty("deleteMessageForMeAction")
            ) {
                object.deleteMessageForMeAction =
                    $root.SyncAction.SyncActionValue.DeleteMessageForMeAction.toObject(
                        message.deleteMessageForMeAction,
                        options
                    );
                if (options.oneofs) object._deleteMessageForMeAction = "deleteMessageForMeAction";
            }
            if (message.keyExpiration != null && message.hasOwnProperty("keyExpiration")) {
                object.keyExpiration = $root.SyncAction.SyncActionValue.KeyExpiration.toObject(
                    message.keyExpiration,
                    options
                );
                if (options.oneofs) object._keyExpiration = "keyExpiration";
            }
            if (
                message.markChatAsReadAction != null &&
                message.hasOwnProperty("markChatAsReadAction")
            ) {
                object.markChatAsReadAction =
                    $root.SyncAction.SyncActionValue.MarkChatAsReadAction.toObject(
                        message.markChatAsReadAction,
                        options
                    );
                if (options.oneofs) object._markChatAsReadAction = "markChatAsReadAction";
            }
            if (message.clearChatAction != null && message.hasOwnProperty("clearChatAction")) {
                object.clearChatAction = $root.SyncAction.SyncActionValue.ClearChatAction.toObject(
                    message.clearChatAction,
                    options
                );
                if (options.oneofs) object._clearChatAction = "clearChatAction";
            }
            if (message.deleteChatAction != null && message.hasOwnProperty("deleteChatAction")) {
                object.deleteChatAction =
                    $root.SyncAction.SyncActionValue.DeleteChatAction.toObject(
                        message.deleteChatAction,
                        options
                    );
                if (options.oneofs) object._deleteChatAction = "deleteChatAction";
            }
            if (
                message.unarchiveChatsSetting != null &&
                message.hasOwnProperty("unarchiveChatsSetting")
            ) {
                object.unarchiveChatsSetting =
                    $root.SyncAction.SyncActionValue.UnarchiveChatsSetting.toObject(
                        message.unarchiveChatsSetting,
                        options
                    );
                if (options.oneofs) object._unarchiveChatsSetting = "unarchiveChatsSetting";
            }
            if (message.primaryFeature != null && message.hasOwnProperty("primaryFeature")) {
                object.primaryFeature = $root.SyncAction.SyncActionValue.PrimaryFeature.toObject(
                    message.primaryFeature,
                    options
                );
                if (options.oneofs) object._primaryFeature = "primaryFeature";
            }
            if (
                message.androidUnsupportedActions != null &&
                message.hasOwnProperty("androidUnsupportedActions")
            ) {
                object.androidUnsupportedActions =
                    $root.SyncAction.SyncActionValue.AndroidUnsupportedActions.toObject(
                        message.androidUnsupportedActions,
                        options
                    );
                if (options.oneofs) object._androidUnsupportedActions = "androidUnsupportedActions";
            }
            if (message.agentAction != null && message.hasOwnProperty("agentAction")) {
                object.agentAction = $root.SyncAction.SyncActionValue.AgentAction.toObject(
                    message.agentAction,
                    options
                );
                if (options.oneofs) object._agentAction = "agentAction";
            }
            if (
                message.subscriptionAction != null &&
                message.hasOwnProperty("subscriptionAction")
            ) {
                object.subscriptionAction =
                    $root.SyncAction.SyncActionValue.SubscriptionAction.toObject(
                        message.subscriptionAction,
                        options
                    );
                if (options.oneofs) object._subscriptionAction = "subscriptionAction";
            }
            if (
                message.userStatusMuteAction != null &&
                message.hasOwnProperty("userStatusMuteAction")
            ) {
                object.userStatusMuteAction =
                    $root.SyncAction.SyncActionValue.UserStatusMuteAction.toObject(
                        message.userStatusMuteAction,
                        options
                    );
                if (options.oneofs) object._userStatusMuteAction = "userStatusMuteAction";
            }
            if (message.timeFormatAction != null && message.hasOwnProperty("timeFormatAction")) {
                object.timeFormatAction =
                    $root.SyncAction.SyncActionValue.TimeFormatAction.toObject(
                        message.timeFormatAction,
                        options
                    );
                if (options.oneofs) object._timeFormatAction = "timeFormatAction";
            }
            if (message.nuxAction != null && message.hasOwnProperty("nuxAction")) {
                object.nuxAction = $root.SyncAction.SyncActionValue.NuxAction.toObject(
                    message.nuxAction,
                    options
                );
                if (options.oneofs) object._nuxAction = "nuxAction";
            }
            if (
                message.primaryVersionAction != null &&
                message.hasOwnProperty("primaryVersionAction")
            ) {
                object.primaryVersionAction =
                    $root.SyncAction.SyncActionValue.PrimaryVersionAction.toObject(
                        message.primaryVersionAction,
                        options
                    );
                if (options.oneofs) object._primaryVersionAction = "primaryVersionAction";
            }
            if (message.stickerAction != null && message.hasOwnProperty("stickerAction")) {
                object.stickerAction = $root.SyncAction.SyncActionValue.StickerAction.toObject(
                    message.stickerAction,
                    options
                );
                if (options.oneofs) object._stickerAction = "stickerAction";
            }
            if (
                message.removeRecentStickerAction != null &&
                message.hasOwnProperty("removeRecentStickerAction")
            ) {
                object.removeRecentStickerAction =
                    $root.SyncAction.SyncActionValue.RemoveRecentStickerAction.toObject(
                        message.removeRecentStickerAction,
                        options
                    );
                if (options.oneofs) object._removeRecentStickerAction = "removeRecentStickerAction";
            }
            if (message.chatAssignment != null && message.hasOwnProperty("chatAssignment")) {
                object.chatAssignment =
                    $root.SyncAction.SyncActionValue.ChatAssignmentAction.toObject(
                        message.chatAssignment,
                        options
                    );
                if (options.oneofs) object._chatAssignment = "chatAssignment";
            }
            if (
                message.chatAssignmentOpenedStatus != null &&
                message.hasOwnProperty("chatAssignmentOpenedStatus")
            ) {
                object.chatAssignmentOpenedStatus =
                    $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.toObject(
                        message.chatAssignmentOpenedStatus,
                        options
                    );
                if (options.oneofs)
                    object._chatAssignmentOpenedStatus = "chatAssignmentOpenedStatus";
            }
            if (
                message.pnForLidChatAction != null &&
                message.hasOwnProperty("pnForLidChatAction")
            ) {
                object.pnForLidChatAction =
                    $root.SyncAction.SyncActionValue.PnForLidChatAction.toObject(
                        message.pnForLidChatAction,
                        options
                    );
                if (options.oneofs) object._pnForLidChatAction = "pnForLidChatAction";
            }
            if (
                message.marketingMessageAction != null &&
                message.hasOwnProperty("marketingMessageAction")
            ) {
                object.marketingMessageAction =
                    $root.SyncAction.SyncActionValue.MarketingMessageAction.toObject(
                        message.marketingMessageAction,
                        options
                    );
                if (options.oneofs) object._marketingMessageAction = "marketingMessageAction";
            }
            if (
                message.marketingMessageBroadcastAction != null &&
                message.hasOwnProperty("marketingMessageBroadcastAction")
            ) {
                object.marketingMessageBroadcastAction =
                    $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction.toObject(
                        message.marketingMessageBroadcastAction,
                        options
                    );
                if (options.oneofs)
                    object._marketingMessageBroadcastAction = "marketingMessageBroadcastAction";
            }
            if (
                message.externalWebBetaAction != null &&
                message.hasOwnProperty("externalWebBetaAction")
            ) {
                object.externalWebBetaAction =
                    $root.SyncAction.SyncActionValue.ExternalWebBetaAction.toObject(
                        message.externalWebBetaAction,
                        options
                    );
                if (options.oneofs) object._externalWebBetaAction = "externalWebBetaAction";
            }
            if (
                message.privacySettingRelayAllCalls != null &&
                message.hasOwnProperty("privacySettingRelayAllCalls")
            ) {
                object.privacySettingRelayAllCalls =
                    $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.toObject(
                        message.privacySettingRelayAllCalls,
                        options
                    );
                if (options.oneofs)
                    object._privacySettingRelayAllCalls = "privacySettingRelayAllCalls";
            }
            if (message.callLogAction != null && message.hasOwnProperty("callLogAction")) {
                object.callLogAction = $root.SyncAction.SyncActionValue.CallLogAction.toObject(
                    message.callLogAction,
                    options
                );
                if (options.oneofs) object._callLogAction = "callLogAction";
            }
            if (message.ugcBot != null && message.hasOwnProperty("ugcBot")) {
                object.ugcBot = $root.SyncAction.SyncActionValue.UGCBot.toObject(
                    message.ugcBot,
                    options
                );
                if (options.oneofs) object._ugcBot = "ugcBot";
            }
            if (message.statusPrivacy != null && message.hasOwnProperty("statusPrivacy")) {
                object.statusPrivacy =
                    $root.SyncAction.SyncActionValue.StatusPrivacyAction.toObject(
                        message.statusPrivacy,
                        options
                    );
                if (options.oneofs) object._statusPrivacy = "statusPrivacy";
            }
            if (
                message.botWelcomeRequestAction != null &&
                message.hasOwnProperty("botWelcomeRequestAction")
            ) {
                object.botWelcomeRequestAction =
                    $root.SyncAction.SyncActionValue.BotWelcomeRequestAction.toObject(
                        message.botWelcomeRequestAction,
                        options
                    );
                if (options.oneofs) object._botWelcomeRequestAction = "botWelcomeRequestAction";
            }
            if (
                message.deleteIndividualCallLog != null &&
                message.hasOwnProperty("deleteIndividualCallLog")
            ) {
                object.deleteIndividualCallLog =
                    $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction.toObject(
                        message.deleteIndividualCallLog,
                        options
                    );
                if (options.oneofs) object._deleteIndividualCallLog = "deleteIndividualCallLog";
            }
            if (
                message.labelReorderingAction != null &&
                message.hasOwnProperty("labelReorderingAction")
            ) {
                object.labelReorderingAction =
                    $root.SyncAction.SyncActionValue.LabelReorderingAction.toObject(
                        message.labelReorderingAction,
                        options
                    );
                if (options.oneofs) object._labelReorderingAction = "labelReorderingAction";
            }
            if (message.paymentInfoAction != null && message.hasOwnProperty("paymentInfoAction")) {
                object.paymentInfoAction =
                    $root.SyncAction.SyncActionValue.PaymentInfoAction.toObject(
                        message.paymentInfoAction,
                        options
                    );
                if (options.oneofs) object._paymentInfoAction = "paymentInfoAction";
            }
            if (
                message.customPaymentMethodsAction != null &&
                message.hasOwnProperty("customPaymentMethodsAction")
            ) {
                object.customPaymentMethodsAction =
                    $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction.toObject(
                        message.customPaymentMethodsAction,
                        options
                    );
                if (options.oneofs)
                    object._customPaymentMethodsAction = "customPaymentMethodsAction";
            }
            if (message.lockChatAction != null && message.hasOwnProperty("lockChatAction")) {
                object.lockChatAction = $root.SyncAction.SyncActionValue.LockChatAction.toObject(
                    message.lockChatAction,
                    options
                );
                if (options.oneofs) object._lockChatAction = "lockChatAction";
            }
            if (message.chatLockSettings != null && message.hasOwnProperty("chatLockSettings")) {
                object.chatLockSettings = $root.ChatLockSettings.ChatLockSettings.toObject(
                    message.chatLockSettings,
                    options
                );
                if (options.oneofs) object._chatLockSettings = "chatLockSettings";
            }
            if (
                message.wamoUserIdentifierAction != null &&
                message.hasOwnProperty("wamoUserIdentifierAction")
            ) {
                object.wamoUserIdentifierAction =
                    $root.SyncAction.SyncActionValue.WamoUserIdentifierAction.toObject(
                        message.wamoUserIdentifierAction,
                        options
                    );
                if (options.oneofs) object._wamoUserIdentifierAction = "wamoUserIdentifierAction";
            }
            if (
                message.privacySettingDisableLinkPreviewsAction != null &&
                message.hasOwnProperty("privacySettingDisableLinkPreviewsAction")
            ) {
                object.privacySettingDisableLinkPreviewsAction =
                    $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.toObject(
                        message.privacySettingDisableLinkPreviewsAction,
                        options
                    );
                if (options.oneofs)
                    object._privacySettingDisableLinkPreviewsAction =
                        "privacySettingDisableLinkPreviewsAction";
            }
            if (
                message.deviceCapabilities != null &&
                message.hasOwnProperty("deviceCapabilities")
            ) {
                object.deviceCapabilities = $root.DeviceCapabilities.DeviceCapabilities.toObject(
                    message.deviceCapabilities,
                    options
                );
                if (options.oneofs) object._deviceCapabilities = "deviceCapabilities";
            }
            if (message.noteEditAction != null && message.hasOwnProperty("noteEditAction")) {
                object.noteEditAction = $root.SyncAction.SyncActionValue.NoteEditAction.toObject(
                    message.noteEditAction,
                    options
                );
                if (options.oneofs) object._noteEditAction = "noteEditAction";
            }
            if (message.favoritesAction != null && message.hasOwnProperty("favoritesAction")) {
                object.favoritesAction = $root.SyncAction.SyncActionValue.FavoritesAction.toObject(
                    message.favoritesAction,
                    options
                );
                if (options.oneofs) object._favoritesAction = "favoritesAction";
            }
            if (
                message.merchantPaymentPartnerAction != null &&
                message.hasOwnProperty("merchantPaymentPartnerAction")
            ) {
                object.merchantPaymentPartnerAction =
                    $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.toObject(
                        message.merchantPaymentPartnerAction,
                        options
                    );
                if (options.oneofs)
                    object._merchantPaymentPartnerAction = "merchantPaymentPartnerAction";
            }
            if (
                message.waffleAccountLinkStateAction != null &&
                message.hasOwnProperty("waffleAccountLinkStateAction")
            ) {
                object.waffleAccountLinkStateAction =
                    $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction.toObject(
                        message.waffleAccountLinkStateAction,
                        options
                    );
                if (options.oneofs)
                    object._waffleAccountLinkStateAction = "waffleAccountLinkStateAction";
            }
            if (
                message.usernameChatStartMode != null &&
                message.hasOwnProperty("usernameChatStartMode")
            ) {
                object.usernameChatStartMode =
                    $root.SyncAction.SyncActionValue.UsernameChatStartModeAction.toObject(
                        message.usernameChatStartMode,
                        options
                    );
                if (options.oneofs) object._usernameChatStartMode = "usernameChatStartMode";
            }
            if (
                message.notificationActivitySettingAction != null &&
                message.hasOwnProperty("notificationActivitySettingAction")
            ) {
                object.notificationActivitySettingAction =
                    $root.SyncAction.SyncActionValue.NotificationActivitySettingAction.toObject(
                        message.notificationActivitySettingAction,
                        options
                    );
                if (options.oneofs)
                    object._notificationActivitySettingAction = "notificationActivitySettingAction";
            }
            if (message.lidContactAction != null && message.hasOwnProperty("lidContactAction")) {
                object.lidContactAction =
                    $root.SyncAction.SyncActionValue.LidContactAction.toObject(
                        message.lidContactAction,
                        options
                    );
                if (options.oneofs) object._lidContactAction = "lidContactAction";
            }
            if (
                message.ctwaPerCustomerDataSharingAction != null &&
                message.hasOwnProperty("ctwaPerCustomerDataSharingAction")
            ) {
                object.ctwaPerCustomerDataSharingAction =
                    $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.toObject(
                        message.ctwaPerCustomerDataSharingAction,
                        options
                    );
                if (options.oneofs)
                    object._ctwaPerCustomerDataSharingAction = "ctwaPerCustomerDataSharingAction";
            }
            if (message.paymentTosAction != null && message.hasOwnProperty("paymentTosAction")) {
                object.paymentTosAction =
                    $root.SyncAction.SyncActionValue.PaymentTosAction.toObject(
                        message.paymentTosAction,
                        options
                    );
                if (options.oneofs) object._paymentTosAction = "paymentTosAction";
            }
            if (
                message.privacySettingChannelsPersonalisedRecommendationAction != null &&
                message.hasOwnProperty("privacySettingChannelsPersonalisedRecommendationAction")
            ) {
                object.privacySettingChannelsPersonalisedRecommendationAction =
                    $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.toObject(
                        message.privacySettingChannelsPersonalisedRecommendationAction,
                        options
                    );
                if (options.oneofs)
                    object._privacySettingChannelsPersonalisedRecommendationAction =
                        "privacySettingChannelsPersonalisedRecommendationAction";
            }
            if (
                message.detectedOutcomesStatusAction != null &&
                message.hasOwnProperty("detectedOutcomesStatusAction")
            ) {
                object.detectedOutcomesStatusAction =
                    $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction.toObject(
                        message.detectedOutcomesStatusAction,
                        options
                    );
                if (options.oneofs)
                    object._detectedOutcomesStatusAction = "detectedOutcomesStatusAction";
            }
            if (
                message.maibaAiFeaturesControlAction != null &&
                message.hasOwnProperty("maibaAiFeaturesControlAction")
            ) {
                object.maibaAiFeaturesControlAction =
                    $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.toObject(
                        message.maibaAiFeaturesControlAction,
                        options
                    );
                if (options.oneofs)
                    object._maibaAiFeaturesControlAction = "maibaAiFeaturesControlAction";
            }
            if (
                message.businessBroadcastListAction != null &&
                message.hasOwnProperty("businessBroadcastListAction")
            ) {
                object.businessBroadcastListAction =
                    $root.SyncAction.SyncActionValue.BusinessBroadcastListAction.toObject(
                        message.businessBroadcastListAction,
                        options
                    );
                if (options.oneofs)
                    object._businessBroadcastListAction = "businessBroadcastListAction";
            }
            if (message.musicUserIdAction != null && message.hasOwnProperty("musicUserIdAction")) {
                object.musicUserIdAction =
                    $root.SyncAction.SyncActionValue.MusicUserIdAction.toObject(
                        message.musicUserIdAction,
                        options
                    );
                if (options.oneofs) object._musicUserIdAction = "musicUserIdAction";
            }
            if (
                message.statusPostOptInNotificationPreferencesAction != null &&
                message.hasOwnProperty("statusPostOptInNotificationPreferencesAction")
            ) {
                object.statusPostOptInNotificationPreferencesAction =
                    $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.toObject(
                        message.statusPostOptInNotificationPreferencesAction,
                        options
                    );
                if (options.oneofs)
                    object._statusPostOptInNotificationPreferencesAction =
                        "statusPostOptInNotificationPreferencesAction";
            }
            if (
                message.avatarUpdatedAction != null &&
                message.hasOwnProperty("avatarUpdatedAction")
            ) {
                object.avatarUpdatedAction =
                    $root.SyncAction.SyncActionValue.AvatarUpdatedAction.toObject(
                        message.avatarUpdatedAction,
                        options
                    );
                if (options.oneofs) object._avatarUpdatedAction = "avatarUpdatedAction";
            }
            if (
                message.privateProcessingSettingAction != null &&
                message.hasOwnProperty("privateProcessingSettingAction")
            ) {
                object.privateProcessingSettingAction =
                    $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction.toObject(
                        message.privateProcessingSettingAction,
                        options
                    );
                if (options.oneofs)
                    object._privateProcessingSettingAction = "privateProcessingSettingAction";
            }
            if (
                message.newsletterSavedInterestsAction != null &&
                message.hasOwnProperty("newsletterSavedInterestsAction")
            ) {
                object.newsletterSavedInterestsAction =
                    $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction.toObject(
                        message.newsletterSavedInterestsAction,
                        options
                    );
                if (options.oneofs)
                    object._newsletterSavedInterestsAction = "newsletterSavedInterestsAction";
            }
            if (
                message.aiThreadRenameAction != null &&
                message.hasOwnProperty("aiThreadRenameAction")
            ) {
                object.aiThreadRenameAction =
                    $root.SyncAction.SyncActionValue.AiThreadRenameAction.toObject(
                        message.aiThreadRenameAction,
                        options
                    );
                if (options.oneofs) object._aiThreadRenameAction = "aiThreadRenameAction";
            }
            if (
                message.interactiveMessageAction != null &&
                message.hasOwnProperty("interactiveMessageAction")
            ) {
                object.interactiveMessageAction =
                    $root.SyncAction.SyncActionValue.InteractiveMessageAction.toObject(
                        message.interactiveMessageAction,
                        options
                    );
                if (options.oneofs) object._interactiveMessageAction = "interactiveMessageAction";
            }
            if (
                message.settingsSyncAction != null &&
                message.hasOwnProperty("settingsSyncAction")
            ) {
                object.settingsSyncAction =
                    $root.SyncAction.SyncActionValue.SettingsSyncAction.toObject(
                        message.settingsSyncAction,
                        options
                    );
                if (options.oneofs) object._settingsSyncAction = "settingsSyncAction";
            }
            return object;
        };
        SyncActionValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SyncActionValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SyncAction.SyncActionValue";
        };
        SyncActionValue.AgentAction = (function () {
            function AgentAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AgentAction.prototype.name = null;
            AgentAction.prototype.deviceID = null;
            AgentAction.prototype.isDeleted = null;
            var $oneOfFields;
            Object.defineProperty(AgentAction.prototype, "_name", {
                get: $util.oneOfGetter(($oneOfFields = ["name"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AgentAction.prototype, "_deviceID", {
                get: $util.oneOfGetter(($oneOfFields = ["deviceID"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(AgentAction.prototype, "_isDeleted", {
                get: $util.oneOfGetter(($oneOfFields = ["isDeleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AgentAction.create = function create(properties) {
                return new AgentAction(properties);
            };
            AgentAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(10).string(message.name);
                if (message.deviceID != null && Object.hasOwnProperty.call(message, "deviceID"))
                    writer.uint32(16).int32(message.deviceID);
                if (message.isDeleted != null && Object.hasOwnProperty.call(message, "isDeleted"))
                    writer.uint32(24).bool(message.isDeleted);
                return writer;
            };
            AgentAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AgentAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.AgentAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.name = reader.string();
                            break;
                        }
                        case 2: {
                            message.deviceID = reader.int32();
                            break;
                        }
                        case 3: {
                            message.isDeleted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AgentAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AgentAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties._name = 1;
                    if (!$util.isString(message.name)) return "name: string expected";
                }
                if (message.deviceID != null && message.hasOwnProperty("deviceID")) {
                    properties._deviceID = 1;
                    if (!$util.isInteger(message.deviceID)) return "deviceID: integer expected";
                }
                if (message.isDeleted != null && message.hasOwnProperty("isDeleted")) {
                    properties._isDeleted = 1;
                    if (typeof message.isDeleted !== "boolean")
                        return "isDeleted: boolean expected";
                }
                return null;
            };
            AgentAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.AgentAction) return object;
                var message = new $root.SyncAction.SyncActionValue.AgentAction();
                if (object.name != null) message.name = String(object.name);
                if (object.deviceID != null) message.deviceID = object.deviceID | 0;
                if (object.isDeleted != null) message.isDeleted = Boolean(object.isDeleted);
                return message;
            };
            AgentAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs) object._name = "name";
                }
                if (message.deviceID != null && message.hasOwnProperty("deviceID")) {
                    object.deviceID = message.deviceID;
                    if (options.oneofs) object._deviceID = "deviceID";
                }
                if (message.isDeleted != null && message.hasOwnProperty("isDeleted")) {
                    object.isDeleted = message.isDeleted;
                    if (options.oneofs) object._isDeleted = "isDeleted";
                }
                return object;
            };
            AgentAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AgentAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.AgentAction";
            };
            return AgentAction;
        })();
        SyncActionValue.AiThreadRenameAction = (function () {
            function AiThreadRenameAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AiThreadRenameAction.prototype.newTitle = null;
            var $oneOfFields;
            Object.defineProperty(AiThreadRenameAction.prototype, "_newTitle", {
                get: $util.oneOfGetter(($oneOfFields = ["newTitle"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AiThreadRenameAction.create = function create(properties) {
                return new AiThreadRenameAction(properties);
            };
            AiThreadRenameAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.newTitle != null && Object.hasOwnProperty.call(message, "newTitle"))
                    writer.uint32(10).string(message.newTitle);
                return writer;
            };
            AiThreadRenameAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AiThreadRenameAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.AiThreadRenameAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.newTitle = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AiThreadRenameAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AiThreadRenameAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.newTitle != null && message.hasOwnProperty("newTitle")) {
                    properties._newTitle = 1;
                    if (!$util.isString(message.newTitle)) return "newTitle: string expected";
                }
                return null;
            };
            AiThreadRenameAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.AiThreadRenameAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.AiThreadRenameAction();
                if (object.newTitle != null) message.newTitle = String(object.newTitle);
                return message;
            };
            AiThreadRenameAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.newTitle != null && message.hasOwnProperty("newTitle")) {
                    object.newTitle = message.newTitle;
                    if (options.oneofs) object._newTitle = "newTitle";
                }
                return object;
            };
            AiThreadRenameAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AiThreadRenameAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.AiThreadRenameAction";
            };
            return AiThreadRenameAction;
        })();
        SyncActionValue.AndroidUnsupportedActions = (function () {
            function AndroidUnsupportedActions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AndroidUnsupportedActions.prototype.allowed = null;
            var $oneOfFields;
            Object.defineProperty(AndroidUnsupportedActions.prototype, "_allowed", {
                get: $util.oneOfGetter(($oneOfFields = ["allowed"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AndroidUnsupportedActions.create = function create(properties) {
                return new AndroidUnsupportedActions(properties);
            };
            AndroidUnsupportedActions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.allowed != null && Object.hasOwnProperty.call(message, "allowed"))
                    writer.uint32(8).bool(message.allowed);
                return writer;
            };
            AndroidUnsupportedActions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AndroidUnsupportedActions.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.AndroidUnsupportedActions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.allowed = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            AndroidUnsupportedActions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AndroidUnsupportedActions.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.allowed != null && message.hasOwnProperty("allowed")) {
                    properties._allowed = 1;
                    if (typeof message.allowed !== "boolean") return "allowed: boolean expected";
                }
                return null;
            };
            AndroidUnsupportedActions.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.AndroidUnsupportedActions)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.AndroidUnsupportedActions();
                if (object.allowed != null) message.allowed = Boolean(object.allowed);
                return message;
            };
            AndroidUnsupportedActions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.allowed != null && message.hasOwnProperty("allowed")) {
                    object.allowed = message.allowed;
                    if (options.oneofs) object._allowed = "allowed";
                }
                return object;
            };
            AndroidUnsupportedActions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AndroidUnsupportedActions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.AndroidUnsupportedActions";
            };
            return AndroidUnsupportedActions;
        })();
        SyncActionValue.ArchiveChatAction = (function () {
            function ArchiveChatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ArchiveChatAction.prototype.archived = null;
            ArchiveChatAction.prototype.messageRange = null;
            var $oneOfFields;
            Object.defineProperty(ArchiveChatAction.prototype, "_archived", {
                get: $util.oneOfGetter(($oneOfFields = ["archived"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ArchiveChatAction.prototype, "_messageRange", {
                get: $util.oneOfGetter(($oneOfFields = ["messageRange"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ArchiveChatAction.create = function create(properties) {
                return new ArchiveChatAction(properties);
            };
            ArchiveChatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.archived != null && Object.hasOwnProperty.call(message, "archived"))
                    writer.uint32(8).bool(message.archived);
                if (
                    message.messageRange != null &&
                    Object.hasOwnProperty.call(message, "messageRange")
                )
                    $root.SyncAction.SyncActionValue.SyncActionMessageRange.encode(
                        message.messageRange,
                        writer.uint32(18).fork()
                    ).ldelim();
                return writer;
            };
            ArchiveChatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ArchiveChatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.ArchiveChatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.archived = reader.bool();
                            break;
                        }
                        case 2: {
                            message.messageRange =
                                $root.SyncAction.SyncActionValue.SyncActionMessageRange.decode(
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
            ArchiveChatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ArchiveChatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.archived != null && message.hasOwnProperty("archived")) {
                    properties._archived = 1;
                    if (typeof message.archived !== "boolean") return "archived: boolean expected";
                }
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    properties._messageRange = 1;
                    {
                        var error = $root.SyncAction.SyncActionValue.SyncActionMessageRange.verify(
                            message.messageRange
                        );
                        if (error) return "messageRange." + error;
                    }
                }
                return null;
            };
            ArchiveChatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.ArchiveChatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.ArchiveChatAction();
                if (object.archived != null) message.archived = Boolean(object.archived);
                if (object.messageRange != null) {
                    if (typeof object.messageRange !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.ArchiveChatAction.messageRange: object expected"
                        );
                    message.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.fromObject(
                            object.messageRange
                        );
                }
                return message;
            };
            ArchiveChatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.archived != null && message.hasOwnProperty("archived")) {
                    object.archived = message.archived;
                    if (options.oneofs) object._archived = "archived";
                }
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    object.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.toObject(
                            message.messageRange,
                            options
                        );
                    if (options.oneofs) object._messageRange = "messageRange";
                }
                return object;
            };
            ArchiveChatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ArchiveChatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.ArchiveChatAction";
            };
            return ArchiveChatAction;
        })();
        SyncActionValue.AvatarUpdatedAction = (function () {
            function AvatarUpdatedAction(properties) {
                this.recentAvatarStickers = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            AvatarUpdatedAction.prototype.eventType = null;
            AvatarUpdatedAction.prototype.recentAvatarStickers = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(AvatarUpdatedAction.prototype, "_eventType", {
                get: $util.oneOfGetter(($oneOfFields = ["eventType"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            AvatarUpdatedAction.create = function create(properties) {
                return new AvatarUpdatedAction(properties);
            };
            AvatarUpdatedAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                    writer.uint32(8).int32(message.eventType);
                if (message.recentAvatarStickers != null && message.recentAvatarStickers.length)
                    for (var i = 0; i < message.recentAvatarStickers.length; ++i)
                        $root.SyncAction.SyncActionValue.StickerAction.encode(
                            message.recentAvatarStickers[i],
                            writer.uint32(18).fork()
                        ).ldelim();
                return writer;
            };
            AvatarUpdatedAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            AvatarUpdatedAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.AvatarUpdatedAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.eventType = reader.int32();
                            break;
                        }
                        case 2: {
                            if (
                                !(
                                    message.recentAvatarStickers &&
                                    message.recentAvatarStickers.length
                                )
                            )
                                message.recentAvatarStickers = [];
                            message.recentAvatarStickers.push(
                                $root.SyncAction.SyncActionValue.StickerAction.decode(
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
            AvatarUpdatedAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            AvatarUpdatedAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.eventType != null && message.hasOwnProperty("eventType")) {
                    properties._eventType = 1;
                    switch (message.eventType) {
                        default:
                            return "eventType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                if (
                    message.recentAvatarStickers != null &&
                    message.hasOwnProperty("recentAvatarStickers")
                ) {
                    if (!Array.isArray(message.recentAvatarStickers))
                        return "recentAvatarStickers: array expected";
                    for (var i = 0; i < message.recentAvatarStickers.length; ++i) {
                        var error = $root.SyncAction.SyncActionValue.StickerAction.verify(
                            message.recentAvatarStickers[i]
                        );
                        if (error) return "recentAvatarStickers." + error;
                    }
                }
                return null;
            };
            AvatarUpdatedAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.AvatarUpdatedAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.AvatarUpdatedAction();
                switch (object.eventType) {
                    default:
                        if (typeof object.eventType === "number") {
                            message.eventType = object.eventType;
                            break;
                        }
                        break;
                    case "UPDATED":
                    case 0:
                        message.eventType = 0;
                        break;
                    case "CREATED":
                    case 1:
                        message.eventType = 1;
                        break;
                    case "DELETED":
                    case 2:
                        message.eventType = 2;
                        break;
                }
                if (object.recentAvatarStickers) {
                    if (!Array.isArray(object.recentAvatarStickers))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.AvatarUpdatedAction.recentAvatarStickers: array expected"
                        );
                    message.recentAvatarStickers = [];
                    for (var i = 0; i < object.recentAvatarStickers.length; ++i) {
                        if (typeof object.recentAvatarStickers[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.AvatarUpdatedAction.recentAvatarStickers: object expected"
                            );
                        message.recentAvatarStickers[i] =
                            $root.SyncAction.SyncActionValue.StickerAction.fromObject(
                                object.recentAvatarStickers[i]
                            );
                    }
                }
                return message;
            };
            AvatarUpdatedAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.recentAvatarStickers = [];
                if (message.eventType != null && message.hasOwnProperty("eventType")) {
                    object.eventType =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.AvatarUpdatedAction.AvatarEventType[
                                  message.eventType
                              ] === undefined
                                ? message.eventType
                                : $root.SyncAction.SyncActionValue.AvatarUpdatedAction
                                      .AvatarEventType[message.eventType]
                            : message.eventType;
                    if (options.oneofs) object._eventType = "eventType";
                }
                if (message.recentAvatarStickers && message.recentAvatarStickers.length) {
                    object.recentAvatarStickers = [];
                    for (var j = 0; j < message.recentAvatarStickers.length; ++j)
                        object.recentAvatarStickers[j] =
                            $root.SyncAction.SyncActionValue.StickerAction.toObject(
                                message.recentAvatarStickers[j],
                                options
                            );
                }
                return object;
            };
            AvatarUpdatedAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            AvatarUpdatedAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.AvatarUpdatedAction";
            };
            AvatarUpdatedAction.AvatarEventType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UPDATED")] = 0;
                values[(valuesById[1] = "CREATED")] = 1;
                values[(valuesById[2] = "DELETED")] = 2;
                return values;
            })();
            return AvatarUpdatedAction;
        })();
        SyncActionValue.BotWelcomeRequestAction = (function () {
            function BotWelcomeRequestAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BotWelcomeRequestAction.prototype.isSent = null;
            var $oneOfFields;
            Object.defineProperty(BotWelcomeRequestAction.prototype, "_isSent", {
                get: $util.oneOfGetter(($oneOfFields = ["isSent"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BotWelcomeRequestAction.create = function create(properties) {
                return new BotWelcomeRequestAction(properties);
            };
            BotWelcomeRequestAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.isSent != null && Object.hasOwnProperty.call(message, "isSent"))
                    writer.uint32(8).bool(message.isSent);
                return writer;
            };
            BotWelcomeRequestAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BotWelcomeRequestAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.BotWelcomeRequestAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isSent = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BotWelcomeRequestAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BotWelcomeRequestAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isSent != null && message.hasOwnProperty("isSent")) {
                    properties._isSent = 1;
                    if (typeof message.isSent !== "boolean") return "isSent: boolean expected";
                }
                return null;
            };
            BotWelcomeRequestAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.BotWelcomeRequestAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.BotWelcomeRequestAction();
                if (object.isSent != null) message.isSent = Boolean(object.isSent);
                return message;
            };
            BotWelcomeRequestAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.isSent != null && message.hasOwnProperty("isSent")) {
                    object.isSent = message.isSent;
                    if (options.oneofs) object._isSent = "isSent";
                }
                return object;
            };
            BotWelcomeRequestAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BotWelcomeRequestAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.BotWelcomeRequestAction";
            };
            return BotWelcomeRequestAction;
        })();
        SyncActionValue.BroadcastListParticipant = (function () {
            function BroadcastListParticipant(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BroadcastListParticipant.prototype.lidJid = null;
            BroadcastListParticipant.prototype.pnJid = null;
            var $oneOfFields;
            Object.defineProperty(BroadcastListParticipant.prototype, "_lidJid", {
                get: $util.oneOfGetter(($oneOfFields = ["lidJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BroadcastListParticipant.prototype, "_pnJid", {
                get: $util.oneOfGetter(($oneOfFields = ["pnJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BroadcastListParticipant.create = function create(properties) {
                return new BroadcastListParticipant(properties);
            };
            BroadcastListParticipant.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.lidJid != null && Object.hasOwnProperty.call(message, "lidJid"))
                    writer.uint32(10).string(message.lidJid);
                if (message.pnJid != null && Object.hasOwnProperty.call(message, "pnJid"))
                    writer.uint32(18).string(message.pnJid);
                return writer;
            };
            BroadcastListParticipant.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            BroadcastListParticipant.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.BroadcastListParticipant();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.lidJid = reader.string();
                            break;
                        }
                        case 2: {
                            message.pnJid = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BroadcastListParticipant.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BroadcastListParticipant.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.lidJid != null && message.hasOwnProperty("lidJid")) {
                    properties._lidJid = 1;
                    if (!$util.isString(message.lidJid)) return "lidJid: string expected";
                }
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    properties._pnJid = 1;
                    if (!$util.isString(message.pnJid)) return "pnJid: string expected";
                }
                return null;
            };
            BroadcastListParticipant.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.BroadcastListParticipant)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.BroadcastListParticipant();
                if (object.lidJid != null) message.lidJid = String(object.lidJid);
                if (object.pnJid != null) message.pnJid = String(object.pnJid);
                return message;
            };
            BroadcastListParticipant.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.lidJid != null && message.hasOwnProperty("lidJid")) {
                    object.lidJid = message.lidJid;
                    if (options.oneofs) object._lidJid = "lidJid";
                }
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    object.pnJid = message.pnJid;
                    if (options.oneofs) object._pnJid = "pnJid";
                }
                return object;
            };
            BroadcastListParticipant.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BroadcastListParticipant.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.BroadcastListParticipant";
            };
            return BroadcastListParticipant;
        })();
        SyncActionValue.BusinessBroadcastAssociationAction = (function () {
            function BusinessBroadcastAssociationAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BusinessBroadcastAssociationAction.prototype.deleted = null;
            var $oneOfFields;
            Object.defineProperty(BusinessBroadcastAssociationAction.prototype, "_deleted", {
                get: $util.oneOfGetter(($oneOfFields = ["deleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BusinessBroadcastAssociationAction.create = function create(properties) {
                return new BusinessBroadcastAssociationAction(properties);
            };
            BusinessBroadcastAssociationAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                    writer.uint32(8).bool(message.deleted);
                return writer;
            };
            BusinessBroadcastAssociationAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            BusinessBroadcastAssociationAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.BusinessBroadcastAssociationAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.deleted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BusinessBroadcastAssociationAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BusinessBroadcastAssociationAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    properties._deleted = 1;
                    if (typeof message.deleted !== "boolean") return "deleted: boolean expected";
                }
                return null;
            };
            BusinessBroadcastAssociationAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.BusinessBroadcastAssociationAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.BusinessBroadcastAssociationAction();
                if (object.deleted != null) message.deleted = Boolean(object.deleted);
                return message;
            };
            BusinessBroadcastAssociationAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    object.deleted = message.deleted;
                    if (options.oneofs) object._deleted = "deleted";
                }
                return object;
            };
            BusinessBroadcastAssociationAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BusinessBroadcastAssociationAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/SyncAction.SyncActionValue.BusinessBroadcastAssociationAction"
                );
            };
            return BusinessBroadcastAssociationAction;
        })();
        SyncActionValue.BusinessBroadcastListAction = (function () {
            function BusinessBroadcastListAction(properties) {
                this.participants = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            BusinessBroadcastListAction.prototype.deleted = null;
            BusinessBroadcastListAction.prototype.participants = $util.emptyArray;
            BusinessBroadcastListAction.prototype.listName = null;
            var $oneOfFields;
            Object.defineProperty(BusinessBroadcastListAction.prototype, "_deleted", {
                get: $util.oneOfGetter(($oneOfFields = ["deleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(BusinessBroadcastListAction.prototype, "_listName", {
                get: $util.oneOfGetter(($oneOfFields = ["listName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            BusinessBroadcastListAction.create = function create(properties) {
                return new BusinessBroadcastListAction(properties);
            };
            BusinessBroadcastListAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                    writer.uint32(8).bool(message.deleted);
                if (message.participants != null && message.participants.length)
                    for (var i = 0; i < message.participants.length; ++i)
                        $root.SyncAction.SyncActionValue.BroadcastListParticipant.encode(
                            message.participants[i],
                            writer.uint32(18).fork()
                        ).ldelim();
                if (message.listName != null && Object.hasOwnProperty.call(message, "listName"))
                    writer.uint32(26).string(message.listName);
                return writer;
            };
            BusinessBroadcastListAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            BusinessBroadcastListAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.BusinessBroadcastListAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.deleted = reader.bool();
                            break;
                        }
                        case 2: {
                            if (!(message.participants && message.participants.length))
                                message.participants = [];
                            message.participants.push(
                                $root.SyncAction.SyncActionValue.BroadcastListParticipant.decode(
                                    reader,
                                    reader.uint32()
                                )
                            );
                            break;
                        }
                        case 3: {
                            message.listName = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            BusinessBroadcastListAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            BusinessBroadcastListAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    properties._deleted = 1;
                    if (typeof message.deleted !== "boolean") return "deleted: boolean expected";
                }
                if (message.participants != null && message.hasOwnProperty("participants")) {
                    if (!Array.isArray(message.participants)) return "participants: array expected";
                    for (var i = 0; i < message.participants.length; ++i) {
                        var error =
                            $root.SyncAction.SyncActionValue.BroadcastListParticipant.verify(
                                message.participants[i]
                            );
                        if (error) return "participants." + error;
                    }
                }
                if (message.listName != null && message.hasOwnProperty("listName")) {
                    properties._listName = 1;
                    if (!$util.isString(message.listName)) return "listName: string expected";
                }
                return null;
            };
            BusinessBroadcastListAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.BusinessBroadcastListAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.BusinessBroadcastListAction();
                if (object.deleted != null) message.deleted = Boolean(object.deleted);
                if (object.participants) {
                    if (!Array.isArray(object.participants))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.BusinessBroadcastListAction.participants: array expected"
                        );
                    message.participants = [];
                    for (var i = 0; i < object.participants.length; ++i) {
                        if (typeof object.participants[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.BusinessBroadcastListAction.participants: object expected"
                            );
                        message.participants[i] =
                            $root.SyncAction.SyncActionValue.BroadcastListParticipant.fromObject(
                                object.participants[i]
                            );
                    }
                }
                if (object.listName != null) message.listName = String(object.listName);
                return message;
            };
            BusinessBroadcastListAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.participants = [];
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    object.deleted = message.deleted;
                    if (options.oneofs) object._deleted = "deleted";
                }
                if (message.participants && message.participants.length) {
                    object.participants = [];
                    for (var j = 0; j < message.participants.length; ++j)
                        object.participants[j] =
                            $root.SyncAction.SyncActionValue.BroadcastListParticipant.toObject(
                                message.participants[j],
                                options
                            );
                }
                if (message.listName != null && message.hasOwnProperty("listName")) {
                    object.listName = message.listName;
                    if (options.oneofs) object._listName = "listName";
                }
                return object;
            };
            BusinessBroadcastListAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            BusinessBroadcastListAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.BusinessBroadcastListAction";
            };
            return BusinessBroadcastListAction;
        })();
        SyncActionValue.CallLogAction = (function () {
            function CallLogAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            CallLogAction.prototype.callLogRecord = null;
            var $oneOfFields;
            Object.defineProperty(CallLogAction.prototype, "_callLogRecord", {
                get: $util.oneOfGetter(($oneOfFields = ["callLogRecord"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            CallLogAction.create = function create(properties) {
                return new CallLogAction(properties);
            };
            CallLogAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.callLogRecord != null &&
                    Object.hasOwnProperty.call(message, "callLogRecord")
                )
                    $root.SyncAction.CallLogRecord.encode(
                        message.callLogRecord,
                        writer.uint32(10).fork()
                    ).ldelim();
                return writer;
            };
            CallLogAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            CallLogAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.CallLogAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.callLogRecord = $root.SyncAction.CallLogRecord.decode(
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
            CallLogAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            CallLogAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.callLogRecord != null && message.hasOwnProperty("callLogRecord")) {
                    properties._callLogRecord = 1;
                    {
                        var error = $root.SyncAction.CallLogRecord.verify(message.callLogRecord);
                        if (error) return "callLogRecord." + error;
                    }
                }
                return null;
            };
            CallLogAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.CallLogAction) return object;
                var message = new $root.SyncAction.SyncActionValue.CallLogAction();
                if (object.callLogRecord != null) {
                    if (typeof object.callLogRecord !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.CallLogAction.callLogRecord: object expected"
                        );
                    message.callLogRecord = $root.SyncAction.CallLogRecord.fromObject(
                        object.callLogRecord
                    );
                }
                return message;
            };
            CallLogAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.callLogRecord != null && message.hasOwnProperty("callLogRecord")) {
                    object.callLogRecord = $root.SyncAction.CallLogRecord.toObject(
                        message.callLogRecord,
                        options
                    );
                    if (options.oneofs) object._callLogRecord = "callLogRecord";
                }
                return object;
            };
            CallLogAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            CallLogAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.CallLogAction";
            };
            return CallLogAction;
        })();
        SyncActionValue.ChatAssignmentAction = (function () {
            function ChatAssignmentAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ChatAssignmentAction.prototype.deviceAgentID = null;
            var $oneOfFields;
            Object.defineProperty(ChatAssignmentAction.prototype, "_deviceAgentID", {
                get: $util.oneOfGetter(($oneOfFields = ["deviceAgentID"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ChatAssignmentAction.create = function create(properties) {
                return new ChatAssignmentAction(properties);
            };
            ChatAssignmentAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.deviceAgentID != null &&
                    Object.hasOwnProperty.call(message, "deviceAgentID")
                )
                    writer.uint32(10).string(message.deviceAgentID);
                return writer;
            };
            ChatAssignmentAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ChatAssignmentAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.ChatAssignmentAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.deviceAgentID = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ChatAssignmentAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ChatAssignmentAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.deviceAgentID != null && message.hasOwnProperty("deviceAgentID")) {
                    properties._deviceAgentID = 1;
                    if (!$util.isString(message.deviceAgentID))
                        return "deviceAgentID: string expected";
                }
                return null;
            };
            ChatAssignmentAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.ChatAssignmentAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.ChatAssignmentAction();
                if (object.deviceAgentID != null)
                    message.deviceAgentID = String(object.deviceAgentID);
                return message;
            };
            ChatAssignmentAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.deviceAgentID != null && message.hasOwnProperty("deviceAgentID")) {
                    object.deviceAgentID = message.deviceAgentID;
                    if (options.oneofs) object._deviceAgentID = "deviceAgentID";
                }
                return object;
            };
            ChatAssignmentAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ChatAssignmentAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.ChatAssignmentAction";
            };
            return ChatAssignmentAction;
        })();
        SyncActionValue.ChatAssignmentOpenedStatusAction = (function () {
            function ChatAssignmentOpenedStatusAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ChatAssignmentOpenedStatusAction.prototype.chatOpened = null;
            var $oneOfFields;
            Object.defineProperty(ChatAssignmentOpenedStatusAction.prototype, "_chatOpened", {
                get: $util.oneOfGetter(($oneOfFields = ["chatOpened"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ChatAssignmentOpenedStatusAction.create = function create(properties) {
                return new ChatAssignmentOpenedStatusAction(properties);
            };
            ChatAssignmentOpenedStatusAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.chatOpened != null && Object.hasOwnProperty.call(message, "chatOpened"))
                    writer.uint32(8).bool(message.chatOpened);
                return writer;
            };
            ChatAssignmentOpenedStatusAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            ChatAssignmentOpenedStatusAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.chatOpened = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ChatAssignmentOpenedStatusAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ChatAssignmentOpenedStatusAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.chatOpened != null && message.hasOwnProperty("chatOpened")) {
                    properties._chatOpened = 1;
                    if (typeof message.chatOpened !== "boolean")
                        return "chatOpened: boolean expected";
                }
                return null;
            };
            ChatAssignmentOpenedStatusAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction();
                if (object.chatOpened != null) message.chatOpened = Boolean(object.chatOpened);
                return message;
            };
            ChatAssignmentOpenedStatusAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.chatOpened != null && message.hasOwnProperty("chatOpened")) {
                    object.chatOpened = message.chatOpened;
                    if (options.oneofs) object._chatOpened = "chatOpened";
                }
                return object;
            };
            ChatAssignmentOpenedStatusAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ChatAssignmentOpenedStatusAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction"
                );
            };
            return ChatAssignmentOpenedStatusAction;
        })();
        SyncActionValue.ClearChatAction = (function () {
            function ClearChatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ClearChatAction.prototype.messageRange = null;
            var $oneOfFields;
            Object.defineProperty(ClearChatAction.prototype, "_messageRange", {
                get: $util.oneOfGetter(($oneOfFields = ["messageRange"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ClearChatAction.create = function create(properties) {
                return new ClearChatAction(properties);
            };
            ClearChatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.messageRange != null &&
                    Object.hasOwnProperty.call(message, "messageRange")
                )
                    $root.SyncAction.SyncActionValue.SyncActionMessageRange.encode(
                        message.messageRange,
                        writer.uint32(10).fork()
                    ).ldelim();
                return writer;
            };
            ClearChatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ClearChatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.ClearChatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.messageRange =
                                $root.SyncAction.SyncActionValue.SyncActionMessageRange.decode(
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
            ClearChatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ClearChatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    properties._messageRange = 1;
                    {
                        var error = $root.SyncAction.SyncActionValue.SyncActionMessageRange.verify(
                            message.messageRange
                        );
                        if (error) return "messageRange." + error;
                    }
                }
                return null;
            };
            ClearChatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.ClearChatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.ClearChatAction();
                if (object.messageRange != null) {
                    if (typeof object.messageRange !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.ClearChatAction.messageRange: object expected"
                        );
                    message.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.fromObject(
                            object.messageRange
                        );
                }
                return message;
            };
            ClearChatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    object.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.toObject(
                            message.messageRange,
                            options
                        );
                    if (options.oneofs) object._messageRange = "messageRange";
                }
                return object;
            };
            ClearChatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ClearChatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.ClearChatAction";
            };
            return ClearChatAction;
        })();
        SyncActionValue.ContactAction = (function () {
            function ContactAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ContactAction.prototype.fullName = null;
            ContactAction.prototype.firstName = null;
            ContactAction.prototype.lidJid = null;
            ContactAction.prototype.saveOnPrimaryAddressbook = null;
            ContactAction.prototype.pnJid = null;
            ContactAction.prototype.username = null;
            var $oneOfFields;
            Object.defineProperty(ContactAction.prototype, "_fullName", {
                get: $util.oneOfGetter(($oneOfFields = ["fullName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ContactAction.prototype, "_firstName", {
                get: $util.oneOfGetter(($oneOfFields = ["firstName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ContactAction.prototype, "_lidJid", {
                get: $util.oneOfGetter(($oneOfFields = ["lidJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ContactAction.prototype, "_saveOnPrimaryAddressbook", {
                get: $util.oneOfGetter(($oneOfFields = ["saveOnPrimaryAddressbook"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ContactAction.prototype, "_pnJid", {
                get: $util.oneOfGetter(($oneOfFields = ["pnJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ContactAction.prototype, "_username", {
                get: $util.oneOfGetter(($oneOfFields = ["username"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ContactAction.create = function create(properties) {
                return new ContactAction(properties);
            };
            ContactAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.fullName != null && Object.hasOwnProperty.call(message, "fullName"))
                    writer.uint32(10).string(message.fullName);
                if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                    writer.uint32(18).string(message.firstName);
                if (message.lidJid != null && Object.hasOwnProperty.call(message, "lidJid"))
                    writer.uint32(26).string(message.lidJid);
                if (
                    message.saveOnPrimaryAddressbook != null &&
                    Object.hasOwnProperty.call(message, "saveOnPrimaryAddressbook")
                )
                    writer.uint32(32).bool(message.saveOnPrimaryAddressbook);
                if (message.pnJid != null && Object.hasOwnProperty.call(message, "pnJid"))
                    writer.uint32(42).string(message.pnJid);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(50).string(message.username);
                return writer;
            };
            ContactAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ContactAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.ContactAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.fullName = reader.string();
                            break;
                        }
                        case 2: {
                            message.firstName = reader.string();
                            break;
                        }
                        case 3: {
                            message.lidJid = reader.string();
                            break;
                        }
                        case 4: {
                            message.saveOnPrimaryAddressbook = reader.bool();
                            break;
                        }
                        case 5: {
                            message.pnJid = reader.string();
                            break;
                        }
                        case 6: {
                            message.username = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ContactAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ContactAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.fullName != null && message.hasOwnProperty("fullName")) {
                    properties._fullName = 1;
                    if (!$util.isString(message.fullName)) return "fullName: string expected";
                }
                if (message.firstName != null && message.hasOwnProperty("firstName")) {
                    properties._firstName = 1;
                    if (!$util.isString(message.firstName)) return "firstName: string expected";
                }
                if (message.lidJid != null && message.hasOwnProperty("lidJid")) {
                    properties._lidJid = 1;
                    if (!$util.isString(message.lidJid)) return "lidJid: string expected";
                }
                if (
                    message.saveOnPrimaryAddressbook != null &&
                    message.hasOwnProperty("saveOnPrimaryAddressbook")
                ) {
                    properties._saveOnPrimaryAddressbook = 1;
                    if (typeof message.saveOnPrimaryAddressbook !== "boolean")
                        return "saveOnPrimaryAddressbook: boolean expected";
                }
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    properties._pnJid = 1;
                    if (!$util.isString(message.pnJid)) return "pnJid: string expected";
                }
                if (message.username != null && message.hasOwnProperty("username")) {
                    properties._username = 1;
                    if (!$util.isString(message.username)) return "username: string expected";
                }
                return null;
            };
            ContactAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.ContactAction) return object;
                var message = new $root.SyncAction.SyncActionValue.ContactAction();
                if (object.fullName != null) message.fullName = String(object.fullName);
                if (object.firstName != null) message.firstName = String(object.firstName);
                if (object.lidJid != null) message.lidJid = String(object.lidJid);
                if (object.saveOnPrimaryAddressbook != null)
                    message.saveOnPrimaryAddressbook = Boolean(object.saveOnPrimaryAddressbook);
                if (object.pnJid != null) message.pnJid = String(object.pnJid);
                if (object.username != null) message.username = String(object.username);
                return message;
            };
            ContactAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.fullName != null && message.hasOwnProperty("fullName")) {
                    object.fullName = message.fullName;
                    if (options.oneofs) object._fullName = "fullName";
                }
                if (message.firstName != null && message.hasOwnProperty("firstName")) {
                    object.firstName = message.firstName;
                    if (options.oneofs) object._firstName = "firstName";
                }
                if (message.lidJid != null && message.hasOwnProperty("lidJid")) {
                    object.lidJid = message.lidJid;
                    if (options.oneofs) object._lidJid = "lidJid";
                }
                if (
                    message.saveOnPrimaryAddressbook != null &&
                    message.hasOwnProperty("saveOnPrimaryAddressbook")
                ) {
                    object.saveOnPrimaryAddressbook = message.saveOnPrimaryAddressbook;
                    if (options.oneofs)
                        object._saveOnPrimaryAddressbook = "saveOnPrimaryAddressbook";
                }
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    object.pnJid = message.pnJid;
                    if (options.oneofs) object._pnJid = "pnJid";
                }
                if (message.username != null && message.hasOwnProperty("username")) {
                    object.username = message.username;
                    if (options.oneofs) object._username = "username";
                }
                return object;
            };
            ContactAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ContactAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.ContactAction";
            };
            return ContactAction;
        })();
        SyncActionValue.CtwaPerCustomerDataSharingAction = (function () {
            function CtwaPerCustomerDataSharingAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            CtwaPerCustomerDataSharingAction.prototype.isCtwaPerCustomerDataSharingEnabled = null;
            var $oneOfFields;
            Object.defineProperty(
                CtwaPerCustomerDataSharingAction.prototype,
                "_isCtwaPerCustomerDataSharingEnabled",
                {
                    get: $util.oneOfGetter(
                        ($oneOfFields = ["isCtwaPerCustomerDataSharingEnabled"])
                    ),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            CtwaPerCustomerDataSharingAction.create = function create(properties) {
                return new CtwaPerCustomerDataSharingAction(properties);
            };
            CtwaPerCustomerDataSharingAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.isCtwaPerCustomerDataSharingEnabled != null &&
                    Object.hasOwnProperty.call(message, "isCtwaPerCustomerDataSharingEnabled")
                )
                    writer.uint32(8).bool(message.isCtwaPerCustomerDataSharingEnabled);
                return writer;
            };
            CtwaPerCustomerDataSharingAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            CtwaPerCustomerDataSharingAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isCtwaPerCustomerDataSharingEnabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            CtwaPerCustomerDataSharingAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            CtwaPerCustomerDataSharingAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.isCtwaPerCustomerDataSharingEnabled != null &&
                    message.hasOwnProperty("isCtwaPerCustomerDataSharingEnabled")
                ) {
                    properties._isCtwaPerCustomerDataSharingEnabled = 1;
                    if (typeof message.isCtwaPerCustomerDataSharingEnabled !== "boolean")
                        return "isCtwaPerCustomerDataSharingEnabled: boolean expected";
                }
                return null;
            };
            CtwaPerCustomerDataSharingAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction();
                if (object.isCtwaPerCustomerDataSharingEnabled != null)
                    message.isCtwaPerCustomerDataSharingEnabled = Boolean(
                        object.isCtwaPerCustomerDataSharingEnabled
                    );
                return message;
            };
            CtwaPerCustomerDataSharingAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.isCtwaPerCustomerDataSharingEnabled != null &&
                    message.hasOwnProperty("isCtwaPerCustomerDataSharingEnabled")
                ) {
                    object.isCtwaPerCustomerDataSharingEnabled =
                        message.isCtwaPerCustomerDataSharingEnabled;
                    if (options.oneofs)
                        object._isCtwaPerCustomerDataSharingEnabled =
                            "isCtwaPerCustomerDataSharingEnabled";
                }
                return object;
            };
            CtwaPerCustomerDataSharingAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            CtwaPerCustomerDataSharingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction"
                );
            };
            return CtwaPerCustomerDataSharingAction;
        })();
        SyncActionValue.CustomPaymentMethod = (function () {
            function CustomPaymentMethod(properties) {
                this.metadata = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            CustomPaymentMethod.prototype.credentialId = null;
            CustomPaymentMethod.prototype.country = null;
            CustomPaymentMethod.prototype.type = null;
            CustomPaymentMethod.prototype.metadata = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(CustomPaymentMethod.prototype, "_credentialId", {
                get: $util.oneOfGetter(($oneOfFields = ["credentialId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(CustomPaymentMethod.prototype, "_country", {
                get: $util.oneOfGetter(($oneOfFields = ["country"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(CustomPaymentMethod.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            CustomPaymentMethod.create = function create(properties) {
                return new CustomPaymentMethod(properties);
            };
            CustomPaymentMethod.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.credentialId != null &&
                    Object.hasOwnProperty.call(message, "credentialId")
                )
                    writer.uint32(10).string(message.credentialId);
                if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                    writer.uint32(18).string(message.country);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(26).string(message.type);
                if (message.metadata != null && message.metadata.length)
                    for (var i = 0; i < message.metadata.length; ++i)
                        $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata.encode(
                            message.metadata[i],
                            writer.uint32(34).fork()
                        ).ldelim();
                return writer;
            };
            CustomPaymentMethod.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            CustomPaymentMethod.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.CustomPaymentMethod();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.credentialId = reader.string();
                            break;
                        }
                        case 2: {
                            message.country = reader.string();
                            break;
                        }
                        case 3: {
                            message.type = reader.string();
                            break;
                        }
                        case 4: {
                            if (!(message.metadata && message.metadata.length))
                                message.metadata = [];
                            message.metadata.push(
                                $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata.decode(
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
            CustomPaymentMethod.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            CustomPaymentMethod.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.credentialId != null && message.hasOwnProperty("credentialId")) {
                    properties._credentialId = 1;
                    if (!$util.isString(message.credentialId))
                        return "credentialId: string expected";
                }
                if (message.country != null && message.hasOwnProperty("country")) {
                    properties._country = 1;
                    if (!$util.isString(message.country)) return "country: string expected";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    if (!$util.isString(message.type)) return "type: string expected";
                }
                if (message.metadata != null && message.hasOwnProperty("metadata")) {
                    if (!Array.isArray(message.metadata)) return "metadata: array expected";
                    for (var i = 0; i < message.metadata.length; ++i) {
                        var error =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata.verify(
                                message.metadata[i]
                            );
                        if (error) return "metadata." + error;
                    }
                }
                return null;
            };
            CustomPaymentMethod.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.CustomPaymentMethod)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.CustomPaymentMethod();
                if (object.credentialId != null) message.credentialId = String(object.credentialId);
                if (object.country != null) message.country = String(object.country);
                if (object.type != null) message.type = String(object.type);
                if (object.metadata) {
                    if (!Array.isArray(object.metadata))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.CustomPaymentMethod.metadata: array expected"
                        );
                    message.metadata = [];
                    for (var i = 0; i < object.metadata.length; ++i) {
                        if (typeof object.metadata[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.CustomPaymentMethod.metadata: object expected"
                            );
                        message.metadata[i] =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata.fromObject(
                                object.metadata[i]
                            );
                    }
                }
                return message;
            };
            CustomPaymentMethod.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.metadata = [];
                if (message.credentialId != null && message.hasOwnProperty("credentialId")) {
                    object.credentialId = message.credentialId;
                    if (options.oneofs) object._credentialId = "credentialId";
                }
                if (message.country != null && message.hasOwnProperty("country")) {
                    object.country = message.country;
                    if (options.oneofs) object._country = "country";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type = message.type;
                    if (options.oneofs) object._type = "type";
                }
                if (message.metadata && message.metadata.length) {
                    object.metadata = [];
                    for (var j = 0; j < message.metadata.length; ++j)
                        object.metadata[j] =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata.toObject(
                                message.metadata[j],
                                options
                            );
                }
                return object;
            };
            CustomPaymentMethod.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            CustomPaymentMethod.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.CustomPaymentMethod";
            };
            return CustomPaymentMethod;
        })();
        SyncActionValue.CustomPaymentMethodMetadata = (function () {
            function CustomPaymentMethodMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            CustomPaymentMethodMetadata.prototype.key = null;
            CustomPaymentMethodMetadata.prototype.value = null;
            var $oneOfFields;
            Object.defineProperty(CustomPaymentMethodMetadata.prototype, "_key", {
                get: $util.oneOfGetter(($oneOfFields = ["key"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(CustomPaymentMethodMetadata.prototype, "_value", {
                get: $util.oneOfGetter(($oneOfFields = ["value"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            CustomPaymentMethodMetadata.create = function create(properties) {
                return new CustomPaymentMethodMetadata(properties);
            };
            CustomPaymentMethodMetadata.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(10).string(message.key);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(18).string(message.value);
                return writer;
            };
            CustomPaymentMethodMetadata.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            CustomPaymentMethodMetadata.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.key = reader.string();
                            break;
                        }
                        case 2: {
                            message.value = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            CustomPaymentMethodMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            CustomPaymentMethodMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    properties._key = 1;
                    if (!$util.isString(message.key)) return "key: string expected";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    properties._value = 1;
                    if (!$util.isString(message.value)) return "value: string expected";
                }
                return null;
            };
            CustomPaymentMethodMetadata.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.CustomPaymentMethodMetadata();
                if (object.key != null) message.key = String(object.key);
                if (object.value != null) message.value = String(object.value);
                return message;
            };
            CustomPaymentMethodMetadata.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    object.key = message.key;
                    if (options.oneofs) object._key = "key";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                    object.value = message.value;
                    if (options.oneofs) object._value = "value";
                }
                return object;
            };
            CustomPaymentMethodMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            CustomPaymentMethodMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.CustomPaymentMethodMetadata";
            };
            return CustomPaymentMethodMetadata;
        })();
        SyncActionValue.CustomPaymentMethodsAction = (function () {
            function CustomPaymentMethodsAction(properties) {
                this.customPaymentMethods = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            CustomPaymentMethodsAction.prototype.customPaymentMethods = $util.emptyArray;
            CustomPaymentMethodsAction.create = function create(properties) {
                return new CustomPaymentMethodsAction(properties);
            };
            CustomPaymentMethodsAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.customPaymentMethods != null && message.customPaymentMethods.length)
                    for (var i = 0; i < message.customPaymentMethods.length; ++i)
                        $root.SyncAction.SyncActionValue.CustomPaymentMethod.encode(
                            message.customPaymentMethods[i],
                            writer.uint32(10).fork()
                        ).ldelim();
                return writer;
            };
            CustomPaymentMethodsAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            CustomPaymentMethodsAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (
                                !(
                                    message.customPaymentMethods &&
                                    message.customPaymentMethods.length
                                )
                            )
                                message.customPaymentMethods = [];
                            message.customPaymentMethods.push(
                                $root.SyncAction.SyncActionValue.CustomPaymentMethod.decode(
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
            CustomPaymentMethodsAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            CustomPaymentMethodsAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                if (
                    message.customPaymentMethods != null &&
                    message.hasOwnProperty("customPaymentMethods")
                ) {
                    if (!Array.isArray(message.customPaymentMethods))
                        return "customPaymentMethods: array expected";
                    for (var i = 0; i < message.customPaymentMethods.length; ++i) {
                        var error = $root.SyncAction.SyncActionValue.CustomPaymentMethod.verify(
                            message.customPaymentMethods[i]
                        );
                        if (error) return "customPaymentMethods." + error;
                    }
                }
                return null;
            };
            CustomPaymentMethodsAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.CustomPaymentMethodsAction();
                if (object.customPaymentMethods) {
                    if (!Array.isArray(object.customPaymentMethods))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.CustomPaymentMethodsAction.customPaymentMethods: array expected"
                        );
                    message.customPaymentMethods = [];
                    for (var i = 0; i < object.customPaymentMethods.length; ++i) {
                        if (typeof object.customPaymentMethods[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.CustomPaymentMethodsAction.customPaymentMethods: object expected"
                            );
                        message.customPaymentMethods[i] =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethod.fromObject(
                                object.customPaymentMethods[i]
                            );
                    }
                }
                return message;
            };
            CustomPaymentMethodsAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.customPaymentMethods = [];
                if (message.customPaymentMethods && message.customPaymentMethods.length) {
                    object.customPaymentMethods = [];
                    for (var j = 0; j < message.customPaymentMethods.length; ++j)
                        object.customPaymentMethods[j] =
                            $root.SyncAction.SyncActionValue.CustomPaymentMethod.toObject(
                                message.customPaymentMethods[j],
                                options
                            );
                }
                return object;
            };
            CustomPaymentMethodsAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            CustomPaymentMethodsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.CustomPaymentMethodsAction";
            };
            return CustomPaymentMethodsAction;
        })();
        SyncActionValue.DeleteChatAction = (function () {
            function DeleteChatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            DeleteChatAction.prototype.messageRange = null;
            var $oneOfFields;
            Object.defineProperty(DeleteChatAction.prototype, "_messageRange", {
                get: $util.oneOfGetter(($oneOfFields = ["messageRange"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            DeleteChatAction.create = function create(properties) {
                return new DeleteChatAction(properties);
            };
            DeleteChatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.messageRange != null &&
                    Object.hasOwnProperty.call(message, "messageRange")
                )
                    $root.SyncAction.SyncActionValue.SyncActionMessageRange.encode(
                        message.messageRange,
                        writer.uint32(10).fork()
                    ).ldelim();
                return writer;
            };
            DeleteChatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            DeleteChatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.DeleteChatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.messageRange =
                                $root.SyncAction.SyncActionValue.SyncActionMessageRange.decode(
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
            DeleteChatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            DeleteChatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    properties._messageRange = 1;
                    {
                        var error = $root.SyncAction.SyncActionValue.SyncActionMessageRange.verify(
                            message.messageRange
                        );
                        if (error) return "messageRange." + error;
                    }
                }
                return null;
            };
            DeleteChatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.DeleteChatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.DeleteChatAction();
                if (object.messageRange != null) {
                    if (typeof object.messageRange !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.DeleteChatAction.messageRange: object expected"
                        );
                    message.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.fromObject(
                            object.messageRange
                        );
                }
                return message;
            };
            DeleteChatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    object.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.toObject(
                            message.messageRange,
                            options
                        );
                    if (options.oneofs) object._messageRange = "messageRange";
                }
                return object;
            };
            DeleteChatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            DeleteChatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.DeleteChatAction";
            };
            return DeleteChatAction;
        })();
        SyncActionValue.DeleteIndividualCallLogAction = (function () {
            function DeleteIndividualCallLogAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            DeleteIndividualCallLogAction.prototype.peerJid = null;
            DeleteIndividualCallLogAction.prototype.isIncoming = null;
            var $oneOfFields;
            Object.defineProperty(DeleteIndividualCallLogAction.prototype, "_peerJid", {
                get: $util.oneOfGetter(($oneOfFields = ["peerJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(DeleteIndividualCallLogAction.prototype, "_isIncoming", {
                get: $util.oneOfGetter(($oneOfFields = ["isIncoming"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            DeleteIndividualCallLogAction.create = function create(properties) {
                return new DeleteIndividualCallLogAction(properties);
            };
            DeleteIndividualCallLogAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.peerJid != null && Object.hasOwnProperty.call(message, "peerJid"))
                    writer.uint32(10).string(message.peerJid);
                if (message.isIncoming != null && Object.hasOwnProperty.call(message, "isIncoming"))
                    writer.uint32(16).bool(message.isIncoming);
                return writer;
            };
            DeleteIndividualCallLogAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            DeleteIndividualCallLogAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.peerJid = reader.string();
                            break;
                        }
                        case 2: {
                            message.isIncoming = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            DeleteIndividualCallLogAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            DeleteIndividualCallLogAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.peerJid != null && message.hasOwnProperty("peerJid")) {
                    properties._peerJid = 1;
                    if (!$util.isString(message.peerJid)) return "peerJid: string expected";
                }
                if (message.isIncoming != null && message.hasOwnProperty("isIncoming")) {
                    properties._isIncoming = 1;
                    if (typeof message.isIncoming !== "boolean")
                        return "isIncoming: boolean expected";
                }
                return null;
            };
            DeleteIndividualCallLogAction.fromObject = function fromObject(object) {
                if (
                    object instanceof $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction
                )
                    return object;
                var message = new $root.SyncAction.SyncActionValue.DeleteIndividualCallLogAction();
                if (object.peerJid != null) message.peerJid = String(object.peerJid);
                if (object.isIncoming != null) message.isIncoming = Boolean(object.isIncoming);
                return message;
            };
            DeleteIndividualCallLogAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.peerJid != null && message.hasOwnProperty("peerJid")) {
                    object.peerJid = message.peerJid;
                    if (options.oneofs) object._peerJid = "peerJid";
                }
                if (message.isIncoming != null && message.hasOwnProperty("isIncoming")) {
                    object.isIncoming = message.isIncoming;
                    if (options.oneofs) object._isIncoming = "isIncoming";
                }
                return object;
            };
            DeleteIndividualCallLogAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            DeleteIndividualCallLogAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.DeleteIndividualCallLogAction";
            };
            return DeleteIndividualCallLogAction;
        })();
        SyncActionValue.DeleteMessageForMeAction = (function () {
            function DeleteMessageForMeAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            DeleteMessageForMeAction.prototype.deleteMedia = null;
            DeleteMessageForMeAction.prototype.messageTimestamp = null;
            var $oneOfFields;
            Object.defineProperty(DeleteMessageForMeAction.prototype, "_deleteMedia", {
                get: $util.oneOfGetter(($oneOfFields = ["deleteMedia"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(DeleteMessageForMeAction.prototype, "_messageTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["messageTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            DeleteMessageForMeAction.create = function create(properties) {
                return new DeleteMessageForMeAction(properties);
            };
            DeleteMessageForMeAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.deleteMedia != null &&
                    Object.hasOwnProperty.call(message, "deleteMedia")
                )
                    writer.uint32(8).bool(message.deleteMedia);
                if (
                    message.messageTimestamp != null &&
                    Object.hasOwnProperty.call(message, "messageTimestamp")
                )
                    writer.uint32(16).int64(message.messageTimestamp);
                return writer;
            };
            DeleteMessageForMeAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            DeleteMessageForMeAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.DeleteMessageForMeAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.deleteMedia = reader.bool();
                            break;
                        }
                        case 2: {
                            message.messageTimestamp = reader.int64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            DeleteMessageForMeAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            DeleteMessageForMeAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.deleteMedia != null && message.hasOwnProperty("deleteMedia")) {
                    properties._deleteMedia = 1;
                    if (typeof message.deleteMedia !== "boolean")
                        return "deleteMedia: boolean expected";
                }
                if (
                    message.messageTimestamp != null &&
                    message.hasOwnProperty("messageTimestamp")
                ) {
                    properties._messageTimestamp = 1;
                    if (
                        !$util.isInteger(message.messageTimestamp) &&
                        !(
                            message.messageTimestamp &&
                            $util.isInteger(message.messageTimestamp.low) &&
                            $util.isInteger(message.messageTimestamp.high)
                        )
                    )
                        return "messageTimestamp: integer|Long expected";
                }
                return null;
            };
            DeleteMessageForMeAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.DeleteMessageForMeAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.DeleteMessageForMeAction();
                if (object.deleteMedia != null) message.deleteMedia = Boolean(object.deleteMedia);
                if (object.messageTimestamp != null)
                    if ($util.Long)
                        (message.messageTimestamp = $util.Long.fromValue(
                            object.messageTimestamp
                        )).unsigned = false;
                    else if (typeof object.messageTimestamp === "string")
                        message.messageTimestamp = parseInt(object.messageTimestamp, 10);
                    else if (typeof object.messageTimestamp === "number")
                        message.messageTimestamp = object.messageTimestamp;
                    else if (typeof object.messageTimestamp === "object")
                        message.messageTimestamp = new $util.LongBits(
                            object.messageTimestamp.low >>> 0,
                            object.messageTimestamp.high >>> 0
                        ).toNumber();
                return message;
            };
            DeleteMessageForMeAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.deleteMedia != null && message.hasOwnProperty("deleteMedia")) {
                    object.deleteMedia = message.deleteMedia;
                    if (options.oneofs) object._deleteMedia = "deleteMedia";
                }
                if (
                    message.messageTimestamp != null &&
                    message.hasOwnProperty("messageTimestamp")
                ) {
                    if (typeof message.messageTimestamp === "number")
                        object.messageTimestamp =
                            options.longs === String
                                ? String(message.messageTimestamp)
                                : message.messageTimestamp;
                    else
                        object.messageTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.messageTimestamp)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.messageTimestamp.low >>> 0,
                                        message.messageTimestamp.high >>> 0
                                    ).toNumber()
                                  : message.messageTimestamp;
                    if (options.oneofs) object._messageTimestamp = "messageTimestamp";
                }
                return object;
            };
            DeleteMessageForMeAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            DeleteMessageForMeAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.DeleteMessageForMeAction";
            };
            return DeleteMessageForMeAction;
        })();
        SyncActionValue.DetectedOutcomesStatusAction = (function () {
            function DetectedOutcomesStatusAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            DetectedOutcomesStatusAction.prototype.isEnabled = null;
            var $oneOfFields;
            Object.defineProperty(DetectedOutcomesStatusAction.prototype, "_isEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            DetectedOutcomesStatusAction.create = function create(properties) {
                return new DetectedOutcomesStatusAction(properties);
            };
            DetectedOutcomesStatusAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.isEnabled != null && Object.hasOwnProperty.call(message, "isEnabled"))
                    writer.uint32(8).bool(message.isEnabled);
                return writer;
            };
            DetectedOutcomesStatusAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            DetectedOutcomesStatusAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isEnabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            DetectedOutcomesStatusAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            DetectedOutcomesStatusAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isEnabled != null && message.hasOwnProperty("isEnabled")) {
                    properties._isEnabled = 1;
                    if (typeof message.isEnabled !== "boolean")
                        return "isEnabled: boolean expected";
                }
                return null;
            };
            DetectedOutcomesStatusAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.DetectedOutcomesStatusAction();
                if (object.isEnabled != null) message.isEnabled = Boolean(object.isEnabled);
                return message;
            };
            DetectedOutcomesStatusAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.isEnabled != null && message.hasOwnProperty("isEnabled")) {
                    object.isEnabled = message.isEnabled;
                    if (options.oneofs) object._isEnabled = "isEnabled";
                }
                return object;
            };
            DetectedOutcomesStatusAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            DetectedOutcomesStatusAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.DetectedOutcomesStatusAction";
            };
            return DetectedOutcomesStatusAction;
        })();
        SyncActionValue.ExternalWebBetaAction = (function () {
            function ExternalWebBetaAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ExternalWebBetaAction.prototype.isOptIn = null;
            var $oneOfFields;
            Object.defineProperty(ExternalWebBetaAction.prototype, "_isOptIn", {
                get: $util.oneOfGetter(($oneOfFields = ["isOptIn"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ExternalWebBetaAction.create = function create(properties) {
                return new ExternalWebBetaAction(properties);
            };
            ExternalWebBetaAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.isOptIn != null && Object.hasOwnProperty.call(message, "isOptIn"))
                    writer.uint32(8).bool(message.isOptIn);
                return writer;
            };
            ExternalWebBetaAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ExternalWebBetaAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.ExternalWebBetaAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isOptIn = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ExternalWebBetaAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ExternalWebBetaAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isOptIn != null && message.hasOwnProperty("isOptIn")) {
                    properties._isOptIn = 1;
                    if (typeof message.isOptIn !== "boolean") return "isOptIn: boolean expected";
                }
                return null;
            };
            ExternalWebBetaAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.ExternalWebBetaAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.ExternalWebBetaAction();
                if (object.isOptIn != null) message.isOptIn = Boolean(object.isOptIn);
                return message;
            };
            ExternalWebBetaAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.isOptIn != null && message.hasOwnProperty("isOptIn")) {
                    object.isOptIn = message.isOptIn;
                    if (options.oneofs) object._isOptIn = "isOptIn";
                }
                return object;
            };
            ExternalWebBetaAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ExternalWebBetaAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.ExternalWebBetaAction";
            };
            return ExternalWebBetaAction;
        })();
        SyncActionValue.FavoritesAction = (function () {
            function FavoritesAction(properties) {
                this.favorites = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            FavoritesAction.prototype.favorites = $util.emptyArray;
            FavoritesAction.create = function create(properties) {
                return new FavoritesAction(properties);
            };
            FavoritesAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.favorites != null && message.favorites.length)
                    for (var i = 0; i < message.favorites.length; ++i)
                        $root.SyncAction.SyncActionValue.FavoritesAction.Favorite.encode(
                            message.favorites[i],
                            writer.uint32(10).fork()
                        ).ldelim();
                return writer;
            };
            FavoritesAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            FavoritesAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.FavoritesAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (!(message.favorites && message.favorites.length))
                                message.favorites = [];
                            message.favorites.push(
                                $root.SyncAction.SyncActionValue.FavoritesAction.Favorite.decode(
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
            FavoritesAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            FavoritesAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                if (message.favorites != null && message.hasOwnProperty("favorites")) {
                    if (!Array.isArray(message.favorites)) return "favorites: array expected";
                    for (var i = 0; i < message.favorites.length; ++i) {
                        var error =
                            $root.SyncAction.SyncActionValue.FavoritesAction.Favorite.verify(
                                message.favorites[i]
                            );
                        if (error) return "favorites." + error;
                    }
                }
                return null;
            };
            FavoritesAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.FavoritesAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.FavoritesAction();
                if (object.favorites) {
                    if (!Array.isArray(object.favorites))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.FavoritesAction.favorites: array expected"
                        );
                    message.favorites = [];
                    for (var i = 0; i < object.favorites.length; ++i) {
                        if (typeof object.favorites[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.FavoritesAction.favorites: object expected"
                            );
                        message.favorites[i] =
                            $root.SyncAction.SyncActionValue.FavoritesAction.Favorite.fromObject(
                                object.favorites[i]
                            );
                    }
                }
                return message;
            };
            FavoritesAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.favorites = [];
                if (message.favorites && message.favorites.length) {
                    object.favorites = [];
                    for (var j = 0; j < message.favorites.length; ++j)
                        object.favorites[j] =
                            $root.SyncAction.SyncActionValue.FavoritesAction.Favorite.toObject(
                                message.favorites[j],
                                options
                            );
                }
                return object;
            };
            FavoritesAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            FavoritesAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.FavoritesAction";
            };
            FavoritesAction.Favorite = (function () {
                function Favorite(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                Favorite.prototype.id = null;
                var $oneOfFields;
                Object.defineProperty(Favorite.prototype, "_id", {
                    get: $util.oneOfGetter(($oneOfFields = ["id"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Favorite.create = function create(properties) {
                    return new Favorite(properties);
                };
                Favorite.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(10).string(message.id);
                    return writer;
                };
                Favorite.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                Favorite.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message = new $root.SyncAction.SyncActionValue.FavoritesAction.Favorite();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.id = reader.string();
                                break;
                            }
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };
                Favorite.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
                Favorite.verify = function verify(message) {
                    if (typeof message !== "object" || message === null) return "object expected";
                    var properties = {};
                    if (message.id != null && message.hasOwnProperty("id")) {
                        properties._id = 1;
                        if (!$util.isString(message.id)) return "id: string expected";
                    }
                    return null;
                };
                Favorite.fromObject = function fromObject(object) {
                    if (object instanceof $root.SyncAction.SyncActionValue.FavoritesAction.Favorite)
                        return object;
                    var message = new $root.SyncAction.SyncActionValue.FavoritesAction.Favorite();
                    if (object.id != null) message.id = String(object.id);
                    return message;
                };
                Favorite.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.id != null && message.hasOwnProperty("id")) {
                        object.id = message.id;
                        if (options.oneofs) object._id = "id";
                    }
                    return object;
                };
                Favorite.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Favorite.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/SyncAction.SyncActionValue.FavoritesAction.Favorite";
                };
                return Favorite;
            })();
            return FavoritesAction;
        })();
        SyncActionValue.InteractiveMessageAction = (function () {
            function InteractiveMessageAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            InteractiveMessageAction.prototype.type = null;
            var $oneOfFields;
            Object.defineProperty(InteractiveMessageAction.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            InteractiveMessageAction.create = function create(properties) {
                return new InteractiveMessageAction(properties);
            };
            InteractiveMessageAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(8).int32(message.type);
                return writer;
            };
            InteractiveMessageAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            InteractiveMessageAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.InteractiveMessageAction();
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
            InteractiveMessageAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            InteractiveMessageAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 1:
                            break;
                    }
                }
                return null;
            };
            InteractiveMessageAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.InteractiveMessageAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.InteractiveMessageAction();
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "DISABLE_CTA":
                    case 1:
                        message.type = 1;
                        break;
                }
                return message;
            };
            InteractiveMessageAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.InteractiveMessageAction
                                  .InteractiveMessageActionMode[message.type] === undefined
                                ? message.type
                                : $root.SyncAction.SyncActionValue.InteractiveMessageAction
                                      .InteractiveMessageActionMode[message.type]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                return object;
            };
            InteractiveMessageAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            InteractiveMessageAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.InteractiveMessageAction";
            };
            InteractiveMessageAction.InteractiveMessageActionMode = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[1] = "DISABLE_CTA")] = 1;
                return values;
            })();
            return InteractiveMessageAction;
        })();
        SyncActionValue.KeyExpiration = (function () {
            function KeyExpiration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            KeyExpiration.prototype.expiredKeyEpoch = null;
            var $oneOfFields;
            Object.defineProperty(KeyExpiration.prototype, "_expiredKeyEpoch", {
                get: $util.oneOfGetter(($oneOfFields = ["expiredKeyEpoch"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            KeyExpiration.create = function create(properties) {
                return new KeyExpiration(properties);
            };
            KeyExpiration.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.expiredKeyEpoch != null &&
                    Object.hasOwnProperty.call(message, "expiredKeyEpoch")
                )
                    writer.uint32(8).int32(message.expiredKeyEpoch);
                return writer;
            };
            KeyExpiration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            KeyExpiration.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.KeyExpiration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.expiredKeyEpoch = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            KeyExpiration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            KeyExpiration.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.expiredKeyEpoch != null && message.hasOwnProperty("expiredKeyEpoch")) {
                    properties._expiredKeyEpoch = 1;
                    if (!$util.isInteger(message.expiredKeyEpoch))
                        return "expiredKeyEpoch: integer expected";
                }
                return null;
            };
            KeyExpiration.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.KeyExpiration) return object;
                var message = new $root.SyncAction.SyncActionValue.KeyExpiration();
                if (object.expiredKeyEpoch != null)
                    message.expiredKeyEpoch = object.expiredKeyEpoch | 0;
                return message;
            };
            KeyExpiration.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.expiredKeyEpoch != null && message.hasOwnProperty("expiredKeyEpoch")) {
                    object.expiredKeyEpoch = message.expiredKeyEpoch;
                    if (options.oneofs) object._expiredKeyEpoch = "expiredKeyEpoch";
                }
                return object;
            };
            KeyExpiration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            KeyExpiration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.KeyExpiration";
            };
            return KeyExpiration;
        })();
        SyncActionValue.LabelAssociationAction = (function () {
            function LabelAssociationAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LabelAssociationAction.prototype.labeled = null;
            var $oneOfFields;
            Object.defineProperty(LabelAssociationAction.prototype, "_labeled", {
                get: $util.oneOfGetter(($oneOfFields = ["labeled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LabelAssociationAction.create = function create(properties) {
                return new LabelAssociationAction(properties);
            };
            LabelAssociationAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.labeled != null && Object.hasOwnProperty.call(message, "labeled"))
                    writer.uint32(8).bool(message.labeled);
                return writer;
            };
            LabelAssociationAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LabelAssociationAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LabelAssociationAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.labeled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LabelAssociationAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LabelAssociationAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.labeled != null && message.hasOwnProperty("labeled")) {
                    properties._labeled = 1;
                    if (typeof message.labeled !== "boolean") return "labeled: boolean expected";
                }
                return null;
            };
            LabelAssociationAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LabelAssociationAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.LabelAssociationAction();
                if (object.labeled != null) message.labeled = Boolean(object.labeled);
                return message;
            };
            LabelAssociationAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.labeled != null && message.hasOwnProperty("labeled")) {
                    object.labeled = message.labeled;
                    if (options.oneofs) object._labeled = "labeled";
                }
                return object;
            };
            LabelAssociationAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LabelAssociationAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LabelAssociationAction";
            };
            return LabelAssociationAction;
        })();
        SyncActionValue.LabelEditAction = (function () {
            function LabelEditAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LabelEditAction.prototype.name = null;
            LabelEditAction.prototype.color = null;
            LabelEditAction.prototype.predefinedId = null;
            LabelEditAction.prototype.deleted = null;
            LabelEditAction.prototype.orderIndex = null;
            LabelEditAction.prototype.isActive = null;
            LabelEditAction.prototype.type = null;
            LabelEditAction.prototype.isImmutable = null;
            LabelEditAction.prototype.muteEndTimeMs = null;
            var $oneOfFields;
            Object.defineProperty(LabelEditAction.prototype, "_name", {
                get: $util.oneOfGetter(($oneOfFields = ["name"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_color", {
                get: $util.oneOfGetter(($oneOfFields = ["color"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_predefinedId", {
                get: $util.oneOfGetter(($oneOfFields = ["predefinedId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_deleted", {
                get: $util.oneOfGetter(($oneOfFields = ["deleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_orderIndex", {
                get: $util.oneOfGetter(($oneOfFields = ["orderIndex"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_isActive", {
                get: $util.oneOfGetter(($oneOfFields = ["isActive"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_isImmutable", {
                get: $util.oneOfGetter(($oneOfFields = ["isImmutable"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LabelEditAction.prototype, "_muteEndTimeMs", {
                get: $util.oneOfGetter(($oneOfFields = ["muteEndTimeMs"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LabelEditAction.create = function create(properties) {
                return new LabelEditAction(properties);
            };
            LabelEditAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(10).string(message.name);
                if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                    writer.uint32(16).int32(message.color);
                if (
                    message.predefinedId != null &&
                    Object.hasOwnProperty.call(message, "predefinedId")
                )
                    writer.uint32(24).int32(message.predefinedId);
                if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                    writer.uint32(32).bool(message.deleted);
                if (message.orderIndex != null && Object.hasOwnProperty.call(message, "orderIndex"))
                    writer.uint32(40).int32(message.orderIndex);
                if (message.isActive != null && Object.hasOwnProperty.call(message, "isActive"))
                    writer.uint32(48).bool(message.isActive);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(56).int32(message.type);
                if (
                    message.isImmutable != null &&
                    Object.hasOwnProperty.call(message, "isImmutable")
                )
                    writer.uint32(64).bool(message.isImmutable);
                if (
                    message.muteEndTimeMs != null &&
                    Object.hasOwnProperty.call(message, "muteEndTimeMs")
                )
                    writer.uint32(72).int64(message.muteEndTimeMs);
                return writer;
            };
            LabelEditAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LabelEditAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LabelEditAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.name = reader.string();
                            break;
                        }
                        case 2: {
                            message.color = reader.int32();
                            break;
                        }
                        case 3: {
                            message.predefinedId = reader.int32();
                            break;
                        }
                        case 4: {
                            message.deleted = reader.bool();
                            break;
                        }
                        case 5: {
                            message.orderIndex = reader.int32();
                            break;
                        }
                        case 6: {
                            message.isActive = reader.bool();
                            break;
                        }
                        case 7: {
                            message.type = reader.int32();
                            break;
                        }
                        case 8: {
                            message.isImmutable = reader.bool();
                            break;
                        }
                        case 9: {
                            message.muteEndTimeMs = reader.int64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LabelEditAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LabelEditAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties._name = 1;
                    if (!$util.isString(message.name)) return "name: string expected";
                }
                if (message.color != null && message.hasOwnProperty("color")) {
                    properties._color = 1;
                    if (!$util.isInteger(message.color)) return "color: integer expected";
                }
                if (message.predefinedId != null && message.hasOwnProperty("predefinedId")) {
                    properties._predefinedId = 1;
                    if (!$util.isInteger(message.predefinedId))
                        return "predefinedId: integer expected";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    properties._deleted = 1;
                    if (typeof message.deleted !== "boolean") return "deleted: boolean expected";
                }
                if (message.orderIndex != null && message.hasOwnProperty("orderIndex")) {
                    properties._orderIndex = 1;
                    if (!$util.isInteger(message.orderIndex)) return "orderIndex: integer expected";
                }
                if (message.isActive != null && message.hasOwnProperty("isActive")) {
                    properties._isActive = 1;
                    if (typeof message.isActive !== "boolean") return "isActive: boolean expected";
                }
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
                        case 9:
                            break;
                    }
                }
                if (message.isImmutable != null && message.hasOwnProperty("isImmutable")) {
                    properties._isImmutable = 1;
                    if (typeof message.isImmutable !== "boolean")
                        return "isImmutable: boolean expected";
                }
                if (message.muteEndTimeMs != null && message.hasOwnProperty("muteEndTimeMs")) {
                    properties._muteEndTimeMs = 1;
                    if (
                        !$util.isInteger(message.muteEndTimeMs) &&
                        !(
                            message.muteEndTimeMs &&
                            $util.isInteger(message.muteEndTimeMs.low) &&
                            $util.isInteger(message.muteEndTimeMs.high)
                        )
                    )
                        return "muteEndTimeMs: integer|Long expected";
                }
                return null;
            };
            LabelEditAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LabelEditAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.LabelEditAction();
                if (object.name != null) message.name = String(object.name);
                if (object.color != null) message.color = object.color | 0;
                if (object.predefinedId != null) message.predefinedId = object.predefinedId | 0;
                if (object.deleted != null) message.deleted = Boolean(object.deleted);
                if (object.orderIndex != null) message.orderIndex = object.orderIndex | 0;
                if (object.isActive != null) message.isActive = Boolean(object.isActive);
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "NONE":
                    case 0:
                        message.type = 0;
                        break;
                    case "UNREAD":
                    case 1:
                        message.type = 1;
                        break;
                    case "GROUPS":
                    case 2:
                        message.type = 2;
                        break;
                    case "FAVORITES":
                    case 3:
                        message.type = 3;
                        break;
                    case "PREDEFINED":
                    case 4:
                        message.type = 4;
                        break;
                    case "CUSTOM":
                    case 5:
                        message.type = 5;
                        break;
                    case "COMMUNITY":
                    case 6:
                        message.type = 6;
                        break;
                    case "SERVER_ASSIGNED":
                    case 7:
                        message.type = 7;
                        break;
                    case "DRAFTED":
                    case 8:
                        message.type = 8;
                        break;
                    case "AI_HANDOFF":
                    case 9:
                        message.type = 9;
                        break;
                }
                if (object.isImmutable != null) message.isImmutable = Boolean(object.isImmutable);
                if (object.muteEndTimeMs != null)
                    if ($util.Long)
                        (message.muteEndTimeMs = $util.Long.fromValue(
                            object.muteEndTimeMs
                        )).unsigned = false;
                    else if (typeof object.muteEndTimeMs === "string")
                        message.muteEndTimeMs = parseInt(object.muteEndTimeMs, 10);
                    else if (typeof object.muteEndTimeMs === "number")
                        message.muteEndTimeMs = object.muteEndTimeMs;
                    else if (typeof object.muteEndTimeMs === "object")
                        message.muteEndTimeMs = new $util.LongBits(
                            object.muteEndTimeMs.low >>> 0,
                            object.muteEndTimeMs.high >>> 0
                        ).toNumber();
                return message;
            };
            LabelEditAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs) object._name = "name";
                }
                if (message.color != null && message.hasOwnProperty("color")) {
                    object.color = message.color;
                    if (options.oneofs) object._color = "color";
                }
                if (message.predefinedId != null && message.hasOwnProperty("predefinedId")) {
                    object.predefinedId = message.predefinedId;
                    if (options.oneofs) object._predefinedId = "predefinedId";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    object.deleted = message.deleted;
                    if (options.oneofs) object._deleted = "deleted";
                }
                if (message.orderIndex != null && message.hasOwnProperty("orderIndex")) {
                    object.orderIndex = message.orderIndex;
                    if (options.oneofs) object._orderIndex = "orderIndex";
                }
                if (message.isActive != null && message.hasOwnProperty("isActive")) {
                    object.isActive = message.isActive;
                    if (options.oneofs) object._isActive = "isActive";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.LabelEditAction.ListType[
                                  message.type
                              ] === undefined
                                ? message.type
                                : $root.SyncAction.SyncActionValue.LabelEditAction.ListType[
                                      message.type
                                  ]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                if (message.isImmutable != null && message.hasOwnProperty("isImmutable")) {
                    object.isImmutable = message.isImmutable;
                    if (options.oneofs) object._isImmutable = "isImmutable";
                }
                if (message.muteEndTimeMs != null && message.hasOwnProperty("muteEndTimeMs")) {
                    if (typeof message.muteEndTimeMs === "number")
                        object.muteEndTimeMs =
                            options.longs === String
                                ? String(message.muteEndTimeMs)
                                : message.muteEndTimeMs;
                    else
                        object.muteEndTimeMs =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.muteEndTimeMs)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.muteEndTimeMs.low >>> 0,
                                        message.muteEndTimeMs.high >>> 0
                                    ).toNumber()
                                  : message.muteEndTimeMs;
                    if (options.oneofs) object._muteEndTimeMs = "muteEndTimeMs";
                }
                return object;
            };
            LabelEditAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LabelEditAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LabelEditAction";
            };
            LabelEditAction.ListType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "NONE")] = 0;
                values[(valuesById[1] = "UNREAD")] = 1;
                values[(valuesById[2] = "GROUPS")] = 2;
                values[(valuesById[3] = "FAVORITES")] = 3;
                values[(valuesById[4] = "PREDEFINED")] = 4;
                values[(valuesById[5] = "CUSTOM")] = 5;
                values[(valuesById[6] = "COMMUNITY")] = 6;
                values[(valuesById[7] = "SERVER_ASSIGNED")] = 7;
                values[(valuesById[8] = "DRAFTED")] = 8;
                values[(valuesById[9] = "AI_HANDOFF")] = 9;
                return values;
            })();
            return LabelEditAction;
        })();
        SyncActionValue.LabelReorderingAction = (function () {
            function LabelReorderingAction(properties) {
                this.sortedLabelIds = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LabelReorderingAction.prototype.sortedLabelIds = $util.emptyArray;
            LabelReorderingAction.create = function create(properties) {
                return new LabelReorderingAction(properties);
            };
            LabelReorderingAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.sortedLabelIds != null && message.sortedLabelIds.length) {
                    writer.uint32(10).fork();
                    for (var i = 0; i < message.sortedLabelIds.length; ++i)
                        writer.int32(message.sortedLabelIds[i]);
                    writer.ldelim();
                }
                return writer;
            };
            LabelReorderingAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LabelReorderingAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LabelReorderingAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (!(message.sortedLabelIds && message.sortedLabelIds.length))
                                message.sortedLabelIds = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.sortedLabelIds.push(reader.int32());
                            } else message.sortedLabelIds.push(reader.int32());
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LabelReorderingAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LabelReorderingAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                if (message.sortedLabelIds != null && message.hasOwnProperty("sortedLabelIds")) {
                    if (!Array.isArray(message.sortedLabelIds))
                        return "sortedLabelIds: array expected";
                    for (var i = 0; i < message.sortedLabelIds.length; ++i)
                        if (!$util.isInteger(message.sortedLabelIds[i]))
                            return "sortedLabelIds: integer[] expected";
                }
                return null;
            };
            LabelReorderingAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LabelReorderingAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.LabelReorderingAction();
                if (object.sortedLabelIds) {
                    if (!Array.isArray(object.sortedLabelIds))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.LabelReorderingAction.sortedLabelIds: array expected"
                        );
                    message.sortedLabelIds = [];
                    for (var i = 0; i < object.sortedLabelIds.length; ++i)
                        message.sortedLabelIds[i] = object.sortedLabelIds[i] | 0;
                }
                return message;
            };
            LabelReorderingAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.sortedLabelIds = [];
                if (message.sortedLabelIds && message.sortedLabelIds.length) {
                    object.sortedLabelIds = [];
                    for (var j = 0; j < message.sortedLabelIds.length; ++j)
                        object.sortedLabelIds[j] = message.sortedLabelIds[j];
                }
                return object;
            };
            LabelReorderingAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LabelReorderingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LabelReorderingAction";
            };
            return LabelReorderingAction;
        })();
        SyncActionValue.LidContactAction = (function () {
            function LidContactAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LidContactAction.prototype.fullName = null;
            LidContactAction.prototype.firstName = null;
            LidContactAction.prototype.username = null;
            var $oneOfFields;
            Object.defineProperty(LidContactAction.prototype, "_fullName", {
                get: $util.oneOfGetter(($oneOfFields = ["fullName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LidContactAction.prototype, "_firstName", {
                get: $util.oneOfGetter(($oneOfFields = ["firstName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(LidContactAction.prototype, "_username", {
                get: $util.oneOfGetter(($oneOfFields = ["username"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LidContactAction.create = function create(properties) {
                return new LidContactAction(properties);
            };
            LidContactAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.fullName != null && Object.hasOwnProperty.call(message, "fullName"))
                    writer.uint32(10).string(message.fullName);
                if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                    writer.uint32(18).string(message.firstName);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(26).string(message.username);
                return writer;
            };
            LidContactAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LidContactAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LidContactAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.fullName = reader.string();
                            break;
                        }
                        case 2: {
                            message.firstName = reader.string();
                            break;
                        }
                        case 3: {
                            message.username = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LidContactAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LidContactAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.fullName != null && message.hasOwnProperty("fullName")) {
                    properties._fullName = 1;
                    if (!$util.isString(message.fullName)) return "fullName: string expected";
                }
                if (message.firstName != null && message.hasOwnProperty("firstName")) {
                    properties._firstName = 1;
                    if (!$util.isString(message.firstName)) return "firstName: string expected";
                }
                if (message.username != null && message.hasOwnProperty("username")) {
                    properties._username = 1;
                    if (!$util.isString(message.username)) return "username: string expected";
                }
                return null;
            };
            LidContactAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LidContactAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.LidContactAction();
                if (object.fullName != null) message.fullName = String(object.fullName);
                if (object.firstName != null) message.firstName = String(object.firstName);
                if (object.username != null) message.username = String(object.username);
                return message;
            };
            LidContactAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.fullName != null && message.hasOwnProperty("fullName")) {
                    object.fullName = message.fullName;
                    if (options.oneofs) object._fullName = "fullName";
                }
                if (message.firstName != null && message.hasOwnProperty("firstName")) {
                    object.firstName = message.firstName;
                    if (options.oneofs) object._firstName = "firstName";
                }
                if (message.username != null && message.hasOwnProperty("username")) {
                    object.username = message.username;
                    if (options.oneofs) object._username = "username";
                }
                return object;
            };
            LidContactAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LidContactAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LidContactAction";
            };
            return LidContactAction;
        })();
        SyncActionValue.LocaleSetting = (function () {
            function LocaleSetting(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LocaleSetting.prototype.locale = null;
            var $oneOfFields;
            Object.defineProperty(LocaleSetting.prototype, "_locale", {
                get: $util.oneOfGetter(($oneOfFields = ["locale"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LocaleSetting.create = function create(properties) {
                return new LocaleSetting(properties);
            };
            LocaleSetting.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                    writer.uint32(10).string(message.locale);
                return writer;
            };
            LocaleSetting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LocaleSetting.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LocaleSetting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.locale = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LocaleSetting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LocaleSetting.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.locale != null && message.hasOwnProperty("locale")) {
                    properties._locale = 1;
                    if (!$util.isString(message.locale)) return "locale: string expected";
                }
                return null;
            };
            LocaleSetting.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LocaleSetting) return object;
                var message = new $root.SyncAction.SyncActionValue.LocaleSetting();
                if (object.locale != null) message.locale = String(object.locale);
                return message;
            };
            LocaleSetting.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.locale != null && message.hasOwnProperty("locale")) {
                    object.locale = message.locale;
                    if (options.oneofs) object._locale = "locale";
                }
                return object;
            };
            LocaleSetting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LocaleSetting.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LocaleSetting";
            };
            return LocaleSetting;
        })();
        SyncActionValue.LockChatAction = (function () {
            function LockChatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            LockChatAction.prototype.locked = null;
            var $oneOfFields;
            Object.defineProperty(LockChatAction.prototype, "_locked", {
                get: $util.oneOfGetter(($oneOfFields = ["locked"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            LockChatAction.create = function create(properties) {
                return new LockChatAction(properties);
            };
            LockChatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.locked != null && Object.hasOwnProperty.call(message, "locked"))
                    writer.uint32(8).bool(message.locked);
                return writer;
            };
            LockChatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            LockChatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.LockChatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.locked = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            LockChatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            LockChatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.locked != null && message.hasOwnProperty("locked")) {
                    properties._locked = 1;
                    if (typeof message.locked !== "boolean") return "locked: boolean expected";
                }
                return null;
            };
            LockChatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.LockChatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.LockChatAction();
                if (object.locked != null) message.locked = Boolean(object.locked);
                return message;
            };
            LockChatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.locked != null && message.hasOwnProperty("locked")) {
                    object.locked = message.locked;
                    if (options.oneofs) object._locked = "locked";
                }
                return object;
            };
            LockChatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            LockChatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.LockChatAction";
            };
            return LockChatAction;
        })();
        SyncActionValue.MaibaAIFeaturesControlAction = (function () {
            function MaibaAIFeaturesControlAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MaibaAIFeaturesControlAction.prototype.aiFeatureStatus = null;
            var $oneOfFields;
            Object.defineProperty(MaibaAIFeaturesControlAction.prototype, "_aiFeatureStatus", {
                get: $util.oneOfGetter(($oneOfFields = ["aiFeatureStatus"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MaibaAIFeaturesControlAction.create = function create(properties) {
                return new MaibaAIFeaturesControlAction(properties);
            };
            MaibaAIFeaturesControlAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.aiFeatureStatus != null &&
                    Object.hasOwnProperty.call(message, "aiFeatureStatus")
                )
                    writer.uint32(8).int32(message.aiFeatureStatus);
                return writer;
            };
            MaibaAIFeaturesControlAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            MaibaAIFeaturesControlAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.aiFeatureStatus = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MaibaAIFeaturesControlAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MaibaAIFeaturesControlAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.aiFeatureStatus != null && message.hasOwnProperty("aiFeatureStatus")) {
                    properties._aiFeatureStatus = 1;
                    switch (message.aiFeatureStatus) {
                        default:
                            return "aiFeatureStatus: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            MaibaAIFeaturesControlAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction();
                switch (object.aiFeatureStatus) {
                    default:
                        if (typeof object.aiFeatureStatus === "number") {
                            message.aiFeatureStatus = object.aiFeatureStatus;
                            break;
                        }
                        break;
                    case "ENABLED":
                    case 0:
                        message.aiFeatureStatus = 0;
                        break;
                    case "ENABLED_HAS_LEARNING":
                    case 1:
                        message.aiFeatureStatus = 1;
                        break;
                    case "DISABLED":
                    case 2:
                        message.aiFeatureStatus = 2;
                        break;
                }
                return message;
            };
            MaibaAIFeaturesControlAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.aiFeatureStatus != null && message.hasOwnProperty("aiFeatureStatus")) {
                    object.aiFeatureStatus =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction
                                  .MaibaAIFeatureStatus[message.aiFeatureStatus] === undefined
                                ? message.aiFeatureStatus
                                : $root.SyncAction.SyncActionValue.MaibaAIFeaturesControlAction
                                      .MaibaAIFeatureStatus[message.aiFeatureStatus]
                            : message.aiFeatureStatus;
                    if (options.oneofs) object._aiFeatureStatus = "aiFeatureStatus";
                }
                return object;
            };
            MaibaAIFeaturesControlAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MaibaAIFeaturesControlAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MaibaAIFeaturesControlAction";
            };
            MaibaAIFeaturesControlAction.MaibaAIFeatureStatus = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "ENABLED")] = 0;
                values[(valuesById[1] = "ENABLED_HAS_LEARNING")] = 1;
                values[(valuesById[2] = "DISABLED")] = 2;
                return values;
            })();
            return MaibaAIFeaturesControlAction;
        })();
        SyncActionValue.MarkChatAsReadAction = (function () {
            function MarkChatAsReadAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MarkChatAsReadAction.prototype.read = null;
            MarkChatAsReadAction.prototype.messageRange = null;
            var $oneOfFields;
            Object.defineProperty(MarkChatAsReadAction.prototype, "_read", {
                get: $util.oneOfGetter(($oneOfFields = ["read"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarkChatAsReadAction.prototype, "_messageRange", {
                get: $util.oneOfGetter(($oneOfFields = ["messageRange"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MarkChatAsReadAction.create = function create(properties) {
                return new MarkChatAsReadAction(properties);
            };
            MarkChatAsReadAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                    writer.uint32(8).bool(message.read);
                if (
                    message.messageRange != null &&
                    Object.hasOwnProperty.call(message, "messageRange")
                )
                    $root.SyncAction.SyncActionValue.SyncActionMessageRange.encode(
                        message.messageRange,
                        writer.uint32(18).fork()
                    ).ldelim();
                return writer;
            };
            MarkChatAsReadAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            MarkChatAsReadAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MarkChatAsReadAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.read = reader.bool();
                            break;
                        }
                        case 2: {
                            message.messageRange =
                                $root.SyncAction.SyncActionValue.SyncActionMessageRange.decode(
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
            MarkChatAsReadAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MarkChatAsReadAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.read != null && message.hasOwnProperty("read")) {
                    properties._read = 1;
                    if (typeof message.read !== "boolean") return "read: boolean expected";
                }
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    properties._messageRange = 1;
                    {
                        var error = $root.SyncAction.SyncActionValue.SyncActionMessageRange.verify(
                            message.messageRange
                        );
                        if (error) return "messageRange." + error;
                    }
                }
                return null;
            };
            MarkChatAsReadAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MarkChatAsReadAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.MarkChatAsReadAction();
                if (object.read != null) message.read = Boolean(object.read);
                if (object.messageRange != null) {
                    if (typeof object.messageRange !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.MarkChatAsReadAction.messageRange: object expected"
                        );
                    message.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.fromObject(
                            object.messageRange
                        );
                }
                return message;
            };
            MarkChatAsReadAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.read != null && message.hasOwnProperty("read")) {
                    object.read = message.read;
                    if (options.oneofs) object._read = "read";
                }
                if (message.messageRange != null && message.hasOwnProperty("messageRange")) {
                    object.messageRange =
                        $root.SyncAction.SyncActionValue.SyncActionMessageRange.toObject(
                            message.messageRange,
                            options
                        );
                    if (options.oneofs) object._messageRange = "messageRange";
                }
                return object;
            };
            MarkChatAsReadAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MarkChatAsReadAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MarkChatAsReadAction";
            };
            return MarkChatAsReadAction;
        })();
        SyncActionValue.MarketingMessageAction = (function () {
            function MarketingMessageAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MarketingMessageAction.prototype.name = null;
            MarketingMessageAction.prototype.message = null;
            MarketingMessageAction.prototype.type = null;
            MarketingMessageAction.prototype.createdAt = null;
            MarketingMessageAction.prototype.lastSentAt = null;
            MarketingMessageAction.prototype.isDeleted = null;
            MarketingMessageAction.prototype.mediaId = null;
            var $oneOfFields;
            Object.defineProperty(MarketingMessageAction.prototype, "_name", {
                get: $util.oneOfGetter(($oneOfFields = ["name"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_message", {
                get: $util.oneOfGetter(($oneOfFields = ["message"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_createdAt", {
                get: $util.oneOfGetter(($oneOfFields = ["createdAt"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_lastSentAt", {
                get: $util.oneOfGetter(($oneOfFields = ["lastSentAt"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_isDeleted", {
                get: $util.oneOfGetter(($oneOfFields = ["isDeleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MarketingMessageAction.prototype, "_mediaId", {
                get: $util.oneOfGetter(($oneOfFields = ["mediaId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MarketingMessageAction.create = function create(properties) {
                return new MarketingMessageAction(properties);
            };
            MarketingMessageAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(10).string(message.name);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(18).string(message.message);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(24).int32(message.type);
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    writer.uint32(32).int64(message.createdAt);
                if (message.lastSentAt != null && Object.hasOwnProperty.call(message, "lastSentAt"))
                    writer.uint32(40).int64(message.lastSentAt);
                if (message.isDeleted != null && Object.hasOwnProperty.call(message, "isDeleted"))
                    writer.uint32(48).bool(message.isDeleted);
                if (message.mediaId != null && Object.hasOwnProperty.call(message, "mediaId"))
                    writer.uint32(58).string(message.mediaId);
                return writer;
            };
            MarketingMessageAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            MarketingMessageAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MarketingMessageAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.name = reader.string();
                            break;
                        }
                        case 2: {
                            message.message = reader.string();
                            break;
                        }
                        case 3: {
                            message.type = reader.int32();
                            break;
                        }
                        case 4: {
                            message.createdAt = reader.int64();
                            break;
                        }
                        case 5: {
                            message.lastSentAt = reader.int64();
                            break;
                        }
                        case 6: {
                            message.isDeleted = reader.bool();
                            break;
                        }
                        case 7: {
                            message.mediaId = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MarketingMessageAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MarketingMessageAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties._name = 1;
                    if (!$util.isString(message.name)) return "name: string expected";
                }
                if (message.message != null && message.hasOwnProperty("message")) {
                    properties._message = 1;
                    if (!$util.isString(message.message)) return "message: string expected";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                            break;
                    }
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    properties._createdAt = 1;
                    if (
                        !$util.isInteger(message.createdAt) &&
                        !(
                            message.createdAt &&
                            $util.isInteger(message.createdAt.low) &&
                            $util.isInteger(message.createdAt.high)
                        )
                    )
                        return "createdAt: integer|Long expected";
                }
                if (message.lastSentAt != null && message.hasOwnProperty("lastSentAt")) {
                    properties._lastSentAt = 1;
                    if (
                        !$util.isInteger(message.lastSentAt) &&
                        !(
                            message.lastSentAt &&
                            $util.isInteger(message.lastSentAt.low) &&
                            $util.isInteger(message.lastSentAt.high)
                        )
                    )
                        return "lastSentAt: integer|Long expected";
                }
                if (message.isDeleted != null && message.hasOwnProperty("isDeleted")) {
                    properties._isDeleted = 1;
                    if (typeof message.isDeleted !== "boolean")
                        return "isDeleted: boolean expected";
                }
                if (message.mediaId != null && message.hasOwnProperty("mediaId")) {
                    properties._mediaId = 1;
                    if (!$util.isString(message.mediaId)) return "mediaId: string expected";
                }
                return null;
            };
            MarketingMessageAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MarketingMessageAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.MarketingMessageAction();
                if (object.name != null) message.name = String(object.name);
                if (object.message != null) message.message = String(object.message);
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "PERSONALIZED":
                    case 0:
                        message.type = 0;
                        break;
                }
                if (object.createdAt != null)
                    if ($util.Long)
                        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned =
                            false;
                    else if (typeof object.createdAt === "string")
                        message.createdAt = parseInt(object.createdAt, 10);
                    else if (typeof object.createdAt === "number")
                        message.createdAt = object.createdAt;
                    else if (typeof object.createdAt === "object")
                        message.createdAt = new $util.LongBits(
                            object.createdAt.low >>> 0,
                            object.createdAt.high >>> 0
                        ).toNumber();
                if (object.lastSentAt != null)
                    if ($util.Long)
                        (message.lastSentAt = $util.Long.fromValue(object.lastSentAt)).unsigned =
                            false;
                    else if (typeof object.lastSentAt === "string")
                        message.lastSentAt = parseInt(object.lastSentAt, 10);
                    else if (typeof object.lastSentAt === "number")
                        message.lastSentAt = object.lastSentAt;
                    else if (typeof object.lastSentAt === "object")
                        message.lastSentAt = new $util.LongBits(
                            object.lastSentAt.low >>> 0,
                            object.lastSentAt.high >>> 0
                        ).toNumber();
                if (object.isDeleted != null) message.isDeleted = Boolean(object.isDeleted);
                if (object.mediaId != null) message.mediaId = String(object.mediaId);
                return message;
            };
            MarketingMessageAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs) object._name = "name";
                }
                if (message.message != null && message.hasOwnProperty("message")) {
                    object.message = message.message;
                    if (options.oneofs) object._message = "message";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.MarketingMessageAction
                                  .MarketingMessagePrototypeType[message.type] === undefined
                                ? message.type
                                : $root.SyncAction.SyncActionValue.MarketingMessageAction
                                      .MarketingMessagePrototypeType[message.type]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    if (typeof message.createdAt === "number")
                        object.createdAt =
                            options.longs === String
                                ? String(message.createdAt)
                                : message.createdAt;
                    else
                        object.createdAt =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.createdAt)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.createdAt.low >>> 0,
                                        message.createdAt.high >>> 0
                                    ).toNumber()
                                  : message.createdAt;
                    if (options.oneofs) object._createdAt = "createdAt";
                }
                if (message.lastSentAt != null && message.hasOwnProperty("lastSentAt")) {
                    if (typeof message.lastSentAt === "number")
                        object.lastSentAt =
                            options.longs === String
                                ? String(message.lastSentAt)
                                : message.lastSentAt;
                    else
                        object.lastSentAt =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.lastSentAt)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.lastSentAt.low >>> 0,
                                        message.lastSentAt.high >>> 0
                                    ).toNumber()
                                  : message.lastSentAt;
                    if (options.oneofs) object._lastSentAt = "lastSentAt";
                }
                if (message.isDeleted != null && message.hasOwnProperty("isDeleted")) {
                    object.isDeleted = message.isDeleted;
                    if (options.oneofs) object._isDeleted = "isDeleted";
                }
                if (message.mediaId != null && message.hasOwnProperty("mediaId")) {
                    object.mediaId = message.mediaId;
                    if (options.oneofs) object._mediaId = "mediaId";
                }
                return object;
            };
            MarketingMessageAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MarketingMessageAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MarketingMessageAction";
            };
            MarketingMessageAction.MarketingMessagePrototypeType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "PERSONALIZED")] = 0;
                return values;
            })();
            return MarketingMessageAction;
        })();
        SyncActionValue.MarketingMessageBroadcastAction = (function () {
            function MarketingMessageBroadcastAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MarketingMessageBroadcastAction.prototype.repliedCount = null;
            var $oneOfFields;
            Object.defineProperty(MarketingMessageBroadcastAction.prototype, "_repliedCount", {
                get: $util.oneOfGetter(($oneOfFields = ["repliedCount"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MarketingMessageBroadcastAction.create = function create(properties) {
                return new MarketingMessageBroadcastAction(properties);
            };
            MarketingMessageBroadcastAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.repliedCount != null &&
                    Object.hasOwnProperty.call(message, "repliedCount")
                )
                    writer.uint32(8).int32(message.repliedCount);
                return writer;
            };
            MarketingMessageBroadcastAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            MarketingMessageBroadcastAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.repliedCount = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MarketingMessageBroadcastAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MarketingMessageBroadcastAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.repliedCount != null && message.hasOwnProperty("repliedCount")) {
                    properties._repliedCount = 1;
                    if (!$util.isInteger(message.repliedCount))
                        return "repliedCount: integer expected";
                }
                return null;
            };
            MarketingMessageBroadcastAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.MarketingMessageBroadcastAction();
                if (object.repliedCount != null) message.repliedCount = object.repliedCount | 0;
                return message;
            };
            MarketingMessageBroadcastAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.repliedCount != null && message.hasOwnProperty("repliedCount")) {
                    object.repliedCount = message.repliedCount;
                    if (options.oneofs) object._repliedCount = "repliedCount";
                }
                return object;
            };
            MarketingMessageBroadcastAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MarketingMessageBroadcastAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/SyncAction.SyncActionValue.MarketingMessageBroadcastAction"
                );
            };
            return MarketingMessageBroadcastAction;
        })();
        SyncActionValue.MerchantPaymentPartnerAction = (function () {
            function MerchantPaymentPartnerAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MerchantPaymentPartnerAction.prototype.status = null;
            MerchantPaymentPartnerAction.prototype.country = null;
            MerchantPaymentPartnerAction.prototype.gatewayName = null;
            MerchantPaymentPartnerAction.prototype.credentialId = null;
            var $oneOfFields;
            Object.defineProperty(MerchantPaymentPartnerAction.prototype, "_status", {
                get: $util.oneOfGetter(($oneOfFields = ["status"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MerchantPaymentPartnerAction.prototype, "_country", {
                get: $util.oneOfGetter(($oneOfFields = ["country"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MerchantPaymentPartnerAction.prototype, "_gatewayName", {
                get: $util.oneOfGetter(($oneOfFields = ["gatewayName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MerchantPaymentPartnerAction.prototype, "_credentialId", {
                get: $util.oneOfGetter(($oneOfFields = ["credentialId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MerchantPaymentPartnerAction.create = function create(properties) {
                return new MerchantPaymentPartnerAction(properties);
            };
            MerchantPaymentPartnerAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(8).int32(message.status);
                if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                    writer.uint32(18).string(message.country);
                if (
                    message.gatewayName != null &&
                    Object.hasOwnProperty.call(message, "gatewayName")
                )
                    writer.uint32(26).string(message.gatewayName);
                if (
                    message.credentialId != null &&
                    Object.hasOwnProperty.call(message, "credentialId")
                )
                    writer.uint32(34).string(message.credentialId);
                return writer;
            };
            MerchantPaymentPartnerAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            MerchantPaymentPartnerAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.status = reader.int32();
                            break;
                        }
                        case 2: {
                            message.country = reader.string();
                            break;
                        }
                        case 3: {
                            message.gatewayName = reader.string();
                            break;
                        }
                        case 4: {
                            message.credentialId = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MerchantPaymentPartnerAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MerchantPaymentPartnerAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.status != null && message.hasOwnProperty("status")) {
                    properties._status = 1;
                    switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                            break;
                    }
                }
                if (message.country != null && message.hasOwnProperty("country")) {
                    properties._country = 1;
                    if (!$util.isString(message.country)) return "country: string expected";
                }
                if (message.gatewayName != null && message.hasOwnProperty("gatewayName")) {
                    properties._gatewayName = 1;
                    if (!$util.isString(message.gatewayName)) return "gatewayName: string expected";
                }
                if (message.credentialId != null && message.hasOwnProperty("credentialId")) {
                    properties._credentialId = 1;
                    if (!$util.isString(message.credentialId))
                        return "credentialId: string expected";
                }
                return null;
            };
            MerchantPaymentPartnerAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction();
                switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "ACTIVE":
                    case 0:
                        message.status = 0;
                        break;
                    case "INACTIVE":
                    case 1:
                        message.status = 1;
                        break;
                }
                if (object.country != null) message.country = String(object.country);
                if (object.gatewayName != null) message.gatewayName = String(object.gatewayName);
                if (object.credentialId != null) message.credentialId = String(object.credentialId);
                return message;
            };
            MerchantPaymentPartnerAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.status != null && message.hasOwnProperty("status")) {
                    object.status =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction.Status[
                                  message.status
                              ] === undefined
                                ? message.status
                                : $root.SyncAction.SyncActionValue.MerchantPaymentPartnerAction
                                      .Status[message.status]
                            : message.status;
                    if (options.oneofs) object._status = "status";
                }
                if (message.country != null && message.hasOwnProperty("country")) {
                    object.country = message.country;
                    if (options.oneofs) object._country = "country";
                }
                if (message.gatewayName != null && message.hasOwnProperty("gatewayName")) {
                    object.gatewayName = message.gatewayName;
                    if (options.oneofs) object._gatewayName = "gatewayName";
                }
                if (message.credentialId != null && message.hasOwnProperty("credentialId")) {
                    object.credentialId = message.credentialId;
                    if (options.oneofs) object._credentialId = "credentialId";
                }
                return object;
            };
            MerchantPaymentPartnerAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MerchantPaymentPartnerAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MerchantPaymentPartnerAction";
            };
            MerchantPaymentPartnerAction.Status = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "ACTIVE")] = 0;
                values[(valuesById[1] = "INACTIVE")] = 1;
                return values;
            })();
            return MerchantPaymentPartnerAction;
        })();
        SyncActionValue.MusicUserIdAction = (function () {
            function MusicUserIdAction(properties) {
                this.musicUserIdMap = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MusicUserIdAction.prototype.musicUserId = null;
            MusicUserIdAction.prototype.musicUserIdMap = $util.emptyObject;
            var $oneOfFields;
            Object.defineProperty(MusicUserIdAction.prototype, "_musicUserId", {
                get: $util.oneOfGetter(($oneOfFields = ["musicUserId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MusicUserIdAction.create = function create(properties) {
                return new MusicUserIdAction(properties);
            };
            MusicUserIdAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.musicUserId != null &&
                    Object.hasOwnProperty.call(message, "musicUserId")
                )
                    writer.uint32(10).string(message.musicUserId);
                if (
                    message.musicUserIdMap != null &&
                    Object.hasOwnProperty.call(message, "musicUserIdMap")
                )
                    for (
                        var keys = Object.keys(message.musicUserIdMap), i = 0;
                        i < keys.length;
                        ++i
                    )
                        writer
                            .uint32(18)
                            .fork()
                            .uint32(10)
                            .string(keys[i])
                            .uint32(18)
                            .string(message.musicUserIdMap[keys[i]])
                            .ldelim();
                return writer;
            };
            MusicUserIdAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            MusicUserIdAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MusicUserIdAction(),
                    key,
                    value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.musicUserId = reader.string();
                            break;
                        }
                        case 2: {
                            if (message.musicUserIdMap === $util.emptyObject)
                                message.musicUserIdMap = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                    case 1:
                                        key = reader.string();
                                        break;
                                    case 2:
                                        value = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag2 & 7);
                                        break;
                                }
                            }
                            message.musicUserIdMap[key] = value;
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MusicUserIdAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MusicUserIdAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.musicUserId != null && message.hasOwnProperty("musicUserId")) {
                    properties._musicUserId = 1;
                    if (!$util.isString(message.musicUserId)) return "musicUserId: string expected";
                }
                if (message.musicUserIdMap != null && message.hasOwnProperty("musicUserIdMap")) {
                    if (!$util.isObject(message.musicUserIdMap))
                        return "musicUserIdMap: object expected";
                    var key = Object.keys(message.musicUserIdMap);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.musicUserIdMap[key[i]]))
                            return "musicUserIdMap: string{k:string} expected";
                }
                return null;
            };
            MusicUserIdAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MusicUserIdAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.MusicUserIdAction();
                if (object.musicUserId != null) message.musicUserId = String(object.musicUserId);
                if (object.musicUserIdMap) {
                    if (typeof object.musicUserIdMap !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.MusicUserIdAction.musicUserIdMap: object expected"
                        );
                    message.musicUserIdMap = {};
                    for (var keys = Object.keys(object.musicUserIdMap), i = 0; i < keys.length; ++i)
                        message.musicUserIdMap[keys[i]] = String(object.musicUserIdMap[keys[i]]);
                }
                return message;
            };
            MusicUserIdAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.objects || options.defaults) object.musicUserIdMap = {};
                if (message.musicUserId != null && message.hasOwnProperty("musicUserId")) {
                    object.musicUserId = message.musicUserId;
                    if (options.oneofs) object._musicUserId = "musicUserId";
                }
                var keys2;
                if (
                    message.musicUserIdMap &&
                    (keys2 = Object.keys(message.musicUserIdMap)).length
                ) {
                    object.musicUserIdMap = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.musicUserIdMap[keys2[j]] = message.musicUserIdMap[keys2[j]];
                }
                return object;
            };
            MusicUserIdAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MusicUserIdAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MusicUserIdAction";
            };
            return MusicUserIdAction;
        })();
        SyncActionValue.MuteAction = (function () {
            function MuteAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            MuteAction.prototype.muted = null;
            MuteAction.prototype.muteEndTimestamp = null;
            MuteAction.prototype.autoMuted = null;
            var $oneOfFields;
            Object.defineProperty(MuteAction.prototype, "_muted", {
                get: $util.oneOfGetter(($oneOfFields = ["muted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MuteAction.prototype, "_muteEndTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["muteEndTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(MuteAction.prototype, "_autoMuted", {
                get: $util.oneOfGetter(($oneOfFields = ["autoMuted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            MuteAction.create = function create(properties) {
                return new MuteAction(properties);
            };
            MuteAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.muted != null && Object.hasOwnProperty.call(message, "muted"))
                    writer.uint32(8).bool(message.muted);
                if (
                    message.muteEndTimestamp != null &&
                    Object.hasOwnProperty.call(message, "muteEndTimestamp")
                )
                    writer.uint32(16).int64(message.muteEndTimestamp);
                if (message.autoMuted != null && Object.hasOwnProperty.call(message, "autoMuted"))
                    writer.uint32(24).bool(message.autoMuted);
                return writer;
            };
            MuteAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            MuteAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.MuteAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.muted = reader.bool();
                            break;
                        }
                        case 2: {
                            message.muteEndTimestamp = reader.int64();
                            break;
                        }
                        case 3: {
                            message.autoMuted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            MuteAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            MuteAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.muted != null && message.hasOwnProperty("muted")) {
                    properties._muted = 1;
                    if (typeof message.muted !== "boolean") return "muted: boolean expected";
                }
                if (
                    message.muteEndTimestamp != null &&
                    message.hasOwnProperty("muteEndTimestamp")
                ) {
                    properties._muteEndTimestamp = 1;
                    if (
                        !$util.isInteger(message.muteEndTimestamp) &&
                        !(
                            message.muteEndTimestamp &&
                            $util.isInteger(message.muteEndTimestamp.low) &&
                            $util.isInteger(message.muteEndTimestamp.high)
                        )
                    )
                        return "muteEndTimestamp: integer|Long expected";
                }
                if (message.autoMuted != null && message.hasOwnProperty("autoMuted")) {
                    properties._autoMuted = 1;
                    if (typeof message.autoMuted !== "boolean")
                        return "autoMuted: boolean expected";
                }
                return null;
            };
            MuteAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.MuteAction) return object;
                var message = new $root.SyncAction.SyncActionValue.MuteAction();
                if (object.muted != null) message.muted = Boolean(object.muted);
                if (object.muteEndTimestamp != null)
                    if ($util.Long)
                        (message.muteEndTimestamp = $util.Long.fromValue(
                            object.muteEndTimestamp
                        )).unsigned = false;
                    else if (typeof object.muteEndTimestamp === "string")
                        message.muteEndTimestamp = parseInt(object.muteEndTimestamp, 10);
                    else if (typeof object.muteEndTimestamp === "number")
                        message.muteEndTimestamp = object.muteEndTimestamp;
                    else if (typeof object.muteEndTimestamp === "object")
                        message.muteEndTimestamp = new $util.LongBits(
                            object.muteEndTimestamp.low >>> 0,
                            object.muteEndTimestamp.high >>> 0
                        ).toNumber();
                if (object.autoMuted != null) message.autoMuted = Boolean(object.autoMuted);
                return message;
            };
            MuteAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.muted != null && message.hasOwnProperty("muted")) {
                    object.muted = message.muted;
                    if (options.oneofs) object._muted = "muted";
                }
                if (
                    message.muteEndTimestamp != null &&
                    message.hasOwnProperty("muteEndTimestamp")
                ) {
                    if (typeof message.muteEndTimestamp === "number")
                        object.muteEndTimestamp =
                            options.longs === String
                                ? String(message.muteEndTimestamp)
                                : message.muteEndTimestamp;
                    else
                        object.muteEndTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.muteEndTimestamp)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.muteEndTimestamp.low >>> 0,
                                        message.muteEndTimestamp.high >>> 0
                                    ).toNumber()
                                  : message.muteEndTimestamp;
                    if (options.oneofs) object._muteEndTimestamp = "muteEndTimestamp";
                }
                if (message.autoMuted != null && message.hasOwnProperty("autoMuted")) {
                    object.autoMuted = message.autoMuted;
                    if (options.oneofs) object._autoMuted = "autoMuted";
                }
                return object;
            };
            MuteAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            MuteAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.MuteAction";
            };
            return MuteAction;
        })();
        SyncActionValue.NewsletterSavedInterestsAction = (function () {
            function NewsletterSavedInterestsAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            NewsletterSavedInterestsAction.prototype.newsletterSavedInterests = null;
            var $oneOfFields;
            Object.defineProperty(
                NewsletterSavedInterestsAction.prototype,
                "_newsletterSavedInterests",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["newsletterSavedInterests"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            NewsletterSavedInterestsAction.create = function create(properties) {
                return new NewsletterSavedInterestsAction(properties);
            };
            NewsletterSavedInterestsAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.newsletterSavedInterests != null &&
                    Object.hasOwnProperty.call(message, "newsletterSavedInterests")
                )
                    writer.uint32(10).string(message.newsletterSavedInterests);
                return writer;
            };
            NewsletterSavedInterestsAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            NewsletterSavedInterestsAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.newsletterSavedInterests = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            NewsletterSavedInterestsAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            NewsletterSavedInterestsAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.newsletterSavedInterests != null &&
                    message.hasOwnProperty("newsletterSavedInterests")
                ) {
                    properties._newsletterSavedInterests = 1;
                    if (!$util.isString(message.newsletterSavedInterests))
                        return "newsletterSavedInterests: string expected";
                }
                return null;
            };
            NewsletterSavedInterestsAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction
                )
                    return object;
                var message = new $root.SyncAction.SyncActionValue.NewsletterSavedInterestsAction();
                if (object.newsletterSavedInterests != null)
                    message.newsletterSavedInterests = String(object.newsletterSavedInterests);
                return message;
            };
            NewsletterSavedInterestsAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.newsletterSavedInterests != null &&
                    message.hasOwnProperty("newsletterSavedInterests")
                ) {
                    object.newsletterSavedInterests = message.newsletterSavedInterests;
                    if (options.oneofs)
                        object._newsletterSavedInterests = "newsletterSavedInterests";
                }
                return object;
            };
            NewsletterSavedInterestsAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            NewsletterSavedInterestsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.NewsletterSavedInterestsAction";
            };
            return NewsletterSavedInterestsAction;
        })();
        SyncActionValue.NoteEditAction = (function () {
            function NoteEditAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            NoteEditAction.prototype.type = null;
            NoteEditAction.prototype.chatJid = null;
            NoteEditAction.prototype.createdAt = null;
            NoteEditAction.prototype.deleted = null;
            NoteEditAction.prototype.unstructuredContent = null;
            var $oneOfFields;
            Object.defineProperty(NoteEditAction.prototype, "_type", {
                get: $util.oneOfGetter(($oneOfFields = ["type"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(NoteEditAction.prototype, "_chatJid", {
                get: $util.oneOfGetter(($oneOfFields = ["chatJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(NoteEditAction.prototype, "_createdAt", {
                get: $util.oneOfGetter(($oneOfFields = ["createdAt"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(NoteEditAction.prototype, "_deleted", {
                get: $util.oneOfGetter(($oneOfFields = ["deleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(NoteEditAction.prototype, "_unstructuredContent", {
                get: $util.oneOfGetter(($oneOfFields = ["unstructuredContent"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            NoteEditAction.create = function create(properties) {
                return new NoteEditAction(properties);
            };
            NoteEditAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(8).int32(message.type);
                if (message.chatJid != null && Object.hasOwnProperty.call(message, "chatJid"))
                    writer.uint32(18).string(message.chatJid);
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    writer.uint32(24).int64(message.createdAt);
                if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                    writer.uint32(32).bool(message.deleted);
                if (
                    message.unstructuredContent != null &&
                    Object.hasOwnProperty.call(message, "unstructuredContent")
                )
                    writer.uint32(42).string(message.unstructuredContent);
                return writer;
            };
            NoteEditAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            NoteEditAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.NoteEditAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.type = reader.int32();
                            break;
                        }
                        case 2: {
                            message.chatJid = reader.string();
                            break;
                        }
                        case 3: {
                            message.createdAt = reader.int64();
                            break;
                        }
                        case 4: {
                            message.deleted = reader.bool();
                            break;
                        }
                        case 5: {
                            message.unstructuredContent = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            NoteEditAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            NoteEditAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    properties._type = 1;
                    switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 1:
                        case 2:
                            break;
                    }
                }
                if (message.chatJid != null && message.hasOwnProperty("chatJid")) {
                    properties._chatJid = 1;
                    if (!$util.isString(message.chatJid)) return "chatJid: string expected";
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    properties._createdAt = 1;
                    if (
                        !$util.isInteger(message.createdAt) &&
                        !(
                            message.createdAt &&
                            $util.isInteger(message.createdAt.low) &&
                            $util.isInteger(message.createdAt.high)
                        )
                    )
                        return "createdAt: integer|Long expected";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    properties._deleted = 1;
                    if (typeof message.deleted !== "boolean") return "deleted: boolean expected";
                }
                if (
                    message.unstructuredContent != null &&
                    message.hasOwnProperty("unstructuredContent")
                ) {
                    properties._unstructuredContent = 1;
                    if (!$util.isString(message.unstructuredContent))
                        return "unstructuredContent: string expected";
                }
                return null;
            };
            NoteEditAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.NoteEditAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.NoteEditAction();
                switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "UNSTRUCTURED":
                    case 1:
                        message.type = 1;
                        break;
                    case "STRUCTURED":
                    case 2:
                        message.type = 2;
                        break;
                }
                if (object.chatJid != null) message.chatJid = String(object.chatJid);
                if (object.createdAt != null)
                    if ($util.Long)
                        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned =
                            false;
                    else if (typeof object.createdAt === "string")
                        message.createdAt = parseInt(object.createdAt, 10);
                    else if (typeof object.createdAt === "number")
                        message.createdAt = object.createdAt;
                    else if (typeof object.createdAt === "object")
                        message.createdAt = new $util.LongBits(
                            object.createdAt.low >>> 0,
                            object.createdAt.high >>> 0
                        ).toNumber();
                if (object.deleted != null) message.deleted = Boolean(object.deleted);
                if (object.unstructuredContent != null)
                    message.unstructuredContent = String(object.unstructuredContent);
                return message;
            };
            NoteEditAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.type != null && message.hasOwnProperty("type")) {
                    object.type =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.NoteEditAction.NoteType[
                                  message.type
                              ] === undefined
                                ? message.type
                                : $root.SyncAction.SyncActionValue.NoteEditAction.NoteType[
                                      message.type
                                  ]
                            : message.type;
                    if (options.oneofs) object._type = "type";
                }
                if (message.chatJid != null && message.hasOwnProperty("chatJid")) {
                    object.chatJid = message.chatJid;
                    if (options.oneofs) object._chatJid = "chatJid";
                }
                if (message.createdAt != null && message.hasOwnProperty("createdAt")) {
                    if (typeof message.createdAt === "number")
                        object.createdAt =
                            options.longs === String
                                ? String(message.createdAt)
                                : message.createdAt;
                    else
                        object.createdAt =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.createdAt)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.createdAt.low >>> 0,
                                        message.createdAt.high >>> 0
                                    ).toNumber()
                                  : message.createdAt;
                    if (options.oneofs) object._createdAt = "createdAt";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    object.deleted = message.deleted;
                    if (options.oneofs) object._deleted = "deleted";
                }
                if (
                    message.unstructuredContent != null &&
                    message.hasOwnProperty("unstructuredContent")
                ) {
                    object.unstructuredContent = message.unstructuredContent;
                    if (options.oneofs) object._unstructuredContent = "unstructuredContent";
                }
                return object;
            };
            NoteEditAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            NoteEditAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.NoteEditAction";
            };
            NoteEditAction.NoteType = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[1] = "UNSTRUCTURED")] = 1;
                values[(valuesById[2] = "STRUCTURED")] = 2;
                return values;
            })();
            return NoteEditAction;
        })();
        SyncActionValue.NotificationActivitySettingAction = (function () {
            function NotificationActivitySettingAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            NotificationActivitySettingAction.prototype.notificationActivitySetting = null;
            var $oneOfFields;
            Object.defineProperty(
                NotificationActivitySettingAction.prototype,
                "_notificationActivitySetting",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["notificationActivitySetting"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            NotificationActivitySettingAction.create = function create(properties) {
                return new NotificationActivitySettingAction(properties);
            };
            NotificationActivitySettingAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.notificationActivitySetting != null &&
                    Object.hasOwnProperty.call(message, "notificationActivitySetting")
                )
                    writer.uint32(8).int32(message.notificationActivitySetting);
                return writer;
            };
            NotificationActivitySettingAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            NotificationActivitySettingAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.NotificationActivitySettingAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.notificationActivitySetting = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            NotificationActivitySettingAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            NotificationActivitySettingAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.notificationActivitySetting != null &&
                    message.hasOwnProperty("notificationActivitySetting")
                ) {
                    properties._notificationActivitySetting = 1;
                    switch (message.notificationActivitySetting) {
                        default:
                            return "notificationActivitySetting: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                return null;
            };
            NotificationActivitySettingAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.NotificationActivitySettingAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.NotificationActivitySettingAction();
                switch (object.notificationActivitySetting) {
                    default:
                        if (typeof object.notificationActivitySetting === "number") {
                            message.notificationActivitySetting =
                                object.notificationActivitySetting;
                            break;
                        }
                        break;
                    case "DEFAULT_ALL_MESSAGES":
                    case 0:
                        message.notificationActivitySetting = 0;
                        break;
                    case "ALL_MESSAGES":
                    case 1:
                        message.notificationActivitySetting = 1;
                        break;
                    case "HIGHLIGHTS":
                    case 2:
                        message.notificationActivitySetting = 2;
                        break;
                    case "DEFAULT_HIGHLIGHTS":
                    case 3:
                        message.notificationActivitySetting = 3;
                        break;
                }
                return message;
            };
            NotificationActivitySettingAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.notificationActivitySetting != null &&
                    message.hasOwnProperty("notificationActivitySetting")
                ) {
                    object.notificationActivitySetting =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.NotificationActivitySettingAction
                                  .NotificationActivitySetting[
                                  message.notificationActivitySetting
                              ] === undefined
                                ? message.notificationActivitySetting
                                : $root.SyncAction.SyncActionValue.NotificationActivitySettingAction
                                      .NotificationActivitySetting[
                                      message.notificationActivitySetting
                                  ]
                            : message.notificationActivitySetting;
                    if (options.oneofs)
                        object._notificationActivitySetting = "notificationActivitySetting";
                }
                return object;
            };
            NotificationActivitySettingAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            NotificationActivitySettingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix + "/SyncAction.SyncActionValue.NotificationActivitySettingAction"
                );
            };
            NotificationActivitySettingAction.NotificationActivitySetting = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "DEFAULT_ALL_MESSAGES")] = 0;
                values[(valuesById[1] = "ALL_MESSAGES")] = 1;
                values[(valuesById[2] = "HIGHLIGHTS")] = 2;
                values[(valuesById[3] = "DEFAULT_HIGHLIGHTS")] = 3;
                return values;
            })();
            return NotificationActivitySettingAction;
        })();
        SyncActionValue.NuxAction = (function () {
            function NuxAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            NuxAction.prototype.acknowledged = null;
            var $oneOfFields;
            Object.defineProperty(NuxAction.prototype, "_acknowledged", {
                get: $util.oneOfGetter(($oneOfFields = ["acknowledged"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            NuxAction.create = function create(properties) {
                return new NuxAction(properties);
            };
            NuxAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.acknowledged != null &&
                    Object.hasOwnProperty.call(message, "acknowledged")
                )
                    writer.uint32(8).bool(message.acknowledged);
                return writer;
            };
            NuxAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            NuxAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.NuxAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.acknowledged = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            NuxAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            NuxAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.acknowledged != null && message.hasOwnProperty("acknowledged")) {
                    properties._acknowledged = 1;
                    if (typeof message.acknowledged !== "boolean")
                        return "acknowledged: boolean expected";
                }
                return null;
            };
            NuxAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.NuxAction) return object;
                var message = new $root.SyncAction.SyncActionValue.NuxAction();
                if (object.acknowledged != null)
                    message.acknowledged = Boolean(object.acknowledged);
                return message;
            };
            NuxAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.acknowledged != null && message.hasOwnProperty("acknowledged")) {
                    object.acknowledged = message.acknowledged;
                    if (options.oneofs) object._acknowledged = "acknowledged";
                }
                return object;
            };
            NuxAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            NuxAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.NuxAction";
            };
            return NuxAction;
        })();
        SyncActionValue.PaymentInfoAction = (function () {
            function PaymentInfoAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PaymentInfoAction.prototype.cpi = null;
            var $oneOfFields;
            Object.defineProperty(PaymentInfoAction.prototype, "_cpi", {
                get: $util.oneOfGetter(($oneOfFields = ["cpi"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PaymentInfoAction.create = function create(properties) {
                return new PaymentInfoAction(properties);
            };
            PaymentInfoAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.cpi != null && Object.hasOwnProperty.call(message, "cpi"))
                    writer.uint32(10).string(message.cpi);
                return writer;
            };
            PaymentInfoAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PaymentInfoAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PaymentInfoAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.cpi = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PaymentInfoAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PaymentInfoAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.cpi != null && message.hasOwnProperty("cpi")) {
                    properties._cpi = 1;
                    if (!$util.isString(message.cpi)) return "cpi: string expected";
                }
                return null;
            };
            PaymentInfoAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PaymentInfoAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PaymentInfoAction();
                if (object.cpi != null) message.cpi = String(object.cpi);
                return message;
            };
            PaymentInfoAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.cpi != null && message.hasOwnProperty("cpi")) {
                    object.cpi = message.cpi;
                    if (options.oneofs) object._cpi = "cpi";
                }
                return object;
            };
            PaymentInfoAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PaymentInfoAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PaymentInfoAction";
            };
            return PaymentInfoAction;
        })();
        SyncActionValue.PaymentTosAction = (function () {
            function PaymentTosAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PaymentTosAction.prototype.paymentNotice = null;
            PaymentTosAction.prototype.accepted = null;
            var $oneOfFields;
            Object.defineProperty(PaymentTosAction.prototype, "_paymentNotice", {
                get: $util.oneOfGetter(($oneOfFields = ["paymentNotice"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(PaymentTosAction.prototype, "_accepted", {
                get: $util.oneOfGetter(($oneOfFields = ["accepted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PaymentTosAction.create = function create(properties) {
                return new PaymentTosAction(properties);
            };
            PaymentTosAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.paymentNotice != null &&
                    Object.hasOwnProperty.call(message, "paymentNotice")
                )
                    writer.uint32(8).int32(message.paymentNotice);
                if (message.accepted != null && Object.hasOwnProperty.call(message, "accepted"))
                    writer.uint32(16).bool(message.accepted);
                return writer;
            };
            PaymentTosAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PaymentTosAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PaymentTosAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.paymentNotice = reader.int32();
                            break;
                        }
                        case 2: {
                            message.accepted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PaymentTosAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PaymentTosAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.paymentNotice != null && message.hasOwnProperty("paymentNotice")) {
                    properties._paymentNotice = 1;
                    switch (message.paymentNotice) {
                        default:
                            return "paymentNotice: enum value expected";
                        case 0:
                            break;
                    }
                }
                if (message.accepted != null && message.hasOwnProperty("accepted")) {
                    properties._accepted = 1;
                    if (typeof message.accepted !== "boolean") return "accepted: boolean expected";
                }
                return null;
            };
            PaymentTosAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PaymentTosAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PaymentTosAction();
                switch (object.paymentNotice) {
                    default:
                        if (typeof object.paymentNotice === "number") {
                            message.paymentNotice = object.paymentNotice;
                            break;
                        }
                        break;
                    case "BR_PAY_PRIVACY_POLICY":
                    case 0:
                        message.paymentNotice = 0;
                        break;
                }
                if (object.accepted != null) message.accepted = Boolean(object.accepted);
                return message;
            };
            PaymentTosAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.paymentNotice != null && message.hasOwnProperty("paymentNotice")) {
                    object.paymentNotice =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice[
                                  message.paymentNotice
                              ] === undefined
                                ? message.paymentNotice
                                : $root.SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice[
                                      message.paymentNotice
                                  ]
                            : message.paymentNotice;
                    if (options.oneofs) object._paymentNotice = "paymentNotice";
                }
                if (message.accepted != null && message.hasOwnProperty("accepted")) {
                    object.accepted = message.accepted;
                    if (options.oneofs) object._accepted = "accepted";
                }
                return object;
            };
            PaymentTosAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PaymentTosAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PaymentTosAction";
            };
            PaymentTosAction.PaymentNotice = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "BR_PAY_PRIVACY_POLICY")] = 0;
                return values;
            })();
            return PaymentTosAction;
        })();
        SyncActionValue.PinAction = (function () {
            function PinAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PinAction.prototype.pinned = null;
            var $oneOfFields;
            Object.defineProperty(PinAction.prototype, "_pinned", {
                get: $util.oneOfGetter(($oneOfFields = ["pinned"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PinAction.create = function create(properties) {
                return new PinAction(properties);
            };
            PinAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.pinned != null && Object.hasOwnProperty.call(message, "pinned"))
                    writer.uint32(8).bool(message.pinned);
                return writer;
            };
            PinAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PinAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PinAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.pinned = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PinAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PinAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.pinned != null && message.hasOwnProperty("pinned")) {
                    properties._pinned = 1;
                    if (typeof message.pinned !== "boolean") return "pinned: boolean expected";
                }
                return null;
            };
            PinAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PinAction) return object;
                var message = new $root.SyncAction.SyncActionValue.PinAction();
                if (object.pinned != null) message.pinned = Boolean(object.pinned);
                return message;
            };
            PinAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.pinned != null && message.hasOwnProperty("pinned")) {
                    object.pinned = message.pinned;
                    if (options.oneofs) object._pinned = "pinned";
                }
                return object;
            };
            PinAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PinAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PinAction";
            };
            return PinAction;
        })();
        SyncActionValue.PnForLidChatAction = (function () {
            function PnForLidChatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PnForLidChatAction.prototype.pnJid = null;
            var $oneOfFields;
            Object.defineProperty(PnForLidChatAction.prototype, "_pnJid", {
                get: $util.oneOfGetter(($oneOfFields = ["pnJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PnForLidChatAction.create = function create(properties) {
                return new PnForLidChatAction(properties);
            };
            PnForLidChatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.pnJid != null && Object.hasOwnProperty.call(message, "pnJid"))
                    writer.uint32(10).string(message.pnJid);
                return writer;
            };
            PnForLidChatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PnForLidChatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PnForLidChatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.pnJid = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PnForLidChatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PnForLidChatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    properties._pnJid = 1;
                    if (!$util.isString(message.pnJid)) return "pnJid: string expected";
                }
                return null;
            };
            PnForLidChatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PnForLidChatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PnForLidChatAction();
                if (object.pnJid != null) message.pnJid = String(object.pnJid);
                return message;
            };
            PnForLidChatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.pnJid != null && message.hasOwnProperty("pnJid")) {
                    object.pnJid = message.pnJid;
                    if (options.oneofs) object._pnJid = "pnJid";
                }
                return object;
            };
            PnForLidChatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PnForLidChatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PnForLidChatAction";
            };
            return PnForLidChatAction;
        })();
        SyncActionValue.PrimaryFeature = (function () {
            function PrimaryFeature(properties) {
                this.flags = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrimaryFeature.prototype.flags = $util.emptyArray;
            PrimaryFeature.create = function create(properties) {
                return new PrimaryFeature(properties);
            };
            PrimaryFeature.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.flags != null && message.flags.length)
                    for (var i = 0; i < message.flags.length; ++i)
                        writer.uint32(10).string(message.flags[i]);
                return writer;
            };
            PrimaryFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PrimaryFeature.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PrimaryFeature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (!(message.flags && message.flags.length)) message.flags = [];
                            message.flags.push(reader.string());
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrimaryFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PrimaryFeature.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!Array.isArray(message.flags)) return "flags: array expected";
                    for (var i = 0; i < message.flags.length; ++i)
                        if (!$util.isString(message.flags[i])) return "flags: string[] expected";
                }
                return null;
            };
            PrimaryFeature.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PrimaryFeature)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PrimaryFeature();
                if (object.flags) {
                    if (!Array.isArray(object.flags))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.PrimaryFeature.flags: array expected"
                        );
                    message.flags = [];
                    for (var i = 0; i < object.flags.length; ++i)
                        message.flags[i] = String(object.flags[i]);
                }
                return message;
            };
            PrimaryFeature.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.flags = [];
                if (message.flags && message.flags.length) {
                    object.flags = [];
                    for (var j = 0; j < message.flags.length; ++j)
                        object.flags[j] = message.flags[j];
                }
                return object;
            };
            PrimaryFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PrimaryFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PrimaryFeature";
            };
            return PrimaryFeature;
        })();
        SyncActionValue.PrimaryVersionAction = (function () {
            function PrimaryVersionAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrimaryVersionAction.prototype.version = null;
            var $oneOfFields;
            Object.defineProperty(PrimaryVersionAction.prototype, "_version", {
                get: $util.oneOfGetter(($oneOfFields = ["version"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PrimaryVersionAction.create = function create(properties) {
                return new PrimaryVersionAction(properties);
            };
            PrimaryVersionAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(10).string(message.version);
                return writer;
            };
            PrimaryVersionAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PrimaryVersionAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PrimaryVersionAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.version = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrimaryVersionAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PrimaryVersionAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.version != null && message.hasOwnProperty("version")) {
                    properties._version = 1;
                    if (!$util.isString(message.version)) return "version: string expected";
                }
                return null;
            };
            PrimaryVersionAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PrimaryVersionAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PrimaryVersionAction();
                if (object.version != null) message.version = String(object.version);
                return message;
            };
            PrimaryVersionAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.version != null && message.hasOwnProperty("version")) {
                    object.version = message.version;
                    if (options.oneofs) object._version = "version";
                }
                return object;
            };
            PrimaryVersionAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PrimaryVersionAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PrimaryVersionAction";
            };
            return PrimaryVersionAction;
        })();
        SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction = (function () {
            function PrivacySettingChannelsPersonalisedRecommendationAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrivacySettingChannelsPersonalisedRecommendationAction.prototype.isUserOptedOut = null;
            var $oneOfFields;
            Object.defineProperty(
                PrivacySettingChannelsPersonalisedRecommendationAction.prototype,
                "_isUserOptedOut",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["isUserOptedOut"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            PrivacySettingChannelsPersonalisedRecommendationAction.create = function create(
                properties
            ) {
                return new PrivacySettingChannelsPersonalisedRecommendationAction(properties);
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.encode = function encode(
                message,
                writer
            ) {
                if (!writer) writer = $Writer.create();
                if (
                    message.isUserOptedOut != null &&
                    Object.hasOwnProperty.call(message, "isUserOptedOut")
                )
                    writer.uint32(8).bool(message.isUserOptedOut);
                return writer;
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.encodeDelimited =
                function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
            PrivacySettingChannelsPersonalisedRecommendationAction.decode = function decode(
                reader,
                length,
                error
            ) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isUserOptedOut = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.decodeDelimited =
                function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
            PrivacySettingChannelsPersonalisedRecommendationAction.verify = function verify(
                message
            ) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isUserOptedOut != null && message.hasOwnProperty("isUserOptedOut")) {
                    properties._isUserOptedOut = 1;
                    if (typeof message.isUserOptedOut !== "boolean")
                        return "isUserOptedOut: boolean expected";
                }
                return null;
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.fromObject = function fromObject(
                object
            ) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue
                        .PrivacySettingChannelsPersonalisedRecommendationAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction();
                if (object.isUserOptedOut != null)
                    message.isUserOptedOut = Boolean(object.isUserOptedOut);
                return message;
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.toObject = function toObject(
                message,
                options
            ) {
                if (!options) options = {};
                var object = {};
                if (message.isUserOptedOut != null && message.hasOwnProperty("isUserOptedOut")) {
                    object.isUserOptedOut = message.isUserOptedOut;
                    if (options.oneofs) object._isUserOptedOut = "isUserOptedOut";
                }
                return object;
            };
            PrivacySettingChannelsPersonalisedRecommendationAction.prototype.toJSON =
                function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
            PrivacySettingChannelsPersonalisedRecommendationAction.getTypeUrl = function getTypeUrl(
                typeUrlPrefix
            ) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction"
                );
            };
            return PrivacySettingChannelsPersonalisedRecommendationAction;
        })();
        SyncActionValue.PrivacySettingDisableLinkPreviewsAction = (function () {
            function PrivacySettingDisableLinkPreviewsAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrivacySettingDisableLinkPreviewsAction.prototype.isPreviewsDisabled = null;
            var $oneOfFields;
            Object.defineProperty(
                PrivacySettingDisableLinkPreviewsAction.prototype,
                "_isPreviewsDisabled",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["isPreviewsDisabled"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            PrivacySettingDisableLinkPreviewsAction.create = function create(properties) {
                return new PrivacySettingDisableLinkPreviewsAction(properties);
            };
            PrivacySettingDisableLinkPreviewsAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.isPreviewsDisabled != null &&
                    Object.hasOwnProperty.call(message, "isPreviewsDisabled")
                )
                    writer.uint32(8).bool(message.isPreviewsDisabled);
                return writer;
            };
            PrivacySettingDisableLinkPreviewsAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            PrivacySettingDisableLinkPreviewsAction.decode = function decode(
                reader,
                length,
                error
            ) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isPreviewsDisabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrivacySettingDisableLinkPreviewsAction.decodeDelimited = function decodeDelimited(
                reader
            ) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PrivacySettingDisableLinkPreviewsAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.isPreviewsDisabled != null &&
                    message.hasOwnProperty("isPreviewsDisabled")
                ) {
                    properties._isPreviewsDisabled = 1;
                    if (typeof message.isPreviewsDisabled !== "boolean")
                        return "isPreviewsDisabled: boolean expected";
                }
                return null;
            };
            PrivacySettingDisableLinkPreviewsAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction();
                if (object.isPreviewsDisabled != null)
                    message.isPreviewsDisabled = Boolean(object.isPreviewsDisabled);
                return message;
            };
            PrivacySettingDisableLinkPreviewsAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.isPreviewsDisabled != null &&
                    message.hasOwnProperty("isPreviewsDisabled")
                ) {
                    object.isPreviewsDisabled = message.isPreviewsDisabled;
                    if (options.oneofs) object._isPreviewsDisabled = "isPreviewsDisabled";
                }
                return object;
            };
            PrivacySettingDisableLinkPreviewsAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PrivacySettingDisableLinkPreviewsAction.getTypeUrl = function getTypeUrl(
                typeUrlPrefix
            ) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction"
                );
            };
            return PrivacySettingDisableLinkPreviewsAction;
        })();
        SyncActionValue.PrivacySettingRelayAllCalls = (function () {
            function PrivacySettingRelayAllCalls(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrivacySettingRelayAllCalls.prototype.isEnabled = null;
            var $oneOfFields;
            Object.defineProperty(PrivacySettingRelayAllCalls.prototype, "_isEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PrivacySettingRelayAllCalls.create = function create(properties) {
                return new PrivacySettingRelayAllCalls(properties);
            };
            PrivacySettingRelayAllCalls.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.isEnabled != null && Object.hasOwnProperty.call(message, "isEnabled"))
                    writer.uint32(8).bool(message.isEnabled);
                return writer;
            };
            PrivacySettingRelayAllCalls.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            PrivacySettingRelayAllCalls.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isEnabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrivacySettingRelayAllCalls.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PrivacySettingRelayAllCalls.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isEnabled != null && message.hasOwnProperty("isEnabled")) {
                    properties._isEnabled = 1;
                    if (typeof message.isEnabled !== "boolean")
                        return "isEnabled: boolean expected";
                }
                return null;
            };
            PrivacySettingRelayAllCalls.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PrivacySettingRelayAllCalls();
                if (object.isEnabled != null) message.isEnabled = Boolean(object.isEnabled);
                return message;
            };
            PrivacySettingRelayAllCalls.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.isEnabled != null && message.hasOwnProperty("isEnabled")) {
                    object.isEnabled = message.isEnabled;
                    if (options.oneofs) object._isEnabled = "isEnabled";
                }
                return object;
            };
            PrivacySettingRelayAllCalls.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PrivacySettingRelayAllCalls.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PrivacySettingRelayAllCalls";
            };
            return PrivacySettingRelayAllCalls;
        })();
        SyncActionValue.PrivateProcessingSettingAction = (function () {
            function PrivateProcessingSettingAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PrivateProcessingSettingAction.prototype.privateProcessingStatus = null;
            var $oneOfFields;
            Object.defineProperty(
                PrivateProcessingSettingAction.prototype,
                "_privateProcessingStatus",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["privateProcessingStatus"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            PrivateProcessingSettingAction.create = function create(properties) {
                return new PrivateProcessingSettingAction(properties);
            };
            PrivateProcessingSettingAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.privateProcessingStatus != null &&
                    Object.hasOwnProperty.call(message, "privateProcessingStatus")
                )
                    writer.uint32(8).int32(message.privateProcessingStatus);
                return writer;
            };
            PrivateProcessingSettingAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            PrivateProcessingSettingAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.privateProcessingStatus = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PrivateProcessingSettingAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PrivateProcessingSettingAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.privateProcessingStatus != null &&
                    message.hasOwnProperty("privateProcessingStatus")
                ) {
                    properties._privateProcessingStatus = 1;
                    switch (message.privateProcessingStatus) {
                        default:
                            return "privateProcessingStatus: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            PrivateProcessingSettingAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction
                )
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction();
                switch (object.privateProcessingStatus) {
                    default:
                        if (typeof object.privateProcessingStatus === "number") {
                            message.privateProcessingStatus = object.privateProcessingStatus;
                            break;
                        }
                        break;
                    case "UNDEFINED":
                    case 0:
                        message.privateProcessingStatus = 0;
                        break;
                    case "ENABLED":
                    case 1:
                        message.privateProcessingStatus = 1;
                        break;
                    case "DISABLED":
                    case 2:
                        message.privateProcessingStatus = 2;
                        break;
                }
                return message;
            };
            PrivateProcessingSettingAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.privateProcessingStatus != null &&
                    message.hasOwnProperty("privateProcessingStatus")
                ) {
                    object.privateProcessingStatus =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction
                                  .PrivateProcessingStatus[message.privateProcessingStatus] ===
                              undefined
                                ? message.privateProcessingStatus
                                : $root.SyncAction.SyncActionValue.PrivateProcessingSettingAction
                                      .PrivateProcessingStatus[message.privateProcessingStatus]
                            : message.privateProcessingStatus;
                    if (options.oneofs) object._privateProcessingStatus = "privateProcessingStatus";
                }
                return object;
            };
            PrivateProcessingSettingAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PrivateProcessingSettingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PrivateProcessingSettingAction";
            };
            PrivateProcessingSettingAction.PrivateProcessingStatus = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "UNDEFINED")] = 0;
                values[(valuesById[1] = "ENABLED")] = 1;
                values[(valuesById[2] = "DISABLED")] = 2;
                return values;
            })();
            return PrivateProcessingSettingAction;
        })();
        SyncActionValue.PushNameSetting = (function () {
            function PushNameSetting(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            PushNameSetting.prototype.name = null;
            var $oneOfFields;
            Object.defineProperty(PushNameSetting.prototype, "_name", {
                get: $util.oneOfGetter(($oneOfFields = ["name"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            PushNameSetting.create = function create(properties) {
                return new PushNameSetting(properties);
            };
            PushNameSetting.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(10).string(message.name);
                return writer;
            };
            PushNameSetting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            PushNameSetting.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.PushNameSetting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.name = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            PushNameSetting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            PushNameSetting.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    properties._name = 1;
                    if (!$util.isString(message.name)) return "name: string expected";
                }
                return null;
            };
            PushNameSetting.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.PushNameSetting)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.PushNameSetting();
                if (object.name != null) message.name = String(object.name);
                return message;
            };
            PushNameSetting.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                    object.name = message.name;
                    if (options.oneofs) object._name = "name";
                }
                return object;
            };
            PushNameSetting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            PushNameSetting.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.PushNameSetting";
            };
            return PushNameSetting;
        })();
        SyncActionValue.QuickReplyAction = (function () {
            function QuickReplyAction(properties) {
                this.keywords = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            QuickReplyAction.prototype.shortcut = null;
            QuickReplyAction.prototype.message = null;
            QuickReplyAction.prototype.keywords = $util.emptyArray;
            QuickReplyAction.prototype.count = null;
            QuickReplyAction.prototype.deleted = null;
            var $oneOfFields;
            Object.defineProperty(QuickReplyAction.prototype, "_shortcut", {
                get: $util.oneOfGetter(($oneOfFields = ["shortcut"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(QuickReplyAction.prototype, "_message", {
                get: $util.oneOfGetter(($oneOfFields = ["message"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(QuickReplyAction.prototype, "_count", {
                get: $util.oneOfGetter(($oneOfFields = ["count"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(QuickReplyAction.prototype, "_deleted", {
                get: $util.oneOfGetter(($oneOfFields = ["deleted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            QuickReplyAction.create = function create(properties) {
                return new QuickReplyAction(properties);
            };
            QuickReplyAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.shortcut != null && Object.hasOwnProperty.call(message, "shortcut"))
                    writer.uint32(10).string(message.shortcut);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(18).string(message.message);
                if (message.keywords != null && message.keywords.length)
                    for (var i = 0; i < message.keywords.length; ++i)
                        writer.uint32(26).string(message.keywords[i]);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(32).int32(message.count);
                if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                    writer.uint32(40).bool(message.deleted);
                return writer;
            };
            QuickReplyAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            QuickReplyAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.QuickReplyAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.shortcut = reader.string();
                            break;
                        }
                        case 2: {
                            message.message = reader.string();
                            break;
                        }
                        case 3: {
                            if (!(message.keywords && message.keywords.length))
                                message.keywords = [];
                            message.keywords.push(reader.string());
                            break;
                        }
                        case 4: {
                            message.count = reader.int32();
                            break;
                        }
                        case 5: {
                            message.deleted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            QuickReplyAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            QuickReplyAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.shortcut != null && message.hasOwnProperty("shortcut")) {
                    properties._shortcut = 1;
                    if (!$util.isString(message.shortcut)) return "shortcut: string expected";
                }
                if (message.message != null && message.hasOwnProperty("message")) {
                    properties._message = 1;
                    if (!$util.isString(message.message)) return "message: string expected";
                }
                if (message.keywords != null && message.hasOwnProperty("keywords")) {
                    if (!Array.isArray(message.keywords)) return "keywords: array expected";
                    for (var i = 0; i < message.keywords.length; ++i)
                        if (!$util.isString(message.keywords[i]))
                            return "keywords: string[] expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                    properties._count = 1;
                    if (!$util.isInteger(message.count)) return "count: integer expected";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    properties._deleted = 1;
                    if (typeof message.deleted !== "boolean") return "deleted: boolean expected";
                }
                return null;
            };
            QuickReplyAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.QuickReplyAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.QuickReplyAction();
                if (object.shortcut != null) message.shortcut = String(object.shortcut);
                if (object.message != null) message.message = String(object.message);
                if (object.keywords) {
                    if (!Array.isArray(object.keywords))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.QuickReplyAction.keywords: array expected"
                        );
                    message.keywords = [];
                    for (var i = 0; i < object.keywords.length; ++i)
                        message.keywords[i] = String(object.keywords[i]);
                }
                if (object.count != null) message.count = object.count | 0;
                if (object.deleted != null) message.deleted = Boolean(object.deleted);
                return message;
            };
            QuickReplyAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.keywords = [];
                if (message.shortcut != null && message.hasOwnProperty("shortcut")) {
                    object.shortcut = message.shortcut;
                    if (options.oneofs) object._shortcut = "shortcut";
                }
                if (message.message != null && message.hasOwnProperty("message")) {
                    object.message = message.message;
                    if (options.oneofs) object._message = "message";
                }
                if (message.keywords && message.keywords.length) {
                    object.keywords = [];
                    for (var j = 0; j < message.keywords.length; ++j)
                        object.keywords[j] = message.keywords[j];
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                    object.count = message.count;
                    if (options.oneofs) object._count = "count";
                }
                if (message.deleted != null && message.hasOwnProperty("deleted")) {
                    object.deleted = message.deleted;
                    if (options.oneofs) object._deleted = "deleted";
                }
                return object;
            };
            QuickReplyAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            QuickReplyAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.QuickReplyAction";
            };
            return QuickReplyAction;
        })();
        SyncActionValue.RecentEmojiWeightsAction = (function () {
            function RecentEmojiWeightsAction(properties) {
                this.weights = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            RecentEmojiWeightsAction.prototype.weights = $util.emptyArray;
            RecentEmojiWeightsAction.create = function create(properties) {
                return new RecentEmojiWeightsAction(properties);
            };
            RecentEmojiWeightsAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.weights != null && message.weights.length)
                    for (var i = 0; i < message.weights.length; ++i)
                        $root.SyncAction.RecentEmojiWeight.encode(
                            message.weights[i],
                            writer.uint32(10).fork()
                        ).ldelim();
                return writer;
            };
            RecentEmojiWeightsAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            RecentEmojiWeightsAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            if (!(message.weights && message.weights.length)) message.weights = [];
                            message.weights.push(
                                $root.SyncAction.RecentEmojiWeight.decode(reader, reader.uint32())
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
            RecentEmojiWeightsAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            RecentEmojiWeightsAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                if (message.weights != null && message.hasOwnProperty("weights")) {
                    if (!Array.isArray(message.weights)) return "weights: array expected";
                    for (var i = 0; i < message.weights.length; ++i) {
                        var error = $root.SyncAction.RecentEmojiWeight.verify(message.weights[i]);
                        if (error) return "weights." + error;
                    }
                }
                return null;
            };
            RecentEmojiWeightsAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.RecentEmojiWeightsAction();
                if (object.weights) {
                    if (!Array.isArray(object.weights))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.RecentEmojiWeightsAction.weights: array expected"
                        );
                    message.weights = [];
                    for (var i = 0; i < object.weights.length; ++i) {
                        if (typeof object.weights[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.RecentEmojiWeightsAction.weights: object expected"
                            );
                        message.weights[i] = $root.SyncAction.RecentEmojiWeight.fromObject(
                            object.weights[i]
                        );
                    }
                }
                return message;
            };
            RecentEmojiWeightsAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.weights = [];
                if (message.weights && message.weights.length) {
                    object.weights = [];
                    for (var j = 0; j < message.weights.length; ++j)
                        object.weights[j] = $root.SyncAction.RecentEmojiWeight.toObject(
                            message.weights[j],
                            options
                        );
                }
                return object;
            };
            RecentEmojiWeightsAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            RecentEmojiWeightsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.RecentEmojiWeightsAction";
            };
            return RecentEmojiWeightsAction;
        })();
        SyncActionValue.RemoveRecentStickerAction = (function () {
            function RemoveRecentStickerAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            RemoveRecentStickerAction.prototype.lastStickerSentTs = null;
            var $oneOfFields;
            Object.defineProperty(RemoveRecentStickerAction.prototype, "_lastStickerSentTs", {
                get: $util.oneOfGetter(($oneOfFields = ["lastStickerSentTs"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            RemoveRecentStickerAction.create = function create(properties) {
                return new RemoveRecentStickerAction(properties);
            };
            RemoveRecentStickerAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.lastStickerSentTs != null &&
                    Object.hasOwnProperty.call(message, "lastStickerSentTs")
                )
                    writer.uint32(8).int64(message.lastStickerSentTs);
                return writer;
            };
            RemoveRecentStickerAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            RemoveRecentStickerAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.RemoveRecentStickerAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.lastStickerSentTs = reader.int64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            RemoveRecentStickerAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            RemoveRecentStickerAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.lastStickerSentTs != null &&
                    message.hasOwnProperty("lastStickerSentTs")
                ) {
                    properties._lastStickerSentTs = 1;
                    if (
                        !$util.isInteger(message.lastStickerSentTs) &&
                        !(
                            message.lastStickerSentTs &&
                            $util.isInteger(message.lastStickerSentTs.low) &&
                            $util.isInteger(message.lastStickerSentTs.high)
                        )
                    )
                        return "lastStickerSentTs: integer|Long expected";
                }
                return null;
            };
            RemoveRecentStickerAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.RemoveRecentStickerAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.RemoveRecentStickerAction();
                if (object.lastStickerSentTs != null)
                    if ($util.Long)
                        (message.lastStickerSentTs = $util.Long.fromValue(
                            object.lastStickerSentTs
                        )).unsigned = false;
                    else if (typeof object.lastStickerSentTs === "string")
                        message.lastStickerSentTs = parseInt(object.lastStickerSentTs, 10);
                    else if (typeof object.lastStickerSentTs === "number")
                        message.lastStickerSentTs = object.lastStickerSentTs;
                    else if (typeof object.lastStickerSentTs === "object")
                        message.lastStickerSentTs = new $util.LongBits(
                            object.lastStickerSentTs.low >>> 0,
                            object.lastStickerSentTs.high >>> 0
                        ).toNumber();
                return message;
            };
            RemoveRecentStickerAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.lastStickerSentTs != null &&
                    message.hasOwnProperty("lastStickerSentTs")
                ) {
                    if (typeof message.lastStickerSentTs === "number")
                        object.lastStickerSentTs =
                            options.longs === String
                                ? String(message.lastStickerSentTs)
                                : message.lastStickerSentTs;
                    else
                        object.lastStickerSentTs =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.lastStickerSentTs)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.lastStickerSentTs.low >>> 0,
                                        message.lastStickerSentTs.high >>> 0
                                    ).toNumber()
                                  : message.lastStickerSentTs;
                    if (options.oneofs) object._lastStickerSentTs = "lastStickerSentTs";
                }
                return object;
            };
            RemoveRecentStickerAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            RemoveRecentStickerAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.RemoveRecentStickerAction";
            };
            return RemoveRecentStickerAction;
        })();
        SyncActionValue.SettingsSyncAction = (function () {
            function SettingsSyncAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SettingsSyncAction.prototype.startAtLogin = null;
            SettingsSyncAction.prototype.minimizeToTray = null;
            SettingsSyncAction.prototype.language = null;
            SettingsSyncAction.prototype.replaceTextWithEmoji = null;
            SettingsSyncAction.prototype.bannerNotificationDisplayMode = null;
            SettingsSyncAction.prototype.unreadCounterBadgeDisplayMode = null;
            SettingsSyncAction.prototype.isMessagesNotificationEnabled = null;
            SettingsSyncAction.prototype.isCallsNotificationEnabled = null;
            SettingsSyncAction.prototype.isReactionsNotificationEnabled = null;
            SettingsSyncAction.prototype.isStatusReactionsNotificationEnabled = null;
            SettingsSyncAction.prototype.isTextPreviewForNotificationEnabled = null;
            SettingsSyncAction.prototype.defaultNotificationToneId = null;
            SettingsSyncAction.prototype.groupDefaultNotificationToneId = null;
            SettingsSyncAction.prototype.appTheme = null;
            SettingsSyncAction.prototype.wallpaperId = null;
            SettingsSyncAction.prototype.isDoodleWallpaperEnabled = null;
            SettingsSyncAction.prototype.fontSize = null;
            SettingsSyncAction.prototype.isPhotosAutodownloadEnabled = null;
            SettingsSyncAction.prototype.isAudiosAutodownloadEnabled = null;
            SettingsSyncAction.prototype.isVideosAutodownloadEnabled = null;
            SettingsSyncAction.prototype.isDocumentsAutodownloadEnabled = null;
            SettingsSyncAction.prototype.disableLinkPreviews = null;
            SettingsSyncAction.prototype.notificationToneId = null;
            var $oneOfFields;
            Object.defineProperty(SettingsSyncAction.prototype, "_startAtLogin", {
                get: $util.oneOfGetter(($oneOfFields = ["startAtLogin"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_minimizeToTray", {
                get: $util.oneOfGetter(($oneOfFields = ["minimizeToTray"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_language", {
                get: $util.oneOfGetter(($oneOfFields = ["language"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_replaceTextWithEmoji", {
                get: $util.oneOfGetter(($oneOfFields = ["replaceTextWithEmoji"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_bannerNotificationDisplayMode", {
                get: $util.oneOfGetter(($oneOfFields = ["bannerNotificationDisplayMode"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_unreadCounterBadgeDisplayMode", {
                get: $util.oneOfGetter(($oneOfFields = ["unreadCounterBadgeDisplayMode"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isMessagesNotificationEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isMessagesNotificationEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isCallsNotificationEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isCallsNotificationEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isReactionsNotificationEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isReactionsNotificationEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(
                SettingsSyncAction.prototype,
                "_isStatusReactionsNotificationEnabled",
                {
                    get: $util.oneOfGetter(
                        ($oneOfFields = ["isStatusReactionsNotificationEnabled"])
                    ),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(
                SettingsSyncAction.prototype,
                "_isTextPreviewForNotificationEnabled",
                {
                    get: $util.oneOfGetter(
                        ($oneOfFields = ["isTextPreviewForNotificationEnabled"])
                    ),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            Object.defineProperty(SettingsSyncAction.prototype, "_defaultNotificationToneId", {
                get: $util.oneOfGetter(($oneOfFields = ["defaultNotificationToneId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_groupDefaultNotificationToneId", {
                get: $util.oneOfGetter(($oneOfFields = ["groupDefaultNotificationToneId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_appTheme", {
                get: $util.oneOfGetter(($oneOfFields = ["appTheme"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_wallpaperId", {
                get: $util.oneOfGetter(($oneOfFields = ["wallpaperId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isDoodleWallpaperEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isDoodleWallpaperEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_fontSize", {
                get: $util.oneOfGetter(($oneOfFields = ["fontSize"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isPhotosAutodownloadEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isPhotosAutodownloadEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isAudiosAutodownloadEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isAudiosAutodownloadEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isVideosAutodownloadEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isVideosAutodownloadEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_isDocumentsAutodownloadEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isDocumentsAutodownloadEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_disableLinkPreviews", {
                get: $util.oneOfGetter(($oneOfFields = ["disableLinkPreviews"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SettingsSyncAction.prototype, "_notificationToneId", {
                get: $util.oneOfGetter(($oneOfFields = ["notificationToneId"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SettingsSyncAction.create = function create(properties) {
                return new SettingsSyncAction(properties);
            };
            SettingsSyncAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.startAtLogin != null &&
                    Object.hasOwnProperty.call(message, "startAtLogin")
                )
                    writer.uint32(8).bool(message.startAtLogin);
                if (
                    message.minimizeToTray != null &&
                    Object.hasOwnProperty.call(message, "minimizeToTray")
                )
                    writer.uint32(16).bool(message.minimizeToTray);
                if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                    writer.uint32(26).string(message.language);
                if (
                    message.replaceTextWithEmoji != null &&
                    Object.hasOwnProperty.call(message, "replaceTextWithEmoji")
                )
                    writer.uint32(32).bool(message.replaceTextWithEmoji);
                if (
                    message.bannerNotificationDisplayMode != null &&
                    Object.hasOwnProperty.call(message, "bannerNotificationDisplayMode")
                )
                    writer.uint32(40).int32(message.bannerNotificationDisplayMode);
                if (
                    message.unreadCounterBadgeDisplayMode != null &&
                    Object.hasOwnProperty.call(message, "unreadCounterBadgeDisplayMode")
                )
                    writer.uint32(48).int32(message.unreadCounterBadgeDisplayMode);
                if (
                    message.isMessagesNotificationEnabled != null &&
                    Object.hasOwnProperty.call(message, "isMessagesNotificationEnabled")
                )
                    writer.uint32(56).bool(message.isMessagesNotificationEnabled);
                if (
                    message.isCallsNotificationEnabled != null &&
                    Object.hasOwnProperty.call(message, "isCallsNotificationEnabled")
                )
                    writer.uint32(64).bool(message.isCallsNotificationEnabled);
                if (
                    message.isReactionsNotificationEnabled != null &&
                    Object.hasOwnProperty.call(message, "isReactionsNotificationEnabled")
                )
                    writer.uint32(72).bool(message.isReactionsNotificationEnabled);
                if (
                    message.isStatusReactionsNotificationEnabled != null &&
                    Object.hasOwnProperty.call(message, "isStatusReactionsNotificationEnabled")
                )
                    writer.uint32(80).bool(message.isStatusReactionsNotificationEnabled);
                if (
                    message.isTextPreviewForNotificationEnabled != null &&
                    Object.hasOwnProperty.call(message, "isTextPreviewForNotificationEnabled")
                )
                    writer.uint32(88).bool(message.isTextPreviewForNotificationEnabled);
                if (
                    message.defaultNotificationToneId != null &&
                    Object.hasOwnProperty.call(message, "defaultNotificationToneId")
                )
                    writer.uint32(96).int32(message.defaultNotificationToneId);
                if (
                    message.groupDefaultNotificationToneId != null &&
                    Object.hasOwnProperty.call(message, "groupDefaultNotificationToneId")
                )
                    writer.uint32(104).int32(message.groupDefaultNotificationToneId);
                if (message.appTheme != null && Object.hasOwnProperty.call(message, "appTheme"))
                    writer.uint32(112).int32(message.appTheme);
                if (
                    message.wallpaperId != null &&
                    Object.hasOwnProperty.call(message, "wallpaperId")
                )
                    writer.uint32(120).int32(message.wallpaperId);
                if (
                    message.isDoodleWallpaperEnabled != null &&
                    Object.hasOwnProperty.call(message, "isDoodleWallpaperEnabled")
                )
                    writer.uint32(128).bool(message.isDoodleWallpaperEnabled);
                if (message.fontSize != null && Object.hasOwnProperty.call(message, "fontSize"))
                    writer.uint32(136).int32(message.fontSize);
                if (
                    message.isPhotosAutodownloadEnabled != null &&
                    Object.hasOwnProperty.call(message, "isPhotosAutodownloadEnabled")
                )
                    writer.uint32(144).bool(message.isPhotosAutodownloadEnabled);
                if (
                    message.isAudiosAutodownloadEnabled != null &&
                    Object.hasOwnProperty.call(message, "isAudiosAutodownloadEnabled")
                )
                    writer.uint32(152).bool(message.isAudiosAutodownloadEnabled);
                if (
                    message.isVideosAutodownloadEnabled != null &&
                    Object.hasOwnProperty.call(message, "isVideosAutodownloadEnabled")
                )
                    writer.uint32(160).bool(message.isVideosAutodownloadEnabled);
                if (
                    message.isDocumentsAutodownloadEnabled != null &&
                    Object.hasOwnProperty.call(message, "isDocumentsAutodownloadEnabled")
                )
                    writer.uint32(168).bool(message.isDocumentsAutodownloadEnabled);
                if (
                    message.disableLinkPreviews != null &&
                    Object.hasOwnProperty.call(message, "disableLinkPreviews")
                )
                    writer.uint32(176).bool(message.disableLinkPreviews);
                if (
                    message.notificationToneId != null &&
                    Object.hasOwnProperty.call(message, "notificationToneId")
                )
                    writer.uint32(184).int32(message.notificationToneId);
                return writer;
            };
            SettingsSyncAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SettingsSyncAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.SettingsSyncAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.startAtLogin = reader.bool();
                            break;
                        }
                        case 2: {
                            message.minimizeToTray = reader.bool();
                            break;
                        }
                        case 3: {
                            message.language = reader.string();
                            break;
                        }
                        case 4: {
                            message.replaceTextWithEmoji = reader.bool();
                            break;
                        }
                        case 5: {
                            message.bannerNotificationDisplayMode = reader.int32();
                            break;
                        }
                        case 6: {
                            message.unreadCounterBadgeDisplayMode = reader.int32();
                            break;
                        }
                        case 7: {
                            message.isMessagesNotificationEnabled = reader.bool();
                            break;
                        }
                        case 8: {
                            message.isCallsNotificationEnabled = reader.bool();
                            break;
                        }
                        case 9: {
                            message.isReactionsNotificationEnabled = reader.bool();
                            break;
                        }
                        case 10: {
                            message.isStatusReactionsNotificationEnabled = reader.bool();
                            break;
                        }
                        case 11: {
                            message.isTextPreviewForNotificationEnabled = reader.bool();
                            break;
                        }
                        case 12: {
                            message.defaultNotificationToneId = reader.int32();
                            break;
                        }
                        case 13: {
                            message.groupDefaultNotificationToneId = reader.int32();
                            break;
                        }
                        case 14: {
                            message.appTheme = reader.int32();
                            break;
                        }
                        case 15: {
                            message.wallpaperId = reader.int32();
                            break;
                        }
                        case 16: {
                            message.isDoodleWallpaperEnabled = reader.bool();
                            break;
                        }
                        case 17: {
                            message.fontSize = reader.int32();
                            break;
                        }
                        case 18: {
                            message.isPhotosAutodownloadEnabled = reader.bool();
                            break;
                        }
                        case 19: {
                            message.isAudiosAutodownloadEnabled = reader.bool();
                            break;
                        }
                        case 20: {
                            message.isVideosAutodownloadEnabled = reader.bool();
                            break;
                        }
                        case 21: {
                            message.isDocumentsAutodownloadEnabled = reader.bool();
                            break;
                        }
                        case 22: {
                            message.disableLinkPreviews = reader.bool();
                            break;
                        }
                        case 23: {
                            message.notificationToneId = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SettingsSyncAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SettingsSyncAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.startAtLogin != null && message.hasOwnProperty("startAtLogin")) {
                    properties._startAtLogin = 1;
                    if (typeof message.startAtLogin !== "boolean")
                        return "startAtLogin: boolean expected";
                }
                if (message.minimizeToTray != null && message.hasOwnProperty("minimizeToTray")) {
                    properties._minimizeToTray = 1;
                    if (typeof message.minimizeToTray !== "boolean")
                        return "minimizeToTray: boolean expected";
                }
                if (message.language != null && message.hasOwnProperty("language")) {
                    properties._language = 1;
                    if (!$util.isString(message.language)) return "language: string expected";
                }
                if (
                    message.replaceTextWithEmoji != null &&
                    message.hasOwnProperty("replaceTextWithEmoji")
                ) {
                    properties._replaceTextWithEmoji = 1;
                    if (typeof message.replaceTextWithEmoji !== "boolean")
                        return "replaceTextWithEmoji: boolean expected";
                }
                if (
                    message.bannerNotificationDisplayMode != null &&
                    message.hasOwnProperty("bannerNotificationDisplayMode")
                ) {
                    properties._bannerNotificationDisplayMode = 1;
                    switch (message.bannerNotificationDisplayMode) {
                        default:
                            return "bannerNotificationDisplayMode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                if (
                    message.unreadCounterBadgeDisplayMode != null &&
                    message.hasOwnProperty("unreadCounterBadgeDisplayMode")
                ) {
                    properties._unreadCounterBadgeDisplayMode = 1;
                    switch (message.unreadCounterBadgeDisplayMode) {
                        default:
                            return "unreadCounterBadgeDisplayMode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                if (
                    message.isMessagesNotificationEnabled != null &&
                    message.hasOwnProperty("isMessagesNotificationEnabled")
                ) {
                    properties._isMessagesNotificationEnabled = 1;
                    if (typeof message.isMessagesNotificationEnabled !== "boolean")
                        return "isMessagesNotificationEnabled: boolean expected";
                }
                if (
                    message.isCallsNotificationEnabled != null &&
                    message.hasOwnProperty("isCallsNotificationEnabled")
                ) {
                    properties._isCallsNotificationEnabled = 1;
                    if (typeof message.isCallsNotificationEnabled !== "boolean")
                        return "isCallsNotificationEnabled: boolean expected";
                }
                if (
                    message.isReactionsNotificationEnabled != null &&
                    message.hasOwnProperty("isReactionsNotificationEnabled")
                ) {
                    properties._isReactionsNotificationEnabled = 1;
                    if (typeof message.isReactionsNotificationEnabled !== "boolean")
                        return "isReactionsNotificationEnabled: boolean expected";
                }
                if (
                    message.isStatusReactionsNotificationEnabled != null &&
                    message.hasOwnProperty("isStatusReactionsNotificationEnabled")
                ) {
                    properties._isStatusReactionsNotificationEnabled = 1;
                    if (typeof message.isStatusReactionsNotificationEnabled !== "boolean")
                        return "isStatusReactionsNotificationEnabled: boolean expected";
                }
                if (
                    message.isTextPreviewForNotificationEnabled != null &&
                    message.hasOwnProperty("isTextPreviewForNotificationEnabled")
                ) {
                    properties._isTextPreviewForNotificationEnabled = 1;
                    if (typeof message.isTextPreviewForNotificationEnabled !== "boolean")
                        return "isTextPreviewForNotificationEnabled: boolean expected";
                }
                if (
                    message.defaultNotificationToneId != null &&
                    message.hasOwnProperty("defaultNotificationToneId")
                ) {
                    properties._defaultNotificationToneId = 1;
                    if (!$util.isInteger(message.defaultNotificationToneId))
                        return "defaultNotificationToneId: integer expected";
                }
                if (
                    message.groupDefaultNotificationToneId != null &&
                    message.hasOwnProperty("groupDefaultNotificationToneId")
                ) {
                    properties._groupDefaultNotificationToneId = 1;
                    if (!$util.isInteger(message.groupDefaultNotificationToneId))
                        return "groupDefaultNotificationToneId: integer expected";
                }
                if (message.appTheme != null && message.hasOwnProperty("appTheme")) {
                    properties._appTheme = 1;
                    if (!$util.isInteger(message.appTheme)) return "appTheme: integer expected";
                }
                if (message.wallpaperId != null && message.hasOwnProperty("wallpaperId")) {
                    properties._wallpaperId = 1;
                    if (!$util.isInteger(message.wallpaperId))
                        return "wallpaperId: integer expected";
                }
                if (
                    message.isDoodleWallpaperEnabled != null &&
                    message.hasOwnProperty("isDoodleWallpaperEnabled")
                ) {
                    properties._isDoodleWallpaperEnabled = 1;
                    if (typeof message.isDoodleWallpaperEnabled !== "boolean")
                        return "isDoodleWallpaperEnabled: boolean expected";
                }
                if (message.fontSize != null && message.hasOwnProperty("fontSize")) {
                    properties._fontSize = 1;
                    if (!$util.isInteger(message.fontSize)) return "fontSize: integer expected";
                }
                if (
                    message.isPhotosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isPhotosAutodownloadEnabled")
                ) {
                    properties._isPhotosAutodownloadEnabled = 1;
                    if (typeof message.isPhotosAutodownloadEnabled !== "boolean")
                        return "isPhotosAutodownloadEnabled: boolean expected";
                }
                if (
                    message.isAudiosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isAudiosAutodownloadEnabled")
                ) {
                    properties._isAudiosAutodownloadEnabled = 1;
                    if (typeof message.isAudiosAutodownloadEnabled !== "boolean")
                        return "isAudiosAutodownloadEnabled: boolean expected";
                }
                if (
                    message.isVideosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isVideosAutodownloadEnabled")
                ) {
                    properties._isVideosAutodownloadEnabled = 1;
                    if (typeof message.isVideosAutodownloadEnabled !== "boolean")
                        return "isVideosAutodownloadEnabled: boolean expected";
                }
                if (
                    message.isDocumentsAutodownloadEnabled != null &&
                    message.hasOwnProperty("isDocumentsAutodownloadEnabled")
                ) {
                    properties._isDocumentsAutodownloadEnabled = 1;
                    if (typeof message.isDocumentsAutodownloadEnabled !== "boolean")
                        return "isDocumentsAutodownloadEnabled: boolean expected";
                }
                if (
                    message.disableLinkPreviews != null &&
                    message.hasOwnProperty("disableLinkPreviews")
                ) {
                    properties._disableLinkPreviews = 1;
                    if (typeof message.disableLinkPreviews !== "boolean")
                        return "disableLinkPreviews: boolean expected";
                }
                if (
                    message.notificationToneId != null &&
                    message.hasOwnProperty("notificationToneId")
                ) {
                    properties._notificationToneId = 1;
                    if (!$util.isInteger(message.notificationToneId))
                        return "notificationToneId: integer expected";
                }
                return null;
            };
            SettingsSyncAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.SettingsSyncAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.SettingsSyncAction();
                if (object.startAtLogin != null)
                    message.startAtLogin = Boolean(object.startAtLogin);
                if (object.minimizeToTray != null)
                    message.minimizeToTray = Boolean(object.minimizeToTray);
                if (object.language != null) message.language = String(object.language);
                if (object.replaceTextWithEmoji != null)
                    message.replaceTextWithEmoji = Boolean(object.replaceTextWithEmoji);
                switch (object.bannerNotificationDisplayMode) {
                    default:
                        if (typeof object.bannerNotificationDisplayMode === "number") {
                            message.bannerNotificationDisplayMode =
                                object.bannerNotificationDisplayMode;
                            break;
                        }
                        break;
                    case "DISPLAY_MODE_UNKNOWN":
                    case 0:
                        message.bannerNotificationDisplayMode = 0;
                        break;
                    case "ALWAYS":
                    case 1:
                        message.bannerNotificationDisplayMode = 1;
                        break;
                    case "NEVER":
                    case 2:
                        message.bannerNotificationDisplayMode = 2;
                        break;
                    case "ONLY_WHEN_APP_IS_OPEN":
                    case 3:
                        message.bannerNotificationDisplayMode = 3;
                        break;
                }
                switch (object.unreadCounterBadgeDisplayMode) {
                    default:
                        if (typeof object.unreadCounterBadgeDisplayMode === "number") {
                            message.unreadCounterBadgeDisplayMode =
                                object.unreadCounterBadgeDisplayMode;
                            break;
                        }
                        break;
                    case "DISPLAY_MODE_UNKNOWN":
                    case 0:
                        message.unreadCounterBadgeDisplayMode = 0;
                        break;
                    case "ALWAYS":
                    case 1:
                        message.unreadCounterBadgeDisplayMode = 1;
                        break;
                    case "NEVER":
                    case 2:
                        message.unreadCounterBadgeDisplayMode = 2;
                        break;
                    case "ONLY_WHEN_APP_IS_OPEN":
                    case 3:
                        message.unreadCounterBadgeDisplayMode = 3;
                        break;
                }
                if (object.isMessagesNotificationEnabled != null)
                    message.isMessagesNotificationEnabled = Boolean(
                        object.isMessagesNotificationEnabled
                    );
                if (object.isCallsNotificationEnabled != null)
                    message.isCallsNotificationEnabled = Boolean(object.isCallsNotificationEnabled);
                if (object.isReactionsNotificationEnabled != null)
                    message.isReactionsNotificationEnabled = Boolean(
                        object.isReactionsNotificationEnabled
                    );
                if (object.isStatusReactionsNotificationEnabled != null)
                    message.isStatusReactionsNotificationEnabled = Boolean(
                        object.isStatusReactionsNotificationEnabled
                    );
                if (object.isTextPreviewForNotificationEnabled != null)
                    message.isTextPreviewForNotificationEnabled = Boolean(
                        object.isTextPreviewForNotificationEnabled
                    );
                if (object.defaultNotificationToneId != null)
                    message.defaultNotificationToneId = object.defaultNotificationToneId | 0;
                if (object.groupDefaultNotificationToneId != null)
                    message.groupDefaultNotificationToneId =
                        object.groupDefaultNotificationToneId | 0;
                if (object.appTheme != null) message.appTheme = object.appTheme | 0;
                if (object.wallpaperId != null) message.wallpaperId = object.wallpaperId | 0;
                if (object.isDoodleWallpaperEnabled != null)
                    message.isDoodleWallpaperEnabled = Boolean(object.isDoodleWallpaperEnabled);
                if (object.fontSize != null) message.fontSize = object.fontSize | 0;
                if (object.isPhotosAutodownloadEnabled != null)
                    message.isPhotosAutodownloadEnabled = Boolean(
                        object.isPhotosAutodownloadEnabled
                    );
                if (object.isAudiosAutodownloadEnabled != null)
                    message.isAudiosAutodownloadEnabled = Boolean(
                        object.isAudiosAutodownloadEnabled
                    );
                if (object.isVideosAutodownloadEnabled != null)
                    message.isVideosAutodownloadEnabled = Boolean(
                        object.isVideosAutodownloadEnabled
                    );
                if (object.isDocumentsAutodownloadEnabled != null)
                    message.isDocumentsAutodownloadEnabled = Boolean(
                        object.isDocumentsAutodownloadEnabled
                    );
                if (object.disableLinkPreviews != null)
                    message.disableLinkPreviews = Boolean(object.disableLinkPreviews);
                if (object.notificationToneId != null)
                    message.notificationToneId = object.notificationToneId | 0;
                return message;
            };
            SettingsSyncAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.startAtLogin != null && message.hasOwnProperty("startAtLogin")) {
                    object.startAtLogin = message.startAtLogin;
                    if (options.oneofs) object._startAtLogin = "startAtLogin";
                }
                if (message.minimizeToTray != null && message.hasOwnProperty("minimizeToTray")) {
                    object.minimizeToTray = message.minimizeToTray;
                    if (options.oneofs) object._minimizeToTray = "minimizeToTray";
                }
                if (message.language != null && message.hasOwnProperty("language")) {
                    object.language = message.language;
                    if (options.oneofs) object._language = "language";
                }
                if (
                    message.replaceTextWithEmoji != null &&
                    message.hasOwnProperty("replaceTextWithEmoji")
                ) {
                    object.replaceTextWithEmoji = message.replaceTextWithEmoji;
                    if (options.oneofs) object._replaceTextWithEmoji = "replaceTextWithEmoji";
                }
                if (
                    message.bannerNotificationDisplayMode != null &&
                    message.hasOwnProperty("bannerNotificationDisplayMode")
                ) {
                    object.bannerNotificationDisplayMode =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode[
                                  message.bannerNotificationDisplayMode
                              ] === undefined
                                ? message.bannerNotificationDisplayMode
                                : $root.SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode[
                                      message.bannerNotificationDisplayMode
                                  ]
                            : message.bannerNotificationDisplayMode;
                    if (options.oneofs)
                        object._bannerNotificationDisplayMode = "bannerNotificationDisplayMode";
                }
                if (
                    message.unreadCounterBadgeDisplayMode != null &&
                    message.hasOwnProperty("unreadCounterBadgeDisplayMode")
                ) {
                    object.unreadCounterBadgeDisplayMode =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode[
                                  message.unreadCounterBadgeDisplayMode
                              ] === undefined
                                ? message.unreadCounterBadgeDisplayMode
                                : $root.SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode[
                                      message.unreadCounterBadgeDisplayMode
                                  ]
                            : message.unreadCounterBadgeDisplayMode;
                    if (options.oneofs)
                        object._unreadCounterBadgeDisplayMode = "unreadCounterBadgeDisplayMode";
                }
                if (
                    message.isMessagesNotificationEnabled != null &&
                    message.hasOwnProperty("isMessagesNotificationEnabled")
                ) {
                    object.isMessagesNotificationEnabled = message.isMessagesNotificationEnabled;
                    if (options.oneofs)
                        object._isMessagesNotificationEnabled = "isMessagesNotificationEnabled";
                }
                if (
                    message.isCallsNotificationEnabled != null &&
                    message.hasOwnProperty("isCallsNotificationEnabled")
                ) {
                    object.isCallsNotificationEnabled = message.isCallsNotificationEnabled;
                    if (options.oneofs)
                        object._isCallsNotificationEnabled = "isCallsNotificationEnabled";
                }
                if (
                    message.isReactionsNotificationEnabled != null &&
                    message.hasOwnProperty("isReactionsNotificationEnabled")
                ) {
                    object.isReactionsNotificationEnabled = message.isReactionsNotificationEnabled;
                    if (options.oneofs)
                        object._isReactionsNotificationEnabled = "isReactionsNotificationEnabled";
                }
                if (
                    message.isStatusReactionsNotificationEnabled != null &&
                    message.hasOwnProperty("isStatusReactionsNotificationEnabled")
                ) {
                    object.isStatusReactionsNotificationEnabled =
                        message.isStatusReactionsNotificationEnabled;
                    if (options.oneofs)
                        object._isStatusReactionsNotificationEnabled =
                            "isStatusReactionsNotificationEnabled";
                }
                if (
                    message.isTextPreviewForNotificationEnabled != null &&
                    message.hasOwnProperty("isTextPreviewForNotificationEnabled")
                ) {
                    object.isTextPreviewForNotificationEnabled =
                        message.isTextPreviewForNotificationEnabled;
                    if (options.oneofs)
                        object._isTextPreviewForNotificationEnabled =
                            "isTextPreviewForNotificationEnabled";
                }
                if (
                    message.defaultNotificationToneId != null &&
                    message.hasOwnProperty("defaultNotificationToneId")
                ) {
                    object.defaultNotificationToneId = message.defaultNotificationToneId;
                    if (options.oneofs)
                        object._defaultNotificationToneId = "defaultNotificationToneId";
                }
                if (
                    message.groupDefaultNotificationToneId != null &&
                    message.hasOwnProperty("groupDefaultNotificationToneId")
                ) {
                    object.groupDefaultNotificationToneId = message.groupDefaultNotificationToneId;
                    if (options.oneofs)
                        object._groupDefaultNotificationToneId = "groupDefaultNotificationToneId";
                }
                if (message.appTheme != null && message.hasOwnProperty("appTheme")) {
                    object.appTheme = message.appTheme;
                    if (options.oneofs) object._appTheme = "appTheme";
                }
                if (message.wallpaperId != null && message.hasOwnProperty("wallpaperId")) {
                    object.wallpaperId = message.wallpaperId;
                    if (options.oneofs) object._wallpaperId = "wallpaperId";
                }
                if (
                    message.isDoodleWallpaperEnabled != null &&
                    message.hasOwnProperty("isDoodleWallpaperEnabled")
                ) {
                    object.isDoodleWallpaperEnabled = message.isDoodleWallpaperEnabled;
                    if (options.oneofs)
                        object._isDoodleWallpaperEnabled = "isDoodleWallpaperEnabled";
                }
                if (message.fontSize != null && message.hasOwnProperty("fontSize")) {
                    object.fontSize = message.fontSize;
                    if (options.oneofs) object._fontSize = "fontSize";
                }
                if (
                    message.isPhotosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isPhotosAutodownloadEnabled")
                ) {
                    object.isPhotosAutodownloadEnabled = message.isPhotosAutodownloadEnabled;
                    if (options.oneofs)
                        object._isPhotosAutodownloadEnabled = "isPhotosAutodownloadEnabled";
                }
                if (
                    message.isAudiosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isAudiosAutodownloadEnabled")
                ) {
                    object.isAudiosAutodownloadEnabled = message.isAudiosAutodownloadEnabled;
                    if (options.oneofs)
                        object._isAudiosAutodownloadEnabled = "isAudiosAutodownloadEnabled";
                }
                if (
                    message.isVideosAutodownloadEnabled != null &&
                    message.hasOwnProperty("isVideosAutodownloadEnabled")
                ) {
                    object.isVideosAutodownloadEnabled = message.isVideosAutodownloadEnabled;
                    if (options.oneofs)
                        object._isVideosAutodownloadEnabled = "isVideosAutodownloadEnabled";
                }
                if (
                    message.isDocumentsAutodownloadEnabled != null &&
                    message.hasOwnProperty("isDocumentsAutodownloadEnabled")
                ) {
                    object.isDocumentsAutodownloadEnabled = message.isDocumentsAutodownloadEnabled;
                    if (options.oneofs)
                        object._isDocumentsAutodownloadEnabled = "isDocumentsAutodownloadEnabled";
                }
                if (
                    message.disableLinkPreviews != null &&
                    message.hasOwnProperty("disableLinkPreviews")
                ) {
                    object.disableLinkPreviews = message.disableLinkPreviews;
                    if (options.oneofs) object._disableLinkPreviews = "disableLinkPreviews";
                }
                if (
                    message.notificationToneId != null &&
                    message.hasOwnProperty("notificationToneId")
                ) {
                    object.notificationToneId = message.notificationToneId;
                    if (options.oneofs) object._notificationToneId = "notificationToneId";
                }
                return object;
            };
            SettingsSyncAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SettingsSyncAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.SettingsSyncAction";
            };
            SettingsSyncAction.DisplayMode = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "DISPLAY_MODE_UNKNOWN")] = 0;
                values[(valuesById[1] = "ALWAYS")] = 1;
                values[(valuesById[2] = "NEVER")] = 2;
                values[(valuesById[3] = "ONLY_WHEN_APP_IS_OPEN")] = 3;
                return values;
            })();
            SettingsSyncAction.SettingKey = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "SETTING_KEY_UNKNOWN")] = 0;
                values[(valuesById[1] = "START_AT_LOGIN")] = 1;
                values[(valuesById[2] = "MINIMIZE_TO_TRAY")] = 2;
                values[(valuesById[3] = "LANGUAGE")] = 3;
                values[(valuesById[4] = "REPLACE_TEXT_WITH_EMOJI")] = 4;
                values[(valuesById[5] = "BANNER_NOTIFICATION_DISPLAY_MODE")] = 5;
                values[(valuesById[6] = "UNREAD_COUNTER_BADGE_DISPLAY_MODE")] = 6;
                values[(valuesById[7] = "IS_MESSAGES_NOTIFICATION_ENABLED")] = 7;
                values[(valuesById[8] = "IS_CALLS_NOTIFICATION_ENABLED")] = 8;
                values[(valuesById[9] = "IS_REACTIONS_NOTIFICATION_ENABLED")] = 9;
                values[(valuesById[10] = "IS_STATUS_REACTIONS_NOTIFICATION_ENABLED")] = 10;
                values[(valuesById[11] = "IS_TEXT_PREVIEW_FOR_NOTIFICATION_ENABLED")] = 11;
                values[(valuesById[12] = "DEFAULT_NOTIFICATION_TONE_ID")] = 12;
                values[(valuesById[13] = "GROUP_DEFAULT_NOTIFICATION_TONE_ID")] = 13;
                values[(valuesById[14] = "APP_THEME")] = 14;
                values[(valuesById[15] = "WALLPAPER_ID")] = 15;
                values[(valuesById[16] = "IS_DOODLE_WALLPAPER_ENABLED")] = 16;
                values[(valuesById[17] = "FONT_SIZE")] = 17;
                values[(valuesById[18] = "IS_PHOTOS_AUTODOWNLOAD_ENABLED")] = 18;
                values[(valuesById[19] = "IS_AUDIOS_AUTODOWNLOAD_ENABLED")] = 19;
                values[(valuesById[20] = "IS_VIDEOS_AUTODOWNLOAD_ENABLED")] = 20;
                values[(valuesById[21] = "IS_DOCUMENTS_AUTODOWNLOAD_ENABLED")] = 21;
                values[(valuesById[22] = "DISABLE_LINK_PREVIEWS")] = 22;
                values[(valuesById[23] = "NOTIFICATION_TONE_ID")] = 23;
                return values;
            })();
            SettingsSyncAction.SettingPlatform = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "PLATFORM_UNKNOWN")] = 0;
                values[(valuesById[1] = "WEB")] = 1;
                values[(valuesById[2] = "HYBRID")] = 2;
                values[(valuesById[3] = "WINDOWS")] = 3;
                values[(valuesById[4] = "MAC")] = 4;
                return values;
            })();
            return SettingsSyncAction;
        })();
        SyncActionValue.StarAction = (function () {
            function StarAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            StarAction.prototype.starred = null;
            var $oneOfFields;
            Object.defineProperty(StarAction.prototype, "_starred", {
                get: $util.oneOfGetter(($oneOfFields = ["starred"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            StarAction.create = function create(properties) {
                return new StarAction(properties);
            };
            StarAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.starred != null && Object.hasOwnProperty.call(message, "starred"))
                    writer.uint32(8).bool(message.starred);
                return writer;
            };
            StarAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            StarAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.StarAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.starred = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            StarAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            StarAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.starred != null && message.hasOwnProperty("starred")) {
                    properties._starred = 1;
                    if (typeof message.starred !== "boolean") return "starred: boolean expected";
                }
                return null;
            };
            StarAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.StarAction) return object;
                var message = new $root.SyncAction.SyncActionValue.StarAction();
                if (object.starred != null) message.starred = Boolean(object.starred);
                return message;
            };
            StarAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.starred != null && message.hasOwnProperty("starred")) {
                    object.starred = message.starred;
                    if (options.oneofs) object._starred = "starred";
                }
                return object;
            };
            StarAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            StarAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.StarAction";
            };
            return StarAction;
        })();
        SyncActionValue.StatusPostOptInNotificationPreferencesAction = (function () {
            function StatusPostOptInNotificationPreferencesAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            StatusPostOptInNotificationPreferencesAction.prototype.enabled = null;
            var $oneOfFields;
            Object.defineProperty(
                StatusPostOptInNotificationPreferencesAction.prototype,
                "_enabled",
                {
                    get: $util.oneOfGetter(($oneOfFields = ["enabled"])),
                    set: $util.oneOfSetter($oneOfFields),
                }
            );
            StatusPostOptInNotificationPreferencesAction.create = function create(properties) {
                return new StatusPostOptInNotificationPreferencesAction(properties);
            };
            StatusPostOptInNotificationPreferencesAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                    writer.uint32(8).bool(message.enabled);
                return writer;
            };
            StatusPostOptInNotificationPreferencesAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            StatusPostOptInNotificationPreferencesAction.decode = function decode(
                reader,
                length,
                error
            ) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message =
                        new $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.enabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            StatusPostOptInNotificationPreferencesAction.decodeDelimited = function decodeDelimited(
                reader
            ) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            StatusPostOptInNotificationPreferencesAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.enabled != null && message.hasOwnProperty("enabled")) {
                    properties._enabled = 1;
                    if (typeof message.enabled !== "boolean") return "enabled: boolean expected";
                }
                return null;
            };
            StatusPostOptInNotificationPreferencesAction.fromObject = function fromObject(object) {
                if (
                    object instanceof
                    $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction
                )
                    return object;
                var message =
                    new $root.SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction();
                if (object.enabled != null) message.enabled = Boolean(object.enabled);
                return message;
            };
            StatusPostOptInNotificationPreferencesAction.toObject = function toObject(
                message,
                options
            ) {
                if (!options) options = {};
                var object = {};
                if (message.enabled != null && message.hasOwnProperty("enabled")) {
                    object.enabled = message.enabled;
                    if (options.oneofs) object._enabled = "enabled";
                }
                return object;
            };
            StatusPostOptInNotificationPreferencesAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            StatusPostOptInNotificationPreferencesAction.getTypeUrl = function getTypeUrl(
                typeUrlPrefix
            ) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return (
                    typeUrlPrefix +
                    "/SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction"
                );
            };
            return StatusPostOptInNotificationPreferencesAction;
        })();
        SyncActionValue.StatusPrivacyAction = (function () {
            function StatusPrivacyAction(properties) {
                this.userJid = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            StatusPrivacyAction.prototype.mode = null;
            StatusPrivacyAction.prototype.userJid = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(StatusPrivacyAction.prototype, "_mode", {
                get: $util.oneOfGetter(($oneOfFields = ["mode"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            StatusPrivacyAction.create = function create(properties) {
                return new StatusPrivacyAction(properties);
            };
            StatusPrivacyAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                    writer.uint32(8).int32(message.mode);
                if (message.userJid != null && message.userJid.length)
                    for (var i = 0; i < message.userJid.length; ++i)
                        writer.uint32(18).string(message.userJid[i]);
                return writer;
            };
            StatusPrivacyAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            StatusPrivacyAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.StatusPrivacyAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.mode = reader.int32();
                            break;
                        }
                        case 2: {
                            if (!(message.userJid && message.userJid.length)) message.userJid = [];
                            message.userJid.push(reader.string());
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            StatusPrivacyAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            StatusPrivacyAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.mode != null && message.hasOwnProperty("mode")) {
                    properties._mode = 1;
                    switch (message.mode) {
                        default:
                            return "mode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                    }
                }
                if (message.userJid != null && message.hasOwnProperty("userJid")) {
                    if (!Array.isArray(message.userJid)) return "userJid: array expected";
                    for (var i = 0; i < message.userJid.length; ++i)
                        if (!$util.isString(message.userJid[i]))
                            return "userJid: string[] expected";
                }
                return null;
            };
            StatusPrivacyAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.StatusPrivacyAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.StatusPrivacyAction();
                switch (object.mode) {
                    default:
                        if (typeof object.mode === "number") {
                            message.mode = object.mode;
                            break;
                        }
                        break;
                    case "ALLOW_LIST":
                    case 0:
                        message.mode = 0;
                        break;
                    case "DENY_LIST":
                    case 1:
                        message.mode = 1;
                        break;
                    case "CONTACTS":
                    case 2:
                        message.mode = 2;
                        break;
                    case "CLOSE_FRIENDS":
                    case 3:
                        message.mode = 3;
                        break;
                }
                if (object.userJid) {
                    if (!Array.isArray(object.userJid))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.StatusPrivacyAction.userJid: array expected"
                        );
                    message.userJid = [];
                    for (var i = 0; i < object.userJid.length; ++i)
                        message.userJid[i] = String(object.userJid[i]);
                }
                return message;
            };
            StatusPrivacyAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.userJid = [];
                if (message.mode != null && message.hasOwnProperty("mode")) {
                    object.mode =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.StatusPrivacyAction
                                  .StatusDistributionMode[message.mode] === undefined
                                ? message.mode
                                : $root.SyncAction.SyncActionValue.StatusPrivacyAction
                                      .StatusDistributionMode[message.mode]
                            : message.mode;
                    if (options.oneofs) object._mode = "mode";
                }
                if (message.userJid && message.userJid.length) {
                    object.userJid = [];
                    for (var j = 0; j < message.userJid.length; ++j)
                        object.userJid[j] = message.userJid[j];
                }
                return object;
            };
            StatusPrivacyAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            StatusPrivacyAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.StatusPrivacyAction";
            };
            StatusPrivacyAction.StatusDistributionMode = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "ALLOW_LIST")] = 0;
                values[(valuesById[1] = "DENY_LIST")] = 1;
                values[(valuesById[2] = "CONTACTS")] = 2;
                values[(valuesById[3] = "CLOSE_FRIENDS")] = 3;
                return values;
            })();
            return StatusPrivacyAction;
        })();
        SyncActionValue.StickerAction = (function () {
            function StickerAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            StickerAction.prototype.url = null;
            StickerAction.prototype.fileEncSha256 = null;
            StickerAction.prototype.mediaKey = null;
            StickerAction.prototype.mimetype = null;
            StickerAction.prototype.height = null;
            StickerAction.prototype.width = null;
            StickerAction.prototype.directPath = null;
            StickerAction.prototype.fileLength = null;
            StickerAction.prototype.isFavorite = null;
            StickerAction.prototype.deviceIdHint = null;
            StickerAction.prototype.isLottie = null;
            StickerAction.prototype.imageHash = null;
            StickerAction.prototype.isAvatarSticker = null;
            var $oneOfFields;
            Object.defineProperty(StickerAction.prototype, "_url", {
                get: $util.oneOfGetter(($oneOfFields = ["url"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_fileEncSha256", {
                get: $util.oneOfGetter(($oneOfFields = ["fileEncSha256"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_mediaKey", {
                get: $util.oneOfGetter(($oneOfFields = ["mediaKey"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_mimetype", {
                get: $util.oneOfGetter(($oneOfFields = ["mimetype"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_height", {
                get: $util.oneOfGetter(($oneOfFields = ["height"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_width", {
                get: $util.oneOfGetter(($oneOfFields = ["width"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_directPath", {
                get: $util.oneOfGetter(($oneOfFields = ["directPath"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_fileLength", {
                get: $util.oneOfGetter(($oneOfFields = ["fileLength"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_isFavorite", {
                get: $util.oneOfGetter(($oneOfFields = ["isFavorite"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_deviceIdHint", {
                get: $util.oneOfGetter(($oneOfFields = ["deviceIdHint"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_isLottie", {
                get: $util.oneOfGetter(($oneOfFields = ["isLottie"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_imageHash", {
                get: $util.oneOfGetter(($oneOfFields = ["imageHash"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(StickerAction.prototype, "_isAvatarSticker", {
                get: $util.oneOfGetter(($oneOfFields = ["isAvatarSticker"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            StickerAction.create = function create(properties) {
                return new StickerAction(properties);
            };
            StickerAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(10).string(message.url);
                if (
                    message.fileEncSha256 != null &&
                    Object.hasOwnProperty.call(message, "fileEncSha256")
                )
                    writer.uint32(18).bytes(message.fileEncSha256);
                if (message.mediaKey != null && Object.hasOwnProperty.call(message, "mediaKey"))
                    writer.uint32(26).bytes(message.mediaKey);
                if (message.mimetype != null && Object.hasOwnProperty.call(message, "mimetype"))
                    writer.uint32(34).string(message.mimetype);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(40).uint32(message.height);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(48).uint32(message.width);
                if (message.directPath != null && Object.hasOwnProperty.call(message, "directPath"))
                    writer.uint32(58).string(message.directPath);
                if (message.fileLength != null && Object.hasOwnProperty.call(message, "fileLength"))
                    writer.uint32(64).uint64(message.fileLength);
                if (message.isFavorite != null && Object.hasOwnProperty.call(message, "isFavorite"))
                    writer.uint32(72).bool(message.isFavorite);
                if (
                    message.deviceIdHint != null &&
                    Object.hasOwnProperty.call(message, "deviceIdHint")
                )
                    writer.uint32(80).uint32(message.deviceIdHint);
                if (message.isLottie != null && Object.hasOwnProperty.call(message, "isLottie"))
                    writer.uint32(88).bool(message.isLottie);
                if (message.imageHash != null && Object.hasOwnProperty.call(message, "imageHash"))
                    writer.uint32(98).string(message.imageHash);
                if (
                    message.isAvatarSticker != null &&
                    Object.hasOwnProperty.call(message, "isAvatarSticker")
                )
                    writer.uint32(104).bool(message.isAvatarSticker);
                return writer;
            };
            StickerAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            StickerAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.StickerAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.url = reader.string();
                            break;
                        }
                        case 2: {
                            message.fileEncSha256 = reader.bytes();
                            break;
                        }
                        case 3: {
                            message.mediaKey = reader.bytes();
                            break;
                        }
                        case 4: {
                            message.mimetype = reader.string();
                            break;
                        }
                        case 5: {
                            message.height = reader.uint32();
                            break;
                        }
                        case 6: {
                            message.width = reader.uint32();
                            break;
                        }
                        case 7: {
                            message.directPath = reader.string();
                            break;
                        }
                        case 8: {
                            message.fileLength = reader.uint64();
                            break;
                        }
                        case 9: {
                            message.isFavorite = reader.bool();
                            break;
                        }
                        case 10: {
                            message.deviceIdHint = reader.uint32();
                            break;
                        }
                        case 11: {
                            message.isLottie = reader.bool();
                            break;
                        }
                        case 12: {
                            message.imageHash = reader.string();
                            break;
                        }
                        case 13: {
                            message.isAvatarSticker = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            StickerAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            StickerAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.url != null && message.hasOwnProperty("url")) {
                    properties._url = 1;
                    if (!$util.isString(message.url)) return "url: string expected";
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
                if (message.mimetype != null && message.hasOwnProperty("mimetype")) {
                    properties._mimetype = 1;
                    if (!$util.isString(message.mimetype)) return "mimetype: string expected";
                }
                if (message.height != null && message.hasOwnProperty("height")) {
                    properties._height = 1;
                    if (!$util.isInteger(message.height)) return "height: integer expected";
                }
                if (message.width != null && message.hasOwnProperty("width")) {
                    properties._width = 1;
                    if (!$util.isInteger(message.width)) return "width: integer expected";
                }
                if (message.directPath != null && message.hasOwnProperty("directPath")) {
                    properties._directPath = 1;
                    if (!$util.isString(message.directPath)) return "directPath: string expected";
                }
                if (message.fileLength != null && message.hasOwnProperty("fileLength")) {
                    properties._fileLength = 1;
                    if (
                        !$util.isInteger(message.fileLength) &&
                        !(
                            message.fileLength &&
                            $util.isInteger(message.fileLength.low) &&
                            $util.isInteger(message.fileLength.high)
                        )
                    )
                        return "fileLength: integer|Long expected";
                }
                if (message.isFavorite != null && message.hasOwnProperty("isFavorite")) {
                    properties._isFavorite = 1;
                    if (typeof message.isFavorite !== "boolean")
                        return "isFavorite: boolean expected";
                }
                if (message.deviceIdHint != null && message.hasOwnProperty("deviceIdHint")) {
                    properties._deviceIdHint = 1;
                    if (!$util.isInteger(message.deviceIdHint))
                        return "deviceIdHint: integer expected";
                }
                if (message.isLottie != null && message.hasOwnProperty("isLottie")) {
                    properties._isLottie = 1;
                    if (typeof message.isLottie !== "boolean") return "isLottie: boolean expected";
                }
                if (message.imageHash != null && message.hasOwnProperty("imageHash")) {
                    properties._imageHash = 1;
                    if (!$util.isString(message.imageHash)) return "imageHash: string expected";
                }
                if (message.isAvatarSticker != null && message.hasOwnProperty("isAvatarSticker")) {
                    properties._isAvatarSticker = 1;
                    if (typeof message.isAvatarSticker !== "boolean")
                        return "isAvatarSticker: boolean expected";
                }
                return null;
            };
            StickerAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.StickerAction) return object;
                var message = new $root.SyncAction.SyncActionValue.StickerAction();
                if (object.url != null) message.url = String(object.url);
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
                if (object.mediaKey != null)
                    if (typeof object.mediaKey === "string")
                        $util.base64.decode(
                            object.mediaKey,
                            (message.mediaKey = $util.newBuffer(
                                $util.base64.length(object.mediaKey)
                            )),
                            0
                        );
                    else if (object.mediaKey.length >= 0) message.mediaKey = object.mediaKey;
                if (object.mimetype != null) message.mimetype = String(object.mimetype);
                if (object.height != null) message.height = object.height >>> 0;
                if (object.width != null) message.width = object.width >>> 0;
                if (object.directPath != null) message.directPath = String(object.directPath);
                if (object.fileLength != null)
                    if ($util.Long)
                        (message.fileLength = $util.Long.fromValue(object.fileLength)).unsigned =
                            true;
                    else if (typeof object.fileLength === "string")
                        message.fileLength = parseInt(object.fileLength, 10);
                    else if (typeof object.fileLength === "number")
                        message.fileLength = object.fileLength;
                    else if (typeof object.fileLength === "object")
                        message.fileLength = new $util.LongBits(
                            object.fileLength.low >>> 0,
                            object.fileLength.high >>> 0
                        ).toNumber(true);
                if (object.isFavorite != null) message.isFavorite = Boolean(object.isFavorite);
                if (object.deviceIdHint != null) message.deviceIdHint = object.deviceIdHint >>> 0;
                if (object.isLottie != null) message.isLottie = Boolean(object.isLottie);
                if (object.imageHash != null) message.imageHash = String(object.imageHash);
                if (object.isAvatarSticker != null)
                    message.isAvatarSticker = Boolean(object.isAvatarSticker);
                return message;
            };
            StickerAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.url != null && message.hasOwnProperty("url")) {
                    object.url = message.url;
                    if (options.oneofs) object._url = "url";
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
                if (message.mediaKey != null && message.hasOwnProperty("mediaKey")) {
                    object.mediaKey =
                        options.bytes === String
                            ? $util.base64.encode(message.mediaKey, 0, message.mediaKey.length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.mediaKey)
                              : message.mediaKey;
                    if (options.oneofs) object._mediaKey = "mediaKey";
                }
                if (message.mimetype != null && message.hasOwnProperty("mimetype")) {
                    object.mimetype = message.mimetype;
                    if (options.oneofs) object._mimetype = "mimetype";
                }
                if (message.height != null && message.hasOwnProperty("height")) {
                    object.height = message.height;
                    if (options.oneofs) object._height = "height";
                }
                if (message.width != null && message.hasOwnProperty("width")) {
                    object.width = message.width;
                    if (options.oneofs) object._width = "width";
                }
                if (message.directPath != null && message.hasOwnProperty("directPath")) {
                    object.directPath = message.directPath;
                    if (options.oneofs) object._directPath = "directPath";
                }
                if (message.fileLength != null && message.hasOwnProperty("fileLength")) {
                    if (typeof message.fileLength === "number")
                        object.fileLength =
                            options.longs === String
                                ? String(message.fileLength)
                                : message.fileLength;
                    else
                        object.fileLength =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.fileLength)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.fileLength.low >>> 0,
                                        message.fileLength.high >>> 0
                                    ).toNumber(true)
                                  : message.fileLength;
                    if (options.oneofs) object._fileLength = "fileLength";
                }
                if (message.isFavorite != null && message.hasOwnProperty("isFavorite")) {
                    object.isFavorite = message.isFavorite;
                    if (options.oneofs) object._isFavorite = "isFavorite";
                }
                if (message.deviceIdHint != null && message.hasOwnProperty("deviceIdHint")) {
                    object.deviceIdHint = message.deviceIdHint;
                    if (options.oneofs) object._deviceIdHint = "deviceIdHint";
                }
                if (message.isLottie != null && message.hasOwnProperty("isLottie")) {
                    object.isLottie = message.isLottie;
                    if (options.oneofs) object._isLottie = "isLottie";
                }
                if (message.imageHash != null && message.hasOwnProperty("imageHash")) {
                    object.imageHash = message.imageHash;
                    if (options.oneofs) object._imageHash = "imageHash";
                }
                if (message.isAvatarSticker != null && message.hasOwnProperty("isAvatarSticker")) {
                    object.isAvatarSticker = message.isAvatarSticker;
                    if (options.oneofs) object._isAvatarSticker = "isAvatarSticker";
                }
                return object;
            };
            StickerAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            StickerAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.StickerAction";
            };
            return StickerAction;
        })();
        SyncActionValue.SubscriptionAction = (function () {
            function SubscriptionAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SubscriptionAction.prototype.isDeactivated = null;
            SubscriptionAction.prototype.isAutoRenewing = null;
            SubscriptionAction.prototype.expirationDate = null;
            var $oneOfFields;
            Object.defineProperty(SubscriptionAction.prototype, "_isDeactivated", {
                get: $util.oneOfGetter(($oneOfFields = ["isDeactivated"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SubscriptionAction.prototype, "_isAutoRenewing", {
                get: $util.oneOfGetter(($oneOfFields = ["isAutoRenewing"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SubscriptionAction.prototype, "_expirationDate", {
                get: $util.oneOfGetter(($oneOfFields = ["expirationDate"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SubscriptionAction.create = function create(properties) {
                return new SubscriptionAction(properties);
            };
            SubscriptionAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.isDeactivated != null &&
                    Object.hasOwnProperty.call(message, "isDeactivated")
                )
                    writer.uint32(8).bool(message.isDeactivated);
                if (
                    message.isAutoRenewing != null &&
                    Object.hasOwnProperty.call(message, "isAutoRenewing")
                )
                    writer.uint32(16).bool(message.isAutoRenewing);
                if (
                    message.expirationDate != null &&
                    Object.hasOwnProperty.call(message, "expirationDate")
                )
                    writer.uint32(24).int64(message.expirationDate);
                return writer;
            };
            SubscriptionAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SubscriptionAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.SubscriptionAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isDeactivated = reader.bool();
                            break;
                        }
                        case 2: {
                            message.isAutoRenewing = reader.bool();
                            break;
                        }
                        case 3: {
                            message.expirationDate = reader.int64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SubscriptionAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SubscriptionAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.isDeactivated != null && message.hasOwnProperty("isDeactivated")) {
                    properties._isDeactivated = 1;
                    if (typeof message.isDeactivated !== "boolean")
                        return "isDeactivated: boolean expected";
                }
                if (message.isAutoRenewing != null && message.hasOwnProperty("isAutoRenewing")) {
                    properties._isAutoRenewing = 1;
                    if (typeof message.isAutoRenewing !== "boolean")
                        return "isAutoRenewing: boolean expected";
                }
                if (message.expirationDate != null && message.hasOwnProperty("expirationDate")) {
                    properties._expirationDate = 1;
                    if (
                        !$util.isInteger(message.expirationDate) &&
                        !(
                            message.expirationDate &&
                            $util.isInteger(message.expirationDate.low) &&
                            $util.isInteger(message.expirationDate.high)
                        )
                    )
                        return "expirationDate: integer|Long expected";
                }
                return null;
            };
            SubscriptionAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.SubscriptionAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.SubscriptionAction();
                if (object.isDeactivated != null)
                    message.isDeactivated = Boolean(object.isDeactivated);
                if (object.isAutoRenewing != null)
                    message.isAutoRenewing = Boolean(object.isAutoRenewing);
                if (object.expirationDate != null)
                    if ($util.Long)
                        (message.expirationDate = $util.Long.fromValue(
                            object.expirationDate
                        )).unsigned = false;
                    else if (typeof object.expirationDate === "string")
                        message.expirationDate = parseInt(object.expirationDate, 10);
                    else if (typeof object.expirationDate === "number")
                        message.expirationDate = object.expirationDate;
                    else if (typeof object.expirationDate === "object")
                        message.expirationDate = new $util.LongBits(
                            object.expirationDate.low >>> 0,
                            object.expirationDate.high >>> 0
                        ).toNumber();
                return message;
            };
            SubscriptionAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.isDeactivated != null && message.hasOwnProperty("isDeactivated")) {
                    object.isDeactivated = message.isDeactivated;
                    if (options.oneofs) object._isDeactivated = "isDeactivated";
                }
                if (message.isAutoRenewing != null && message.hasOwnProperty("isAutoRenewing")) {
                    object.isAutoRenewing = message.isAutoRenewing;
                    if (options.oneofs) object._isAutoRenewing = "isAutoRenewing";
                }
                if (message.expirationDate != null && message.hasOwnProperty("expirationDate")) {
                    if (typeof message.expirationDate === "number")
                        object.expirationDate =
                            options.longs === String
                                ? String(message.expirationDate)
                                : message.expirationDate;
                    else
                        object.expirationDate =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.expirationDate)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.expirationDate.low >>> 0,
                                        message.expirationDate.high >>> 0
                                    ).toNumber()
                                  : message.expirationDate;
                    if (options.oneofs) object._expirationDate = "expirationDate";
                }
                return object;
            };
            SubscriptionAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SubscriptionAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.SubscriptionAction";
            };
            return SubscriptionAction;
        })();
        SyncActionValue.SyncActionMessage = (function () {
            function SyncActionMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SyncActionMessage.prototype.key = null;
            SyncActionMessage.prototype.timestamp = null;
            var $oneOfFields;
            Object.defineProperty(SyncActionMessage.prototype, "_key", {
                get: $util.oneOfGetter(($oneOfFields = ["key"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SyncActionMessage.prototype, "_timestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SyncActionMessage.create = function create(properties) {
                return new SyncActionMessage(properties);
            };
            SyncActionMessage.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    $root.Protocol.MessageKey.encode(
                        message.key,
                        writer.uint32(10).fork()
                    ).ldelim();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(16).int64(message.timestamp);
                return writer;
            };
            SyncActionMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SyncActionMessage.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.SyncActionMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.key = $root.Protocol.MessageKey.decode(reader, reader.uint32());
                            break;
                        }
                        case 2: {
                            message.timestamp = reader.int64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            SyncActionMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SyncActionMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    properties._key = 1;
                    {
                        var error = $root.Protocol.MessageKey.verify(message.key);
                        if (error) return "key." + error;
                    }
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
            SyncActionMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.SyncActionMessage)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.SyncActionMessage();
                if (object.key != null) {
                    if (typeof object.key !== "object")
                        throw TypeError(
                            ".SyncAction.SyncActionValue.SyncActionMessage.key: object expected"
                        );
                    message.key = $root.Protocol.MessageKey.fromObject(object.key);
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned =
                            false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(
                            object.timestamp.low >>> 0,
                            object.timestamp.high >>> 0
                        ).toNumber();
                return message;
            };
            SyncActionMessage.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.key != null && message.hasOwnProperty("key")) {
                    object.key = $root.Protocol.MessageKey.toObject(message.key, options);
                    if (options.oneofs) object._key = "key";
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                    if (typeof message.timestamp === "number")
                        object.timestamp =
                            options.longs === String
                                ? String(message.timestamp)
                                : message.timestamp;
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
            SyncActionMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SyncActionMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.SyncActionMessage";
            };
            return SyncActionMessage;
        })();
        SyncActionValue.SyncActionMessageRange = (function () {
            function SyncActionMessageRange(properties) {
                this.messages = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            SyncActionMessageRange.prototype.lastMessageTimestamp = null;
            SyncActionMessageRange.prototype.lastSystemMessageTimestamp = null;
            SyncActionMessageRange.prototype.messages = $util.emptyArray;
            var $oneOfFields;
            Object.defineProperty(SyncActionMessageRange.prototype, "_lastMessageTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["lastMessageTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(SyncActionMessageRange.prototype, "_lastSystemMessageTimestamp", {
                get: $util.oneOfGetter(($oneOfFields = ["lastSystemMessageTimestamp"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            SyncActionMessageRange.create = function create(properties) {
                return new SyncActionMessageRange(properties);
            };
            SyncActionMessageRange.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.lastMessageTimestamp != null &&
                    Object.hasOwnProperty.call(message, "lastMessageTimestamp")
                )
                    writer.uint32(8).int64(message.lastMessageTimestamp);
                if (
                    message.lastSystemMessageTimestamp != null &&
                    Object.hasOwnProperty.call(message, "lastSystemMessageTimestamp")
                )
                    writer.uint32(16).int64(message.lastSystemMessageTimestamp);
                if (message.messages != null && message.messages.length)
                    for (var i = 0; i < message.messages.length; ++i)
                        $root.SyncAction.SyncActionValue.SyncActionMessage.encode(
                            message.messages[i],
                            writer.uint32(26).fork()
                        ).ldelim();
                return writer;
            };
            SyncActionMessageRange.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            SyncActionMessageRange.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.SyncActionMessageRange();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.lastMessageTimestamp = reader.int64();
                            break;
                        }
                        case 2: {
                            message.lastSystemMessageTimestamp = reader.int64();
                            break;
                        }
                        case 3: {
                            if (!(message.messages && message.messages.length))
                                message.messages = [];
                            message.messages.push(
                                $root.SyncAction.SyncActionValue.SyncActionMessage.decode(
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
            SyncActionMessageRange.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            SyncActionMessageRange.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.lastMessageTimestamp != null &&
                    message.hasOwnProperty("lastMessageTimestamp")
                ) {
                    properties._lastMessageTimestamp = 1;
                    if (
                        !$util.isInteger(message.lastMessageTimestamp) &&
                        !(
                            message.lastMessageTimestamp &&
                            $util.isInteger(message.lastMessageTimestamp.low) &&
                            $util.isInteger(message.lastMessageTimestamp.high)
                        )
                    )
                        return "lastMessageTimestamp: integer|Long expected";
                }
                if (
                    message.lastSystemMessageTimestamp != null &&
                    message.hasOwnProperty("lastSystemMessageTimestamp")
                ) {
                    properties._lastSystemMessageTimestamp = 1;
                    if (
                        !$util.isInteger(message.lastSystemMessageTimestamp) &&
                        !(
                            message.lastSystemMessageTimestamp &&
                            $util.isInteger(message.lastSystemMessageTimestamp.low) &&
                            $util.isInteger(message.lastSystemMessageTimestamp.high)
                        )
                    )
                        return "lastSystemMessageTimestamp: integer|Long expected";
                }
                if (message.messages != null && message.hasOwnProperty("messages")) {
                    if (!Array.isArray(message.messages)) return "messages: array expected";
                    for (var i = 0; i < message.messages.length; ++i) {
                        var error = $root.SyncAction.SyncActionValue.SyncActionMessage.verify(
                            message.messages[i]
                        );
                        if (error) return "messages." + error;
                    }
                }
                return null;
            };
            SyncActionMessageRange.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.SyncActionMessageRange)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.SyncActionMessageRange();
                if (object.lastMessageTimestamp != null)
                    if ($util.Long)
                        (message.lastMessageTimestamp = $util.Long.fromValue(
                            object.lastMessageTimestamp
                        )).unsigned = false;
                    else if (typeof object.lastMessageTimestamp === "string")
                        message.lastMessageTimestamp = parseInt(object.lastMessageTimestamp, 10);
                    else if (typeof object.lastMessageTimestamp === "number")
                        message.lastMessageTimestamp = object.lastMessageTimestamp;
                    else if (typeof object.lastMessageTimestamp === "object")
                        message.lastMessageTimestamp = new $util.LongBits(
                            object.lastMessageTimestamp.low >>> 0,
                            object.lastMessageTimestamp.high >>> 0
                        ).toNumber();
                if (object.lastSystemMessageTimestamp != null)
                    if ($util.Long)
                        (message.lastSystemMessageTimestamp = $util.Long.fromValue(
                            object.lastSystemMessageTimestamp
                        )).unsigned = false;
                    else if (typeof object.lastSystemMessageTimestamp === "string")
                        message.lastSystemMessageTimestamp = parseInt(
                            object.lastSystemMessageTimestamp,
                            10
                        );
                    else if (typeof object.lastSystemMessageTimestamp === "number")
                        message.lastSystemMessageTimestamp = object.lastSystemMessageTimestamp;
                    else if (typeof object.lastSystemMessageTimestamp === "object")
                        message.lastSystemMessageTimestamp = new $util.LongBits(
                            object.lastSystemMessageTimestamp.low >>> 0,
                            object.lastSystemMessageTimestamp.high >>> 0
                        ).toNumber();
                if (object.messages) {
                    if (!Array.isArray(object.messages))
                        throw TypeError(
                            ".SyncAction.SyncActionValue.SyncActionMessageRange.messages: array expected"
                        );
                    message.messages = [];
                    for (var i = 0; i < object.messages.length; ++i) {
                        if (typeof object.messages[i] !== "object")
                            throw TypeError(
                                ".SyncAction.SyncActionValue.SyncActionMessageRange.messages: object expected"
                            );
                        message.messages[i] =
                            $root.SyncAction.SyncActionValue.SyncActionMessage.fromObject(
                                object.messages[i]
                            );
                    }
                }
                return message;
            };
            SyncActionMessageRange.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.messages = [];
                if (
                    message.lastMessageTimestamp != null &&
                    message.hasOwnProperty("lastMessageTimestamp")
                ) {
                    if (typeof message.lastMessageTimestamp === "number")
                        object.lastMessageTimestamp =
                            options.longs === String
                                ? String(message.lastMessageTimestamp)
                                : message.lastMessageTimestamp;
                    else
                        object.lastMessageTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.lastMessageTimestamp)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.lastMessageTimestamp.low >>> 0,
                                        message.lastMessageTimestamp.high >>> 0
                                    ).toNumber()
                                  : message.lastMessageTimestamp;
                    if (options.oneofs) object._lastMessageTimestamp = "lastMessageTimestamp";
                }
                if (
                    message.lastSystemMessageTimestamp != null &&
                    message.hasOwnProperty("lastSystemMessageTimestamp")
                ) {
                    if (typeof message.lastSystemMessageTimestamp === "number")
                        object.lastSystemMessageTimestamp =
                            options.longs === String
                                ? String(message.lastSystemMessageTimestamp)
                                : message.lastSystemMessageTimestamp;
                    else
                        object.lastSystemMessageTimestamp =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(
                                      message.lastSystemMessageTimestamp
                                  )
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.lastSystemMessageTimestamp.low >>> 0,
                                        message.lastSystemMessageTimestamp.high >>> 0
                                    ).toNumber()
                                  : message.lastSystemMessageTimestamp;
                    if (options.oneofs)
                        object._lastSystemMessageTimestamp = "lastSystemMessageTimestamp";
                }
                if (message.messages && message.messages.length) {
                    object.messages = [];
                    for (var j = 0; j < message.messages.length; ++j)
                        object.messages[j] =
                            $root.SyncAction.SyncActionValue.SyncActionMessage.toObject(
                                message.messages[j],
                                options
                            );
                }
                return object;
            };
            SyncActionMessageRange.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            SyncActionMessageRange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.SyncActionMessageRange";
            };
            return SyncActionMessageRange;
        })();
        SyncActionValue.TimeFormatAction = (function () {
            function TimeFormatAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            TimeFormatAction.prototype.isTwentyFourHourFormatEnabled = null;
            var $oneOfFields;
            Object.defineProperty(TimeFormatAction.prototype, "_isTwentyFourHourFormatEnabled", {
                get: $util.oneOfGetter(($oneOfFields = ["isTwentyFourHourFormatEnabled"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            TimeFormatAction.create = function create(properties) {
                return new TimeFormatAction(properties);
            };
            TimeFormatAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.isTwentyFourHourFormatEnabled != null &&
                    Object.hasOwnProperty.call(message, "isTwentyFourHourFormatEnabled")
                )
                    writer.uint32(8).bool(message.isTwentyFourHourFormatEnabled);
                return writer;
            };
            TimeFormatAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            TimeFormatAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.TimeFormatAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.isTwentyFourHourFormatEnabled = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            TimeFormatAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            TimeFormatAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (
                    message.isTwentyFourHourFormatEnabled != null &&
                    message.hasOwnProperty("isTwentyFourHourFormatEnabled")
                ) {
                    properties._isTwentyFourHourFormatEnabled = 1;
                    if (typeof message.isTwentyFourHourFormatEnabled !== "boolean")
                        return "isTwentyFourHourFormatEnabled: boolean expected";
                }
                return null;
            };
            TimeFormatAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.TimeFormatAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.TimeFormatAction();
                if (object.isTwentyFourHourFormatEnabled != null)
                    message.isTwentyFourHourFormatEnabled = Boolean(
                        object.isTwentyFourHourFormatEnabled
                    );
                return message;
            };
            TimeFormatAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (
                    message.isTwentyFourHourFormatEnabled != null &&
                    message.hasOwnProperty("isTwentyFourHourFormatEnabled")
                ) {
                    object.isTwentyFourHourFormatEnabled = message.isTwentyFourHourFormatEnabled;
                    if (options.oneofs)
                        object._isTwentyFourHourFormatEnabled = "isTwentyFourHourFormatEnabled";
                }
                return object;
            };
            TimeFormatAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            TimeFormatAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.TimeFormatAction";
            };
            return TimeFormatAction;
        })();
        SyncActionValue.UGCBot = (function () {
            function UGCBot(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            UGCBot.prototype.definition = null;
            var $oneOfFields;
            Object.defineProperty(UGCBot.prototype, "_definition", {
                get: $util.oneOfGetter(($oneOfFields = ["definition"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            UGCBot.create = function create(properties) {
                return new UGCBot(properties);
            };
            UGCBot.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.definition != null && Object.hasOwnProperty.call(message, "definition"))
                    writer.uint32(10).bytes(message.definition);
                return writer;
            };
            UGCBot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            UGCBot.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.UGCBot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.definition = reader.bytes();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            UGCBot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            UGCBot.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.definition != null && message.hasOwnProperty("definition")) {
                    properties._definition = 1;
                    if (
                        !(
                            (message.definition && typeof message.definition.length === "number") ||
                            $util.isString(message.definition)
                        )
                    )
                        return "definition: buffer expected";
                }
                return null;
            };
            UGCBot.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.UGCBot) return object;
                var message = new $root.SyncAction.SyncActionValue.UGCBot();
                if (object.definition != null)
                    if (typeof object.definition === "string")
                        $util.base64.decode(
                            object.definition,
                            (message.definition = $util.newBuffer(
                                $util.base64.length(object.definition)
                            )),
                            0
                        );
                    else if (object.definition.length >= 0) message.definition = object.definition;
                return message;
            };
            UGCBot.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.definition != null && message.hasOwnProperty("definition")) {
                    object.definition =
                        options.bytes === String
                            ? $util.base64.encode(message.definition, 0, message.definition.length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.definition)
                              : message.definition;
                    if (options.oneofs) object._definition = "definition";
                }
                return object;
            };
            UGCBot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            UGCBot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.UGCBot";
            };
            return UGCBot;
        })();
        SyncActionValue.UnarchiveChatsSetting = (function () {
            function UnarchiveChatsSetting(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            UnarchiveChatsSetting.prototype.unarchiveChats = null;
            var $oneOfFields;
            Object.defineProperty(UnarchiveChatsSetting.prototype, "_unarchiveChats", {
                get: $util.oneOfGetter(($oneOfFields = ["unarchiveChats"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            UnarchiveChatsSetting.create = function create(properties) {
                return new UnarchiveChatsSetting(properties);
            };
            UnarchiveChatsSetting.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.unarchiveChats != null &&
                    Object.hasOwnProperty.call(message, "unarchiveChats")
                )
                    writer.uint32(8).bool(message.unarchiveChats);
                return writer;
            };
            UnarchiveChatsSetting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            UnarchiveChatsSetting.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.UnarchiveChatsSetting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.unarchiveChats = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            UnarchiveChatsSetting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            UnarchiveChatsSetting.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.unarchiveChats != null && message.hasOwnProperty("unarchiveChats")) {
                    properties._unarchiveChats = 1;
                    if (typeof message.unarchiveChats !== "boolean")
                        return "unarchiveChats: boolean expected";
                }
                return null;
            };
            UnarchiveChatsSetting.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.UnarchiveChatsSetting)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.UnarchiveChatsSetting();
                if (object.unarchiveChats != null)
                    message.unarchiveChats = Boolean(object.unarchiveChats);
                return message;
            };
            UnarchiveChatsSetting.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.unarchiveChats != null && message.hasOwnProperty("unarchiveChats")) {
                    object.unarchiveChats = message.unarchiveChats;
                    if (options.oneofs) object._unarchiveChats = "unarchiveChats";
                }
                return object;
            };
            UnarchiveChatsSetting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            UnarchiveChatsSetting.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.UnarchiveChatsSetting";
            };
            return UnarchiveChatsSetting;
        })();
        SyncActionValue.UserStatusMuteAction = (function () {
            function UserStatusMuteAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            UserStatusMuteAction.prototype.muted = null;
            var $oneOfFields;
            Object.defineProperty(UserStatusMuteAction.prototype, "_muted", {
                get: $util.oneOfGetter(($oneOfFields = ["muted"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            UserStatusMuteAction.create = function create(properties) {
                return new UserStatusMuteAction(properties);
            };
            UserStatusMuteAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.muted != null && Object.hasOwnProperty.call(message, "muted"))
                    writer.uint32(8).bool(message.muted);
                return writer;
            };
            UserStatusMuteAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            UserStatusMuteAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.UserStatusMuteAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.muted = reader.bool();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            UserStatusMuteAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            UserStatusMuteAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.muted != null && message.hasOwnProperty("muted")) {
                    properties._muted = 1;
                    if (typeof message.muted !== "boolean") return "muted: boolean expected";
                }
                return null;
            };
            UserStatusMuteAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.UserStatusMuteAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.UserStatusMuteAction();
                if (object.muted != null) message.muted = Boolean(object.muted);
                return message;
            };
            UserStatusMuteAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.muted != null && message.hasOwnProperty("muted")) {
                    object.muted = message.muted;
                    if (options.oneofs) object._muted = "muted";
                }
                return object;
            };
            UserStatusMuteAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            UserStatusMuteAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.UserStatusMuteAction";
            };
            return UserStatusMuteAction;
        })();
        SyncActionValue.UsernameChatStartModeAction = (function () {
            function UsernameChatStartModeAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            UsernameChatStartModeAction.prototype.chatStartMode = null;
            var $oneOfFields;
            Object.defineProperty(UsernameChatStartModeAction.prototype, "_chatStartMode", {
                get: $util.oneOfGetter(($oneOfFields = ["chatStartMode"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            UsernameChatStartModeAction.create = function create(properties) {
                return new UsernameChatStartModeAction(properties);
            };
            UsernameChatStartModeAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.chatStartMode != null &&
                    Object.hasOwnProperty.call(message, "chatStartMode")
                )
                    writer.uint32(8).int32(message.chatStartMode);
                return writer;
            };
            UsernameChatStartModeAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            UsernameChatStartModeAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.UsernameChatStartModeAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.chatStartMode = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            UsernameChatStartModeAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            UsernameChatStartModeAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.chatStartMode != null && message.hasOwnProperty("chatStartMode")) {
                    properties._chatStartMode = 1;
                    switch (message.chatStartMode) {
                        default:
                            return "chatStartMode: enum value expected";
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            UsernameChatStartModeAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.UsernameChatStartModeAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.UsernameChatStartModeAction();
                switch (object.chatStartMode) {
                    default:
                        if (typeof object.chatStartMode === "number") {
                            message.chatStartMode = object.chatStartMode;
                            break;
                        }
                        break;
                    case "LID":
                    case 1:
                        message.chatStartMode = 1;
                        break;
                    case "PN":
                    case 2:
                        message.chatStartMode = 2;
                        break;
                }
                return message;
            };
            UsernameChatStartModeAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.chatStartMode != null && message.hasOwnProperty("chatStartMode")) {
                    object.chatStartMode =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.UsernameChatStartModeAction
                                  .ChatStartMode[message.chatStartMode] === undefined
                                ? message.chatStartMode
                                : $root.SyncAction.SyncActionValue.UsernameChatStartModeAction
                                      .ChatStartMode[message.chatStartMode]
                            : message.chatStartMode;
                    if (options.oneofs) object._chatStartMode = "chatStartMode";
                }
                return object;
            };
            UsernameChatStartModeAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            UsernameChatStartModeAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.UsernameChatStartModeAction";
            };
            UsernameChatStartModeAction.ChatStartMode = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[1] = "LID")] = 1;
                values[(valuesById[2] = "PN")] = 2;
                return values;
            })();
            return UsernameChatStartModeAction;
        })();
        SyncActionValue.WaffleAccountLinkStateAction = (function () {
            function WaffleAccountLinkStateAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            WaffleAccountLinkStateAction.prototype.linkState = null;
            var $oneOfFields;
            Object.defineProperty(WaffleAccountLinkStateAction.prototype, "_linkState", {
                get: $util.oneOfGetter(($oneOfFields = ["linkState"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            WaffleAccountLinkStateAction.create = function create(properties) {
                return new WaffleAccountLinkStateAction(properties);
            };
            WaffleAccountLinkStateAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.linkState != null && Object.hasOwnProperty.call(message, "linkState"))
                    writer.uint32(16).int32(message.linkState);
                return writer;
            };
            WaffleAccountLinkStateAction.encodeDelimited = function encodeDelimited(
                message,
                writer
            ) {
                return this.encode(message, writer).ldelim();
            };
            WaffleAccountLinkStateAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 2: {
                            message.linkState = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            WaffleAccountLinkStateAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            WaffleAccountLinkStateAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.linkState != null && message.hasOwnProperty("linkState")) {
                    properties._linkState = 1;
                    switch (message.linkState) {
                        default:
                            return "linkState: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                    }
                }
                return null;
            };
            WaffleAccountLinkStateAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction();
                switch (object.linkState) {
                    default:
                        if (typeof object.linkState === "number") {
                            message.linkState = object.linkState;
                            break;
                        }
                        break;
                    case "ACTIVE":
                    case 0:
                        message.linkState = 0;
                        break;
                    case "PAUSED":
                    case 1:
                        message.linkState = 1;
                        break;
                    case "UNLINKED":
                    case 2:
                        message.linkState = 2;
                        break;
                }
                return message;
            };
            WaffleAccountLinkStateAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.linkState != null && message.hasOwnProperty("linkState")) {
                    object.linkState =
                        options.enums === String
                            ? $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction
                                  .AccountLinkState[message.linkState] === undefined
                                ? message.linkState
                                : $root.SyncAction.SyncActionValue.WaffleAccountLinkStateAction
                                      .AccountLinkState[message.linkState]
                            : message.linkState;
                    if (options.oneofs) object._linkState = "linkState";
                }
                return object;
            };
            WaffleAccountLinkStateAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            WaffleAccountLinkStateAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.WaffleAccountLinkStateAction";
            };
            WaffleAccountLinkStateAction.AccountLinkState = (function () {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[(valuesById[0] = "ACTIVE")] = 0;
                values[(valuesById[1] = "PAUSED")] = 1;
                values[(valuesById[2] = "UNLINKED")] = 2;
                return values;
            })();
            return WaffleAccountLinkStateAction;
        })();
        SyncActionValue.WamoUserIdentifierAction = (function () {
            function WamoUserIdentifierAction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            WamoUserIdentifierAction.prototype.identifier = null;
            var $oneOfFields;
            Object.defineProperty(WamoUserIdentifierAction.prototype, "_identifier", {
                get: $util.oneOfGetter(($oneOfFields = ["identifier"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            WamoUserIdentifierAction.create = function create(properties) {
                return new WamoUserIdentifierAction(properties);
            };
            WamoUserIdentifierAction.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.identifier != null && Object.hasOwnProperty.call(message, "identifier"))
                    writer.uint32(10).string(message.identifier);
                return writer;
            };
            WamoUserIdentifierAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            WamoUserIdentifierAction.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.SyncActionValue.WamoUserIdentifierAction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.identifier = reader.string();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            WamoUserIdentifierAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            WamoUserIdentifierAction.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.identifier != null && message.hasOwnProperty("identifier")) {
                    properties._identifier = 1;
                    if (!$util.isString(message.identifier)) return "identifier: string expected";
                }
                return null;
            };
            WamoUserIdentifierAction.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.SyncActionValue.WamoUserIdentifierAction)
                    return object;
                var message = new $root.SyncAction.SyncActionValue.WamoUserIdentifierAction();
                if (object.identifier != null) message.identifier = String(object.identifier);
                return message;
            };
            WamoUserIdentifierAction.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.identifier != null && message.hasOwnProperty("identifier")) {
                    object.identifier = message.identifier;
                    if (options.oneofs) object._identifier = "identifier";
                }
                return object;
            };
            WamoUserIdentifierAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            WamoUserIdentifierAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.SyncActionValue.WamoUserIdentifierAction";
            };
            return WamoUserIdentifierAction;
        })();
        return SyncActionValue;
    })();
    SyncAction.CallLogRecord = (function () {
        function CallLogRecord(properties) {
            this.participants = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        CallLogRecord.prototype.callResult = null;
        CallLogRecord.prototype.isDndMode = null;
        CallLogRecord.prototype.silenceReason = null;
        CallLogRecord.prototype.duration = null;
        CallLogRecord.prototype.startTime = null;
        CallLogRecord.prototype.isIncoming = null;
        CallLogRecord.prototype.isVideo = null;
        CallLogRecord.prototype.isCallLink = null;
        CallLogRecord.prototype.callLinkToken = null;
        CallLogRecord.prototype.scheduledCallId = null;
        CallLogRecord.prototype.callId = null;
        CallLogRecord.prototype.callCreatorJid = null;
        CallLogRecord.prototype.groupJid = null;
        CallLogRecord.prototype.participants = $util.emptyArray;
        CallLogRecord.prototype.callType = null;
        var $oneOfFields;
        Object.defineProperty(CallLogRecord.prototype, "_callResult", {
            get: $util.oneOfGetter(($oneOfFields = ["callResult"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_isDndMode", {
            get: $util.oneOfGetter(($oneOfFields = ["isDndMode"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_silenceReason", {
            get: $util.oneOfGetter(($oneOfFields = ["silenceReason"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_duration", {
            get: $util.oneOfGetter(($oneOfFields = ["duration"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_startTime", {
            get: $util.oneOfGetter(($oneOfFields = ["startTime"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_isIncoming", {
            get: $util.oneOfGetter(($oneOfFields = ["isIncoming"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_isVideo", {
            get: $util.oneOfGetter(($oneOfFields = ["isVideo"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_isCallLink", {
            get: $util.oneOfGetter(($oneOfFields = ["isCallLink"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_callLinkToken", {
            get: $util.oneOfGetter(($oneOfFields = ["callLinkToken"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_scheduledCallId", {
            get: $util.oneOfGetter(($oneOfFields = ["scheduledCallId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_callId", {
            get: $util.oneOfGetter(($oneOfFields = ["callId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_callCreatorJid", {
            get: $util.oneOfGetter(($oneOfFields = ["callCreatorJid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_groupJid", {
            get: $util.oneOfGetter(($oneOfFields = ["groupJid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CallLogRecord.prototype, "_callType", {
            get: $util.oneOfGetter(($oneOfFields = ["callType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        CallLogRecord.create = function create(properties) {
            return new CallLogRecord(properties);
        };
        CallLogRecord.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.callResult != null && Object.hasOwnProperty.call(message, "callResult"))
                writer.uint32(8).int32(message.callResult);
            if (message.isDndMode != null && Object.hasOwnProperty.call(message, "isDndMode"))
                writer.uint32(16).bool(message.isDndMode);
            if (
                message.silenceReason != null &&
                Object.hasOwnProperty.call(message, "silenceReason")
            )
                writer.uint32(24).int32(message.silenceReason);
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                writer.uint32(32).int64(message.duration);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(40).int64(message.startTime);
            if (message.isIncoming != null && Object.hasOwnProperty.call(message, "isIncoming"))
                writer.uint32(48).bool(message.isIncoming);
            if (message.isVideo != null && Object.hasOwnProperty.call(message, "isVideo"))
                writer.uint32(56).bool(message.isVideo);
            if (message.isCallLink != null && Object.hasOwnProperty.call(message, "isCallLink"))
                writer.uint32(64).bool(message.isCallLink);
            if (
                message.callLinkToken != null &&
                Object.hasOwnProperty.call(message, "callLinkToken")
            )
                writer.uint32(74).string(message.callLinkToken);
            if (
                message.scheduledCallId != null &&
                Object.hasOwnProperty.call(message, "scheduledCallId")
            )
                writer.uint32(82).string(message.scheduledCallId);
            if (message.callId != null && Object.hasOwnProperty.call(message, "callId"))
                writer.uint32(90).string(message.callId);
            if (
                message.callCreatorJid != null &&
                Object.hasOwnProperty.call(message, "callCreatorJid")
            )
                writer.uint32(98).string(message.callCreatorJid);
            if (message.groupJid != null && Object.hasOwnProperty.call(message, "groupJid"))
                writer.uint32(106).string(message.groupJid);
            if (message.participants != null && message.participants.length)
                for (var i = 0; i < message.participants.length; ++i)
                    $root.SyncAction.CallLogRecord.ParticipantInfo.encode(
                        message.participants[i],
                        writer.uint32(114).fork()
                    ).ldelim();
            if (message.callType != null && Object.hasOwnProperty.call(message, "callType"))
                writer.uint32(120).int32(message.callType);
            return writer;
        };
        CallLogRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        CallLogRecord.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SyncAction.CallLogRecord();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.callResult = reader.int32();
                        break;
                    }
                    case 2: {
                        message.isDndMode = reader.bool();
                        break;
                    }
                    case 3: {
                        message.silenceReason = reader.int32();
                        break;
                    }
                    case 4: {
                        message.duration = reader.int64();
                        break;
                    }
                    case 5: {
                        message.startTime = reader.int64();
                        break;
                    }
                    case 6: {
                        message.isIncoming = reader.bool();
                        break;
                    }
                    case 7: {
                        message.isVideo = reader.bool();
                        break;
                    }
                    case 8: {
                        message.isCallLink = reader.bool();
                        break;
                    }
                    case 9: {
                        message.callLinkToken = reader.string();
                        break;
                    }
                    case 10: {
                        message.scheduledCallId = reader.string();
                        break;
                    }
                    case 11: {
                        message.callId = reader.string();
                        break;
                    }
                    case 12: {
                        message.callCreatorJid = reader.string();
                        break;
                    }
                    case 13: {
                        message.groupJid = reader.string();
                        break;
                    }
                    case 14: {
                        if (!(message.participants && message.participants.length))
                            message.participants = [];
                        message.participants.push(
                            $root.SyncAction.CallLogRecord.ParticipantInfo.decode(
                                reader,
                                reader.uint32()
                            )
                        );
                        break;
                    }
                    case 15: {
                        message.callType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        CallLogRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        CallLogRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.callResult != null && message.hasOwnProperty("callResult")) {
                properties._callResult = 1;
                switch (message.callResult) {
                    default:
                        return "callResult: enum value expected";
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
            if (message.isDndMode != null && message.hasOwnProperty("isDndMode")) {
                properties._isDndMode = 1;
                if (typeof message.isDndMode !== "boolean") return "isDndMode: boolean expected";
            }
            if (message.silenceReason != null && message.hasOwnProperty("silenceReason")) {
                properties._silenceReason = 1;
                switch (message.silenceReason) {
                    default:
                        return "silenceReason: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            }
            if (message.duration != null && message.hasOwnProperty("duration")) {
                properties._duration = 1;
                if (
                    !$util.isInteger(message.duration) &&
                    !(
                        message.duration &&
                        $util.isInteger(message.duration.low) &&
                        $util.isInteger(message.duration.high)
                    )
                )
                    return "duration: integer|Long expected";
            }
            if (message.startTime != null && message.hasOwnProperty("startTime")) {
                properties._startTime = 1;
                if (
                    !$util.isInteger(message.startTime) &&
                    !(
                        message.startTime &&
                        $util.isInteger(message.startTime.low) &&
                        $util.isInteger(message.startTime.high)
                    )
                )
                    return "startTime: integer|Long expected";
            }
            if (message.isIncoming != null && message.hasOwnProperty("isIncoming")) {
                properties._isIncoming = 1;
                if (typeof message.isIncoming !== "boolean") return "isIncoming: boolean expected";
            }
            if (message.isVideo != null && message.hasOwnProperty("isVideo")) {
                properties._isVideo = 1;
                if (typeof message.isVideo !== "boolean") return "isVideo: boolean expected";
            }
            if (message.isCallLink != null && message.hasOwnProperty("isCallLink")) {
                properties._isCallLink = 1;
                if (typeof message.isCallLink !== "boolean") return "isCallLink: boolean expected";
            }
            if (message.callLinkToken != null && message.hasOwnProperty("callLinkToken")) {
                properties._callLinkToken = 1;
                if (!$util.isString(message.callLinkToken)) return "callLinkToken: string expected";
            }
            if (message.scheduledCallId != null && message.hasOwnProperty("scheduledCallId")) {
                properties._scheduledCallId = 1;
                if (!$util.isString(message.scheduledCallId))
                    return "scheduledCallId: string expected";
            }
            if (message.callId != null && message.hasOwnProperty("callId")) {
                properties._callId = 1;
                if (!$util.isString(message.callId)) return "callId: string expected";
            }
            if (message.callCreatorJid != null && message.hasOwnProperty("callCreatorJid")) {
                properties._callCreatorJid = 1;
                if (!$util.isString(message.callCreatorJid))
                    return "callCreatorJid: string expected";
            }
            if (message.groupJid != null && message.hasOwnProperty("groupJid")) {
                properties._groupJid = 1;
                if (!$util.isString(message.groupJid)) return "groupJid: string expected";
            }
            if (message.participants != null && message.hasOwnProperty("participants")) {
                if (!Array.isArray(message.participants)) return "participants: array expected";
                for (var i = 0; i < message.participants.length; ++i) {
                    var error = $root.SyncAction.CallLogRecord.ParticipantInfo.verify(
                        message.participants[i]
                    );
                    if (error) return "participants." + error;
                }
            }
            if (message.callType != null && message.hasOwnProperty("callType")) {
                properties._callType = 1;
                switch (message.callType) {
                    default:
                        return "callType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            return null;
        };
        CallLogRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncAction.CallLogRecord) return object;
            var message = new $root.SyncAction.CallLogRecord();
            switch (object.callResult) {
                default:
                    if (typeof object.callResult === "number") {
                        message.callResult = object.callResult;
                        break;
                    }
                    break;
                case "CONNECTED":
                case 0:
                    message.callResult = 0;
                    break;
                case "REJECTED":
                case 1:
                    message.callResult = 1;
                    break;
                case "CANCELLED":
                case 2:
                    message.callResult = 2;
                    break;
                case "ACCEPTEDELSEWHERE":
                case 3:
                    message.callResult = 3;
                    break;
                case "MISSED":
                case 4:
                    message.callResult = 4;
                    break;
                case "INVALID":
                case 5:
                    message.callResult = 5;
                    break;
                case "UNAVAILABLE":
                case 6:
                    message.callResult = 6;
                    break;
                case "UPCOMING":
                case 7:
                    message.callResult = 7;
                    break;
                case "FAILED":
                case 8:
                    message.callResult = 8;
                    break;
                case "ABANDONED":
                case 9:
                    message.callResult = 9;
                    break;
                case "ONGOING":
                case 10:
                    message.callResult = 10;
                    break;
            }
            if (object.isDndMode != null) message.isDndMode = Boolean(object.isDndMode);
            switch (object.silenceReason) {
                default:
                    if (typeof object.silenceReason === "number") {
                        message.silenceReason = object.silenceReason;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.silenceReason = 0;
                    break;
                case "SCHEDULED":
                case 1:
                    message.silenceReason = 1;
                    break;
                case "PRIVACY":
                case 2:
                    message.silenceReason = 2;
                    break;
                case "LIGHTWEIGHT":
                case 3:
                    message.silenceReason = 3;
                    break;
            }
            if (object.duration != null)
                if ($util.Long)
                    (message.duration = $util.Long.fromValue(object.duration)).unsigned = false;
                else if (typeof object.duration === "string")
                    message.duration = parseInt(object.duration, 10);
                else if (typeof object.duration === "number") message.duration = object.duration;
                else if (typeof object.duration === "object")
                    message.duration = new $util.LongBits(
                        object.duration.low >>> 0,
                        object.duration.high >>> 0
                    ).toNumber();
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number") message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(
                        object.startTime.low >>> 0,
                        object.startTime.high >>> 0
                    ).toNumber();
            if (object.isIncoming != null) message.isIncoming = Boolean(object.isIncoming);
            if (object.isVideo != null) message.isVideo = Boolean(object.isVideo);
            if (object.isCallLink != null) message.isCallLink = Boolean(object.isCallLink);
            if (object.callLinkToken != null) message.callLinkToken = String(object.callLinkToken);
            if (object.scheduledCallId != null)
                message.scheduledCallId = String(object.scheduledCallId);
            if (object.callId != null) message.callId = String(object.callId);
            if (object.callCreatorJid != null)
                message.callCreatorJid = String(object.callCreatorJid);
            if (object.groupJid != null) message.groupJid = String(object.groupJid);
            if (object.participants) {
                if (!Array.isArray(object.participants))
                    throw TypeError(".SyncAction.CallLogRecord.participants: array expected");
                message.participants = [];
                for (var i = 0; i < object.participants.length; ++i) {
                    if (typeof object.participants[i] !== "object")
                        throw TypeError(".SyncAction.CallLogRecord.participants: object expected");
                    message.participants[i] =
                        $root.SyncAction.CallLogRecord.ParticipantInfo.fromObject(
                            object.participants[i]
                        );
                }
            }
            switch (object.callType) {
                default:
                    if (typeof object.callType === "number") {
                        message.callType = object.callType;
                        break;
                    }
                    break;
                case "REGULAR":
                case 0:
                    message.callType = 0;
                    break;
                case "SCHEDULED_CALL":
                case 1:
                    message.callType = 1;
                    break;
                case "VOICE_CHAT":
                case 2:
                    message.callType = 2;
                    break;
            }
            return message;
        };
        CallLogRecord.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.participants = [];
            if (message.callResult != null && message.hasOwnProperty("callResult")) {
                object.callResult =
                    options.enums === String
                        ? $root.SyncAction.CallLogRecord.CallResult[message.callResult] ===
                          undefined
                            ? message.callResult
                            : $root.SyncAction.CallLogRecord.CallResult[message.callResult]
                        : message.callResult;
                if (options.oneofs) object._callResult = "callResult";
            }
            if (message.isDndMode != null && message.hasOwnProperty("isDndMode")) {
                object.isDndMode = message.isDndMode;
                if (options.oneofs) object._isDndMode = "isDndMode";
            }
            if (message.silenceReason != null && message.hasOwnProperty("silenceReason")) {
                object.silenceReason =
                    options.enums === String
                        ? $root.SyncAction.CallLogRecord.SilenceReason[message.silenceReason] ===
                          undefined
                            ? message.silenceReason
                            : $root.SyncAction.CallLogRecord.SilenceReason[message.silenceReason]
                        : message.silenceReason;
                if (options.oneofs) object._silenceReason = "silenceReason";
            }
            if (message.duration != null && message.hasOwnProperty("duration")) {
                if (typeof message.duration === "number")
                    object.duration =
                        options.longs === String ? String(message.duration) : message.duration;
                else
                    object.duration =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.duration)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.duration.low >>> 0,
                                    message.duration.high >>> 0
                                ).toNumber()
                              : message.duration;
                if (options.oneofs) object._duration = "duration";
            }
            if (message.startTime != null && message.hasOwnProperty("startTime")) {
                if (typeof message.startTime === "number")
                    object.startTime =
                        options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.startTime)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.startTime.low >>> 0,
                                    message.startTime.high >>> 0
                                ).toNumber()
                              : message.startTime;
                if (options.oneofs) object._startTime = "startTime";
            }
            if (message.isIncoming != null && message.hasOwnProperty("isIncoming")) {
                object.isIncoming = message.isIncoming;
                if (options.oneofs) object._isIncoming = "isIncoming";
            }
            if (message.isVideo != null && message.hasOwnProperty("isVideo")) {
                object.isVideo = message.isVideo;
                if (options.oneofs) object._isVideo = "isVideo";
            }
            if (message.isCallLink != null && message.hasOwnProperty("isCallLink")) {
                object.isCallLink = message.isCallLink;
                if (options.oneofs) object._isCallLink = "isCallLink";
            }
            if (message.callLinkToken != null && message.hasOwnProperty("callLinkToken")) {
                object.callLinkToken = message.callLinkToken;
                if (options.oneofs) object._callLinkToken = "callLinkToken";
            }
            if (message.scheduledCallId != null && message.hasOwnProperty("scheduledCallId")) {
                object.scheduledCallId = message.scheduledCallId;
                if (options.oneofs) object._scheduledCallId = "scheduledCallId";
            }
            if (message.callId != null && message.hasOwnProperty("callId")) {
                object.callId = message.callId;
                if (options.oneofs) object._callId = "callId";
            }
            if (message.callCreatorJid != null && message.hasOwnProperty("callCreatorJid")) {
                object.callCreatorJid = message.callCreatorJid;
                if (options.oneofs) object._callCreatorJid = "callCreatorJid";
            }
            if (message.groupJid != null && message.hasOwnProperty("groupJid")) {
                object.groupJid = message.groupJid;
                if (options.oneofs) object._groupJid = "groupJid";
            }
            if (message.participants && message.participants.length) {
                object.participants = [];
                for (var j = 0; j < message.participants.length; ++j)
                    object.participants[j] =
                        $root.SyncAction.CallLogRecord.ParticipantInfo.toObject(
                            message.participants[j],
                            options
                        );
            }
            if (message.callType != null && message.hasOwnProperty("callType")) {
                object.callType =
                    options.enums === String
                        ? $root.SyncAction.CallLogRecord.CallType[message.callType] === undefined
                            ? message.callType
                            : $root.SyncAction.CallLogRecord.CallType[message.callType]
                        : message.callType;
                if (options.oneofs) object._callType = "callType";
            }
            return object;
        };
        CallLogRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        CallLogRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SyncAction.CallLogRecord";
        };
        CallLogRecord.CallResult = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "CONNECTED")] = 0;
            values[(valuesById[1] = "REJECTED")] = 1;
            values[(valuesById[2] = "CANCELLED")] = 2;
            values[(valuesById[3] = "ACCEPTEDELSEWHERE")] = 3;
            values[(valuesById[4] = "MISSED")] = 4;
            values[(valuesById[5] = "INVALID")] = 5;
            values[(valuesById[6] = "UNAVAILABLE")] = 6;
            values[(valuesById[7] = "UPCOMING")] = 7;
            values[(valuesById[8] = "FAILED")] = 8;
            values[(valuesById[9] = "ABANDONED")] = 9;
            values[(valuesById[10] = "ONGOING")] = 10;
            return values;
        })();
        CallLogRecord.CallType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "REGULAR")] = 0;
            values[(valuesById[1] = "SCHEDULED_CALL")] = 1;
            values[(valuesById[2] = "VOICE_CHAT")] = 2;
            return values;
        })();
        CallLogRecord.ParticipantInfo = (function () {
            function ParticipantInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            ParticipantInfo.prototype.userJid = null;
            ParticipantInfo.prototype.callResult = null;
            var $oneOfFields;
            Object.defineProperty(ParticipantInfo.prototype, "_userJid", {
                get: $util.oneOfGetter(($oneOfFields = ["userJid"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(ParticipantInfo.prototype, "_callResult", {
                get: $util.oneOfGetter(($oneOfFields = ["callResult"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            ParticipantInfo.create = function create(properties) {
                return new ParticipantInfo(properties);
            };
            ParticipantInfo.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.userJid != null && Object.hasOwnProperty.call(message, "userJid"))
                    writer.uint32(10).string(message.userJid);
                if (message.callResult != null && Object.hasOwnProperty.call(message, "callResult"))
                    writer.uint32(16).int32(message.callResult);
                return writer;
            };
            ParticipantInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            ParticipantInfo.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SyncAction.CallLogRecord.ParticipantInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.userJid = reader.string();
                            break;
                        }
                        case 2: {
                            message.callResult = reader.int32();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            ParticipantInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            ParticipantInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.userJid != null && message.hasOwnProperty("userJid")) {
                    properties._userJid = 1;
                    if (!$util.isString(message.userJid)) return "userJid: string expected";
                }
                if (message.callResult != null && message.hasOwnProperty("callResult")) {
                    properties._callResult = 1;
                    switch (message.callResult) {
                        default:
                            return "callResult: enum value expected";
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
                return null;
            };
            ParticipantInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.SyncAction.CallLogRecord.ParticipantInfo) return object;
                var message = new $root.SyncAction.CallLogRecord.ParticipantInfo();
                if (object.userJid != null) message.userJid = String(object.userJid);
                switch (object.callResult) {
                    default:
                        if (typeof object.callResult === "number") {
                            message.callResult = object.callResult;
                            break;
                        }
                        break;
                    case "CONNECTED":
                    case 0:
                        message.callResult = 0;
                        break;
                    case "REJECTED":
                    case 1:
                        message.callResult = 1;
                        break;
                    case "CANCELLED":
                    case 2:
                        message.callResult = 2;
                        break;
                    case "ACCEPTEDELSEWHERE":
                    case 3:
                        message.callResult = 3;
                        break;
                    case "MISSED":
                    case 4:
                        message.callResult = 4;
                        break;
                    case "INVALID":
                    case 5:
                        message.callResult = 5;
                        break;
                    case "UNAVAILABLE":
                    case 6:
                        message.callResult = 6;
                        break;
                    case "UPCOMING":
                    case 7:
                        message.callResult = 7;
                        break;
                    case "FAILED":
                    case 8:
                        message.callResult = 8;
                        break;
                    case "ABANDONED":
                    case 9:
                        message.callResult = 9;
                        break;
                    case "ONGOING":
                    case 10:
                        message.callResult = 10;
                        break;
                }
                return message;
            };
            ParticipantInfo.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.userJid != null && message.hasOwnProperty("userJid")) {
                    object.userJid = message.userJid;
                    if (options.oneofs) object._userJid = "userJid";
                }
                if (message.callResult != null && message.hasOwnProperty("callResult")) {
                    object.callResult =
                        options.enums === String
                            ? $root.SyncAction.CallLogRecord.CallResult[message.callResult] ===
                              undefined
                                ? message.callResult
                                : $root.SyncAction.CallLogRecord.CallResult[message.callResult]
                            : message.callResult;
                    if (options.oneofs) object._callResult = "callResult";
                }
                return object;
            };
            ParticipantInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            ParticipantInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/SyncAction.CallLogRecord.ParticipantInfo";
            };
            return ParticipantInfo;
        })();
        CallLogRecord.SilenceReason = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "NONE")] = 0;
            values[(valuesById[1] = "SCHEDULED")] = 1;
            values[(valuesById[2] = "PRIVACY")] = 2;
            values[(valuesById[3] = "LIGHTWEIGHT")] = 3;
            return values;
        })();
        return CallLogRecord;
    })();
    SyncAction.RecentEmojiWeight = (function () {
        function RecentEmojiWeight(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        RecentEmojiWeight.prototype.emoji = null;
        RecentEmojiWeight.prototype.weight = null;
        var $oneOfFields;
        Object.defineProperty(RecentEmojiWeight.prototype, "_emoji", {
            get: $util.oneOfGetter(($oneOfFields = ["emoji"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(RecentEmojiWeight.prototype, "_weight", {
            get: $util.oneOfGetter(($oneOfFields = ["weight"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        RecentEmojiWeight.create = function create(properties) {
            return new RecentEmojiWeight(properties);
        };
        RecentEmojiWeight.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.emoji != null && Object.hasOwnProperty.call(message, "emoji"))
                writer.uint32(10).string(message.emoji);
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(21).float(message.weight);
            return writer;
        };
        RecentEmojiWeight.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        RecentEmojiWeight.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SyncAction.RecentEmojiWeight();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.emoji = reader.string();
                        break;
                    }
                    case 2: {
                        message.weight = reader.float();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        RecentEmojiWeight.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        RecentEmojiWeight.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.emoji != null && message.hasOwnProperty("emoji")) {
                properties._emoji = 1;
                if (!$util.isString(message.emoji)) return "emoji: string expected";
            }
            if (message.weight != null && message.hasOwnProperty("weight")) {
                properties._weight = 1;
                if (typeof message.weight !== "number") return "weight: number expected";
            }
            return null;
        };
        RecentEmojiWeight.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncAction.RecentEmojiWeight) return object;
            var message = new $root.SyncAction.RecentEmojiWeight();
            if (object.emoji != null) message.emoji = String(object.emoji);
            if (object.weight != null) message.weight = Number(object.weight);
            return message;
        };
        RecentEmojiWeight.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.emoji != null && message.hasOwnProperty("emoji")) {
                object.emoji = message.emoji;
                if (options.oneofs) object._emoji = "emoji";
            }
            if (message.weight != null && message.hasOwnProperty("weight")) {
                object.weight =
                    options.json && !isFinite(message.weight)
                        ? String(message.weight)
                        : message.weight;
                if (options.oneofs) object._weight = "weight";
            }
            return object;
        };
        RecentEmojiWeight.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        RecentEmojiWeight.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SyncAction.RecentEmojiWeight";
        };
        return RecentEmojiWeight;
    })();
    SyncAction.MutationProps = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[2] = "STAR_ACTION")] = 2;
        values[(valuesById[3] = "CONTACT_ACTION")] = 3;
        values[(valuesById[4] = "MUTE_ACTION")] = 4;
        values[(valuesById[5] = "PIN_ACTION")] = 5;
        values[(valuesById[6] = "SECURITY_NOTIFICATION_SETTING")] = 6;
        values[(valuesById[7] = "PUSH_NAME_SETTING")] = 7;
        values[(valuesById[8] = "QUICK_REPLY_ACTION")] = 8;
        values[(valuesById[11] = "RECENT_EMOJI_WEIGHTS_ACTION")] = 11;
        values[(valuesById[13] = "LABEL_MESSAGE_ACTION")] = 13;
        values[(valuesById[14] = "LABEL_EDIT_ACTION")] = 14;
        values[(valuesById[15] = "LABEL_ASSOCIATION_ACTION")] = 15;
        values[(valuesById[16] = "LOCALE_SETTING")] = 16;
        values[(valuesById[17] = "ARCHIVE_CHAT_ACTION")] = 17;
        values[(valuesById[18] = "DELETE_MESSAGE_FOR_ME_ACTION")] = 18;
        values[(valuesById[19] = "KEY_EXPIRATION")] = 19;
        values[(valuesById[20] = "MARK_CHAT_AS_READ_ACTION")] = 20;
        values[(valuesById[21] = "CLEAR_CHAT_ACTION")] = 21;
        values[(valuesById[22] = "DELETE_CHAT_ACTION")] = 22;
        values[(valuesById[23] = "UNARCHIVE_CHATS_SETTING")] = 23;
        values[(valuesById[24] = "PRIMARY_FEATURE")] = 24;
        values[(valuesById[26] = "ANDROID_UNSUPPORTED_ACTIONS")] = 26;
        values[(valuesById[27] = "AGENT_ACTION")] = 27;
        values[(valuesById[28] = "SUBSCRIPTION_ACTION")] = 28;
        values[(valuesById[29] = "USER_STATUS_MUTE_ACTION")] = 29;
        values[(valuesById[30] = "TIME_FORMAT_ACTION")] = 30;
        values[(valuesById[31] = "NUX_ACTION")] = 31;
        values[(valuesById[32] = "PRIMARY_VERSION_ACTION")] = 32;
        values[(valuesById[33] = "STICKER_ACTION")] = 33;
        values[(valuesById[34] = "REMOVE_RECENT_STICKER_ACTION")] = 34;
        values[(valuesById[35] = "CHAT_ASSIGNMENT")] = 35;
        values[(valuesById[36] = "CHAT_ASSIGNMENT_OPENED_STATUS")] = 36;
        values[(valuesById[37] = "PN_FOR_LID_CHAT_ACTION")] = 37;
        values[(valuesById[38] = "MARKETING_MESSAGE_ACTION")] = 38;
        values[(valuesById[39] = "MARKETING_MESSAGE_BROADCAST_ACTION")] = 39;
        values[(valuesById[40] = "EXTERNAL_WEB_BETA_ACTION")] = 40;
        values[(valuesById[41] = "PRIVACY_SETTING_RELAY_ALL_CALLS")] = 41;
        values[(valuesById[42] = "CALL_LOG_ACTION")] = 42;
        values[(valuesById[43] = "UGC_BOT")] = 43;
        values[(valuesById[44] = "STATUS_PRIVACY")] = 44;
        values[(valuesById[45] = "BOT_WELCOME_REQUEST_ACTION")] = 45;
        values[(valuesById[46] = "DELETE_INDIVIDUAL_CALL_LOG")] = 46;
        values[(valuesById[47] = "LABEL_REORDERING_ACTION")] = 47;
        values[(valuesById[48] = "PAYMENT_INFO_ACTION")] = 48;
        values[(valuesById[49] = "CUSTOM_PAYMENT_METHODS_ACTION")] = 49;
        values[(valuesById[50] = "LOCK_CHAT_ACTION")] = 50;
        values[(valuesById[51] = "CHAT_LOCK_SETTINGS")] = 51;
        values[(valuesById[52] = "WAMO_USER_IDENTIFIER_ACTION")] = 52;
        values[(valuesById[53] = "PRIVACY_SETTING_DISABLE_LINK_PREVIEWS_ACTION")] = 53;
        values[(valuesById[54] = "DEVICE_CAPABILITIES")] = 54;
        values[(valuesById[55] = "NOTE_EDIT_ACTION")] = 55;
        values[(valuesById[56] = "FAVORITES_ACTION")] = 56;
        values[(valuesById[57] = "MERCHANT_PAYMENT_PARTNER_ACTION")] = 57;
        values[(valuesById[58] = "WAFFLE_ACCOUNT_LINK_STATE_ACTION")] = 58;
        values[(valuesById[59] = "USERNAME_CHAT_START_MODE")] = 59;
        values[(valuesById[60] = "NOTIFICATION_ACTIVITY_SETTING_ACTION")] = 60;
        values[(valuesById[61] = "LID_CONTACT_ACTION")] = 61;
        values[(valuesById[62] = "CTWA_PER_CUSTOMER_DATA_SHARING_ACTION")] = 62;
        values[(valuesById[63] = "PAYMENT_TOS_ACTION")] = 63;
        values[(valuesById[64] = "PRIVACY_SETTING_CHANNELS_PERSONALISED_RECOMMENDATION_ACTION")] =
            64;
        values[(valuesById[65] = "BUSINESS_BROADCAST_ASSOCIATION_ACTION")] = 65;
        values[(valuesById[66] = "DETECTED_OUTCOMES_STATUS_ACTION")] = 66;
        values[(valuesById[68] = "MAIBA_AI_FEATURES_CONTROL_ACTION")] = 68;
        values[(valuesById[69] = "BUSINESS_BROADCAST_LIST_ACTION")] = 69;
        values[(valuesById[70] = "MUSIC_USER_ID_ACTION")] = 70;
        values[(valuesById[71] = "STATUS_POST_OPT_IN_NOTIFICATION_PREFERENCES_ACTION")] = 71;
        values[(valuesById[72] = "AVATAR_UPDATED_ACTION")] = 72;
        values[(valuesById[73] = "GALAXY_FLOW_ACTION")] = 73;
        values[(valuesById[74] = "PRIVATE_PROCESSING_SETTING_ACTION")] = 74;
        values[(valuesById[75] = "NEWSLETTER_SAVED_INTERESTS_ACTION")] = 75;
        values[(valuesById[76] = "AI_THREAD_RENAME_ACTION")] = 76;
        values[(valuesById[77] = "INTERACTIVE_MESSAGE_ACTION")] = 77;
        values[(valuesById[78] = "SETTINGS_SYNC_ACTION")] = 78;
        values[(valuesById[10001] = "SHARE_OWN_PN")] = 10001;
        values[(valuesById[10002] = "BUSINESS_BROADCAST_ACTION")] = 10002;
        return values;
    })();
    SyncAction.CollectionName = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "COLLECTION_NAME_UNKNOWN")] = 0;
        values[(valuesById[1] = "REGULAR")] = 1;
        values[(valuesById[2] = "REGULAR_LOW")] = 2;
        values[(valuesById[3] = "REGULAR_HIGH")] = 3;
        values[(valuesById[4] = "CRITICAL_BLOCK")] = 4;
        values[(valuesById[5] = "CRITICAL_UNBLOCK_LOW")] = 5;
        return values;
    })();
    return SyncAction;
})();
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

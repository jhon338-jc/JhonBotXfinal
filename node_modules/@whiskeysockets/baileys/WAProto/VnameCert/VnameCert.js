"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.VnameCert = (function () {
    var VnameCert = {};
    VnameCert.BizIdentityInfo = (function () {
        function BizIdentityInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BizIdentityInfo.prototype.vlevel = null;
        BizIdentityInfo.prototype.vnameCert = null;
        BizIdentityInfo.prototype.signed = null;
        BizIdentityInfo.prototype.revoked = null;
        BizIdentityInfo.prototype.hostStorage = null;
        BizIdentityInfo.prototype.actualActors = null;
        BizIdentityInfo.prototype.privacyModeTs = null;
        BizIdentityInfo.prototype.featureControls = null;
        var $oneOfFields;
        Object.defineProperty(BizIdentityInfo.prototype, "_vlevel", {
            get: $util.oneOfGetter(($oneOfFields = ["vlevel"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_vnameCert", {
            get: $util.oneOfGetter(($oneOfFields = ["vnameCert"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_signed", {
            get: $util.oneOfGetter(($oneOfFields = ["signed"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_revoked", {
            get: $util.oneOfGetter(($oneOfFields = ["revoked"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_hostStorage", {
            get: $util.oneOfGetter(($oneOfFields = ["hostStorage"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_actualActors", {
            get: $util.oneOfGetter(($oneOfFields = ["actualActors"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_privacyModeTs", {
            get: $util.oneOfGetter(($oneOfFields = ["privacyModeTs"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizIdentityInfo.prototype, "_featureControls", {
            get: $util.oneOfGetter(($oneOfFields = ["featureControls"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BizIdentityInfo.create = function create(properties) {
            return new BizIdentityInfo(properties);
        };
        BizIdentityInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.vlevel != null && Object.hasOwnProperty.call(message, "vlevel"))
                writer.uint32(8).int32(message.vlevel);
            if (message.vnameCert != null && Object.hasOwnProperty.call(message, "vnameCert"))
                $root.VnameCert.VerifiedNameCertificate.encode(
                    message.vnameCert,
                    writer.uint32(18).fork()
                ).ldelim();
            if (message.signed != null && Object.hasOwnProperty.call(message, "signed"))
                writer.uint32(24).bool(message.signed);
            if (message.revoked != null && Object.hasOwnProperty.call(message, "revoked"))
                writer.uint32(32).bool(message.revoked);
            if (message.hostStorage != null && Object.hasOwnProperty.call(message, "hostStorage"))
                writer.uint32(40).int32(message.hostStorage);
            if (message.actualActors != null && Object.hasOwnProperty.call(message, "actualActors"))
                writer.uint32(48).int32(message.actualActors);
            if (
                message.privacyModeTs != null &&
                Object.hasOwnProperty.call(message, "privacyModeTs")
            )
                writer.uint32(56).uint64(message.privacyModeTs);
            if (
                message.featureControls != null &&
                Object.hasOwnProperty.call(message, "featureControls")
            )
                writer.uint32(64).uint64(message.featureControls);
            return writer;
        };
        BizIdentityInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BizIdentityInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.VnameCert.BizIdentityInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.vlevel = reader.int32();
                        break;
                    }
                    case 2: {
                        message.vnameCert = $root.VnameCert.VerifiedNameCertificate.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 3: {
                        message.signed = reader.bool();
                        break;
                    }
                    case 4: {
                        message.revoked = reader.bool();
                        break;
                    }
                    case 5: {
                        message.hostStorage = reader.int32();
                        break;
                    }
                    case 6: {
                        message.actualActors = reader.int32();
                        break;
                    }
                    case 7: {
                        message.privacyModeTs = reader.uint64();
                        break;
                    }
                    case 8: {
                        message.featureControls = reader.uint64();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BizIdentityInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BizIdentityInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.vlevel != null && message.hasOwnProperty("vlevel")) {
                properties._vlevel = 1;
                switch (message.vlevel) {
                    default:
                        return "vlevel: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                }
            }
            if (message.vnameCert != null && message.hasOwnProperty("vnameCert")) {
                properties._vnameCert = 1;
                {
                    var error = $root.VnameCert.VerifiedNameCertificate.verify(message.vnameCert);
                    if (error) return "vnameCert." + error;
                }
            }
            if (message.signed != null && message.hasOwnProperty("signed")) {
                properties._signed = 1;
                if (typeof message.signed !== "boolean") return "signed: boolean expected";
            }
            if (message.revoked != null && message.hasOwnProperty("revoked")) {
                properties._revoked = 1;
                if (typeof message.revoked !== "boolean") return "revoked: boolean expected";
            }
            if (message.hostStorage != null && message.hasOwnProperty("hostStorage")) {
                properties._hostStorage = 1;
                switch (message.hostStorage) {
                    default:
                        return "hostStorage: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.actualActors != null && message.hasOwnProperty("actualActors")) {
                properties._actualActors = 1;
                switch (message.actualActors) {
                    default:
                        return "actualActors: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.privacyModeTs != null && message.hasOwnProperty("privacyModeTs")) {
                properties._privacyModeTs = 1;
                if (
                    !$util.isInteger(message.privacyModeTs) &&
                    !(
                        message.privacyModeTs &&
                        $util.isInteger(message.privacyModeTs.low) &&
                        $util.isInteger(message.privacyModeTs.high)
                    )
                )
                    return "privacyModeTs: integer|Long expected";
            }
            if (message.featureControls != null && message.hasOwnProperty("featureControls")) {
                properties._featureControls = 1;
                if (
                    !$util.isInteger(message.featureControls) &&
                    !(
                        message.featureControls &&
                        $util.isInteger(message.featureControls.low) &&
                        $util.isInteger(message.featureControls.high)
                    )
                )
                    return "featureControls: integer|Long expected";
            }
            return null;
        };
        BizIdentityInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.VnameCert.BizIdentityInfo) return object;
            var message = new $root.VnameCert.BizIdentityInfo();
            switch (object.vlevel) {
                default:
                    if (typeof object.vlevel === "number") {
                        message.vlevel = object.vlevel;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.vlevel = 0;
                    break;
                case "LOW":
                case 1:
                    message.vlevel = 1;
                    break;
                case "HIGH":
                case 2:
                    message.vlevel = 2;
                    break;
            }
            if (object.vnameCert != null) {
                if (typeof object.vnameCert !== "object")
                    throw TypeError(".VnameCert.BizIdentityInfo.vnameCert: object expected");
                message.vnameCert = $root.VnameCert.VerifiedNameCertificate.fromObject(
                    object.vnameCert
                );
            }
            if (object.signed != null) message.signed = Boolean(object.signed);
            if (object.revoked != null) message.revoked = Boolean(object.revoked);
            switch (object.hostStorage) {
                default:
                    if (typeof object.hostStorage === "number") {
                        message.hostStorage = object.hostStorage;
                        break;
                    }
                    break;
                case "ON_PREMISE":
                case 0:
                    message.hostStorage = 0;
                    break;
                case "FACEBOOK":
                case 1:
                    message.hostStorage = 1;
                    break;
            }
            switch (object.actualActors) {
                default:
                    if (typeof object.actualActors === "number") {
                        message.actualActors = object.actualActors;
                        break;
                    }
                    break;
                case "SELF":
                case 0:
                    message.actualActors = 0;
                    break;
                case "BSP":
                case 1:
                    message.actualActors = 1;
                    break;
            }
            if (object.privacyModeTs != null)
                if ($util.Long)
                    (message.privacyModeTs = $util.Long.fromValue(object.privacyModeTs)).unsigned =
                        true;
                else if (typeof object.privacyModeTs === "string")
                    message.privacyModeTs = parseInt(object.privacyModeTs, 10);
                else if (typeof object.privacyModeTs === "number")
                    message.privacyModeTs = object.privacyModeTs;
                else if (typeof object.privacyModeTs === "object")
                    message.privacyModeTs = new $util.LongBits(
                        object.privacyModeTs.low >>> 0,
                        object.privacyModeTs.high >>> 0
                    ).toNumber(true);
            if (object.featureControls != null)
                if ($util.Long)
                    (message.featureControls = $util.Long.fromValue(
                        object.featureControls
                    )).unsigned = true;
                else if (typeof object.featureControls === "string")
                    message.featureControls = parseInt(object.featureControls, 10);
                else if (typeof object.featureControls === "number")
                    message.featureControls = object.featureControls;
                else if (typeof object.featureControls === "object")
                    message.featureControls = new $util.LongBits(
                        object.featureControls.low >>> 0,
                        object.featureControls.high >>> 0
                    ).toNumber(true);
            return message;
        };
        BizIdentityInfo.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.vlevel != null && message.hasOwnProperty("vlevel")) {
                object.vlevel =
                    options.enums === String
                        ? $root.VnameCert.BizIdentityInfo.VerifiedLevelValue[message.vlevel] ===
                          undefined
                            ? message.vlevel
                            : $root.VnameCert.BizIdentityInfo.VerifiedLevelValue[message.vlevel]
                        : message.vlevel;
                if (options.oneofs) object._vlevel = "vlevel";
            }
            if (message.vnameCert != null && message.hasOwnProperty("vnameCert")) {
                object.vnameCert = $root.VnameCert.VerifiedNameCertificate.toObject(
                    message.vnameCert,
                    options
                );
                if (options.oneofs) object._vnameCert = "vnameCert";
            }
            if (message.signed != null && message.hasOwnProperty("signed")) {
                object.signed = message.signed;
                if (options.oneofs) object._signed = "signed";
            }
            if (message.revoked != null && message.hasOwnProperty("revoked")) {
                object.revoked = message.revoked;
                if (options.oneofs) object._revoked = "revoked";
            }
            if (message.hostStorage != null && message.hasOwnProperty("hostStorage")) {
                object.hostStorage =
                    options.enums === String
                        ? $root.VnameCert.BizIdentityInfo.HostStorageType[message.hostStorage] ===
                          undefined
                            ? message.hostStorage
                            : $root.VnameCert.BizIdentityInfo.HostStorageType[message.hostStorage]
                        : message.hostStorage;
                if (options.oneofs) object._hostStorage = "hostStorage";
            }
            if (message.actualActors != null && message.hasOwnProperty("actualActors")) {
                object.actualActors =
                    options.enums === String
                        ? $root.VnameCert.BizIdentityInfo.ActualActorsType[message.actualActors] ===
                          undefined
                            ? message.actualActors
                            : $root.VnameCert.BizIdentityInfo.ActualActorsType[message.actualActors]
                        : message.actualActors;
                if (options.oneofs) object._actualActors = "actualActors";
            }
            if (message.privacyModeTs != null && message.hasOwnProperty("privacyModeTs")) {
                if (typeof message.privacyModeTs === "number")
                    object.privacyModeTs =
                        options.longs === String
                            ? String(message.privacyModeTs)
                            : message.privacyModeTs;
                else
                    object.privacyModeTs =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.privacyModeTs)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.privacyModeTs.low >>> 0,
                                    message.privacyModeTs.high >>> 0
                                ).toNumber(true)
                              : message.privacyModeTs;
                if (options.oneofs) object._privacyModeTs = "privacyModeTs";
            }
            if (message.featureControls != null && message.hasOwnProperty("featureControls")) {
                if (typeof message.featureControls === "number")
                    object.featureControls =
                        options.longs === String
                            ? String(message.featureControls)
                            : message.featureControls;
                else
                    object.featureControls =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.featureControls)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.featureControls.low >>> 0,
                                    message.featureControls.high >>> 0
                                ).toNumber(true)
                              : message.featureControls;
                if (options.oneofs) object._featureControls = "featureControls";
            }
            return object;
        };
        BizIdentityInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BizIdentityInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/VnameCert.BizIdentityInfo";
        };
        BizIdentityInfo.ActualActorsType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "SELF")] = 0;
            values[(valuesById[1] = "BSP")] = 1;
            return values;
        })();
        BizIdentityInfo.HostStorageType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "ON_PREMISE")] = 0;
            values[(valuesById[1] = "FACEBOOK")] = 1;
            return values;
        })();
        BizIdentityInfo.VerifiedLevelValue = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "UNKNOWN")] = 0;
            values[(valuesById[1] = "LOW")] = 1;
            values[(valuesById[2] = "HIGH")] = 2;
            return values;
        })();
        return BizIdentityInfo;
    })();
    VnameCert.BizAccountLinkInfo = (function () {
        function BizAccountLinkInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BizAccountLinkInfo.prototype.whatsappBizAcctFbid = null;
        BizAccountLinkInfo.prototype.whatsappAcctNumber = null;
        BizAccountLinkInfo.prototype.issueTime = null;
        BizAccountLinkInfo.prototype.hostStorage = null;
        BizAccountLinkInfo.prototype.accountType = null;
        var $oneOfFields;
        Object.defineProperty(BizAccountLinkInfo.prototype, "_whatsappBizAcctFbid", {
            get: $util.oneOfGetter(($oneOfFields = ["whatsappBizAcctFbid"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizAccountLinkInfo.prototype, "_whatsappAcctNumber", {
            get: $util.oneOfGetter(($oneOfFields = ["whatsappAcctNumber"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizAccountLinkInfo.prototype, "_issueTime", {
            get: $util.oneOfGetter(($oneOfFields = ["issueTime"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizAccountLinkInfo.prototype, "_hostStorage", {
            get: $util.oneOfGetter(($oneOfFields = ["hostStorage"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizAccountLinkInfo.prototype, "_accountType", {
            get: $util.oneOfGetter(($oneOfFields = ["accountType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BizAccountLinkInfo.create = function create(properties) {
            return new BizAccountLinkInfo(properties);
        };
        BizAccountLinkInfo.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.whatsappBizAcctFbid != null &&
                Object.hasOwnProperty.call(message, "whatsappBizAcctFbid")
            )
                writer.uint32(8).uint64(message.whatsappBizAcctFbid);
            if (
                message.whatsappAcctNumber != null &&
                Object.hasOwnProperty.call(message, "whatsappAcctNumber")
            )
                writer.uint32(18).string(message.whatsappAcctNumber);
            if (message.issueTime != null && Object.hasOwnProperty.call(message, "issueTime"))
                writer.uint32(24).uint64(message.issueTime);
            if (message.hostStorage != null && Object.hasOwnProperty.call(message, "hostStorage"))
                writer.uint32(32).int32(message.hostStorage);
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                writer.uint32(40).int32(message.accountType);
            return writer;
        };
        BizAccountLinkInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BizAccountLinkInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.VnameCert.BizAccountLinkInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.whatsappBizAcctFbid = reader.uint64();
                        break;
                    }
                    case 2: {
                        message.whatsappAcctNumber = reader.string();
                        break;
                    }
                    case 3: {
                        message.issueTime = reader.uint64();
                        break;
                    }
                    case 4: {
                        message.hostStorage = reader.int32();
                        break;
                    }
                    case 5: {
                        message.accountType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BizAccountLinkInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BizAccountLinkInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (
                message.whatsappBizAcctFbid != null &&
                message.hasOwnProperty("whatsappBizAcctFbid")
            ) {
                properties._whatsappBizAcctFbid = 1;
                if (
                    !$util.isInteger(message.whatsappBizAcctFbid) &&
                    !(
                        message.whatsappBizAcctFbid &&
                        $util.isInteger(message.whatsappBizAcctFbid.low) &&
                        $util.isInteger(message.whatsappBizAcctFbid.high)
                    )
                )
                    return "whatsappBizAcctFbid: integer|Long expected";
            }
            if (
                message.whatsappAcctNumber != null &&
                message.hasOwnProperty("whatsappAcctNumber")
            ) {
                properties._whatsappAcctNumber = 1;
                if (!$util.isString(message.whatsappAcctNumber))
                    return "whatsappAcctNumber: string expected";
            }
            if (message.issueTime != null && message.hasOwnProperty("issueTime")) {
                properties._issueTime = 1;
                if (
                    !$util.isInteger(message.issueTime) &&
                    !(
                        message.issueTime &&
                        $util.isInteger(message.issueTime.low) &&
                        $util.isInteger(message.issueTime.high)
                    )
                )
                    return "issueTime: integer|Long expected";
            }
            if (message.hostStorage != null && message.hasOwnProperty("hostStorage")) {
                properties._hostStorage = 1;
                switch (message.hostStorage) {
                    default:
                        return "hostStorage: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                properties._accountType = 1;
                switch (message.accountType) {
                    default:
                        return "accountType: enum value expected";
                    case 0:
                        break;
                }
            }
            return null;
        };
        BizAccountLinkInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.VnameCert.BizAccountLinkInfo) return object;
            var message = new $root.VnameCert.BizAccountLinkInfo();
            if (object.whatsappBizAcctFbid != null)
                if ($util.Long)
                    (message.whatsappBizAcctFbid = $util.Long.fromValue(
                        object.whatsappBizAcctFbid
                    )).unsigned = true;
                else if (typeof object.whatsappBizAcctFbid === "string")
                    message.whatsappBizAcctFbid = parseInt(object.whatsappBizAcctFbid, 10);
                else if (typeof object.whatsappBizAcctFbid === "number")
                    message.whatsappBizAcctFbid = object.whatsappBizAcctFbid;
                else if (typeof object.whatsappBizAcctFbid === "object")
                    message.whatsappBizAcctFbid = new $util.LongBits(
                        object.whatsappBizAcctFbid.low >>> 0,
                        object.whatsappBizAcctFbid.high >>> 0
                    ).toNumber(true);
            if (object.whatsappAcctNumber != null)
                message.whatsappAcctNumber = String(object.whatsappAcctNumber);
            if (object.issueTime != null)
                if ($util.Long)
                    (message.issueTime = $util.Long.fromValue(object.issueTime)).unsigned = true;
                else if (typeof object.issueTime === "string")
                    message.issueTime = parseInt(object.issueTime, 10);
                else if (typeof object.issueTime === "number") message.issueTime = object.issueTime;
                else if (typeof object.issueTime === "object")
                    message.issueTime = new $util.LongBits(
                        object.issueTime.low >>> 0,
                        object.issueTime.high >>> 0
                    ).toNumber(true);
            switch (object.hostStorage) {
                default:
                    if (typeof object.hostStorage === "number") {
                        message.hostStorage = object.hostStorage;
                        break;
                    }
                    break;
                case "ON_PREMISE":
                case 0:
                    message.hostStorage = 0;
                    break;
                case "FACEBOOK":
                case 1:
                    message.hostStorage = 1;
                    break;
            }
            switch (object.accountType) {
                default:
                    if (typeof object.accountType === "number") {
                        message.accountType = object.accountType;
                        break;
                    }
                    break;
                case "ENTERPRISE":
                case 0:
                    message.accountType = 0;
                    break;
            }
            return message;
        };
        BizAccountLinkInfo.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (
                message.whatsappBizAcctFbid != null &&
                message.hasOwnProperty("whatsappBizAcctFbid")
            ) {
                if (typeof message.whatsappBizAcctFbid === "number")
                    object.whatsappBizAcctFbid =
                        options.longs === String
                            ? String(message.whatsappBizAcctFbid)
                            : message.whatsappBizAcctFbid;
                else
                    object.whatsappBizAcctFbid =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.whatsappBizAcctFbid)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.whatsappBizAcctFbid.low >>> 0,
                                    message.whatsappBizAcctFbid.high >>> 0
                                ).toNumber(true)
                              : message.whatsappBizAcctFbid;
                if (options.oneofs) object._whatsappBizAcctFbid = "whatsappBizAcctFbid";
            }
            if (
                message.whatsappAcctNumber != null &&
                message.hasOwnProperty("whatsappAcctNumber")
            ) {
                object.whatsappAcctNumber = message.whatsappAcctNumber;
                if (options.oneofs) object._whatsappAcctNumber = "whatsappAcctNumber";
            }
            if (message.issueTime != null && message.hasOwnProperty("issueTime")) {
                if (typeof message.issueTime === "number")
                    object.issueTime =
                        options.longs === String ? String(message.issueTime) : message.issueTime;
                else
                    object.issueTime =
                        options.longs === String
                            ? $util.Long.prototype.toString.call(message.issueTime)
                            : options.longs === Number
                              ? new $util.LongBits(
                                    message.issueTime.low >>> 0,
                                    message.issueTime.high >>> 0
                                ).toNumber(true)
                              : message.issueTime;
                if (options.oneofs) object._issueTime = "issueTime";
            }
            if (message.hostStorage != null && message.hasOwnProperty("hostStorage")) {
                object.hostStorage =
                    options.enums === String
                        ? $root.VnameCert.BizAccountLinkInfo.HostStorageType[
                              message.hostStorage
                          ] === undefined
                            ? message.hostStorage
                            : $root.VnameCert.BizAccountLinkInfo.HostStorageType[
                                  message.hostStorage
                              ]
                        : message.hostStorage;
                if (options.oneofs) object._hostStorage = "hostStorage";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                object.accountType =
                    options.enums === String
                        ? $root.VnameCert.BizAccountLinkInfo.AccountType[message.accountType] ===
                          undefined
                            ? message.accountType
                            : $root.VnameCert.BizAccountLinkInfo.AccountType[message.accountType]
                        : message.accountType;
                if (options.oneofs) object._accountType = "accountType";
            }
            return object;
        };
        BizAccountLinkInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BizAccountLinkInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/VnameCert.BizAccountLinkInfo";
        };
        BizAccountLinkInfo.AccountType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "ENTERPRISE")] = 0;
            return values;
        })();
        BizAccountLinkInfo.HostStorageType = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = "ON_PREMISE")] = 0;
            values[(valuesById[1] = "FACEBOOK")] = 1;
            return values;
        })();
        return BizAccountLinkInfo;
    })();
    VnameCert.BizAccountPayload = (function () {
        function BizAccountPayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        BizAccountPayload.prototype.vnameCert = null;
        BizAccountPayload.prototype.bizAcctLinkInfo = null;
        var $oneOfFields;
        Object.defineProperty(BizAccountPayload.prototype, "_vnameCert", {
            get: $util.oneOfGetter(($oneOfFields = ["vnameCert"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(BizAccountPayload.prototype, "_bizAcctLinkInfo", {
            get: $util.oneOfGetter(($oneOfFields = ["bizAcctLinkInfo"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        BizAccountPayload.create = function create(properties) {
            return new BizAccountPayload(properties);
        };
        BizAccountPayload.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.vnameCert != null && Object.hasOwnProperty.call(message, "vnameCert"))
                $root.VnameCert.VerifiedNameCertificate.encode(
                    message.vnameCert,
                    writer.uint32(10).fork()
                ).ldelim();
            if (
                message.bizAcctLinkInfo != null &&
                Object.hasOwnProperty.call(message, "bizAcctLinkInfo")
            )
                writer.uint32(18).bytes(message.bizAcctLinkInfo);
            return writer;
        };
        BizAccountPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        BizAccountPayload.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.VnameCert.BizAccountPayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.vnameCert = $root.VnameCert.VerifiedNameCertificate.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.bizAcctLinkInfo = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        BizAccountPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        BizAccountPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.vnameCert != null && message.hasOwnProperty("vnameCert")) {
                properties._vnameCert = 1;
                {
                    var error = $root.VnameCert.VerifiedNameCertificate.verify(message.vnameCert);
                    if (error) return "vnameCert." + error;
                }
            }
            if (message.bizAcctLinkInfo != null && message.hasOwnProperty("bizAcctLinkInfo")) {
                properties._bizAcctLinkInfo = 1;
                if (
                    !(
                        (message.bizAcctLinkInfo &&
                            typeof message.bizAcctLinkInfo.length === "number") ||
                        $util.isString(message.bizAcctLinkInfo)
                    )
                )
                    return "bizAcctLinkInfo: buffer expected";
            }
            return null;
        };
        BizAccountPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.VnameCert.BizAccountPayload) return object;
            var message = new $root.VnameCert.BizAccountPayload();
            if (object.vnameCert != null) {
                if (typeof object.vnameCert !== "object")
                    throw TypeError(".VnameCert.BizAccountPayload.vnameCert: object expected");
                message.vnameCert = $root.VnameCert.VerifiedNameCertificate.fromObject(
                    object.vnameCert
                );
            }
            if (object.bizAcctLinkInfo != null)
                if (typeof object.bizAcctLinkInfo === "string")
                    $util.base64.decode(
                        object.bizAcctLinkInfo,
                        (message.bizAcctLinkInfo = $util.newBuffer(
                            $util.base64.length(object.bizAcctLinkInfo)
                        )),
                        0
                    );
                else if (object.bizAcctLinkInfo.length >= 0)
                    message.bizAcctLinkInfo = object.bizAcctLinkInfo;
            return message;
        };
        BizAccountPayload.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.vnameCert != null && message.hasOwnProperty("vnameCert")) {
                object.vnameCert = $root.VnameCert.VerifiedNameCertificate.toObject(
                    message.vnameCert,
                    options
                );
                if (options.oneofs) object._vnameCert = "vnameCert";
            }
            if (message.bizAcctLinkInfo != null && message.hasOwnProperty("bizAcctLinkInfo")) {
                object.bizAcctLinkInfo =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.bizAcctLinkInfo,
                              0,
                              message.bizAcctLinkInfo.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.bizAcctLinkInfo)
                          : message.bizAcctLinkInfo;
                if (options.oneofs) object._bizAcctLinkInfo = "bizAcctLinkInfo";
            }
            return object;
        };
        BizAccountPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        BizAccountPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/VnameCert.BizAccountPayload";
        };
        return BizAccountPayload;
    })();
    VnameCert.VerifiedNameCertificate = (function () {
        function VerifiedNameCertificate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        VerifiedNameCertificate.prototype.details = null;
        VerifiedNameCertificate.prototype.signature = null;
        VerifiedNameCertificate.prototype.serverSignature = null;
        var $oneOfFields;
        Object.defineProperty(VerifiedNameCertificate.prototype, "_details", {
            get: $util.oneOfGetter(($oneOfFields = ["details"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(VerifiedNameCertificate.prototype, "_signature", {
            get: $util.oneOfGetter(($oneOfFields = ["signature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(VerifiedNameCertificate.prototype, "_serverSignature", {
            get: $util.oneOfGetter(($oneOfFields = ["serverSignature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        VerifiedNameCertificate.create = function create(properties) {
            return new VerifiedNameCertificate(properties);
        };
        VerifiedNameCertificate.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                writer.uint32(10).bytes(message.details);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(18).bytes(message.signature);
            if (
                message.serverSignature != null &&
                Object.hasOwnProperty.call(message, "serverSignature")
            )
                writer.uint32(26).bytes(message.serverSignature);
            return writer;
        };
        VerifiedNameCertificate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        VerifiedNameCertificate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.VnameCert.VerifiedNameCertificate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.details = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.signature = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.serverSignature = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        VerifiedNameCertificate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        VerifiedNameCertificate.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.details != null && message.hasOwnProperty("details")) {
                properties._details = 1;
                if (
                    !(
                        (message.details && typeof message.details.length === "number") ||
                        $util.isString(message.details)
                    )
                )
                    return "details: buffer expected";
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
            if (message.serverSignature != null && message.hasOwnProperty("serverSignature")) {
                properties._serverSignature = 1;
                if (
                    !(
                        (message.serverSignature &&
                            typeof message.serverSignature.length === "number") ||
                        $util.isString(message.serverSignature)
                    )
                )
                    return "serverSignature: buffer expected";
            }
            return null;
        };
        VerifiedNameCertificate.fromObject = function fromObject(object) {
            if (object instanceof $root.VnameCert.VerifiedNameCertificate) return object;
            var message = new $root.VnameCert.VerifiedNameCertificate();
            if (object.details != null)
                if (typeof object.details === "string")
                    $util.base64.decode(
                        object.details,
                        (message.details = $util.newBuffer($util.base64.length(object.details))),
                        0
                    );
                else if (object.details.length >= 0) message.details = object.details;
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
            if (object.serverSignature != null)
                if (typeof object.serverSignature === "string")
                    $util.base64.decode(
                        object.serverSignature,
                        (message.serverSignature = $util.newBuffer(
                            $util.base64.length(object.serverSignature)
                        )),
                        0
                    );
                else if (object.serverSignature.length >= 0)
                    message.serverSignature = object.serverSignature;
            return message;
        };
        VerifiedNameCertificate.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.details != null && message.hasOwnProperty("details")) {
                object.details =
                    options.bytes === String
                        ? $util.base64.encode(message.details, 0, message.details.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.details)
                          : message.details;
                if (options.oneofs) object._details = "details";
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
            if (message.serverSignature != null && message.hasOwnProperty("serverSignature")) {
                object.serverSignature =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.serverSignature,
                              0,
                              message.serverSignature.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.serverSignature)
                          : message.serverSignature;
                if (options.oneofs) object._serverSignature = "serverSignature";
            }
            return object;
        };
        VerifiedNameCertificate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        VerifiedNameCertificate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/VnameCert.VerifiedNameCertificate";
        };
        VerifiedNameCertificate.Details = (function () {
            function Details(properties) {
                this.localizedNames = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            Details.prototype.serial = null;
            Details.prototype.issuer = null;
            Details.prototype.verifiedName = null;
            Details.prototype.localizedNames = $util.emptyArray;
            Details.prototype.issueTime = null;
            var $oneOfFields;
            Object.defineProperty(Details.prototype, "_serial", {
                get: $util.oneOfGetter(($oneOfFields = ["serial"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_issuer", {
                get: $util.oneOfGetter(($oneOfFields = ["issuer"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_verifiedName", {
                get: $util.oneOfGetter(($oneOfFields = ["verifiedName"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_issueTime", {
                get: $util.oneOfGetter(($oneOfFields = ["issueTime"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Details.create = function create(properties) {
                return new Details(properties);
            };
            Details.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.serial != null && Object.hasOwnProperty.call(message, "serial"))
                    writer.uint32(8).uint64(message.serial);
                if (message.issuer != null && Object.hasOwnProperty.call(message, "issuer"))
                    writer.uint32(18).string(message.issuer);
                if (
                    message.verifiedName != null &&
                    Object.hasOwnProperty.call(message, "verifiedName")
                )
                    writer.uint32(34).string(message.verifiedName);
                if (message.localizedNames != null && message.localizedNames.length)
                    for (var i = 0; i < message.localizedNames.length; ++i)
                        $root.VnameCert.LocalizedName.encode(
                            message.localizedNames[i],
                            writer.uint32(66).fork()
                        ).ldelim();
                if (message.issueTime != null && Object.hasOwnProperty.call(message, "issueTime"))
                    writer.uint32(80).uint64(message.issueTime);
                return writer;
            };
            Details.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            Details.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.VnameCert.VerifiedNameCertificate.Details();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.serial = reader.uint64();
                            break;
                        }
                        case 2: {
                            message.issuer = reader.string();
                            break;
                        }
                        case 4: {
                            message.verifiedName = reader.string();
                            break;
                        }
                        case 8: {
                            if (!(message.localizedNames && message.localizedNames.length))
                                message.localizedNames = [];
                            message.localizedNames.push(
                                $root.VnameCert.LocalizedName.decode(reader, reader.uint32())
                            );
                            break;
                        }
                        case 10: {
                            message.issueTime = reader.uint64();
                            break;
                        }
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            Details.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            Details.verify = function verify(message) {
                if (typeof message !== "object" || message === null) return "object expected";
                var properties = {};
                if (message.serial != null && message.hasOwnProperty("serial")) {
                    properties._serial = 1;
                    if (
                        !$util.isInteger(message.serial) &&
                        !(
                            message.serial &&
                            $util.isInteger(message.serial.low) &&
                            $util.isInteger(message.serial.high)
                        )
                    )
                        return "serial: integer|Long expected";
                }
                if (message.issuer != null && message.hasOwnProperty("issuer")) {
                    properties._issuer = 1;
                    if (!$util.isString(message.issuer)) return "issuer: string expected";
                }
                if (message.verifiedName != null && message.hasOwnProperty("verifiedName")) {
                    properties._verifiedName = 1;
                    if (!$util.isString(message.verifiedName))
                        return "verifiedName: string expected";
                }
                if (message.localizedNames != null && message.hasOwnProperty("localizedNames")) {
                    if (!Array.isArray(message.localizedNames))
                        return "localizedNames: array expected";
                    for (var i = 0; i < message.localizedNames.length; ++i) {
                        var error = $root.VnameCert.LocalizedName.verify(message.localizedNames[i]);
                        if (error) return "localizedNames." + error;
                    }
                }
                if (message.issueTime != null && message.hasOwnProperty("issueTime")) {
                    properties._issueTime = 1;
                    if (
                        !$util.isInteger(message.issueTime) &&
                        !(
                            message.issueTime &&
                            $util.isInteger(message.issueTime.low) &&
                            $util.isInteger(message.issueTime.high)
                        )
                    )
                        return "issueTime: integer|Long expected";
                }
                return null;
            };
            Details.fromObject = function fromObject(object) {
                if (object instanceof $root.VnameCert.VerifiedNameCertificate.Details)
                    return object;
                var message = new $root.VnameCert.VerifiedNameCertificate.Details();
                if (object.serial != null)
                    if ($util.Long)
                        (message.serial = $util.Long.fromValue(object.serial)).unsigned = true;
                    else if (typeof object.serial === "string")
                        message.serial = parseInt(object.serial, 10);
                    else if (typeof object.serial === "number") message.serial = object.serial;
                    else if (typeof object.serial === "object")
                        message.serial = new $util.LongBits(
                            object.serial.low >>> 0,
                            object.serial.high >>> 0
                        ).toNumber(true);
                if (object.issuer != null) message.issuer = String(object.issuer);
                if (object.verifiedName != null) message.verifiedName = String(object.verifiedName);
                if (object.localizedNames) {
                    if (!Array.isArray(object.localizedNames))
                        throw TypeError(
                            ".VnameCert.VerifiedNameCertificate.Details.localizedNames: array expected"
                        );
                    message.localizedNames = [];
                    for (var i = 0; i < object.localizedNames.length; ++i) {
                        if (typeof object.localizedNames[i] !== "object")
                            throw TypeError(
                                ".VnameCert.VerifiedNameCertificate.Details.localizedNames: object expected"
                            );
                        message.localizedNames[i] = $root.VnameCert.LocalizedName.fromObject(
                            object.localizedNames[i]
                        );
                    }
                }
                if (object.issueTime != null)
                    if ($util.Long)
                        (message.issueTime = $util.Long.fromValue(object.issueTime)).unsigned =
                            true;
                    else if (typeof object.issueTime === "string")
                        message.issueTime = parseInt(object.issueTime, 10);
                    else if (typeof object.issueTime === "number")
                        message.issueTime = object.issueTime;
                    else if (typeof object.issueTime === "object")
                        message.issueTime = new $util.LongBits(
                            object.issueTime.low >>> 0,
                            object.issueTime.high >>> 0
                        ).toNumber(true);
                return message;
            };
            Details.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.localizedNames = [];
                if (message.serial != null && message.hasOwnProperty("serial")) {
                    if (typeof message.serial === "number")
                        object.serial =
                            options.longs === String ? String(message.serial) : message.serial;
                    else
                        object.serial =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.serial)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.serial.low >>> 0,
                                        message.serial.high >>> 0
                                    ).toNumber(true)
                                  : message.serial;
                    if (options.oneofs) object._serial = "serial";
                }
                if (message.issuer != null && message.hasOwnProperty("issuer")) {
                    object.issuer = message.issuer;
                    if (options.oneofs) object._issuer = "issuer";
                }
                if (message.verifiedName != null && message.hasOwnProperty("verifiedName")) {
                    object.verifiedName = message.verifiedName;
                    if (options.oneofs) object._verifiedName = "verifiedName";
                }
                if (message.localizedNames && message.localizedNames.length) {
                    object.localizedNames = [];
                    for (var j = 0; j < message.localizedNames.length; ++j)
                        object.localizedNames[j] = $root.VnameCert.LocalizedName.toObject(
                            message.localizedNames[j],
                            options
                        );
                }
                if (message.issueTime != null && message.hasOwnProperty("issueTime")) {
                    if (typeof message.issueTime === "number")
                        object.issueTime =
                            options.longs === String
                                ? String(message.issueTime)
                                : message.issueTime;
                    else
                        object.issueTime =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.issueTime)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.issueTime.low >>> 0,
                                        message.issueTime.high >>> 0
                                    ).toNumber(true)
                                  : message.issueTime;
                    if (options.oneofs) object._issueTime = "issueTime";
                }
                return object;
            };
            Details.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            Details.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/VnameCert.VerifiedNameCertificate.Details";
            };
            return Details;
        })();
        return VerifiedNameCertificate;
    })();
    VnameCert.LocalizedName = (function () {
        function LocalizedName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        LocalizedName.prototype.lg = null;
        LocalizedName.prototype.lc = null;
        LocalizedName.prototype.verifiedName = null;
        var $oneOfFields;
        Object.defineProperty(LocalizedName.prototype, "_lg", {
            get: $util.oneOfGetter(($oneOfFields = ["lg"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LocalizedName.prototype, "_lc", {
            get: $util.oneOfGetter(($oneOfFields = ["lc"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(LocalizedName.prototype, "_verifiedName", {
            get: $util.oneOfGetter(($oneOfFields = ["verifiedName"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        LocalizedName.create = function create(properties) {
            return new LocalizedName(properties);
        };
        LocalizedName.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.lg != null && Object.hasOwnProperty.call(message, "lg"))
                writer.uint32(10).string(message.lg);
            if (message.lc != null && Object.hasOwnProperty.call(message, "lc"))
                writer.uint32(18).string(message.lc);
            if (message.verifiedName != null && Object.hasOwnProperty.call(message, "verifiedName"))
                writer.uint32(26).string(message.verifiedName);
            return writer;
        };
        LocalizedName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        LocalizedName.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.VnameCert.LocalizedName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.lg = reader.string();
                        break;
                    }
                    case 2: {
                        message.lc = reader.string();
                        break;
                    }
                    case 3: {
                        message.verifiedName = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        LocalizedName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        LocalizedName.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.lg != null && message.hasOwnProperty("lg")) {
                properties._lg = 1;
                if (!$util.isString(message.lg)) return "lg: string expected";
            }
            if (message.lc != null && message.hasOwnProperty("lc")) {
                properties._lc = 1;
                if (!$util.isString(message.lc)) return "lc: string expected";
            }
            if (message.verifiedName != null && message.hasOwnProperty("verifiedName")) {
                properties._verifiedName = 1;
                if (!$util.isString(message.verifiedName)) return "verifiedName: string expected";
            }
            return null;
        };
        LocalizedName.fromObject = function fromObject(object) {
            if (object instanceof $root.VnameCert.LocalizedName) return object;
            var message = new $root.VnameCert.LocalizedName();
            if (object.lg != null) message.lg = String(object.lg);
            if (object.lc != null) message.lc = String(object.lc);
            if (object.verifiedName != null) message.verifiedName = String(object.verifiedName);
            return message;
        };
        LocalizedName.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.lg != null && message.hasOwnProperty("lg")) {
                object.lg = message.lg;
                if (options.oneofs) object._lg = "lg";
            }
            if (message.lc != null && message.hasOwnProperty("lc")) {
                object.lc = message.lc;
                if (options.oneofs) object._lc = "lc";
            }
            if (message.verifiedName != null && message.hasOwnProperty("verifiedName")) {
                object.verifiedName = message.verifiedName;
                if (options.oneofs) object._verifiedName = "verifiedName";
            }
            return object;
        };
        LocalizedName.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        LocalizedName.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/VnameCert.LocalizedName";
        };
        return LocalizedName;
    })();
    return VnameCert;
})();
module.exports = $root;

"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.Adv = (function () {
    var Adv = {};
    Adv.ADVSignedDeviceIdentityHMAC = (function () {
        function ADVSignedDeviceIdentityHMAC(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ADVSignedDeviceIdentityHMAC.prototype.details = null;
        ADVSignedDeviceIdentityHMAC.prototype.hmac = null;
        ADVSignedDeviceIdentityHMAC.prototype.accountType = null;
        var $oneOfFields;
        Object.defineProperty(ADVSignedDeviceIdentityHMAC.prototype, "_details", {
            get: $util.oneOfGetter(($oneOfFields = ["details"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedDeviceIdentityHMAC.prototype, "_hmac", {
            get: $util.oneOfGetter(($oneOfFields = ["hmac"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedDeviceIdentityHMAC.prototype, "_accountType", {
            get: $util.oneOfGetter(($oneOfFields = ["accountType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ADVSignedDeviceIdentityHMAC.create = function create(properties) {
            return new ADVSignedDeviceIdentityHMAC(properties);
        };
        ADVSignedDeviceIdentityHMAC.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                writer.uint32(10).bytes(message.details);
            if (message.hmac != null && Object.hasOwnProperty.call(message, "hmac"))
                writer.uint32(18).bytes(message.hmac);
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                writer.uint32(24).int32(message.accountType);
            return writer;
        };
        ADVSignedDeviceIdentityHMAC.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ADVSignedDeviceIdentityHMAC.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Adv.ADVSignedDeviceIdentityHMAC();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.details = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.hmac = reader.bytes();
                        break;
                    }
                    case 3: {
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
        ADVSignedDeviceIdentityHMAC.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ADVSignedDeviceIdentityHMAC.verify = function verify(message) {
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
            if (message.hmac != null && message.hasOwnProperty("hmac")) {
                properties._hmac = 1;
                if (
                    !(
                        (message.hmac && typeof message.hmac.length === "number") ||
                        $util.isString(message.hmac)
                    )
                )
                    return "hmac: buffer expected";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                properties._accountType = 1;
                switch (message.accountType) {
                    default:
                        return "accountType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        ADVSignedDeviceIdentityHMAC.fromObject = function fromObject(object) {
            if (object instanceof $root.Adv.ADVSignedDeviceIdentityHMAC) return object;
            var message = new $root.Adv.ADVSignedDeviceIdentityHMAC();
            if (object.details != null)
                if (typeof object.details === "string")
                    $util.base64.decode(
                        object.details,
                        (message.details = $util.newBuffer($util.base64.length(object.details))),
                        0
                    );
                else if (object.details.length >= 0) message.details = object.details;
            if (object.hmac != null)
                if (typeof object.hmac === "string")
                    $util.base64.decode(
                        object.hmac,
                        (message.hmac = $util.newBuffer($util.base64.length(object.hmac))),
                        0
                    );
                else if (object.hmac.length >= 0) message.hmac = object.hmac;
            switch (object.accountType) {
                default:
                    if (typeof object.accountType === "number") {
                        message.accountType = object.accountType;
                        break;
                    }
                    break;
                case "E2EE":
                case 0:
                    message.accountType = 0;
                    break;
                case "HOSTED":
                case 1:
                    message.accountType = 1;
                    break;
            }
            return message;
        };
        ADVSignedDeviceIdentityHMAC.toObject = function toObject(message, options) {
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
            if (message.hmac != null && message.hasOwnProperty("hmac")) {
                object.hmac =
                    options.bytes === String
                        ? $util.base64.encode(message.hmac, 0, message.hmac.length)
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.hmac)
                          : message.hmac;
                if (options.oneofs) object._hmac = "hmac";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                object.accountType =
                    options.enums === String
                        ? $root.Adv.ADVEncryptionType[message.accountType] === undefined
                            ? message.accountType
                            : $root.Adv.ADVEncryptionType[message.accountType]
                        : message.accountType;
                if (options.oneofs) object._accountType = "accountType";
            }
            return object;
        };
        ADVSignedDeviceIdentityHMAC.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ADVSignedDeviceIdentityHMAC.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Adv.ADVSignedDeviceIdentityHMAC";
        };
        return ADVSignedDeviceIdentityHMAC;
    })();
    Adv.ADVSignedDeviceIdentity = (function () {
        function ADVSignedDeviceIdentity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ADVSignedDeviceIdentity.prototype.details = null;
        ADVSignedDeviceIdentity.prototype.accountSignatureKey = null;
        ADVSignedDeviceIdentity.prototype.accountSignature = null;
        ADVSignedDeviceIdentity.prototype.deviceSignature = null;
        var $oneOfFields;
        Object.defineProperty(ADVSignedDeviceIdentity.prototype, "_details", {
            get: $util.oneOfGetter(($oneOfFields = ["details"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedDeviceIdentity.prototype, "_accountSignatureKey", {
            get: $util.oneOfGetter(($oneOfFields = ["accountSignatureKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedDeviceIdentity.prototype, "_accountSignature", {
            get: $util.oneOfGetter(($oneOfFields = ["accountSignature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedDeviceIdentity.prototype, "_deviceSignature", {
            get: $util.oneOfGetter(($oneOfFields = ["deviceSignature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ADVSignedDeviceIdentity.create = function create(properties) {
            return new ADVSignedDeviceIdentity(properties);
        };
        ADVSignedDeviceIdentity.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                writer.uint32(10).bytes(message.details);
            if (
                message.accountSignatureKey != null &&
                Object.hasOwnProperty.call(message, "accountSignatureKey")
            )
                writer.uint32(18).bytes(message.accountSignatureKey);
            if (
                message.accountSignature != null &&
                Object.hasOwnProperty.call(message, "accountSignature")
            )
                writer.uint32(26).bytes(message.accountSignature);
            if (
                message.deviceSignature != null &&
                Object.hasOwnProperty.call(message, "deviceSignature")
            )
                writer.uint32(34).bytes(message.deviceSignature);
            return writer;
        };
        ADVSignedDeviceIdentity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ADVSignedDeviceIdentity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Adv.ADVSignedDeviceIdentity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.details = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.accountSignatureKey = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.accountSignature = reader.bytes();
                        break;
                    }
                    case 4: {
                        message.deviceSignature = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ADVSignedDeviceIdentity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ADVSignedDeviceIdentity.verify = function verify(message) {
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
            if (
                message.accountSignatureKey != null &&
                message.hasOwnProperty("accountSignatureKey")
            ) {
                properties._accountSignatureKey = 1;
                if (
                    !(
                        (message.accountSignatureKey &&
                            typeof message.accountSignatureKey.length === "number") ||
                        $util.isString(message.accountSignatureKey)
                    )
                )
                    return "accountSignatureKey: buffer expected";
            }
            if (message.accountSignature != null && message.hasOwnProperty("accountSignature")) {
                properties._accountSignature = 1;
                if (
                    !(
                        (message.accountSignature &&
                            typeof message.accountSignature.length === "number") ||
                        $util.isString(message.accountSignature)
                    )
                )
                    return "accountSignature: buffer expected";
            }
            if (message.deviceSignature != null && message.hasOwnProperty("deviceSignature")) {
                properties._deviceSignature = 1;
                if (
                    !(
                        (message.deviceSignature &&
                            typeof message.deviceSignature.length === "number") ||
                        $util.isString(message.deviceSignature)
                    )
                )
                    return "deviceSignature: buffer expected";
            }
            return null;
        };
        ADVSignedDeviceIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.Adv.ADVSignedDeviceIdentity) return object;
            var message = new $root.Adv.ADVSignedDeviceIdentity();
            if (object.details != null)
                if (typeof object.details === "string")
                    $util.base64.decode(
                        object.details,
                        (message.details = $util.newBuffer($util.base64.length(object.details))),
                        0
                    );
                else if (object.details.length >= 0) message.details = object.details;
            if (object.accountSignatureKey != null)
                if (typeof object.accountSignatureKey === "string")
                    $util.base64.decode(
                        object.accountSignatureKey,
                        (message.accountSignatureKey = $util.newBuffer(
                            $util.base64.length(object.accountSignatureKey)
                        )),
                        0
                    );
                else if (object.accountSignatureKey.length >= 0)
                    message.accountSignatureKey = object.accountSignatureKey;
            if (object.accountSignature != null)
                if (typeof object.accountSignature === "string")
                    $util.base64.decode(
                        object.accountSignature,
                        (message.accountSignature = $util.newBuffer(
                            $util.base64.length(object.accountSignature)
                        )),
                        0
                    );
                else if (object.accountSignature.length >= 0)
                    message.accountSignature = object.accountSignature;
            if (object.deviceSignature != null)
                if (typeof object.deviceSignature === "string")
                    $util.base64.decode(
                        object.deviceSignature,
                        (message.deviceSignature = $util.newBuffer(
                            $util.base64.length(object.deviceSignature)
                        )),
                        0
                    );
                else if (object.deviceSignature.length >= 0)
                    message.deviceSignature = object.deviceSignature;
            return message;
        };
        ADVSignedDeviceIdentity.toObject = function toObject(message, options) {
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
            if (
                message.accountSignatureKey != null &&
                message.hasOwnProperty("accountSignatureKey")
            ) {
                object.accountSignatureKey =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.accountSignatureKey,
                              0,
                              message.accountSignatureKey.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.accountSignatureKey)
                          : message.accountSignatureKey;
                if (options.oneofs) object._accountSignatureKey = "accountSignatureKey";
            }
            if (message.accountSignature != null && message.hasOwnProperty("accountSignature")) {
                object.accountSignature =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.accountSignature,
                              0,
                              message.accountSignature.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.accountSignature)
                          : message.accountSignature;
                if (options.oneofs) object._accountSignature = "accountSignature";
            }
            if (message.deviceSignature != null && message.hasOwnProperty("deviceSignature")) {
                object.deviceSignature =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.deviceSignature,
                              0,
                              message.deviceSignature.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.deviceSignature)
                          : message.deviceSignature;
                if (options.oneofs) object._deviceSignature = "deviceSignature";
            }
            return object;
        };
        ADVSignedDeviceIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ADVSignedDeviceIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Adv.ADVSignedDeviceIdentity";
        };
        return ADVSignedDeviceIdentity;
    })();
    Adv.ADVDeviceIdentity = (function () {
        function ADVDeviceIdentity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ADVDeviceIdentity.prototype.rawId = null;
        ADVDeviceIdentity.prototype.timestamp = null;
        ADVDeviceIdentity.prototype.keyIndex = null;
        ADVDeviceIdentity.prototype.accountType = null;
        ADVDeviceIdentity.prototype.deviceType = null;
        var $oneOfFields;
        Object.defineProperty(ADVDeviceIdentity.prototype, "_rawId", {
            get: $util.oneOfGetter(($oneOfFields = ["rawId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVDeviceIdentity.prototype, "_timestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVDeviceIdentity.prototype, "_keyIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["keyIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVDeviceIdentity.prototype, "_accountType", {
            get: $util.oneOfGetter(($oneOfFields = ["accountType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVDeviceIdentity.prototype, "_deviceType", {
            get: $util.oneOfGetter(($oneOfFields = ["deviceType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ADVDeviceIdentity.create = function create(properties) {
            return new ADVDeviceIdentity(properties);
        };
        ADVDeviceIdentity.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.rawId != null && Object.hasOwnProperty.call(message, "rawId"))
                writer.uint32(8).uint32(message.rawId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(16).uint64(message.timestamp);
            if (message.keyIndex != null && Object.hasOwnProperty.call(message, "keyIndex"))
                writer.uint32(24).uint32(message.keyIndex);
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                writer.uint32(32).int32(message.accountType);
            if (message.deviceType != null && Object.hasOwnProperty.call(message, "deviceType"))
                writer.uint32(40).int32(message.deviceType);
            return writer;
        };
        ADVDeviceIdentity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ADVDeviceIdentity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Adv.ADVDeviceIdentity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.rawId = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                    case 3: {
                        message.keyIndex = reader.uint32();
                        break;
                    }
                    case 4: {
                        message.accountType = reader.int32();
                        break;
                    }
                    case 5: {
                        message.deviceType = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ADVDeviceIdentity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ADVDeviceIdentity.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.rawId != null && message.hasOwnProperty("rawId")) {
                properties._rawId = 1;
                if (!$util.isInteger(message.rawId)) return "rawId: integer expected";
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
            if (message.keyIndex != null && message.hasOwnProperty("keyIndex")) {
                properties._keyIndex = 1;
                if (!$util.isInteger(message.keyIndex)) return "keyIndex: integer expected";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                properties._accountType = 1;
                switch (message.accountType) {
                    default:
                        return "accountType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            if (message.deviceType != null && message.hasOwnProperty("deviceType")) {
                properties._deviceType = 1;
                switch (message.deviceType) {
                    default:
                        return "deviceType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        ADVDeviceIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.Adv.ADVDeviceIdentity) return object;
            var message = new $root.Adv.ADVDeviceIdentity();
            if (object.rawId != null) message.rawId = object.rawId >>> 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number") message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(
                        object.timestamp.low >>> 0,
                        object.timestamp.high >>> 0
                    ).toNumber(true);
            if (object.keyIndex != null) message.keyIndex = object.keyIndex >>> 0;
            switch (object.accountType) {
                default:
                    if (typeof object.accountType === "number") {
                        message.accountType = object.accountType;
                        break;
                    }
                    break;
                case "E2EE":
                case 0:
                    message.accountType = 0;
                    break;
                case "HOSTED":
                case 1:
                    message.accountType = 1;
                    break;
            }
            switch (object.deviceType) {
                default:
                    if (typeof object.deviceType === "number") {
                        message.deviceType = object.deviceType;
                        break;
                    }
                    break;
                case "E2EE":
                case 0:
                    message.deviceType = 0;
                    break;
                case "HOSTED":
                case 1:
                    message.deviceType = 1;
                    break;
            }
            return message;
        };
        ADVDeviceIdentity.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.rawId != null && message.hasOwnProperty("rawId")) {
                object.rawId = message.rawId;
                if (options.oneofs) object._rawId = "rawId";
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
                                ).toNumber(true)
                              : message.timestamp;
                if (options.oneofs) object._timestamp = "timestamp";
            }
            if (message.keyIndex != null && message.hasOwnProperty("keyIndex")) {
                object.keyIndex = message.keyIndex;
                if (options.oneofs) object._keyIndex = "keyIndex";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                object.accountType =
                    options.enums === String
                        ? $root.Adv.ADVEncryptionType[message.accountType] === undefined
                            ? message.accountType
                            : $root.Adv.ADVEncryptionType[message.accountType]
                        : message.accountType;
                if (options.oneofs) object._accountType = "accountType";
            }
            if (message.deviceType != null && message.hasOwnProperty("deviceType")) {
                object.deviceType =
                    options.enums === String
                        ? $root.Adv.ADVEncryptionType[message.deviceType] === undefined
                            ? message.deviceType
                            : $root.Adv.ADVEncryptionType[message.deviceType]
                        : message.deviceType;
                if (options.oneofs) object._deviceType = "deviceType";
            }
            return object;
        };
        ADVDeviceIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ADVDeviceIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Adv.ADVDeviceIdentity";
        };
        return ADVDeviceIdentity;
    })();
    Adv.ADVSignedKeyIndexList = (function () {
        function ADVSignedKeyIndexList(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ADVSignedKeyIndexList.prototype.details = null;
        ADVSignedKeyIndexList.prototype.accountSignature = null;
        ADVSignedKeyIndexList.prototype.accountSignatureKey = null;
        var $oneOfFields;
        Object.defineProperty(ADVSignedKeyIndexList.prototype, "_details", {
            get: $util.oneOfGetter(($oneOfFields = ["details"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedKeyIndexList.prototype, "_accountSignature", {
            get: $util.oneOfGetter(($oneOfFields = ["accountSignature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVSignedKeyIndexList.prototype, "_accountSignatureKey", {
            get: $util.oneOfGetter(($oneOfFields = ["accountSignatureKey"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ADVSignedKeyIndexList.create = function create(properties) {
            return new ADVSignedKeyIndexList(properties);
        };
        ADVSignedKeyIndexList.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                writer.uint32(10).bytes(message.details);
            if (
                message.accountSignature != null &&
                Object.hasOwnProperty.call(message, "accountSignature")
            )
                writer.uint32(18).bytes(message.accountSignature);
            if (
                message.accountSignatureKey != null &&
                Object.hasOwnProperty.call(message, "accountSignatureKey")
            )
                writer.uint32(26).bytes(message.accountSignatureKey);
            return writer;
        };
        ADVSignedKeyIndexList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ADVSignedKeyIndexList.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Adv.ADVSignedKeyIndexList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.details = reader.bytes();
                        break;
                    }
                    case 2: {
                        message.accountSignature = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.accountSignatureKey = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        ADVSignedKeyIndexList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ADVSignedKeyIndexList.verify = function verify(message) {
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
            if (message.accountSignature != null && message.hasOwnProperty("accountSignature")) {
                properties._accountSignature = 1;
                if (
                    !(
                        (message.accountSignature &&
                            typeof message.accountSignature.length === "number") ||
                        $util.isString(message.accountSignature)
                    )
                )
                    return "accountSignature: buffer expected";
            }
            if (
                message.accountSignatureKey != null &&
                message.hasOwnProperty("accountSignatureKey")
            ) {
                properties._accountSignatureKey = 1;
                if (
                    !(
                        (message.accountSignatureKey &&
                            typeof message.accountSignatureKey.length === "number") ||
                        $util.isString(message.accountSignatureKey)
                    )
                )
                    return "accountSignatureKey: buffer expected";
            }
            return null;
        };
        ADVSignedKeyIndexList.fromObject = function fromObject(object) {
            if (object instanceof $root.Adv.ADVSignedKeyIndexList) return object;
            var message = new $root.Adv.ADVSignedKeyIndexList();
            if (object.details != null)
                if (typeof object.details === "string")
                    $util.base64.decode(
                        object.details,
                        (message.details = $util.newBuffer($util.base64.length(object.details))),
                        0
                    );
                else if (object.details.length >= 0) message.details = object.details;
            if (object.accountSignature != null)
                if (typeof object.accountSignature === "string")
                    $util.base64.decode(
                        object.accountSignature,
                        (message.accountSignature = $util.newBuffer(
                            $util.base64.length(object.accountSignature)
                        )),
                        0
                    );
                else if (object.accountSignature.length >= 0)
                    message.accountSignature = object.accountSignature;
            if (object.accountSignatureKey != null)
                if (typeof object.accountSignatureKey === "string")
                    $util.base64.decode(
                        object.accountSignatureKey,
                        (message.accountSignatureKey = $util.newBuffer(
                            $util.base64.length(object.accountSignatureKey)
                        )),
                        0
                    );
                else if (object.accountSignatureKey.length >= 0)
                    message.accountSignatureKey = object.accountSignatureKey;
            return message;
        };
        ADVSignedKeyIndexList.toObject = function toObject(message, options) {
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
            if (message.accountSignature != null && message.hasOwnProperty("accountSignature")) {
                object.accountSignature =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.accountSignature,
                              0,
                              message.accountSignature.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.accountSignature)
                          : message.accountSignature;
                if (options.oneofs) object._accountSignature = "accountSignature";
            }
            if (
                message.accountSignatureKey != null &&
                message.hasOwnProperty("accountSignatureKey")
            ) {
                object.accountSignatureKey =
                    options.bytes === String
                        ? $util.base64.encode(
                              message.accountSignatureKey,
                              0,
                              message.accountSignatureKey.length
                          )
                        : options.bytes === Array
                          ? Array.prototype.slice.call(message.accountSignatureKey)
                          : message.accountSignatureKey;
                if (options.oneofs) object._accountSignatureKey = "accountSignatureKey";
            }
            return object;
        };
        ADVSignedKeyIndexList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ADVSignedKeyIndexList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Adv.ADVSignedKeyIndexList";
        };
        return ADVSignedKeyIndexList;
    })();
    Adv.ADVKeyIndexList = (function () {
        function ADVKeyIndexList(properties) {
            this.validIndexes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        ADVKeyIndexList.prototype.rawId = null;
        ADVKeyIndexList.prototype.timestamp = null;
        ADVKeyIndexList.prototype.currentIndex = null;
        ADVKeyIndexList.prototype.validIndexes = $util.emptyArray;
        ADVKeyIndexList.prototype.accountType = null;
        var $oneOfFields;
        Object.defineProperty(ADVKeyIndexList.prototype, "_rawId", {
            get: $util.oneOfGetter(($oneOfFields = ["rawId"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVKeyIndexList.prototype, "_timestamp", {
            get: $util.oneOfGetter(($oneOfFields = ["timestamp"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVKeyIndexList.prototype, "_currentIndex", {
            get: $util.oneOfGetter(($oneOfFields = ["currentIndex"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(ADVKeyIndexList.prototype, "_accountType", {
            get: $util.oneOfGetter(($oneOfFields = ["accountType"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        ADVKeyIndexList.create = function create(properties) {
            return new ADVKeyIndexList(properties);
        };
        ADVKeyIndexList.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.rawId != null && Object.hasOwnProperty.call(message, "rawId"))
                writer.uint32(8).uint32(message.rawId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(16).uint64(message.timestamp);
            if (message.currentIndex != null && Object.hasOwnProperty.call(message, "currentIndex"))
                writer.uint32(24).uint32(message.currentIndex);
            if (message.validIndexes != null && message.validIndexes.length) {
                writer.uint32(34).fork();
                for (var i = 0; i < message.validIndexes.length; ++i)
                    writer.uint32(message.validIndexes[i]);
                writer.ldelim();
            }
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                writer.uint32(40).int32(message.accountType);
            return writer;
        };
        ADVKeyIndexList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        ADVKeyIndexList.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Adv.ADVKeyIndexList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.rawId = reader.uint32();
                        break;
                    }
                    case 2: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                    case 3: {
                        message.currentIndex = reader.uint32();
                        break;
                    }
                    case 4: {
                        if (!(message.validIndexes && message.validIndexes.length))
                            message.validIndexes = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) message.validIndexes.push(reader.uint32());
                        } else message.validIndexes.push(reader.uint32());
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
        ADVKeyIndexList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        ADVKeyIndexList.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.rawId != null && message.hasOwnProperty("rawId")) {
                properties._rawId = 1;
                if (!$util.isInteger(message.rawId)) return "rawId: integer expected";
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
            if (message.currentIndex != null && message.hasOwnProperty("currentIndex")) {
                properties._currentIndex = 1;
                if (!$util.isInteger(message.currentIndex)) return "currentIndex: integer expected";
            }
            if (message.validIndexes != null && message.hasOwnProperty("validIndexes")) {
                if (!Array.isArray(message.validIndexes)) return "validIndexes: array expected";
                for (var i = 0; i < message.validIndexes.length; ++i)
                    if (!$util.isInteger(message.validIndexes[i]))
                        return "validIndexes: integer[] expected";
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                properties._accountType = 1;
                switch (message.accountType) {
                    default:
                        return "accountType: enum value expected";
                    case 0:
                    case 1:
                        break;
                }
            }
            return null;
        };
        ADVKeyIndexList.fromObject = function fromObject(object) {
            if (object instanceof $root.Adv.ADVKeyIndexList) return object;
            var message = new $root.Adv.ADVKeyIndexList();
            if (object.rawId != null) message.rawId = object.rawId >>> 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number") message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(
                        object.timestamp.low >>> 0,
                        object.timestamp.high >>> 0
                    ).toNumber(true);
            if (object.currentIndex != null) message.currentIndex = object.currentIndex >>> 0;
            if (object.validIndexes) {
                if (!Array.isArray(object.validIndexes))
                    throw TypeError(".Adv.ADVKeyIndexList.validIndexes: array expected");
                message.validIndexes = [];
                for (var i = 0; i < object.validIndexes.length; ++i)
                    message.validIndexes[i] = object.validIndexes[i] >>> 0;
            }
            switch (object.accountType) {
                default:
                    if (typeof object.accountType === "number") {
                        message.accountType = object.accountType;
                        break;
                    }
                    break;
                case "E2EE":
                case 0:
                    message.accountType = 0;
                    break;
                case "HOSTED":
                case 1:
                    message.accountType = 1;
                    break;
            }
            return message;
        };
        ADVKeyIndexList.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.validIndexes = [];
            if (message.rawId != null && message.hasOwnProperty("rawId")) {
                object.rawId = message.rawId;
                if (options.oneofs) object._rawId = "rawId";
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
                                ).toNumber(true)
                              : message.timestamp;
                if (options.oneofs) object._timestamp = "timestamp";
            }
            if (message.currentIndex != null && message.hasOwnProperty("currentIndex")) {
                object.currentIndex = message.currentIndex;
                if (options.oneofs) object._currentIndex = "currentIndex";
            }
            if (message.validIndexes && message.validIndexes.length) {
                object.validIndexes = [];
                for (var j = 0; j < message.validIndexes.length; ++j)
                    object.validIndexes[j] = message.validIndexes[j];
            }
            if (message.accountType != null && message.hasOwnProperty("accountType")) {
                object.accountType =
                    options.enums === String
                        ? $root.Adv.ADVEncryptionType[message.accountType] === undefined
                            ? message.accountType
                            : $root.Adv.ADVEncryptionType[message.accountType]
                        : message.accountType;
                if (options.oneofs) object._accountType = "accountType";
            }
            return object;
        };
        ADVKeyIndexList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        ADVKeyIndexList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Adv.ADVKeyIndexList";
        };
        return ADVKeyIndexList;
    })();
    Adv.ADVEncryptionType = (function () {
        var valuesById = {},
            values = Object.create(valuesById);
        values[(valuesById[0] = "E2EE")] = 0;
        values[(valuesById[1] = "HOSTED")] = 1;
        return values;
    })();
    return Adv;
})();
module.exports = $root;

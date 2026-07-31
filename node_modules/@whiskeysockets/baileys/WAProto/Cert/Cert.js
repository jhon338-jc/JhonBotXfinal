"use strict";
var $protobuf = require("protobufjs/minimal");
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.Cert = (function () {
    var Cert = {};
    Cert.CertChain = (function () {
        function CertChain(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        CertChain.prototype.leaf = null;
        CertChain.prototype.intermediate = null;
        var $oneOfFields;
        Object.defineProperty(CertChain.prototype, "_leaf", {
            get: $util.oneOfGetter(($oneOfFields = ["leaf"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(CertChain.prototype, "_intermediate", {
            get: $util.oneOfGetter(($oneOfFields = ["intermediate"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        CertChain.create = function create(properties) {
            return new CertChain(properties);
        };
        CertChain.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.leaf != null && Object.hasOwnProperty.call(message, "leaf"))
                $root.Cert.CertChain.NoiseCertificate.encode(
                    message.leaf,
                    writer.uint32(10).fork()
                ).ldelim();
            if (message.intermediate != null && Object.hasOwnProperty.call(message, "intermediate"))
                $root.Cert.CertChain.NoiseCertificate.encode(
                    message.intermediate,
                    writer.uint32(18).fork()
                ).ldelim();
            return writer;
        };
        CertChain.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        CertChain.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Cert.CertChain();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error) break;
                switch (tag >>> 3) {
                    case 1: {
                        message.leaf = $root.Cert.CertChain.NoiseCertificate.decode(
                            reader,
                            reader.uint32()
                        );
                        break;
                    }
                    case 2: {
                        message.intermediate = $root.Cert.CertChain.NoiseCertificate.decode(
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
        CertChain.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        CertChain.verify = function verify(message) {
            if (typeof message !== "object" || message === null) return "object expected";
            var properties = {};
            if (message.leaf != null && message.hasOwnProperty("leaf")) {
                properties._leaf = 1;
                {
                    var error = $root.Cert.CertChain.NoiseCertificate.verify(message.leaf);
                    if (error) return "leaf." + error;
                }
            }
            if (message.intermediate != null && message.hasOwnProperty("intermediate")) {
                properties._intermediate = 1;
                {
                    var error = $root.Cert.CertChain.NoiseCertificate.verify(message.intermediate);
                    if (error) return "intermediate." + error;
                }
            }
            return null;
        };
        CertChain.fromObject = function fromObject(object) {
            if (object instanceof $root.Cert.CertChain) return object;
            var message = new $root.Cert.CertChain();
            if (object.leaf != null) {
                if (typeof object.leaf !== "object")
                    throw TypeError(".Cert.CertChain.leaf: object expected");
                message.leaf = $root.Cert.CertChain.NoiseCertificate.fromObject(object.leaf);
            }
            if (object.intermediate != null) {
                if (typeof object.intermediate !== "object")
                    throw TypeError(".Cert.CertChain.intermediate: object expected");
                message.intermediate = $root.Cert.CertChain.NoiseCertificate.fromObject(
                    object.intermediate
                );
            }
            return message;
        };
        CertChain.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.leaf != null && message.hasOwnProperty("leaf")) {
                object.leaf = $root.Cert.CertChain.NoiseCertificate.toObject(message.leaf, options);
                if (options.oneofs) object._leaf = "leaf";
            }
            if (message.intermediate != null && message.hasOwnProperty("intermediate")) {
                object.intermediate = $root.Cert.CertChain.NoiseCertificate.toObject(
                    message.intermediate,
                    options
                );
                if (options.oneofs) object._intermediate = "intermediate";
            }
            return object;
        };
        CertChain.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        CertChain.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Cert.CertChain";
        };
        CertChain.NoiseCertificate = (function () {
            function NoiseCertificate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            NoiseCertificate.prototype.details = null;
            NoiseCertificate.prototype.signature = null;
            var $oneOfFields;
            Object.defineProperty(NoiseCertificate.prototype, "_details", {
                get: $util.oneOfGetter(($oneOfFields = ["details"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(NoiseCertificate.prototype, "_signature", {
                get: $util.oneOfGetter(($oneOfFields = ["signature"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            NoiseCertificate.create = function create(properties) {
                return new NoiseCertificate(properties);
            };
            NoiseCertificate.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                    writer.uint32(10).bytes(message.details);
                if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                    writer.uint32(18).bytes(message.signature);
                return writer;
            };
            NoiseCertificate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            NoiseCertificate.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.Cert.CertChain.NoiseCertificate();
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
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            NoiseCertificate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            NoiseCertificate.verify = function verify(message) {
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
                return null;
            };
            NoiseCertificate.fromObject = function fromObject(object) {
                if (object instanceof $root.Cert.CertChain.NoiseCertificate) return object;
                var message = new $root.Cert.CertChain.NoiseCertificate();
                if (object.details != null)
                    if (typeof object.details === "string")
                        $util.base64.decode(
                            object.details,
                            (message.details = $util.newBuffer(
                                $util.base64.length(object.details)
                            )),
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
                return message;
            };
            NoiseCertificate.toObject = function toObject(message, options) {
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
                return object;
            };
            NoiseCertificate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            NoiseCertificate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/Cert.CertChain.NoiseCertificate";
            };
            NoiseCertificate.Details = (function () {
                function Details(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
                Details.prototype.serial = null;
                Details.prototype.issuerSerial = null;
                Details.prototype.key = null;
                Details.prototype.notBefore = null;
                Details.prototype.notAfter = null;
                var $oneOfFields;
                Object.defineProperty(Details.prototype, "_serial", {
                    get: $util.oneOfGetter(($oneOfFields = ["serial"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Details.prototype, "_issuerSerial", {
                    get: $util.oneOfGetter(($oneOfFields = ["issuerSerial"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Details.prototype, "_key", {
                    get: $util.oneOfGetter(($oneOfFields = ["key"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Details.prototype, "_notBefore", {
                    get: $util.oneOfGetter(($oneOfFields = ["notBefore"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Object.defineProperty(Details.prototype, "_notAfter", {
                    get: $util.oneOfGetter(($oneOfFields = ["notAfter"])),
                    set: $util.oneOfSetter($oneOfFields),
                });
                Details.create = function create(properties) {
                    return new Details(properties);
                };
                Details.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.serial != null && Object.hasOwnProperty.call(message, "serial"))
                        writer.uint32(8).uint32(message.serial);
                    if (
                        message.issuerSerial != null &&
                        Object.hasOwnProperty.call(message, "issuerSerial")
                    )
                        writer.uint32(16).uint32(message.issuerSerial);
                    if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                        writer.uint32(26).bytes(message.key);
                    if (
                        message.notBefore != null &&
                        Object.hasOwnProperty.call(message, "notBefore")
                    )
                        writer.uint32(32).uint64(message.notBefore);
                    if (message.notAfter != null && Object.hasOwnProperty.call(message, "notAfter"))
                        writer.uint32(40).uint64(message.notAfter);
                    return writer;
                };
                Details.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
                Details.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message = new $root.Cert.CertChain.NoiseCertificate.Details();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error) break;
                        switch (tag >>> 3) {
                            case 1: {
                                message.serial = reader.uint32();
                                break;
                            }
                            case 2: {
                                message.issuerSerial = reader.uint32();
                                break;
                            }
                            case 3: {
                                message.key = reader.bytes();
                                break;
                            }
                            case 4: {
                                message.notBefore = reader.uint64();
                                break;
                            }
                            case 5: {
                                message.notAfter = reader.uint64();
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
                        if (!$util.isInteger(message.serial)) return "serial: integer expected";
                    }
                    if (message.issuerSerial != null && message.hasOwnProperty("issuerSerial")) {
                        properties._issuerSerial = 1;
                        if (!$util.isInteger(message.issuerSerial))
                            return "issuerSerial: integer expected";
                    }
                    if (message.key != null && message.hasOwnProperty("key")) {
                        properties._key = 1;
                        if (
                            !(
                                (message.key && typeof message.key.length === "number") ||
                                $util.isString(message.key)
                            )
                        )
                            return "key: buffer expected";
                    }
                    if (message.notBefore != null && message.hasOwnProperty("notBefore")) {
                        properties._notBefore = 1;
                        if (
                            !$util.isInteger(message.notBefore) &&
                            !(
                                message.notBefore &&
                                $util.isInteger(message.notBefore.low) &&
                                $util.isInteger(message.notBefore.high)
                            )
                        )
                            return "notBefore: integer|Long expected";
                    }
                    if (message.notAfter != null && message.hasOwnProperty("notAfter")) {
                        properties._notAfter = 1;
                        if (
                            !$util.isInteger(message.notAfter) &&
                            !(
                                message.notAfter &&
                                $util.isInteger(message.notAfter.low) &&
                                $util.isInteger(message.notAfter.high)
                            )
                        )
                            return "notAfter: integer|Long expected";
                    }
                    return null;
                };
                Details.fromObject = function fromObject(object) {
                    if (object instanceof $root.Cert.CertChain.NoiseCertificate.Details)
                        return object;
                    var message = new $root.Cert.CertChain.NoiseCertificate.Details();
                    if (object.serial != null) message.serial = object.serial >>> 0;
                    if (object.issuerSerial != null)
                        message.issuerSerial = object.issuerSerial >>> 0;
                    if (object.key != null)
                        if (typeof object.key === "string")
                            $util.base64.decode(
                                object.key,
                                (message.key = $util.newBuffer($util.base64.length(object.key))),
                                0
                            );
                        else if (object.key.length >= 0) message.key = object.key;
                    if (object.notBefore != null)
                        if ($util.Long)
                            (message.notBefore = $util.Long.fromValue(object.notBefore)).unsigned =
                                true;
                        else if (typeof object.notBefore === "string")
                            message.notBefore = parseInt(object.notBefore, 10);
                        else if (typeof object.notBefore === "number")
                            message.notBefore = object.notBefore;
                        else if (typeof object.notBefore === "object")
                            message.notBefore = new $util.LongBits(
                                object.notBefore.low >>> 0,
                                object.notBefore.high >>> 0
                            ).toNumber(true);
                    if (object.notAfter != null)
                        if ($util.Long)
                            (message.notAfter = $util.Long.fromValue(object.notAfter)).unsigned =
                                true;
                        else if (typeof object.notAfter === "string")
                            message.notAfter = parseInt(object.notAfter, 10);
                        else if (typeof object.notAfter === "number")
                            message.notAfter = object.notAfter;
                        else if (typeof object.notAfter === "object")
                            message.notAfter = new $util.LongBits(
                                object.notAfter.low >>> 0,
                                object.notAfter.high >>> 0
                            ).toNumber(true);
                    return message;
                };
                Details.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (message.serial != null && message.hasOwnProperty("serial")) {
                        object.serial = message.serial;
                        if (options.oneofs) object._serial = "serial";
                    }
                    if (message.issuerSerial != null && message.hasOwnProperty("issuerSerial")) {
                        object.issuerSerial = message.issuerSerial;
                        if (options.oneofs) object._issuerSerial = "issuerSerial";
                    }
                    if (message.key != null && message.hasOwnProperty("key")) {
                        object.key =
                            options.bytes === String
                                ? $util.base64.encode(message.key, 0, message.key.length)
                                : options.bytes === Array
                                  ? Array.prototype.slice.call(message.key)
                                  : message.key;
                        if (options.oneofs) object._key = "key";
                    }
                    if (message.notBefore != null && message.hasOwnProperty("notBefore")) {
                        if (typeof message.notBefore === "number")
                            object.notBefore =
                                options.longs === String
                                    ? String(message.notBefore)
                                    : message.notBefore;
                        else
                            object.notBefore =
                                options.longs === String
                                    ? $util.Long.prototype.toString.call(message.notBefore)
                                    : options.longs === Number
                                      ? new $util.LongBits(
                                            message.notBefore.low >>> 0,
                                            message.notBefore.high >>> 0
                                        ).toNumber(true)
                                      : message.notBefore;
                        if (options.oneofs) object._notBefore = "notBefore";
                    }
                    if (message.notAfter != null && message.hasOwnProperty("notAfter")) {
                        if (typeof message.notAfter === "number")
                            object.notAfter =
                                options.longs === String
                                    ? String(message.notAfter)
                                    : message.notAfter;
                        else
                            object.notAfter =
                                options.longs === String
                                    ? $util.Long.prototype.toString.call(message.notAfter)
                                    : options.longs === Number
                                      ? new $util.LongBits(
                                            message.notAfter.low >>> 0,
                                            message.notAfter.high >>> 0
                                        ).toNumber(true)
                                      : message.notAfter;
                        if (options.oneofs) object._notAfter = "notAfter";
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
                    return typeUrlPrefix + "/Cert.CertChain.NoiseCertificate.Details";
                };
                return Details;
            })();
            return NoiseCertificate;
        })();
        return CertChain;
    })();
    Cert.NoiseCertificate = (function () {
        function NoiseCertificate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
        NoiseCertificate.prototype.details = null;
        NoiseCertificate.prototype.signature = null;
        var $oneOfFields;
        Object.defineProperty(NoiseCertificate.prototype, "_details", {
            get: $util.oneOfGetter(($oneOfFields = ["details"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        Object.defineProperty(NoiseCertificate.prototype, "_signature", {
            get: $util.oneOfGetter(($oneOfFields = ["signature"])),
            set: $util.oneOfSetter($oneOfFields),
        });
        NoiseCertificate.create = function create(properties) {
            return new NoiseCertificate(properties);
        };
        NoiseCertificate.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                writer.uint32(10).bytes(message.details);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(18).bytes(message.signature);
            return writer;
        };
        NoiseCertificate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        NoiseCertificate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Cert.NoiseCertificate();
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        NoiseCertificate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        NoiseCertificate.verify = function verify(message) {
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
            return null;
        };
        NoiseCertificate.fromObject = function fromObject(object) {
            if (object instanceof $root.Cert.NoiseCertificate) return object;
            var message = new $root.Cert.NoiseCertificate();
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
            return message;
        };
        NoiseCertificate.toObject = function toObject(message, options) {
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
            return object;
        };
        NoiseCertificate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        NoiseCertificate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Cert.NoiseCertificate";
        };
        NoiseCertificate.Details = (function () {
            function Details(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
            Details.prototype.serial = null;
            Details.prototype.issuer = null;
            Details.prototype.expires = null;
            Details.prototype.subject = null;
            Details.prototype.key = null;
            var $oneOfFields;
            Object.defineProperty(Details.prototype, "_serial", {
                get: $util.oneOfGetter(($oneOfFields = ["serial"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_issuer", {
                get: $util.oneOfGetter(($oneOfFields = ["issuer"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_expires", {
                get: $util.oneOfGetter(($oneOfFields = ["expires"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_subject", {
                get: $util.oneOfGetter(($oneOfFields = ["subject"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Object.defineProperty(Details.prototype, "_key", {
                get: $util.oneOfGetter(($oneOfFields = ["key"])),
                set: $util.oneOfSetter($oneOfFields),
            });
            Details.create = function create(properties) {
                return new Details(properties);
            };
            Details.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.serial != null && Object.hasOwnProperty.call(message, "serial"))
                    writer.uint32(8).uint32(message.serial);
                if (message.issuer != null && Object.hasOwnProperty.call(message, "issuer"))
                    writer.uint32(18).string(message.issuer);
                if (message.expires != null && Object.hasOwnProperty.call(message, "expires"))
                    writer.uint32(24).uint64(message.expires);
                if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
                    writer.uint32(34).string(message.subject);
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(42).bytes(message.key);
                return writer;
            };
            Details.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            Details.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.Cert.NoiseCertificate.Details();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error) break;
                    switch (tag >>> 3) {
                        case 1: {
                            message.serial = reader.uint32();
                            break;
                        }
                        case 2: {
                            message.issuer = reader.string();
                            break;
                        }
                        case 3: {
                            message.expires = reader.uint64();
                            break;
                        }
                        case 4: {
                            message.subject = reader.string();
                            break;
                        }
                        case 5: {
                            message.key = reader.bytes();
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
                    if (!$util.isInteger(message.serial)) return "serial: integer expected";
                }
                if (message.issuer != null && message.hasOwnProperty("issuer")) {
                    properties._issuer = 1;
                    if (!$util.isString(message.issuer)) return "issuer: string expected";
                }
                if (message.expires != null && message.hasOwnProperty("expires")) {
                    properties._expires = 1;
                    if (
                        !$util.isInteger(message.expires) &&
                        !(
                            message.expires &&
                            $util.isInteger(message.expires.low) &&
                            $util.isInteger(message.expires.high)
                        )
                    )
                        return "expires: integer|Long expected";
                }
                if (message.subject != null && message.hasOwnProperty("subject")) {
                    properties._subject = 1;
                    if (!$util.isString(message.subject)) return "subject: string expected";
                }
                if (message.key != null && message.hasOwnProperty("key")) {
                    properties._key = 1;
                    if (
                        !(
                            (message.key && typeof message.key.length === "number") ||
                            $util.isString(message.key)
                        )
                    )
                        return "key: buffer expected";
                }
                return null;
            };
            Details.fromObject = function fromObject(object) {
                if (object instanceof $root.Cert.NoiseCertificate.Details) return object;
                var message = new $root.Cert.NoiseCertificate.Details();
                if (object.serial != null) message.serial = object.serial >>> 0;
                if (object.issuer != null) message.issuer = String(object.issuer);
                if (object.expires != null)
                    if ($util.Long)
                        (message.expires = $util.Long.fromValue(object.expires)).unsigned = true;
                    else if (typeof object.expires === "string")
                        message.expires = parseInt(object.expires, 10);
                    else if (typeof object.expires === "number") message.expires = object.expires;
                    else if (typeof object.expires === "object")
                        message.expires = new $util.LongBits(
                            object.expires.low >>> 0,
                            object.expires.high >>> 0
                        ).toNumber(true);
                if (object.subject != null) message.subject = String(object.subject);
                if (object.key != null)
                    if (typeof object.key === "string")
                        $util.base64.decode(
                            object.key,
                            (message.key = $util.newBuffer($util.base64.length(object.key))),
                            0
                        );
                    else if (object.key.length >= 0) message.key = object.key;
                return message;
            };
            Details.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (message.serial != null && message.hasOwnProperty("serial")) {
                    object.serial = message.serial;
                    if (options.oneofs) object._serial = "serial";
                }
                if (message.issuer != null && message.hasOwnProperty("issuer")) {
                    object.issuer = message.issuer;
                    if (options.oneofs) object._issuer = "issuer";
                }
                if (message.expires != null && message.hasOwnProperty("expires")) {
                    if (typeof message.expires === "number")
                        object.expires =
                            options.longs === String ? String(message.expires) : message.expires;
                    else
                        object.expires =
                            options.longs === String
                                ? $util.Long.prototype.toString.call(message.expires)
                                : options.longs === Number
                                  ? new $util.LongBits(
                                        message.expires.low >>> 0,
                                        message.expires.high >>> 0
                                    ).toNumber(true)
                                  : message.expires;
                    if (options.oneofs) object._expires = "expires";
                }
                if (message.subject != null && message.hasOwnProperty("subject")) {
                    object.subject = message.subject;
                    if (options.oneofs) object._subject = "subject";
                }
                if (message.key != null && message.hasOwnProperty("key")) {
                    object.key =
                        options.bytes === String
                            ? $util.base64.encode(message.key, 0, message.key.length)
                            : options.bytes === Array
                              ? Array.prototype.slice.call(message.key)
                              : message.key;
                    if (options.oneofs) object._key = "key";
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
                return typeUrlPrefix + "/Cert.NoiseCertificate.Details";
            };
            return Details;
        })();
        return NoiseCertificate;
    })();
    return Cert;
})();
module.exports = $root;

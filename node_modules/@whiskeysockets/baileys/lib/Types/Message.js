"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { proto: proto } = require("../../WAProto");
Object.defineProperty(exports, "__esModule", { value: true });
const WAMessageAddressingMode = { PN: "pn", LID: "lid" };
module.exports = {
    WAMessageAddressingMode: WAMessageAddressingMode,
    WAMessageStubType: proto.WebMessageInfo.StubType,
    WAMessageStatus: proto.WebMessageInfo.Status,
    WAProto: proto,
};

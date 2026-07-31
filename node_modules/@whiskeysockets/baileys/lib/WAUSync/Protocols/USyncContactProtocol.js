"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { assertNodeErrorFree: assertNodeErrorFree } = require("../../WABinary");
class USyncContactProtocol {
    constructor() {
        this.name = "contact";
    }
    getQueryElement() {
        return { tag: "contact", attrs: {} };
    }
    getUserElement(user) {
        return { tag: "contact", attrs: {}, content: user.phone };
    }
    parser(node) {
        if (node.tag === "contact") {
            assertNodeErrorFree(node);
            return node?.attrs?.type === "in";
        }
        return false;
    }
}
module.exports = { USyncContactProtocol: USyncContactProtocol };

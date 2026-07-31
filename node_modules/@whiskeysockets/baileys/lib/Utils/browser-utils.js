"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { platform: platform, release: release } = require("os");
const { proto: proto } = require("../../WAProto");
const PLATFORM_MAP = {
    aix: "AIX",
    darwin: "Mac OS",
    win32: "Windows",
    android: "Android",
    freebsd: "FreeBSD",
    openbsd: "OpenBSD",
    sunos: "Solaris",
    linux: undefined,
    haiku: undefined,
    cygwin: undefined,
    netbsd: undefined,
};
const Browsers = {
    ubuntu: (browser) => ["Ubuntu", browser, "22.04.4"],
    macOS: (browser) => ["Mac OS", browser, "14.4.1"],
    baileys: (browser) => ["Baileys", browser, "6.5.0"],
    windows: (browser) => ["Windows", browser, "10.0.22631"],
    appropriate: (browser) => [PLATFORM_MAP[platform()] || "Ubuntu", browser, release()],
};
const getPlatformId = (browser) => {
    const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase()];
    return platformType ? platformType.toString() : "1";
};
module.exports = { Browsers: Browsers, getPlatformId: getPlatformId };

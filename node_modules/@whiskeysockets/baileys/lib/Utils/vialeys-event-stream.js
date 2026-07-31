"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = require("events");
const { promises: promises, createReadStream: createReadStream } = require("fs");
const { writeFile: writeFile } = require("fs/promises");
const { createInterface: createInterface } = require("readline");
const { delay: delay } = require("./generics");
const { makeMutex: makeMutex } = require("./make-mutex");
const captureEventStream = (ev, filename) => {
    const oldEmit = ev.emit;
    const writeMutex = makeMutex();
    ev.emit = function (...args) {
        const content =
            JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }) + "\n";
        const result = oldEmit.apply(ev, args);
        writeMutex.mutex(async () => {
            await promises.writeFile(filename, content, { flag: "a" });
        });
        return result;
    };
};
const readAndEmitEventStream = (filename, delayIntervalMs = 0) => {
    const ev = new Events();
    const fireEvents = async () => {
        const fileStream = createReadStream(filename);
        const rl = createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of rl) {
            if (line) {
                const { event: event, data: data } = JSON.parse(line);
                ev.emit(event, data);
                delayIntervalMs && (await delay(delayIntervalMs));
            }
        }
        fileStream.close();
    };
    return { ev: ev, task: fireEvents() };
};
module.exports = {
    captureEventStream: captureEventStream,
    readAndEmitEventStream: readAndEmitEventStream,
};

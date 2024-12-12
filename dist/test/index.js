"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCheck = exports.testRun = exports.inlineCharsInSpecialChar = exports.blockCharsInSpecialChar = exports.singleInstanceWhenDoubleInSpecialChar = void 0;
const constants_1 = require("../constants");
const modules_1 = require("../modules");
// DESC: see /constants/index.ts SPECIAL_CHARS NOTE for more info
const singleInstanceWhenDoubleInSpecialChar = () => {
    for (let i = 0; i < constants_1.SPECIAL_CHARS.length; i++) {
        if (constants_1.SPECIAL_CHARS[i].length == 2) {
            if (constants_1.SPECIAL_CHARS.indexOf(constants_1.SPECIAL_CHARS[i].split('')[0]) == -1) {
                return false;
            }
        }
    }
    return true;
};
exports.singleInstanceWhenDoubleInSpecialChar = singleInstanceWhenDoubleInSpecialChar;
// DESC: block chars must be a subarray (contain only elements of) SPECIAL_CHARS
const blockCharsInSpecialChar = () => {
    for (let i = 0; i < constants_1.SPECIAL_CHARS.length; i++) {
        if (constants_1.SPECIAL_CHARS[i].length > 1) {
            if (constants_1.SPECIAL_CHARS[i].split('').some((char) => constants_1.SPECIAL_CHARS.indexOf(char) == -1)) {
                return false;
            }
        }
    }
    return true;
};
exports.blockCharsInSpecialChar = blockCharsInSpecialChar;
// DESC: block chars must be a subarray (contain only elements of) SPECIAL_CHARS
const inlineCharsInSpecialChar = () => {
    for (let i = 0; i < constants_1.SPECIAL_CHARS.length; i++) {
        if (constants_1.SPECIAL_CHARS[i].length == 1) {
            if (constants_1.SPECIAL_CHARS.indexOf(constants_1.SPECIAL_CHARS[i]) == -1) {
                return false;
            }
        }
    }
    return true;
};
exports.inlineCharsInSpecialChar = inlineCharsInSpecialChar;
const testRun = (raw, verbose = false) => {
    if (verbose) {
        console.log('starting to compile raw string...');
        console.log('[info] raw string:');
        raw.split('\n').forEach((line, i) => console.log('\t', i, line));
        const start = Date.now();
        console.log('[info] tokenizing raw string...');
        const tokens = (0, modules_1.tokenizer)(raw);
        console.log('[response] Tokens:');
        tokens.forEach((token, i) => console.log('\t', i, token));
        console.log('[info] rendering tokens...');
        const stack = (0, modules_1.renderer)(tokens);
        console.log('[response] rendered HTML:');
        stack.split('\n').forEach((line, i) => console.log('\t', i, line));
        const end = Date.now();
        console.log('[benchmark] compiled in', end - start, 'ms');
    }
    else {
        const tokens = (0, modules_1.tokenizer)(raw);
        const stack = (0, modules_1.renderer)(tokens);
    }
};
exports.testRun = testRun;
const testCheck = () => {
    console.log('[info] running tests...');
    if (!(0, exports.singleInstanceWhenDoubleInSpecialChar)())
        console.error('[test] singleInstanceWhenDoubleInSpecialChar:', (0, exports.singleInstanceWhenDoubleInSpecialChar)());
    else
        console.log('[test] singleInstanceWhenDoubleInSpecialChar:', (0, exports.singleInstanceWhenDoubleInSpecialChar)());
    if (!(0, exports.blockCharsInSpecialChar)())
        console.error('[test] blockCharsInSpecialChar:', (0, exports.blockCharsInSpecialChar)());
    else
        console.log('[test] blockCharsInSpecialChar:', (0, exports.blockCharsInSpecialChar)());
    if (!(0, exports.inlineCharsInSpecialChar)())
        console.error('[test] inlineCharsInSpecialChar:', (0, exports.inlineCharsInSpecialChar)());
    else
        console.log('[test] inlineCharsInSpecialChar:', (0, exports.inlineCharsInSpecialChar)());
    console.log('[response] tests complete');
};
exports.testCheck = testCheck;

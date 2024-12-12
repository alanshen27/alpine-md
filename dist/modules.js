"use strict";
// TODO: add lists, code blocks, and escape chars
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.highlight = exports.renderer = exports.tokenizer = void 0;
const joinConfig_1 = require("./helpers/joinConfig");
const toHTML_1 = require("./helpers/toHTML");
const constants_1 = require("./constants");
// DESC: changes string into Token[] array that will ber parsed by the renderer
const tokenizer = (raw) => {
    const tokens = [];
    for (let i = 0; i < raw.length; i++) {
        if (constants_1.SPECIAL_CHARS.indexOf(raw[i]) != -1) {
            let tag = raw[i];
            let j = i;
            while (constants_1.SPECIAL_CHARS.indexOf(tag + raw[j + 1]) != -1) {
                tag += raw[j + 1];
                j++;
            }
            i = j;
            tokens.push({
                type: constants_1.TokenTypeMap[tag],
                children: tag,
            });
            continue;
        }
        let temp = '';
        while (constants_1.SPECIAL_CHARS.indexOf(raw[i]) == -1 && i < raw.length) {
            temp += raw[i];
            i++;
        }
        i--;
        tokens.push({
            type: constants_1.TokenType.STRING,
            children: temp,
        });
    }
    tokens.push({
        type: constants_1.TokenType.EOF,
        children: "",
    });
    return tokens;
};
exports.tokenizer = tokenizer;
const MAX_LAYERS = 100;
// DESC: renders Token[] array into HTML string recursively
// PARAMS: tokens: Token[] - array of tokens to render
// PARAMS: rawConfig: Partial<{[key in TokenType]: string}> - config object to render tokens
const renderer = (tokens, rawConfig = {}, layer = 0) => {
    const stack = [];
    let i = 0;
    const renderConfig = (0, joinConfig_1.joinConfig)(rawConfig);
    if (layer > MAX_LAYERS) {
        throw new Error('Max layers reached');
    }
    while (i < tokens.length) {
        let token = tokens[i];
        if (token.type != constants_1.TokenType.STRING && token.type != constants_1.TokenType.NEWLINE) {
            if (constants_1.TokenExcludeTypes.indexOf(token.type) != -1) {
                stack.push(token.children);
                i++;
                continue;
            }
            let children = [];
            let j = i;
            if (j < tokens.length - 2) {
                // block chars must start with '\n' or start of file (undefined lol) and end with '\n' or EOF
                if (constants_1.BLOCK_CHARS.indexOf(token.children) != -1 && (tokens[j - 1] == undefined
                    || tokens[j + 1].type == constants_1.TokenType.WHITESPACE)) {
                    j += 2; // ignore whitespace char after block char
                    while (j < tokens.length - 1 && tokens[j].type != constants_1.TokenType.NEWLINE) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }
            if (j < tokens.length - 1) {
                if (constants_1.INLINE_CHARS.indexOf(token.children) != -1) {
                    j++;
                    while (j < tokens.length - 1 && tokens[j].type != token.type) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }
            // check if loop ended because token.type was found or if it just reached eof, then decide whether to mark or not
            if (tokens[j].type == token.type || (constants_1.BLOCK_CHARS.indexOf(token.children) != -1 && tokens[j].type == constants_1.TokenType.NEWLINE)) {
                i = j + 1;
                const a = renderConfig[token.type];
                // parse all the children inside the tags
                stack.push((0, toHTML_1.toHTML)(renderConfig[token.type]) + (0, exports.renderer)(children, renderConfig, layer + 1) + (0, toHTML_1.toHTML)(renderConfig[token.type], true));
                continue;
            }
        }
        stack.push(token.children);
        i++;
    }
    return stack.join('');
};
exports.renderer = renderer;
const highlight = (tokens, rawConfig = {}, layer = 0) => {
    const stack = [];
    let i = 0;
    const highlightConfig = (0, joinConfig_1.joinSyntaxConfig)(rawConfig);
    if (layer > MAX_LAYERS) {
        throw new Error('Max layers reached');
    }
    while (i < tokens.length) {
        let token = tokens[i];
        if (token.type != constants_1.TokenType.STRING && token.type != constants_1.TokenType.NEWLINE) {
            if (constants_1.TokenExcludeTypes.indexOf(token.type) != -1) {
                stack.push(token.children);
                i++;
                continue;
            }
            let children = [];
            let j = i;
            if (j < tokens.length - 2) {
                // block chars must start with '\n' or start of file (undefined lol) and end with '\n' or EOF
                if (constants_1.BLOCK_CHARS.indexOf(token.children) != -1 && (tokens[j - 1] == undefined
                    || tokens[j + 1].type == constants_1.TokenType.WHITESPACE)) {
                    j += 2; // ignore whitespace char after block char
                    while (j < tokens.length - 1 && tokens[j].type != constants_1.TokenType.NEWLINE) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }
            if (j < tokens.length - 1) {
                if (constants_1.INLINE_CHARS.indexOf(token.children) != -1) {
                    j++;
                    while (j < tokens.length - 1 && tokens[j].type != token.type) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }
            // check if loop ended because token.type was found or if it just reached eof, then decide whether to mark or not
            if (tokens[j].type == token.type || (constants_1.BLOCK_CHARS.indexOf(token.children) != -1 && tokens[j].type == constants_1.TokenType.NEWLINE)) {
                i = j + 1;
                const tokenType = token.type;
                // parse all the children inside the tags
                if (!highlightConfig[tokenType]) {
                    throw Error('[error] configuration error.');
                }
                stack.push(
                // @ts-ignore this is just annoying
                (0, toHTML_1.toHTML)(highlightConfig[tokenType].tag) +
                    token.children +
                    // @ts-ignore
                    (0, toHTML_1.toHTML)(highlightConfig[tokenType].tag, true) +
                    // @ts-ignore
                    (0, toHTML_1.toHTML)(highlightConfig[tokenType].child) +
                    (0, exports.highlight)(children, layer + 1) +
                    // @ts-ignore
                    (0, toHTML_1.toHTML)(highlightConfig[tokenType].child, true) +
                    // @ts-ignore
                    (0, toHTML_1.toHTML)(highlightConfig[tokenType].tag) +
                    token.children +
                    // @ts-ignore
                    (0, toHTML_1.toHTML)(highlightConfig[tokenType].tag, true));
                continue;
            }
        }
        stack.push(token.children);
        i++;
    }
    return stack.join('');
};
exports.highlight = highlight;
const render = (raw, rawConfig = {}) => {
    const tokens = (0, exports.tokenizer)(raw);
    return (0, exports.renderer)(tokens, rawConfig);
};
exports.render = render;

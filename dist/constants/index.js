"use strict";
/**
 * NOTE: special chars with more than 1 char should
 * have another instance of the char in SPECIAL_CHARS
 * array with a single char or else current tokenizer
 * won't see it...
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTypeMap = exports.RENDER_CONFIG = exports.TokenExcludeTypes = exports.TokenType = exports.INLINE_CHARS = exports.BLOCK_CHARS = exports.SPECIAL_CHARS = void 0;
exports.SPECIAL_CHARS = [
    '*',
    '**',
    '_',
    '~',
    '`',
    '#',
    '##',
    '###',
    '####',
    '#####',
    '######',
    '>',
    '\n',
    ' ',
];
// NOTE: components that end with a newline char
exports.BLOCK_CHARS = [
    '#',
    '##',
    '###',
    '####',
    '#####',
    '######',
    '>',
];
// NOTE: components that end with the same special char
exports.INLINE_CHARS = [
    '*',
    '**',
    '_',
    '~',
    '`',
];
var TokenType;
(function (TokenType) {
    TokenType["EOF"] = "NEWLINE";
    TokenType["WHITESPACE"] = "WHITESPACE";
    TokenType["BOLD"] = "BOLD";
    TokenType["ITALIC"] = "ITALIC";
    TokenType["UNDERLINE"] = "UNDERLINE";
    TokenType["STRIKETHROUGH"] = "STRIKETHROUGH";
    TokenType["ESCAPE"] = "ESCAPE";
    TokenType["CODE"] = "CODE";
    TokenType["STRING"] = "STRING";
    TokenType["NEWLINE"] = "NEWLINE";
    TokenType["H1"] = "H1";
    TokenType["H2"] = "H2";
    TokenType["H3"] = "H3";
    TokenType["H4"] = "H4";
    TokenType["H5"] = "H5";
    TokenType["H6"] = "H6";
})(TokenType || (exports.TokenType = TokenType = {}));
// NOTE: no test for these as they're covered by typescript type checking
exports.TokenExcludeTypes = [TokenType.WHITESPACE, TokenType.EOF];
exports.RENDER_CONFIG = {
    [TokenType.BOLD]: 'b',
    [TokenType.ITALIC]: 'i',
    [TokenType.UNDERLINE]: 'u',
    [TokenType.STRIKETHROUGH]: 's',
    [TokenType.ESCAPE]: 'e',
    [TokenType.CODE]: 'c',
    [TokenType.STRING]: 'p',
    [TokenType.NEWLINE]: 'br',
    [TokenType.H1]: 'h1',
    [TokenType.H2]: 'h2',
    [TokenType.H3]: 'h3',
    [TokenType.H4]: 'h4',
    [TokenType.H5]: 'h5',
    [TokenType.H6]: 'h6',
};
exports.TokenTypeMap = {
    '*': TokenType.ITALIC,
    '**': TokenType.BOLD,
    '~': TokenType.STRIKETHROUGH,
    '`': TokenType.CODE,
    '#': TokenType.H1,
    '##': TokenType.H2,
    '###': TokenType.H3,
    '####': TokenType.H4,
    '#####': TokenType.H5,
    '######': TokenType.H6,
    '\n': TokenType.NEWLINE,
    ' ': TokenType.WHITESPACE,
};

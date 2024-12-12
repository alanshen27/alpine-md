"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTypeMap = exports.SYNTAX_CONFIG = exports.RENDER_CONFIG = exports.TokenExcludeTypes = exports.TokenType = exports.INLINE_CHARS = exports.BLOCK_CHARS = exports.SPECIAL_CHARS = void 0;
/**
 * NOTE: special chars with more than 1 char should
 * have another instance of the char in SPECIAL_CHARS
 * array with a single char or else current tokenizer
 * won't see it...
 * */
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
    [TokenType.CODE]: 'code',
    [TokenType.STRING]: 'p',
    [TokenType.NEWLINE]: 'br',
    [TokenType.H1]: 'h1',
    [TokenType.H2]: 'h2',
    [TokenType.H3]: 'h3',
    [TokenType.H4]: 'h4',
    [TokenType.H5]: 'h5',
    [TokenType.H6]: 'h6',
};
exports.SYNTAX_CONFIG = {
    [TokenType.BOLD]: {
        child: {
            tagName: 'span',
            class: 'text-orange-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-orange-500',
        },
    },
    [TokenType.ITALIC]: {
        child: {
            tagName: 'span',
            class: 'text-teal-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-teal-500',
        },
    },
    [TokenType.UNDERLINE]: {
        child: {
            tagName: 'span',
            class: 'text-blue-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-blue-500',
        },
    },
    [TokenType.STRIKETHROUGH]: {
        child: {
            tagName: 'span',
            class: 'text-red-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-red-500',
        },
    },
    [TokenType.CODE]: {
        child: {
            tagName: 'span',
            class: 'text-yellow-400',
        },
        tag: {
            tagName: 'span',
            class: 'text-yellow-400',
        },
    },
    [TokenType.STRING]: {
        child: {
            tagName: 'span',
            class: 'text-green-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-green-500',
        },
    },
    [TokenType.NEWLINE]: {
        child: {
            tagName: 'span',
            class: 'text-gray-400',
        },
        tag: {
            tagName: 'span',
            class: 'text-gray-400',
        },
    },
    [TokenType.H1]: {
        child: {
            tagName: 'span',
            class: 'text-blue-700',
        },
        tag: {
            tagName: 'span',
            class: 'text-blue-700',
        },
    },
    [TokenType.H2]: {
        child: {
            tagName: 'span',
            class: 'text-indigo-600',
        },
        tag: {
            tagName: 'span',
            class: 'text-indigo-600',
        },
    },
    [TokenType.H3]: {
        child: {
            tagName: 'span',
            class: 'text-purple-600',
        },
        tag: {
            tagName: 'span',
            class: 'text-purple-600',
        },
    },
    [TokenType.H4]: {
        child: {
            tagName: 'span',
            class: 'text-pink-600',
        },
        tag: {
            tagName: 'span',
            class: 'text-pink-600',
        },
    },
    [TokenType.H5]: {
        child: {
            tagName: 'span',
            class: 'text-gray-700',
        },
        tag: {
            tagName: 'span',
            class: 'text-gray-700',
        },
    },
    [TokenType.H6]: {
        child: {
            tagName: 'span',
            class: 'text-gray-500',
        },
        tag: {
            tagName: 'span',
            class: 'text-gray-500',
        },
    },
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

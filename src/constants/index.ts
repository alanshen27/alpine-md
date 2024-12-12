import { Config } from "../interface/Config";

/**
 * NOTE: special chars with more than 1 char should 
 * have another instance of the char in SPECIAL_CHARS 
 * array with a single char or else current tokenizer 
 * won't see it...
 * */

export const SPECIAL_CHARS = [
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
export const BLOCK_CHARS = [
    '#',
    '##',
    '###',
    '####',
    '#####',
    '######',
    '>',
]

// NOTE: components that end with the same special char
export const INLINE_CHARS = [
    '*',
    '**',
    '_',
    '~',
    '`',
];

export enum TokenType {
    EOF = 'NEWLINE',
    WHITESPACE = 'WHITESPACE',
    BOLD = 'BOLD',
    ITALIC = 'ITALIC',
    UNDERLINE = 'UNDERLINE',
    STRIKETHROUGH = 'STRIKETHROUGH',
    ESCAPE = 'ESCAPE',
    CODE = 'CODE',
    STRING = 'STRING',
    NEWLINE = 'NEWLINE',
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H5 = 'H5',
    H6 = 'H6',
}


// NOTE: no test for these as they're covered by typescript type checking
export const TokenExcludeTypes = [TokenType.WHITESPACE, TokenType.EOF];

export const RENDER_CONFIG: Config = {
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
}

export const SYNTAX_CONFIG = {
    [TokenType.BOLD]: {
        child: {
            tagName: 'span',
            class: 'text-orange-500', // VSCode-themed color for bold text
        },
        tag: {
            tagName: 'span',
            class: 'text-orange-500', // VSCode-themed color for bold text
        },
    },

    [TokenType.ITALIC]: {
        child: {
            tagName: 'span',
            class: 'text-teal-500', // VSCode-themed color for italic text
        },
        tag: {
            tagName: 'span',
            class: 'text-teal-500', // VSCode-themed color for italic text
        },
    },

    [TokenType.UNDERLINE]: {
        child: {
            tagName: 'span',
            class: 'text-blue-500', // VSCode-themed color for underline text
        },
        tag: {
            tagName: 'span',
            class: 'text-blue-500', // VSCode-themed color for underline text
        },
    },

    [TokenType.STRIKETHROUGH]: {
        child: {
            tagName: 'span',
            class: 'text-red-500', // VSCode-themed color for strikethrough text
        },
        tag: {
            tagName: 'span',
            class: 'text-red-500', // VSCode-themed color for strikethrough text
        },
    },

    [TokenType.CODE]: {
        child: {
            tagName: 'code',
            class: 'bg-gray-800 text-yellow-400', // VSCode-themed color for inline code
        },
        tag: {
            tagName: 'code',
            class: 'bg-gray-800 text-yellow-400', // VSCode-themed color for inline code
        },
    },

    [TokenType.STRING]: {
        child: {
            tagName: 'span',
            class: 'text-green-500', // VSCode-themed color for strings
        },
        tag: {
            tagName: 'span',
            class: 'text-green-500', // VSCode-themed color for strings
        },
    },

    [TokenType.NEWLINE]: {
        child: {
            tagName: 'span',
            class: 'text-gray-400', // VSCode-themed color for newlines
        },
        tag: {
            tagName: 'span',
            class: 'text-gray-400', // VSCode-themed color for newlines
        },
    },

    [TokenType.H1]: {
        child: {
            tagName: 'h1',
            class: 'text-blue-700 font-bold', // VSCode-themed color for H1 headings
        },
        tag: {
            tagName: 'h1',
            class: 'text-blue-700 font-bold', // VSCode-themed color for H1 headings
        },
    },

    [TokenType.H2]: {
        child: {
            tagName: 'h2',
            class: 'text-indigo-600 font-semibold', // VSCode-themed color for H2 headings
        },
        tag: {
            tagName: 'h2',
            class: 'text-indigo-600 font-semibold', // VSCode-themed color for H2 headings
        },
    },

    [TokenType.H3]: {
        child: {
            tagName: 'h3',
            class: 'text-purple-600 font-medium', // VSCode-themed color for H3 headings
        },
        tag: {
            tagName: 'h3',
            class: 'text-purple-600 font-medium', // VSCode-themed color for H3 headings
        },
    },

    [TokenType.H4]: {
        child: {
            tagName: 'h4',
            class: 'text-pink-600 font-normal', // VSCode-themed color for H4 headings
        },
        tag: {
            tagName: 'h4',
            class: 'text-pink-600 font-normal', // VSCode-themed color for H4 headings
        },
    },

    [TokenType.H5]: {
        child: {
            tagName: 'h5',
            class: 'text-gray-700 font-light', // VSCode-themed color for H5 headings
        },
        tag: {
            tagName: 'h5',
            class: 'text-gray-700 font-light', // VSCode-themed color for H5 headings
        },
    },

    [TokenType.H6]: {
        child: {
            tagName: 'h6',
            class: 'text-gray-500 text-sm', // VSCode-themed color for H6 headings
        },
        tag: {
            tagName: 'h6',
            class: 'text-gray-500 text-sm', // VSCode-themed color for H6 headings
        },
    },
};


export const TokenTypeMap: {
    [key in typeof SPECIAL_CHARS[number]]: TokenType;
} = {
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
}
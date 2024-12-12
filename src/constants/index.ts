import { Config, SyntaxConfig } from "../interface/Config";

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

export const SYNTAX_CONFIG: SyntaxConfig = {
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
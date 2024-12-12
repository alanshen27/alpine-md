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

export const RENDER_CONFIG: {
    [key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: string;
} = {
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
}

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
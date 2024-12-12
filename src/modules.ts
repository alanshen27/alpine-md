// TODO: add lists, code blocks, and escape chars

import { joinConfig, joinSyntaxConfig } from './helpers/joinConfig';
import { toHTML } from './helpers/toHTML';
import { Token } from './interface/Token';
import { TokenType, TokenTypeMap, TokenExcludeTypes, SPECIAL_CHARS, BLOCK_CHARS, INLINE_CHARS } from './constants';
import { Config, SyntaxConfig } from './interface/Config';

// DESC: changes string into Token[] array that will ber parsed by the renderer

export const tokenizer = (raw: string) => {
    const tokens = [];

    for (let i = 0; i < raw.length; i++) {
        if (SPECIAL_CHARS.indexOf(raw[i]) != -1) {
            let tag = raw[i];

            let j = i;
            
            while (SPECIAL_CHARS.indexOf(tag + raw[j+1]) != -1) {
                tag += raw[j+1];
                j++;
            }
            
            i = j;

            tokens.push({
                type: TokenTypeMap[tag],
                children: tag,
            });
            continue;
        }

        let temp = '';

        while (SPECIAL_CHARS.indexOf(raw[i]) == -1 && i < raw.length) {
            temp += raw[i];
            i++;
        }
        
        i--;

        tokens.push({
            type: TokenType.STRING,
            children: temp,
        });
            
    }

    tokens.push({
        type: TokenType.EOF,
        children: "",
    })

    return tokens;
}

const MAX_LAYERS = 100;

// DESC: renders Token[] array into HTML string recursively
// PARAMS: tokens: Token[] - array of tokens to render
// PARAMS: rawConfig: Partial<{[key in TokenType]: string}> - config object to render tokens

export const renderer = (tokens: Token[], rawConfig: Partial<Config> = {}, layer = 0): string => {
    const stack = [];
    let i = 0;

    const renderConfig = joinConfig(rawConfig);

    if (layer > MAX_LAYERS) {
        throw new Error('Max layers reached');
    }

    while (i < tokens.length) {
        let token = tokens[i];

        if (token.type != TokenType.STRING && token.type != TokenType.NEWLINE) {
            if (TokenExcludeTypes.indexOf(token.type) != -1) {
                stack.push(token.children);
                i++;
                continue;
            }

            let children = [];
            
            let j = i;

            if (j < tokens.length - 2) {
                // block chars must start with '\n' or start of file (undefined lol) and end with '\n' or EOF
                if (BLOCK_CHARS.indexOf(token.children) != -1 && (tokens[j-1] == undefined 
                    || tokens[j+1].type == TokenType.WHITESPACE)) {
                    j+= 2; // ignore whitespace char after block char
                    while (j < tokens.length - 1 && tokens[j].type != TokenType.NEWLINE) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }

            if (j < tokens.length - 1) {
                if (INLINE_CHARS.indexOf(token.children) != -1) {
                    j++;
                    while (j < tokens.length - 1 && tokens[j].type != token.type) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }

            
            // check if loop ended because token.type was found or if it just reached eof, then decide whether to mark or not
            if (tokens[j].type == token.type || (BLOCK_CHARS.indexOf(token.children) != -1 && tokens[j].type == TokenType.NEWLINE)) {
                i = j + 1;
                const a = renderConfig[token.type as Exclude<TokenType, typeof TokenExcludeTypes[number]>]
                // parse all the children inside the tags
                stack.push(toHTML(renderConfig[token.type as Exclude<TokenType, typeof TokenExcludeTypes[number]>]) + renderer(children, renderConfig, layer + 1) + toHTML(renderConfig[token.type as Exclude<TokenType, typeof TokenExcludeTypes[number]>], true));
                continue;
            }
        }

        stack.push(token.children);

        i++;
    }

    return stack.join('');
}

export const highlight = (tokens: Token[], rawConfig: Partial<SyntaxConfig> = {}, layer = 0): string => {
    const stack = [];
    let i = 0;

    const highlightConfig: SyntaxConfig = joinSyntaxConfig(rawConfig);

    if (layer > MAX_LAYERS) {
        throw new Error('Max layers reached');
    }

    while (i < tokens.length) {
        let token = tokens[i];

        if (token.type != TokenType.STRING && token.type != TokenType.NEWLINE) {
            if (TokenExcludeTypes.indexOf(token.type) != -1) {
                stack.push(token.children);
                i++;
                continue;
            }

            let children = [];
            
            let j = i;

            if (j < tokens.length - 2) {
                // block chars must start with '\n' or start of file (undefined lol) and end with '\n' or EOF
                if (BLOCK_CHARS.indexOf(token.children) != -1 && (tokens[j-1] == undefined 
                    || tokens[j+1].type == TokenType.WHITESPACE)) {
                    j++; // ignore whitespace char after block char
                    while (j < tokens.length - 1 && tokens[j].type != TokenType.NEWLINE) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }

            if (j < tokens.length - 1) {
                if (INLINE_CHARS.indexOf(token.children) != -1) {
                    j++;
                    while (j < tokens.length - 1 && tokens[j].type != token.type) {
                        children.push(tokens[j]);
                        j++;
                    }
                }
            }

            
            // check if loop ended because token.type was found or if it just reached eof, then decide whether to mark or not
            if (tokens[j].type == token.type || (BLOCK_CHARS.indexOf(token.children) != -1 && tokens[j].type == TokenType.NEWLINE)) {
                i = j + 1;

                const tokenType: Exclude<TokenType, typeof TokenExcludeTypes[number]> = token.type as Exclude<TokenType, typeof TokenExcludeTypes[number]>;
                // parse all the children inside the tags
                if (!highlightConfig[tokenType])    { throw Error('[error] configuration error.')}

                if (BLOCK_CHARS.indexOf(token.children) != -1) {
                    stack.push(
                        // @ts-ignore this is just annoying
                        toHTML(highlightConfig[tokenType].tag) +
                        token.children +
                        // @ts-ignore
                        toHTML(highlightConfig[tokenType].tag, true) +
                        // @ts-ignore
                        toHTML(highlightConfig[tokenType].child) +
                        highlight(children, layer + 1) +
                        // @ts-ignore
                        toHTML(highlightConfig[tokenType].child, true) +
                        // @ts-ignore
                        tokens[j].children
                    )
                    continue;
                }
                stack.push(
                    // @ts-ignore this is just annoying
                    toHTML(highlightConfig[tokenType].tag) +
                    token.children +
                    // @ts-ignore
                    toHTML(highlightConfig[tokenType].tag, true) +
                    // @ts-ignore
                    toHTML(highlightConfig[tokenType].child) +
                    highlight(children, layer + 1) +
                    // @ts-ignore
                    toHTML(highlightConfig[tokenType].child, true) +
                    // @ts-ignore
                    toHTML(highlightConfig[tokenType].tag) +
                    token.children+
                    // @ts-ignore
                    toHTML(highlightConfig[tokenType].tag, true)
                )
                continue;
            }
        }

        stack.push(token.children);

        i++;
    }

    return stack.join('');
}

export const render = (raw: string, rawConfig: Partial<Config> = {}) => {
    const tokens = tokenizer(raw);
    return renderer(tokens, rawConfig);
}
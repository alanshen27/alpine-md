import { TokenExcludeTypes, TokenType } from "../constants";

export interface Tag {
    tagName: string;
    [key: string]: string;
}

export type Config = Partial<{[key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: string | Tag}>;

export type SyntaxConfig = Partial<{[key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: {
    tag: Tag | string,
    child: Tag | string,
}}>;

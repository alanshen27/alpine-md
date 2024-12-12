import { TokenExcludeTypes, TokenType } from "../constants";

export interface Tag {
    tagName: string;
    [key: string]: string;
}

export type Config = {[key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: string | Tag};

export type SyntaxConfig = {[key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: {
    tag: Tag | string,
    child: Tag | string,
}};

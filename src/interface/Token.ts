import { TokenType } from "../constants";

export interface Token {
    type: TokenType;
    children: string;
}
import { RENDER_CONFIG, TokenExcludeTypes, TokenType } from "../constants"

export const joinConfig = (config: Partial<{[key in TokenType]: string}>): {[key in Exclude<TokenType, typeof TokenExcludeTypes[number]>]: string} => {
    return {
        ...RENDER_CONFIG,
        ...config,
    }
}
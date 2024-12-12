import { RENDER_CONFIG, SYNTAX_CONFIG, TokenExcludeTypes, TokenType } from "../constants"
import { Config, SyntaxConfig } from "../interface/Config"

export const joinConfig = (config: Partial<Config>): Config => {
    return {
        ...RENDER_CONFIG,
        ...config,
    }
}

export const joinSyntaxConfig = (config: Partial<SyntaxConfig>): SyntaxConfig => {
    return {
        ...SYNTAX_CONFIG,
        ...config,
    }
}
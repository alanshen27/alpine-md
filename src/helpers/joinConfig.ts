import { RENDER_CONFIG, SYNTAX_CONFIG, TokenExcludeTypes, TokenType } from "../constants"
import { Config, SyntaxConfig } from "../interface/Config"

export const joinConfig = (config: Config) => {
    return {
        ...RENDER_CONFIG,
        ...config,
    }
}

export const joinSyntaxConfig = (config: SyntaxConfig): SyntaxConfig => {
    return {
        ...SYNTAX_CONFIG,
        ...config,
    }
}
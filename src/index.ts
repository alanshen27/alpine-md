import { TokenType } from "./constants";
type RenderConfig = Partial<{[key in TokenType]: string}>;

export type { TokenType, RenderConfig };
export { tokenizer, renderer, render } from "./modules";

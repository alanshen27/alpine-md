"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./modules");
const test = __importStar(require("./test"));
test.testCheck();
console.log((0, modules_1.highlight)((0, modules_1.tokenizer)("# `alpine-md`\n\nThis is a light-weight **markdown-inspired** parser that will be used for certain components in the new app that I am creating. It allows for basic configurations in terms of rendering with the `RenderConfig` type, and uses a two step proccess from *tokenization* to a recursive *rendering/parsing* process to create the rendered result.\n\nDo note that this parser does not strictly parsed based on the markdown syntax and is instead inspired.\n\n## Using\n\nUse the function `render(raw: string)` to get directly a rendered HTML string of your raw markdown. You can also pass in a `RenderConfig` with `TokenType` matched to HTML tag names to output custom tags (this functionality will be expanded in the future) like so:\n\n```ts\nimport { TokenType, render } from 'alpine-md';\n\nrender('Hello **world**', {\n    [TokenType.BOLD]: 'strong'\n}); // expected output: \"Hello <strong>world</strong>\"\nadsfasdf\nasdf\nasdf\nasdf\nas\ndfas\ndf\nasdf\nasdf\nasd\nfa\n```\n\nThe `tokenizer(raw: string) -> Token[]` and `renderer(tokens: Token[], rawConfig: RenderConfig) -> string` functions are also exposed for more control, with the tokenizers returning a `Token[]` array that can passed in to the renderer to return the processed markdown string.\n\n## Dev and testing\n\nThis will be expanded on later. `npm run test` runs the test, which check the configuraton of constants in `src/constants`. All main components are in `src/modules.ts` and `index.ts` is the file that exposes all functions to the user.\n\n## License\n[MIT License](LICENSE.txt)")));

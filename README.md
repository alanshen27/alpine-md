# `alpine-md`

This is a light-weight **markdown-inspired** parser that will be used for certain components in the new app that I am creating. It allows for basic configurations in terms of rendering with the `RenderConfig` type, and uses a two step proccess from *tokenization* to a recursive *rendering/parsing* process to create the rendered result.

Do note that this parser does not strictly parsed based on the markdown syntax and is instead inspired.

## Using

Use the function `render(raw: string)` to get directly a rendered HTML string of your raw markdown. You can also pass in a `RenderConfig` with `TokenType` matched to HTML tag names to output custom tags (this functionality will be expanded in the future) like so:

```ts
import { TokenType, render } from 'alpine-md';

render('Hello **world**', {
    [TokenType.BOLD]: 'strong'
}); // expected output: "Hello <strong>world</strong>"

```

The `tokenizer(raw: string) -> Token[]` and `renderer(tokens: Token[], rawConfig: RenderConfig) -> string` functions are also exposed for more control, with the tokenizers returning a `Token[]` array that can passed in to the renderer to return the processed markdown string.

## Dev and testing

This will be expanded on later. `npm run test` runs the test, which check the configuraton of constants in `src/constants`. All main components are in `src/modules.ts` and `index.ts` is the file that exposes all functions to the user.

## License
[MIT License](LICENSE.txt)
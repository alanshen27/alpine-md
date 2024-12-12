import { SPECIAL_CHARS } from '../constants'
import { renderer, tokenizer } from '../modules';

// DESC: see /constants/index.ts SPECIAL_CHARS NOTE for more info
export const singleInstanceWhenDoubleInSpecialChar = () => {
    for (let i = 0; i < SPECIAL_CHARS.length; i++) {
        if (SPECIAL_CHARS[i].length == 2) {
            if (SPECIAL_CHARS.indexOf(SPECIAL_CHARS[i].split('')[0]) == -1) {
                return false;
            }
        }
    }
    return true;
}

// DESC: block chars must be a subarray (contain only elements of) SPECIAL_CHARS
export const blockCharsInSpecialChar = () => {
    for (let i = 0; i < SPECIAL_CHARS.length; i++) {
        if (SPECIAL_CHARS[i].length > 1) {
            if (SPECIAL_CHARS[i].split('').some((char) => SPECIAL_CHARS.indexOf(char) == -1)) {
                return false;
            }
        }
    }
    return true;
}

// DESC: block chars must be a subarray (contain only elements of) SPECIAL_CHARS
export const inlineCharsInSpecialChar = () => { // see above
    for (let i = 0; i < SPECIAL_CHARS.length; i++) {
        if (SPECIAL_CHARS[i].length == 1) {
            if (SPECIAL_CHARS.indexOf(SPECIAL_CHARS[i]) == -1) {
                return false;
            }
        }
    }
    return true;
}


export const testRun = (raw: string, verbose: boolean = false) => {
    if (verbose) {
        console.log('starting to compile raw string...')
        console.log('[info] raw string:');
        raw.split('\n').forEach((line, i) => console.log('\t', i, line));
        const start = Date.now();
        console.log('[info] tokenizing raw string...');
        const tokens = tokenizer(raw);
        console.log('[response] Tokens:');
        tokens.forEach((token, i) => console.log('\t', i, token))
        console.log('[info] rendering tokens...');
        const stack = renderer(tokens);
        console.log('[response] rendered HTML:');
        stack.split('\n').forEach((line, i) => console.log('\t', i, line));
        const end = Date.now();
        console.log('[benchmark] compiled in', end - start, 'ms');
    } else {
        const tokens = tokenizer(raw);
        const stack = renderer(tokens);
    }
}

export const testCheck = () => {
    console.log('[info] running tests...');
    if (!singleInstanceWhenDoubleInSpecialChar()) console.error('[test] singleInstanceWhenDoubleInSpecialChar:', singleInstanceWhenDoubleInSpecialChar());
    else console.log('[test] singleInstanceWhenDoubleInSpecialChar:', singleInstanceWhenDoubleInSpecialChar());
    if (!blockCharsInSpecialChar()) console.error('[test] blockCharsInSpecialChar:', blockCharsInSpecialChar());
    else console.log('[test] blockCharsInSpecialChar:', blockCharsInSpecialChar());
    if (!inlineCharsInSpecialChar()) console.error('[test] inlineCharsInSpecialChar:', inlineCharsInSpecialChar());
    else console.log('[test] inlineCharsInSpecialChar:', inlineCharsInSpecialChar());
    console.log('[response] tests complete');
}
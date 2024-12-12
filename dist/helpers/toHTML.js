"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHTML = void 0;
const toHTML = (tagName, end = false) => {
    return `<${end ? '/' : ''}${tagName}>`;
};
exports.toHTML = toHTML;

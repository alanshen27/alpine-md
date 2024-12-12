"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHTML = void 0;
const toHTML = (tagName, end = false) => {
    if (typeof tagName == 'string')
        return `<${end ? '/' : ''}${tagName}>`;
    if (end)
        return `</${tagName}>`;
    const keys = Object.keys(tagName);
    const attr = [];
    keys.forEach(key => {
        if (key != 'tagName') {
            attr.push(`${key}="${tagName[key]}"`);
        }
    });
    return `<${tagName.tagName} ${attr.join(' ')}>`;
};
exports.toHTML = toHTML;

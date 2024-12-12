import { Tag } from "../interface/Config";

export const toHTML = (tagName: string | Tag, end: boolean = false) => {
    if (typeof tagName == 'string') return `<${end ? '/' : ''}${tagName}>`;
    console.log(tagName)
    if (end)    return `</${tagName.tagName}>`

    const keys = Object.keys(tagName);

    const attr: string[] = [];

    keys.forEach(key => {
        if (key != 'tagName') {
            attr.push(`${key}="${tagName[key]}"`);
        }
    });

    return `<${tagName.tagName} ${attr.join(' ')}>`
}
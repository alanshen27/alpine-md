export const toHTML = (tagName: string, end: boolean = false) => {
    return `<${end ? '/' : ''}${tagName}>`;
}
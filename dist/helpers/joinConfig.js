"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinConfig = void 0;
const constants_1 = require("../constants");
const joinConfig = (config) => {
    return Object.assign(Object.assign({}, constants_1.RENDER_CONFIG), config);
};
exports.joinConfig = joinConfig;

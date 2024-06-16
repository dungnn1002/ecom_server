"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyByFilename = void 0;
const getKeyByFilename = (filename) => `${filename.split('.').slice(0, -1).join('.')}_${Date.now()}`;
exports.getKeyByFilename = getKeyByFilename;
//# sourceMappingURL=get-key-by-filename.util.js.map
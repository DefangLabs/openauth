"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.accountRouter = void 0;
var express_1 = __importDefault(require("express"));
var accounts_service_1 = require("./accounts.service");
exports.accountRouter = express_1["default"].Router();
exports.accountRouter["delete"]('/', accounts_service_1.deleteAccount);

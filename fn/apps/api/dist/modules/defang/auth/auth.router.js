"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_service_1 = require("./auth.service");
exports.authRouter = express_1["default"].Router();
exports.authRouter.get('/token', auth_service_1.getDefangToken);

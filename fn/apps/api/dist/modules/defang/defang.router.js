"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.defangRouter = void 0;
var express_1 = __importDefault(require("express"));
var services_router_1 = require("./services/services.router");
var auth_router_1 = require("./auth/auth.router");
exports.defangRouter = express_1["default"].Router();
exports.defangRouter.use('/services', services_router_1.servicesRouter);
exports.defangRouter.use('/auth', auth_router_1.authRouter);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.jwtRouter = void 0;
var express_1 = __importDefault(require("express"));
var jwt_service_1 = require("./jwt.service");
exports.jwtRouter = express_1["default"].Router();
exports.jwtRouter.get('/jwt', jwt_service_1.getJwt);

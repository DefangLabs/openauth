"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.servicesRouter = void 0;
var express_1 = __importDefault(require("express"));
var services_service_1 = require("./services.service");
exports.servicesRouter = express_1["default"].Router();
exports.servicesRouter.get('/', services_service_1.getServices);
exports.servicesRouter.get('/:serviceName', services_service_1.getService);
exports.servicesRouter.ws('/:serviceName/logs', services_service_1.getServiceLogs);

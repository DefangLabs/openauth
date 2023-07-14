"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var jwt_router_1 = require("./modules/jwt/jwt.router");
var services_router_1 = require("./modules/services/services.router");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({
    origin: '*',
    credentials: true
}));
app.get('/', function (req, res) {
    res.status(200).send({ message: 'I\'m alive, thank you very much.' });
});
app.use(jwt_router_1.jwtRouter);
app.use(services_router_1.servicesRouter);
app.listen(5001, function () {
    console.log('Server is listening on port 5001');
});

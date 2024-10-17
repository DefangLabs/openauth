"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_ws_1 = __importDefault(require("express-ws"));
var app = (0, express_1["default"])();
(0, express_ws_1["default"])(app);
app.use((0, cors_1["default"])({
    origin: '*',
    credentials: true
}));
app.get('/', function (req, res) {
    res.status(200).send({ message: 'I\'m alive, thank you very much.' });
});
var jwt_router_1 = require("./modules/jwt/jwt.router");
var defang_router_1 = require("./modules/defang/defang.router");
var accounts_router_1 = require("./modules/accounts/accounts.router");
app.use(jwt_router_1.jwtRouter);
app.use('/defang', defang_router_1.defangRouter);
app.use('/accounts', accounts_router_1.accountRouter);
app.listen(8001, function () {
    console.log('Server is listening on port 8001');
});

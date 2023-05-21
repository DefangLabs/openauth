"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(5001, function () {
    console.log('Server is listening on port 5001');
});

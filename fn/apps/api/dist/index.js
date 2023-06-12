"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({
    origin: '*',
    credentials: true
}));
app.get('/jwt', function (req, res) {
    // check if we have an authorization header
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error("Did you set the authorization header?");
        res.status(401).send({ error: 'No authorization header found' });
        return;
    }
    // check if the authorization header is a bearer token
    var authHeaderParts = authHeader.split(' ');
    if (authHeaderParts.length !== 2) {
        res.status(401).send({ error: 'No bearer token found' });
        return;
    }
    // return the token
    var token = authHeaderParts[1];
    res.send({ token: token });
});
app.listen(5009, function () {
    console.log('Server is listening on port 5001');
});

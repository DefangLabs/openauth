"use strict";
exports.__esModule = true;
exports.getJwt = void 0;
function getJwt(req, res) {
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
}
exports.getJwt = getJwt;

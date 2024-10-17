"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteAccount = void 0;
var zod_1 = __importDefault(require("zod"));
var validate_jwt_1 = require("../../lib/auth/validate-jwt");
var protobuf_1 = require("@bufbuild/protobuf");
var fabric_pb_1 = require("../../lib/defang/generated/fabric_pb");
var get_client_1 = require("../../lib/defang/get-client");
/**
 * Logs:
api:dev: @@ decoded:  {
api:dev:   exp: 1726186124,
api:dev:   'https://hasura.io/jwt/claims': {
api:dev:     'x-hasura-allowed-roles': [ 'public' ],
api:dev:     'x-hasura-default-role': 'public',
api:dev:     'x-hasura-user-id': 'anonymous'
api:dev:   },
api:dev:   iat: 1726186064,
api:dev:   iss: 'heimdall',
api:dev:   jti: '9507d23e-4840-4d50-9946-f3c92e0eb0ab',
api:dev:   nbf: 1726186064,
api:dev:   sub: ''
api:dev: }
 */
var decodedJwtSchema = zod_1["default"].object({
    exp: zod_1["default"].number(),
    'https://hasura.io/jwt/claims': zod_1["default"].object({
        'x-hasura-allowed-roles': zod_1["default"].array(zod_1["default"].string()),
        'x-hasura-default-role': zod_1["default"].string(),
        'x-hasura-user-id': zod_1["default"].string()
    }),
    iat: zod_1["default"].number(),
    iss: zod_1["default"].string(),
    jti: zod_1["default"].string(),
    nbf: zod_1["default"].number(),
    sub: zod_1["default"].string()
});
/**
 * Deletes the user from the Kratos database. (eventually our Auth.js service)
 */
function deleteAuth(_a) {
    var _b;
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("http://".concat((_b = process.env.KRATOS_DOMAIN) === null || _b === void 0 ? void 0 : _b.replace('4433', '4434'), "/admin/identities/").concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Calls the deletion endpoint from Fabric, which will take care of removing the user
 * from services like Segment, Intercom, Mixpanel, etc.
 */
function deleteFabric(_a) {
    var heimdallToken = _a.heimdallToken;
    return __awaiter(this, void 0, void 0, function () {
        var defangClient, defangTokenRequest, defangResponse, defangToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    defangClient = (0, get_client_1.getClient)();
                    defangTokenRequest = (0, protobuf_1.create)(fabric_pb_1.TokenRequestSchema, {
                        assertion: heimdallToken,
                        scope: ['tail', 'read', 'delete']
                    });
                    return [4 /*yield*/, defangClient.token(defangTokenRequest)];
                case 1:
                    defangResponse = _b.sent();
                    defangToken = defangResponse.accessToken;
                    defangClient = (0, get_client_1.getClient)(defangToken);
                    return [4 /*yield*/, defangClient.deleteMe({})];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Deletes the user from the Hasura database.
 */
function deleteProfile(_a) {
    var id = _a.id, authorization = _a.authorization;
    return __awaiter(this, void 0, void 0, function () {
        var operation;
        return __generator(this, function (_b) {
            operation = "\n        mutation DeleteProfile($id: uuid!) {\n            deleteProfilesByPk(id: $id) {\n                id\n            }\n        }\n    ";
            return [2 /*return*/, fetch("http://".concat(process.env.HASURA_DOMAIN, "/v1/graphql"), {
                    method: 'POST',
                    body: JSON.stringify({
                        query: operation,
                        variables: { id: id },
                        operationName: 'DeleteProfile'
                    }),
                    headers: {
                        Authorization: authorization
                    }
                }).then(function (result) { return result.json(); })];
        });
    });
}
/**
 * Deletes the user's account, taking care of triggering a variety of deletion
 * operations.
 */
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authHeader, token, decoded, decodedJwt, subject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authHeader = req.headers.authorization;
                    if (!authHeader) {
                        res.status(401).send({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    token = authHeader.split(' ')[1];
                    return [4 /*yield*/, (0, validate_jwt_1.validateJwt)(token)];
                case 1:
                    decoded = _a.sent();
                    decodedJwt = decodedJwtSchema.safeParse(decoded);
                    if (!decodedJwt.success) {
                        res.status(401).send({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    subject = decodedJwt.data.sub;
                    if (!subject) {
                        res.status(401).send({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    console.log('@@ deleting from fabric');
                    return [4 /*yield*/, deleteFabric({ heimdallToken: token })];
                case 2:
                    _a.sent();
                    console.log('@@ deleting from hasura');
                    return [4 /*yield*/, deleteProfile({ id: decodedJwt.data.sub, authorization: authHeader })];
                case 3:
                    _a.sent();
                    console.log('@@ deleting from kratos');
                    return [4 /*yield*/, deleteAuth({ id: decodedJwt.data.sub })];
                case 4:
                    _a.sent();
                    res.status(200).send({ message: 'Account deleted.' });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteAccount = deleteAccount;

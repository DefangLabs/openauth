"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
exports.getDefangToken = void 0;
var grpc = __importStar(require("@grpc/grpc-js"));
var fabric = __importStar(require("../../../lib/io/defang/v1/fabric_grpc_pb"));
var fabric_pb_1 = require("../../../lib/io/defang/v1/fabric_pb");
var getHeimdallJWT = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, authHeaderParts;
    return __generator(this, function (_a) {
        authHeader = req.headers.authorization;
        if (authHeader) {
            authHeaderParts = authHeader.split(' ');
            if (authHeaderParts.length === 2) {
                return [2 /*return*/, authHeaderParts[1]];
            }
        }
        return [2 /*return*/];
    });
}); };
var getUnauthedClient = function () { return __awaiter(void 0, void 0, void 0, function () {
    var defaultFabric;
    return __generator(this, function (_a) {
        defaultFabric = process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";
        return [2 /*return*/, new fabric.FabricControllerClient(defaultFabric, grpc.credentials.combineChannelCredentials(grpc.credentials.createSsl(), grpc.credentials.createFromMetadataGenerator(function (_, callback) {
                var metadata = new grpc.Metadata();
                callback(null, metadata);
            })))];
    });
}); };
var getDefangToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, heimdallJWT, client_1, tokenRequest_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getHeimdallJWT(req)];
            case 1:
                heimdallJWT = _a.sent();
                if (!heimdallJWT) return [3 /*break*/, 4];
                return [4 /*yield*/, getUnauthedClient()];
            case 2:
                client_1 = _a.sent();
                tokenRequest_1 = new fabric_pb_1.TokenRequest();
                tokenRequest_1.setAssertion(heimdallJWT);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        client_1.token(tokenRequest_1, function (err, response) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve((response === null || response === void 0 ? void 0 : response.toString()) || undefined);
                            }
                        });
                    })];
            case 3:
                token = _a.sent();
                _a.label = 4;
            case 4:
                res.status(201).json({ token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.getDefangToken = getDefangToken;

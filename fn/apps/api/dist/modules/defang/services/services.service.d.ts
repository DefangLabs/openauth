import { Request, Response } from "express";
import { WebsocketRequestHandler } from 'express-ws';
export declare function getServices(req: Request, res: Response): Promise<void>;
export declare function getService(req: Request, res: Response): Promise<void>;
export declare const getServiceLogs: WebsocketRequestHandler;
//# sourceMappingURL=services.service.d.ts.map
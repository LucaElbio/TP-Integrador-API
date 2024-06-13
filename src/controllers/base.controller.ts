import { Response } from 'express';
import { ResponseModel } from '../classes/ResponseModel';

export class BaseController {
    static sendResponse<T>(res: Response, code: number, message: string, data?: T, error?: unknown) {
        const response = new ResponseModel<T>(message, error, data);
        return res.status(code).json(response);
    }
}

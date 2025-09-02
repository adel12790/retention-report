import { Request, Response } from 'express';

export interface ApiResponse<T> {
    data: T;
    error?: string;
    message?: string;
    success: boolean;
}

export type CustomRequest<T> = Request & {
    body: T;
};

export interface CustomResponse<T> extends Response {
    json: (body: ApiResponse<T>) => this;
}

import { Request, Response, NextFunction } from 'express';
import { isServerError } from '@/utils/errors';
import { NotFoundError } from '@/types/errors';

export type ErrorResponse = {
  statusCode: number;
  message: string;
  reason?: string;
  errors?: Record<string, object>;
};

type ErrorConstructor<T> = abstract new (...args: never[]) => T;
type ErrorAdapter<T> = (err: T) => Partial<ErrorResponse> | undefined;

type ErrorTypeAdapter<T> = {
  errorType: ErrorConstructor<T>;
  adapter: ErrorAdapter<T>;
};

type ErrorTypeAdapters<T extends unknown[]> = {
  [K in keyof T]: ErrorTypeAdapter<T[K]>;
};

export function createErrorAdapter<T extends Error>(
  errorType: ErrorConstructor<T>,
  handler: ErrorAdapter<T>
): ErrorTypeAdapter<T> {
  return { errorType, adapter: handler };
}

export function createErrorMiddleware<T extends unknown[]>(...adapters: ErrorTypeAdapters<T>) {
  return function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    const response: ErrorResponse = {
      statusCode: 500,
      message: 'An internal server error has occurred'
    };

    for (const { errorType, adapter: handler } of adapters) {
      if (err instanceof errorType) {
        const convertedResponse = handler(err);
        if (convertedResponse !== undefined) {
          Object.assign(response, convertedResponse);
          break;
        }
      }
    }

    const { statusCode, ...additionalFields } = response;
    let responseData;
    if (!isServerError(statusCode)) {
      responseData = additionalFields;
    } else {
      const { message, ...data } = additionalFields;
      responseData = { message, data };
    }

    res.status(statusCode);

    if (isServerError(response.statusCode)) {
      res.jsend.error(responseData);
    } else {
      res.jsend.fail(responseData);
    }

    //next();
  };
}

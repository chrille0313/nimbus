import { createErrorAdapter } from '@/middleware/errorHandling';
import { formatValidationErrors } from '@/utils/format';
import { HttpError } from 'express-openapi-validator/dist/framework/types';

export const eoaValidatorErrorAdapter = createErrorAdapter(HttpError, (err: HttpError) => ({
  statusCode: err.status,
  message: err.name,
  reason: err.message,
  errors: formatValidationErrors(err.errors)
}));

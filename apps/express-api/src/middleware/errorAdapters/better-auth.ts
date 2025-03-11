import { APIError } from 'better-auth/api';
import { isClientError } from '@/utils/errors';
import { createErrorAdapter, ErrorResponse } from '@/middleware/errorHandling';

export const betterAuthErrorAdapter = createErrorAdapter(APIError, (err: APIError) => {
  const response: Partial<ErrorResponse> = {
    statusCode: err.statusCode
  };

  if (err.body?.message !== undefined) {
    response.message = err.body?.message;
  } else if (isClientError(err.statusCode)) {
    response.message = 'Unknown Client Error';
  }

  return response;
});

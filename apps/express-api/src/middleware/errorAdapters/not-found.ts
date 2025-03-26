import { createErrorAdapter } from '@/middleware/errorHandling';
import { NotFoundError } from '@/types/errors';

export const notFoundErrorAdapter = createErrorAdapter(NotFoundError, () => {
  return {
    statusCode: 404,
    message: 'Requested resource not found',
    reason: 'The requested resource does not exist'
  };
});

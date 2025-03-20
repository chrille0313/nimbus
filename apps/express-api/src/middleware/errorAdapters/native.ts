import { createErrorAdapter } from '@/middleware/errorHandling';

export const nativeErrorAdapter = createErrorAdapter(TypeError, (err: TypeError) => {
  if (err.message.includes('Request with GET/HEAD method cannot have body')) {
    return {
      statusCode: 400,
      message: 'Bad Request',
      reason: 'Request with GET/HEAD method cannot have body'
    };
  }
});

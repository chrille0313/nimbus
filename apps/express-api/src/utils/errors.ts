export function isServerError(statusCode: number) {
    return statusCode >= 500;
  }
  
export function isClientError(statusCode: number) {
    return statusCode >= 400 && statusCode < 500;
  }
  
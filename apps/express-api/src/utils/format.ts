import Lodash from 'lodash';
import { arrayToObject } from '.';
import { ValidationErrorItem } from 'express-openapi-validator/dist/framework/types';

export function formatValidationErrors(errors: ValidationErrorItem[]) {
  const formattedErrors: Record<string, object> = {};

  errors.forEach((error) => {
    const pathParts = error.path.split('/').filter(Boolean); // Filter out empty strings
    const location = pathParts[0] || 'unknown'; // body, query, params, response, e.g.

    if (!formattedErrors[location]) {
      formattedErrors[location] = {};
    }

    const fieldParts = pathParts.slice(1);

    const fieldErrorObject = arrayToObject(fieldParts, {
      message: error.message,
      errorCode: error.errorCode
    });

    Lodash.merge(formattedErrors[location], fieldErrorObject);
  });

  return formattedErrors;
}

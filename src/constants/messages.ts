export const ERROR_MESSAGES = {
  MATH: {
    EMPTY_ARRAY: 'At least one number is required',
    POSITIVE_REQUIRED: 'All numbers must be positive',
    INVALID_NUMBER: 'Invalid number provided',
  },
  JOKE: {
    NOT_FOUND: 'Joke not found',
    INVALID_TYPE: 'Invalid joke type. Must be "Chuck" or "Dad"',
    TEXT_REQUIRED: 'Joke text is required',
    USER_ID_REQUIRED: 'User ID is required',
    CATEGORY_ID_REQUIRED: 'Category ID is required',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Required field missing',
    INVALID_FORMAT: 'Invalid format',
    INVALID_ID: 'Invalid ID format',
  },
  EXTERNAL_API: {
    FETCH_ERROR: 'Failed to fetch joke from external API',
    TIMEOUT: 'Request timeout',
    CHUCK_NORRIS_ERROR: 'Failed to fetch Chuck Norris joke',
    DAD_JOKE_ERROR: 'Failed to fetch Dad joke',
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database error',
  },
};

export const SUCCESS_MESSAGES = {
  JOKE: {
    CREATED: 'Joke created successfully',
    UPDATED: 'Joke updated successfully',
    DELETED: 'Joke deleted successfully',
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

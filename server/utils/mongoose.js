
const ErrorTypes = {
  DUPLICATE_KEY: 'duplicate_key',
  UNKNOWN: 'unknown',
};

function getErrorType(error) {
  // check for duplicate key error
  // https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
  if (error.message.indexOf('duplicate key error')) {
    return ErrorTypes.DUPLICATE_KEY;
  }

  return ErrorTypes.UNKNOWN;
};

module.exports = {
  ErrorTypes,
  getErrorType,
}

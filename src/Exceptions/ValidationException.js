/**
 * Exception class for validation error.
 */
class ValidationException extends Error {
  /**
   * @param {Array|Object} error 
   * @param {String} message 
   */
  constructor(error = [], message = 'Validation error.')
  {
    super(message);
    this.status = 400;
    this.error = error;
  }
}

module.exports = ValidationException;
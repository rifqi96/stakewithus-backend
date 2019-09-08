/**
 * Exception class for resource not found error.
 */
class ResourceNotFoundException extends Error {
  /**
   * @param {String} resource 
   */
  constructor(resource = '')
  {
    const message = (resource || 'Resource') + ' is not found';
    super(message);
    this.status = 404;
  }
}

module.exports = ResourceNotFoundException;
/**
 * Exception class for page not found error.
 */
class PageNotFoundException extends Error {
  constructor()
  {
    const message = 'Page is not found';
    super(message);
    this.status = 404;
  }
}

module.exports = PageNotFoundException;
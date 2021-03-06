// # Email error
// Custom error class with status code and type prefilled.

function EmailError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 500;
  this.errorType = this.name;
}

EmailError.prototype = Object.create(Error.prototype);
EmailError.prototype.name = 'EmailError';
EmailError.prototype.constructor = EmailError;

module.exports = EmailError;

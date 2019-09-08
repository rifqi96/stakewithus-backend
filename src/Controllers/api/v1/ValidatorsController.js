var validatorsService = require('../../../Services/ValidatorsService');
var createError = require('http-errors');
var ValidationException = require('../../../Exceptions/ValidationException');

exports.getAll = (req, res, next) => {
  var validatorsPromise = validatorsService.getAll();

  return validatorsPromise.then(data => {
    res.send(data);
  });
};

exports.get = (req, res, next) => {
  var address = req.params.address || '';
  var validatorPromise = validatorsService.get(address);

  return validatorPromise.then(data => {
    res.send(data);
  })
  .catch(e => {
    // Return the error to global error handler
    next(createError(e));
  });
};

exports.create = (req, res, next) => {
  var data = req.body.result || null;

  if (!data)
    throw new ValidationException({
      result: [
        'result is not found'
      ]
    }, 'Request format is not correct');

  var validatorPromise = validatorsService.create(data);

  return validatorPromise.then(data => {
    res.status(201);
    res.send(data);
  });
};
var express = require('express');
var router = express.Router();

var validatorsController = require('../../../Controllers/api/v1/ValidatorsController');

/* validators routers. */
router.get('/', validatorsController.getAll);
router.get('/:address', validatorsController.get);
router.post('/', validatorsController.create);

module.exports = router;
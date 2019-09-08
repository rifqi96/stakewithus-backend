const models = require('../Models');
const ValidationException = require('../Exceptions/ValidationException');
const ResourceNotFoundException = require('../Exceptions/ResourceNotFoundException');

/**
 * Returns all validators
 * @returns {Promise}
 */
exports.getAll = () => {
  return models.Validator.findAll({
    include: [
      models.VotingPower
    ],
    order: [
      [ 'updatedAt', 'DESC' ],
      [ models.VotingPower, 'updatedAt', 'DESC' ]
    ]
  });
};

/**
 * Gets a validator from the address
 * @param {String} address
 * @returns {Promise}
 */
exports.get = address => {
  return models.Validator.findOne({
    where: {
      address: address
    },
    include: [
      models.VotingPower
    ],
    order: [
      [ models.VotingPower, 'updatedAt', 'DESC' ]
    ]
  })
  .then(data => {
    // Throw an error if not found
    if (!data)
      throw new ResourceNotFoundException();
    
    return data;
  });
};

/**
 * Add new or update existing validator(s)
 * @param {Object} data
 * @returns {Promise}
 */
exports.create = data => {
  let blockHeight = parseInt(data.block_height);
  const validators = data.validators;
  
  // Bail early
  if (!Array.isArray(validators) || !validators.length)
    throw new ValidationException({
      validators: [
        'Validator can\'t be empty'
      ]
    }, 'Request format is not correct');
  
  return models.Block
    // Get current highest block
    .max('blockHeight')
    // Update the new block if it's not higher than current highest block
    .then(highestBlock => {
      if (highestBlock && highestBlock >= blockHeight) {
        blockHeight = highestBlock + 1;
      }

      // Create a new block
      return models.Block.create({
        blockHeight
      });
    })
    .then(({ dataValues }) => {
      const newBlock = dataValues;

      // Create new or update existing validators
      const affectedValidatorPromises = validators.map(validator => {
        const address = validator.address || null;
        const pubKey = validator.pub_key || null;
        const proposerPriority = validator.proposer_priority || null;
        const votingPower = validator.voting_power || null;

        // Skip if the request for particular validator is not valid
        // All required fields can't be empty
        if (!address || !pubKey || !votingPower || !proposerPriority)
          return;

        // Find a validator then update if exists, else create a new one
        return models.Validator.findOrCreate({
          where: {
            address
          },
          defaults: {
            address,
            pubKey,
            proposerPriority
          }
        })
        // Add in new voting power for current validator
        .then(([validator, created]) => {
          return models.VotingPower.create(
            {
              value: votingPower,
              ValidatorId: validator.id
            }
          )
          .then(({ dataValues }) => {
            const validatorData = validator.dataValues;
            return {
              ...validatorData,
              VotingPower: dataValues
            };
          });
        });
      });

      // Get the promise array result
      return Promise.all(affectedValidatorPromises)
        // Remap the validator data by updatedAt DESC ordered
        .then(data => {
          return data.sort((a, b) => {
            const keyA = new Date(a.updatedAt);
            const keyB = new Date(b.updatedAt);

            // Compare the 2 dates in DESC order
            if(keyA > keyB) return -1;
            if(keyA < keyB) return 1;
            return 0;
          });
        });
    });
};
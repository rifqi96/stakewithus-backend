'use strict';
module.exports = (sequelize, DataTypes) => {
  const Validator = sequelize.define('Validator', {
    address: DataTypes.STRING,
    pubKey: DataTypes.JSON,
    proposerPriority: DataTypes.BIGINT
  }, {});
  Validator.associate = function(models) {
    models.Validator.hasMany(models.VotingPower);
  };
  return Validator;
};
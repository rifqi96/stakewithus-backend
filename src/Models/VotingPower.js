'use strict';
module.exports = (sequelize, DataTypes) => {
  const VotingPower = sequelize.define('VotingPower', {
    value: DataTypes.BIGINT
  }, {});
  VotingPower.associate = function(models) {
    models.VotingPower.belongsTo(models.Validator);
  };
  return VotingPower;
};
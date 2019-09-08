'use strict';
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    blockHeight: DataTypes.BIGINT
  }, {});
  
  return Block;
};
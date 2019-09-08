'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'VotingPowers',
    'ValidatorId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Validators',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
   );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'VotingPowers',
      'ValidatorId'
    );
  }
};

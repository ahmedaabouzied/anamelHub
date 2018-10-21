'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return
   [ queryInterface.addColumn('CaseTag',
    'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      default: Date.now()
    }
  ),
  queryInterface.addColumn('CaseTag',
  'updatedAt',{
    allowNull: false,
    type: Sequelize.DATE,
    default: Date.now()
  })
   ]},
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn('CaseTag','createdAt','updatedAt');
  }
};

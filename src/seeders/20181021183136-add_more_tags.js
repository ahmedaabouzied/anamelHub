'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Tags', [
        {
          title: "Pathology",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Orthodontics",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Orthodontics",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Extraction",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Pedo-",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Pereodontal disease",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Pulpitis",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Orthodontics",
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          title: "General Anastaesthia",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

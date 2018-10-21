'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      {
        title: "operative",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "amalgam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "composite",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "class I",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "class II",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "class III",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "class IV",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "class V",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "endodontics",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "crown",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "FPD",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "RPD",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "prosthesis",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "surgery",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "scaling",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {
        timeStamp: false
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', [
      {
        title: "operative"
      },
      {
        title: "amalgam"
      },
      {
        title: "composite"
      },
      {
        title: "class I"
      },
      {
        title: "class II"
      },
      {
        title: "class III"
      },
      {
        title: "class IV"
      },
      {
        title: "class V"
      },
      {
        title: "endodontics"
      },
      {
        title: "crown"
      },
      {
        title: "FPD"
      },
      {
        title: "RPD"
      },
      {
        title: "prosthesis"
      },
      {
        title: "surgery"
      },
      {
        title: "scaling"
      },
    ], {});
  }
};

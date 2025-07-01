"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../db/Rooms.json");
    data = data.map((e) => {
      return e;
    });

    await queryInterface.bulkInsert("Rooms", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};

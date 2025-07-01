"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../db/UserHasRooms.json");
    data = data.map((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert("UserHasRooms", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserHasRooms", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};

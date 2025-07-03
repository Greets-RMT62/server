"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../db/Chats.json");
    data = data.map((e) => {
      return e;
    });

    await queryInterface.bulkInsert("Chats", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Chats", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};

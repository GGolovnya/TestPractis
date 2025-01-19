'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Cars', [
      {
        model: "ВАЗ-2106",
        manufacturer: "АвтоВАЗ",
        year: 1976,
        data: JSON.stringify({
          engine: {
            type: "Бензиновый",
            power: "75 л.с.",
            volume: "1.6 л"
          },
          transmission: {
            type: "Механическая",
            gears: 4
          },
          dimensions: {
            length: 4166,
            width: 1611,
            height: 1440
          },
          performance: {
            maxSpeed: 152,
            acceleration: 16.5
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
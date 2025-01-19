'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Animals', [
      {
        name: 'Лео',
        species: 'Лев',
        age: 5,
        isEndangered: true,
        habitat: 'Саванна',
        diet: ['мясо', 'кости'],
        characteristics: JSON.stringify({
          color: 'золотистый',
          weight: 190,
          height: 120,
          specialTraits: ['грива', 'ночное зрение']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Луна',
        species: 'Волк',
        age: 3,
        isEndangered: false,
        habitat: 'Лес',
        diet: ['мясо', 'рыба'],
        characteristics: JSON.stringify({
          color: 'серый',
          weight: 45,
          height: 85,
          specialTraits: ['острый слух', 'выносливость']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Animals', null, {});
  }
};
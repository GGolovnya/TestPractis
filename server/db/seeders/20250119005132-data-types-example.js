// seeders/XXXXXX-data-types-example.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('DataTypesExample', [
      {
        textField: 'Простой текст',
        numberField: 42,
        decimalField: 123.45,
        booleanField: true,
        dateField: new Date(),
        jsonField: JSON.stringify({
          key1: 'value1',
          key2: 123,
          nested: {
            innerKey: 'innerValue'
          }
        }),
        arrayField: ['элемент1', 'элемент2', 'элемент3'],
        enumField: 'option1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        textField: 'Другой текст',
        numberField: 100,
        decimalField: 999.99,
        booleanField: false,
        dateField: new Date('2024-12-31'),
        jsonField: JSON.stringify({
          name: 'Тест',
          numbers: [1, 2, 3],
          active: true
        }),
        arrayField: ['тест1', 'тест2'],
        enumField: 'option2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('DataTypesExample', null, {});
  }
};
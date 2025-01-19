// seeders/XXXXXX-array-examples.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ArrayExamples', [
      {
        name: 'Simple text array',
        arrayData: JSON.stringify(['абрикос', 'томат', 'помидор']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Simple number array',
        arrayData: JSON.stringify([112, 3829, -133]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Simple date array',
        arrayData: JSON.stringify([
          new Date('2024-01-01').toISOString(),
          new Date('2024-06-15').toISOString(),
          new Date('2024-12-31').toISOString()
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mixed array',
        arrayData: JSON.stringify(['абрикос', 112, {}, [], new Date().toISOString(), false]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Recipe',
        arrayData: JSON.stringify({
          title: 'Борщ классический',
          ingredients: [
            {
              name: 'Свекла',
              quantity: 2,
              unit: 'шт',
              preparation: {
                method: 'натереть',
                size: 'крупно'
              }
            },
            {
              name: 'Картофель',
              quantity: 4,
              unit: 'шт',
              preparation: {
                method: 'нарезать',
                size: 'кубиками'
              }
            }
          ],
          steps: [
            {
              number: 1,
              description: 'Подготовка овощей',
              duration: 20,
              actions: ['помыть', 'почистить', 'нарезать']
            },
            {
              number: 2,
              description: 'Варка бульона',
              duration: 60,
              temperature: 100,
              checks: [
                {
                  time: '30 минут',
                  action: 'снять пену'
                },
                {
                  time: '60 минут',
                  action: 'проверить готовность мяса'
                }
              ]
            }
          ],
          cookingParams: {
            totalTime: 120,
            temperatureModes: [
              {
                stage: 'варка бульона',
                temperature: 100,
                duration: 60
              },
              {
                stage: 'тушение овощей',
                temperature: 85,
                duration: 30
              }
            ],
            notes: [
              'перед подачей настоять 15 минут',
              'подавать со сметаной'
            ]
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ArrayExamples', null, {});
  }
};
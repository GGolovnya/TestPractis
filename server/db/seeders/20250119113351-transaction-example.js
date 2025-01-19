'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        amount: 15000.50,
        type: 'расход',
        category: 'Продукты',
        date: new Date('2025-01-16'),
        description: 'Еженедельная закупка продуктов',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'Перекресток',
          tags: ['еда', 'регулярные расходы'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 50000.00,
        type: 'доход',
        category: 'Зарплата',
        date: new Date('2025-01-15'),
        description: 'Заработная плата за первую половину месяца',
        metadata: JSON.stringify({
          paymentMethod: 'банковский перевод',
          location: 'Сбербанк',
          tags: ['доход', 'работа'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 3500.00,
        type: 'расход',
        category: 'Транспорт',
        date: new Date('2025-01-17'),
        description: 'Пополнение транспортной карты',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'Метро',
          tags: ['проезд', 'регулярные расходы'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 8000.00,
        type: 'расход',
        category: 'Развлечения',
        date: new Date('2025-01-18'),
        description: 'Поход в кино и ресторан',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'ТРЦ Европейский',
          tags: ['отдых', 'досуг'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 2500.00,
        type: 'расход',
        category: 'Связь',
        date: new Date('2025-01-19'),
        description: 'Оплата мобильной связи',
        metadata: JSON.stringify({
          paymentMethod: 'онлайн',
          location: 'МТС',
          tags: ['телефон', 'интернет'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 12000.00,
        type: 'расход',
        category: 'Коммунальные услуги',
        date: new Date('2025-01-15'),
        description: 'Оплата ЖКХ за декабрь',
        metadata: JSON.stringify({
          paymentMethod: 'онлайн',
          location: 'ГКУ ИС',
          tags: ['квартира', 'регулярные расходы'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 5000.00,
        type: 'перевод',
        category: 'Перевод',
        date: new Date('2025-01-16'),
        description: 'Перевод на сберегательный счет',
        metadata: JSON.stringify({
          paymentMethod: 'банковский перевод',
          location: 'Сбербанк',
          tags: ['накопления'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 4500.00,
        type: 'расход',
        category: 'Здоровье',
        date: new Date('2025-01-17'),
        description: 'Покупка лекарств',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'Аптека 36.6',
          tags: ['медицина'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 3000.00,
        type: 'расход',
        category: 'Одежда',
        date: new Date('2025-01-18'),
        description: 'Покупка зимней обуви',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'Спортмастер',
          tags: ['обувь', 'сезонная одежда'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 20000.00,
        type: 'доход',
        category: 'Подработка',
        date: new Date('2025-01-19'),
        description: 'Оплата за фриланс проект',
        metadata: JSON.stringify({
          paymentMethod: 'банковский перевод',
          location: 'Тинькофф',
          tags: ['доход', 'фриланс'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 7500.00,
        type: 'расход',
        category: 'Образование',
        date: new Date('2025-01-15'),
        description: 'Оплата курсов по программированию',
        metadata: JSON.stringify({
          paymentMethod: 'карта',
          location: 'Курсера',
          tags: ['обучение', 'развитие'],
          attachments: []
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
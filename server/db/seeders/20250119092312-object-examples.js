// seeders/XXXXXX-object-examples.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ObjectExamples', [
      {
        name: 'Простой объект',
        objectData: JSON.stringify({
          string: 'текст',
          number: 42,
          boolean: true
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Объект с датами',
        objectData: JSON.stringify({
          startDate: new Date('2024-01-01').toISOString(),
          endDate: new Date('2024-12-31').toISOString(),
          isActive: true
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Вложенный объект',
        objectData: JSON.stringify({
          user: {
            name: 'Иван',
            age: 25,
            address: {
              city: 'Москва',
              street: 'Ленина'
            }
          },
          settings: {
            theme: 'темная',
            notifications: true
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Объект с массивами',
        objectData: JSON.stringify({
          tags: ['важное', 'срочное', 'новое'],
          counters: [1, 2, 3, 4, 5],
          mixed: ['текст', 42, true, null]
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Комплексный объект',
        objectData: JSON.stringify({
          primitives: {
            string: "Пример строки",
            number: 42,
            boolean: true,
            date: "2025-01-17T12:00:00Z",
            null: null,
            float: 3.14,
            enum: "active"
          },
          arrays: {
            simple: ["один", "два", "три"],
            mixed: ["текст", 123, true, null],
            nested: [
              ["уровень 1.1", "уровень 1.2"],
              ["уровень 2.1", "уровень 2.2"]
            ]
          },
          objects: {
            simple: {
              name: "Простой объект",
              value: 100
            },
            nested: {
              level1: {
                level2: {
                  level3: "Глубоко вложенное значение"
                }
              }
            }
          },
          complex: {
            arrayOfObjects: [
              { id: 1, name: "Первый" },
              { id: 2, name: "Второй" }
            ],
            objectWithArrays: {
              tags: ["важное", "срочное"],
              metadata: {
                created: "2025-01-17",
                versions: [1, 2, 3]
              }
            }
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Глубоко вложенный объект',
        objectData: JSON.stringify({
          organization: {
            name: "ТехноСофт",
            type: "Разработка ПО",
            departments: {
              development: {
                name: "Отдел разработки",
                teams: {
                  frontend: {
                    name: "Фронтенд команда",
                    projects: {
                      mainWebsite: {
                        name: "Основной веб-сайт",
                        status: "В разработке",
                        tasks: {
                          current: {
                            priority: {
                              urgent: {
                                task1: {
                                  description: "Оптимизация производительности",
                                  deadline: "2024-02-01",
                                  assignees: {
                                    lead: {
                                      profile: {
                                        name: "Александр",
                                        position: "Ведущий разработчик",
                                        skills: ["Реакт", "TypeScript", "Node.js"],
                                        contacts: {
                                          work: {
                                            internal: {
                                              location: {
                                                building: "Главный офис",
                                                floor: "4",
                                                room: "404",
                                                seat: "12A"
                                              },
                                              communication: {
                                                email: "alex@technosoft.ru",
                                                phone: "доб. 1234",
                                                messenger: "@alex_lead"
                                              }
                                            },
                                            external: {
                                              mobile: "+7-900-123-45-67",
                                              telegram: "@alex_dev"
                                            }
                                          }
                                        },
                                        schedule: {
                                          workDays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
                                          workHours: {
                                            start: "09:00",
                                            end: "18:00",
                                            timezone: "MSK"
                                          },
                                          meetings: {
                                            daily: {
                                              time: "10:00",
                                              duration: "30 минут",
                                              platform: "Зум"
                                            },
                                            weekly: {
                                              time: "14:00",
                                              day: "Пятница",
                                              duration: "1 час",
                                              platform: "Команды"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ObjectExamples', null, {});
  }
};
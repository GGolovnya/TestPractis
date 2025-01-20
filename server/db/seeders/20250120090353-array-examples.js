// seeders/XXXXXX-array-examples.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ArrayExamples', [
      {
        name: 'Простой массив текст',
        arrayData: JSON.stringify(['абрикос', 'томат', 'помидор']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Простой массив число',
        arrayData: JSON.stringify([112, 3829, -133]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Простой массив дата',
        arrayData: JSON.stringify([
          new Date('2024-01-01').toISOString(),
          new Date('2024-06-15').toISOString(),
          new Date('2024-12-31').toISOString()
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Составной массив',
        arrayData: JSON.stringify(['абрикос', 112, {}, [], new Date().toISOString(), false]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Рецепт',
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
      },
      {
        name: 'IT Company Structure',
        arrayData: JSON.stringify({
          company: {
            name: "ТехКорп",
            foundedIn: new Date('2020-01-15').toISOString(),
            departments: [
              {
                id: 1,
                name: "Разработка",
                budget: {
                  annual: 1000000,
                  quarterly: {
                    Q1: 250000,
                    Q2: 250000,
                    Q3: 250000,
                    Q4: 250000
                  },
                  categories: {
                    salaries: 700000,
                    equipment: 200000,
                    other: 100000
                  }
                },
                teams: [
                  {
                    id: "Команда-1",
                    name: "Фронтенд",
                    projects: [
                      {
                        id: "Проект-1",
                        name: "Редизайн веб-сайта",
                        status: { 
                          current: "активный", 
                          previous: "планирование",
                          history: [
                            {
                              date: new Date('2024-01-01').toISOString(),
                              status: "создан",
                              author: "PM-1"
                            },
                            {
                              date: new Date('2024-01-15').toISOString(),
                              status: "планирование",
                              author: "PM-1"
                            }
                          ]
                        },
                        members: [
                          {
                            id: "Разработчик-1",
                            name: "Анна",
                            position: {
                              title: "Ведущий разработчик",
                              level: 3,
                              responsibilities: ["программирование", "проверка кода", "наставничество"],
                              skills: {
                                primary: ["React", "TypeScript"],
                                secondary: ["Node.js", "Python"],
                                soft: ["лидерство", "коммуникация"]
                              }
                            },
                            contacts: {
                              work: {
                                email: "anna@tech.com",
                                slack: "@anna",
                                internal: {
                                  phone: "1234",
                                  office: "A-123"
                                }
                              },
                              emergency: {
                                name: "Иван",
                                relation: "супруг",
                                phone: "+7-900-123-45-67"
                              }
                            },
                            performance: {
                              reviews: [
                                {
                                  period: "2024-Q1",
                                  scores: {
                                    technical: 9,
                                    soft: 8,
                                    leadership: 9
                                  },
                                  feedback: {
                                    strengths: ["код", "менторство"],
                                    improvements: ["документация"]
                                  }
                                }
                              ],
                              metrics: {
                                codeQuality: {
                                  coverage: 95,
                                  bugs: {
                                    critical: 0,
                                    major: 2,
                                    minor: 5
                                  }
                                },
                                productivity: {
                                  velocity: 85,
                                  completion: 0.95
                                }
                              }
                            }
                          }
                        ],
                        timeline: {
                          start: new Date('2024-01-01').toISOString(),
                          end: new Date('2024-06-30').toISOString(),
                          milestones: [
                            {
                              date: new Date('2024-02-01').toISOString(),
                              name: "Минимально жизнеспособный продукт",
                              deliverables: {
                                required: ["основной функционал", "базовый интерфейс"],
                                optional: ["анимации"]
                              },
                              resources: {
                                team: ["Разработчки-1", "Разработчик-2"],
                                tools: ["figma", "jira"]
                              }
                            }
                          ],
                          sprints: [
                            {
                              number: 1,
                              duration: {
                                start: new Date('2024-01-01').toISOString(),
                                end: new Date('2024-01-14').toISOString()
                              },
                              goals: {
                                planned: ["настройка", "архитектура"],
                                achieved: ["настройка"],
                                carried: ["архитектура"]
                              },
                              metrics: {
                                velocity: 34,
                                burndown: {
                                  ideal: [40, 35, 30, 25, 20, 15, 10, 5, 0],
                                  actual: [40, 38, 35, 33, 30, 28, 25, 20, 15]
                                }
                              }
                            }
                          ]
                        }
                      }
                    ],
                    metrics: {
                      performance: {
                        sprint: {
                          velocity: 85,
                          completion: 0.9
                        },
                        quality: {
                          bugs: {
                            opened: 10,
                            closed: 8,
                            severity: {
                              high: 1,
                              medium: 4,
                              low: 5
                            }
                          },
                          testing: {
                            coverage: 0.85,
                            automated: 0.75
                          }
                        }
                      }
                    }
                  }
                ]
              }
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
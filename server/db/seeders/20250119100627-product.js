'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Products', [
      {
        productId: "AMZN-2025-XL55",
        title: "Смарт-телевизор XL55 4K HDR",
        data: JSON.stringify({
          images: [
            {
              url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/LG_Smart_TV.jpg",
              type: "main",
              alt: "Smart TV Front View"
            },
            {
              url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Samsung_UN40JU6500_Smart_LED_TV.jpg",
              type: "gallery",
              alt: "Smart TV Side View"
            }
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=_5PRuS_8efY",
              title: "Обзор Smart TV технологий",
              duration: "8:24"
            }
          ],
          description: {
            short: "55-дюймовый 4K HDR смарт-телевизор с AI-процессором",
            detailed: "Полное описание характеристик и возможностей...",
            features: [
              "4K разрешение",
              "HDR10+",
              "Smart TV на Android",
              "Голосовое управление"
            ]
          },
          price: {
            current: 49999.99,
            old: 59999.99,
            currency: "RUB",
            installment: {
              available: true,
              monthlyPayment: 4166.67,
              terms: 12
            }
          },
          specifications: {
            display: {
              size: 55,
              resolution: "3840x2160",
              technology: "LED",
              hdr: ["HDR10+", "Dolby Vision"]
            },
            sound: {
              power: "20W",
              channels: "2.0",
              dolby: true
            },
            connectivity: {
              hdmi: 4,
              usb: 2,
              wifi: true,
              bluetooth: "5.0"
            }
          },
          availability: {
            status: "in_stock",
            quantity: 15,
            deliveryOptions: [
              {
                type: "express",
                price: 500,
                estimatedDays: 1
              },
              {
                type: "standard",
                price: 0,
                estimatedDays: 3
              }
            ]
          },
          ratings: {
            average: 4.7,
            count: 253,
            distribution: {
              "5": 180,
              "4": 50,
              "3": 15,
              "2": 5,
              "1": 3
            },
            topReviews: [
              {
                author: "Александр М.",
                rating: 5,
                date: "2025-01-15",
                text: "Отличный телевизор, качество картинки превзошло ожидания"
              }
            ]
          },
          options: [
            {
              name: "Размер",
              values: ["55\"", "65\"", "75\""],
              selected: "55\""
            },
            {
              name: "Цвет",
              values: ["Чёрный", "Серебристый"],
              selected: "Чёрный"
            }
          ],
          metadata: {
            createdAt: "2025-01-01T00:00:00Z",
            updatedAt: "2025-01-19T10:30:00Z",
            categories: ["Электроника", "Телевизоры", "Smart TV"],
            tags: ["4K", "HDR", "Smart TV", "Android TV"],
            warranty: {
              months: 24,
              type: "official",
              extendable: true
            },
            manufacturer: {
              name: "XL Electronics",
              country: "Южная Корея",
              support: {
                phone: "+7-800-123-45-67",
                email: "support@xl-electronics.com",
                hours: "24/7"
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
// routers/animals.api.router.js
const router = require('express').Router();
const { Animal, AreaAnimal } = require('../../db/models');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/verifyTokens');

// Получение всех животных
router.get('/', async (req, res) => {
  console.log('Получен GET-запрос на /api/animals');
  try {
    const animals = await Animal.findAll();
    console.log('Отправка данных клиенту:', animals);
    res.json(animals);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения списка животных' });
  }
});

// Получение животного по ID
router.get('/:id', async (req, res) => {
  console.log(`Получен GET-запрос на /api/animals/${req.params.id}`);
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      console.log('Животное не найдено');
      return res.status(404).json({ message: 'Животное не найдено' });
    }
    console.log('Отправка данных клиенту:', animal);
    res.json(animal);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения информации о животном' });
  }
});

// Создание записи о животном (требует прав админа)
router.post('/', verifyAccessToken, verifyAdmin, async (req, res) => {
  console.log('Получен POST-запрос на /api/animals');
  console.log('Тело запроса:', req.body);
  try {
    const animal = await Animal.create({
      ...req.body,
      createdBy: req.user.id
    });
    console.log('Создана новая запись о животном:', animal);
    res.status(201).json(animal);
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
    res.status(500).json({ message: 'Ошибка создания записи о животном' });
  }
});

// Обновление информации о животном (требует прав админа)
router.put('/:id', verifyAccessToken, verifyAdmin, async (req, res) => {
  console.log(`Получен PUT-запрос на /api/animals/${req.params.id}`);
  console.log('Тело запроса:', req.body);
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      console.log('Животное не найдено');
      return res.status(404).json({ message: 'Животное не найдено' });
    }
    await animal.update(req.body);
    console.log('Информация о животном обновлена:', animal);
    res.json(animal);
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
    res.status(500).json({ message: 'Ошибка обновления информации о животном' });
  }
});

// Удаление записи о животном (требует прав админа)
router.delete('/:id', verifyAccessToken, verifyAdmin, async (req, res) => {
  console.log(`Получен DELETE-запрос на /api/animals/${req.params.id}`);
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      console.log('Животное не найдено');
      return res.status(404).json({ message: 'Животное не найдено' });
    }
    await animal.destroy();
    console.log('Запись о животном успешно удалена');
    res.json({ message: 'Запись о животном успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    res.status(500).json({ message: 'Ошибка удаления записи о животном' });
  }
});

module.exports = router;
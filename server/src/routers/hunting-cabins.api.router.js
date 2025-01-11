// routers/hunting-cabins.api.router.js
const router = require('express').Router();
const { HuntingCabin } = require('../../db/models');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/verifyTokens');

// Получение всех домиков
router.get('/', async (req, res) => {
  console.log('Получен GET-запрос на /api/hunting-cabins');
  try {
    const cabins = await HuntingCabin.findAll();
    console.log('Отправка данных клиенту:', cabins);
    res.json(cabins);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения списка домиков' });
  }
});

// Получение домика по ID
router.get('/:id', async (req, res) => {
  console.log(`Получен GET-запрос на /api/hunting-cabins/${req.params.id}`);
  try {
    const cabin = await HuntingCabin.findByPk(req.params.id);
    if (!cabin) {
      console.log('Домик не найден');
      return res.status(404).json({ message: 'Домик не найден' });
    }
    console.log('Отправка данных клиенту:', cabin);
    res.json(cabin);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения домика' });
  }
});

// Создание нового домика (требует авторизации)
router.post('/', verifyAccessToken, async (req, res) => {
  console.log('Получен POST-запрос на /api/hunting-cabins');
  console.log('Тело запроса:', req.body);
  try {
    const cabin = await HuntingCabin.create(req.body);
    console.log('Создан новый домик:', cabin);
    res.status(201).json(cabin);
  } catch (error) {
    console.error('Ошибка при создании домика:', error);
    res.status(500).json({ message: 'Ошибка создания домика' });
  }
});

// Частичное обновление домика (требует авторизации)
router.patch('/:id', verifyAccessToken, async (req, res) => {
  console.log(`Получен PATCH-запрос на /api/hunting-cabins/${req.params.id}`);
  console.log('Тело запроса:', req.body);
  try {
    const cabin = await HuntingCabin.findByPk(req.params.id);
    if (!cabin) {
      console.log('Домик не найден');
      return res.status(404).json({ message: 'Домик не найден' });
    }
    await cabin.update(req.body);
    console.log('Домик обновлен:', cabin);
    res.json(cabin);
  } catch (error) {
    console.error('Ошибка при обновлении домика:', error);
    res.status(500).json({ message: 'Ошибка обновления домика' });
  }
});

// Удаление домика (требует прав админа)
router.delete('/:id', verifyAccessToken, verifyAdmin, async (req, res) => {
  console.log(`Получен DELETE-запрос на /api/hunting-cabins/${req.params.id}`);
  try {
    const cabin = await HuntingCabin.findByPk(req.params.id);
    if (!cabin) {
      console.log('Домик не найден');
      return res.status(404).json({ message: 'Домик не найден' });
    }
    await cabin.destroy();
    console.log('Домик успешно удален');
    res.json({ message: 'Домик успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении домика:', error);
    res.status(500).json({ message: 'Ошибка удаления домика' });
  }
});

module.exports = router;
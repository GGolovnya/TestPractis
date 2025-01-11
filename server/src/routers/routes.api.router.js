// routers/routes.api.router.js
const router = require('express').Router();
const { Route } = require('../../db/models');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/verifyTokens');

// Получение всех маршрутов
router.get('/', async (req, res) => {
  console.log('Получен GET-запрос на /api/routes');
  try {
    const routes = await Route.findAll();
    console.log('Отправка данных клиенту:', routes);
    res.json(routes);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения маршрутов' });
  }
});

// Получение маршрута по ID
router.get('/:id', async (req, res) => {
  console.log(`Получен GET-запрос на /api/routes/${req.params.id}`);
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) {
      console.log('Маршрут не найден');
      return res.status(404).json({ message: 'Маршрут не найден' });
    }
    console.log('Отправка данных клиенту:', route);
    res.json(route);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка получения маршрута' });
  }
});

// Создание маршрута (требует авторизации)
router.post('/', verifyAccessToken, async (req, res) => {
  console.log('Получен POST-запрос на /api/routes');
  console.log('Тело запроса:', req.body);
  try {
    const route = await Route.create({
      ...req.body,
      createdBy: req.user.id
    });
    console.log('Создан новый маршрут:', route);
    res.status(201).json(route);
  } catch (error) {
    console.error('Ошибка при создании маршрута:', error);
    res.status(500).json({ message: 'Ошибка создания маршрута' });
  }
});

// Частичное обновление маршрута (создатель или админ)
router.patch('/:id', verifyAccessToken, async (req, res) => {
  console.log(`Получен PATCH-запрос на /api/routes/${req.params.id}`);
  console.log('Тело запроса:', req.body);
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) {
      console.log('Маршрут не найден');
      return res.status(404).json({ message: 'Маршрут не найден' });
    }
    if (route.createdBy !== req.user.id && !req.user.isAdmin) {
      console.log('Отказано в доступе: пользователь не является создателем или админом');
      return res.status(403).json({ message: 'Нет прав на редактирование' });
    }
    await route.update(req.body);
    console.log('Маршрут обновлен:', route);
    res.json(route);
  } catch (error) {
    console.error('Ошибка при обновлении маршрута:', error);
    res.status(500).json({ message: 'Ошибка обновления маршрута' });
  }
});

// Удаление маршрута (создатель или админ)
router.delete('/:id', verifyAccessToken, async (req, res) => {
  console.log(`Получен DELETE-запрос на /api/routes/${req.params.id}`);
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) {
      console.log('Маршрут не найден');
      return res.status(404).json({ message: 'Маршрут не найден' });
    }
    if (route.createdBy !== req.user.id && !req.user.isAdmin) {
      console.log('Отказано в доступе: пользователь не является создателем или админом');
      return res.status(403).json({ message: 'Нет прав на удаление' });
    }
    await route.destroy();
    console.log('Маршрут успешно удален');
    res.json({ message: 'Маршрут успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении маршрута:', error);
    res.status(500).json({ message: 'Ошибка удаления маршрута' });
  }
});

// Верификация маршрута (только админ)
router.patch('/:id/verify', verifyAccessToken, verifyAdmin, async (req, res) => {
  console.log(`Получен PATCH-запрос на /api/routes/${req.params.id}/verify`);
  try {
    const route = await Route.findByPk(req.params.id);
    if (!route) {
      console.log('Маршрут не найден');
      return res.status(404).json({ message: 'Маршрут не найден' });
    }
    await route.update({ isVerified: true });
    console.log('Маршрут верифицирован:', route);
    res.json({ message: 'Маршрут верифицирован' });
  } catch (error) {
    console.error('Ошибка при верификации маршрута:', error);
    res.status(500).json({ message: 'Ошибка верификации маршрута' });
  }
});

module.exports = router;
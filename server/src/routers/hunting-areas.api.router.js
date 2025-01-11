const router = require('express').Router();
const { HuntingArea } = require('../../db/models');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/verifyTokens');

// Получение списка всех зон
router.get('/', async (req, res) => {
  console.log('Получен GET-запрос на /api/hunting-areas');
  try {
    const areas = await HuntingArea.findAll();
    console.log('Отправка данных клиенту:', areas);
    res.json(areas);
  } catch (error) {
    console.error(error);
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось получить список зон' });
  }
});

// Получение публичных зон
router.get('/public', async (req, res) => {
  try {
    const areas = await HuntingArea.findAll({
      where: { userId: null }
    });
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось получить список публичных зон' });
  }
});

// Получение личных зон (требует авторизации)
router.get('/private', verifyAccessToken, async (req, res) => {
  try {
    const areas = await HuntingArea.findAll({
      where: { userId: req.user.id }
    });
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось получить список личных зон' });
  }
});

// Получение конкретной зоны
router.get('/:id', verifyAccessToken, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Зона не найдена: указанный идентификатор отсутствует в базе данных' });
    }
    
    // Проверка доступа к личной зоне
    if (area.userId && (req.user.id !== area.userId && req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Отказано в доступе: у вас нет прав для просмотра этой зоны' });
    }
    
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось получить информацию о зоне' });
  }
});

// Создание новой зоны (требует авторизации)
router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const area = await HuntingArea.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось создать новую зону. Проверьте правильность введенных данных' });
  }
});

// Массовое создание зон (только админ)
router.post('/bulk', verifyAccessToken, verifyAdmin, async (req, res) => {
  try {
    const areas = await HuntingArea.bulkCreate(req.body);
    res.status(201).json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось выполнить массовое создание зон. Проверьте формат данных' });
  }
});

// Обновление зоны (владелец или админ)
router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Зона не найдена: невозможно обновить несуществующую зону' });
    }
    
    if (area.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Отказано в доступе: вы не являетесь владельцем зоны или администратором' });
    }
    
    await area.update(req.body);
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось обновить зону. Проверьте правильность данных' });
  }
});

// Частичное обновление зоны (владелец или админ)
router.patch('/:id', verifyAccessToken, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Зона не найдена: невозможно обновить несуществующую зону' });
    }
    
    if (area.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Отказано в доступе: вы не являетесь владельцем зоны или администратором' });
    }
    
    await area.update(req.body);
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось частично обновить зону. Проверьте правильность данных' });
  }
});

// Удаление зоны (владелец или админ)
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Зона не найдена: невозможно удалить несуществующую зону' });
    }
    
    if (area.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Отказано в доступе: вы не являетесь владельцем зоны или администратором' });
    }
    
    await area.destroy();
    res.json({ message: 'Зона успешно удалена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось удалить зону' });
  }
});

// Массовое удаление зон (только админ)
router.delete('/bulk', verifyAccessToken, verifyAdmin, async (req, res) => {
  try {
    await HuntingArea.destroy({
      where: {
        id: req.body.ids
      }
    });
    res.json({ message: 'Зоны успешно удалены' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера: не удалось выполнить массовое удаление зон' });
  }
});

module.exports = router;
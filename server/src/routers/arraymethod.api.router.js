const router = require('express').Router();
const { ArrayMethod } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Получить все методы массивов
router.get('/', async (req, res, next) => {
  try {
    const { sort, filter } = req.query;
    let options = {};
    
    if (sort) {
      options.order = [[sort, 'ASC']];
    }
    
    if (filter) {
      options.where = {
        method: {
          [Op.iLike]: `%${filter}%`
        }
      };
    }
    
    const methods = await ArrayMethod.findAll(options);
    res.json(methods);
  } catch (error) {
    next(error);
  }
});

// Получить метод по ID
router.get('/:id', checkResource(ArrayMethod), async (req, res) => {
  res.json(req.resource);
});

// Создать новый метод
router.post('/', async (req, res, next) => {
  try {
    const newMethod = await ArrayMethod.create(req.body);
    res.status(201).json(newMethod);
  } catch (error) {
    next(error);
  }
});

// Обновить метод
router.put('/:id', checkResource(ArrayMethod), async (req, res, next) => {
  try {
    await req.resource.update(req.body);
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Частично обновить метод
router.patch('/:id', checkResource(ArrayMethod), async (req, res, next) => {
  try {
    await req.resource.update(req.body, { fields: Object.keys(req.body) });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Удалить метод
router.delete('/:id', checkResource(ArrayMethod), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Поиск по описанию
router.get('/search/description', async (req, res, next) => {
  try {
    const { query } = req.query;
    const methods = await ArrayMethod.findAll({
      where: {
        description: {
          [Op.iLike]: `%${query}%`
        }
      }
    });
    res.json(methods);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
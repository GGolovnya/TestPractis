const router = require('express').Router();
const { DataTypesExample } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Получить все примеры
router.get('/', async (req, res, next) => {
  try {
    const { sort, filter } = req.query;
    let options = {};
    
    if (sort) {
      options.order = [[sort, 'ASC']];
    }
    
    if (filter) {
      options.where = {
        textField: {
          [Op.iLike]: `%${filter}%`
        }
      };
    }
    
    const examples = await DataTypesExample.findAll(options);
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

// Получить пример по ID
router.get('/:id', checkResource(DataTypesExample), async (req, res) => {
  res.json(req.resource);
});

// Создать новый пример
router.post('/', async (req, res, next) => {
  try {
    const newExample = await DataTypesExample.create(req.body);
    res.status(201).json(newExample);
  } catch (error) {
    next(error);
  }
});

// Обновить пример
router.put('/:id', checkResource(DataTypesExample), async (req, res, next) => {
  try {
    await req.resource.update(req.body);
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Частично обновить пример
router.patch('/:id', checkResource(DataTypesExample), async (req, res, next) => {
  try {
    await req.resource.update(req.body, { fields: Object.keys(req.body) });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Удалить пример
router.delete('/:id', checkResource(DataTypesExample), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Поиск по JSON полю
router.get('/search/json', async (req, res, next) => {
  try {
    const { key, value } = req.query;
    const examples = await DataTypesExample.findAll({
      where: {
        jsonField: {
          [Op.contains]: { [key]: value }
        }
      }
    });
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

// Поиск по массиву
router.get('/search/array', async (req, res, next) => {
  try {
    const { value } = req.query;
    const examples = await DataTypesExample.findAll({
      where: {
        arrayField: {
          [Op.contains]: [value]
        }
      }
    });
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
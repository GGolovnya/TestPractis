const router = require('express').Router();
const { ArrayExamples } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Получить все примеры массивов
router.get('/', async (req, res, next) => {
  try {
    const { sort, filter } = req.query;
    let options = {};
    
    if (sort) {
      options.order = [[sort, 'ASC']];
    }
    
    if (filter) {
      options.where = {
        name: {
          [Op.iLike]: `%${filter}%`
        }
      };
    }
    
    const examples = await ArrayExamples.findAll(options);
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

// Получить пример массива по ID
router.get('/:id', checkResource(ArrayExamples), async (req, res) => {
  res.json(req.resource);
});

// Создать новый пример массива
router.post('/', async (req, res, next) => {
  try {
    const { name, arrayData } = req.body;
    const newExample = await ArrayExamples.create({
      name,
      arrayData: JSON.stringify(arrayData)
    });
    res.status(201).json(newExample);
  } catch (error) {
    next(error);
  }
});

// Обновить пример массива
router.put('/:id', checkResource(ArrayExamples), async (req, res, next) => {
  try {
    const { name, arrayData } = req.body;
    await req.resource.update({
      name,
      arrayData: JSON.stringify(arrayData)
    });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Удалить пример массива
router.delete('/:id', checkResource(ArrayExamples), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Поиск по содержимому массива
router.get('/search/content', async (req, res, next) => {
  try {
    const { query } = req.query;
    const examples = await ArrayExamples.findAll({
      where: {
        arrayData: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
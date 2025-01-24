const router = require('express').Router();
const { ObjectExamples } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Получить все примеры объектов
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
    
    const examples = await ObjectExamples.findAll(options);
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

// Получить пример объекта по ID
router.get('/:id', checkResource(ObjectExamples), async (req, res) => {
  res.json(req.resource);
});

// Создать новый пример объекта
router.post('/', async (req, res, next) => {
  try {
    const { name, objectData } = req.body;
    const newExample = await ObjectExamples.create({
      name,
      objectData: JSON.stringify(objectData)
    });
    res.status(201).json(newExample);
  } catch (error) {
    next(error);
  }
});

// Обновить пример объекта
router.put('/:id', checkResource(ObjectExamples), async (req, res, next) => {
  try {
    const { name, objectData } = req.body;
    await req.resource.update({
      name,
      objectData: JSON.stringify(objectData)
    });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Частично обновить пример объекта
router.patch('/:id', checkResource(ObjectExamples), async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.objectData) updates.objectData = JSON.stringify(req.body.objectData);
    
    await req.resource.update(updates);
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Удалить пример объекта
router.delete('/:id', checkResource(ObjectExamples), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Поиск по значению в объекте
router.get('/search/value', async (req, res, next) => {
  try {
    const { key, value } = req.query;
    const examples = await ObjectExamples.findAll({
      where: {
        objectData: {
          [Op.contains]: { [key]: value }
        }
      }
    });
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

// Поиск по вложенному пути в объекте
router.get('/search/path', async (req, res, next) => {
  try {
    const { path, value } = req.query;
    const pathArray = path.split('.');
    
    const examples = await ObjectExamples.findAll({
      where: sequelize.where(
        sequelize.cast(
          sequelize.json(pathArray.map(p => `objectData.${p}`).join('.')),
          'text'
        ),
        { [Op.iLike]: `%${value}%` }
      )
    });
    res.json(examples);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
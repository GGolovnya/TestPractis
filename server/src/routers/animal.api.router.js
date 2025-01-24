const router = require('express').Router();
const { Op } = require ('sequelize')
const { Animal } = require('../../db/models');
// Получение всех животных
router.get('/', async (req, res, next) => {
  try {

    const {sort, filter } = req.query;
    let options = {};

    if(sort) {
      options.order = [[sort, 'ASC']];
    }

    if (filter) {
      options.where = {
        name: {
          [Op.iLike]: `%${filter}%`
        }
      };
    }

    const animals = await Animal.findAll(options);
    res.json(animals);
  } catch (error) {
    next(error);
  }
});

// Получение животного по ID
router.get('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      const error = new Error('Животное не найдено');
      error.name = 'NotFoundError';
      throw error;
    }
    res.json(animal);
  } catch (error) {
    next(error);
  }
});

// Создание нового животного
router.post('/', async (req, res, next) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.status(201).json(newAnimal);
  } catch (error) {
    next(error);
  }
});

// Полное обновление животного
router.put('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      const error = new Error('Животное не найдено');
      error.name = 'NotFoundError';
      throw error;
    }
    await animal.update(req.body);
    res.json(animal);
  } catch (error) {
    next(error);
  }
});

// Частичное обновление животного
router.patch('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      const error = new Error('Животное не найдено');
      error.name = 'NotFoundError';
      throw error;
    }
    await animal.update(req.body, { fields: Object.keys(req.body) });
    res.json(animal);
  } catch (error) {
    next(error);
  }
});

// Удаление животного
router.delete('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) {
      const error = new Error('Животное не найдено');
      error.name = 'NotFoundError';
      throw error;
    }
    await animal.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
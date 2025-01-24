const router = require('express').Router();
const { Car } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Получить все автомобили
router.get('/', async (req, res, next) => {
  try {
    const { sort, filter } = req.query;
    let options = {};
    
    if (sort) {
      options.order = [[sort, 'ASC']];
    }
    
    if (filter) {
      options.where = {
        model: {
          [Op.iLike]: `%${filter}%`
        }
      };
    }
    
    const cars = await Car.findAll(options);
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

// Получить автомобиль по ID
router.get('/:id', checkResource(Car), async (req, res) => {
  res.json(req.resource);
});

// Создать новый автомобиль
router.post('/', async (req, res, next) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
});

// Обновить автомобиль
router.put('/:id', checkResource(Car), async (req, res, next) => {
  try {
    await req.resource.update(req.body);
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Частично обновить автомобиль
router.patch('/:id', checkResource(Car), async (req, res, next) => {
  try {
    await req.resource.update(req.body, { fields: Object.keys(req.body) });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Удалить автомобиль
router.delete('/:id', checkResource(Car), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Поиск по характеристикам двигателя
router.get('/search/engine', async (req, res, next) => {
  try {
    const { type, volume, power } = req.query;
    const cars = await Car.findAll({
      where: {
        data: {
          engine: {
            ...(type && { type }),
            ...(volume && { volume }),
            ...(power && { power })
          }
        }
      }
    });
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
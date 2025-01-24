const router = require('express').Router();
const { Product } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');

// Базовые CRUD операции
router.get('/', async (req, res, next) => {
  try {
    const { sort, filter, category, priceMin, priceMax, inStock } = req.query;
    let options = {};
    let where = {};
    
    if (sort) {
      options.order = [[sort, 'ASC']];
    }
    
    if (filter) {
      where.title = { [Op.iLike]: `%${filter}%` };
    }
    
    if (category) {
      where['data.metadata.categories'] = { [Op.contains]: [category] };
    }
    
    if (priceMin || priceMax) {
      where['data.price.current'] = {};
      if (priceMin) where['data.price.current'][Op.gte] = parseFloat(priceMin);
      if (priceMax) where['data.price.current'][Op.lte] = parseFloat(priceMax);
    }
    
    if (inStock === 'true') {
      where['data.availability.status'] = 'in_stock';
    }
    
    options.where = where;
    
    const products = await Product.findAll(options);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkResource(Product), async (req, res) => {
  res.json(req.resource);
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Специализированные эндпоинты для работы с карточкой товара

// Обновление цены
router.patch('/:id/price', checkResource(Product), async (req, res, next) => {
  try {
    const { current, old, currency } = req.body;
    const updatedProduct = await req.resource.update({
      'data.price.current': current,
      'data.price.old': old,
      'data.price.currency': currency
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Обновление наличия
router.patch('/:id/availability', checkResource(Product), async (req, res, next) => {
  try {
    const { status, quantity } = req.body;
    const updatedProduct = await req.resource.update({
      'data.availability.status': status,
      'data.availability.quantity': quantity
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Добавление изображения
router.post('/:id/images', checkResource(Product), async (req, res, next) => {
  try {
    const { url, type, alt } = req.body;
    const currentData = req.resource.data;
    currentData.images.push({ url, type, alt });
    await req.resource.update({ data: currentData });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Обновление рейтинга
router.patch('/:id/ratings', checkResource(Product), async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const currentData = req.resource.data;
    
    // Обновление распределения оценок
    currentData.ratings.distribution[rating] += 1;
    
    // Пересчет среднего рейтинга
    const totalRatings = Object.values(currentData.ratings.distribution).reduce((a, b) => a + b, 0);
    const weightedSum = Object.entries(currentData.ratings.distribution)
      .reduce((sum, [rating, count]) => sum + (parseInt(rating) * count), 0);
    currentData.ratings.average = weightedSum / totalRatings;
    currentData.ratings.count = totalRatings;
    
    // Добавление отзыва если есть
    if (review) {
      currentData.ratings.topReviews.unshift({
        ...review,
        rating,
        date: new Date().toISOString()
      });
      // Оставляем только топ-10 отзывов
      currentData.ratings.topReviews = currentData.ratings.topReviews.slice(0, 10);
    }
    
    await req.resource.update({ data: currentData });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

// Поиск по характеристикам
router.get('/search/specifications', async (req, res, next) => {
  try {
    const { category, specs } = req.query;
    const products = await Product.findAll({
      where: {
        'data.metadata.categories': { [Op.contains]: [category] },
        'data.specifications': specs
      }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
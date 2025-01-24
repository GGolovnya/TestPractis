const router = require('express').Router();
const { Transaction } = require('../../db/models');
const { Op } = require('sequelize');
const checkResource = require('../middlewares/checkResource');
const sequelize = require('sequelize');

// Базовые CRUD операции
router.get('/', async (req, res, next) => {
  try {
    const { startDate, endDate, type, category, minAmount, maxAmount, sort } = req.query;
    let where = {};
    let order = [];

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    if (type) where.type = type;
    if (category) where.category = category;

    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount[Op.gte] = parseFloat(minAmount);
      if (maxAmount) where.amount[Op.lte] = parseFloat(maxAmount);
    }

    if (sort) {
      const [field, direction] = sort.split(':');
      order.push([field, direction.toUpperCase()]);
    } else {
      order.push(['date', 'DESC']);
    }

    const transactions = await Transaction.findAll({ where, order });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkResource(Transaction), async (req, res) => {
  res.json(req.resource);
});

router.post('/', async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkResource(Transaction), async (req, res, next) => {
  try {
    await req.resource.update(req.body);
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', checkResource(Transaction), async (req, res, next) => {
  try {
    await req.resource.update(req.body, { fields: Object.keys(req.body) });
    res.json(req.resource);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkResource(Transaction), async (req, res, next) => {
  try {
    await req.resource.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Специализированные эндпоинты

// Получить статистику по транзакциям
router.get('/stats', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let dateWhere = {};
    
    if (startDate || endDate) {
      dateWhere = {
        date: {}
      };
      if (startDate) dateWhere.date[Op.gte] = new Date(startDate);
      if (endDate) dateWhere.date[Op.lte] = new Date(endDate);
    }

    const stats = await Transaction.findAll({
      where: dateWhere,
      attributes: [
        'type',
        [sequelize.fn('sum', sequelize.col('amount')), 'total'],
        [sequelize.fn('count', sequelize.col('id')), 'count']
      ],
      group: ['type']
    });

    const categoryStats = await Transaction.findAll({
      where: dateWhere,
      attributes: [
        'category',
        [sequelize.fn('sum', sequelize.col('amount')), 'total'],
        [sequelize.fn('count', sequelize.col('id')), 'count']
      ],
      group: ['category']
    });

    res.json({
      byType: stats,
      byCategory: categoryStats
    });
  } catch (error) {
    next(error);
  }
});

// Получить транзакции по тегам
router.get('/search/tags', async (req, res, next) => {
  try {
    const { tags } = req.query;
    const tagsArray = tags.split(',');
    
    const transactions = await Transaction.findAll({
      where: {
        'metadata.tags': {
          [Op.overlap]: tagsArray
        }
      }
    });
    
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
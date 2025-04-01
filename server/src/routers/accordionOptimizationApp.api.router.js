const router = require('express').Router();
const { calculateFibonacci } = require('../AccordionOptimizationApp/index');

router.post('/', async (req, res) => {
  try {
    const { id, data, n } = req.body;
    // PINK: Используем переданное n, если есть, иначе рандом 33-47
    const fibN = n || Math.floor(Math.random() * 15) + 33;
    const result = await calculateFibonacci(fibN);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
});

module.exports = router;
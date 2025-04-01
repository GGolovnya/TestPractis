const router = require('express').Router();
const { calculateFibonacci } = require('../AccordionOptimizationApp/index');

router.post('/', async (req, res) => {
    try {
        const { id, data } = req.body;
        // Используем тот же диапазон, что и на клиенте (33-47)
        const n = Math.floor(Math.random() * 15) + 33;
        const result = await calculateFibonacci(n);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
});

module.exports = router;
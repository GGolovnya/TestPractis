const router = require('express').Router();
const { AnimalExample } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const animals = await AnimalExample.findAll();
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const animal = await AnimalExample.findByPk(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    
    await animal.update(req.body);
    res.json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/view', async (req, res) => {
  try {
    const animal = await AnimalExample.findByPk(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    
    animal.views += 1;
    await animal.save();
    res.json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
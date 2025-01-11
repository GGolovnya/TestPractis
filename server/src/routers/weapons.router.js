const router = require("express").Router();
const { Weapon } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const weapons = await Weapon.findAll();
    res.status(200).json(weapons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении списка оружия." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const weapon = await Weapon.findByPk(id);

    if (!weapon) {
      return res.status(404).json({ error: "Оружие не найдено." });
    }

    res.status(200).json(weapon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении данных оружия." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { model, description, model_link, img_link } = req.body;

    const newWeapon = await Weapon.create({
      model,
      description,
      model_link,
      img_link,
    });

    res.status(201).json(newWeapon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании оружия." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { model, description, model_link, img_link } = req.body;

    const weapon = await Weapon.findByPk(id);

    if (!weapon) {
      return res.status(404).json({ error: "Оружие не найдено." });
    }

    await weapon.update({ model, description, model_link, img_link });
    res.status(200).json(weapon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении оружия." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const weapon = await Weapon.findByPk(id);

    if (!weapon) {
      return res.status(404).json({ error: "Оружие не найдено." });
    }

    await weapon.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении оружия." });
  }
});

module.exports = router;

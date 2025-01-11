const express = require("express");
const router = express.Router();
const { Backpack } = require("../../db/models");

router.post("/", async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.status(400).json({ error: "Название вещи обязательно" });
  }

  try {
    const newItem = await Backpack.create({ item });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Ошибка при добавлении вещи:", error);
    res.status(500).json({ error: "Ошибка сервера при добавлении вещи" });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Backpack.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("Ошибка при получении вещей:", error);
    res.status(500).json({ error: "Ошибка сервера при получении вещей" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { item } = req.body;

  if (!item) {
    return res.status(400).json({ error: "Название вещи обязательно" });
  }

  try {
    const existingItem = await Backpack.findByPk(id);

    if (!existingItem) {
      return res.status(404).json({ error: "Вещь не найдена" });
    }

    existingItem.item = item;
    await existingItem.save();

    res.status(200).json(existingItem);
  } catch (error) {
    console.error("Ошибка при обновлении вещи:", error);
    res.status(500).json({ error: "Ошибка сервера при обновлении вещи" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemToDelete = await Backpack.findByPk(id);

    if (!itemToDelete) {
      return res.status(404).json({ error: "Вещь не найдена" });
    }

    await itemToDelete.destroy();

    res.status(204).json();
  } catch (error) {
    console.error("Ошибка при удалении вещи:", error);
    res.status(500).json({ error: "Ошибка сервера при удалении вещи" });
  }
});

module.exports = router;

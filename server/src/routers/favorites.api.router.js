// routers/favorites.api.router.js
const router = require("express").Router();
const { Favorite } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

// Получение всех избранных элементов пользователя
router.get("/", verifyAccessToken, async (req, res) => {
  console.log("Получен GET-запрос на /api/favorites");
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
    });
    console.log("Отправка данных клиенту:", favorites);
    res.json(favorites);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ message: "Ошибка получения избранного" });
  }
});

// Добавление в избранное
router.post("/", verifyAccessToken, async (req, res) => {
  console.log("Получен POST-запрос на /api/favorites");
  console.log("Тело запроса:", req.body);
  try {
    const favorite = await Favorite.create({
      ...req.body,
      userId: req.user.id,
      dateAdded: new Date(),
    });
    console.log("Создан новый элемент избранного:", favorite);
    res.status(201).json(favorite);
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
    res.status(500).json({ message: "Ошибка добавления в избранное" });
  }
});

// Удаление из избранного
router.delete("/:id", verifyAccessToken, async (req, res) => {
  console.log(`Получен DELETE-запрос на /api/favorites/${req.params.id}`);
  try {
    const favorite = await Favorite.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    if (!favorite) {
      console.log("Элемент не найден");
      return res.status(404).json({ message: "Элемент не найден" });
    }
    await favorite.destroy();
    console.log("Элемент успешно удален из избранного");
    res.json({ message: "Успешно удалено из избранного" });
  } catch (error) {
    console.error("Ошибка при удалении из избранного:", error);
    res.status(500).json({ message: "Ошибка удаления из избранного" });
  }
});
router.get("/weapons", async (req, res) => {
  try {
    // Получение только тех записей, у которых itemType = 'weapon'
    const weaponFavorites = await Favorite.findAll({
      where: { itemType: "weapon" }, // Фильтрация по типу
      attributes: ["id", "userId", "itemId", "weaponType", "dateAdded"], // Выбор полей
    });

    res.status(200).json(weaponFavorites);
  } catch (error) {
    console.error("Ошибка при получении избранного оружия:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
module.exports = router;

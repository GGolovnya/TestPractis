const express = require("express");
const router = express.Router();
const { Event } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

const handleError = (res) => (error) => {
  console.error("Ошибка:", error);
  const errorMessage = error.message || "Ошибка сервера";
  res.status(500).json({ error: errorMessage });
};

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const newEvent = await Event.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newEvent);
  } catch (error) {
    handleError(res)(error);
  }
});

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.user.id } });
    res.json(events);
  } catch (error) {
    handleError(res)(error);
  }
});

router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findOne({ where: { id: eventId, userId: req.user.id } });
    if (!event) return res.status(404).json({ error: "Событие не найдено" });
    res.json(event);
  } catch (error) {
    handleError(res)(error);
  }
});

router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findOne({ where: { id: eventId, userId: req.user.id } });
    if (!event) return res.status(404).json({ error: "Событие не найдено" });
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    handleError(res)(error);
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findOne({ where: { id: eventId, userId: req.user.id } });
    if (!event) return res.status(404).json({ error: "Событие не найдено" });
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    handleError(res)(error);
  }
});

module.exports = router;

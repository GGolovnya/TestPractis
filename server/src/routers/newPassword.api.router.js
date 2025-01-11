// routes/api/newPassword.api.router.js
const router = require('express').Router();
const { User, PasswordResetToken } = require('../../db/models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Находим токен и связанного пользователя
    const resetToken = await PasswordResetToken.findOne({
      where: {
        token,
        expiresAt: { [Op.gt]: new Date() }
      }
    });

    if (!resetToken) {
      return res.status(400).json({
        message: 'Недействительный или просроченный токен'
      });
    }

    // Находим пользователя отдельно
    const user = await User.findByPk(resetToken.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      });
    }

    // Обновляем пароль пользователя
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    // Удаляем использованный токен
    await resetToken.destroy();

    res.json({ message: 'Пароль успешно обновлен' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
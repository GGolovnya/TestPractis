// routers/comments.api.router.js
const router = require('express').Router();
const { Comment, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

// Получение комментариев для конкретного элемента
router.get('/:itemType/:itemId', async (req, res) => {
  const { itemType, itemId } = req.params;
  
  try {
    const comments = await Comment.findAll({
      where: { itemType, itemId },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username']
      }],
      order: [['created_at', 'DESC']]
    });
    
    res.json(comments);
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    res.status(500).json({ message: 'Ошибка получения комментариев' });
  }
});

// Создание нового комментария
router.post('/', verifyAccessToken, async (req, res) => {
  const { itemType, itemId, content, rating } = req.body;
  
  try {
    const comment = await Comment.create({
      userId: req.user.id,
      itemType,
      itemId,
      content,
      rating
    });
    
    const commentWithAuthor = await Comment.findByPk(comment.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username']
      }]
    });
    
    res.status(201).json(commentWithAuthor);
  } catch (error) {
    console.error('Ошибка при создании комментария:', error);
    res.status(500).json({ message: 'Ошибка создания комментария' });
  }
});

// Обновление комментария
router.patch('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;
  
  try {
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }
    
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав на редактирование' });
    }
    
    await comment.update({ content, rating });
    
    const updatedComment = await Comment.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username']
      }]
    });
    
    res.json(updatedComment);
  } catch (error) {
    console.error('Ошибка при обновлении комментария:', error);
    res.status(500).json({ message: 'Ошибка обновления комментария' });
  }
});

// Удаление комментария
router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }
    
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав на удаление' });
    }
    
    await comment.destroy();
    res.json({ message: 'Комментарий успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
    res.status(500).json({ message: 'Ошибка удаления комментария' });
  }
});

module.exports = router;
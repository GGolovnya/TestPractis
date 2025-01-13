require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');

const app = express();
const { PORT } = process.env;


const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('URL запроса:', req.url);
  console.log('Метод запроса:', req.method);
  console.log('Заголовки запроса:', req.headers);
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter);


app.use((err, req, res, next) => {
  console.error('Произошла ошибка:', err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

# Проект на VITE для экспериментов и практики

## Правила написания кода

### Именование файлов и компонентов
- Компоненты React именуются в PascalCase (Example.tsx, UserProfile.tsx)
- Утилиты и хуки используют camelCase (useAuth.ts, formatDate.ts)
- Стили модулей в PascalCase (ComponentName.module.css)
- Конфигурационные файлы в camelCase (vite.config.ts)

### Структура проекта
#### Фронтенд
- Компоненты размещаются в /src/components
- Страницы в /src/pages
- Утилиты в /src/utils
- Типы и интерфейсы в /src/types
- Хуки в /src/hooks
- Стили в /src/styles

#### Бэкенд
- Конфигурации в /src/configs
- Контроллеры в /src/controllers
- Middleware в /src/middlewares
- Модели в /src/models
- Роуты в /src/routes
- Утилиты в /src/utils
- Миграции в /db/migrations
- Сиды в /db/seeders

### Форматирование кода
- Использовать Prettier для автоформатирования
- Отступ: 2 пробела
- Точка с запятой в конце строк
- Одинарные кавычки для строк

### Архитектурные концепции

#### Feature-Sliced Design (FSD)
- Разделение кода на слои (shared, entities, features, widgets, pages)
- Изолированные модули с четкой ответственностью
- Управление зависимостями между слоями
- Переиспользуемые компоненты и логика

#### Atomic Design Components (ADC)
- Atoms: базовые компоненты (кнопки, поля ввода)
- Molecules: составные компоненты
- Organisms: сложные компоненты
- Templates: шаблоны страниц
- Pages: готовые страницы

#### Component Driven Development (CDD)
- Разработка компонентов снизу вверх
- Изолированное тестирование
- Storybook документация
- Визуальное тестирование

#### Clean Architecture (CA)
- Разделение на слои
- Инверсия зависимостей
- Бизнес-логика независима от фреймворков
- Тестируемость кода

## Фронтовая часть:
- React + TypeScript
- Redux Toolkit для управления состоянием
- React Router для маршрутизации
- Axios для HTTP запросов
- Styled Components для стилизации
- Jest + React Testing Library для тестирования

## Серверная часть:
- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT для аутентификации
- Bcrypt для хеширования паролей
- Morgan для логирования
- CORS для безопасности
- Cookie-parser для работы с куками
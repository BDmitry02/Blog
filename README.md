# Blog

## Описание

Blog — это современное приложение для публикации, фильтрации и обсуждения постов с поддержкой авторизации, комментариев и фильтров по тегам и категориям.

## Технологии

- **Next.js** (App Router)
- **React** + **Redux Toolkit**
- **Firebase** (Auth, Firestore)
- **Tailwind CSS** + **MUI (Material UI)**
- **Formik** + **Zod** (валидация форм)

## Основные фишки

- Регистрация и вход через email/password
- Создание, редактирование, удаление постов
- Фильтрация постов по тегам и категориям
- Комментарии с оптимистичным UI (моментальное добавление)
- Модальные окна для форм и просмотра постов (адаптивные)
- Адаптивный дизайн для мобильных

## Настройка Firebase

- Создайте проект в [Firebase Console](https://console.firebase.google.com/)
- Добавьте web-app, скопируйте конфиг в `src/lib/firebase.ts`
- Включите Email/Password Auth и Firestore

## Быстрый старт

1. Установите зависимости:
    ```sh
    npm install
    ```
2. Запустите dev-сервер:
    ```sh
    npm run dev
    ```
3. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Структура

- `src/components/` — основные компоненты (auth, posts, comments, layout, modal-window)
- `src/tools/` — типы, константы, redux, утилиты, хуки
- `src/lib/` — инициализация firebase
- `src/app/` — страницы и layout
- `src/app/loading.tsx`, `src/app/error.tsx` — глобальные страницы загрузки и ошибок (Next.js App Router)

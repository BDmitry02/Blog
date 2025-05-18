# Blog — Минимальная документация

## Описание

Blog — это современное приложение на Next.js для публикации, фильтрации и обсуждения постов с поддержкой авторизации, комментариев и фильтров по тегам и категориям.

## Основные технологии

- Next.js (App Router)
- React, Redux Toolkit
- Firebase (auth, firestore)
- Tailwind CSS + MUI (Material UI)
- Formik + Zod (валидация форм)

## Структура проекта

- `src/components/` — основные компоненты (auth, posts, comments, layout)
- `src/tools/` — типы, константы, redux, утилиты
- `src/lib/` — инициализация firebase
- `src/app/` — страницы и layout

## Основные возможности

- Регистрация и вход через email/password
- Создание, редактирование, удаление постов
- Фильтрация постов по тегам и категориям
- Комментарии к постам (оптимистичный UI)
- Модальные окна для форм и постов

## Запуск проекта

1. Установите зависимости:
    ```sh
    npm install
    ```
2. Запустите dev-сервер:
    ```sh
    npm run dev
    ```
3. Откройте [http://localhost:3000](http://localhost:3000)

## Настройка Firebase

- Создайте проект в [Firebase Console](https://console.firebase.google.com/)
- Добавьте web-app, скопируйте конфиг в `src/lib/firebase.ts`
- Включите Email/Password Auth и Firestore

## Важные файлы

- `src/app/loading.tsx`, `src/app/error.tsx` — глобальные страницы загрузки и ошибок (Next.js App Router)
- `src/components/posts/add-post/AddPost.tsx` — создание поста
- `src/components/posts/single-post/SinglePost.tsx` — просмотр поста и комментарии
- `src/components/comments/Comments.tsx` — список и добавление комментариев
- `src/components/auth/LoginForm/`, `RegisterForm/` — формы входа и регистрации
- `src/components/layout/toolbar/BurgerMenu.tsx` — фильтры

## Советы по разработке

- Для layout и типографики используйте Tailwind CSS, для сложных UI-элементов (кнопки, спиннеры) — MUI.
- Для обработки загрузки и ошибок используйте страницы `loading.tsx` и `error.tsx` в соответствующих папках маршрутов.
- Для работы с модальными окнами используйте компонент `ModalWindow` или MUI Modal совместно с хуком `useModal`, который предоставляет удобные методы для открытия, закрытия и управления состоянием модалок.
- Для форм — Formik + Zod
- Для асинхронных действий используйте useActionState
- Для error boundary используйте стандартную страницу `error.tsx` с кнопкой восстановления (перезагрузка страницы).

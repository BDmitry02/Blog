# Blog — Minimal Documentation

## Description

**Blog** is a modern Next.js application for publishing, filtering, and discussing posts with support for authentication, comments, and filtering by tags and categories.

## Core Technologies

- Next.js (App Router)  
- React, Redux Toolkit  
- Firebase (Auth, Firestore)  
- Tailwind CSS + MUI (Material UI)  
- Formik + Zod (form validation)

## Project Structure

- `src/components/` — main components (auth, posts, comments, layout)  
- `src/tools/` — types, constants, redux, utilities  
- `src/lib/` — Firebase initialization  
- `src/app/` — pages and layout

## Key Features

- Registration and login via email/password  
- Create, edit, and delete posts  
- Filter posts by tags and categories  
- Post comments (optimistic UI)  
- Modal windows for forms and post previews

## Project Startup

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the dev server:
    ```sh
    npm run dev
    ```
3. Open [http://localhost:3000](http://localhost:3000)

## Firebase Setup

- Create a project in [Firebase Console](https://console.firebase.google.com/)  
- Add a web app and copy the config to `src/lib/firebase.ts`  
- Enable Email/Password Auth and Firestore

## Important Files

- `src/app/loading.tsx`, `src/app/error.tsx` — global loading and error pages (Next.js App Router)  
- `src/components/posts/add-post/AddPost.tsx` — post creation  
- `src/components/posts/single-post/SinglePost.tsx` — post view and comments  
- `src/components/comments/Comments.tsx` — comment list and adding new ones  
- `src/components/auth/LoginForm/`, `RegisterForm/` — login and registration forms  
- `src/components/layout/toolbar/BurgerMenu.tsx` — filters

## Development Tips

- Use **Tailwind CSS** for layout and typography, and **MUI** for complex UI elements like buttons and spinners.  
- Use the `loading.tsx` and `error.tsx` pages in route folders to handle loading and error states.  
- For modal windows, use the `ModalWindow` component or MUI's `Modal` together with the `useModal` hook, which provides convenient methods for opening, closing, and managing modal state.  
- Use **Formik + Zod** for forms.  
- Use `useActionState` for asynchronous actions.  
- Use a standard `error.tsx` page with a recovery button (page reload) as an error boundary.

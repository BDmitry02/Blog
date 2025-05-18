# Blog

## Description

**Blog** is a modern application for publishing, filtering, and discussing posts with support for authentication, comments, and filtering by tags and categories.

## Technologies

- **Next.js** (App Router)  
- **React** + **Redux Toolkit**  
- **Firebase** (Auth, Firestore)  
- **Tailwind CSS** + **MUI (Material UI)**  
- **Formik** + **Zod** (form validation)

## Key Features

- Registration and login via email/password  
- Create, edit, and delete posts  
- Filter posts by tags and categories  
- Comments with optimistic UI (instant addition)  
- Modal windows for forms and post preview (responsive)  
- Responsive design for mobile devices

## Firebase Setup

- Create a project in [Firebase Console](https://console.firebase.google.com/)  
- Add a web app and copy the config to `src/lib/firebase.ts`  
- Enable Email/Password Auth and Firestore

## Quick Start

1. Install dependencies:
    ```sh
    npm install
    ```
2. Run the development server:
    ```sh
    npm run dev
    ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Structure

- `src/components/` — main components (auth, posts, comments, layout, modal-window)  
- `src/tools/` — types, constants, redux, utilities, hooks  
- `src/lib/` — firebase initialization  
- `src/app/` — pages and layout  
- `src/app/loading.tsx`, `src/app/error.tsx` — global loading and error pages (Next.js App Router)

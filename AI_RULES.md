# AI Rules for Art Leo Application

This document outlines the core technologies used in the Art Leo application and provides clear guidelines on when and how to use specific libraries. Adhering to these rules ensures consistency, maintainability, and optimal performance across the codebase.

## Tech Stack Overview

*   **React & TypeScript**: The application is built using React for the UI, with TypeScript for strong typing and improved code quality.
*   **React Router**: Handles all client-side routing and navigation within the single-page application.
*   **Tailwind CSS**: Utilized for all styling, providing a utility-first approach for responsive and consistent designs.
*   **shadcn/ui**: A collection of reusable UI components built with Radix UI and styled with Tailwind CSS, serving as the primary source for standard UI elements.
*   **Framer Motion**: The go-to library for declarative, component-based animations, including entrance/exit transitions, gestures, and layout animations.
*   **GSAP (GreenSock Animation Platform)**: Used for more complex, timeline-based animations requiring precise control over multiple elements or custom effects.
*   **React Query (TanStack Query)**: Manages server state, including data fetching, caching, synchronization, and error handling for all API interactions.
*   **Supabase**: Provides the backend services, including database, authentication, and storage. All data interactions go through the Supabase client.
*   **Three.js / React Three Fiber / Drei**: Employed for advanced 3D graphics and immersive visual effects, such as particle fields and interactive backgrounds.
*   **Lucide React**: The standard library for all icons used throughout the application.
*   **Zod & React Hook Form**: Zod is used for schema-based form validation, typically integrated with React Hook Form for managing form state and submissions.
*   **Date-fns**: A lightweight library for parsing, formatting, and manipulating dates.

## Library Usage Rules

To maintain a consistent and efficient codebase, please follow these guidelines when developing new features or modifying existing ones:

*   **UI Components**:
    *   Always prioritize `shadcn/ui` components for standard UI elements (e.g., buttons, inputs, cards, dialogs, selects, switches).
    *   If a required component is not available in `shadcn/ui` or requires significant customization beyond what `shadcn/ui` allows, create a new component in `src/components/` or `src/components/reactbits/`.
*   **Styling**:
    *   Use **Tailwind CSS** exclusively for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for a specific third-party library or complex animation that cannot be achieved with Tailwind.
    *   Utilize the defined fluid typography and color variables from `src/index.css` and `tailwind.config.ts`.
*   **Routing**:
    *   All client-side navigation must use **React Router**. Define routes in `src/App.tsx`.
*   **Data Management**:
    *   For all data fetching, caching, and server state management, use **React Query**.
    *   All interactions with the backend (database, authentication, storage) must be done via the **Supabase client** (`@supabase/supabase-js`).
    *   Create dedicated hooks in `src/hooks/` for data fetching logic (e.g., `useArtworks.ts`, `useExhibitions.ts`).
*   **Authentication**:
    *   Use the `AuthContext` in `src/contexts/AuthContext.tsx` for all authentication-related operations (sign-in, sign-up, sign-out, user status).
*   **Animations**:
    *   For general UI animations, transitions, and gestures, use **Framer Motion**. This includes entrance/exit animations, hover effects, and simple element movements.
    *   For highly complex, synchronized, or performance-critical animations, especially those involving multiple elements or custom easing, use **GSAP**.
    *   For all 3D graphics and interactive visual effects, use **React Three Fiber** with **Three.js** and **Drei**.
*   **Icons**:
    *   Always use icons from **Lucide React**.
*   **Form Handling**:
    *   For form validation, define schemas using **Zod**.
    *   Integrate Zod schemas with **React Hook Form** for managing form state, validation, and submission.
*   **Date Operations**:
    *   Use **date-fns** for any date formatting, parsing, or manipulation tasks.
*   **Utility Functions**:
    *   Use the `cn` utility function (from `src/lib/utils.ts`) for conditionally applying and merging Tailwind CSS classes.
*   **Accessibility**:
    *   Always consider accessibility (`aria-*` attributes, keyboard navigation, `prefers-reduced-motion` media query) when building components, especially interactive or animated ones. Provide static fallbacks for complex animations where motion is reduced.
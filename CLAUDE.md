# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Triage**, a React + Vite + Tauri-based task management application designed as a **sidebar** form factor that helps users organize work by categories and time-based priorities. All data is stored client-side in browser localStorage.

**Design Philosophy:**
- Narrow, tall sidebar layout (~280-480px width, full screen height)
- No window title bar (decorations: false)
- Compact UI with reduced padding and smaller text
- Modal-based Priority Matrix guide (not inline)
- Resizable within min/max width constraints

## Development Commands

```bash
# Start Tauri dev server (runs both Vite and Tauri)
pnpm run tauri:dev

# Build Tauri app for production
pnpm run tauri:build

# Start Vite dev server only (web preview)
pnpm run dev

# Build for web only
pnpm run build

# Preview web build
pnpm run preview

# Run linter
pnpm run lint
```

The web preview runs at http://localhost:5173 (but use `tauri:dev` for full app experience)

## Architecture

### Data Storage Strategy

The application uses browser localStorage for all persistence. The `useLocalStorage` hook (`src/hooks/useLocalStorage.ts`) provides:
- A three-element tuple: `[storedValue, setValue, isInitialized]`
- The `isInitialized` flag ensures localStorage is loaded before rendering
- Always check `isInitialized` before rendering content that depends on stored data

**Storage keys:**
- `categories` - stores Category[] array
- `tasks` - stores Task[] array

### Data Model

**Task Interface:**
- Tasks are linked to categories via `categoryId`
- `completedAt` is set when a task is marked complete

**Category Interface:**
- Categories have custom colors (hex codes)
- Deleting a category also deletes all associated tasks

### Component Structure

**src/App.tsx** (Main orchestrator)
- Manages all state via useLocalStorage hooks
- Coordinates between CategoryManager, TaskForm, TaskList, and WeeklySummary
- Handles view toggling (Active/Done/Summary tabs)

**TaskList Component:**
- Groups tasks by category
- Displays tasks with their category colors and completion status

**WeeklySummary Component:**
- Calculates week start as Monday (not Sunday)
- Filters tasks completed since the start of current week
- Groups completed tasks by category

### Priority System

The app uses a **Time-Based Priority System** (simple and intuitive):
- **Today (Red bg-red-500)**: Must do today - immediate/urgent tasks
- **Soon (Orange bg-orange-500)**: Next few days - important tasks (better than "This Week" for tasks added on Friday)
- **Later (Blue bg-blue-500)**: Future/someday - backlog items

**Changing Priority:**
- Click on the priority badge (Today/Soon/Later) in the task list to change it via dropdown
- The priority badge is always visible and clickable (in category view)
- In priority view, hover to see the priority dropdown for changing

**Sorting:**
- Within each category/priority group, tasks are sorted by priority (Today → Soon → Later)
- Priority groups display in order: Today, Soon, Later

Priority labels must be kept consistent across TaskForm dropdown and TaskList display.

### Styling

- Uses Tailwind CSS v4 with `@tailwindcss/postcss`
- **Dark Mode:** Automatically matches system preference via CSS `prefers-color-scheme`
  - All components have `dark:` variant classes for backgrounds, text, borders
  - Priority colors (red/orange/yellow/green) remain vibrant in dark mode
  - Background in dark mode uses `dark:bg-gray-900` (main), `dark:bg-gray-800` (cards)
- Color scheme uses semantic priority colors (red/orange/yellow/green)
- Text contrast requirements:
  - Light mode: main text `text-gray-900`, placeholders `text-gray-400`
  - Dark mode: main text `text-gray-100`, placeholders `text-gray-500`
- **Sidebar Design Constraints:**
  - Layout: `min-w-[280px] max-w-[480px] w-80` (default 320px)
  - Compact spacing: smaller padding (`p-3` instead of `p-4`), reduced gaps
  - Smaller text: `text-xs` and `text-sm` for most UI elements
  - Full viewport height with `h-screen` and `overflow-y-auto`

## Key Patterns

**When adding new data fields to Task or Category:**
1. Update interface in `src/types/index.ts`
2. Update TaskForm to allow setting the field
3. Update display components (TaskList, WeeklySummary) to show the field
4. Consider localStorage migration if needed (old data won't have new fields)

**When adding new features requiring persistence:**
- Use the existing `useLocalStorage` hook pattern from `src/hooks/useLocalStorage.ts`
- Remember to use the `isInitialized` flag to ensure localStorage is loaded before rendering
- Test localStorage behavior: data should survive page refresh but not browser changes

## Build & Deployment

This is a **Tauri desktop application** with web fallback:
- **Desktop (primary)**: Use `pnpm run tauri:build` to create native executables
- **Web (fallback)**: Production build outputs to `dist/` directory, can be deployed to static hosting
- No server-side rendering or backend required
- All data persists in browser localStorage only

### Tauri Window Configuration

Located in `src-tauri/tauri.conf.json`:
- `decorations: false` - No title bar or window chrome
- `width: 320, height: 972` - Default sidebar dimensions (90% of 1080p screen height)
- **Horizontal constraints:** `minWidth: 280, maxWidth: 480`
- **Vertical constraints:** `minHeight: 400, maxHeight: 2160`
- `resizable: true` - Users can resize both width and height within constraints
- User can drag window via the gray drag bar at the top
- `window.startDragging` permission enabled for drag functionality

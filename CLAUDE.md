# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based weekly task tracker application that helps users organize work by categories. All data is stored client-side in browser localStorage.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The app runs at http://localhost:3000

## Architecture

### Data Storage Strategy

The application uses browser localStorage for all persistence. The `useLocalStorage` hook (`hooks/useLocalStorage.ts`) provides:
- A three-element tuple: `[storedValue, setValue, isInitialized]`
- The `isInitialized` flag prevents hydration mismatches between server and client
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

**app/page.tsx** (Main orchestrator)
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

### Styling

- Uses Tailwind CSS with default configuration
- Categories have custom colors that are displayed throughout the UI
- Text contrast requirements: main text uses `text-gray-900`, placeholders use `text-gray-400`

## Key Patterns

**When adding new data fields to Task or Category:**
1. Update interface in `types/index.ts`
2. Update TaskForm to allow setting the field
3. Update display components (TaskList, WeeklySummary) to show the field
4. Consider localStorage migration if needed (old data won't have new fields)

**When adding new features requiring persistence:**
- Use the existing `useLocalStorage` hook pattern
- Remember to use the `isInitialized` flag to prevent hydration errors
- Test localStorage behavior: data should survive page refresh but not browser changes

# Triage

A sleek, sidebar-style desktop task manager focused on simple prioritization. Organize your tasks by categories and time-based priorities (Today/Soon/Later) with a clean, minimalist interface.

## Features

- **Time-Based Prioritization**: Organize tasks by Today (urgent), Soon (next few days), or Later (future/backlog)
- **Category Management**: Create custom categories with auto-assigned colors
- **Sidebar Design**: Compact 280-480px width, resizable sidebar that stays out of your way
- **Dark Mode**: Automatically matches your system preference
- **Weekly Summary**: Track completed tasks by week
- **Local Storage**: All data stored locally, no cloud sync

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Development

```bash
# Install dependencies
pnpm install

# Start Tauri dev server (desktop app)
pnpm run tauri:dev

# Start Vite dev server (web preview)
pnpm run dev
```

The web preview runs at http://localhost:5173

### Building

```bash
# Build desktop app (creates native executable)
pnpm run tauri:build

# Build for web only
pnpm run build
```

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4
- **Desktop**: Tauri 1.6 (Rust-based)
- **Build Tool**: Vite 6
- **Storage**: Browser localStorage

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript interfaces
│   └── App.tsx         # Main application
├── src-tauri/          # Tauri/Rust code
│   └── tauri.conf.json # Tauri configuration
└── public/             # Static assets
```

## Priority System

- **Today** (Red): Must do today - immediate/urgent tasks
- **Soon** (Orange): Next few days - important but not immediate
- **Later** (Blue): Future/someday - backlog items

## License

MIT

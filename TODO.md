# Triage - Future Work

## High Priority (Core Functionality)

- [ ] **Data export/import**: Ability to backup tasks to JSON and restore them (localStorage can be lost)
- [ ] **Task editing**: Currently you can only delete tasks - add ability to edit title/description
- [ ] **Task notes/description**: Expand tasks beyond just a title for more detail
- [ ] **Keyboard shortcuts**: Quick add task, mark complete, navigate (especially useful for power users)

## Medium Priority (Polish & UX)

- [ ] **Always on top toggle**: Pin the sidebar to stay above other windows
- [ ] **Startup on boot**: Launch Triage automatically when Windows starts
- [ ] **System tray integration**: Minimize to tray instead of closing, quick access menu
- [ ] **Task search/filter**: Find tasks quickly as your list grows
- [ ] **Drag and drop reordering**: Manually prioritize within groups
- [ ] **Undo/redo**: Especially for accidental deletions

## Low Priority (Nice to Have)

- [ ] **Multiple windows/workspaces**: Separate work vs personal tasks
- [ ] **Task recurrence**: Repeating daily/weekly tasks
- [ ] **Statistics dashboard**: More detailed analytics beyond weekly summary
- [ ] **Themes/customization**: Custom color schemes beyond dark/light
- [ ] **Sub-tasks/checklists**: Break down larger tasks
- [ ] **Due dates**: Add specific deadlines (though this might conflict with simple time-based approach)
- [ ] **Quick capture hotkey**: Global hotkey to add task without opening window

## Technical Improvements

- [ ] **Data migration system**: Handle schema changes gracefully when adding new features
- [ ] **Performance**: Virtual scrolling if task lists get very long
- [ ] **Auto-update**: Tauri supports auto-updates for distributing new versions
- [ ] **Cross-platform builds**: macOS and Linux versions (Tauri makes this easy)

## Top 3 Recommendations

1. Data export/import - protects user data
2. Task editing - feels like a missing core feature
3. Always on top toggle - already mentioned as desired feature

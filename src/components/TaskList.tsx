import { useState } from 'react';
import { Task, Category } from '@/types';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onChangePriority: (taskId: string, priority: 'today' | 'soon' | 'later') => void;
  showCompleted?: boolean;
  sortBy?: 'category' | 'priority';
}

export default function TaskList({ tasks, categories, onToggleTask, onDeleteTask, onChangePriority, showCompleted = false, sortBy = 'category' }: TaskListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const filteredTasks = tasks.filter(task => task.completed === showCompleted);

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const getPriorityLabel = (priority: 'today' | 'soon' | 'later') => {
    const labels = {
      'today': { text: 'Today', color: 'bg-red-500', name: 'Must do today', order: 1 },
      'soon': { text: 'Soon', color: 'bg-orange-500', name: 'Next few days', order: 2 },
      'later': { text: 'Later', color: 'bg-blue-500', name: 'Future/someday', order: 3 },
    };
    return labels[priority];
  };

  const groupedTasks = sortBy === 'priority'
    ? filteredTasks.reduce((acc, task) => {
        const priority = task.priority;
        if (!acc[priority]) {
          acc[priority] = [];
        }
        acc[priority].push(task);
        return acc;
      }, {} as Record<string, Task[]>)
    : filteredTasks.reduce((acc, task) => {
        const categoryId = task.categoryId;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(task);
        return acc;
      }, {} as Record<string, Task[]>);

  // Sort tasks within each group by priority (today > this-week > later)
  Object.keys(groupedTasks).forEach(key => {
    groupedTasks[key].sort((a, b) => {
      const orderA = getPriorityLabel(a.priority).order;
      const orderB = getPriorityLabel(b.priority).order;
      return orderA - orderB;
    });
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(groupedTasks).sort(([a], [b]) => {
        if (sortBy === 'priority') {
          // Sort priority groups: today, soon, later
          const orderA = getPriorityLabel(a as 'today' | 'soon' | 'later').order;
          const orderB = getPriorityLabel(b as 'today' | 'soon' | 'later').order;
          return orderA - orderB;
        }
        return 0;
      }).map(([groupKey, groupTasks]) => {
        if (sortBy === 'category') {
          const category = getCategoryById(groupKey);
          if (!category) return null;
          const isExpanded = expandedGroups[groupKey] ?? true;

          return (
            <div key={groupKey} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleGroup(groupKey)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <h3
                  className="font-semibold text-white px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name} ({groupTasks.length})
                </h3>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{isExpanded ? '▼' : '▶'}</span>
              </button>
              {isExpanded && (
                <div className="px-3 pb-3 space-y-1.5">
                  {groupTasks.map((task) => {
                    const priorityInfo = getPriorityLabel(task.priority);
                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 group"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => onToggleTask(task.id)}
                          className="w-4 h-4 cursor-pointer flex-shrink-0"
                        />
                        <select
                          value={task.priority}
                          onChange={(e) => onChangePriority(task.id, e.target.value as 'today' | 'soon' | 'later')}
                          className={`px-1.5 py-0.5 rounded text-white text-xs font-bold flex-shrink-0 border-0 cursor-pointer ${priorityInfo.color}`}
                          title="Change priority"
                        >
                          <option value="today">Today</option>
                          <option value="soon">Soon</option>
                          <option value="later">Later</option>
                        </select>
                        <span className={task.completed ? 'line-through text-gray-500 dark:text-gray-400 flex-1 text-xs' : 'text-gray-900 dark:text-gray-100 flex-1 text-xs'}>
                          {task.title}
                        </span>
                        {task.completedAt && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {new Date(task.completedAt).toLocaleDateString()}
                          </span>
                        )}
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm leading-none flex-shrink-0"
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        } else {
          // Priority view
          const priorityInfo = getPriorityLabel(groupKey as 'today' | 'soon' | 'later');
          const isExpanded = expandedGroups[groupKey] ?? true;

          return (
            <div key={groupKey} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleGroup(groupKey)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <h3 className={`font-semibold text-white px-2 py-0.5 rounded text-xs ${priorityInfo.color}`}>
                  {priorityInfo.text}: {priorityInfo.name} ({groupTasks.length})
                </h3>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{isExpanded ? '▼' : '▶'}</span>
              </button>
              {isExpanded && (
                <div className="px-3 pb-3 space-y-1.5">
                  {groupTasks.map((task) => {
                    const category = getCategoryById(task.categoryId);
                    if (!category) return null;
                    const taskPriorityInfo = getPriorityLabel(task.priority);

                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 group"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => onToggleTask(task.id)}
                          className="w-4 h-4 cursor-pointer flex-shrink-0"
                        />
                        <span
                          className="px-1.5 py-0.5 rounded text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.name}
                        </span>
                        <span className={task.completed ? 'line-through text-gray-500 dark:text-gray-400 flex-1 text-xs' : 'text-gray-900 dark:text-gray-100 flex-1 text-xs'}>
                          {task.title}
                        </span>
                        {task.completedAt && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {new Date(task.completedAt).toLocaleDateString()}
                          </span>
                        )}
                        <select
                          value={task.priority}
                          onChange={(e) => onChangePriority(task.id, e.target.value as 'today' | 'soon' | 'later')}
                          className={`px-1.5 py-0.5 rounded text-white text-xs font-bold flex-shrink-0 border-0 cursor-pointer opacity-0 group-hover:opacity-100 ${taskPriorityInfo.color}`}
                          title="Change priority"
                        >
                          <option value="today">Today</option>
                          <option value="soon">Soon</option>
                          <option value="later">Later</option>
                        </select>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm leading-none flex-shrink-0"
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

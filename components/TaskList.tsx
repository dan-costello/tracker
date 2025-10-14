'use client';

import { Task, Category } from '@/types';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  showCompleted?: boolean;
  sortBy?: 'category' | 'priority';
}

export default function TaskList({ tasks, categories, onToggleTask, showCompleted = false, sortBy = 'category' }: TaskListProps) {
  const filteredTasks = tasks.filter(task => task.completed === showCompleted);

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const getPriorityLabel = (priority: number) => {
    const labels = {
      1: { text: 'P1', color: 'bg-red-500', name: 'Urgent & Important' },
      2: { text: 'P2', color: 'bg-orange-500', name: 'Not Urgent but Important' },
      3: { text: 'P3', color: 'bg-yellow-500', name: 'Urgent but Not Important' },
      4: { text: 'P4', color: 'bg-green-500', name: 'Not Urgent & Not Important' },
    };
    return labels[priority as keyof typeof labels];
  };

  const groupedTasks = sortBy === 'priority'
    ? filteredTasks.reduce((acc, task) => {
        const priority = `Priority ${task.priority}`;
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

  // Sort tasks within each group by priority
  Object.keys(groupedTasks).forEach(key => {
    groupedTasks[key].sort((a, b) => a.priority - b.priority);
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).sort(([a], [b]) => {
        if (sortBy === 'priority') {
          return a.localeCompare(b);
        }
        return 0;
      }).map(([groupKey, groupTasks]) => {
        if (sortBy === 'category') {
          const category = getCategoryById(groupKey);
          if (!category) return null;

          return (
            <div key={groupKey} className="bg-white rounded-lg shadow-sm border p-4">
              <h3
                className="font-semibold mb-3 text-white px-3 py-1 rounded inline-block"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </h3>
              <div className="space-y-2">
                {groupTasks.map((task) => {
                  const priorityInfo = getPriorityLabel(task.priority);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className={`px-2 py-0.5 rounded text-white text-xs font-bold ${priorityInfo.color}`}>
                        {priorityInfo.text}
                      </span>
                      <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'text-gray-900 flex-1'}>
                        {task.title}
                      </span>
                      {task.completedAt && (
                        <span className="text-sm text-gray-500">
                          {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          // Priority view
          const priorityNum = parseInt(groupKey.split(' ')[1]);
          const priorityInfo = getPriorityLabel(priorityNum);

          return (
            <div key={groupKey} className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className={`font-semibold mb-3 text-white px-3 py-1 rounded inline-block ${priorityInfo.color}`}>
                {priorityInfo.text}: {priorityInfo.name}
              </h3>
              <div className="space-y-2">
                {groupTasks.map((task) => {
                  const category = getCategoryById(task.categoryId);
                  if (!category) return null;

                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span
                        className="px-2 py-0.5 rounded text-white text-xs font-bold"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name}
                      </span>
                      <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'text-gray-900 flex-1'}>
                        {task.title}
                      </span>
                      {task.completedAt && (
                        <span className="text-sm text-gray-500">
                          {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

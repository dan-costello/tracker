'use client';

import { Task, Category } from '@/types';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  showCompleted?: boolean;
}

export default function TaskList({ tasks, categories, onToggleTask, showCompleted = false }: TaskListProps) {
  const filteredTasks = tasks.filter(task => task.completed === showCompleted);

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const categoryId = task.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([categoryId, groupTasks]) => {
        const category = getCategoryById(categoryId);
        if (!category) return null;

        return (
          <div key={categoryId} className="bg-white rounded-lg shadow-sm border p-4">
            <h3
              className="font-semibold mb-3 text-white px-3 py-1 rounded inline-block"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </h3>
            <div className="space-y-2">
              {groupTasks.map((task) => (
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
                  <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'text-gray-900 flex-1'}>
                    {task.title}
                  </span>
                  {task.completedAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(task.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

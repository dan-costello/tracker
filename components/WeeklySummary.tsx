'use client';

import { Task, Category } from '@/types';

interface WeeklySummaryProps {
  tasks: Task[];
  categories: Category[];
}

export default function WeeklySummary({ tasks, categories }: WeeklySummaryProps) {
  const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const startOfWeek = getStartOfWeek();
  const weeklyTasks = tasks.filter(task => {
    if (!task.completed || !task.completedAt) return false;
    const completedDate = new Date(task.completedAt);
    return completedDate >= startOfWeek;
  });

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const groupedTasks = weeklyTasks.reduce((acc, task) => {
    const categoryId = task.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-bold text-blue-900 mb-1">This Week&apos;s Summary</h2>
        <p className="text-sm text-blue-700">
          Week starting {startOfWeek.toLocaleDateString()}
        </p>
        <p className="text-3xl font-bold text-blue-900 mt-2">
          {weeklyTasks.length} {weeklyTasks.length === 1 ? 'task' : 'tasks'} completed
        </p>
      </div>

      {weeklyTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks completed this week yet
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([categoryId, categoryTasks]) => {
            const category = getCategoryById(categoryId);
            if (!category) return null;

            return (
              <div key={categoryId} className="bg-white rounded-lg shadow-sm border p-4">
                <h3
                  className="font-semibold mb-3 text-white px-3 py-1 rounded inline-block"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name} ({categoryTasks.length})
                </h3>
                <ul className="space-y-2 mt-3">
                  {categoryTasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <div className="flex-1">
                        <p className="text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">
                          {task.completedAt && new Date(task.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

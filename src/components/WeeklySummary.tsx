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
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-1">This Week&apos;s Summary</h2>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Week starting {startOfWeek.toLocaleDateString()}
        </p>
        <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-2">
          {weeklyTasks.length} {weeklyTasks.length === 1 ? 'task' : 'tasks'} completed
        </p>
      </div>

      {weeklyTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks completed this week yet
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(groupedTasks).map(([categoryId, categoryTasks]) => {
            const category = getCategoryById(categoryId);
            if (!category) return null;

            return (
              <div key={categoryId} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
                <h3
                  className="font-semibold mb-2 text-white px-2 py-0.5 rounded inline-block text-xs"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name} ({categoryTasks.length})
                </h3>
                <ul className="space-y-1.5 mt-2">
                  {categoryTasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-2">
                      <span className="text-green-500 dark:text-green-400 mt-0.5 text-sm">✓</span>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-gray-100 text-xs">{task.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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

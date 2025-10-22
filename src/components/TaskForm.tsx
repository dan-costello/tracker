import { useState } from 'react';
import { Category, Task } from '@/types';

interface TaskFormProps {
  categories: Category[];
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ categories, onAddTask }: TaskFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState<'today' | 'soon' | 'later'>('soon');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && categoryId) {
      onAddTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        categoryId,
        priority,
        completed: false,
        createdAt: new Date(),
      });
      setTitle('');
      setPriority('soon');
      setIsExpanded(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200 text-xs mb-4">
        Please create at least one category before adding tasks.
      </div>
    );
  }

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Add Task</h2>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{isExpanded ? '▼' : '▶'}</span>
      </button>
      {isExpanded && (
        <form onSubmit={handleSubmit} className="px-3 pb-3">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task description"
              className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
              autoFocus
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'today' | 'soon' | 'later')}
              className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            >
              <option value="today">Today - Must do today</option>
              <option value="soon">Soon - Next few days</option>
              <option value="later">Later - Future/someday</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

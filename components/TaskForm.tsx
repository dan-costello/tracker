'use client';

import { useState } from 'react';
import { Category, Task } from '@/types';

interface TaskFormProps {
  categories: Category[];
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ categories, onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && categoryId) {
      onAddTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        categoryId,
        completed: false,
        createdAt: new Date(),
      });
      setTitle('');
    }
  };

  if (categories.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
        Please create at least one category before adding tasks.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-900">Add New Task</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task description"
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-900"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

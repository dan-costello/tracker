'use client';

import { useState } from 'react';
import { Task, Category } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import CategoryManager from '@/components/CategoryManager';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import WeeklySummary from '@/components/WeeklySummary';

export default function Home() {
  const [categories, setCategories, categoriesLoaded] = useLocalStorage<Category[]>('categories', []);
  const [tasks, setTasks, tasksLoaded] = useLocalStorage<Task[]>('tasks', []);
  const [activeTab, setActiveTab] = useState<'active' | 'done' | 'summary'>('active');

  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    setTasks(tasks.filter(task => task.categoryId !== categoryId));
  };

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined,
        };
      }
      return task;
    }));
  };

  if (!categoriesLoaded || !tasksLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Weekly Task Tracker</h1>
          <p className="text-gray-600">Keep track of your work and summarize at the end of the week</p>
        </header>

        <CategoryManager categories={categories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} />

        <TaskForm categories={categories} onAddTask={handleAddTask} />

        <div className="bg-white rounded-lg shadow-sm border mb-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === 'active'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active Tasks ({tasks.filter(t => !t.completed).length})
            </button>
            <button
              onClick={() => setActiveTab('done')}
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === 'done'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({tasks.filter(t => t.completed).length})
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === 'summary'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly Summary
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'active' && (
              <TaskList
                tasks={tasks}
                categories={categories}
                onToggleTask={handleToggleTask}
                showCompleted={false}
              />
            )}
            {activeTab === 'done' && (
              <TaskList
                tasks={tasks}
                categories={categories}
                onToggleTask={handleToggleTask}
                showCompleted={true}
              />
            )}
            {activeTab === 'summary' && (
              <WeeklySummary tasks={tasks} categories={categories} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

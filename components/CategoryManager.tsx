'use client';

import { useState } from 'react';
import { Category } from '@/types';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const PRESET_COLORS = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
  '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'
];

// Get a random color that hasn't been used yet
function getRandomUnusedColor(usedColors: string[]): string {
  const availableColors = PRESET_COLORS.filter(color => !usedColors.includes(color));
  
  if (availableColors.length === 0) {
    // If all colors are used, pick a random color from all presets
    return PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
  }
  
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory }: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      const usedColors = categories.map(cat => cat.color);
      const randomColor = getRandomUnusedColor(usedColors);
      
      onAddCategory({
        id: crypto.randomUUID(),
        name: newCategoryName.trim(),
        color: randomColor,
      });
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            + Add Category
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white border rounded-lg">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-3 text-gray-900 placeholder-gray-400"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-2"
            style={{ backgroundColor: category.color }}
          >
            <span>{category.name}</span>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="hover:bg-black/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
              title="Delete category"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

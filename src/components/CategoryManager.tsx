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

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory }: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const getAvailableColors = () => {
    const usedColors = categories.map(cat => cat.color);
    return PRESET_COLORS.filter(color => !usedColors.includes(color));
  };

  const getRandomAvailableColor = () => {
    const availableColors = getAvailableColors();
    if (availableColors.length === 0) {
      // If all colors are used, pick a random one anyway
      return PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
    }
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  const [selectedColor, setSelectedColor] = useState(getRandomAvailableColor());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory({
        id: crypto.randomUUID(),
        name: newCategoryName.trim(),
        color: selectedColor,
      });
      setNewCategoryName('');
      setSelectedColor(getRandomAvailableColor());
      setIsAdding(false);
    }
  };

  const handleOpenForm = () => {
    setIsAdding(true);
    setSelectedColor(getRandomAvailableColor());
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Categories</h2>
        {!isAdding && (
          <button
            onClick={handleOpenForm}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          >
            + Add
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded mb-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
            autoFocus
          />
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Color:</span>
            <div
              className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">(randomly assigned)</span>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
              }}
              className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-1.5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-2 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1.5"
            style={{ backgroundColor: category.color }}
          >
            <span>{category.name}</span>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="hover:bg-black/20 rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs leading-none"
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

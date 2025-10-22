export interface Task {
  id: string;
  title: string;
  categoryId: string;
  priority: 'today' | 'soon' | 'later';
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

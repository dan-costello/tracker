export interface Task {
  id: string;
  title: string;
  categoryId: string;
  priority: 1 | 2 | 3 | 4;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

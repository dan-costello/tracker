export interface Task {
  id: string;
  title: string;
  categoryId: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

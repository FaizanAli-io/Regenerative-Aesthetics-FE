import create from './http-service';

export interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  parentCategory: Category | null;
  children: Category[];
}

export default create('/categories');

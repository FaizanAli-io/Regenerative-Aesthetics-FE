import create from './http-service';

export interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string;
}

export interface BlogFormData extends Omit<Blog, 'id'> {}

export default create('/blogs');

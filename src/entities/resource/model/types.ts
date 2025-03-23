export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'code' | 'design';
  thumbnail: string;
  preview: string;
  fullContent: string;
  downloads: number;
  views: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}

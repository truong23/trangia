import { Category } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  },

  async createCategory(data: { name: string; slug?: string; description?: string }): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Tạo danh mục thất bại');
    return await res.json();
  },

  async updateCategory(id: string, data: { name?: string; slug?: string; description?: string }): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật danh mục thất bại');
    return await res.json();
  },

  async deleteCategory(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Xóa danh mục thất bại');
    return await res.json();
  },
};

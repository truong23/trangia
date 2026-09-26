import { Article, ArticlesResponse } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const articleService = {
  async getArticles(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    status?: string;
    isFeatured?: boolean;
  }): Promise<ArticlesResponse> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.isFeatured !== undefined) query.append('isFeatured', String(params.isFeatured));

    const res = await fetch(`${API_BASE_URL}/articles?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  },

  async getRecentArticles(): Promise<Article[]> {
    const res = await fetch(`${API_BASE_URL}/articles/recent`);
    if (!res.ok) throw new Error('Failed to fetch recent articles');
    return await res.json();
  },

  async getArticleBySlug(slug: string): Promise<Article> {
    const res = await fetch(`${API_BASE_URL}/articles/slug/${slug}`);
    if (!res.ok) throw new Error('Article not found');
    return await res.json();
  },

  async createArticle(data: Partial<Article>): Promise<Article> {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Thêm bài viết thất bại');
    return await res.json();
  },

  async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật bài viết thất bại');
    return await res.json();
  },

  async deleteArticle(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Xóa bài viết thất bại');
    return await res.json();
  },
};

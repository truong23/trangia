import { Project } from '../../types';
import { PROJECTS_DATA } from '../tranGiaData';

const API_BASE = '/api/projects';

export const projectService = {
  async getProjects(params?: { category?: string; region?: string; search?: string }): Promise<Project[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'all') query.append('category', params.category);
      if (params?.region && params.region !== 'all') query.append('region', params.region);
      if (params?.search) query.append('search', params.search);

      const qs = query.toString();
      const res = await fetch(`${API_BASE}${qs ? `?${qs}` : ''}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.statusText}`);
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return PROJECTS_DATA;
    } catch (err) {
      console.warn('API /api/projects error, using local fallback data:', err);
      let list = [...PROJECTS_DATA];
      if (params?.category && params.category !== 'all') {
        list = list.filter((p) => p.category === params.category);
      }
      if (params?.region && params.region !== 'all') {
        list = list.filter((p) => p.region === params.region);
      }
      if (params?.search) {
        const s = params.search.toLowerCase();
        list = list.filter((p) =>
          p.title.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          (p.client && p.client.toLowerCase().includes(s))
        );
      }
      return list;
    }
  },

  async getProject(id: string): Promise<Project | null> {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return PROJECTS_DATA.find((p) => p.id === id) || null;
    }
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    const token = localStorage.getItem('token');
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Lỗi khi tạo dự án mới');
    }
    return res.json();
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Lỗi khi cập nhật dự án');
    }
    return res.json();
  },

  async deleteProject(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Lỗi khi xóa dự án');
    }
  },
};

import { SiteSettings } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (!res.ok) throw new Error('Không thể tải cấu hình hệ thống');
    return await res.json();
  },

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật cấu hình thất bại');
    return await res.json();
  },
};

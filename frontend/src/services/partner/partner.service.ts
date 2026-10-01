import { Partner } from '../../types';
import { getAuthHeader } from '../auth/auth.service';
import { PARTNERS_DATA } from '../tranGiaData';

const API_BASE_URL = '/api';

export const partnerService = {
  async getPartners(category?: string, activeOnly: boolean = true): Promise<Partner[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') {
        params.append('category', category);
      }
      if (activeOnly) {
        params.append('activeOnly', 'true');
      }
      const res = await fetch(`${API_BASE_URL}/partners?${params.toString()}`);
      if (!res.ok) {
        return PARTNERS_DATA;
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return PARTNERS_DATA;
    } catch (error) {
      console.warn('Could not fetch partners from server, falling back to local data', error);
      return PARTNERS_DATA;
    }
  },

  async getAllAdmin(): Promise<Partner[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/partners`, {
        headers: {
          ...getAuthHeader(),
        },
      });
      if (!res.ok) {
        return PARTNERS_DATA;
      }
      const data = await res.json();
      return Array.isArray(data) ? data : PARTNERS_DATA;
    } catch (error) {
      console.warn('Could not fetch all partners for admin, using local fallback', error);
      return PARTNERS_DATA;
    }
  },

  async getPartner(id: string): Promise<Partner> {
    const res = await fetch(`${API_BASE_URL}/partners/${id}`);
    if (!res.ok) throw new Error('Không tìm thấy thông tin đối tác');
    return await res.json();
  },

  async createPartner(partner: Partial<Partner>): Promise<Partner> {
    const res = await fetch(`${API_BASE_URL}/partners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(partner),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Thêm đối tác mới thất bại');
    }
    return await res.json();
  },

  async updatePartner(id: string, partner: Partial<Partner>): Promise<Partner> {
    const res = await fetch(`${API_BASE_URL}/partners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(partner),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Cập nhật đối tác thất bại');
    }
    return await res.json();
  },

  async deletePartner(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/partners/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Xóa đối tác thất bại');
    }
    return await res.json();
  },
};

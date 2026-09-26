import { User } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const userService = {
  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      throw new Error('Không thể tải danh sách tài khoản');
    }
    return res.json();
  },

  async createUser(userData: Partial<User> & { password?: string }): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Tạo tài khoản thất bại' }));
      throw new Error(errData.message || 'Tên đăng nhập hoặc email đã tồn tại');
    }
    return res.json();
  },

  async updateUser(id: string, userData: Partial<User> & { password?: string }): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Cập nhật tài khoản thất bại' }));
      throw new Error(errData.message || 'Cập nhật tài khoản thất bại');
    }
    return res.json();
  },

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Xóa tài khoản thất bại' }));
      throw new Error(errData.message || 'Không thể xóa tài khoản này');
    }
    return res.json();
  },
};

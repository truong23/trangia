import { LoginResponse, User } from '../../types';

const API_BASE_URL = '/api';

export function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('delta_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authService = {
  async login(credentials: { username: string; password: string }): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Đăng nhập thất bại' }));
      throw new Error(errData.message || 'Sai thông tin đăng nhập');
    }
    const data: LoginResponse = await res.json();
    localStorage.setItem('delta_token', data.access_token);
    localStorage.setItem('delta_user', JSON.stringify(data.user));
    return data;
  },

  logout() {
    localStorage.removeItem('delta_token');
    localStorage.removeItem('delta_user');
  },

  getCurrentUser(): User | null {
    const str = localStorage.getItem('delta_user');
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  },

  // Quên mật khẩu: gửi yêu cầu nhận mã OTP qua email
  async forgotPassword(email: string): Promise<{ email: string; otp: string; message: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Yêu cầu thất bại' }));
      throw new Error(errData.message || 'Không tìm thấy tài khoản với email này');
    }
    return res.json();
  },

  // Đặt lại mật khẩu mới bằng mã OTP
  async resetPassword(params: { email: string; otp: string; newPassword: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Đặt lại mật khẩu thất bại' }));
      throw new Error(errData.message || 'Mã OTP không chính xác hoặc đã hết hạn');
    }
    return res.json();
  },

  // Đổi mật khẩu cá nhân cho tài khoản đang đăng nhập
  async changePassword(params: { oldPassword: string; newPassword: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/users/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Đổi mật khẩu thất bại' }));
      throw new Error(errData.message || 'Mật khẩu hiện tại không chính xác');
    }
    return res.json();
  },
};

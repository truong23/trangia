import { UploadedFile } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const uploadService = {
  async uploadImage(file: File | Blob, customFilename?: string): Promise<UploadedFile> {
    const formData = new FormData();
    if (file instanceof File) {
      formData.append('file', file, customFilename || file.name);
    } else {
      formData.append('file', file, customFilename || 'uploaded_image.png');
    }

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Tải ảnh lên thất bại' }));
      throw new Error(err.message || 'Tải ảnh lên thất bại');
    }

    return await res.json();
  },

  async uploadMultiple(files: File[]): Promise<UploadedFile[]> {
    const formData = new FormData();
    for (const f of files) {
      formData.append('files', f);
    }

    const res = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Tải danh sách ảnh thất bại' }));
      throw new Error(err.message || 'Tải danh sách ảnh thất bại');
    }

    return await res.json();
  },

  async getUploadedFiles(): Promise<UploadedFile[]> {
    const res = await fetch(`${API_BASE_URL}/upload/list`);
    if (!res.ok) throw new Error('Không thể lấy danh sách ảnh');
    return await res.json();
  },

  async deleteFile(filename: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/upload/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Xóa tệp tin thất bại');
    return await res.json();
  },
};

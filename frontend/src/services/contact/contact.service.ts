import { ContactRequest } from '../../types';

const STORAGE_KEY = 'trangia_contacts_data';

const INITIAL_CONTACTS: ContactRequest[] = [
  {
    id: 'cnt-1',
    fullName: 'Nguyễn Văn Mạnh',
    phone: '0912 345 678',
    email: 'manh.nguyen@vincom.vn',
    service: 'ceiling',
    projectLocation: 'Dự án Căn hộ cao cấp Masteri Hưng Yên',
    message: 'Cần tư vấn và nhận bảng bóc tách khối lượng thi công trần thạch cao chìm giật cấp cho 3 sàn tầng thương mại, diện tích khoảng 1.800m2.',
    status: 'new',
    notes: 'Khách hàng liên hệ qua Website lúc sáng. Cần chuyển phòng kỹ thuật bóc tách bản vẽ.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'cnt-2',
    fullName: 'Lê Hoàng Tuấn (Chỉ huy trưởng CDC)',
    phone: '0988 765 432',
    email: 'tuanlh.cdc@gmail.com',
    service: 'partition',
    projectLocation: 'Tòa nhà hỗn hợp A&T Sky Garden Bình Dương',
    message: 'Cần báo giá hạng mục vách ngăn chống cháy và tiêu âm khu vực hành lang và sảnh đón tầng 1. Tiến độ yêu cầu hoàn thiện trong Quý 4.',
    status: 'contacted',
    notes: 'Đã gọi điện trao đổi với anh Tuấn lúc 10:30, hẹn gửi file báo giá qua Zalo và email trong ngày mai.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'cnt-3',
    fullName: 'Trần Thị Thu Hà',
    phone: '0903 889 911',
    email: 'thuha.cogniplus@gmail.com',
    service: 'fitout',
    projectLocation: 'KCN Phước Đông, Trảng Bàng, Tây Ninh',
    message: 'Yêu cầu gói thầu Fit-out trang trí nội thất showroom và khu đa chức năng nhà xưởng công nghiệp quy mô 850m2.',
    status: 'quoted',
    notes: 'Đã hoàn tất báo giá tổng thể 680 triệu VNĐ, đang chờ ban giám đốc CĐT duyệt hợp đồng.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'cnt-4',
    fullName: 'Phạm Đức Long',
    phone: '0977 123 999',
    email: 'longpd.mbland@gmail.com',
    service: 'painting',
    projectLocation: 'KĐT Nam Ngạn, TP. Thanh Hóa',
    message: 'Khảo sát và báo giá sơn bả mặt ngoài + lắp dựng phào chỉ bê tông sợi thủy tinh GFRC cho 2 dãy shophouse.',
    status: 'completed',
    notes: 'Đã ký hợp đồng thi công số TG-2026/08 và đang triển khai nhân lực tại hiện trường.',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
];

class ContactService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private getLocalContacts(): ContactRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
        return INITIAL_CONTACTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CONTACTS;
    }
  }

  private saveLocalContacts(contacts: ContactRequest[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      console.error('Failed to save contacts to localStorage', e);
    }
  }

  async getContacts(): Promise<ContactRequest[]> {
    try {
      const res = await fetch('/api/contacts', {
        headers: this.getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.saveLocalContacts(data);
          return data;
        }
      }
    } catch (err) {
      console.warn('API getContacts failed, using local fallback:', err);
    }
    return this.getLocalContacts();
  }

  async submitContact(data: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>): Promise<ContactRequest> {
    const newContact: ContactRequest = {
      ...data,
      id: 'cnt-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // Try backend API
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const saved = await res.json();
        // Update local
        const current = this.getLocalContacts();
        this.saveLocalContacts([saved, ...current.filter((c) => c.id !== saved.id)]);
        return saved;
      }
    } catch (err) {
      console.warn('API submitContact failed, saving locally:', err);
    }

    // Local fallback
    const current = this.getLocalContacts();
    const updated = [newContact, ...current];
    this.saveLocalContacts(updated);
    return newContact;
  }

  async updateContact(
    id: string,
    updates: { status?: ContactRequest['status']; notes?: string },
  ): Promise<ContactRequest> {
    // Try backend API
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const saved = await res.json();
        const current = this.getLocalContacts();
        const next = current.map((c) => (c.id === id ? { ...c, ...saved } : c));
        this.saveLocalContacts(next);
        return saved;
      }
    } catch (err) {
      console.warn('API updateContact failed, updating locally:', err);
    }

    // Local fallback
    const current = this.getLocalContacts();
    let updatedItem: ContactRequest | null = null;
    const next = current.map((c) => {
      if (c.id === id) {
        updatedItem = { ...c, ...updates, updatedAt: new Date().toISOString() };
        return updatedItem;
      }
      return c;
    });
    this.saveLocalContacts(next);
    if (!updatedItem) throw new Error('Contact not found');
    return updatedItem;
  }

  async deleteContact(id: string): Promise<boolean> {
    // Try backend API
    try {
      await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
    } catch (err) {
      console.warn('API deleteContact failed, deleting locally:', err);
    }

    // Local fallback
    const current = this.getLocalContacts();
    const next = current.filter((c) => c.id !== id);
    this.saveLocalContacts(next);
    return true;
  }
}

export const contactService = new ContactService();

import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './settings.entity';

export interface SiteSettings {
  company: {
    name: string;
    shortName?: string;
    logo: string;
    whiteLogo: string;
    address: string;
    phone: string;
    hotline: string;
    fax?: string;
    email: string;
    website: string;
    slogan: string;
    director?: string;
  };
  heroBanner: {
    title: string;
    subtext: string;
    feedbackEmail: string;
    backgroundImage?: string;
  };
  navigation: Array<{
    title: string;
    href: string;
    active?: boolean;
    children?: Array<{ title: string; href: string }>;
  }>;
  footer: {
    introHeading: string;
    fieldsHeading: string;
    newsletterHeading: string;
    newsletterText: string;
    copyright: string;
    introLinks: Array<{ title: string; href: string }>;
    fieldLinks: Array<{ title: string; href: string }>;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  company: {
    name: 'CÔNG TY TNHH DỊCH VỤ THƯƠNG MẠI VÀ XÂY DỰNG TRẦN GIA',
    shortName: 'TRẦN GIA CONSTRUCTION',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=400&q=80',
    whiteLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=400&q=80',
    address: 'Xóm Chùa, Thôn Trung Cao, Xã Phú Nghĩa, Thành phố Hà Nội',
    phone: '0986 078 270',
    hotline: '0986 078 270',
    fax: '',
    email: 'trangia.kt69@gmail.com',
    website: 'https://trangiaconstruction.vn',
    slogan: 'Uy tín - Chất lượng - Chính xác',
    director: 'Trần Xuân Anh',
  },
  heroBanner: {
    title: 'HỒ SƠ NĂNG LỰC & THI CÔNG TRẦN GIA',
    subtext: 'Tư vấn thi công & Báo giá dự án:',
    feedbackEmail: 'trangia.kt69@gmail.com',
    backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  },
  navigation: [
    { title: 'TRANG CHỦ', href: '#home' },
    {
      title: 'GIỚI THIỆU',
      href: '#about',
      children: [
        { title: 'Thư ngỏ Giám đốc', href: '#letter' },
        { title: 'Tầm nhìn & Sứ mệnh', href: '#vision' },
        { title: 'Giá trị cốt lõi', href: '#values' },
        { title: 'Nguyên tắc hoạt động', href: '#principles' },
      ],
    },
    {
      title: 'LĨNH VỰC',
      href: '#services',
      children: [
        { title: 'Thi công trần thạch cao & kim loại', href: '#services' },
        { title: 'Thi công vách ngăn chống cháy', href: '#services' },
        { title: 'Sơn bả hoàn thiện & Phào GFRC', href: '#services' },
        { title: 'Nội thất & Cơ điện M&E', href: '#services' },
      ],
    },
    {
      title: 'NĂNG LỰC',
      href: '#capacity',
      children: [
        { title: 'Sơ đồ tổ chức', href: '#organization' },
        { title: 'Năng lực nhân sự', href: '#personnel' },
        { title: 'Máy móc & Thiết bị', href: '#equipment' },
      ],
    },
    { title: 'DỰ ÁN', href: '#projects' },
    { title: 'ĐỐI TÁC', href: '#partners' },
    { title: 'TIN TỨC', href: '#news' },
    { title: 'HỒ SƠ NĂNG LỰC', href: '#profile' },
    { title: 'LIÊN HỆ', href: '#contact' },
  ],
  footer: {
    introHeading: 'VỀ TRẦN GIA',
    fieldsHeading: 'LĨNH VỰC THI CÔNG',
    newsletterHeading: 'NHẬN BÁO GIÁ & PROFILE',
    newsletterText: 'Đăng ký email để nhận Hồ sơ năng lực cập nhật và thông tin ưu đãi thi công từ Trần Gia.',
    copyright: 'Copyright © 2026 CÔNG TY TNHH DỊCH VỤ THƯƠNG MẠI VÀ XÂY DỰNG TRẦN GIA. All rights reserved.',
    introLinks: [
      { title: 'Thư ngỏ Ban Giám đốc', href: '#letter' },
      { title: 'Tầm nhìn, Sứ mệnh & Giá trị cốt lõi', href: '#vision' },
      { title: 'Sơ đồ tổ chức & Năng lực nhân sự', href: '#capacity' },
      { title: 'Trang thiết bị máy móc thi công', href: '#equipment' },
      { title: 'Chính sách & Nguyên tắc hoạt động', href: '#principles' },
    ],
    fieldLinks: [
      { title: 'Thi công Trần thạch cao & Kim loại ISO', href: '#services' },
      { title: 'Thi công Vách ngăn chống cháy, cách âm', href: '#services' },
      { title: 'Sơn bả hoàn thiện & Phào chỉ GFRC', href: '#services' },
      { title: 'Thiết kế & Thi công Nội thất Fit-out', href: '#services' },
      { title: 'Cung cấp & Lắp đặt Cơ điện M&E', href: '#services' },
    ],
  },
};

@Injectable()
export class SettingsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: Repository<Setting>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.settingsRepository.count();
      if (count === 0) {
        await this.settingsRepository.save({
          key: 'site_config',
          value: JSON.stringify(DEFAULT_SETTINGS),
          description: 'Toàn bộ cấu hình hệ thống & thông tin công ty Delta Group',
        });
        this.logger.log('✅ Đã khởi tạo cấu hình hệ thống mặc định vào MySQL');
      }
    } catch (e) {
      this.logger.error('Error initializing settings:', e);
    }
  }

  async getSettings(): Promise<SiteSettings> {
    const setting = await this.settingsRepository.findOne({ where: { key: 'site_config' } });
    if (!setting) {
      return DEFAULT_SETTINGS;
    }
    try {
      const parsed = JSON.parse(setting.value);
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated = {
      ...current,
      ...data,
      company: { ...current.company, ...(data.company || {}) },
      heroBanner: { ...current.heroBanner, ...(data.heroBanner || {}) },
      footer: { ...current.footer, ...(data.footer || {}) },
    };

    let setting = await this.settingsRepository.findOne({ where: { key: 'site_config' } });
    if (!setting) {
      setting = this.settingsRepository.create({
        key: 'site_config',
        value: JSON.stringify(updated),
        description: 'Toàn bộ cấu hình hệ thống & thông tin công ty Delta Group',
      });
    } else {
      setting.value = JSON.stringify(updated);
    }

    await this.settingsRepository.save(setting);
    return updated;
  }
}

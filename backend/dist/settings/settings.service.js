"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SettingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const settings_entity_1 = require("./settings.entity");
const DEFAULT_SETTINGS = {
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
let SettingsService = SettingsService_1 = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
        this.logger = new common_1.Logger(SettingsService_1.name);
    }
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
        }
        catch (e) {
            this.logger.error('Error initializing settings:', e);
        }
    }
    async getSettings() {
        const setting = await this.settingsRepository.findOne({ where: { key: 'site_config' } });
        if (!setting) {
            return DEFAULT_SETTINGS;
        }
        try {
            const parsed = JSON.parse(setting.value);
            return { ...DEFAULT_SETTINGS, ...parsed };
        }
        catch {
            return DEFAULT_SETTINGS;
        }
    }
    async updateSettings(data) {
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
        }
        else {
            setting.value = JSON.stringify(updated);
        }
        await this.settingsRepository.save(setting);
        return updated;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = SettingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(settings_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map
import { OnApplicationBootstrap } from '@nestjs/common';
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
        subtitle?: string;
        subtext: string;
        feedbackEmail: string;
        backgroundImage?: string;
        stats?: Array<{
            number: string;
            label: string;
        }>;
    };
    navigation: Array<{
        title: string;
        href: string;
        active?: boolean;
        children?: Array<{
            title: string;
            href: string;
        }>;
    }>;
    footer: {
        introHeading: string;
        fieldsHeading: string;
        newsletterHeading: string;
        newsletterText: string;
        copyright: string;
        introLinks: Array<{
            title: string;
            href: string;
        }>;
        fieldLinks: Array<{
            title: string;
            href: string;
        }>;
    };
}
export declare class SettingsService implements OnApplicationBootstrap {
    private readonly settingsRepository;
    private readonly logger;
    constructor(settingsRepository: Repository<Setting>);
    onApplicationBootstrap(): Promise<void>;
    getSettings(): Promise<SiteSettings>;
    updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings>;
}

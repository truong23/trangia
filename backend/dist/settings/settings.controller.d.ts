import { SettingsService, SiteSettings } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<SiteSettings>;
    updateSettings(body: Partial<SiteSettings>): Promise<SiteSettings>;
}

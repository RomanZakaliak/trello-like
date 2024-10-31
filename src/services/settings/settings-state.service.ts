import { ISettingState } from '@/lib/redux/settings/settings-state.interface';

export class SettingsService {
  private localStorageKey: string;

  constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
  }

  saveColumnsCollapsedStatus(columnsCollapse: boolean) {
    return this.saveSettings('collapseEmptyColumns', columnsCollapse);
  }

  saveToken(token: string) {
    return this.saveSettings('token', token);
  }

  saveIsAuthorized(isAuthorized: boolean) {
    return this.saveSettings('isAuthorized', isAuthorized);
  }

  getSettings(): ISettingState {
    return this.getSettingFromLocalStorage();
  }

  private saveSettings<T>(name: string, value: T) {
    const settings = this.getSettingFromLocalStorage();
    const newSettings: ISettingState = {
      ...settings,
      [name]: value,
    };

    localStorage.setItem(this.localStorageKey, JSON.stringify(newSettings));
    return newSettings;
  }

  private getSettingFromLocalStorage(): ISettingState {
    const settings = JSON.parse(
      localStorage.getItem(this.localStorageKey) ?? '{}'
    ) as ISettingState;

    return settings;
  }
}

export const settingsService = new SettingsService('USER_SETTING');

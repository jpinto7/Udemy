export class SettingsService {
  private altBackground = false;

  setBackground(isAlt: boolean) {
    this.altBackground = isAlt;
  }

  isAltBackground(): boolean {
    return this.altBackground;
  }
}
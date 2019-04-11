export default class ThemeSettings {
  constructor(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  static createInstance(data) {
    if (!ThemeSettings.instance) {
      ThemeSettings.instance = new ThemeSettings(data);
    }
    return ThemeSettings.instance;
  }
  static getInstance() {
    return ThemeSettings.instance;
  }
}

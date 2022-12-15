import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.co.optiex',
  appName: 'Optiex',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    allowNavigation: []
  },
  android: {
    allowMixedContent: true
  }
};

export default config;

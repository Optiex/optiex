import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.co.optiex',
  appName: 'Optiex',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: ['https://analytics.optiex.co.in:1992/*']
  }
  // ,
  // android: {
  //   allowMixedContent: true
  // }
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.kitchenapplication',
  appName: 'kitchenapplication',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  loggingBehavior: 'debug',
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;

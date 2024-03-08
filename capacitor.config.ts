import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.kitchenapplication',
  appName: 'kitchenapplication',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  loggingBehavior: 'debug'
};

export default config;

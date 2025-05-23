import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'proyectos.kaliga70.medinno',
  appName: 'medinno',
  webDir: 'www',

  server: {
    androidScheme: 'http',
    allowNavigation: [
      'http://192.168.1.147:5000',
    ],
  },
};

export default config;

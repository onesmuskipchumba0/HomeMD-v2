import 'dotenv/config'; // Import dotenv for local .env support

export default () => ({
  expo: {
    name: "HomeMD",
    slug: "homemd",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.onesmus.homemd", // Fixed package name
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY, // Environment variable
      eas: {
        projectId: "9854dc48-d5e9-4ccb-b7f5-3c2e665b99e9", // EAS project ID
      },
    },
  },
});

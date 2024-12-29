export default {
    expo: {
      // ... other config
      extra: {
        GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
      },
      android: {
        package: "com.onesmus.homemd",
      }
    },
  };
  
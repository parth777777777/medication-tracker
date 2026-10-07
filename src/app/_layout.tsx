import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { getDatabase } from '../db/database';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function initializeDatabase() {
      try {
        await getDatabase();
        console.log('Database initialized');
      } catch (error) {
        console.error('Database initialization failed:', error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    initializeDatabase();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="add-medication"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
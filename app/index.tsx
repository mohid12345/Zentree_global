import { Colors } from '@/constants/theme';
import { useOnboarding } from '@/contexts/onboarding-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  const { hasCompletedOnboarding, isLoading } = useOnboarding();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (!isLoading) {
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [hasCompletedOnboarding, isLoading]);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.background 
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

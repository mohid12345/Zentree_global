import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingSlideProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  backgroundColor?: string;
  iconColor?: string;
}

export function OnboardingSlide({
  title,
  subtitle,
  description,
  icon,
  backgroundColor,
  iconColor = '#2563eb'
}: OnboardingSlideProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: backgroundColor || colors.background }]}>
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: iconColor }]}>
            <IconSymbol name={icon} size={80} color="white" />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>
          
          <ThemedText type="subtitle" style={[styles.subtitle, { color: iconColor }]}>
            {subtitle}
          </ThemedText>
          
          <ThemedText style={[styles.description, { color: colors.secondary }]}>
            {description}
          </ThemedText>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/ZENTREE_logo_small.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 60,
    opacity: 0.8,
  },
});

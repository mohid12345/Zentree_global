import { OnboardingSlide } from '@/components/onboarding-slide';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useOnboarding } from '@/contexts/onboarding-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Welcome to ZenTree',
    subtitle: 'Your Educational Journey Starts Here',
    description: 'We are Pakistan\'s leading educational consulting group, dedicated to helping students achieve their academic dreams both locally and internationally.',
    icon: 'graduationcap.fill',
    backgroundColor: '#f8fafc',
    iconColor: '#2563eb'
  },
  {
    title: 'Comprehensive Services',
    subtitle: 'Everything You Need Under One Roof',
    description: 'From university selection and application assistance to visa guidance and scholarship opportunities, we provide end-to-end support for your educational journey.',
    icon: 'building.2.fill',
    backgroundColor: '#fef7f0',
    iconColor: '#ea580c'
  },
  {
    title: 'Expert Guidance',
    subtitle: 'Trusted by Thousands of Students',
    description: 'Our experienced counselors have helped over 10,000 students successfully secure admissions to top universities worldwide. Let us guide you to success.',
    icon: 'person.2.fill',
    backgroundColor: '#f0fdf4',
    iconColor: '#16a34a'
  }
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { setHasCompletedOnboarding } = useOnboarding();

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    } else {
      // Complete onboarding and navigate to main app
      setHasCompletedOnboarding(true);
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    router.replace('/(tabs)');
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <ThemedText style={[styles.skipText, { color: colors.secondary }]}>
          Skip
        </ThemedText>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((slide, index) => (
          <OnboardingSlide
            key={index}
            title={slide.title}
            subtitle={slide.subtitle}
            description={slide.description}
            icon={slide.icon}
            backgroundColor={slide.backgroundColor}
            iconColor={slide.iconColor}
          />
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentSlide ? colors.primary : colors.border,
                  width: index === currentSlide ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {currentSlide < onboardingData.length - 1 ? (
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: colors.primary }]}
              onPress={handleNext}
            >
              <ThemedText style={styles.nextButtonText}>Next</ThemedText>
              <IconSymbol name="arrow.right" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.getStartedButton, { backgroundColor: colors.primary }]}
              onPress={handleNext}
            >
              <ThemedText style={styles.getStartedButtonText}>Get Started</ThemedText>
              <IconSymbol name="arrow.right" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionButtons: {
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
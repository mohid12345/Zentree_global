import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem('hasCompletedOnboarding');
      setHasCompletedOnboardingState(completed === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setHasCompletedOnboarding = async (completed: boolean) => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', completed.toString());
      setHasCompletedOnboardingState(completed);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColleges } from '@/hooks/use-colleges';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';


const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light']; 
  const { localColleges, internationalColleges, loading, error } = useColleges();

  const navigateToLocal = () => router.push('/(tabs)/local-education');
  const navigateToInternational = () => router.push('/(tabs)/international-education');

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText style={[styles.loadingText, { color: colors.secondary }]}>
          Loading colleges...
        </ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <IconSymbol name="exclamationmark.triangle.fill" size={60} color="#ef4444" />
        <ThemedText type="subtitle" style={styles.errorTitle}>
          Unable to Load Data
        </ThemedText>
        <ThemedText style={[styles.errorText, { color: colors.secondary }]}>
          {error}
        </ThemedText>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // In a real app, you would refetch the data here
            console.log('Retry button pressed');
          }}
        >
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <Image 
            source={require('@/assets/ZENTREE_logo_small.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <IconSymbol name="graduationcap.fill" size={80} color="white" style={styles.headerIcon} />
      </ThemedView>

      {/* Welcome Section */}
      <ThemedView style={styles.welcomeSection}>
        <ThemedText type="subtitle" style={styles.welcomeTitle}>
          Welcome to Your Educational Journey
        </ThemedText>
        <ThemedText style={[styles.welcomeText, { color: colors.secondary }]}>
          Discover the best educational opportunities both locally and internationally. 
          We help you find the perfect institution to achieve your academic dreams.
        </ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.actionCard, { borderColor: colors.border }]}
          onPress={navigateToLocal}
        >
         
          <FontAwesome6 name="tree-city" size={40} color={colors.primary} />
          <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
            Domestic 
          </ThemedText>
          <ThemedText style={[styles.actionSubtitle, { color: colors.secondary }]}>
            {localColleges.length} institutions available
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionCard, { borderColor: colors.border }]}
          onPress={navigateToInternational}
        >
          <Entypo name="globe" size={40} color={colors.primary} />
          <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
            International
          </ThemedText>
          <ThemedText style={[styles.actionSubtitle, { color: colors.secondary }]}>
            {internationalColleges.length} universities worldwide
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Why Choose ZenTree?
        </ThemedText>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            <ThemedText style={styles.featureText}>
              Comprehensive college database
            </ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            <ThemedText style={styles.featureText}>
              Expert guidance and counseling
            </ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            <ThemedText style={styles.featureText}>
              Application assistance
            </ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            <ThemedText style={styles.featureText}>
              Scholarship information
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* CTA Section */}
      <ThemedView style={[styles.ctaSection, { backgroundColor: colors.card }]}>
        <ThemedText type="subtitle" style={styles.ctaTitle}>
          Ready to Start Your Journey?
        </ThemedText>
        <ThemedText style={[styles.ctaText, { color: colors.secondary }]}>
          Explore our extensive database of educational institutions and find your perfect match.
        </ThemedText>
        
        <View style={styles.ctaButtons}>
          <TouchableOpacity 
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={navigateToLocal}
          >
            <ThemedText style={styles.ctaButtonText}>Browse Domestic Colleges</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.ctaButtonSecondary, { borderColor: colors.primary }]}
            onPress={navigateToInternational}
          >
            <ThemedText style={[styles.ctaButtonTextSecondary, { color: colors.primary }]}>
              Explore International Colleges
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: 250,
    height: 80,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  headerIcon: {
    opacity: 0.8,
  },
  welcomeSection: {
    padding: 20,
  },
  welcomeTitle: {
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  actionTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  ctaSection: {
    margin: 20,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  ctaButtons: {
    width: '100%',
    gap: 12,
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaButtonSecondary: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  ctaButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
  },
});
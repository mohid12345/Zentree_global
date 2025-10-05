import { CollegeCard } from '@/components/college-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColleges } from '@/hooks/use-colleges';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

export default function InternationalEducationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { internationalColleges, loading, error } = useColleges();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countries = [
    { key: 'all', label: 'All Countries' },
    { key: 'usa', label: 'United States' },
    { key: 'uk', label: 'United Kingdom' },
    { key: 'canada', label: 'Canada' },
    { key: 'australia', label: 'Australia' },
    { key: 'germany', label: 'Germany' }
  ];

  const filteredColleges = internationalColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCountry === 'all') return matchesSearch;
    
    const countryMap: { [key: string]: string } = {
      'usa': 'United States',
      'uk': 'United Kingdom',
      'canada': 'Canada',
      'australia': 'Australia',
      'germany': 'Germany'
    };
    
    return matchesSearch && college.country === countryMap[selectedCountry];
  });

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
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: colors.accent }]}>
        <View style={styles.headerContent}>
          <ThemedText type="title" style={styles.headerTitle}>
            International Education
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {internationalColleges.length} universities worldwide
          </ThemedText>
        </View>
        <IconSymbol name="globe" size={60} color="white" style={styles.headerIcon} />
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={styles.searchSection}>
        <View style={[styles.searchContainer, { borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.secondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search universities, countries, or programs..."
            placeholderTextColor={colors.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </ThemedView>

      {/* Country Filters */}
      <ThemedView style={styles.filtersSection}>
        <ThemedText style={[styles.filterLabel, { color: colors.text }]}>Filter by Country:</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.key}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedCountry === country.key ? colors.accent : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedCountry(country.key)}
            >
              <ThemedText style={[
                styles.filterText,
                { color: selectedCountry === country.key ? 'white' : colors.text }
              ]}>
                {country.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Quick Stats */}
      <ThemedView style={styles.statsSection}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="graduationcap.fill" size={24} color={colors.primary} />
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              {filteredColleges.length}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
              Universities
            </ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="globe" size={24} color={colors.accent} />
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              {new Set(filteredColleges.map(c => c.country)).size}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
              Countries
            </ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="book.fill" size={24} color={colors.success} />
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              {filteredColleges.reduce((acc, college) => acc + college.programs.length, 0)}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
              Programs
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Results Count */}
      <ThemedView style={styles.resultsSection}>
        <ThemedText style={[styles.resultsText, { color: colors.secondary }]}>
          {filteredColleges.length} {filteredColleges.length === 1 ? 'university' : 'universities'} found
        </ThemedText>
      </ThemedView>

      {/* College List */}
      <View style={styles.collegesList}>
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onPress={() => {
              // Navigate to college details
              console.log('Navigate to college details:', college.name);
            }}
          />
        ))}
      </View>

      {/* Empty State */}
      {filteredColleges.length === 0 && (
        <ThemedView style={styles.emptyState}>
          <IconSymbol name="globe" size={60} color={colors.secondary} />
          <ThemedText type="subtitle" style={[styles.emptyTitle, { color: colors.secondary }]}>
            No universities found
          </ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.secondary }]}>
            Try adjusting your search or country filter
          </ThemedText>
        </ThemedView>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}


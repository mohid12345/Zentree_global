import { CollegeCard } from '@/components/college-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { internationalColleges } from '@/data/colleges';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function InternationalEducationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  headerIcon: {
    opacity: 0.8,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersContainer: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
  },
  collegesList: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});


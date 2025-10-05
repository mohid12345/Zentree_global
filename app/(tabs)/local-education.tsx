import { CollegeCard } from '@/components/college-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColleges } from '@/hooks/use-colleges';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function LocalEducationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { localColleges, loading, error } = useColleges();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredColleges = localColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    
    return matchesSearch && college.programs.some(program => 
      program.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const filters = [
    { key: 'all', label: 'All Programs' },
    { key: 'engineering', label: 'Engineering' },
    { key: 'business', label: 'Business' },
    { key: 'medical', label: 'Medical' },
    { key: 'arts', label: 'Arts & Design' }
  ];

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
      <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <ThemedText type="title" style={styles.headerTitle}>
            Local Education
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {localColleges.length} institutions in Pakistan
          </ThemedText>
        </View>
        <IconSymbol name="building.2.fill" size={60} color="white" style={styles.headerIcon} />
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={styles.searchSection}>
        <View style={[styles.searchContainer, { borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.secondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search colleges, locations, or programs..."
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

      {/* Filters */}
      <ThemedView style={styles.filtersSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedFilter === filter.key ? colors.primary : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <ThemedText style={[
                styles.filterText,
                { color: selectedFilter === filter.key ? 'white' : colors.text }
              ]}>
                {filter.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Results Count */}
      <ThemedView style={styles.resultsSection}>
        <ThemedText style={[styles.resultsText, { color: colors.secondary }]}>
          {filteredColleges.length} {filteredColleges.length === 1 ? 'institution' : 'institutions'} found
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
          <IconSymbol name="magnifyingglass" size={60} color={colors.secondary} />
          <ThemedText type="subtitle" style={[styles.emptyTitle, { color: colors.secondary }]}>
            No colleges found
          </ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.secondary }]}>
            Try adjusting your search or filter criteria
          </ThemedText>
        </ThemedView>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

// export default function LocalEducationScreen() {
//   const colorScheme = useColorScheme();
//   const colors = Colors[colorScheme ?? 'light'];
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState<string>('all');

//   const filteredColleges = localColleges.filter(college => {
//     const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          college.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     if (selectedFilter === 'all') return matchesSearch;
    
//     return matchesSearch && college.programs.some(program => 
//       program.toLowerCase().includes(selectedFilter.toLowerCase())
//     );
//   });

//   const filters = [
//     { key: 'all', label: 'All Programs' },
//     { key: 'engineering', label: 'Engineering' },
//     { key: 'business', label: 'Business' },
//     { key: 'medical', label: 'Medical' },
//     { key: 'arts', label: 'Arts & Design' }
//   ];

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header */}
//       <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
//         <View style={styles.headerContent}>
//           <ThemedText type="title" style={styles.headerTitle}>
//             Local Education
//           </ThemedText>
//           <ThemedText style={styles.headerSubtitle}>
//             {localColleges.length} institutions in Pakistan
//           </ThemedText>
//         </View>
//         <IconSymbol name="building.2.fill" size={60} color="white" style={styles.headerIcon} />
//       </ThemedView>

//       {/* Search Bar */}
//       <ThemedView style={styles.searchSection}>
//         <View style={[styles.searchContainer, { borderColor: colors.border }]}>
//           <IconSymbol name="magnifyingglass" size={20} color={colors.secondary} />
//           <TextInput
//             style={[styles.searchInput, { color: colors.text }]}
//             placeholder="Search colleges, locations, or programs..."
//             placeholderTextColor={colors.secondary}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <IconSymbol name="xmark.circle.fill" size={20} color={colors.secondary} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </ThemedView>

//       {/* Filters */}
//       <ThemedView style={styles.filtersSection}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
//           {filters.map((filter) => (
//             <TouchableOpacity
//               key={filter.key}
//               style={[
//                 styles.filterChip,
//                 {
//                   backgroundColor: selectedFilter === filter.key ? colors.primary : colors.card,
//                   borderColor: colors.border,
//                 }
//               ]}
//               onPress={() => setSelectedFilter(filter.key)}
//             >
//               <ThemedText style={[
//                 styles.filterText,
//                 { color: selectedFilter === filter.key ? 'white' : colors.text }
//               ]}>
//                 {filter.label}
//               </ThemedText>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </ThemedView>

//       {/* Results Count */}
//       <ThemedView style={styles.resultsSection}>
//         <ThemedText style={[styles.resultsText, { color: colors.secondary }]}>
//           {filteredColleges.length} {filteredColleges.length === 1 ? 'institution' : 'institutions'} found
//         </ThemedText>
//       </ThemedView>

//       {/* College List */}
//       <View style={styles.collegesList}>
//         {filteredColleges.map((college) => (
//           <CollegeCard
//             key={college.id}
//             college={college}
//             onPress={() => {
//               // Navigate to college details
//               console.log('Navigate to college details:', college.name);
//             }}
//           />
//         ))}
//       </View>

//       {/* Empty State */}
//       {filteredColleges.length === 0 && (
//         <ThemedView style={styles.emptyState}>
//           <IconSymbol name="magnifyingglass" size={60} color={colors.secondary} />
//           <ThemedText type="subtitle" style={[styles.emptyTitle, { color: colors.secondary }]}>
//             No colleges found
//           </ThemedText>
//           <ThemedText style={[styles.emptyText, { color: colors.secondary }]}>
//             Try adjusting your search or filter criteria
//           </ThemedText>
//         </ThemedView>
//       )}

//       <View style={styles.bottomSpacing} />
//     </ScrollView>
//   );
// }

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
    lineHeight: 22,
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
    paddingBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 20,
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


import { Colors } from '@/constants/theme';
import { College } from '@/data/colleges';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { IconSymbol } from './ui/icon-symbol';

interface CollegeCardProps {
  college: College;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

export function CollegeCard({ college, onPress }: CollegeCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView style={[styles.card, { borderColor: colors.border }]}>
        <Image
          source={{ uri: college.image }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.name} numberOfLines={1}>
              {college.name}
            </ThemedText>
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={16} color="#fbbf24" />
              <ThemedText style={styles.rating}>{college.rating}</ThemedText>
            </View>
          </View>
          
          <View style={styles.locationContainer}>
            <IconSymbol name="location.fill" size={14} color={colors.secondary} />
            <ThemedText style={[styles.location, { color: colors.secondary }]}>
              {college.location}, {college.country}
            </ThemedText>
          </View>
          
          <ThemedText style={[styles.description, { color: colors.secondary }]} numberOfLines={2}>
            {college.description}
          </ThemedText>
          
          <View style={styles.footer}>
            <View style={styles.feeContainer}>
              <ThemedText type="defaultSemiBold" style={[styles.fee, { color: colors.primary }]}>
                {college.tuitionFee}
              </ThemedText>
            </View>
            <View style={styles.programsContainer}>
              <ThemedText style={[styles.programs, { color: colors.secondary }]}>
                {college.programs.length} Programs
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeContainer: {
    flex: 1,
  },
  fee: {
    fontSize: 16,
  },
  programsContainer: {
    alignItems: 'flex-end',
  },
  programs: {
    fontSize: 12,
  },
});


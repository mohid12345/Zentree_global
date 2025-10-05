import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully! Sign up functionality will be implemented soon!');
      router.back();
    }, 1000);
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="arrow.left" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <IconSymbol name="person.badge.plus.fill" size={60} color={colors.primary} />
          </View>
          
          <ThemedText type="title" style={styles.title}>
            Create Account
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.secondary }]}>
            Join thousands of students on their educational journey
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.formContainer}>
          <View style={styles.nameRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText style={[styles.label, { color: colors.secondary }]}>
                First Name
              </ThemedText>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.card, 
                  borderColor: colors.border,
                  color: colors.text 
                }]}
                placeholder="First name"
                placeholderTextColor={colors.secondary}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                autoCapitalize="words"
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText style={[styles.label, { color: colors.secondary }]}>
                Last Name
              </ThemedText>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.card, 
                  borderColor: colors.border,
                  color: colors.text 
                }]}
                placeholder="Last name"
                placeholderTextColor={colors.secondary}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: colors.secondary }]}>
              Email Address
            </ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                color: colors.text 
              }]}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: colors.secondary }]}>
              Phone Number
            </ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                color: colors.text 
              }]}
              placeholder="+92 300 1234567"
              placeholderTextColor={colors.secondary}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: colors.secondary }]}>
              Password
            </ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                color: colors.text 
              }]}
              placeholder="Create a password"
              placeholderTextColor={colors.secondary}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: colors.secondary }]}>
              Confirm Password
            </ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card, 
                borderColor: colors.border,
                color: colors.text 
              }]}
              placeholder="Confirm your password"
              placeholderTextColor={colors.secondary}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: colors.primary }]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <ThemedText style={styles.signUpButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <ThemedText style={[styles.dividerText, { color: colors.secondary }]}>
              OR
            </ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity
            style={[styles.signInButton, { borderColor: colors.primary }]}
            onPress={handleSignIn}
          >
            <ThemedText style={[styles.signInButtonText, { color: colors.primary }]}>
              Already have an account? Sign In
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    padding: 8,
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

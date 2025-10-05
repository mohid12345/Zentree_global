import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Sign in functionality will be implemented soon!');
      router.back();
    }, 1000);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented soon!');
  };

  const handleSignUp = () => {
    router.push('/signup');
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
            <IconSymbol name="graduationcap.fill" size={60} color={colors.primary} />
          </View>
          
          <ThemedText type="title" style={styles.title}>
            Welcome Back
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.secondary }]}>
            Sign in to continue your educational journey
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.formContainer}>
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
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <ThemedText style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInButton, { backgroundColor: colors.primary }]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <ThemedText style={styles.signInButtonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
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
            style={[styles.signUpButton, { borderColor: colors.primary }]}
            onPress={handleSignUp}
          >
            <ThemedText style={[styles.signUpButtonText, { color: colors.primary }]}>
              Create New Account
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
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
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

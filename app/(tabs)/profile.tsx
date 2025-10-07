import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    education: string;
    interests: string[];
    preferredCountries: string[];
}

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

    // Mock user data - in real app, this would come from authentication state
    const [isLoggedIn] = useState(false); // Set to false to show auth options
    const [userProfile] = useState<UserProfile>({
        name: "Ahmed Hassan",
        email: "ahmed.hassan@email.com",
        phone: "+92 300 1234567",
        education: "Intermediate (FSc)",
        interests: ["Computer Science", "Engineering", "Business"],
        preferredCountries: ["United States", "Canada", "United Kingdom"],
    });

    const handleSignIn = () => {
        router.push("/signin");
    };

    const handleSignUp = () => {
        router.push("/signup");
    };

    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "Profile editing functionality will be implemented soon!");
    };

    const handleSettings = () => {
        Alert.alert("Settings", "Settings page will be implemented soon!");
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: () => console.log("Logout") },
        ]);
    };

    const profileMenuItems = [
        {
            icon: "heart.fill",
            title: "Saved Colleges",
            subtitle: "12 institutions saved",
            onPress: () => Alert.alert("Saved Colleges", "Feature coming soon!"),
        },
        {
            icon: "doc.text.fill",
            title: "Applications",
            subtitle: "3 applications in progress",
            onPress: () => Alert.alert("Applications", "Feature coming soon!"),
        },
        {
            icon: "bell.fill",
            title: "Notifications",
            subtitle: "Manage your preferences",
            onPress: () => Alert.alert("Notifications", "Feature coming soon!"),
        },
        {
            icon: "questionmark.circle.fill",
            title: "Help & Support",
            subtitle: "Get help with your queries",
            onPress: () => Alert.alert("Help & Support", "Feature coming soon!"),
        },
    ];

    // Show authentication options if user is not logged in
    if (!isLoggedIn) {
        return (
            <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Header */}
                <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
                    <View style={styles.headerContent}>
                        <View style={[styles.avatarContainer, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                            <Ionicons name="person-circle-outline" size={80} color="white" />
                        </View>

                        <View style={styles.userInfo}>
                            <ThemedText type="title" style={styles.userName}>
                                Welcome to ZenTree
                            </ThemedText>
                            <ThemedText style={styles.userEmail}>Sign in to access your profile</ThemedText>
                        </View>
                    </View>
                </ThemedView>

                {/* Authentication Section */}
                <ThemedView style={styles.authSection}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Get Started
                    </ThemedText>
                    <ThemedText style={[styles.authDescription, { color: colors.secondary }]}>
                        Sign in to your account or create a new one to access personalized features, save colleges, and
                        track your applications.
                    </ThemedText>

                    <View style={styles.authButtons}>
                        <TouchableOpacity
                            style={[styles.signInButton, { backgroundColor: colors.primary }]}
                            onPress={handleSignIn}
                        >
                            <IconSymbol name="arrow.right.square.fill" size={20} color="white" />
                            <ThemedText style={styles.signInButtonText}>Sign In</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.signUpButton, { borderColor: colors.primary }]}
                            onPress={handleSignUp}
                        >
                            <IconSymbol name="person.badge.plus.fill" size={20} color={colors.primary} />
                            <ThemedText style={[styles.signUpButtonText, { color: colors.primary }]}>
                                Create Account
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ThemedView>

                {/* Features Preview */}
                <ThemedView style={styles.section}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        What You'll Get
                    </ThemedText>

                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <IconSymbol name="heart.fill" size={24} color={colors.success} />
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Save Colleges</ThemedText>
                                <ThemedText style={[styles.featureDescription, { color: colors.secondary }]}>
                                    Save your favorite institutions for easy access
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <IconSymbol name="doc.text.fill" size={24} color={colors.primary} />
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Track Applications</ThemedText>
                                <ThemedText style={[styles.featureDescription, { color: colors.secondary }]}>
                                    Monitor your application progress
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <IconSymbol name="bell.fill" size={24} color={colors.accent} />
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Get Notifications</ThemedText>
                                <ThemedText style={[styles.featureDescription, { color: colors.secondary }]}>
                                    Stay updated with important deadlines
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <IconSymbol name="person.2.fill" size={24} color={colors.success} />
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Expert Guidance</ThemedText>
                                <ThemedText style={[styles.featureDescription, { color: colors.secondary }]}>
                                    Get personalized counseling from our experts
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                </ThemedView>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        );
    }

    // Show user profile if logged in
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
                <View style={styles.headerContent}>
                    <View style={[styles.avatarContainer, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                        <IconSymbol name="person.fill" size={40} color="white" />
                    </View>
                    <View style={styles.userInfo}>
                        <ThemedText type="title" style={styles.userName}>
                            {userProfile.name}
                        </ThemedText>
                        <ThemedText style={styles.userEmail}>{userProfile.email}</ThemedText>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <IconSymbol name="pencil" size={20} color="white" />
                </TouchableOpacity>
            </ThemedView>

            {/* Profile Stats */}
            <ThemedView style={styles.statsSection}>
                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <IconSymbol name="heart.fill" size={24} color="#ef4444" />
                        <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                            12
                        </ThemedText>
                        <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Saved</ThemedText>
                    </View>

                    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <IconSymbol name="doc.text.fill" size={24} color={colors.primary} />
                        <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                            3
                        </ThemedText>
                        <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Applications</ThemedText>
                    </View>

                    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                        <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                            1
                        </ThemedText>
                        <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Accepted</ThemedText>
                    </View>
                </View>
            </ThemedView>

            {/* Personal Information */}
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Personal Information
                </ThemedText>

                <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.infoRow}>
                        <IconSymbol name="phone.fill" size={20} color={colors.secondary} />
                        <View style={styles.infoContent}>
                            <ThemedText style={[styles.infoLabel, { color: colors.secondary }]}>Phone</ThemedText>
                            <ThemedText style={styles.infoValue}>{userProfile.phone}</ThemedText>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <View style={styles.infoRow}>
                        <IconSymbol name="graduationcap.fill" size={20} color={colors.secondary} />
                        <View style={styles.infoContent}>
                            <ThemedText style={[styles.infoLabel, { color: colors.secondary }]}>Education</ThemedText>
                            <ThemedText style={styles.infoValue}>{userProfile.education}</ThemedText>
                        </View>
                    </View>
                </View>
            </ThemedView>

            {/* Interests */}
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Interests
                </ThemedText>

                <View style={styles.tagsContainer}>
                    {userProfile.interests.map((interest, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: colors.primary }]}>
                            <ThemedText style={styles.tagText}>{interest}</ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Preferred Countries */}
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Preferred Countries
                </ThemedText>

                <View style={styles.tagsContainer}>
                    {userProfile.preferredCountries.map((country, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}>
                            <ThemedText style={styles.tagText}>{country}</ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Menu Items */}
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Account
                </ThemedText>

                <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    {profileMenuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
                                {/* <IconSymbol name={item.icon} size={24} color={colors.primary} /> */}
                                <View style={styles.menuContent}>
                                    <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
                                    <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
                                        {item.subtitle}
                                    </ThemedText>
                                </View>
                                <IconSymbol name="chevron.right" size={16} color={colors.secondary} />
                            </TouchableOpacity>
                            {index < profileMenuItems.length - 1 && (
                                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </ThemedView>

            {/* Settings & Logout */}
            <ThemedView style={styles.section}>
                <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
                        <IconSymbol name="gearshape.fill" size={24} color={colors.secondary} />
                        <View style={styles.menuContent}>
                            <ThemedText style={styles.menuTitle}>Settings</ThemedText>
                            <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
                                App preferences and privacy
                            </ThemedText>
                        </View>
                        <IconSymbol name="chevron.right" size={16} color={colors.secondary} />
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <IconSymbol name="arrow.right.square.fill" size={24} color="#ef4444" />
                        <View style={styles.menuContent}>
                            <ThemedText style={[styles.menuTitle, { color: "#ef4444" }]}>Logout</ThemedText>
                            <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
                                Sign out of your account
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>
            </ThemedView>

            <View style={styles.bottomSpacing} />
        </ScrollView>
    );
}

// interface UserProfile {
//   name: string;
//   email: string;
//   phone: string;
//   education: string;
//   interests: string[];
//   preferredCountries: string[];
// }

// export default function ProfileScreen() {
//   const colorScheme = useColorScheme();
//   const colors = Colors[colorScheme ?? 'light'];

//   // Mock user data
//   const [userProfile] = useState<UserProfile>({
//     name: 'Ahmed Hassan',
//     email: 'ahmed.hassan@email.com',
//     phone: '+92 300 1234567',
//     education: 'Intermediate (FSc)',
//     interests: ['Computer Science', 'Engineering', 'Business'],
//     preferredCountries: ['United States', 'Canada', 'United Kingdom']
//   });

//   const handleEditProfile = () => {
//     Alert.alert('Edit Profile', 'Profile editing functionality will be implemented soon!');
//   };

//   const handleSettings = () => {
//     Alert.alert('Settings', 'Settings page will be implemented soon!');
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
//       ]
//     );
//   };

//   const profileMenuItems = [
//     {
//       icon: 'heart.fill',
//       title: 'Saved Colleges',
//       subtitle: '12 institutions saved',
//       onPress: () => Alert.alert('Saved Colleges', 'Feature coming soon!')
//     },
//     {
//       icon: 'doc.text.fill',
//       title: 'Applications',
//       subtitle: '3 applications in progress',
//       onPress: () => Alert.alert('Applications', 'Feature coming soon!')
//     },
//     {
//       icon: 'bell.fill',
//       title: 'Notifications',
//       subtitle: 'Manage your preferences',
//       onPress: () => Alert.alert('Notifications', 'Feature coming soon!')
//     },
//     {
//       icon: 'questionmark.circle.fill',
//       title: 'Help & Support',
//       subtitle: 'Get help with your queries',
//       onPress: () => Alert.alert('Help & Support', 'Feature coming soon!')
//     }
//   ];

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header */}
//       <ThemedView style={[styles.header, { backgroundColor: colors.primary }]}>
//         <View style={styles.headerContent}>
//           <View style={[styles.avatarContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
//             <IconSymbol name="person.fill" size={40} color="white" />
//           </View>
//           <View style={styles.userInfo}>
//             <ThemedText type="title" style={styles.userName}>
//               {userProfile.name}
//             </ThemedText>
//             <ThemedText style={styles.userEmail}>
//               {userProfile.email}
//             </ThemedText>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
//           <IconSymbol name="pencil" size={20} color="white" />
//         </TouchableOpacity>
//       </ThemedView>

//       {/* Profile Stats */}
//       <ThemedView style={styles.statsSection}>
//         <View style={styles.statsContainer}>
//           <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//             <IconSymbol name="heart.fill" size={24} color="#ef4444" />
//             <ThemedText type="defaultSemiBold" style={styles.statNumber}>12</ThemedText>
//             <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Saved</ThemedText>
//           </View>

//           <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//             <IconSymbol name="doc.text.fill" size={24} color={colors.primary} />
//             <ThemedText type="defaultSemiBold" style={styles.statNumber}>3</ThemedText>
//             <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Applications</ThemedText>
//           </View>

//           <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//             <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
//             <ThemedText type="defaultSemiBold" style={styles.statNumber}>1</ThemedText>
//             <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>Accepted</ThemedText>
//           </View>
//         </View>
//       </ThemedView>

//       {/* Personal Information */}
//       <ThemedView style={styles.section}>
//         <ThemedText type="subtitle" style={styles.sectionTitle}>
//           Personal Information
//         </ThemedText>

//         <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//           <View style={styles.infoRow}>
//             <IconSymbol name="phone.fill" size={20} color={colors.secondary} />
//             <View style={styles.infoContent}>
//               <ThemedText style={[styles.infoLabel, { color: colors.secondary }]}>Phone</ThemedText>
//               <ThemedText style={styles.infoValue}>{userProfile.phone}</ThemedText>
//             </View>
//           </View>

//           <View style={[styles.divider, { backgroundColor: colors.border }]} />

//           <View style={styles.infoRow}>
//             <IconSymbol name="graduationcap.fill" size={20} color={colors.secondary} />
//             <View style={styles.infoContent}>
//               <ThemedText style={[styles.infoLabel, { color: colors.secondary }]}>Education</ThemedText>
//               <ThemedText style={styles.infoValue}>{userProfile.education}</ThemedText>
//             </View>
//           </View>
//         </View>
//       </ThemedView>

//       {/* Interests */}
//       <ThemedView style={styles.section}>
//         <ThemedText type="subtitle" style={styles.sectionTitle}>
//           Interests
//         </ThemedText>

//         <View style={styles.tagsContainer}>
//           {userProfile.interests.map((interest, index) => (
//             <View key={index} style={[styles.tag, { backgroundColor: colors.primary }]}>
//               <ThemedText style={styles.tagText}>{interest}</ThemedText>
//             </View>
//           ))}
//         </View>
//       </ThemedView>

//       {/* Preferred Countries */}
//       <ThemedView style={styles.section}>
//         <ThemedText type="subtitle" style={styles.sectionTitle}>
//           Preferred Countries
//         </ThemedText>

//         <View style={styles.tagsContainer}>
//           {userProfile.preferredCountries.map((country, index) => (
//             <View key={index} style={[styles.tag, { backgroundColor: colors.accent }]}>
//               <ThemedText style={styles.tagText}>{country}</ThemedText>
//             </View>
//           ))}
//         </View>
//       </ThemedView>

//       {/* Menu Items */}
//       <ThemedView style={styles.section}>
//         <ThemedText type="subtitle" style={styles.sectionTitle}>
//           Account
//         </ThemedText>

//         <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//           {profileMenuItems.map((item, index) => (
//             <React.Fragment key={index}>
//               <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
//                 <IconSymbol name={item.icon} size={24} color={colors.primary} />
//                 <View style={styles.menuContent}>
//                   <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
//                   <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
//                     {item.subtitle}
//                   </ThemedText>
//                 </View>
//                 <IconSymbol name="chevron.right" size={16} color={colors.secondary} />
//               </TouchableOpacity>
//               {index < profileMenuItems.length - 1 && (
//                 <View style={[styles.divider, { backgroundColor: colors.border }]} />
//               )}
//             </React.Fragment>
//           ))}
//         </View>
//       </ThemedView>

//       {/* Settings & Logout */}
//       <ThemedView style={styles.section}>
//         <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
//           <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
//             <IconSymbol name="gearshape.fill" size={24} color={colors.secondary} />
//             <View style={styles.menuContent}>
//               <ThemedText style={styles.menuTitle}>Settings</ThemedText>
//               <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
//                 App preferences and privacy
//               </ThemedText>
//             </View>
//             <IconSymbol name="chevron.right" size={16} color={colors.secondary} />
//           </TouchableOpacity>

//           <View style={[styles.divider, { backgroundColor: colors.border }]} />

//           <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
//             <IconSymbol name="arrow.right.square.fill" size={24} color="#ef4444" />
//             <View style={styles.menuContent}>
//               <ThemedText style={[styles.menuTitle, { color: '#ef4444' }]}>Logout</ThemedText>
//               <ThemedText style={[styles.menuSubtitle, { color: colors.secondary }]}>
//                 Sign out of your account
//               </ThemedText>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ThemedView>

//       <View style={styles.bottomSpacing} />
//     </ScrollView>
//   );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    headerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    userEmail: {
        color: "white",
        fontSize: 16,
        opacity: 0.8,
    },
    editButton: {
        padding: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 12,
    },
    authSection: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        marginBottom: 24,
    },
    authDescription: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 24,
    },
    authButtons: {
        gap: 12,
    },
    signInButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 8,
    },
    signInButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    signUpButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 2,
        gap: 8,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: "600",
    },
    featuresList: {
        gap: 16,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 14,
        lineHeight: 20,
    },
    statsSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    statsContainer: {
        flexDirection: "row",
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: "center",
        gap: 4,
    },
    statNumber: {
        fontSize: 20,
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    infoCard: {
        borderRadius: 12,
        borderWidth: 1,
        overflow: "hidden",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "500",
    },
    divider: {
        height: 1,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
    menuCard: {
        borderRadius: 12,
        borderWidth: 1,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 16,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
    },
    bottomSpacing: {
        height: 40,
    },
});

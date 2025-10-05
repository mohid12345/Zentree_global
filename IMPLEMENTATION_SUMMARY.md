# ZenTree Educational Consulting App

A React Native app built with Expo for educational consulting services, helping students find colleges both locally and internationally.

## Features Implemented

### 🚀 Onboarding Flow
- **3-screen onboarding experience** showcasing ZenTree's facilities and services
- **Persistent onboarding state** using AsyncStorage
- **Smooth navigation** with pagination dots and skip functionality
- **Beautiful UI** with custom slide components

### 🔐 Authentication System
- **Sign In Screen** with email/password fields
- **Sign Up Screen** with comprehensive form validation
- **Profile Integration** - shows auth options when not logged in
- **Modern UI** with proper form handling and validation

### 🌐 API Integration
- **RESTful API service** (`localhost:3000/api/items/getItem`)
- **Custom hook** (`useColleges`) for data management
- **Error handling** with fallback to local data
- **Loading states** with proper UX indicators
- **Type safety** with TypeScript interfaces

### 📱 Enhanced UI/UX
- **Consistent theming** across all screens
- **Loading indicators** for better user experience
- **Error states** with retry functionality
- **Responsive design** that works on different screen sizes
- **Modern card-based layouts** for college listings

## Technical Implementation

### API Service (`services/api.ts`)
```typescript
- GET /items/getItem - Fetches all colleges
- Automatic filtering by type (local/international)
- Error handling with fallback mechanisms
- TypeScript interfaces for type safety
```

### Custom Hook (`hooks/use-colleges.ts`)
```typescript
- Manages college data state
- Handles loading and error states
- Provides filtered data (local/international)
- Automatic refetch capability
```

### Onboarding Context (`contexts/onboarding-context.tsx`)
```typescript
- Manages onboarding completion state
- Persistent storage with AsyncStorage
- Loading state management
- Context provider for app-wide access
```

## File Structure

```
app/
├── index.tsx                 # Entry point with onboarding logic
├── onboarding.tsx           # Onboarding screens
├── signin.tsx              # Sign in screen
├── signup.tsx              # Sign up screen
├── _layout.tsx             # Root layout with providers
└── (tabs)/
    ├── index.tsx           # Home screen with API integration
    ├── local-education.tsx # Local colleges with API
    ├── international-education.tsx # International colleges with API
    └── profile.tsx         # Profile with auth integration

components/
├── onboarding-slide.tsx    # Reusable onboarding slide component
└── ...existing components

services/
└── api.ts                  # API service for college data

hooks/
└── use-colleges.ts         # Custom hook for college data

contexts/
└── onboarding-context.tsx  # Onboarding state management
```

## Usage

1. **First Launch**: Users see onboarding screens showcasing ZenTree's services
2. **Main App**: After onboarding, users access the main app with college listings
3. **Authentication**: Users can sign in/up from the profile screen
4. **College Browsing**: Browse local and international colleges with search/filter
5. **API Integration**: All college data is fetched from your API endpoint

## API Endpoint

The app expects your API at `localhost:3000/api/items/getItem` to return college data in this format:

```typescript
interface College {
  id: string;
  name: string;
  location: string;
  country: string;
  type: 'local' | 'international';
  description: string;
  tuitionFee: string;
  programs: string[];
  rating: number;
  image: string;
  established: number;
  accreditation: string[];
}
```

## Dependencies Added

- `@react-native-async-storage/async-storage` - For persistent onboarding state

## Next Steps

1. **Connect to your actual API** - Update the API_BASE_URL in `services/api.ts`
2. **Implement authentication backend** - Connect sign in/up to your auth service
3. **Add college details screen** - Create detailed view for individual colleges
4. **Implement user preferences** - Save user interests and preferences
5. **Add push notifications** - For application deadlines and updates

The app is now ready with a complete onboarding flow, authentication UI, and API integration while maintaining the existing beautiful design!

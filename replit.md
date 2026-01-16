# HackSprint - Hackathon Sprint Companion

## Overview
HackSprint is a mobile app designed to help hackathon teams go from idea to demo in record time. It features a bold, striking dark mode UI with neon cyan and pink accents.

## Current State
MVP complete with:
- **Idea Tab**: Capture problem, solution, and unique angle with auto-save
- **Build Tab**: Task management with countdown timer, progress tracking, and floating action button
- **Present Tab**: Pitch preparation with elevator pitch, demo checklist, and speaking notes
- **Settings Modal**: Team name, hackathon deadline picker, and project reset

## Project Architecture

### Frontend (React Native + Expo)
```
client/
├── App.tsx                 # Root component with font loading
├── components/
│   ├── AddTaskModal.tsx    # Modal for adding new tasks
│   ├── AutoSaveIndicator.tsx # Pulsing save status indicator
│   ├── Button.tsx          # Styled button with press animation
│   ├── ChecklistItem.tsx   # Demo checklist toggle item
│   ├── CountdownTimer.tsx  # Animated countdown with urgency pulse
│   ├── EmptyState.tsx      # Illustration + text empty state
│   ├── FloatingActionButton.tsx # FAB for quick task add
│   ├── HeaderTitle.tsx     # App icon + title header
│   ├── ProgressBar.tsx     # Animated task completion bar
│   ├── TaskCard.tsx        # Swipeable task with checkbox
│   ├── TextArea.tsx        # Labeled textarea with character count
│   └── ThemedText.tsx      # Typography component
├── constants/theme.ts      # Colors, spacing, typography, shadows
├── hooks/
│   ├── useTheme.ts         # Theme context hook
│   └── useScreenOptions.ts # Navigation header options
├── lib/
│   ├── query-client.ts     # React Query client
│   └── storage.ts          # AsyncStorage data layer
├── navigation/
│   ├── RootStackNavigator.tsx
│   ├── MainTabNavigator.tsx
│   ├── IdeaStackNavigator.tsx
│   ├── BuildStackNavigator.tsx
│   └── PresentStackNavigator.tsx
└── screens/
    ├── IdeaScreen.tsx
    ├── BuildScreen.tsx
    ├── PresentScreen.tsx
    └── SettingsScreen.tsx
```

### Backend (Express.js)
- Minimal backend serving landing page only
- All data stored locally via AsyncStorage

### Data Models
```typescript
interface IdeaData {
  problem: string;
  solution: string;
  uniqueAngle: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface PitchData {
  elevatorPitch: string;
  demoChecklist: { id: string; label: string; checked: boolean; }[];
  speakingNotes: string;
}

interface SettingsData {
  teamName: string;
  hackathonEndTime: number | null;
}
```

## Design System
- **Font**: Lexend Deca (Google Font)
- **Dark Mode Colors**:
  - Background: #0A0E14
  - Surface: #1A1F2E
  - Primary: #00F0FF (electric cyan)
  - Accent: #FF3366 (neon pink)
  - Success: #00FF88 (neon green)
- **Timer**: Pulses orange when < 3 hours remaining

## Recent Changes
- January 2026: Initial MVP created with all core features

## User Preferences
- Dark mode by default
- Auto-save on all text inputs
- Haptic feedback on interactions

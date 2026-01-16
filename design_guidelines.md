# Hackathon Starter Template - Design Guidelines

## Brand Identity

**Purpose**: A sprint companion app that helps hackathon teams go from idea to demo in record time. Built for the high-energy, time-pressured environment of competitive building.

**Aesthetic Direction**: BOLD/STRIKING - High contrast, electric energy, urgency without anxiety. Think mission control meets street art. Dark mode by default with neon accent pops. Every element screams "GO FAST, BUILD NOW."

**Memorable Element**: A prominent countdown timer that pulses as deadlines approach, creating urgency while keeping teams focused. Color-shifting backgrounds that transition from energetic blue (early hours) to intense orange (final sprint).

## Navigation Architecture

**Root Navigation**: Tab Bar (3 tabs)

**Screens**:
1. **Idea** (Tab 1) - Capture and refine the core concept
2. **Build** (Tab 2, center) - Track tasks and progress with floating quick-add button
3. **Present** (Tab 3) - Prepare pitch deck and talking points
4. **Settings** (Modal from Build tab) - Timer, team name, preferences

## Screen-by-Screen Specifications

### 1. Idea Screen
- **Purpose**: Rapid idea definition - problem, solution, unique value
- **Layout**:
  - Transparent header, large bold title "The Idea"
  - Scrollable form with 3 key input sections
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl
- **Components**:
  - Problem statement textarea (max 200 chars)
  - Solution description textarea (max 300 chars)
  - Unique angle textarea (max 150 chars)
  - Auto-save indicator (pulsing dot)
- **Empty State**: Illustration (idea-start.png) - lightbulb with lightning bolt

### 2. Build Screen (Core Tab)
- **Purpose**: Sprint execution - task list with brutal honesty about time
- **Layout**:
  - Transparent header with countdown timer (HH:MM remaining) and settings gear icon (right)
  - Scrollable task list
  - Floating action button (bottom-right) for quick task add
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl (FAB hovers above this)
- **Components**:
  - Countdown timer (large, color-shifts orange when <3hrs)
  - Task cards (checkbox, title, swipe to delete)
  - Progress bar (% complete)
  - Floating + button with subtle shadow (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)
- **Empty State**: Illustration (empty-tasks.png) - rocket ready to launch

### 3. Present Screen
- **Purpose**: Pitch prep - talking points and demo checklist
- **Layout**:
  - Transparent header "The Pitch"
  - Scrollable sections
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl
- **Components**:
  - Elevator pitch textarea (60 seconds max)
  - Demo checklist (5 preset items: hook, problem, solution, wow moment, call-to-action)
  - Speaking notes textarea
- **Empty State**: Illustration (empty-pitch.png) - microphone with spotlight

### 4. Settings Modal
- **Purpose**: Configure timer, team identity, preferences
- **Layout**:
  - Standard modal header with "Settings" title, close button (left)
  - Scrollable form
  - Save/Cancel in header (Save = right button)
- **Components**:
  - Team name input
  - Hackathon end time picker
  - Theme toggle (Dark/Light)
  - Reset project button (destructive, requires confirmation)

## Color Palette

**Dark Mode (Default)**:
- Background: #0A0E14 (deep space)
- Surface: #1A1F2E (elevated cards)
- Primary: #00F0FF (electric cyan - for CTAs, active states)
- Accent: #FF3366 (neon pink - for urgency, warnings)
- Text Primary: #FFFFFF
- Text Secondary: #8B92A8
- Success: #00FF88 (neon green)
- Border: #2A3244

**Light Mode**:
- Background: #FFFFFF
- Surface: #F5F7FA
- Primary: #0088FF (bright blue)
- Accent: #FF1744 (action red)
- Text Primary: #0A0E14
- Text Secondary: #6B7280

## Typography

**Font**: "Lexend Deca" (Google Font) - modern, legible, tech-forward without being cold

**Type Scale**:
- Display (Countdown): 48px, ExtraBold
- Title: 28px, Bold
- Heading: 20px, SemiBold
- Body: 16px, Regular
- Caption: 14px, Regular
- Label: 12px, Medium (uppercase)

## Visual Design

- All buttons have bold press states (scale 0.95, opacity 0.7)
- Cards have subtle 1px border (Border color)
- Completed tasks fade to 50% opacity
- Floating action button uses specified shadow
- Timer color transitions smoothly as deadline approaches
- No emojis - use Feather icons from @expo/vector-icons

## Assets to Generate

1. **icon.png** - Lightning bolt inside hexagon, electric cyan on dark background - App icon
2. **splash-icon.png** - Same as icon.png, centered on dark background - Launch screen
3. **idea-start.png** - Geometric lightbulb with lightning bolt radiating outward, cyan/pink gradient - Idea tab empty state
4. **empty-tasks.png** - Minimalist rocket on launch pad, ready position, cyan accent - Build tab empty state
5. **empty-pitch.png** - Single microphone with spotlight cone, pink accent glow - Present tab empty state
6. **avatar-default.png** - Geometric hexagon with abstract face, cyan - Settings profile placeholder
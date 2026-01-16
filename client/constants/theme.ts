import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#0A0E14",
    textSecondary: "#6B7280",
    buttonText: "#FFFFFF",
    tabIconDefault: "#6B7280",
    tabIconSelected: "#0088FF",
    link: "#0088FF",
    accent: "#FF1744",
    success: "#00C853",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F5F7FA",
    backgroundSecondary: "#E8ECF0",
    backgroundTertiary: "#D9DEE5",
    border: "#E0E4E8",
    primary: "#0088FF",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#8B92A8",
    buttonText: "#0A0E14",
    tabIconDefault: "#8B92A8",
    tabIconSelected: "#00F0FF",
    link: "#00F0FF",
    accent: "#FF3366",
    success: "#00FF88",
    backgroundRoot: "#0A0E14",
    backgroundDefault: "#1A1F2E",
    backgroundSecondary: "#252B3D",
    backgroundTertiary: "#2A3244",
    border: "#2A3244",
    primary: "#00F0FF",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  display: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "800" as const,
    fontFamily: "LexendDeca_800ExtraBold",
  },
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
    fontFamily: "LexendDeca_700Bold",
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as const,
    fontFamily: "LexendDeca_700Bold",
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
    fontFamily: "LexendDeca_600SemiBold",
  },
  h4: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600" as const,
    fontFamily: "LexendDeca_600SemiBold",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "LexendDeca_400Regular",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
    fontFamily: "LexendDeca_400Regular",
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const,
    fontFamily: "LexendDeca_500Medium",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "LexendDeca_400Regular",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "LexendDeca_400Regular",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "LexendDeca_400Regular",
    serif: "serif",
    rounded: "LexendDeca_400Regular",
    mono: "monospace",
  },
  web: {
    sans: "LexendDeca_400Regular, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "LexendDeca_400Regular, 'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadows = {
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
};

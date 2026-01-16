import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    progress.value = withSpring(percentage / 100, {
      damping: 15,
      stiffness: 100,
    });
  }, [percentage, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          Progress
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.primary }}>
          {percentage}%
        </ThemedText>
      </View>
      <View
        style={[styles.track, { backgroundColor: theme.backgroundSecondary }]}
      >
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: theme.primary },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  track: {
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: BorderRadius.full,
  },
});

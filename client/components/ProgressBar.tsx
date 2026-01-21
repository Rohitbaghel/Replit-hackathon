import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

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
    <View className="mb-5">
      <View className="flex-row justify-between items-center mb-2">
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          Progress
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.primary }}>
          {percentage}%
        </ThemedText>
      </View>
      <View
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: theme.backgroundSecondary }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={[{ backgroundColor: theme.primary }, animatedStyle]}
        />
      </View>
    </View>
  );
}

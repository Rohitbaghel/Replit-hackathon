import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface AutoSaveIndicatorProps {
  saving: boolean;
}

export function AutoSaveIndicator({ saving }: AutoSaveIndicatorProps) {
  const { theme } = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (saving) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
    } else {
      opacity.value = withTiming(1, { duration: 200 });
    }
  }, [saving, opacity]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-row items-center">
      <Animated.View
        className="w-1.5 h-1.5 rounded-full mr-1"
        style={[
          { backgroundColor: saving ? theme.accent : theme.success },
          animatedDotStyle,
        ]}
      />
      <ThemedText
        className="text-xs font-medium"
        style={{ color: theme.textSecondary }}
      >
        {saving ? "Saving..." : "Saved"}
      </ThemedText>
    </View>
  );
}

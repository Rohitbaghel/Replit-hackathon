import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface CountdownTimerProps {
  endTime: number | null;
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const pulse = useSharedValue(1);

  const isUrgent = timeLeft.hours < 3 && endTime !== null;

  useEffect(() => {
    if (!endTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, endTime - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  useEffect(() => {
    if (isUrgent) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
    } else {
      pulse.value = 1;
    }
  }, [isUrgent, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  if (!endTime) {
    return (
      <View
        className="px-4 py-2 rounded-[18px] items-center"
        style={{ backgroundColor: theme.backgroundDefault }}
      >
        <ThemedText style={{ color: theme.textSecondary, fontSize: 12, fontWeight: "500" }}>
          Set deadline in settings
        </ThemedText>
      </View>
    );
  }

  const timerColor = isUrgent ? theme.accent : theme.primary;

  return (
    <Animated.View
      className="px-4 py-2 rounded-[18px] items-center"
      style={[
        { backgroundColor: theme.backgroundDefault },
        animatedStyle,
      ]}
    >
      <ThemedText
        className="text-[32px] font-bold tracking-widest"
        style={{ color: timerColor }}
      >
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}
      </ThemedText>
      <ThemedText
        className="text-[10px] font-medium tracking-wider mt-0.5"
        style={{ color: theme.textSecondary }}
      >
        REMAINING
      </ThemedText>
    </Animated.View>
  );
}

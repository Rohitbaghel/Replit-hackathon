import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
  Layout,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { Task } from "@/lib/storage";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleToggle}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="flex-row items-center p-4 rounded-[18px] border mb-2"
      style={[
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          opacity: task.completed ? 0.5 : 1,
        },
        animatedStyle,
      ]}
    >
      <View
        className="w-6 h-6 rounded-lg border-2 items-center justify-center mr-3"
        style={{
          borderColor: task.completed ? theme.success : theme.border,
          backgroundColor: task.completed ? theme.success : "transparent",
        }}
      >
        {task.completed ? (
          <Feather name="check" size={14} color={theme.backgroundRoot} />
        ) : null}
      </View>
      <ThemedText
        className={`flex-1 text-[15px] font-medium ${task.completed ? "line-through" : ""}`}
        numberOfLines={2}
      >
        {task.title}
      </ThemedText>
      <Pressable onPress={onDelete} hitSlop={8} className="p-1 ml-2">
        <Feather name="x" size={18} color={theme.textSecondary} />
      </Pressable>
    </AnimatedPressable>
  );
}

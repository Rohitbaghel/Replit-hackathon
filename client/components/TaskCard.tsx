import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
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
import { Spacing, BorderRadius } from "@/constants/theme";
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
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          opacity: task.completed ? 0.5 : 1,
        },
        animatedStyle,
      ]}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: task.completed ? theme.success : theme.border,
            backgroundColor: task.completed ? theme.success : "transparent",
          },
        ]}
      >
        {task.completed ? (
          <Feather name="check" size={14} color={theme.backgroundRoot} />
        ) : null}
      </View>
      <ThemedText
        style={[styles.title, task.completed && styles.completedTitle]}
        numberOfLines={2}
      >
        {task.title}
      </ThemedText>
      <Pressable onPress={onDelete} hitSlop={8} style={styles.deleteButton}>
        <Feather name="x" size={18} color={theme.textSecondary} />
      </Pressable>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  completedTitle: {
    textDecorationLine: "line-through",
  },
  deleteButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});

import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function ChecklistItem({
  label,
  checked,
  onToggle,
}: ChecklistItemProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
      ]}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: checked ? theme.success : theme.border,
            backgroundColor: checked ? theme.success : "transparent",
          },
        ]}
      >
        {checked ? (
          <Feather name="check" size={12} color={theme.backgroundRoot} />
        ) : null}
      </View>
      <ThemedText
        style={[
          styles.label,
          { opacity: checked ? 0.6 : 1 },
          checked && styles.checked,
        ]}
        numberOfLines={2}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  label: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  checked: {
    textDecorationLine: "line-through",
  },
});

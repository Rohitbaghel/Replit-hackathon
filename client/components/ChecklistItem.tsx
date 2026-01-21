import React from "react";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

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
      className="flex-row items-center p-3 rounded-xl border mb-2"
      style={{
        backgroundColor: theme.backgroundDefault,
        borderColor: theme.border,
      }}
    >
      <View
        className="w-5 h-5 rounded border-2 items-center justify-center mr-3"
        style={{
          borderColor: checked ? theme.success : theme.border,
          backgroundColor: checked ? theme.success : "transparent",
        }}
      >
        {checked ? (
          <Feather name="check" size={12} color={theme.backgroundRoot} />
        ) : null}
      </View>
      <ThemedText
        className={`flex-1 text-sm leading-5 ${checked ? "line-through" : ""}`}
        style={{ opacity: checked ? 0.6 : 1 }}
        numberOfLines={2}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

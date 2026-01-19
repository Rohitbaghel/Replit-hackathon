import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface TextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  maxLength?: number;
  minHeight?: number;
}

export function TextArea({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  minHeight = 100,
}: TextAreaProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <ThemedText type="label" style={{ color: theme.textSecondary }}>
          {label}
        </ThemedText>
        {maxLength ? (
          <ThemedText
            type="small"
            style={{
              color:
                value.length > maxLength * 0.9
                  ? theme.accent
                  : theme.textSecondary,
            }}
          >
            {value.length}/{maxLength}
          </ThemedText>
        ) : null}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        multiline
        maxLength={maxLength}
        style={[
          styles.input,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
            color: theme.text,
            minHeight,
          },
        ]}
        textAlignVertical="top"
      />
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
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: 15,
    lineHeight: 22,
  },
});

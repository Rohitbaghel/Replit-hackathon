import React from "react";
import { View, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

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
    <View className="mb-5">
      <View className="flex-row justify-between items-center mb-2">
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
        className="border rounded-[18px] p-4 text-[15px] leading-[22px]"
        style={{
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          color: theme.text,
          minHeight,
        }}
        textAlignVertical="top"
      />
    </View>
  );
}

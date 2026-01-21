import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface EmptyStateProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

export function EmptyState({ image, title, subtitle }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        paddingHorizontal: Spacing["3xl"],
        paddingVertical: Spacing["5xl"],
      }}
    >
      <Image
        source={image}
        className="w-[180px] h-[180px] mb-6"
        resizeMode="contain"
      />
      <ThemedText type="h3" className="text-center mb-2">
        {title}
      </ThemedText>
      <ThemedText
        type="body"
        className="text-center"
        style={{ color: theme.textSecondary, lineHeight: 22 }}
      >
        {subtitle}
      </ThemedText>
    </View>
  );
}

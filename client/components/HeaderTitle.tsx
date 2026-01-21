import React from "react";
import { View, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";

interface HeaderTitleProps {
  title: string;
}

export function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <View className="flex-row items-center justify-start">
      <Image
        source={require("../../assets/images/icon.png")}
        className="w-7 h-7 mr-2 rounded-md"
        resizeMode="contain"
      />
      <ThemedText className="text-[17px] font-semibold">{title}</ThemedText>
    </View>
  );
}

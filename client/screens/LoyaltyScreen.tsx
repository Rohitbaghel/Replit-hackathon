import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

export default function LoyaltyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a101f]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center flex-1">
          <Text className="text-2xl font-bold text-white mb-4">Loyalty</Text>
          <Text className="text-white/60 text-center">
            Your loyalty programs and rewards will appear here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

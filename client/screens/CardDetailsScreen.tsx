import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CardDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { card } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-5 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Card Details</Text>
        <View className="w-6" />
      </View>

      <View className="p-5">
        <View
          className="w-full h-[220px] rounded-[20px] overflow-hidden mb-[30px]"
          style={{
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Image source={{ uri: card.cardImage }} className="w-full h-full" />
        </View>

        <View className="bg-gray-100 rounded-[20px] p-5">
          <View className="flex-row justify-between py-4 border-b border-gray-200">
            <Text className="text-gray-500 text-sm">Bank</Text>
            <Text className="text-base font-semibold text-[#1a1a1a]">{card.bankName}</Text>
          </View>
          <View className="flex-row justify-between py-4 border-b border-gray-200">
            <Text className="text-gray-500 text-sm">Card Type</Text>
            <Text className="text-base font-semibold text-[#1a1a1a]">{card.cardType}</Text>
          </View>
          <View className="flex-row justify-between py-4 border-b border-gray-200">
            <Text className="text-gray-500 text-sm">Card Number</Text>
            <Text className="text-base font-semibold text-[#1a1a1a]">
              •••• •••• •••• {card.lastFour}
            </Text>
          </View>
          <View className="flex-row justify-between py-4">
            <Text className="text-gray-500 text-sm">Card Holder</Text>
            <Text className="text-base font-semibold text-[#1a1a1a]">{card.cardHolder}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

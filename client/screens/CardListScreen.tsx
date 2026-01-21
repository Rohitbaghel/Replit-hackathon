import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useCards } from "../hooks/useCardContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SHARED_USERS = [
  {
    id: "1",
    name: "Kristin Watson",
    image: "https://i.pravatar.cc/150?u=kristin",
  },
  { id: "2", name: "Julie Lorens", image: "https://i.pravatar.cc/150?u=julie" },
];

export default function CardListScreen() {
  const { cards } = useCards();
  const navigation = useNavigation<any>();

  const renderCard = (card: any, index: number) => {
    const isMain = index === cards.length - 1;
    const textColor = index % 4 === 1 || index % 4 === 0 ? "#1a1a1a" : "#ffffff";
    const cardColor =
      index % 4 === 0 ? "#76e076" : index % 4 === 1 ? "#f5d94d" : index % 4 === 2 ? "#76a5f5" : "#e05244";

    return (
      <TouchableOpacity
        key={card.id}
        activeOpacity={0.9}
        className={`rounded-[32px] p-6 ${isMain ? "h-[240px]" : "h-[200px]"}`}
        style={{
          backgroundColor: cardColor,
          marginTop: index === 0 ? 0 : -140,
          zIndex: index,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        }}
        onPress={() => navigation.navigate("CardDetails", { card })}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-semibold" style={{ color: textColor }}>
            {card.bankName}
          </Text>
          <Text
            className="text-sm tracking-wider"
            style={{ color: textColor, opacity: 0.7 }}
          >
            •••• {card.lastFour}
          </Text>
        </View>

        {isMain && (
          <View className="mt-5">
            <View className="flex-row justify-between items-center">
              <Text className="text-[42px] font-bold text-white">$3,687</Text>
              <Ionicons
                name="wifi-outline"
                size={24}
                color="#ffffff"
                style={{ transform: [{ rotate: "90deg" }], opacity: 0.8 }}
              />
            </View>
            <View className="flex-row mt-5 items-center">
              <View>
                <Text className="text-[10px] font-medium tracking-wide mb-1 text-white/60">
                  EXPIRATION
                </Text>
                <Text className="text-sm font-semibold text-white">12/24</Text>
              </View>
              <View className="ml-[30px] flex-1">
                <Text className="text-[10px] font-medium tracking-wide mb-1 text-white/60">
                  CARD HOLDER
                </Text>
                <Text className="text-sm font-semibold text-white">{card.cardHolder}</Text>
              </View>
              <View className="flex-row">
                <View className="w-8 h-8 rounded-full bg-[#eb001b] opacity-80" />
                <View className="w-8 h-8 rounded-full -ml-2.5 bg-[#f79e1b] opacity-80" />
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a101f]">
      <View className="flex-row justify-between items-center px-6 pt-2.5 mb-5">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=me" }}
          className="w-11 h-11 rounded-[22px] border-2 border-[#1e2638]"
        />
        <View className="flex-row">
          <TouchableOpacity className="ml-5">
            <Feather name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-5">
            <Ionicons name="grid-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="flex-row justify-between items-center px-6 mb-[30px]">
          <Text className="text-4xl font-semibold text-white">My cards</Text>
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-[#1e2638] justify-center items-center"
            onPress={() => navigation.navigate("AddCard")}
          >
            <Feather name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View className="px-6 mb-10">
          {cards.map((card, index) => renderCard(card, index))}
        </View>

        <View className="mt-5 px-6">
          <Text className="text-2xl font-semibold text-white mb-5">Shared accounts</Text>
          <View className="flex-row items-center">
            <TouchableOpacity className="w-20 h-20 rounded-3xl bg-[#1e2638] justify-center items-center mr-3">
              <Ionicons name="person-add-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
            {SHARED_USERS.map((user) => (
              <View
                key={user.id}
                className="w-[120px] h-20 rounded-3xl bg-[#1e2638] flex-row items-center px-3 mr-3"
              >
                <Image source={{ uri: user.image }} className="w-10 h-10 rounded-full mr-2.5" />
                <Text className="text-white text-[13px] font-semibold flex-1" numberOfLines={2}>
                  {user.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

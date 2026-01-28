import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCards } from "../hooks/useCardContext";
import { useNavigation } from "@react-navigation/native";

// Card colors for different positions
const CARD_COLORS = [
  { color: "#76e076", textColor: "#1a1a1a" },
  { color: "#f5d94d", textColor: "#1a1a1a" },
  { color: "#76a5f5", textColor: "#ffffff" },
  { color: "#e05244", textColor: "#ffffff" },
];

const SHARED_USERS = [
  {
    id: "1",
    name: "Kristin Watson",
    image: "https://i.pravatar.cc/150?u=kristin",
  },
  { id: "2", name: "Julie Lorens", image: "https://i.pravatar.cc/150?u=julie" },
];

export default function HomeScreen() {
  const { cards } = useCards();
  const navigation = useNavigation<any>();

  // Map cards to UI format with colors
  const displayCards = React.useMemo(() => {
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return [];
    }
    
    const validCards = cards.filter((card): card is NonNullable<typeof card> => 
      card != null && card.id != null
    );
    
    return validCards.map((card, index) => {
      const colorIndex = index % CARD_COLORS.length;
      const colorScheme = CARD_COLORS[colorIndex];
      const isMain = index === validCards.length - 1; // Last card is the main one
      
      return {
        id: card.id,
        bank: card.bankName || "Unknown Bank",
        number: `.... ${card.lastFour || "----"}`,
        color: colorScheme.color,
        textColor: colorScheme.textColor,
        balance: "$3,687", // Default balance
        expiry: "12/24", // Default expiry
        holder: card.cardHolder || "Card Holder",
        isMain,
        originalCard: card, // Store original card for navigation
      };
    });
  }, [cards]);

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
          <TouchableOpacity 
            className="ml-5"
            onPress={() => navigation.navigate("CardList")}
          >
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

        <View className="px-6 h-[450px]">
          {displayCards.length > 0 ? (
            displayCards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                activeOpacity={0.9}
                onPress={() => {
                  if (card.originalCard) {
                    navigation.navigate("CardDetails", { card: card.originalCard });
                  }
                }}
                className={`rounded-[32px] p-6 ${card.isMain ? "h-[240px]" : "h-[200px]"}`}
                style={{
                  backgroundColor: card.color,
                  marginTop: index === 0 ? 0 : -140,
                  zIndex: index,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-semibold" style={{ color: card.textColor }}>
                    {card.bank}
                  </Text>
                  <Text
                    className="text-sm tracking-wider"
                    style={{ color: card.textColor, opacity: 0.7 }}
                  >
                    {card.number}
                  </Text>
                </View>

                {card.isMain && (
                  <View className="mt-[30px]">
                    <View className="flex-row justify-between items-center">
                      <Text
                        className="text-[42px] font-bold"
                        style={{ color: card.textColor }}
                      >
                        {card.balance}
                      </Text>
                      <Ionicons
                        name="wifi-outline"
                        size={24}
                        color={card.textColor}
                        style={{ transform: [{ rotate: "90deg" }], opacity: 0.8 }}
                      />
                    </View>
                    <View className="flex-row mt-[30px] items-center">
                      <View>
                        <Text
                          className="text-[10px] font-medium tracking-wide mb-1"
                          style={{ color: card.textColor, opacity: 0.6 }}
                        >
                          EXPIRATION
                        </Text>
                        <Text className="text-sm font-semibold" style={{ color: card.textColor }}>
                          {card.expiry}
                        </Text>
                      </View>
                      <View className="ml-[30px] flex-1">
                        <Text
                          className="text-[10px] font-medium tracking-wide mb-1"
                          style={{ color: card.textColor, opacity: 0.6 }}
                        >
                          CARD HOLDER
                        </Text>
                        <Text className="text-sm font-semibold" style={{ color: card.textColor }}>
                          {card.holder}
                        </Text>
                      </View>
                      <View className="flex-row">
                        <View
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: "#eb001b", opacity: 0.8 }}
                        />
                        <View
                          className="w-8 h-8 rounded-full -ml-2.5"
                          style={{ backgroundColor: "#f79e1b", opacity: 0.8 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center justify-center h-full">
              <Text className="text-white/60 text-lg mb-4">No cards yet</Text>
              <TouchableOpacity
                className="rounded-full bg-[#a855f7] px-6 py-3"
                onPress={() => navigation.navigate("AddCard")}
              >
                <Text className="text-white font-semibold">Add Your First Card</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="mt-10 px-6">
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

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCards } from "../hooks/useCardContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CardListScreen() {
  const { cards } = useCards();
  const navigation = useNavigation<any>();
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (cardId: string, e: any) => {
    e.stopPropagation();
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const renderCard = (card: any, index: number) => {
    const isLiked = likedCards[card.id] || false;
    
    return (
      <View key={card.id} className="px-5 mb-6">
        <TouchableOpacity
          className="h-72 overflow-hidden rounded-3xl border border-white/10 relative mb-3"
          activeOpacity={0.95}
          onPress={() => navigation.navigate("CardDetails", { card })}
        >
          <View className="absolute inset-0">
            <LinearGradient
              colors={[
                "rgba(42,47,66,0.95)",
                "rgba(30,38,56,0.95)",
                "rgba(168,85,247,0.35)",
                "rgba(236,72,153,0.25)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          </View>

          {/* Card Content */}
          <View className="z-10 flex-1 justify-between p-6">
            {/* Top Row */}
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-4xl font-bold text-[#a855f7]">
                  {card.bankName[0]}
                </Text>
                <Text className="text-lg font-semibold text-white">
                  {card.bankName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={(e) => toggleLike(card.id, e)}
                className="rounded-full bg-white/10 p-2"
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={18}
                  color={isLiked ? "#a855f7" : "#fff"}
                />
              </TouchableOpacity>
            </View>

            {/* Middle - Chip */}
            <View className="flex-row items-end gap-3">
              <View className="w-14 h-11 rounded-lg border border-white/30 bg-white/20" />
              <View className="flex-1" />
              <View className="items-end">
                <Text className="text-sm font-semibold text-white/90">
                  xx{card.lastFour}
                </Text>
                <Text className="text-xs text-white/60">
                  {card.cardType || "Ace"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Action Grid for each card */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 items-center rounded-2xl border border-white/10 bg-[#1e2638]/50 p-4"
            activeOpacity={0.85}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate("Offers", { card });
            }}
          >
            <View className="mb-2">
              <Feather name="percent" size={24} color="#a855f7" />
            </View>
            <Text className="text-xs font-semibold text-white leading-tight">270 Live</Text>
            <Text className="text-xs font-semibold text-white leading-tight">Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-2xl border border-white/10 bg-[#1e2638]/50 p-4"
            activeOpacity={0.85}
            onPress={(e) => {
              e.stopPropagation();
              // Handle Earn Rewards action for this card
            }}
          >
            <View className="mb-2">
              <Feather name="gift" size={24} color="#a855f7" />
            </View>
            <Text className="text-xs font-semibold text-white leading-tight">Earn</Text>
            <Text className="text-xs font-semibold text-white leading-tight">Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="min-w-[76px] items-center justify-center rounded-2xl border border-white/10 bg-[#1e2638]/50 p-4"
            activeOpacity={0.85}
            onPress={(e) => {
              e.stopPropagation();
              // Handle Settings action for this card
            }}
          >
            <Feather name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a101f]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* My Cards Section Header */}
        <View className="px-5 pt-6 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl font-bold text-white">My cards</Text>
              <View className="rounded-full bg-[#a855f7] px-3 py-1">
                <Text className="text-xs font-bold text-white">{cards?.length || 0}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                className="rounded-full bg-[#1e2638] p-2.5"
                activeOpacity={0.8}
              >
                <Feather name="filter" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full bg-[#1e2638] p-2.5"
                activeOpacity={0.8}
              >
                <Feather name="search" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full bg-[#a855f7] p-2.5"
                activeOpacity={0.8}
                onPress={() => navigation.navigate("AddCard")}
              >
                <Feather name="plus" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Render all cards with same gradient design */}
        {cards && cards.length > 0 ? (
          cards.map((card, index) => renderCard(card, index))
        ) : (
          <View className="px-5 mb-6">
            <TouchableOpacity
              className="h-72 overflow-hidden rounded-3xl border border-white/10 relative items-center justify-center"
              activeOpacity={0.95}
              onPress={() => navigation.navigate("AddCard")}
            >
              <View className="absolute inset-0">
                <LinearGradient
                  colors={[
                    "rgba(42,47,66,0.95)",
                    "rgba(30,38,56,0.95)",
                    "rgba(168,85,247,0.35)",
                    "rgba(236,72,153,0.25)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1 }}
                />
              </View>
              <View className="z-10 items-center">
                <Text className="text-2xl font-bold text-white mb-2">Add Your First Card</Text>
                <Text className="text-white/60">Tap to get started</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useOffers } from "../hooks/useOffers";
import { Offer } from "../constants/mockData";
import { LinearGradient } from "expo-linear-gradient";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  cashback: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", icon: "dollar-sign" },
  discount: { bg: "rgba(168,85,247,0.15)", text: "#a855f7", icon: "tag" },
  rewards: { bg: "rgba(236,72,153,0.15)", text: "#ec4899", icon: "gift" },
  other: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", icon: "star" },
};

export default function OffersScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { card } = route.params || {};
  const { fetchOffers, offers, isLoading, error, isError, reset } = useOffers();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (card) {
      fetchOffers({ bankName: card.bankName, cardType: card.cardType });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    reset();
    if (card) {
      fetchOffers({ bankName: card.bankName, cardType: card.cardType });
    }
    setTimeout(() => setRefreshing(false), 1000);
  }, [card, fetchOffers, reset]);

  const groupOffersByCategory = (offersList: Offer[]) => {
    const grouped: Record<string, Offer[]> = {
      cashback: [],
      discount: [],
      rewards: [],
      other: [],
    };

    offersList.forEach((offer) => {
      const category = offer.category || "other";
      if (grouped[category]) {
        grouped[category].push(offer);
      } else {
        grouped.other.push(offer);
      }
    });

    return grouped;
  };

  const renderOfferCard = (offer: Offer) => {
    const categoryInfo = CATEGORY_COLORS[offer.category] || CATEGORY_COLORS.other;

    return (
      <View
        key={offer.id}
        className="mb-4 rounded-2xl border border-white/10 bg-[#1e2638]/50 overflow-hidden"
      >
        <View className="p-4">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <View
                  className="px-2 py-1 rounded-lg"
                  style={{ backgroundColor: categoryInfo.bg }}
                >
                  <Feather name={categoryInfo.icon as any} size={12} color={categoryInfo.text} />
                </View>
                <Text
                  className="text-xs font-semibold uppercase"
                  style={{ color: categoryInfo.text }}
                >
                  {offer.category}
                </Text>
              </View>
              <Text className="text-lg font-bold text-white mb-1">{offer.title}</Text>
              {offer.merchant && (
                <Text className="text-sm text-white/70 mb-2">at {offer.merchant}</Text>
              )}
            </View>
          </View>

          <Text className="text-sm text-white/80 mb-3 leading-5">{offer.description}</Text>

          <View className="flex-row flex-wrap gap-2 mb-3">
            {offer.discount && (
              <View className="px-3 py-1.5 rounded-lg bg-[#a855f7]/20">
                <Text className="text-sm font-semibold text-[#a855f7]">{offer.discount}</Text>
              </View>
            )}
            {offer.validity && (
              <View className="px-3 py-1.5 rounded-lg bg-white/10">
                <Text className="text-xs text-white/70">{offer.validity}</Text>
              </View>
            )}
          </View>

          {offer.terms && (
            <View className="pt-2 border-t border-white/10">
              <Text className="text-xs text-white/50">{offer.terms}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading && !offers) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color="#a855f7" />
          <Text className="text-white/70 mt-4">Fetching offers...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View className="flex-1 items-center justify-center py-20 px-5">
          <Feather name="alert-circle" size={48} color="#ef4444" />
          <Text className="text-xl font-bold text-white mt-4 mb-2">Error Loading Offers</Text>
          <Text className="text-white/70 text-center mb-6">
            {error?.message || "Failed to fetch offers. Please try again."}
          </Text>
          <TouchableOpacity
            className="px-6 py-3 rounded-xl bg-[#a855f7]"
            onPress={() => {
              reset();
              if (card) {
                fetchOffers({ bankName: card.bankName, cardType: card.cardType });
              }
            }}
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!offers || offers.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-20 px-5">
          <Feather name="gift" size={48} color="#a855f7" />
          <Text className="text-xl font-bold text-white mt-4 mb-2">No Offers Available</Text>
          <Text className="text-white/70 text-center">
            We couldn't find any offers for this card at the moment.
          </Text>
        </View>
      );
    }

    const groupedOffers = groupOffersByCategory(offers);

    return (
      <View className="px-5 pt-4">
        {Object.entries(groupedOffers).map(([category, categoryOffers]) => {
          if (categoryOffers.length === 0) return null;

          const categoryInfo = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;

          return (
            <View key={category} className="mb-6">
              <View className="flex-row items-center gap-2 mb-4">
                <View
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: categoryInfo.bg }}
                >
                  <Feather name={categoryInfo.icon as any} size={16} color={categoryInfo.text} />
                </View>
                <Text
                  className="text-lg font-bold uppercase"
                  style={{ color: categoryInfo.text }}
                >
                  {category} Offers
                </Text>
                <View className="flex-1 h-px bg-white/10" />
                <Text className="text-sm text-white/50">{categoryOffers.length}</Text>
              </View>
              {categoryOffers.map(renderOfferCard)}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a101f]">
      {/* Header */}
      <View className="px-5 pt-4 pb-3 flex-row items-center justify-between border-b border-white/10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full bg-white/10 p-2"
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-white">Live Offers</Text>
          {card && (
            <Text className="text-xs text-white/60">
              {card.bankName} {card.cardType}
            </Text>
          )}
        </View>
        <View className="w-10" />
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#a855f7"
            colors={["#a855f7"]}
          />
        }
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BANK_DATA } from "../constants/mockData";
import { useCards } from "../hooks/useCardContext";

export default function AddCardScreen() {
  const navigation = useNavigation();
  const { addCard } = useCards();

  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"Credit" | "Debit" | null>(null);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const selectedBank = BANK_DATA.banks.find((b) => b.bankId === selectedBankId);
  const filteredCards = selectedBank
    ? selectedBank.cards.filter((c) => c.cardType === selectedType)
    : [];

  const handleSave = () => {
    if (selectedBank && selectedType && selectedCard) {
      addCard({
        bankName: selectedBank.bankName,
        cardType: selectedType,
        cardImage: selectedCard.image,
        lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
        cardHolder: "John Doe",
      });
      navigation.goBack();
    }
  };

  const isFormValid = selectedBank && selectedType && selectedCard;

  return (
    <SafeAreaView className="flex-1 bg-[#0a101f]">
      <View className="flex-row items-center justify-between p-5 border-b border-[#1e2638]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-white">Add New Card</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.3 }}>
          <Text className="text-[#007AFF] font-bold text-base">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="p-5">
        <Text className="text-base font-semibold mb-4 mt-2.5 text-white/80">Select Bank</Text>
        <View className="flex-row flex-wrap justify-between mb-2.5">
          {BANK_DATA.banks.map((bank) => (
            <TouchableOpacity
              key={bank.bankId}
              className={`w-[31%] p-3 rounded-2xl bg-[#1e2638] items-center mb-3 border-2 ${
                selectedBankId === bank.bankId ? "border-[#007AFF] bg-[#252f4a]" : "border-transparent"
              }`}
              onPress={() => {
                setSelectedBankId(bank.bankId);
                setSelectedType(null);
                setSelectedCard(null);
              }}
            >
              <View className="w-9 h-9 rounded-full bg-[#2c3e50] justify-center items-center mb-2">
                <Text className="text-white text-lg font-semibold">{bank.bankName.charAt(0)}</Text>
              </View>
              <Text className="font-semibold text-white text-[11px] text-center" numberOfLines={1}>
                {bank.bankName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedBankId && (
          <View className="mt-2.5">
            <Text className="text-base font-semibold mb-4 mt-2.5 text-white/80">Card Type</Text>
            <View className="flex-row mb-6">
              {["Credit", "Debit"].map((type: any) => (
                <TouchableOpacity
                  key={type}
                  className={`flex-1 py-3 rounded-2xl bg-[#1e2638] items-center mr-2.5 border ${
                    selectedType === type ? "bg-[#007AFF] border-[#007AFF]" : "border-[#1e2638]"
                  }`}
                  onPress={() => {
                    setSelectedType(type);
                    setSelectedCard(null);
                  }}
                >
                  <Text
                    className={`font-semibold text-white ${selectedType === type ? "opacity-100" : "opacity-60"}`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedType && (
          <View className="mt-2.5">
            <Text className="text-base font-semibold mb-4 mt-2.5 text-white/80">Select Card Design</Text>
            {filteredCards.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-[30px]"
              >
                {filteredCards.map((card) => (
                  <TouchableOpacity
                    key={card.id}
                    className={`w-[220px] mr-4 rounded-[20px] p-2.5 bg-[#1e2638] border-2 ${
                      selectedCard?.id === card.id ? "border-[#007AFF] bg-[#252f4a]" : "border-transparent"
                    }`}
                    onPress={() => setSelectedCard(card)}
                  >
                    <Image
                      source={{ uri: card.image }}
                      className="w-full h-[130px] rounded-2xl mb-2.5"
                    />
                    <Text className="text-sm font-bold text-center text-white">{card.cardName}</Text>
                    <Text className="text-[11px] text-center text-white/60 mt-0.5">{card.tier}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-white/50 text-center mt-5 italic">
                No {selectedType} cards available for this bank yet.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

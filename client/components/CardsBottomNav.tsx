import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export type CardsNavTab = "home" | "cards" | "loyalty" | "consult";

type Props = {
  activeTab?: CardsNavTab;
  currentRoute?: string;
};

export default function CardsBottomNav({ activeTab: propActiveTab, currentRoute }: Props) {
  const navigation = useNavigation<any>();

  // Determine active tab from route name or prop
  const getActiveTab = (): CardsNavTab => {
    if (propActiveTab) return propActiveTab;
    
    if (!currentRoute) return "home";
    
    switch (currentRoute) {
      case "Home":
        return "home";
      case "CardList":
      case "CardDetails":
      case "AddCard":
        return "cards";
      case "Loyalty":
        return "loyalty";
      case "Consult":
        return "consult";
      default:
        return "home";
    }
  };

  const activeTab = getActiveTab();

  const tabs: { id: CardsNavTab; icon: "home" | "grid" | "star" | "user"; label: string; routeName: string }[] = [
    { id: "home", icon: "home", label: "Home", routeName: "Home" },
    { id: "cards", icon: "grid", label: "Cards", routeName: "CardList" },
    { id: "loyalty", icon: "star", label: "Loyalty", routeName: "Loyalty" },
    { id: "consult", icon: "user", label: "Consult", routeName: "Consult" },
  ];

  const handlePress = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View className="flex-row items-center justify-around border-t border-white/10 bg-[#1e2638]/50 px-5 py-4">
      {tabs.map(({ id, icon, label, routeName }) => {
        const isActive = activeTab === id;
        return (
          <TouchableOpacity
            key={id}
            className={`flex-col items-center gap-1.5 rounded-xl px-4 py-2 ${isActive ? "bg-[#a855f7]/20" : ""}`}
            activeOpacity={0.8}
            onPress={() => handlePress(routeName)}
          >
            <Feather
              name={icon}
              size={22}
              color={isActive ? "#a855f7" : "#fff"}
            />
            <Text
              className={`text-xs ${isActive ? "font-bold text-[#a855f7]" : "font-medium text-white"}`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

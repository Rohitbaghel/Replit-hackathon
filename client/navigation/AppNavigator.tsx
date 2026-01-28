import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCards } from "../hooks/useCardContext";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Screens
import CardListScreen from "../screens/CardListScreen";
import CardDetailsScreen from "../screens/CardDetailsScreen";
import AddCardScreen from "../screens/AddCardScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoyaltyScreen from "../screens/LoyaltyScreen";
import ConsultScreen from "../screens/ConsultScreen";
import OffersScreen from "../screens/OffersScreen";
import CardsBottomNav from "../components/CardsBottomNav";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { onboardingCompleted, isLoading } = useCards();
  const navigation = useNavigation<any>();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>();

  useEffect(() => {
    if (!onboardingCompleted) return;

    // Get initial route
    const state = navigation.getState();
    if (state?.routes && state.index !== undefined) {
      setCurrentRoute(state.routes[state.index]?.name);
    }

    // Listen to state changes
    const unsubscribe = navigation.addListener("state", () => {
      const state = navigation.getState();
      if (state?.routes && state.index !== undefined) {
        setCurrentRoute(state.routes[state.index]?.name);
      }
    });

    return unsubscribe;
  }, [navigation, onboardingCompleted]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0a101f]">
        <ActivityIndicator size="large" color="#a855f7" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0a101f]" style={{ backgroundColor: "#0a101f" }}>
      <View className="flex-1">
        <Stack.Navigator 
          initialRouteName={onboardingCompleted ? "Home" : "Onboarding"}
          screenOptions={{ headerShown: false }}
        >
          {!onboardingCompleted ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="CardList" component={CardListScreen} />
              <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
              <Stack.Screen name="AddCard" component={AddCardScreen} />
              <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
              <Stack.Screen name="Consult" component={ConsultScreen} />
              <Stack.Screen name="Offers" component={OffersScreen} />
            </>
          )}
        </Stack.Navigator>
      </View>
      {onboardingCompleted && <CardsBottomNav currentRoute={currentRoute} />}
    </View>
  );
}

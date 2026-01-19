import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCards } from "../hooks/useCardContext";
import { View, ActivityIndicator } from "react-native";

// Screens
import CardListScreen from "../screens/CardListScreen";
import CardDetailsScreen from "../screens/CardDetailsScreen";
import AddCardScreen from "../screens/AddCardScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { onboardingCompleted, isLoading } = useCards();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingCompleted ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="CardList" component={CardListScreen} />
          <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

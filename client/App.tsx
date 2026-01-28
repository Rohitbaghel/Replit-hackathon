import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import AppNavigator from "@/navigation/AppNavigator";
import { CardProvider } from "@/hooks/useCardContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CardProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView className="flex-1" style={{ flex: 1, backgroundColor: "#0a101f" }}>
              <KeyboardProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
                <StatusBar style="light" />
              </KeyboardProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </CardProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

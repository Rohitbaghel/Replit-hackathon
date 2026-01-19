import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardProvider } from "./hooks/useCardContext";
import AppNavigator from "./navigation/AppNavigator";

function App() {
  return (
    <CardProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CardProvider>
  );
}

registerRootComponent(App);

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IdeaScreen from "@/screens/IdeaScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type IdeaStackParamList = {
  Idea: undefined;
};

const Stack = createNativeStackNavigator<IdeaStackParamList>();

export default function IdeaStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Idea"
        component={IdeaScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

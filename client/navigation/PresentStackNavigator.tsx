import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PresentScreen from "@/screens/PresentScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type PresentStackParamList = {
  Present: undefined;
};

const Stack = createNativeStackNavigator<PresentStackParamList>();

export default function PresentStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Present"
        component={PresentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

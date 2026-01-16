import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BuildScreen from "@/screens/BuildScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type BuildStackParamList = {
  Build: undefined;
};

const Stack = createNativeStackNavigator<BuildStackParamList>();

export default function BuildStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Build"
        component={BuildScreen}
        options={{
          headerTitle: () => <HeaderTitle title="HackSprint" />,
        }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";

import IdeaStackNavigator from "@/navigation/IdeaStackNavigator";
import BuildStackNavigator from "@/navigation/BuildStackNavigator";
import PresentStackNavigator from "@/navigation/PresentStackNavigator";
import { useTheme } from "@/hooks/useTheme";

export type MainTabParamList = {
  IdeaTab: undefined;
  BuildTab: undefined;
  PresentTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="BuildTab"
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontWeight: "500",
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="IdeaTab"
        component={IdeaStackNavigator}
        options={{
          title: "Idea",
          tabBarIcon: ({ color, size }) => (
            <Feather name="zap" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BuildTab"
        component={BuildStackNavigator}
        options={{
          title: "Build",
          tabBarIcon: ({ color, size }) => (
            <Feather name="code" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PresentTab"
        component={PresentStackNavigator}
        options={{
          title: "Present",
          tabBarIcon: ({ color, size }) => (
            <Feather name="mic" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

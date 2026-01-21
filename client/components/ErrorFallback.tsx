import React, { useState } from "react";
import { reloadAppAsync } from "expo";
import {
  View,
  Pressable,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Fonts } from "@/constants/theme";

export type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
};

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const { theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRestart = async () => {
    try {
      await reloadAppAsync();
    } catch (restartError) {
      console.error("Failed to restart app:", restartError);
      resetError();
    }
  };

  const formatErrorDetails = (): string => {
    let details = `Error: ${error.message}\n\n`;
    if (error.stack) {
      details += `Stack Trace:\n${error.stack}`;
    }
    return details;
  };

  return (
    <ThemedView className="flex-1 w-full h-full justify-center items-center p-6">
      {__DEV__ ? (
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="absolute z-10 flex-row items-center justify-center rounded-[18px]"
          style={({ pressed }) => [
            {
              top: Spacing["2xl"] + Spacing.lg,
              right: Spacing.lg,
              width: 44,
              height: 44,
              backgroundColor: theme.backgroundDefault,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="alert-circle" size={20} color={theme.text} />
        </Pressable>
      ) : null}

      <View className="items-center justify-center w-full max-w-[600px] gap-4">
        <ThemedText type="h1" className="text-center" style={{ lineHeight: 40 }}>
          Something went wrong
        </ThemedText>

        <ThemedText type="body" className="text-center opacity-70" style={{ lineHeight: 24 }}>
          Please reload the app to continue.
        </ThemedText>

        <Pressable
          onPress={handleRestart}
          className="py-4 px-6 rounded-[18px] min-w-[200px]"
          style={({ pressed }) => [
            {
              backgroundColor: theme.link,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            },
          ]}
        >
          <ThemedText type="body" style={{ color: theme.buttonText, fontWeight: "700", textAlign: "center", fontSize: 16 }}>
            Try Again
          </ThemedText>
        </Pressable>
      </View>

      {__DEV__ ? (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <ThemedView className="w-full h-[90%] rounded-t-3xl">
              <View className="flex-row justify-between items-center px-4 pt-4 pb-3 border-b border-gray-500/20">
                <ThemedText type="h2" className="font-semibold">
                  Error Details
                </ThemedText>
                <Pressable
                  onPress={() => setIsModalVisible(false)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Feather name="x" size={24} color={theme.text} />
                </Pressable>
              </View>

              <ScrollView className="flex-1" contentContainerStyle={{ padding: Spacing.lg }}>
                <View
                  className="w-full rounded-[18px] overflow-hidden p-4"
                  style={{ backgroundColor: theme.backgroundDefault }}
                >
                  <Text
                    className="text-xs leading-[18px] w-full"
                    style={{
                      color: theme.text,
                      fontFamily: Fonts?.mono || "monospace",
                    }}
                    selectable
                  >
                    {formatErrorDetails()}
                  </Text>
                </View>
              </ScrollView>
            </ThemedView>
          </View>
        </Modal>
      ) : null}
    </ThemedView>
  );
}

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { storage, SettingsData } from "@/lib/storage";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState<SettingsData>({
    teamName: "",
    hackathonEndTime: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    storage.getSettings().then((data) => {
      setSettings(data);
      if (data.hackathonEndTime) {
        setTempDate(new Date(data.hackathonEndTime));
      }
      setLoaded(true);
    });
  }, []);

  const handleSave = async () => {
    await storage.saveSettings(settings);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        setTempDate(selectedDate);
        setShowTimePicker(true);
      }
    } else if (selectedDate) {
      setTempDate(selectedDate);
      setSettings({ ...settings, hackathonEndTime: selectedDate.getTime() });
    }
  };

  const handleTimeChange = (_: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      const newDate = new Date(tempDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setTempDate(newDate);
      setSettings({ ...settings, hackathonEndTime: newDate.getTime() });
    }
  };

  const handleClearDeadline = () => {
    setSettings({ ...settings, hackathonEndTime: null });
    setTempDate(new Date());
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Project",
      "This will clear all your ideas, tasks, and pitch notes. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await storage.clearAll();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const formatDeadline = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!loaded) {
    return <View className="flex-1" style={{ backgroundColor: theme.backgroundRoot }} />;
  }

  return (
    <KeyboardAwareScrollViewCompat
      className="flex-1"
      style={{ backgroundColor: theme.backgroundRoot }}
      contentContainerStyle={{
        paddingHorizontal: Spacing.lg,
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["3xl"],
      }}
    >
      <View className="mb-6">
        <ThemedText
          type="label"
          style={{ color: theme.textSecondary, marginBottom: Spacing.sm }}
        >
          Team Name
        </ThemedText>
        <TextInput
          value={settings.teamName}
          onChangeText={(text) => setSettings({ ...settings, teamName: text })}
          placeholder="Your team name"
          placeholderTextColor={theme.textSecondary}
          className="border rounded-[18px] px-4 text-base"
          style={{
            height: Spacing.inputHeight,
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
            color: theme.text,
          }}
        />
      </View>

      <View className="mb-6">
        <ThemedText
          type="label"
          style={{ color: theme.textSecondary, marginBottom: Spacing.sm }}
        >
          Hackathon Deadline
        </ThemedText>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="border rounded-[18px] px-4 flex-row items-center"
          style={{
            height: Spacing.inputHeight,
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
          }}
        >
          <Feather name="clock" size={20} color={theme.textSecondary} />
          <ThemedText className="flex-1 ml-3 text-base">
            {settings.hackathonEndTime
              ? formatDeadline(settings.hackathonEndTime)
              : "Set deadline"}
          </ThemedText>
          {settings.hackathonEndTime ? (
            <Pressable onPress={handleClearDeadline} hitSlop={8}>
              <Feather name="x" size={20} color={theme.textSecondary} />
            </Pressable>
          ) : null}
        </Pressable>
      </View>

      {((showDatePicker || Platform.OS === "ios") &&
        settings.hackathonEndTime !== null) ||
      showDatePicker ? (
        <View className="mb-5">
          <DateTimePicker
            value={tempDate}
            mode={Platform.OS === "ios" ? "datetime" : "date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            minimumDate={new Date()}
            textColor={theme.text}
            themeVariant="dark"
          />
        </View>
      ) : null}

      {showTimePicker && Platform.OS === "android" ? (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      ) : null}

      <View className="mt-4 mb-10">
        <Button onPress={handleSave}>Save Settings</Button>
      </View>

      <View className="pt-5 border-t" style={{ borderTopColor: "rgba(255, 51, 102, 0.2)" }}>
        <ThemedText
          type="label"
          style={{ color: theme.accent, marginBottom: Spacing.md }}
        >
          Danger Zone
        </ThemedText>
        <Pressable
          onPress={handleReset}
          className="flex-row items-center justify-center border rounded-[18px]"
          style={{
            height: Spacing.inputHeight,
            borderColor: theme.accent,
          }}
        >
          <Feather name="trash-2" size={18} color={theme.accent} />
          <ThemedText style={{ marginLeft: Spacing.sm, fontSize: 16, fontWeight: "600", color: theme.accent }}>
            Reset Project
          </ThemedText>
        </Pressable>
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

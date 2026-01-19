import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
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
import { Spacing, BorderRadius } from "@/constants/theme";
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
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      />
    );
  }

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["3xl"],
        },
      ]}
    >
      <View style={styles.section}>
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
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />
      </View>

      <View style={styles.section}>
        <ThemedText
          type="label"
          style={{ color: theme.textSecondary, marginBottom: Spacing.sm }}
        >
          Hackathon Deadline
        </ThemedText>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[
            styles.deadlineButton,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
            },
          ]}
        >
          <Feather name="clock" size={20} color={theme.textSecondary} />
          <ThemedText style={styles.deadlineText}>
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
        <View style={styles.pickerContainer}>
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

      <View style={styles.buttonContainer}>
        <Button onPress={handleSave}>Save Settings</Button>
      </View>

      <View style={styles.dangerZone}>
        <ThemedText
          type="label"
          style={{ color: theme.accent, marginBottom: Spacing.md }}
        >
          Danger Zone
        </ThemedText>
        <Pressable
          onPress={handleReset}
          style={[styles.resetButton, { borderColor: theme.accent }]}
        >
          <Feather name="trash-2" size={18} color={theme.accent} />
          <ThemedText style={[styles.resetText, { color: theme.accent }]}>
            Reset Project
          </ThemedText>
        </Pressable>
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing["2xl"],
  },
  input: {
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
  },
  deadlineButton: {
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  deadlineText: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing["4xl"],
  },
  dangerZone: {
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 51, 102, 0.2)",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
  },
  resetText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: "600",
  },
});

import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { TextArea } from "@/components/TextArea";
import { ChecklistItem } from "@/components/ChecklistItem";
import { AutoSaveIndicator } from "@/components/AutoSaveIndicator";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { storage, PitchData } from "@/lib/storage";

export default function PresentScreen() {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const [pitch, setPitch] = useState<PitchData>({
    elevatorPitch: "",
    demoChecklist: [],
    speakingNotes: "",
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    storage.getPitch().then((data) => {
      setPitch(data);
      setLoaded(true);
    });
  }, []);

  const savePitch = useCallback((newPitch: PitchData) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      await storage.savePitch(newPitch);
      setSaving(false);
    }, 500);
  }, []);

  const updateElevatorPitch = (text: string) => {
    const newPitch = { ...pitch, elevatorPitch: text };
    setPitch(newPitch);
    savePitch(newPitch);
  };

  const updateSpeakingNotes = (text: string) => {
    const newPitch = { ...pitch, speakingNotes: text };
    setPitch(newPitch);
    savePitch(newPitch);
  };

  const toggleChecklistItem = (id: string) => {
    const newChecklist = pitch.demoChecklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    const newPitch = { ...pitch, demoChecklist: newChecklist };
    setPitch(newPitch);
    savePitch(newPitch);
  };

  const hasContent =
    pitch.elevatorPitch ||
    pitch.speakingNotes ||
    pitch.demoChecklist.some((item) => item.checked);

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
          paddingBottom: tabBarHeight + Spacing["3xl"],
        },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="h1">The Pitch</ThemedText>
        <AutoSaveIndicator saving={saving} />
      </View>

      {!hasContent ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/empty-pitch.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <ThemedText
            type="body"
            style={[styles.emptyText, { color: theme.textSecondary }]}
          >
            Prepare to wow the judges
          </ThemedText>
        </View>
      ) : null}

      <TextArea
        label="Elevator Pitch (60 seconds)"
        value={pitch.elevatorPitch}
        onChangeText={updateElevatorPitch}
        placeholder="In 60 seconds, explain what you built and why it matters..."
        maxLength={500}
        minHeight={120}
      />

      <View style={styles.section}>
        <ThemedText
          type="label"
          style={{ color: theme.textSecondary, marginBottom: Spacing.md }}
        >
          Demo Checklist
        </ThemedText>
        {pitch.demoChecklist.map((item) => (
          <ChecklistItem
            key={item.id}
            label={item.label}
            checked={item.checked}
            onToggle={() => toggleChecklistItem(item.id)}
          />
        ))}
      </View>

      <TextArea
        label="Speaking Notes"
        value={pitch.speakingNotes}
        onChangeText={updateSpeakingNotes}
        placeholder="Key points to remember, backup talking points..."
        minHeight={150}
      />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  emptyContainer: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  emptyImage: {
    width: 140,
    height: 140,
    marginBottom: Spacing.lg,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
});

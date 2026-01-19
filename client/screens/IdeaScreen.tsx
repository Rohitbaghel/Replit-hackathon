import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { TextArea } from "@/components/TextArea";
import { AutoSaveIndicator } from "@/components/AutoSaveIndicator";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { storage, IdeaData } from "@/lib/storage";

export default function IdeaScreen() {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const [idea, setIdea] = useState<IdeaData>({
    problem: "",
    solution: "",
    uniqueAngle: "",
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    storage.getIdea().then((data) => {
      setIdea(data);
      setLoaded(true);
    });
  }, []);

  const saveIdea = useCallback((newIdea: IdeaData) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      await storage.saveIdea(newIdea);
      setSaving(false);
    }, 500);
  }, []);

  const updateField = (field: keyof IdeaData, value: string) => {
    const newIdea = { ...idea, [field]: value };
    setIdea(newIdea);
    saveIdea(newIdea);
  };

  const hasContent = idea.problem || idea.solution || idea.uniqueAngle;

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
        <ThemedText type="h1">The Idea</ThemedText>
        <AutoSaveIndicator saving={saving} />
      </View>

      {!hasContent ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/idea-start.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <ThemedText
            type="body"
            style={[styles.emptyText, { color: theme.textSecondary }]}
          >
            Start capturing your brilliant idea below
          </ThemedText>
        </View>
      ) : null}

      <TextArea
        label="Problem"
        value={idea.problem}
        onChangeText={(text) => updateField("problem", text)}
        placeholder="What problem are you solving? Who experiences this pain?"
        maxLength={200}
        minHeight={100}
      />

      <TextArea
        label="Solution"
        value={idea.solution}
        onChangeText={(text) => updateField("solution", text)}
        placeholder="How does your solution work? What makes it effective?"
        maxLength={300}
        minHeight={120}
      />

      <TextArea
        label="Unique Angle"
        value={idea.uniqueAngle}
        onChangeText={(text) => updateField("uniqueAngle", text)}
        placeholder="What's different about your approach? Why now?"
        maxLength={150}
        minHeight={80}
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
});

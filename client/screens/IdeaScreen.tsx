import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Image } from "react-native";
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
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
    return <View className="flex-1" style={{ backgroundColor: theme.backgroundRoot }} />;
  }

  return (
    <KeyboardAwareScrollViewCompat
      className="flex-1"
      style={{ backgroundColor: theme.backgroundRoot }}
      contentContainerStyle={{
        paddingHorizontal: Spacing.lg,
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing["3xl"],
      }}
    >
      <View className="flex-row justify-between items-center mb-6">
        <ThemedText type="h1">The Idea</ThemedText>
        <AutoSaveIndicator saving={saving} />
      </View>

      {!hasContent ? (
        <View className="items-center mb-6">
          <Image
            source={require("../../assets/images/idea-start.png")}
            className="w-[140px] h-[140px] mb-4"
            resizeMode="contain"
          />
          <ThemedText
            type="body"
            className="text-center mb-4"
            style={{ color: theme.textSecondary }}
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

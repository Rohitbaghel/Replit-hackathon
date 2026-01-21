import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onAdd(title.trim());
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center"
      >
        <Pressable
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onPress={handleClose}
        />
        <View
          className="w-[90%] max-w-[400px] rounded-3xl p-6"
          style={{ backgroundColor: theme.backgroundDefault }}
        >
          <View className="flex-row justify-between items-center mb-5">
            <ThemedText type="h3">Add Task</ThemedText>
            <Pressable onPress={handleClose} hitSlop={8}>
              <Feather name="x" size={24} color={theme.text} />
            </Pressable>
          </View>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor={theme.textSecondary}
            className="border rounded-[18px] px-4 text-base mb-5"
            style={{
              height: Spacing.inputHeight,
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.text,
            }}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <Button onPress={handleAdd} disabled={!title.trim()}>
            Add Task
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

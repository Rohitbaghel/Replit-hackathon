import React, { useState } from "react";
import {
  View,
  StyleSheet,
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
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

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
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View
          style={[
            styles.content,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <View style={styles.header}>
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
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                borderColor: theme.border,
                color: theme.text,
                fontFamily: Typography.body.fontFamily,
              },
            ]}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    width: "90%",
    maxWidth: 400,
    borderRadius: BorderRadius.xl,
    padding: Spacing["2xl"],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  input: {
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
    marginBottom: Spacing.xl,
  },
});

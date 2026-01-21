import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { CountdownTimer } from "@/components/CountdownTimer";
import { TaskCard } from "@/components/TaskCard";
import { ProgressBar } from "@/components/ProgressBar";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { AddTaskModal } from "@/components/AddTaskModal";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { storage, Task, SettingsData } from "@/lib/storage";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BuildScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState<SettingsData>({
    teamName: "",
    hackathonEndTime: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadData = useCallback(async () => {
    const [tasksData, settingsData] = await Promise.all([
      storage.getTasks(),
      storage.getSettings(),
    ]);
    setTasks(tasksData);
    setSettings(settingsData);
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation, loadData]);

  const handleAddTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    await storage.saveTasks(newTasks);
  };

  const handleToggleTask = async (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
    await storage.saveTasks(newTasks);
  };

  const handleDeleteTask = async (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    await storage.saveTasks(newTasks);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const renderHeader = () => (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-5">
        <CountdownTimer endTime={settings.hackathonEndTime} />
        <Pressable
          onPress={() => navigation.navigate("Settings")}
          hitSlop={8}
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: theme.backgroundDefault }}
        >
          <Feather name="settings" size={20} color={theme.text} />
        </Pressable>
      </View>
      {tasks.length > 0 ? (
        <ProgressBar completed={completedCount} total={tasks.length} />
      ) : null}
    </View>
  );

  const renderEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-tasks.png")}
      title="Ready to Build"
      subtitle="Add your first task to start tracking progress"
    />
  );

  if (!loaded) {
    return <View className="flex-1" style={{ backgroundColor: theme.backgroundRoot }} />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.backgroundRoot }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => handleToggleTask(item.id)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          { paddingHorizontal: Spacing.lg, paddingTop: headerHeight + Spacing.lg, paddingBottom: tabBarHeight + 80 },
          tasks.length === 0 && { flexGrow: 1 },
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
      />
      <FloatingActionButton
        onPress={() => setModalVisible(true)}
        bottom={tabBarHeight + Spacing.lg}
      />
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTask}
      />
    </View>
  );
}

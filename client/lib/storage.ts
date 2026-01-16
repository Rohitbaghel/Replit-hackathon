import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  IDEA: "@hacksprint/idea",
  TASKS: "@hacksprint/tasks",
  PITCH: "@hacksprint/pitch",
  SETTINGS: "@hacksprint/settings",
};

export interface IdeaData {
  problem: string;
  solution: string;
  uniqueAngle: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface PitchData {
  elevatorPitch: string;
  demoChecklist: {
    id: string;
    label: string;
    checked: boolean;
  }[];
  speakingNotes: string;
}

export interface SettingsData {
  teamName: string;
  hackathonEndTime: number | null;
}

const DEFAULT_DEMO_CHECKLIST = [
  { id: "1", label: "Hook - Grab attention in first 10 seconds", checked: false },
  { id: "2", label: "Problem - Clearly state the pain point", checked: false },
  { id: "3", label: "Solution - Show how you solve it", checked: false },
  { id: "4", label: "Wow Moment - Demonstrate the magic", checked: false },
  { id: "5", label: "Call to Action - What do you want from judges", checked: false },
];

export const storage = {
  async getIdea(): Promise<IdeaData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.IDEA);
      return data
        ? JSON.parse(data)
        : { problem: "", solution: "", uniqueAngle: "" };
    } catch {
      return { problem: "", solution: "", uniqueAngle: "" };
    }
  },

  async saveIdea(idea: IdeaData): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.IDEA, JSON.stringify(idea));
  },

  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  async getPitch(): Promise<PitchData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PITCH);
      return data
        ? JSON.parse(data)
        : {
            elevatorPitch: "",
            demoChecklist: DEFAULT_DEMO_CHECKLIST,
            speakingNotes: "",
          };
    } catch {
      return {
        elevatorPitch: "",
        demoChecklist: DEFAULT_DEMO_CHECKLIST,
        speakingNotes: "",
      };
    }
  },

  async savePitch(pitch: PitchData): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.PITCH, JSON.stringify(pitch));
  },

  async getSettings(): Promise<SettingsData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : { teamName: "", hackathonEndTime: null };
    } catch {
      return { teamName: "", hackathonEndTime: null };
    }
  },

  async saveSettings(settings: SettingsData): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  },
};

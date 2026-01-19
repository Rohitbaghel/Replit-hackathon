import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, INITIAL_CARDS } from "../constants/mockData";

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, "id">) => void;
  onboardingCompleted: boolean;
  completeOnboarding: () => Promise<void>;
  isLoading: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const ONBOARDING_KEY = "@onboarding_completed";

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOnboardingState();
  }, []);

  const loadOnboardingState = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (value !== null) {
        setOnboardingCompleted(JSON.parse(value));
      }
    } catch (e) {
      console.error("Failed to load onboarding state", e);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(true));
      setOnboardingCompleted(true);
    } catch (e) {
      console.error("Failed to save onboarding state", e);
    }
  };

  const addCard = (newCard: Omit<Card, "id">) => {
    const cardWithId = {
      ...newCard,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCards((prev) => [...prev, cardWithId]);
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        addCard,
        onboardingCompleted,
        completeOnboarding,
        isLoading,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
}

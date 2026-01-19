import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, INITIAL_CARDS } from '../constants/mockData';

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id'>) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);

  const addCard = (newCard: Omit<Card, 'id'>) => {
    const cardWithId = {
      ...newCard,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCards((prev) => [...prev, cardWithId]);
  };

  return (
    <CardContext.Provider value={{ cards, addCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
}

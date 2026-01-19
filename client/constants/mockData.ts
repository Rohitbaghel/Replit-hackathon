export interface Card {
  id: string;
  bankName: string;
  cardType: 'Credit' | 'Debit';
  cardImage: string;
  lastFour: string;
  cardHolder: string;
}

export const BANKS = [
  { id: '1', name: 'HDFC', logo: 'https://placehold.co/100x100/004d8c/white.png?text=HDFC' },
  { id: '2', name: 'ICICI', logo: 'https://placehold.co/100x100/f27020/white.png?text=ICICI' },
  { id: '3', name: 'Axis', logo: 'https://placehold.co/100x100/971237/white.png?text=Axis' },
  { id: '4', name: 'SBI', logo: 'https://placehold.co/100x100/00a8e1/white.png?text=SBI' },
];

export const PREDEFINED_CARDS = [
  { 
    id: 'pc1', 
    bankId: '1', 
    name: 'HDFC Infinia', 
    image: 'https://placehold.co/600x400/1a1a1a/white.png?text=Infinia' 
  },
  { 
    id: 'pc2', 
    bankId: '1', 
    name: 'HDFC Regalia', 
    image: 'https://placehold.co/600x400/4a4a4a/white.png?text=Regalia' 
  },
  { 
    id: 'pc3', 
    bankId: '2', 
    name: 'ICICI Sapphiro', 
    image: 'https://placehold.co/600x400/003366/white.png?text=Sapphiro' 
  },
  { 
    id: 'pc4', 
    bankId: '3', 
    name: 'Axis Magnus', 
    image: 'https://placehold.co/600x400/800000/white.png?text=Magnus' 
  },
];

export const INITIAL_CARDS: Card[] = [
  {
    id: '1',
    bankName: 'HDFC',
    cardType: 'Credit',
    cardImage: 'https://placehold.co/600x400/1a1a1a/white.png?text=Infinia',
    lastFour: '4582',
    cardHolder: 'John Doe',
  }
];

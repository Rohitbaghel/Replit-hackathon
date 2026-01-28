export interface Card {
  id: string;
  bankName: string;
  cardType: "Credit" | "Debit";
  cardImage: string;
  lastFour: string;
  cardHolder: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  merchant?: string;
  category: "cashback" | "discount" | "rewards" | "other";
  discount?: string; // e.g., "10% off", "₹500 cashback"
  validity?: string; // e.g., "Valid till 31 Dec 2024"
  terms?: string;
  bankName: string;
  cardType: string;
}

export interface Bank {
  bankId: string;
  bankName: string;
  cards: {
    id: string;
    cardName: string;
    cardType: string;
    tier: string;
    image: string;
  }[];
}

export const BANK_DATA: { banks: Bank[] } = {
  banks: [
    {
      bankId: "hdfc",
      bankName: "HDFC Bank",
      cards: [
        {
          id: "hdfc_infinia",
          cardName: "Infinia",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/1a1a1a/ffffff.png?text=HDFC+Infinia",
        },
        {
          id: "hdfc_diners_black",
          cardName: "Diners Club Black",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/1a1a1a/ffffff.png?text=Diners+Black",
        },
        {
          id: "hdfc_regalia_gold",
          cardName: "Regalia Gold",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/b8860b/ffffff.png?text=Regalia+Gold",
        },
        {
          id: "hdfc_millennia",
          cardName: "Millennia",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/000080/ffffff.png?text=Millennia",
        },
        {
          id: "hdfc_moneyback_plus",
          cardName: "MoneyBack+",
          cardType: "Credit",
          tier: "Entry",
          image:
            "https://placehold.co/600x400/a9a9a9/ffffff.png?text=MoneyBack+",
        },
      ],
    },
    {
      bankId: "axis",
      bankName: "Axis Bank",
      cards: [
        {
          id: "axis_magnus",
          cardName: "Magnus",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/800000/ffffff.png?text=Axis+Magnus",
        },
        {
          id: "axis_atlas",
          cardName: "Atlas",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/2f4f4f/ffffff.png?text=Axis+Atlas",
        },
        {
          id: "axis_select",
          cardName: "Select",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/4682b4/ffffff.png?text=Axis+Select",
        },
      ],
    },
    {
      bankId: "sbi",
      bankName: "State Bank of India",
      cards: [
        {
          id: "sbi_elite",
          cardName: "Elite",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/00008b/ffffff.png?text=SBI+Elite",
        },
        {
          id: "sbi_prime",
          cardName: "Prime",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/4169e1/ffffff.png?text=SBI+Prime",
        },
        {
          id: "sbi_simplyclick",
          cardName: "SimplyCLICK",
          cardType: "Credit",
          tier: "Entry",
          image:
            "https://placehold.co/600x400/32cd32/ffffff.png?text=SimplyCLICK",
        },
      ],
    },
    {
      bankId: "bob",
      bankName: "Bank of Baroda",
      cards: [
        {
          id: "bob_premier",
          cardName: "Premier",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/ff8c00/ffffff.png?text=BOB+Premier",
        },
        {
          id: "bob_easy",
          cardName: "Easy",
          cardType: "Credit",
          tier: "Entry",
          image: "https://placehold.co/600x400/ffa500/ffffff.png?text=BOB+Easy",
        },
      ],
    },
    {
      bankId: "icici",
      bankName: "ICICI Bank",
      cards: [
        {
          id: "icici_sapphiro",
          cardName: "Sapphiro",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/000080/ffffff.png?text=ICICI+Sapphiro",
        },
        {
          id: "icici_amazon_pay",
          cardName: "Amazon Pay",
          cardType: "Credit",
          tier: "Cashback",
          image:
            "https://placehold.co/600x400/000000/ffffff.png?text=Amazon+Pay",
        },
      ],
    },
    {
      bankId: "kotak",
      bankName: "Kotak Mahindra Bank",
      cards: [
        {
          id: "kotak_white",
          cardName: "White",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/f5f5f5/000000.png?text=Kotak+White",
        },
        {
          id: "kotak_zen",
          cardName: "Zen Signature",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/8b4513/ffffff.png?text=Kotak+Zen",
        },
      ],
    },
    {
      bankId: "indusind",
      bankName: "IndusInd Bank",
      cards: [
        {
          id: "indusind_legend",
          cardName: "Legend",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/daa520/ffffff.png?text=IndusInd+Legend",
        },
        {
          id: "indusind_pioneer",
          cardName: "Pioneer Heritage",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/800000/ffffff.png?text=IndusInd+Pioneer",
        },
      ],
    },
    {
      bankId: "yes",
      bankName: "Yes Bank",
      cards: [
        {
          id: "yes_reserv",
          cardName: "Reserv",
          cardType: "Credit",
          tier: "Super Premium",
          image:
            "https://placehold.co/600x400/00008b/ffffff.png?text=Yes+Reserv",
        },
        {
          id: "yes_select",
          cardName: "Select",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/4682b4/ffffff.png?text=Yes+Select",
        },
      ],
    },
    {
      bankId: "idfc",
      bankName: "IDFC First Bank",
      cards: [
        {
          id: "idfc_wealth",
          cardName: "Wealth",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/8b0000/ffffff.png?text=IDFC+Wealth",
        },
        {
          id: "idfc_select",
          cardName: "Select",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/b22222/ffffff.png?text=IDFC+Select",
        },
      ],
    },
    {
      bankId: "hsbc",
      bankName: "HSBC India",
      cards: [
        {
          id: "hsbc_platinum",
          cardName: "Visa Platinum",
          cardType: "Credit",
          tier: "Mid",
          image:
            "https://placehold.co/600x400/ff0000/ffffff.png?text=HSBC+Platinum",
        },
        {
          id: "hsbc_premier",
          cardName: "Premier",
          cardType: "Credit",
          tier: "Premium",
          image:
            "https://placehold.co/600x400/000000/ffffff.png?text=HSBC+Premier",
        },
      ],
    },
  ],
};

export const INITIAL_CARDS: Card[] = [
  {
    id: "1",
    bankName: "HDFC",
    cardType: "Credit",
    cardImage:
      "https://placehold.co/600x400/1a1a1a/ffffff.png?text=HDFC+Infinia",
    lastFour: "4582",
    cardHolder: "John Doe",
  },
];

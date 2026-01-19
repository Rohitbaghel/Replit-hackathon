import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BANK_DATA } from '../constants/mockData';
import { useCards } from '../hooks/useCardContext';

export default function AddCardScreen() {
  const navigation = useNavigation();
  const { addCard } = useCards();
  
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'Credit' | 'Debit' | null>(null);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const selectedBank = BANK_DATA.banks.find(b => b.bankId === selectedBankId);
  const filteredCards = selectedBank 
    ? selectedBank.cards.filter(c => c.cardType === selectedType)
    : [];

  const handleSave = () => {
    if (selectedBank && selectedType && selectedCard) {
      addCard({
        bankName: selectedBank.bankName,
        cardType: selectedType,
        cardImage: selectedCard.image,
        lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
        cardHolder: 'John Doe',
      });
      navigation.goBack();
    }
  };

  const isFormValid = selectedBank && selectedType && selectedCard;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
        <TouchableOpacity 
          onPress={handleSave} 
          disabled={!isFormValid}
          style={{ opacity: isFormValid ? 1 : 0.3 }}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Bank</Text>
        <View style={styles.bankGrid}>
          {BANK_DATA.banks.map(bank => (
            <TouchableOpacity 
              key={bank.bankId}
              style={[styles.bankItem, selectedBankId === bank.bankId && styles.selectedItem]}
              onPress={() => {
                setSelectedBankId(bank.bankId);
                setSelectedType(null);
                setSelectedCard(null);
              }}
            >
              <View style={styles.bankLogoPlaceholder}>
                <Text style={styles.bankLogoText}>{bank.bankName.charAt(0)}</Text>
              </View>
              <Text style={styles.bankName} numberOfLines={1}>{bank.bankName}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedBankId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Type</Text>
            <View style={styles.typeRow}>
              {['Credit', 'Debit'].map((type: any) => (
                <TouchableOpacity 
                  key={type}
                  style={[styles.typeButton, selectedType === type && styles.selectedType]}
                  onPress={() => {
                    setSelectedType(type);
                    setSelectedCard(null);
                  }}
                >
                  <Text style={[styles.typeText, selectedType === type && styles.selectedTypeText]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Card Design</Text>
            {filteredCards.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardList}>
                {filteredCards.map(card => (
                  <TouchableOpacity 
                    key={card.id}
                    style={[styles.cardOption, selectedCard?.id === card.id && styles.selectedCardOption]}
                    onPress={() => setSelectedCard(card)}
                  >
                    <Image source={{ uri: card.image }} style={styles.cardOptionImage} />
                    <Text style={styles.cardOptionName}>{card.cardName}</Text>
                    <Text style={styles.cardOptionTier}>{card.tier}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noCardsText}>No {selectedType} cards available for this bank yet.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a101f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2638',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    color: '#ffffff',
    opacity: 0.8,
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bankItem: {
    width: '31%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#1e2638',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#007AFF',
    backgroundColor: '#252f4a',
  },
  bankLogoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bankLogoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bankName: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 11,
    textAlign: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#1e2638',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1e2638',
  },
  selectedType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeText: {
    fontWeight: '600',
    color: '#ffffff',
    opacity: 0.6,
  },
  selectedTypeText: {
    color: 'white',
    opacity: 1,
  },
  cardList: {
    marginBottom: 30,
  },
  cardOption: {
    width: 220,
    marginRight: 15,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#1e2638',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCardOption: {
    borderColor: '#007AFF',
    backgroundColor: '#252f4a',
  },
  cardOptionImage: {
    width: '100%',
    height: 130,
    borderRadius: 15,
    marginBottom: 10,
  },
  cardOptionName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
  },
  cardOptionTier: {
    fontSize: 11,
    textAlign: 'center',
    color: '#ffffff',
    opacity: 0.6,
    marginTop: 2,
  },
  noCardsText: {
    color: '#ffffff',
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

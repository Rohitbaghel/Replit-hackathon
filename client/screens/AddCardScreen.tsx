import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BANKS, PREDEFINED_CARDS } from '../constants/mockData';
import { useCards } from '../hooks/useCardContext';

export default function AddCardScreen() {
  const navigation = useNavigation();
  const { addCard } = useCards();
  
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'Credit' | 'Debit' | null>(null);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const filteredCards = selectedBank 
    ? PREDEFINED_CARDS.filter(c => c.bankId === selectedBank)
    : [];

  const handleSave = () => {
    if (selectedBank && selectedType && selectedCard) {
      const bank = BANKS.find(b => b.id === selectedBank);
      addCard({
        bankName: bank?.name || '',
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
          {BANKS.map(bank => (
            <TouchableOpacity 
              key={bank.id}
              style={[styles.bankItem, selectedBank === bank.id && styles.selectedItem]}
              onPress={() => {
                setSelectedBank(bank.id);
                setSelectedType(null);
                setSelectedCard(null);
              }}
            >
              <Image source={{ uri: bank.logo }} style={styles.bankLogo} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedBank && (
          <Animated.View style={styles.section}>
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
          </Animated.View>
        )}

        {selectedType && (
          <Animated.View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Card Design</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardList}>
              {filteredCards.map(card => (
                <TouchableOpacity 
                  key={card.id}
                  style={[styles.cardOption, selectedCard?.id === card.id && styles.selectedCardOption]}
                  onPress={() => setSelectedCard(card)}
                >
                  <Image source={{ uri: card.image }} style={styles.cardOptionImage} />
                  <Text style={styles.cardOptionName}>{card.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
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
    width: '48%',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#1e2638',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#007AFF',
    backgroundColor: '#252f4a',
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  bankName: {
    fontWeight: '600',
    color: '#ffffff',
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
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
  },
});

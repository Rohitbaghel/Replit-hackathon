import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CardDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { card } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Card Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <Image source={{ uri: card.cardImage }} style={styles.cardImage} />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Bank</Text>
            <Text style={styles.value}>{card.bankName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Card Type</Text>
            <Text style={styles.value}>{card.cardType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Card Number</Text>
            <Text style={styles.value}>•••• •••• •••• {card.lastFour}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Card Holder</Text>
            <Text style={styles.value}>{card.cardHolder}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

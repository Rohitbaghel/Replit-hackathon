import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', bank: 'Raiffeisen Bank', number: '.... 2687', color: '#76e076', textColor: '#1a1a1a' },
  { id: '2', bank: 'Bank of America', number: '.... 1897', color: '#f5d94d', textColor: '#1a1a1a' },
  { id: '3', bank: 'UBS Bank', number: '.... 1734', color: '#76a5f5', textColor: '#ffffff' },
  { id: '4', bank: 'Citybank', number: '.... 8996', color: '#e05244', balance: '$3,687', expiry: '12/24', holder: 'John Smith', textColor: '#ffffff', isMain: true },
];

const SHARED_USERS = [
  { id: '1', name: 'Kristin Watson', image: 'https://i.pravatar.cc/150?u=kristin' },
  { id: '2', name: 'Julie Lorens', image: 'https://i.pravatar.cc/150?u=julie' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=me' }} 
          style={styles.profileImage} 
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="grid-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>My cards</Text>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          {CARDS.map((card, index) => (
            <View 
              key={card.id} 
              style={[
                styles.card, 
                { 
                  backgroundColor: card.color,
                  marginTop: index === 0 ? 0 : -140,
                  zIndex: index,
                },
                card.isMain && styles.mainCard
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.bankName, { color: card.textColor }]}>{card.bank}</Text>
                <Text style={[styles.cardNumber, { color: card.textColor, opacity: 0.7 }]}>{card.number}</Text>
              </View>

              {card.isMain && (
                <View style={styles.cardDetails}>
                  <View style={styles.balanceRow}>
                    <Text style={[styles.balanceText, { color: card.textColor }]}>{card.balance}</Text>
                    <Ionicons name="wifi-outline" size={24} color={card.textColor} style={styles.wifiIcon} />
                  </View>
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={[styles.label, { color: card.textColor, opacity: 0.6 }]}>EXPIRATION</Text>
                      <Text style={[styles.info, { color: card.textColor }]}>{card.expiry}</Text>
                    </View>
                    <View style={styles.holderInfo}>
                      <Text style={[styles.label, { color: card.textColor, opacity: 0.6 }]}>CARD HOLDER</Text>
                      <Text style={[styles.info, { color: card.textColor }]}>{card.holder}</Text>
                    </View>
                    <View style={styles.mastercardLogo}>
                      <View style={[styles.mcCircle, { backgroundColor: '#eb001b', opacity: 0.8 }]} />
                      <View style={[styles.mcCircle, { backgroundColor: '#f79e1b', marginLeft: -10, opacity: 0.8 }]} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.sharedSection}>
          <Text style={styles.sectionTitle}>Shared accounts</Text>
          <View style={styles.sharedUsersRow}>
            <TouchableOpacity style={styles.addSharedButton}>
              <Ionicons name="person-add-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
            {SHARED_USERS.map(user => (
              <View key={user.id} style={styles.sharedUserCard}>
                <Image source={{ uri: user.image }} style={styles.userImage} />
                <Text style={styles.userName} numberOfLines={2}>{user.name}</Text>
              </View>
            ))}
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#1e2638',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e2638',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    height: 450, // Fixed height for stacked cards
  },
  card: {
    height: 200,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mainCard: {
    height: 240,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 14,
    letterSpacing: 1,
  },
  cardDetails: {
    marginTop: 30,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  wifiIcon: {
    transform: [{ rotate: '90deg' }],
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  holderInfo: {
    marginLeft: 30,
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    fontWeight: '600',
  },
  mastercardLogo: {
    flexDirection: 'row',
  },
  mcCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  sharedSection: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  sharedUsersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSharedButton: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#1e2638',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sharedUserCard: {
    width: 120,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#1e2638',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
});
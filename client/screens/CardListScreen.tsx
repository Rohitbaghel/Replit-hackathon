import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useCards } from '../hooks/useCardContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SHARED_USERS = [
  { id: '1', name: 'Kristin Watson', image: 'https://i.pravatar.cc/150?u=kristin' },
  { id: '2', name: 'Julie Lorens', image: 'https://i.pravatar.cc/150?u=julie' },
];

export default function CardListScreen() {
  const { cards } = useCards();
  const navigation = useNavigation<any>();

  const renderCard = (card: any, index: number) => {
    const isMain = index === cards.length - 1; // Last card is "on top"
    
    return (
      <TouchableOpacity 
        key={card.id}
        activeOpacity={0.9}
        style={[
          styles.card, 
          { 
            backgroundColor: index % 4 === 0 ? '#76e076' : index % 4 === 1 ? '#f5d94d' : index % 4 === 2 ? '#76a5f5' : '#e05244',
            marginTop: index === 0 ? 0 : -140,
            zIndex: index,
          },
          isMain && styles.mainCard
        ]}
        onPress={() => navigation.navigate('CardDetails', { card })}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.bankName, { color: index % 4 === 1 || index % 4 === 0 ? '#1a1a1a' : '#ffffff' }]}>{card.bankName}</Text>
          <Text style={[styles.cardNumber, { color: index % 4 === 1 || index % 4 === 0 ? '#1a1a1a' : '#ffffff', opacity: 0.7 }]}>•••• {card.lastFour}</Text>
        </View>

        {isMain && (
          <View style={styles.cardDetails}>
            <View style={styles.balanceRow}>
              <Text style={[styles.balanceText, { color: '#ffffff' }]}>$3,687</Text>
              <Ionicons name="wifi-outline" size={24} color="#ffffff" style={styles.wifiIcon} />
            </View>
            <View style={styles.cardFooter}>
              <View>
                <Text style={[styles.label, { color: '#ffffff', opacity: 0.6 }]}>EXPIRATION</Text>
                <Text style={[styles.info, { color: '#ffffff' }]}>12/24</Text>
              </View>
              <View style={styles.holderInfo}>
                <Text style={[styles.label, { color: '#ffffff', opacity: 0.6 }]}>CARD HOLDER</Text>
                <Text style={[styles.info, { color: '#ffffff' }]}>{card.cardHolder}</Text>
              </View>
              <View style={styles.mastercardLogo}>
                <View style={[styles.mcCircle, { backgroundColor: '#eb001b', opacity: 0.8 }]} />
                <View style={[styles.mcCircle, { backgroundColor: '#f79e1b', marginLeft: -10, opacity: 0.8 }]} />
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddCard')}
          >
            <Feather name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          {cards.map((card, index) => renderCard(card, index))}
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
    marginBottom: 40,
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
    marginTop: 20,
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
    marginTop: 20,
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
    marginTop: 20,
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

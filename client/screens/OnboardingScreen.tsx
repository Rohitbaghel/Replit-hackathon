import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Get started with\nDelivery',
    description: 'You can have a steady job and earn money.\nWelcome to the gathering of drivers!',
    image: 'https://placehold.co/600x600/6366f1/white.png?text=Delivery',
    backgroundColor: '#6366f1',
    nextLabel: 'Next',
  },
  {
    id: '2',
    title: 'Open Delivery app\nAccept & Start',
    description: 'Various trips are offered to you\nthrough the application',
    image: 'https://placehold.co/600x600/ffffff/000000.png?text=Accept',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    descriptionColor: '#666666',
    nextLabel: 'Next',
  },
  {
    id: '3',
    title: 'You can\nEarn Money',
    description: 'Earn up to €2500 per month with the highest-\npaying delivery app on the market.',
    image: 'https://placehold.co/600x600/f59e0b/white.png?text=Earn',
    backgroundColor: '#f59e0b',
    nextLabel: "Let's Go",
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHome, setShowHome] = useState(false);

  if (showHome) {
    return <HomeScreen />;
  }

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowHome(true);
    }
  };

  const handleSkip = () => {
    setShowHome(true);
  };

  const currentItem = ONBOARDING_DATA[currentIndex];
  const isDark = currentItem.backgroundColor !== '#ffffff';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentItem.backgroundColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        {currentIndex < ONBOARDING_DATA.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.skipText, { color: isDark ? '#ffffff' : '#6366f1', opacity: 0.8 }]}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentItem.image }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: currentItem.textColor || '#ffffff' }]}>
            {currentItem.title}
          </Text>
          <Text style={[styles.description, { color: currentItem.descriptionColor || '#ffffff', opacity: 0.8 }]}>
            {currentItem.description}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                { backgroundColor: isDark ? '#ffffff' : '#6366f1', opacity: index === currentIndex ? 1 : 0.3 }
              ]} 
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.nextButton, { backgroundColor: isDark ? '#ffffff' : '#6366f1' }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: isDark ? currentItem.backgroundColor : '#ffffff' }]}>
            {currentItem.nextLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
    height: 50,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
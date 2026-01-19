import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, ScrollView, FlatList } from 'react-native';
import { useCards } from '../hooks/useCardContext';

const { width } = Dimensions.get('window');

const ONBOARDING_PAGES = [
  {
    id: '1',
    title: 'Manage Your Cards',
    subtitle: 'Keep all your bank cards in one secure place without sensitive data.',
    image: 'https://placehold.co/600x600/007AFF/white.png?text=Manage+Cards',
  },
  {
    id: '2',
    title: 'Track Spending',
    subtitle: 'See your card types and details at a glance with a clean UI.',
    image: 'https://placehold.co/600x600/34C759/white.png?text=Track+Spending',
  },
  {
    id: '3',
    title: 'Get Started Now',
    subtitle: 'Join thousands of users managing their finances better.',
    image: 'https://placehold.co/600x600/FF9500/white.png?text=Get+Started',
    isLast: true,
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useCards();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < ONBOARDING_PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            
            {item.isLast && (
              <TouchableOpacity style={styles.button} onPress={completeOnboarding}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.pagination}>
        {ONBOARDING_PAGES.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
        ))}
      </View>

      {!ONBOARDING_PAGES[activeIndex].isLast && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    width,
    alignItems: 'center',
    padding: 40,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    right: 40,
  },
  nextButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

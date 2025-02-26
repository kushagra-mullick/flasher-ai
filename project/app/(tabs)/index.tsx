import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function StudyScreen() {
  const [studyTime, setStudyTime] = useState(0);

  const handleDeckPress = (deckName: string) => {
    // We'll implement the deck details screen later
    router.push(`/deck/${deckName}`);
  };

  const handleStatPress = (statType: string) => {
    // We'll implement the statistics details screen later
    router.push(`/stats/${statType}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Continue your learning journey</Text>
        </View>

        <View style={styles.statsContainer}>
          <Pressable 
            style={styles.statCard}
            onPress={() => handleStatPress('daily')}
            android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Cards Today</Text>
          </Pressable>
          <Pressable 
            style={styles.statCard}
            onPress={() => handleStatPress('accuracy')}
            android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </Pressable>
          <Pressable 
            style={styles.statCard}
            onPress={() => handleStatPress('streak')}
            android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deckScroll}>
            {['Spanish Basics', 'Math 101', 'Biology Terms'].map((deck, index) => (
              <Pressable 
                key={index} 
                style={({ pressed }) => [
                  styles.deckCard,
                  pressed && styles.deckCardPressed
                ]}
                onPress={() => handleDeckPress(deck.toLowerCase().replace(' ', '-'))}
                android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
                <Ionicons name="book" size={24} color="#007AFF" />
                <Text style={styles.deckTitle}>{deck}</Text>
                <Text style={styles.deckProgress}>12/30 cards</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <Pressable 
            style={({ pressed }) => [
              styles.goalCard,
              pressed && styles.goalCardPressed
            ]}
            onPress={() => router.push('/goals')}
            android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
            <View style={styles.goalProgress}>
              <View style={[styles.goalBar, { width: '60%' }]} />
            </View>
            <Text style={styles.goalText}>18/30 cards reviewed</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 15,
  },
  deckScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  deckCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginRight: 15,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  deckCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginTop: 10,
  },
  deckProgress: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 5,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  goalCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  goalProgress: {
    height: 8,
    backgroundColor: '#f2f2f7',
    borderRadius: 4,
    marginBottom: 10,
  },
  goalBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#8e8e93',
  },
});
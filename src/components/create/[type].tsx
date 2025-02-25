import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PDFToFlashcards } from '../PDFToFlashcards';
import { Card } from '../../types';

export default function CreateScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  const handleCardsGenerated = (cards: Card[]) => {
    // Handle the generated cards (e.g., save to store, navigate to review)
    console.log('Generated cards:', cards);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create from {type}</Text>
          <Text style={styles.subtitle}>Import your content</Text>
        </View>
        
        <View style={styles.content}>
          {type === 'pdf' ? (
            <PDFToFlashcards onCardsGenerated={handleCardsGenerated} />
          ) : (
            <Text style={styles.text}>{type} input content coming soon...</Text>
          )}
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
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#1c1c1e',
  },
});
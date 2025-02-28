import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, ActivityIndicator } from 'react-native';
import { Card } from '../../types';

export default function TextInputScreen() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!content.trim()) {
      // Show error message
      return;
    }

    setIsLoading(true);
    try {
      // Simulate AI generation process
      setTimeout(() => {
        // Navigate to the generating screen
        router.push('/generating');
      }, 500);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create from Text</Text>
          <Text style={styles.subtitle}>Import your text content</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Topic or Subject</Text>
            <TextInput
              style={styles.input}
              value={topic}
              onChangeText={setTopic}
              placeholder="e.g., Spanish Vocabulary, Math Formulas"
              placeholderTextColor="#8e8e93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Text Content</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Enter or paste the text you want to convert to flashcards"
              placeholderTextColor="#8e8e93"
              multiline
              numberOfLines={10}
            />
          </View>

          <Button
            title={isLoading ? "Generating..." : "Generate Flashcards"}
            onPress={handleGenerate}
            disabled={isLoading || !content.trim()}
            color="#007AFF"
          />
          {isLoading && (
            <ActivityIndicator style={styles.loader} color="#007AFF" />
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  loader: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#1c1c1e',
  },
});
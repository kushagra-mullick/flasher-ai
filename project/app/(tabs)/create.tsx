import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateScreen() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !description) {
      // We'll add proper validation feedback later
      return;
    }
    
    setIsLoading(true);
    try {
      // We'll implement the AI generation logic here
      router.push('/generating');
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionPress = (option: 'text' | 'voice' | 'image') => {
    switch (option) {
      case 'text':
        router.push('/create/text-input');
        break;
      case 'voice':
        router.push('/create/voice-input');
        break;
      case 'image':
        router.push('/create/image-input');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Flashcards</Text>
          <Text style={styles.subtitle}>Let AI help you learn faster</Text>
        </View>

        <View style={styles.form}>
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
            <Text style={styles.label}>Description or Content</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter text, notes, or concepts you want to learn"
              placeholderTextColor="#8e8e93"
              multiline
              numberOfLines={6}
            />
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.label}>Creation Options</Text>
            <View style={styles.options}>
              <Pressable 
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.optionButtonPressed
                ]}
                onPress={() => handleOptionPress('text')}
                android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
                <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                <Text style={styles.optionText}>From Text</Text>
              </Pressable>
              <Pressable 
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.optionButtonPressed
                ]}
                onPress={() => handleOptionPress('voice')}
                android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
                <Ionicons name="mic-outline" size={24} color="#007AFF" />
                <Text style={styles.optionText}>Voice Input</Text>
              </Pressable>
              <Pressable 
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.optionButtonPressed
                ]}
                onPress={() => handleOptionPress('image')}
                android_ripple={{ color: 'rgba(0, 122, 255, 0.1)' }}>
                <Ionicons name="image-outline" size={24} color="#007AFF" />
                <Text style={styles.optionText}>From Image</Text>
              </Pressable>
            </View>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.generateButton,
              pressed && styles.generateButtonPressed,
              isLoading && styles.generateButtonDisabled
            ]}
            onPress={handleGenerate}
            disabled={isLoading}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}>
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Flashcards</Text>
            )}
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
  form: {
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
    height: 120,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  optionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  optionText: {
    fontSize: 12,
    color: '#1c1c1e',
    marginTop: 5,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
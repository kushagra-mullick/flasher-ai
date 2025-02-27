import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue
} from 'react-native-reanimated';

export default function GeneratingScreen() {
  const rotation = useSharedValue(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    rotation.value = 0;
    
    // Use withSequence and withRepeat for rotation animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: 1000 })
      ),
      -1
    );

    // Simulate AI generation process with a safe timeout implementation
    timeoutRef.current = setTimeout(() => {
      router.replace('/deck/generated');
    }, 3000);

    return () => {
      // Clean up timeout to prevent memory leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </Animated.View>
      <Text style={styles.title}>Generating Your Flashcards</Text>
      <Text style={styles.subtitle}>Using AI to create personalized cards...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1c1e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
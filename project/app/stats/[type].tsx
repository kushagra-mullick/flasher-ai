import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StatsScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Statistics</Text>
          <Text style={styles.subtitle}>Type: {type}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.text}>Statistics content coming soon...</Text>
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
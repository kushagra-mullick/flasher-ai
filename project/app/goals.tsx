import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GoalsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Goals</Text>
          <Text style={styles.subtitle}>Track your progress</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.text}>Goals content coming soon...</Text>
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
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BOOK APP</Text>
      </View>
      <Image 
        source={require('../../assets/icon.png')}
        style={styles.image}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8e1e7', // Modern soft pink background
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a154b', // Deep pink for text
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#4a154b', // Deep pink for text
    textAlign: 'center',
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0aabb',
  },
});

export default HomeScreen;

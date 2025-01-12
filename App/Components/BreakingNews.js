import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Define the BreakingNews component
const BreakingNews = ({ newsList }) => {
  if (!newsList || newsList.length === 0) {
    return <Text style={styles.noNewsText}>No breaking news available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Breaking News</Text>
      {newsList.map((newsItem, index) => (
        <View key={index} style={styles.newsItem}>
          {newsItem.image_url && (
            <Image source={{ uri: newsItem.image_url }} style={styles.image} />
          )}
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.description}>{newsItem.description || 'No description available.'}</Text>
          <Text style={styles.source}>Source: {newsItem.source_name || 'Unknown'}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  newsItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#999',
  },
  noNewsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#555',
  },
});

export default BreakingNews;
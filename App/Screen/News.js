import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import BreakingNews from '/Users/yughjuneja/Dhan-Niti/App/Components/BreakingNews.js'; // Import the BreakingNews component

const NewsPage = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBreakingNews = async () => {
      try {
        const URL = 'https://newsdata.io/api/1/news?apikey=pub_651467520e635b9989dd58c6689bb687ef4c4&q=financial&country=in&language=en&category=business&image=1&removeduplicate=1&size=5';
        const params = {
          apikey: 'pub_651467520e635b9989dd58c6689bb687ef4c4',  // Replace with your actual API key
          q: 'financial',          // Search query (example: "financial")
          country: 'in',           // Country (example: "in" for India)
          language: 'en',          // Language (example: "en" for English)
          category: 'business',    // Category (example: "business")
          image: 1,                // Include images (optional)
          removeduplicate: 1,      // Remove duplicate news (optional)
          size: 5                  // Limit the number of news items (optional)
        };
        
        const response = await axios.get(URL, { params });
        
        if (response && response.data) {
          setBreakingNews(response.data.results);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    getBreakingNews();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NewsPage;




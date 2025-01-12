import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BreakingNews from './Components/BreakingNews'; // Adjust the path if needed
import { Header } from 'react-native/Libraries/NewAppScreen';
import { SearchBar } from 'react-native-screens';

const App = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = 'https://newsdata.io/api/1/news?apikey=pub_651467520e635b9989dd58c6689bb687ef4c4&q=financial&country=in&language=en,hi&category=business&image=1&removeduplicate=1&size=5';
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Error Message: ', err.message);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Header />
          <SearchBar />
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <BreakingNews newsList={breakingNews} />
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjust for Safe Area if needed
  },
});

export default App;
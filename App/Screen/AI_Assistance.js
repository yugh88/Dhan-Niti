import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Append user message to the chat
    const updatedMessages = [
      ...messages,
      { role: 'user', content: userInput },
    ];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true);

    try {
      const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'f1fe1b198bmshab2b9c29ed4f149p18321ejsn4ed8cc8ee095',
          'x-rapidapi-host': 'chatgpt-best-price.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: updatedMessages,
        }),
      };

      const response = await fetch(url, options);
      const result = await response.json();
      const assistantMessage = result.choices[0].message.content;

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Oops! Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.role === 'user'
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      {loading && <ActivityIndicator size="large" color="#6200EE" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200EE',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF69B4', // Dark Pink for better contrast
  },
  messageText: {
    color: '#FFF', // White text for good contrast with the pink background
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
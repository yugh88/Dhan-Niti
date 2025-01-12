import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const ExpenseTrack = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [spendingLimit, setSpendingLimit] = useState(5000); // Default spending limit
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const handleAddExpense = () => {
    if (expenseType && amount) {
      const newExpense = { type: expenseType, amount: parseFloat(amount) };
      setExpenses([...expenses, newExpense]);
      setSpendingLimit((prevLimit) => prevLimit - parseFloat(amount));
      setExpenseType('');
      setAmount('');
    }
  };

  const calculateExpenseData = () => {
    const data = expenses.reduce((acc, expense) => {
      const existing = acc.find((item) => item.x === expense.type);
      if (existing) {
        existing.y += expense.amount;
      } else {
        acc.push({ x: expense.type, y: expense.amount });
      }
      return acc;
    }, []);

    // Convert data to PieChart-compatible format
    return data.map((item) => ({
      name: item.x,
      population: item.y,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>

      {/* Pie Chart */}
      <PieChart
        data={calculateExpenseData()}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.spendingLimit}>
        Remaining Spending Limit: ₹{spendingLimit.toFixed(2)}
      </Text>

      {/* Input for Expenses */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Expense Type (e.g., Food, Travel)"
          value={expenseType}
          onChangeText={(text) => setExpenseType(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (₹)"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* AI Assistance Button */}
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('AIChatbot')} // Navigate to AI Assistance Chatbot page
      >
        <Text style={styles.aiButtonText}>Ask AI Assistance for Investment Tips</Text>
      </TouchableOpacity>

      {/* Expenses Summary */}
      <View style={styles.expensesContainer}>
        <Text style={styles.expensesTitle}>Expenses Summary:</Text>
        {expenses.map((expense, index) => (
          <Text key={index} style={styles.expenseItem}>
            {expense.type}: ₹{expense.amount.toFixed(2)}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  spendingLimit: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#27ae60',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expensesContainer: {
    marginTop: 20,
  },
  expensesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  expenseItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default ExpenseTrack;
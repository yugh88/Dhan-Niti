import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Image } from 'react-native';

// Static Data for Mentors
const mentors = [
  {
    name: "John Doe",
    qualification: "MBA in Finance, Certified Financial Planner (CFP)",
    tags: ["Finance Expert", "Investment Advisor", "Business Strategist"],
    availableTimes: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"]
  },
  {
    name: "Jane Smith",
    qualification: "PhD in Economics, Chartered Financial Analyst (CFA)",
    tags: ["Economist", "Wealth Management", "Market Analyst"],
    availableTimes: ["11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"]
  },
  {
    name: "Samuel Lee",
    qualification: "Master’s in Finance, Financial Risk Manager (FRM)",
    tags: ["Financial Planning", "Risk Management", "Venture Capital"],
    availableTimes: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"]
  }
];

const Mentor_Appoint = () => {
  // Function to handle booking (replace with chatbot functionality later)
  const handleBookAppointment = (mentorName) => {
    console.log(`Booking appointment with ${mentorName}...`);
    // This can be linked to the chatbot feature later
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Finance Mentors</Text>

      {mentors.map((mentor, index) => (
        <View key={index} style={styles.mentorContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image, replace with mentor images if available
            style={styles.mentorImage}
          />
          <Text style={styles.mentorName}>{mentor.name}</Text>
          <Text style={styles.mentorQualification}>{mentor.qualification}</Text>

          <View style={styles.tagsContainer}>
            {mentor.tags.map((tag, idx) => (
              <Text key={idx} style={styles.tag}>{tag}</Text>
            ))}
          </View>

          <Text style={styles.availableTimesTitle}>Available Timings:</Text>
          <View style={styles.timesContainer}>
            {mentor.availableTimes.map((time, idx) => (
              <Text key={idx} style={styles.time}>{time}</Text>
            ))}
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleBookAppointment(mentor.name)}
          >
            <Text style={styles.bookButtonText}>Book Appointment via Chatbot</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  mentorContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mentorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mentorQualification: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#3498db',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  availableTimesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  timesContainer: {
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  bookButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Mentor_Appoint;
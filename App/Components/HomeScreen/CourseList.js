import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import the service to fetch courses
import { getCourseList } from '/Users/yughjuneja/Dhan-Niti/App/Services/index.js'; 
import SubHeading from "/Users/yughjuneja/Dhan-Niti/App/Components/SubHeading.js"; 
import CourseItem from "/Users/yughjuneja/Dhan-Niti/App/Components/HomeScreen/Courseitem.js";

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Fetch courses on component mount
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const resp = await getCourseList(); // Get the course list from your service
      console.log("Full API Response: ", resp);
      
      // Check if the response is in the correct format
      if (Array.isArray(resp)) {
        setCourseList(resp); // Directly setting courses if the response is an array
      } else {
        setCourseList(resp.courses || []); // This assumes resp.courses is the correct structure
      }
    } catch (error) {
      console.error("Error fetching courses: ", error);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  // Show error state
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <SubHeading text="Basic Courses" />
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("course-detail", {
                course: item, // Pass course data to the next screen
              })
            }
          >
            <CourseItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#007BFF", // Primary color
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#FF0000", // Error color
  },
});
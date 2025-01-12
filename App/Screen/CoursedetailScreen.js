import { View, Text, TouchableOpacity, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '/Users/yughjuneja/Dhan-Niti/App/Components/CourseDetailScreen/DetailSection.js';
import ChapterSection from '/Users/yughjuneja/Dhan-Niti/App/Components/CourseDetailScreen/ChapterSection.js';
import { getUserEnrolledCourses, enrollCourse } from '/Users/yughjuneja/Dhan-Niti/App/Services/index.js';
import { useUser } from '@clerk/clerk-react';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const { params } = useRoute();
  const [courseData, setCourseData] = useState(null);
  const [enrolledData, setEnrolledData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (params?.course && user?.id) {
      setCourseData(params.course);
      fetchUserEnrolledCourses();
    } else {
      console.error('Missing course data or user ID');
      setIsLoading(false); // stop loading if there's missing data
    }
  }, [params?.course, user?.id]);

  // Fetch enrolled courses for the user
  const fetchUserEnrolledCourses = async () => {
    if (!user || !user.id) {
      console.error('User not authenticated');
      setIsLoading(false); // stop loading
      return;
    }

    try {
      const response = await getUserEnrolledCourses(user.id);
      console.log('Enrolled Data:', response);
      setEnrolledData(response.enrollments || []);
      setIsLoading(false); // stop loading after data is fetched
    } catch (error) {
      console.error('Error fetching user enrollments:', error.message);
      setIsLoading(false); // stop loading on error
      ToastAndroid.show('Error fetching enrolled courses', ToastAndroid.LONG);
    }
  };

  const handleCourseEnrollment = async (courseId) => {
    if (!user || !user.id) {
      console.error('User not authenticated');
      return;
    }

    console.log('Attempting to enroll in course with ID:', courseId);

    try {
      const response = await enrollCourse(courseId, user.id);
      console.log('Enroll Response:', response);
      ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
      fetchUserEnrolledCourses(); // Refresh enrolled courses after successful enrollment
    } catch (error) {
      console.error('Error enrolling in course:', error.message);
      ToastAndroid.show('Error enrolling in course', ToastAndroid.LONG);
    }
  };

  // Loading state display
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return courseData ? (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <AntDesign name="back" size={40} color="black" />
      </TouchableOpacity>

      <DetailSection
        course={courseData}
        userEnrolledCourse={enrolledData}
        enrollCourse={handleCourseEnrollment}
      />

      {courseData.chapters && courseData.chapters.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chapters</Text>
          {courseData.chapters.map((chapter, index) => (
            <ChapterSection
              key={index}
              chapter={chapter}
              userEnrolledCourse={enrolledData}
              enrolledData={enrolledData}
            />
          ))}
        </View>
      ) : (
        <Text>No chapters available.</Text>
      )}
    </ScrollView>
  ) : (
    <Text>Course details not available.</Text>
  );
}
// DetailSection.js
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import OptionItem from '/Users/yughjuneja/Dhan-Niti/App/Components/CourseDetailScreen/OptionItem.js';

export default function DetailSection({ course, enrollCourse, userEnrolledCourse }) {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      {/* Banner Image */}
      <Image
        source={{ uri: course?.banner?.url }}
        style={{
          width: Dimensions.get('screen').width * 0.88,
          height: 190,
          borderRadius: 15,
          marginBottom: 15,
        }}
      />

      {/* Course Title */}
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'outfit',
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        {course.name}
      </Text>

      {/* Course Information */}
      <View style={{ marginBottom: 15 }}>
        <OptionItem icon="book-outline" value={`${course.chapters?.length} Chapter`} />
        <OptionItem icon="md-time-outline" value={course.time} />
        <OptionItem icon="person-circle-outline" value={course.auth} />
        <OptionItem icon="cellular-outline" value={course.level} />
      </View>

      {/* Description Section */}
      <Text style={{ fontFamily: 'outfit', fontSize: 20, marginBottom: 5 }}>Description</Text>
      <Text style={{ fontFamily: 'outfit', color: 'gray', lineHeight: 23, marginBottom: 20 }}>
        {course.description?.markdown}
      </Text>

      {/* Buttons Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        {userEnrolledCourse?.length === 0 ? (
          <TouchableOpacity
            onPress={() => enrollCourse(course.id)}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 25,
              backgroundColor: 'blue',
              borderRadius: 15,
              width: '48%',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'outfit', color: 'white', fontSize: 17 }}>
              Enroll For Free
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: 'blue',
            borderRadius: 15,
            width: '48%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'outfit', color: 'white', fontSize: 17 }}>
            Membership Rs 99/Month
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
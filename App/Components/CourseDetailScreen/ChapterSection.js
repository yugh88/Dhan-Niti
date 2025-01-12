import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign'; // For icons
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({ chapters, userEnrolledCourse }) {
  const navigation = useNavigation();

  const OnChapterPress = (isUnlocked, chapter) => {
    if (!isUnlocked) {
      ToastAndroid.show('Please enroll in the course to unlock this chapter.', ToastAndroid.LONG);
      return;
    }
    // Navigate to the chapter content screen with chapter details
    navigation.navigate('chapter-content', { chapter });
  };

  return (
    <View>
      {chapters && chapters.length > 0 ? (
        chapters.map((chapter, index) => {
          // Check if the chapter is unlocked
          const isUnlocked = userEnrolledCourse || index === 0; // Unlock the first chapter by default for demo purposes

          return (
            <View key={index} style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  name={isUnlocked ? 'playcircleo' : 'lock'}
                  size={24}
                  color={isUnlocked ? 'green' : 'gray'}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'outfit',
                    fontWeight: 'bold',
                    color: isUnlocked ? 'black' : 'gray',
                  }}
                >
                  Chapter {index + 1}: {chapter.title}
                </Text>
              </View>
              {isUnlocked && (
                <Text style={{ fontFamily: 'outfit', color: 'gray', marginTop: 5 }}>
                  {chapter.content}
                </Text>
              )}
              {!isUnlocked && (
                <Text style={{ fontFamily: 'outfit', color: 'red', marginTop: 5 }}>
                  This chapter is locked. Enroll to access.
                </Text>
              )}
              <TouchableOpacity
                onPress={() => OnChapterPress(isUnlocked, chapter)}
                style={{
                  backgroundColor: isUnlocked ? 'green' : 'gray',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: 'white' }}>Go to Chapter</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text>No chapters available</Text>
      )}
    </View>
  );
}
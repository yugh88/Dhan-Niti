import { View, Text } from 'react-native'
import React from 'react'
import Header from '/Users/yughjuneja/Dhan-Niti/App/Components/HomeScreen/Header.js'
import CourseList from '/Users/yughjuneja/Dhan-Niti/App/Components/HomeScreen/CourseList.js'

export default function HomeScreen() {
  return (
    <View>
      <View style={{backgroundColor: "#6857E8", height: 250}}>
        <Header />
      </View>
      <View style={{ padding: 20, marginTop: -90 }}>
        <CourseList />
      </View>
    </View>
  )
}
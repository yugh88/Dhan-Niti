import { View, Text } from 'react-native'
import React from 'react'
import ProgressBar from './ProgressBar'

export default function Content({Content}) {
  return (
    <View style={{padding:20}} >
        <ProgressBar
         contentLength={content?.length}
        contentIndex={1} />
      <Text>Content</Text>
    </View>
  )
}
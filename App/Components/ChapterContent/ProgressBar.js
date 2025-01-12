import { View } from 'react-native';
import React from 'react';

export default function ProgressBar({ contentLength, contentIndex }) {
  // Create an array for the progress bar segments
  const arraySize = Array.from({ length: contentLength }, (_, index) => index + 1);
  const width = 100 / contentLength; // Calculate width of each segment as a percentage

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}
    >
      {arraySize.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: index < contentIndex ? '#4CAF50' : '#D3D3D3', // Green for completed, gray for incomplete
            width: `${width}%`,
            borderRadius: 5,
            height: 10,
            marginHorizontal: 2,
          }}
        />
      ))}
    </View>
  );
}
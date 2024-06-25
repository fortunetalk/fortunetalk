import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedDot from './AnimateDot';

const Pagination = ({ data, currentIndex }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <AnimatedDot key={index} isActive={currentIndex === index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default Pagination;

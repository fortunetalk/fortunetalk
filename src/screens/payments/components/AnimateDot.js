import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors } from '../../../assets/styles';

const AnimatedDot = ({ isActive }) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(isActive ? 1 : 0, { duration: 300 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animation.value === 1 ? Colors.white : Colors.grayE,
      transform: [{ scale: animation.value === 1 ? 1.2 : 1 }],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default AnimatedDot;

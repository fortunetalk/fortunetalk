import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../assets/styles';

type CircleProps = {
  index: number;
};

const circleContainerSize = 90;

const gradient_a = [Colors.primaryLight, Colors.primaryDark]
const gradient_b = [Colors.white, Colors.white]

const AnimatedCircle: FC<CircleProps> = ({index}) => {
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={index == 2 ? gradient_a : gradient_b}
        locations={[0.3, 1]}
        style={{
          width: circleContainerSize,
          height: circleContainerSize,
          borderRadius: circleContainerSize,
        }}
      />
    </View>
  );
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 2.5,
    width: circleContainerSize,
    height: circleContainerSize,
    borderRadius: circleContainerSize,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.blackLight,
    zIndex: -1,
    //added
    alignSelf: 'center',
  },
});

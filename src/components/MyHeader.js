import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Sizes, Fonts } from '../assets/styles';
import { goBack } from '../utils/navigationServices';

const MyHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()}
        style={{ position: 'absolute', zIndex: 99, left: Sizes.fixPadding * 1.5 }}>
        <AntDesign
          name="leftcircleo"
          color={Colors.primaryLight}
          size={Sizes.fixPadding * 2.2}
        />
      </TouchableOpacity>
      <Text style={{ ...Fonts._15RobotMedium, color: Colors.primaryLight, textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding * 1.3,
    borderBottomWidth: 2,
    borderBlockColor: Colors.grayLight,
  }
});

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../assets/styles';

const MyHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{position: 'absolute', zIndex: 99, left: Sizes.fixPadding*1.5}}>
        <AntDesign
          name="leftcircleo"
          color={Colors.primaryDark}
          size={Sizes.fixPadding * 2.2}
        />
      </TouchableOpacity>
      <Text style={{ ...Fonts._15RobotMedium, color: Colors.orange, textAlign: 'center' }}>{title}</Text>
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
    paddingVertical: Sizes.fixPadding*1.3,
    borderBottomWidth: 2,
    borderBlockColor: Colors.grayLight,
  }
});

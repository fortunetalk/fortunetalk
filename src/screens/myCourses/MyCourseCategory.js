import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../assets/styles';

const MyCourseCategory = ({
  filterData,
  updateState,
  activeFilter,
}) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          updateState({ activeFilter: item.id });
        }}
        style={styles.container}>
        <Text style={{ ...Fonts.white14RobotoMedium, textAlign: 'center' }}>
          {item.title}
        </Text>
        {item.id === activeFilter && <View style={styles.bottomBorder} />}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.primaryLight, Colors.primaryDark]}
    >
      <FlatList
        data={filterData}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default MyCourseCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Sizes.fixPadding * 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: Sizes.fixPadding * 0.7,
    borderTopLeftRadius: Sizes.fixPadding * 0.7,
  },
  bottomBorder: {
    position: 'absolute',
    width: '100%',
    height: 5,
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
  },
});

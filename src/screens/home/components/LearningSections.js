import React from 'react'
import { connect } from 'react-redux';
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'

const LearningSections = ({ allDemoClass }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate("classOverview", {
          id: item?._id,
          title: "Demo",
          isRegister: true
        })}
        style={{
          width: SCREEN_WIDTH * 0.55,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          borderWidth: 0,
          borderColor: Colors.primaryLight,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.white,
        }}>
        <Image
          source={{ uri: item?.image }}
          style={{
            width: '100%',
            height: SCREEN_WIDTH * 0.3,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          }}
        />
        <Text
          style={{
            ...Fonts.black14RobotoRegular,
            textAlign: 'center',
            paddingVertical: Sizes.fixPadding * 0.5,
          }}>
          {item?.className}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{
      borderBottomWidth: 1,
      borderBottomColor: Colors.grayLight
    }}>
      <Text style={{
        ...Fonts.black16RobotoMedium, paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding,
      }}>Demo Class</Text>
      <FlatList
        data={allDemoClass}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  allDemoClass: state.courses.allDemoClass,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(LearningSections)

import React from 'react'
import { connect } from 'react-redux';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';

const ClientTestimonials = ({ testimonials }) => {
  const renderItem = ({ item }) => {
    return (

      <View
        activeOpacity={0.8}
        style={{
          width: SCREEN_WIDTH * 0.65,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
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
          padding: Sizes.fixPadding * 0.8,
        }}>
        <Text numberOfLines={5} style={{ ...Fonts.gray11RobotoRegular }}>
          {item?.description}
        </Text>
        <View style={{ ...styles.row }}>
          <Image
            source={{ uri: item?.image }}
            style={{
              width: 25,
              height: 25,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              ...Fonts.gray11RobotoRegular,
              marginLeft: Sizes.fixPadding * 0.5,
            }}>
            {item?.name}
          </Text>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Stars
              default={item?.rating}
              count={5}
              half={true}
              starSize={9}
              fullStar={
                <Ionicons
                  name={'star'}
                  size={9}
                  color={Colors.primaryLight}
                />
              }
              emptyStar={
                <Ionicons
                  name={'star-outline'}
                  size={9}
                  color={Colors.primaryLight}
                />
              }
            />
          </View>
        </View>
      </View>

    );
  };

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>
          Client Testimonials
        </Text>
      </View>
      <FlatList
        data={testimonials}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  testimonials: state.customer.testimonials
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ClientTestimonials);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

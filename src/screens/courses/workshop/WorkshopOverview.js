import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import { navigate } from '../../../utils/navigationServices';
import { classifyTimeNoon } from '../../../utils/tools';

const WorkshopOverview = ({ route }) => {
  const data = route.params.details
  console.log("route.params data", data)
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyHeader title={'Workshop'} />
      <FlatList
        ListHeaderComponent={
          <>
            <Video uri={data?.video} />
            {courseTitleInfo()}
            {priceInfo()}
            {courseDescriptionInfo()}
            {demoClassDatesInfo()}
          </>
        }
      />
      {demoClassDetailsInfo()}
    </View>
  );

  function priceInfo() {
    const originalPrice = data?.price;
    const discountedPrice = originalPrice - (originalPrice * data?.discount / 100);
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2, marginTop: Sizes.fixPadding * 0.5, justifyContent: "flex-start", flexDirection: "row", alignItems: "flex-end", gap: 4 }}>
        <Text style={{
          ...Fonts.red16RobotoBold,
          fontSize: 24,
          color: Colors.black,
          fontWeight: "700"
        }}>₹{discountedPrice}</Text>
        <Text style={{
          ...Fonts.black16RobotoRegular,
          fontSize: 18,
          textDecorationLine: 'line-through',
          color: Colors.primaryLight,
        }}>₹{originalPrice}</Text>
      </View>
    );
  }

  function demoClassDetailsInfo() {
    const onClick = () => {
      navigate("workshopDetails", { workshop: data })
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClick}
        style={{
          margin: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding,
          backgroundColor: Colors.primaryLight,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Sizes.fixPadding * 1.5,
        }}>
        <Text style={{ ...Fonts.white14RobotoMedium }}>Book Now</Text>
      </TouchableOpacity>
    );
  }

  function demoClassDatesInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.grayLight,
          paddingVertical: Sizes.fixPadding,
          alignItems: 'center',
        }}>
        <Text style={{ ...Fonts.gray14RobotoRegular }}>
          Workshop Class will be Conducted on
        </Text>
        <Text style={{ ...Fonts.gray14RobotoMedium, color: Colors.red_a }}>
          {`${moment(data?.date).format(
            'Do MMMM YYYY',
          )} (${data?.time} ${classifyTimeNoon(data?.time)} )`}
        </Text>
      </View>
    );
  }

  function courseDescriptionInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 0.5,
        }}>
        <Text style={{ ...Fonts.gray12RobotoRegular }}>
          {data?.description}
        </Text>
      </View>
    );
  }

  function courseTitleInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 0.5,
        }}>
        <Text style={{ ...Fonts.black16RobotoRegular }}>
          {data?.workShopName}
        </Text>
      </View>
    );
  }

};

export default WorkshopOverview


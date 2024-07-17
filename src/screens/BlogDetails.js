import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import MyStatusBar from '../components/MyStatusBar';
import { Colors, Fonts, Sizes, SCREEN_WIDTH } from '../assets/styles';
import MyHeader from '../components/MyHeader';

const BlogDetails = ({ route }) => {
  const [blogData] = useState(route.params.blogData);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <MyHeader title={`${blogData?.title}`} />
      <ScrollView>
        <Image
          source={{ uri: blogData?.image }}
          style={{ width: '100%', height: SCREEN_WIDTH * 0.5 }}
        />
        <Text
          style={{
            ...Fonts.primaryLight18RobotoMedium,
            margin: Sizes.fixPadding
          }}>
          {blogData?.title}
        </Text>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding * 2,
          }}>
          <Text>
            {blogData?.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogDetails;

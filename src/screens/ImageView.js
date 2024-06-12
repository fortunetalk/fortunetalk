import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../assets/styles'
import MyStatusBar from '../components/MyStatusBar'

const ImageView = ({ route }) => {

    const { data, index } = route.params

    const renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={{ uri: item }} activeOpacity={0.8} style={styles.imageContainer} resizeMode='contain'>

            </ImageBackground>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <FlatList
                data={data}
                horizontal
                renderItem={renderItem}
                initialNumToRender={10}
                initialScrollIndex={index}
                getItemLayout={(data, index) => (
                    { length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index }
                )}
                pagingEnabled={true}
                // snapToAlignment="center"
                // decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default ImageView

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.black
    }
})
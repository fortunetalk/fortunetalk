import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, SCREEN_WIDTH, Sizes } from '../assets/styles'
import MyStatusBar from '../components/MyStatusBar'

const ImageGallary = ({ navigation, route }) => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('imageView', { ...route?.params, index })} activeOpacity={0.8} style={styles.imageContainer}>
                <Image source={{ uri: item }} style={{ width: '100%', height: '100%', borderRadius: Sizes.fixPadding }} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <FlatList
                data={route?.params?.data}
                renderItem={renderItem}
                initialNumToRender={10}
                numColumns={2}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
            />
        </View>
    )
}

export default ImageGallary

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH * 0.45,
        height: SCREEN_WIDTH * 0.7,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        marginLeft: SCREEN_WIDTH * 0.032,
        elevation: 5,
        shadowColor: Colors.blackLight
    }
})
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground, } from 'react-native'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../assets/styles'
import MyStatusBar from '../components/MyStatusBar'

const ImageView = ({ route }) => {
    const { data, index } = route.params
    console.log(data)

    const renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={{ uri: item }} activeOpacity={0.8} style={[styles.imageContainer]} resizeMode='contain'>


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
            {/* <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={closeModal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.arrowLeft} onPress={handlePrevious}>
                            <Text style={styles.arrowText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: images[selectedImageIndex] }}
                            style={styles.modalImage}
                        />
                        <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
                            <Text style={styles.arrowText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal> */}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.black
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: "100%",
        height: 100,
        margin: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // zIndex: 2,
    },

});

export default ImageView;

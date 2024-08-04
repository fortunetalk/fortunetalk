import ImageView from '../../ImageView';
import React, { useEffect, useState } from 'react'
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../../assets/styles';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'

const Gallary = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [gallaryData, setGallaryData] = useState([])
    const [showImage, setShowImage] = useState(0)

    useEffect(() => {
        if (data.length > 9) {
            const newData = data.slice(0, 9)
            setGallaryData(newData)
        } else {
            setGallaryData(data)
        }

    }, [])

    if (gallaryData.length == 0) {
        return null
    }


    const renderItem = ({ item, index }) => {
        if (index === 5) {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigate('imageGallary', { data, index })}
                    style={[styles.imageContainer, { elevation: 5, shadowColor: Colors.blackLight }]}
                >
                    <Text style={{ ...Fonts._13InterMedium, textAlign: 'center', }}>Veiw{'\n'}More</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigate('imageView', { data, index })}
                style={styles.imageContainer}
            >
                <Image
                    source={{ uri: item }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: Sizes.fixPadding,
                    }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.grayLight,
                marginLeft: SCREEN_WIDTH * 0.02,
            }}>
            <Text
                style={{
                    ...Fonts.black16RobotoMedium,
                    paddingTop: Sizes.fixPadding * 1.5,
                    paddingVertical: Sizes.fixPadding * 0.5,
                }}>
                Gallery
            </Text>
            {gallaryData && <FlatList
                data={gallaryData}
                renderItem={renderItem} numColumns={3}
            />}

            {/* {modalVisible && <ImageView showImage={showImage} images={data} modalVisible={modalVisible} setModalVisible={setModalVisible} />} */}

        </View>
    );
}

export default Gallary

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        marginLeft: SCREEN_WIDTH * 0.01,
    }
})
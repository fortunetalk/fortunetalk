import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../../assets/styles';
import { navigate } from '../../../utils/navigationServices';
const Gallary = ({ data }) => {

    const [gallaryData, setGallaryData] = useState([])

    useEffect(() => {
        if (data.length > 9) {
            const newData = data.slice(0, 9)
            setGallaryData(newData)
        } else {
            setGallaryData(data)
        }

    }, [])

    if(gallaryData.length == 0){
        return null
    }


    const renderItem = ({ item, index }) => {
        if (index === 7) {
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
            }}>
            <Text
                style={{
                    ...Fonts.black16RobotoMedium,
                    paddingHorizontal: Sizes.fixPadding * 1.5,
                    paddingTop: Sizes.fixPadding * 1.5,
                }}>
                Gallery
            </Text>
            {
                gallaryData && <FlatList
                    data={gallaryData}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    numColumns={4}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding * 1.5,
                        paddingBottom: Sizes.fixPadding * 1.5,
                    }}
                    columnWrapperStyle={{}}
                />
            }

        </View>
    );
}

export default Gallary

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_WIDTH * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        marginLeft: SCREEN_WIDTH * 0.035,
        borderWidth: 2,
        borderColor: Colors.gray
    }
})
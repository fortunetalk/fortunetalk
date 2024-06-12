import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Sizes, SCREEN_WIDTH, Fonts } from '../../../assets/styles';

const Category = () => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cotainer}>
                <Text style={{ ...Fonts.white14RobotoMedium, textAlign: 'center', bottom: index == 2 ? 5 : 0 }}>
                    {item}
                </Text>
                {index == 2 && <View style={styles.bottomBorder} />}
            </TouchableOpacity>
        );
    };
    return (
        <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]}>
            <FlatList
                data={['Love', 'Love', 'Love', 'Love', 'Love', 'Love', 'Love', 'Love']}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </LinearGradient>
    );
}

export default Category

const styles = StyleSheet.create({
    cotainer: {
        width: SCREEN_WIDTH * 0.22,
        height: Sizes.fixPadding * 4.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: Sizes.fixPadding * 0.7,
        borderTopLeftRadius: Sizes.fixPadding * 0.7,
    },
    bottomBorder: {
        position: 'absolute',
        width: '100%',
        height: 8,
        bottom: 0,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 1000,
        borderTopRightRadius: 1000,
    },
});

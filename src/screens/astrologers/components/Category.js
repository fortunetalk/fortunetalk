import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors, Sizes, SCREEN_WIDTH, Fonts } from '../../../assets/styles';
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { connect } from 'react-redux';

const Category = ({ dispatch, remediesData, type, activeRemedies }) => {

    const onSelect = (item) => {
        try {
            if (item?.title.trim() == 'All') {
                dispatch(AstrologerActions.setActiveRemedies('All'))
            }else{
                dispatch(AstrologerActions.setActiveRemedies(item?._id))
            }
            dispatch(AstrologerActions.getChatCallAstrologerList({ type: type }))
        } catch (e) {
            console.log(e)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelect(item)}
                style={styles.cotainer}>
                <Text style={{ ...Fonts.white14RobotoMedium, textAlign: 'center', bottom: (activeRemedies == item?.title.trim() || activeRemedies == item?._id) ? 5 : 0 }}>
                    {item?.title}
                </Text>
                {(activeRemedies == item?.title.trim() || activeRemedies == item?._id) && <View style={styles.bottomBorder} />}
            </TouchableOpacity>
        );
    };

    return (
        <>
            {
                remediesData && <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]}>
                    <FlatList
                        data={remediesData}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </LinearGradient>
            }
        </>

    );
}

const mapStateToProps = state => ({
    remediesData: state.astrologer.remediesData,
    activeRemedies: state.astrologer.activeRemedies,

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Category)

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

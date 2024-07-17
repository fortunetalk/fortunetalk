import React from 'react';
import { connect } from 'react-redux';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import { navigate } from '../../../utils/navigationServices';

const WorkshopClass = ({ workshopWithoutId}) => {

    console.log("workshopWithoutId =====>>>>" , workshopWithoutId)


    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate("workshopOverview", { details: item })}
            style={styles.workshopCard}>
            <Image
                source={{ uri: item?.image }}
                style={styles.workshopImage}
            />

            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <Image
                        source={{ uri: item.astrologerId.profileImage }}
                        style={styles.userImage}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.workshopName}>{item?.workShopName}</Text>
                        <Text style={styles.workshopCategory}>{item.astrologerId.displayName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 12 }}>{moment(item.date).format('DD MMMM (dddd)')}</Text>
                    <Text style={{ fontSize: 10 }}>{moment(item.time, 'HH:mm').format('hh:mm A')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workshop Class</Text>
            <FlatList
                data={workshopWithoutId}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item) => item?._id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const mapStateToProps = state => ({
    workshopWithoutId: state.courses.workshopWithoutId
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopClass);

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
    },
    title: {
        ...Fonts.black16RobotoMedium,
        paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding,
    },
    listContent: {
        paddingRight: Sizes.fixPadding * 1.5,
    },
    workshopCard: {
        width: SCREEN_WIDTH * 0.7,
        marginLeft: Sizes.fixPadding * 1.5,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        marginBottom: Sizes.fixPadding * 1.5,
        shadowColor: Colors.black,
        backgroundColor: Colors.white,
    },
    workshopImage: {
        width: '100%',
        height: SCREEN_WIDTH * 0.3,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    cardContent: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: Sizes.fixPadding * 1,
        paddingVertical: Sizes.fixPadding * 1,
    },
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: Colors.gray,
    },
    userInfo: {
        paddingLeft: Sizes.fixPadding * 0.4,
    },
    workshopName: {
        ...Fonts.black14RobotoRegular,
        fontSize: 12,
    },
    workshopCategory: {
        ...Fonts.black14RobotoRegular,
        fontSize: 10,
        color: Colors.primaryLight,
    },
});

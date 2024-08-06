import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_WIDTH, Sizes } from '../../../assets/styles'

const CustomLinearGradient = (props) => {
    return (
      <LinearGradient
        {...props}
        colors={['#e9ecef', '#dee2e6']}
        // start={{x: 0.0, y: 0.5}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.5,0.6]}
      />
    );
  };

const HomeSimmer = () => {
    const renderLiveAstrologer = () => {
        return <Skeleton
            LinearGradientComponent={CustomLinearGradient}
            animation="wave"
            width={SCREEN_WIDTH * 0.28}
            height={SCREEN_WIDTH * 0.31}
            style={{ borderRadius: Sizes.fixPadding, marginRight: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
        />
    }

    const renderFreeInsights = () => {
        return <Skeleton
            LinearGradientComponent={CustomLinearGradient}
            animation="wave"
            width={SCREEN_WIDTH * 0.22}
            height={SCREEN_WIDTH * 0.22}
            style={{ borderRadius: 10000, marginRight: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
        />
    }

    const renderBoxes = ()=>{
        return <Skeleton
        LinearGradientComponent={CustomLinearGradient}
        animation="wave"
        width={SCREEN_WIDTH * 0.35}
        height={SCREEN_WIDTH * 0.4}
        style={{ borderRadius: Sizes.fixPadding, marginRight: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
    />
    }

    const renderRecentAstrologer = ()=>{
        return <Skeleton
        LinearGradientComponent={CustomLinearGradient}
        animation="wave"
        width={SCREEN_WIDTH * 0.4}
        height={SCREEN_WIDTH * 0.2}
        style={{ marginRight: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
    />
    }

    return (
        <View style={{marginBottom: Sizes.fixPadding*2}}>
            <View style={{ alignSelf: 'center' }}>
                <Skeleton
                    LinearGradientComponent={CustomLinearGradient}
                    animation="wave"
                    width={SCREEN_WIDTH * 0.95}
                    height={SCREEN_WIDTH * 0.35}
                    style={{ borderRadius: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
                />
            </View>

            <View style={{ marginTop: Sizes.fixPadding * 2, flexDirection: 'row', }}>
                <FlatList
                    data={Array.from({ length: 5 })}
                    renderItem={renderLiveAstrologer}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>

            <View style={{ marginTop: Sizes.fixPadding * 2.5, }}>
                <Skeleton
                    LinearGradientComponent={CustomLinearGradient}
                    animation="wave"
                    width={SCREEN_WIDTH * 0.4}
                    height={15}
                    style={{ borderRadius: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
                />
                <FlatList
                    data={Array.from({ length: 4 })}
                    renderItem={renderFreeInsights}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>

            <View style={{ marginTop: Sizes.fixPadding * 2.5, }}>
                <Skeleton
                    LinearGradientComponent={CustomLinearGradient}
                    animation="wave"
                    width={SCREEN_WIDTH * 0.4}
                    height={15}
                    style={{ borderRadius: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
                />
                <FlatList
                    data={Array.from({ length: 4 })}
                    renderItem={renderBoxes}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>
            <View style={{ marginTop: Sizes.fixPadding * 2.5, }}>
                <Skeleton
                    LinearGradientComponent={CustomLinearGradient}
                    animation="wave"
                    width={SCREEN_WIDTH * 0.4}
                    height={15}
                    style={{ borderRadius: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
                />
                <FlatList
                    data={Array.from({ length: 4 })}
                    renderItem={renderBoxes}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>

            <View style={{ marginTop: Sizes.fixPadding * 2.5, }}>
                <Skeleton
                    LinearGradientComponent={CustomLinearGradient}
                    animation="wave"
                    width={SCREEN_WIDTH * 0.4}
                    height={15}
                    style={{ borderRadius: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding, backgroundColor: '#e9ecef' }}
                />
                <FlatList
                    data={Array.from({ length: 4 })}
                    renderItem={renderRecentAstrologer}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>
        </View>
    )
}

export default HomeSimmer
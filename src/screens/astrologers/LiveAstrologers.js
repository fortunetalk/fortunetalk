import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import { Colors, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import MyStatusBar from '../../components/MyStatusBar';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as LiveActions from '../../redux/actions/liveActions'

const LiveAstrologers = ({navigation, customerData, dispatch}) => {
  const [liveAstroListData, setLiveAstroListData] = useState(null);
 
  useEffect(() => {
    database().ref(`LiveAstro`).on('value', snapshot => {
      if (snapshot.val()) {
        const myDataObject = snapshot.val();
        if (myDataObject) {
          const myDataArray = Object.keys(myDataObject)
            .sort()
            .map(key => JSON.parse(myDataObject[key]));
          setLiveAstroListData(myDataArray.reverse());
        }
      } else {
        setLiveAstroListData(null)
      }
    })
    return () => {
      database().ref(`LiveAstro`).off()
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
      <MyHeader title={'Live Astrologer'} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<>
            {liveAstroListData && listInfo()}
          </>}
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
        />
      </View>
    </View>
  )

  function listInfo() {
    const onPress = (item) => {
      if (!!customerData?.customerName) {
        dispatch(LiveActions.createLiveProfile(item))
      } else {
        navigation.navigate('profile')
      }
    }
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>onPress(item)} style={styles.itemContainer}>
          <ImageBackground
            source={require('../../assets/images/astro.jpg')}
            style={{ width: '100%', height: '100%' }}
          >

          </ImageBackground>
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <FlatList
          data={liveAstroListData}
          renderItem={renderItem}
          initialNumToRender={5}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
        />
      </View>
    )
  }

}

const mapStateToProps = state =>({
  customerData: state.customer.customerData
})

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(LiveAstrologers)

const styles = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.5,
    overflow: 'hidden',
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2
  }
})

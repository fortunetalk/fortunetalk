import { connect } from 'react-redux'
import React, { useState } from 'react'
import { BottomSheet } from '@rneui/themed'
import { Rating } from 'react-native-ratings'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { resetToScreen } from '../../../utils/navigationServices'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AstrologerRating = ({ dispatch, astrologerRatingData }) => {
  const [comments, setComments] = useState('')
  const [rating, setRating] = useState(3)

  const onClose = () => {
    console.log('hii')
    resetToScreen('home')
    dispatch(AstrologerActions.setAstrologerRatingData({ visible: false, data: null }))
  }

  const onRating = () => {
    const payload = {
      astrologerId: astrologerRatingData?.data?.astrologerId,
      rating: rating,
      comments: comments
    }
    dispatch(AstrologerActions.onAstrologerRating(payload))
  }

  return (
    <BottomSheet
      isVisible={astrologerRatingData?.visible}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={{ position: 'absolute', right: 10, top: 10, zIndex: 99 }}
        >
          <AntDesign name='closecircleo' color={Colors.black} size={26} />
        </TouchableOpacity>
        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayM, textAlign: 'center', marginVertical: Sizes.fixPadding * 2 }}>How was your{'\n'}experience on this chat?</Text>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: astrologerRatingData?.data?.profileImage }} style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 1000 }} />
          <Text style={{ ...Fonts._15RobotMedium, color: Colors.primaryDark }}>{astrologerRatingData?.data?.astrolgoerName}</Text>
          <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayMedium }}>(Taroat reader, Relationship)</Text>
          <Rating
            count={5}
            defaultRating={rating}
            onFinishRating={star => setRating(star)}
            size={30}
            style={{ width: '80%', justifyContent: 'space-evenly', marginVertical: Sizes.fixPadding * 2 }}
          />
          <TextInput
            placeholder='Tap to start typing...'
            placeholderTextColor={Colors.grayB}
            onChangeText={setComments}
            style={{ height: 150, backgroundColor: Colors.grayF, width: '90%', textAlignVertical: 'top', borderRadius: Sizes.fixPadding, padding: Sizes.fixPadding }}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={onRating} style={{ width: '90%', marginVertical: Sizes.fixPadding * 3 }}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primaryDark]}
              style={{ width: '100%', paddingVertical: Sizes.fixPadding, borderRadius: 1000 }}
            >
              <Text style={{ ...Fonts._18RobotoMedium, textAlign: 'center', color: Colors.white }}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const mapStateToProps = state => ({
  astrologerRatingData: state.astrologer.astrologerRatingData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerRating)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: Sizes.fixPadding * 4,
    paddingHorizontal: Sizes.fixPadding * 2
  }
})
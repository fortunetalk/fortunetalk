import React, { useState } from 'react'
import MyHeader from '../../components/MyHeader'
import CourseRegistration from './CourseRegistration'
import MyStatusBar from '../../components/MyStatusBar'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'

const CourseDetails = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const previousPagedata = route.params
    const handleNext = () => {
        setModalVisible(true)
    };

    console.log("route.params.courseData", route.params.courseData)
    console.log("route.params.classdetails", route.params.classdetails)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <MyHeader
                title={previousPagedata.courseData?.title ||
                    previousPagedata?.courseData?.workShopName}
            />
            <FlatList
                ListHeaderComponent={
                    <>
                        {courseAbout()}
                        {proceedButton()}
                        <CourseRegistration
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onNext={handleNext}
                        />
                    </>
                }
            />
        </View>
    )

    function courseAbout() {
        return (
            <View style={{ flex: 1, paddingHorizontal: 20 }} >
                <View style={{ paddingVertical: 10 }} >
                    <Text style={{ ...Fonts.black16RobotoMedium, paddingBottom: 5, fontSize: 16 }}>
                        About {previousPagedata.courseData?.title || previousPagedata.courseData?.workShopName}
                    </Text>
                    <Text style={{ ...Fonts.black14InterMedium, color: Colors.grayA, fontSize: 12 }}>
                        {previousPagedata.classdetails?.description}
                    </Text>
                </View>

                <View style={{ paddingBottom: 20 }} >
                    <Text style={{ ...Fonts.black16RobotoMedium, paddingBottom: 5, fontSize: 16 }}>Learn and Earn</Text>
                    <Text style={{ ...Fonts.black14InterMedium, color: Colors.grayA, fontSize: 12 }}>
                        {previousPagedata.courseData?.learnEarn}
                    </Text>
                </View>
            </View>
        )
    }

    function proceedButton() {
        return (
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{
                    width: '70%',
                    borderRadius: Sizes.fixPadding * 1.5,
                    alignSelf: 'center',
                    marginVertical: Sizes.fixPadding,
                    overflow: 'hidden',
                }}>
                <TouchableOpacity
                    onPress={() => handleNext()}
                    activeOpacity={0.8}
                    style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                        Proceed
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

export default CourseDetails

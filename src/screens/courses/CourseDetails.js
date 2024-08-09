import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import CourseRegistration from './CourseRegistration'
import MyStatusBar from '../../components/MyStatusBar'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '../../utils/navigationServices'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import * as CourseActions from '../../redux/actions/courseActions'
import { Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'

const CourseDetails = ({
    route,
    dispatch,
    customerData,
    demoClassBooked,
    isRegisterForLive
}) => {
    const previousPagedata = route.params
    const customerId = customerData?._id
    const classId = previousPagedata.classdetails._id
    const courseId = previousPagedata.courseData?._id
    const astrologerId = previousPagedata.classdetails?.astrologerId?._id

    const [state, setState] = useState({
        name: customerData?.customerName,
        phoneNumber: customerData?.phoneNumber,
        modalVisible: false,
    })
    const { name, phoneNumber, modalVisible } = state

    useEffect(() => {
        if (previousPagedata.title == "Demo") {
            dispatch(CourseActions.demoClassBooked({
                demoClassId: classId,
                customerId,
            }))
        } else {
            dispatch(CourseActions.onIsRegisterLiveClass({
                liveClassId: classId,
                customerId,
            }))
        }
    }, [])

    const handleNext = () => {
        if (previousPagedata.title == "Demo") {
            if (demoClassBooked) {
                navigate("classOverview", {
                    id: classId,
                    title: previousPagedata.title
                })
            } else {
                updateState({ modalVisible: true })
            }
        }
        else {
            if (isRegisterForLive == true) {
                navigate("liveclassdetails", {
                    id: classId,
                    title: previousPagedata.title
                })
            } else {
                updateState({ modalVisible: true })
            }
        }
    };

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const handleRegistration = () => {
        if (name.length < 1) {
            Alert.alert("Name Required")
        } else if (phoneNumber.length < 9) {
            Alert.alert("Phone Number Required")
        } else {
            if (previousPagedata.title == "Demo") {
                dispatch(CourseActions.bookdemoClass({
                    customerName: name,
                    mobileNumber: phoneNumber,
                    astrologerId,
                    demoClassId: classId,
                    courseId,
                    customerId,
                    navigateUrl: "classOverview"
                }))
            } else if (previousPagedata.title == "Live") {
                dispatch(CourseActions.onRegisterLiveClass({
                    courseId,
                    liveClassId: classId,
                    astrologerId,
                    customerId,
                    customerName: name,
                    mobileNumber: phoneNumber,
                    amount: 1000,
                    paymentType: "pending"
                }))
            }
        }
        updateState({ modalVisible: false })
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <MyHeader
                title={previousPagedata.courseData?.title}
            />
            <FlatList
                ListHeaderComponent={
                    <>
                        {courseAbout()}
                        {proceedButton()}
                    </>
                }
            />
            <CourseRegistration
                visible={modalVisible}
                onClose={() => updateState({ modalVisible: false })}
                handleRegistration={handleRegistration}
                updateState={updateState}
                name={name}
                phoneNumber={phoneNumber}
                openLocation={previousPagedata.title}
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

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading,
    customerData: state.customer.customerData,
    demoClassBooked: state.courses.demoClassBooked,
    registerDemoclass: state.courses.registerDemoclass,
    isRegisterForLive: state.courses.isRegisterForLive
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)

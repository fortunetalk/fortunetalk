import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import ImagePicker from '../../components/ImagePicker';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CountryPicker from 'rn-country-picker';
import { Colors, Sizes, Fonts, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../assets/styles';
import { genderData, occupationData, problemData, regex } from '../../config/data';
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { showToastMessage } from '../../utils/services';
import RNFetchBlob from 'rn-fetch-blob';
import * as AuthActions from '../../redux/actions/authActions'
import Loader from '../../components/Loader';
import { base_url } from '../../config/constants';
import * as SettingActions from '../../redux/actions/settingActions'

const Profile = ({ navigation, locationData, customerData, dispatch, isLoading }) => {
    const [state, setState] = useState({
        firstName: customerData?.firstName ?? '',
        lastName: customerData?.lastName ?? '',
        email: customerData?.email ?? '',
        gender: customerData?.gender ?? '',
        phoneNumber: '',
        callingCode: '91',
        cca2: 'IN',
        genderFocus: false,
        birthDate: customerData?.dateOfBirth ?? null,
        calenderVisible: false,
        timeVisible: false,
        time: customerData?.timeOfBirth ?? null,
        address: null,
        currentAddress: null,
        profileImage:null,
        baseSixtyFour: null,
        bottomSheetVisible: false,
        selectedOccupation: customerData?.occupation ?? null,
        occupationFocus: false,
        selectedProblem: customerData?.problem ?? null,
        problemFocus: false,
    });

    console.log("customerData ===>>>>>>" , customerData)

    useEffect(() => {
        if (customerData && customerData?.birthPlaceAddress) {
            dispatch(SettingActions.setLocationData({ address: customerData?.birthPlaceAddress?.birthPlace, latitude: customerData?.birthPlaceAddress?.latitude, longitude: customerData?.birthPlaceAddress?.longitude }))
        }
        return () => {
            dispatch(SettingActions.setLocationData(null))
        }

    }, [])

    const updateState = data => {
        setState(prevState => {
            const newState = { ...prevState, ...data };
            return newState;
        });
    };

    const {
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        genderFocus,
        birthDate,
        calenderVisible,
        timeVisible,
        time,
        baseSixtyFour,
        profileImage,
        bottomSheetVisible,
        selectedOccupation,
        occupationFocus,
        selectedProblem,
        problemFocus,
        address,
        currentAddress,
        callingCode,
        cca2,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <View style={{ flex: 1 }}>

                <FlatList
                    ListHeaderComponent={
                        <>
                            {header()}
                            {gapInsert()}
                            {profileImageInfo()}
                            {firstNameLastNameInfo()}
                            {emailInfo()}
                            {phoneInput()}
                            {GenderBirthInfo()}
                            {TimeBirthBirthPlaceInfo()}
                            {currentAddresInfo()}
                            {occupationInfo()}
                            {problemInfo()}
                            {proceedButton()}
                        </>
                    }
                />
            </View>
            {bottomSheetInfo()}
        </View>
    );

    function bottomSheetInfo() {
        return (
            <ImagePicker
                visible={bottomSheetVisible}
                onBackPress={() => updateState({ bottomSheetVisible: false })}
                onImagePick={(uri) => updateState({ profileImage: uri, bottomSheetVisible: false })}
            />
        );
    }

    function proceedButton() {

        console.log("firstName" , firstName)
        console.log("currentAddress ===>>>" , currentAddress)

        const onUpdate = () => {
            if (firstName.length == 0) {
                showToastMessage({ message: 'Please enter your first name' })
                return
            } else if (regex.name.test(firstName) && firstName.length >= 2 && firstName.length <= 50) {
                showToastMessage({ message: 'Please enter valid first name' })
                return
            } else if (lastName.length == 0) {
                showToastMessage({ message: 'Please enter your last name' })
                return
            } else if (regex.name.test(lastName) && lastName.length >= 2 && lastName.length <= 50) {
                showToastMessage({ message: 'Please enter valid last name' })
                return
            } else if (!gender) {
                showToastMessage({ message: 'Please select a gender' })
                return
            } else if (!birthDate) {
                showToastMessage({ message: 'Please select a birth date' })
                return
            } else if (!time) {
                showToastMessage({ message: 'Please select a birth time' })
                return
            } else if (!locationData) {
                showToastMessage({ message: 'Please select a birth place' })
                return
            } else if (!currentAddress) {
                showToastMessage({ message: 'Please enter a current city' })
                return
            } else if (!selectedOccupation) {
                showToastMessage({ message: 'Please select an occupation' })
                return
            } else if (!selectedProblem) {
                showToastMessage({ message: 'Please select a problem' })
                return
            } else {
                const payload = [
                    { name: 'customerId', data: customerData?._id },
                    { name: 'firstName', data: firstName },
                    { name: 'lastName', data: lastName },
                    { name: 'email', data: email },
                    { name: 'gender', data: gender },
                    { name: 'city', data: currentAddress },
                    { name: 'birthPlace', data: locationData?.address },
                    { name: 'latitude', data: locationData?.latitude.toString() },
                    { name: 'longitude', data: locationData?.longitude.toString() },
                    { name: 'dateOfBirth', data: birthDate.toString() },
                    { name: 'timeOfBirth', data: time.toString() },
                    { name: 'occupation', data: selectedOccupation },
                    { name: 'problem', data: selectedProblem },
                    { name: 'type', data: 'update' },
                ]

                if (profileImage) {
                    payload.push({
                        name: 'profileImage',
                        filename: 'user_profile.jpg',
                        type: 'image/jpg',
                        data: RNFetchBlob.wrap(profileImage)
                    })
                }
                console.log(payload)
                dispatch(AuthActions.onCustomerRegistration(payload))

            }
        }
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
                    onPress={onUpdate}
                    activeOpacity={0.8}
                    style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                        Update
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    function problemInfo() {
        const renderItem = (item, selected) => {
            return (
                <View
                    style={{
                        padding: Sizes.fixPadding,
                        borderBottomWidth: item._index + 1 != 1 ? 1 : 0,
                        borderColor: Colors.gray,
                        backgroundColor: Colors.white,
                    }}>
                    <Text
                        style={
                            selected
                                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
                        }>
                        {item.label}
                    </Text>
                </View>
            );
        };
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding * 2,
                }}>
                <View style={{ flex: 0.25 }}>
                    <Text style={{ ...Fonts.gray14RobotoMedium }}>Problem</Text>
                </View>

                <Dropdown
                    style={[
                        styles.dropdown,
                        problemFocus && { borderColor: Colors.primaryLight },
                        { flex: 0.6 },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.dropdownContainer}
                    iconStyle={styles.iconStyle}
                    data={problemData}
                    maxHeight={300}
                    dropdownPosition="top"
                    labelField="label"
                    valueField="value"
                    placeholder={!problemFocus ? 'Select an Option' : '...'}
                    value={selectedProblem}
                    onFocus={() => updateState({ problemFocus: true })}
                    onBlur={() => updateState({ problemFocus: false })}
                    onChange={item => {
                        updateState({ selectedProblem: item.value, problemFocus: false });
                    }}
                    renderItem={renderItem}
                />
            </View>
        );
    }

    function occupationInfo() {
        const renderItem = (item, selected) => {
            return (
                <View
                    style={{
                        padding: Sizes.fixPadding,
                        borderBottomWidth: item._index + 1 == 1 ? 0 : 1,
                        borderColor: Colors.gray,
                        backgroundColor: Colors.white,
                    }}>
                    <Text
                        style={
                            selected
                                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
                        }>
                        {item.label}
                    </Text>
                </View>
            );
        };
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginHorizontal: Sizes.fixPadding * 2,
                }}>
                <View style={{ flex: 0.25 }}>
                    <Text style={{ ...Fonts.gray14RobotoMedium }}>Occupation</Text>
                </View>

                <Dropdown
                    style={[
                        styles.dropdown,
                        occupationFocus && { borderColor: Colors.primaryLight },
                        { flex: 0.6 },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.dropdownContainer}
                    iconStyle={styles.iconStyle}
                    data={occupationData}
                    dropdownPosition="top"
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!occupationFocus ? 'Select an Option' : '...'}
                    value={selectedOccupation}
                    onFocus={() => updateState({ occupationFocus: true })}
                    onBlur={() => updateState({ occupationFocus: false })}
                    onChange={item => {
                        updateState({
                            selectedOccupation: item.value,
                        });
                    }}
                    renderItem={renderItem}
                />
            </View>
        );
    }

    function currentAddresInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Input
                    value={currentAddress}
                    placeholder="Current City"
                    numberOfLines={2}
                    placeholderTextColor={Colors.grayDark}
                    onChangeText={text => updateState({ currentAddress: text })}
                    containerStyle={{ flex: 0.45, padding: 0 }}
                    inputContainerStyle={{ height: 30, borderBottomColor: Colors.gray }}
                    inputStyle={{ ...Fonts._13RobotoMedium, fontSize: 14, color: Colors.blackLight, }}
                />
            </View>
        );
    }

    function TimeBirthBirthPlaceInfo() {
        const onSetTime = data => {
            updateState({ timeVisible: false });
            if (data.type == 'set') {
                updateState({ time: data.nativeEvent.timestamp });
            }
        };

        const show_time = () => {
            DateTimePickerAndroid.open({
                value: time == null ? new Date() : new Date(time),
                mode: 'time',
                is24Hour: false,
                onChange: onSetTime,
            });
        };
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            color: 'black',
                            top: Sizes.fixPadding * 1.5,
                            marginHorizontal: Sizes.fixPadding * 3,
                        }}>
                        {' '}
                        Time of Birth
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            top: Sizes.fixPadding * 1.5,
                            marginHorizontal: Sizes.fixPadding * 4.7,
                        }}>
                        {' '}
                        Address
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        margin: Sizes.fixPadding * 2,
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => show_time()}
                        style={{
                            ...styles.dropdown,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...Fonts._13RobotoMedium, color: Colors.grayDark, }}>
                            {time == null ? 'Birth Time' : moment(time).format('hh:mm A')}{' '}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            color={Colors.black + '90'}
                            size={16}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('searchLocation')}
                        style={{
                            ...styles.dropdown,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            numberOfLines={1}
                            style={{ ...Fonts._13RobotoMedium, color: Colors.grayDark, flex: 1 }}>
                            {locationData == null
                                ? 'Birth Place'
                                : locationData?.address}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function GenderBirthInfo() {
        const renderItem = (item, selected) => {
            return (
                <View
                    style={{
                        padding: Sizes.fixPadding,
                        borderBottomWidth: item._index + 1 != 3 ? 1 : 0,
                        borderColor: Colors.gray,
                        backgroundColor: Colors.white,
                    }}>
                    <Text
                        style={
                            selected
                                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
                        }>
                        {item.label}
                    </Text>
                </View>
            );
        };

        const onChange = gender => {
            updateState({ gender: gender.value });
        };

        const onSetDate = (event, date) => {
            if (event.type == 'set') {
                updateState({ birthDate: date });
            }
        };

        const show_date = () => {
            DateTimePickerAndroid.open({
                value: birthDate == null ? new Date() : new Date(birthDate),
                maximumDate: new Date(),
                minimumDate: new Date(1900, 1, 1),
                mode: 'date',
                display: 'calendar',
                onChange: onSetDate,
            });
        };

        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            color: 'black',
                            marginHorizontal: Sizes.fixPadding * 3,
                            marginBottom: Sizes.fixPadding * 0.5,
                        }}>
                        Gender
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            marginHorizontal: Sizes.fixPadding * 8.7,
                            marginBottom: Sizes.fixPadding * 0.5,
                        }}>
                        Date Of Birth
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginHorizontal: Sizes.fixPadding * 2,
                    }}>
                    <Dropdown
                        style={[
                            styles.dropdown,
                            genderFocus && { borderColor: Colors.primaryLight },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        containerStyle={styles.dropdownContainer}
                        iconStyle={styles.iconStyle}
                        data={genderData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!genderFocus ? 'Gender' : '...'}
                        value={gender}
                        onFocus={() => updateState({ genderFocus: true })}
                        onBlur={() => updateState({ genderFocus: false })}
                        onChange={onChange}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => show_date()}
                        style={{
                            ...styles.dropdown,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...Fonts._13RobotoMedium, color: Colors.grayDark }}>
                            {' '}
                            {birthDate == null
                                ? 'Birth Date'
                                : moment(birthDate).format('Do MMM YYYY')}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            color={Colors.black + '90'}
                            size={16}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function phoneInput() {
        return (
            <Input
                editable={customerData?.phoneNumber.length == 0}
                value={customerData?.phoneNumber}
                placeholder="Enter Mobile No."
                placeholderTextColor={Colors.grayDark}
                keyboardType="number-pad"
                maxLength={10}
                inputContainerStyle={styles.inputContainer}
                containerStyle={{ height: 60 }}
                inputStyle={{ ...Fonts._15RobotoRegular, color: Colors.blackLight }}
                leftIcon={
                    <View style={styles.flagContainer}>
                        <CountryPicker
                            // disable
                            countryCode={callingCode}
                            pickerTitleStyle={styles.pickerTitleStyle}
                            pickerContainerStyle={styles.pickerStyle}
                            dropDownIconStyle={{ width: 0 }}
                            countryFlagStyle={{
                                borderRadius: 4,
                                width: 30,
                                height: 20,
                                resizeMode: 'cover',
                                overflow: 'hidden'
                            }}

                            selectedValue={text => {
                                updateState({ callingCode: text.callingCode, cca2: text.cca2 })
                            }}
                        />
                    </View>
                }
            />
        );
    }

    function emailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2, height: 45 }}>
                <Input
                    value={email}
                    placeholder="Email address"
                    placeholderTextColor={Colors.grayDark}
                    keyboardType="email-address"
                    onChangeText={text => updateState({ email: text })}
                    containerStyle={{ flex: 0.45, padding: 0 }}
                    inputContainerStyle={{ height: 30, borderBottomColor: Colors.grayDark }}
                    inputStyle={{ ...Fonts._15RobotoRegular, color: Colors.blackLight }}
                />
            </View>
        );
    }

    function firstNameLastNameInfo() {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding * 2,
                    justifyContent: 'space-between',
                    marginTop: Sizes.fixPadding,
                    height: 40,
                }}>
                <Input
                    value={firstName}
                    placeholder="First Name"
                    placeholderTextColor={Colors.grayDark}
                    onChangeText={text => updateState({ firstName: text })}
                    containerStyle={{ flex: 0.45, padding: 0 }}
                    inputContainerStyle={{ height: 30, borderBottomColor: Colors.grayDark }}
                    inputStyle={{ ...Fonts._15RobotoRegular, color: Colors.blackLight }}
                />

                <Input
                    value={lastName}
                    placeholder="Last Name"
                    placeholderTextColor={Colors.grayDark}
                    onChangeText={text => updateState({ lastName: text })}
                    containerStyle={{ flex: 0.45, borderBottomColor: Colors.primaryDark }}
                    inputContainerStyle={{ height: 30, borderBottomColor: Colors.grayDark }}
                    inputStyle={{ ...Fonts._15RobotoRegular, color: Colors.blackLight }}
                />
            </View>
        );
    }

    function profileImageInfo() {
        return (
            <TouchableOpacity
                onPress={() => updateState({ bottomSheetVisible: true })}
                activeOpacity={0.8}
                style={styles.imageContainer}>
                <Image
                    source={{ uri: !profileImage ? profileImage : base_url + customerData?.profileImage }}
                    style={{ width: '100%', height: '100%' }}
                />
            </TouchableOpacity>
        );
    }

    function gapInsert() {
        return <View style={{ marginBottom: -SCREEN_HEIGHT * 0.83 }} />;
    }

    function header() {
        return (
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                locations={[0.8, 1]}
                style={{
                    padding: Sizes.fixPadding,
                    borderRadius: 1000,
                    width: '180%',
                    alignSelf: 'center',
                    height: SCREEN_HEIGHT,
                    top: -SCREEN_HEIGHT * 0.77,
                }}>
                <View style={{ width: '55%', alignSelf: 'center', top: SCREEN_HEIGHT * 0.77 }}>
                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
                            style={{
                                padding: Sizes.fixPadding * 0.5,
                                alignSelf: 'flex-start',
                            }}>
                            <AntDesign
                                name="leftcircleo"
                                color={Colors.white}
                                size={Sizes.fixPadding * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => customer_profile('skip')}
                            style={{
                                padding: Sizes.fixPadding * 0.5,
                                alignSelf: 'flex-start',
                            }}>
                            {/* <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 15 }}>Skip</Text> */}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            ...Fonts.white18RobotMedium,
                            fontSize: 20,
                            textAlign: 'center',
                            marginVertical: Sizes.fixPadding * 2,
                        }}>
                        {`${customerData?.firstName ?? 'Hii'} ${customerData?.lastName ?? 'User'}`}
                    </Text>
                </View>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    locationData: state.settings.locationData,
    isLoading: state.settings.isLoading,
    customerData: state.customer.customerData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderRadius: 1000,
        borderWidth: 4,
        overflow: 'hidden',
        borderColor: Colors.white,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        marginBottom: Sizes.fixPadding,
        shadowColor: Colors.blackLight,
    },
    inputContainer: {
        marginHorizontal: Sizes.fixPadding * 2,
        borderWidth: 1,
        borderColor: Colors.grayDark,
        borderRadius: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: 0,
        height: 45,
        overflow: 'hidden'
    },
    dropdown: {
        flex: 0.45,
        height: 35,
        borderColor: Colors.grayDark,
        borderWidth: 1.2,
        borderRadius: Sizes.fixPadding * 1.5,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        borderRadius: Sizes.fixPadding,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.gray,
        // width: '90%',
        alignSelf: 'flex-start',
        marginTop: Sizes.fixPadding * 0.5,
        overflow: 'hidden',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        ...Fonts._13RobotoMedium, color: Colors.grayDark
    },
    selectedTextStyle: {
        ...Fonts._13RobotoMedium, color: Colors.grayDark
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        position: 'relative',
    },
    timeOption: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        borderRadius: 20,
    },
    selectedTime: {
        marginTop: 20,
        fontSize: 20,
    },
    flagContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: Colors.grayDark,
    },
    socialButton: {
        flex: 0,
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 0.8,
        borderRadius: Sizes.fixPadding,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        color: '#000',
        fontSize: 25,
        marginBottom: 25,
        fontWeight: 'bold',
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    pickerStyle: {
        height: 40,
        width: 50,
        marginVertical: 10,
        borderRadius: 0,
        borderWidth: 0,
        fontSize: 16,
        color: "#000",
    },
    selectedCountryTextStyle: {
        // paddingLeft: 5,
        color: '#000',
        textAlign: 'right',
    },

    countryNameTextStyle: {
        // paddingLeft: 10,
        color: '#000',
        textAlign: 'right',
    },

    searchBarStyle: {
        flex: 1,
    },
});

import { useState } from "react";
import Stars from 'react-native-stars';
import Loader from "../../components/Loader";
import MyStatusBar from "../../components/MyStatusBar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from "../../assets/styles";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import MyHeader from "../../components/MyHeader";

function RateProduct() {
    const [state, setState] = useState({
        ratingStar: 3,
        isLoading: false,
        reviewMessage: ""
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const add_review = () => {

    }

    const { ratingStar, isLoading, reviewMessage } = state
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <MyHeader title={"Rate the Product"} />
            <View
                style={{
                    margin: Sizes.fixPadding * 2,
                    marginTop: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding,
                    overflow: 'hidden',
                }}>
                <Image
                    source={require("../../assets/images/astro.jpg")}
                    style={{
                        width: '100%',
                        height: SCREEN_WIDTH * 0.6,
                        resizeMode: 'cover',
                        borderRadius: 10
                    }}
                />
            </View>
            <View
                style={{
                    backgroundColor: Colors.white,
                    marginHorizontal: Sizes.fixPadding * 1.5,
                    borderTopLeftRadius: Sizes.fixPadding * 3,
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
                        15 Ratti Amethyst
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoMedium }}>
                        durgesh chaudhary is good boy
                    </Text>
                    <View style={{
                        marginVertical: Sizes.fixPadding * 1.5,
                        borderWidth: 1, borderColor: Colors.grayC + "25",
                        paddingHorizontal: Sizes.fixPadding * 7,
                        paddingVertical: Sizes.fixPadding,
                        borderRadius: 10
                    }}>
                        <Stars
                            default={ratingStar}
                            count={5}
                            half={true}
                            starSize={32}
                            update={val => updateState({ ratingStar: val })}
                            fullStar={
                                <Ionicons
                                    name={'star'}
                                    size={32}
                                    color={Colors.primaryLight}
                                />
                            }
                            emptyStar={
                                <Ionicons
                                    name={'star-outline'}
                                    size={32}
                                    color={Colors.primaryLight}
                                />
                            }
                            halfStar={
                                <Ionicons
                                    name={'star-half'}
                                    size={32}
                                    color={Colors.primaryLight}
                                />
                            }
                        />
                    </View>
                    <Text style={{ ...Fonts.gray16RobotoMedium, fontSize: 14 }}>Share Your experience about our product</Text>
                    <TextInput
                        value={reviewMessage}
                        placeholder="Tap to start typing"
                        placeholderTextColor={Colors.gray}
                        onChangeText={text => updateState({ reviewMessage: text })}
                        multiline
                        style={{
                            width: '90%',
                            padding: Sizes.fixPadding,
                            backgroundColor: Colors.grayLight,
                            marginVertical: Sizes.fixPadding * 1.5,
                            ...Fonts.black14InterMedium,
                            height: 150,
                            textAlignVertical: 'top',
                            borderRadius: Sizes.fixPadding,
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width: '80%'}}
                        onPress={add_review}>
                        <LinearGradient
                            colors={[Colors.primaryLight, Colors.primaryDark]}
                            style={{
                                width: '100%',
                                paddingVertical: Sizes.fixPadding,
                                borderRadius: 1000,
                                marginVertical: Sizes.fixPadding * 2,
                            }}>
                            <Text
                                style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
                                Proceed for Payment
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RateProduct
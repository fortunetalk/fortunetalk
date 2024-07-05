import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { goBack } from '../../../utils/navigationServices';
import { Colors, Sizes, Fonts } from '../../../assets/styles';

const ChatHeader = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Sizes.fixPadding*1.5, paddingVertical: Sizes.fixPadding*1.3 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()} >
                <AntDesign
                    name="leftcircleo"
                    color={Colors.primaryDark}
                    size={Sizes.fixPadding * 2}
                />
            </TouchableOpacity>
            <Text style={{ ...Fonts._15RobotMedium, color: Colors.orange, textAlign: 'center' }}>Astro Guruji</Text>
            <TouchableOpacity>
                <Image source={require('../../../assets/icons/share.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
            </TouchableOpacity>

        </View>
    )
}

export default ChatHeader
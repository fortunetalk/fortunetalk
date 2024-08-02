import { Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Sizes, Fonts } from "../assets/styles";

const GlobalButton = ({ handlePress, ButtonName }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={{
                marginVertical: Sizes.fixPadding,
                borderRadius: Sizes.fixPadding * 1.5,
                overflow: 'hidden',
            }}>
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{
                    paddingVertical: Sizes.fixPadding * 1,
                    paddingHorizontal: Sizes.fixPadding * 1.5
                }}
            >
                <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
                    {ButtonName}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default GlobalButton

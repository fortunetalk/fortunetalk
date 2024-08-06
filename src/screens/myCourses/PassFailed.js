import React from 'react';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const PassFailed = ({
    visible,
    onClose,
    handleContinue,
    submittedMcq
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View
                        style={{
                            borderColor: Colors.primaryLight,
                            borderWidth: 2,
                            padding: Sizes.fixPadding * 0.8,
                            borderRadius: 10,
                            marginHorizontal: Sizes.fixPadding * 1,
                            marginVertical: Sizes.fixPadding * 1,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ padding: 3, color: Colors.primaryDark, fontSize: 18, fontWeight: "600" }}>Tarot Card reading</Text>
                        <Text style={{ padding: 3, color: Colors.gray }}>Master your Psychic Ability and Learn to Give Accurate</Text>
                    </View>

                    {!submittedMcq?.result?.isPassed &&
                        <View>
                            <View style={{ backgroundColor: Colors.red, alignItems: "center", paddingVertical: Sizes.fixPadding }} >
                                <Text style={{ fontSize: 20, color: Colors.white, fontWeight: "700" }}>Failed</Text>
                            </View>

                            <View style={{ padding: Sizes.fixPadding * 0.8 }} >
                                <Text
                                    style={{
                                        ...Fonts.white18RobotMedium,
                                        textAlign: 'center',
                                        fontSize: 24,
                                        color: Colors.red,
                                        fontWeight: "700"
                                    }}>{submittedMcq?.result?.marksObtained}/{submittedMcq?.result?.maxMarks}</Text>
                                <Text
                                    style={{
                                        ...Fonts.white18RobotMedium,
                                        textAlign: 'center',
                                        fontSize: 18,
                                        color: Colors.gray
                                    }}>Score</Text>
                            </View>

                            <View style={{ alignItems: "center" }} >
                                <Text style={{ color: Colors.red, fontSize: 16, fontWeight: "600" }} >You have been Failed</Text>
                            </View>

                            <LinearGradient
                                colors={[Colors.red, Colors.red]}
                                style={{
                                    width: '70%',
                                    borderRadius: Sizes.fixPadding * 2,
                                    alignSelf: 'center',
                                    marginVertical: Sizes.fixPadding,
                                    overflow: 'hidden',
                                }}>
                                <TouchableOpacity
                                    onPress={() => handleContinue()}
                                    activeOpacity={0.8}
                                    style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
                                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                                        Retest Again
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    }

                    {submittedMcq?.result?.isPassed &&
                        <View>
                            <View style={{ backgroundColor: Colors.primaryDark, alignItems: "center", paddingVertical: Sizes.fixPadding }} >
                                <Text style={{ fontSize: 20, color: Colors.white, fontWeight: "700" }}>Congratulation !!</Text>
                            </View>

                            <View style={{ padding: Sizes.fixPadding * 0.8 }} >
                                <Text
                                    style={{
                                        ...Fonts.white18RobotMedium,
                                        textAlign: 'center',
                                        fontSize: 24,
                                        color: Colors.red,
                                        fontWeight: "700"
                                    }}>{submittedMcq?.result?.marksObtained}/{submittedMcq?.result?.maxMarks}</Text>
                                <Text
                                    style={{
                                        ...Fonts.white18RobotMedium,
                                        textAlign: 'center',
                                        fontSize: 18,
                                        color: Colors.gray
                                    }}>Score</Text>
                            </View>

                            <View style={{ alignItems: "center" }} >
                                <Text style={{ color: Colors.greenDark, fontSize: 16, fontWeight: "600" }} >You have been Passed</Text>
                            </View>

                            <View
                                style={{
                                    width: '70%',
                                    borderRadius: Sizes.fixPadding * 2,
                                    alignSelf: 'center',
                                    marginVertical: Sizes.fixPadding,
                                    overflow: 'hidden',
                                    backgroundColor: submittedMcq?.result?.isPassed ? Colors.greenDark : Colors.red
                                }}>
                                <TouchableOpacity
                                    onPress={() => handleContinue()}
                                    activeOpacity={0.8}
                                    style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
                                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '80%'
    },
});

export default PassFailed;

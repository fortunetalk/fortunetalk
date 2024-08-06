import React from 'react';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const McqInstruction = ({
    visible,
    onClose,
    handleContinue,
    questions,
    time,
    marks
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
                    <Text style={styles.modalTitle}>Instruction</Text>
                    <View
                        style={{
                            borderColor: Colors.primaryLight,
                            borderWidth: 2,
                            padding: Sizes.fixPadding * 0.8,
                            borderRadius: 10
                        }}
                    >
                        <Text style={{ padding: 3, color: Colors.gray }}>• Welcome to Online Exam for General Aptitude Exam</Text>
                        <Text style={{ padding: 3, color: Colors.gray }}>• Exam has Total {questions} Questions</Text>
                        <Text style={{ padding: 3, color: Colors.gray }}>• Total Marks {marks}</Text>
                        <Text style={{ padding: 3, color: Colors.gray }}>• Total Time for Exam is {time} Minutes</Text>
                    </View>

                    <View style={{
                        padding: Sizes.fixPadding * 0.8,
                    }} >
                        <Text
                            style={{
                                ...Fonts.white18RobotMedium,
                                textAlign: 'center',
                                fontSize: 18,
                                color: Colors.greenDark
                            }}>Best Of Luck !!</Text>
                    </View>

                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
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
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
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
        padding: 15,
        borderRadius: 10,
        width: '80%'
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.primaryDark,
        fontWeight:"700"
    },
});

export default McqInstruction;

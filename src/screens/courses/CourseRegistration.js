import React from 'react';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const CourseRegistration = ({
    visible,
    onClose,
    handleRegistration,
    updateState,
    phoneNumber,
    name
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <TouchableOpacity style={{
                    justifyContent: "flex-start",
                    position: 'absolute',
                    top: Sizes.fixPadding * 16,
                    left: Sizes.fixPadding * 2,
                    zIndex: 1,
                }} onPress={() => onClose()} >
                    <AntDesign name='closecircleo' size={20} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter the details</Text>
                    <View
                        style={{
                            borderColor: Colors.grayLight,
                            borderWidth: 1,
                            padding: Sizes.fixPadding * 0.8,
                            borderRadius: 10
                        }} >
                        <Text style={{ padding: 5 }}>Name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={name}
                            onChangeText={text => updateState({ name: text })}
                        />
                        <Text style={{ padding: 5 }}>Phone Number</Text>
                        <TextInput
                            style={styles.inputField}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={text => updateState({ phoneNumber: text })}
                        />
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
                            onPress={() => handleRegistration()}
                            activeOpacity={0.8}
                            style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
                            <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                                Next
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
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.red
    },
    inputField: {
        backgroundColor: Colors.grayLight,
        borderRadius: 10,
        padding: 5,
        marginBottom: 10
    },
    nextButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default CourseRegistration;

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    Text,
} from 'react-native';
import { Colors } from '../assets/styles';

const ImageView = ({ modalVisible, setModalVisible, images, showImage }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(showImage);

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleNext = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={closeModal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.arrowLeft} onPress={handlePrevious}>
                            <Text style={styles.arrowText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: images[selectedImageIndex] }}
                            style={styles.modalImage}
                        />
                        <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
                            <Text style={styles.arrowText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: "100%",
        height: 100,
        margin: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // zIndex: 2,
    },
    modalImage: {
        width: 350,
        height: 300,
        borderRadius:15,
    },
    arrowLeft: {
        position: 'absolute',
        left: 0,
        top: "50%",
        transform: [{ translateY: -15 }],
        padding: 10,
        zIndex:1
    },
    arrowRight: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: [{ translateY: -15 }],
        padding: 10,
    },
    arrowText: {
        color: Colors.black,
        fontSize: 50,
    },
});

export default ImageView;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Loader from '../../components/Loader';
import MyStatusBar from '../../components/MyStatusBar';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import { formatMCQData } from '../../utils/tools';
import LinearGradient from 'react-native-linear-gradient';
import PassFailed from './PassFailed';

const MCQTest = ({ isLoading, getMCQ }) => {
    const [mcqs, setMcqs] = useState(getMCQ && formatMCQData(getMCQ?.mcqs));
    const [modal, setModal] = useState(true)
    
    const handleAnswerSelect = (questionId, selectedChoiceId) => {
        const updatedMcqs = mcqs.map(mcq => {
            if (mcq._id === questionId) {
                return {
                    ...mcq,
                    choices: mcq.choices.map(choice => ({
                        ...choice,
                        isCorrect: choice._id === selectedChoiceId
                    }))
                };
            }
            return mcq;
        });
        setMcqs(updatedMcqs);
    };

    const handleContinue = () => {

    }

    const handleSubmit = () => {
        setModal(true)
    }

    console.log("mcq state", mcqs)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }} >
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <MyHeader title={"MCQ Test"} />
            <Loader visible={isLoading} />
            <FlatList
                data={mcqs}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}> {index + 1}. {item.question}</Text>
                        {item.choices.map(choice => (
                            <TouchableOpacity
                                key={choice._id}
                                style={styles.choiceButton}
                                onPress={() => handleAnswerSelect(item._id, choice._id)}
                            >
                                <RadioButton
                                    value="second"
                                    status={choice.isCorrect ? 'checked' : 'unchecked'}
                                    onPress={() => handleAnswerSelect(item._id, choice._id)}
                                />
                                <Text style={styles.choiceText}>{choice.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />
            {Submitbtn()}
            <PassFailed
                visible={modal}
                onClose={() => setModal(false)} />
        </View>
    );

    function Submitbtn() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSubmit}
                style={{
                    marginHorizontal: Sizes.fixPadding * 3,
                    marginVertical: Sizes.fixPadding * 2,
                    borderRadius: Sizes.fixPadding * 4,
                    overflow: 'hidden',
                }}>
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ paddingVertical: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', fontSize: 14 }}>
                        Submit
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

};

const styles = StyleSheet.create({
    questionContainer: {
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1
    },
    questionText: {
        fontSize: 18,
        color: '#000',
    },
    choiceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: Sizes.fixPadding * 1
    },
    choiceText: {
        fontSize: 15,
        color: Colors.black
    },
    correctChoice: {
        backgroundColor: '#a0d9a8',
    },
});

const mapStateToProps = state => ({
    getMCQ: state.Mcq.getMCQ,
    currentLiveCourse: state.courses.currentLiveCourse,
    liveClassOfClass: state.courses.liveClassOfClass,
    isLoading: state.settings.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MCQTest);

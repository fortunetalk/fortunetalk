import PassFailed from './PassFailed';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import MyHeader from '../../components/MyHeader';
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import * as MCQActions from '../../redux/actions/McqActions'
import { formatAndShuffleMCQData, formateMCQForSubmit } from '../../utils/tools';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { navigate } from '../../utils/navigationServices';

const MCQTest = ({ isLoading, getMCQ, dispatch, customerData, submittedMcq }) => {
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [modal, setModal] = useState(false)
    const [mcqs, setMcqs] = useState([]);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (getMCQ && getMCQ.mcqs) {
            setMcqs(formatAndShuffleMCQData(getMCQ.mcqs));
        }
    }, [getMCQ]);

    console.log("submittedMcq ====>>>", submittedMcq)

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

    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= (getMCQ.totalTime * 60)) {
                        handleSubmit()
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleContinue = () => {
        setModal(false)
        navigate('mycourse')
    }

    const handleSubmit = () => {
        dispatch(MCQActions.onSubmitMCQ(formateMCQForSubmit(mcqs, customerData?._id)))
        setIsTimerActive(false);
    }

    console.log("mcq state ======>>>>>.", mcqs && mcqs)

    useEffect(() => {
        if (submittedMcq?.success) {
            setModal(true)
        }
    }, [submittedMcq])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }} >
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <MyHeader title={"MCQ Test"} />
            <Loader visible={isLoading} />
            {timer()}
            <FlatList
                data={mcqs}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}> {index + 1}. {item.question}</Text>
                        <View style={styles.choicesContainer}>
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
                    </View>
                )}
            />
            {Submitbtn()}
            <PassFailed
                visible={modal}
                onClose={() => setModal(false)}
                handleContinue={handleContinue}
                submittedMcq={submittedMcq}
            />
        </View>
    );

    function timer() {
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 1,
                paddingVertical: Sizes.fixPadding * 1,
                borderBottomWidth: 1,
                borderBottomColor: Colors.grayLight
            }}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "start" }} >
                    <Text style={{ color: Colors.black }} >Total Time</Text>
                    <Text style={{ color: Colors.black }} >{getMCQ?.totalTime} Minute</Text>
                </View>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "start" }}>
                    <Text style={{ color: Colors.black }} >Timer</Text>
                    <Text style={{ color: Colors.black }} >{formatTime(time)}</Text>
                </View>
            </View>
        )
    }

    function Submitbtn() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                style={{
                    marginHorizontal: Sizes.fixPadding * 3,
                    marginVertical: Sizes.fixPadding * 1.5,
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
    choicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

const mapStateToProps = state => ({
    submittedMcq: state.Mcq.submittedMcq,
    currentLiveCourse: state.courses.currentLiveCourse,
    getMCQ: state.Mcq.getMCQ,
    liveClassOfClass: state.courses.liveClassOfClass,
    isLoading: state.settings.isLoading,
    customerData: state.customer.customerData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MCQTest);

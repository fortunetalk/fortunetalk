import { Slider } from '@rneui/themed';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { Colors, Sizes, SCREEN_WIDTH } from '../../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

var Sound = require('react-native-sound');

const Voice = ({ currentMessage }) => {
    const uploadProgress = 0
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [whoosh, setWhoosh] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    const play_sound = () => {
        if (whoosh) {
            whoosh.release();
        }
        const sound = new Sound(currentMessage?.audio, Sound.MAIN_BUNDLE, error => {
            if (error) {
                console.log('Failed to load the sound', error);
            } else {
                setDuration(sound.getDuration());
                setWhoosh(sound);
                setIsPlaying(true);
                sound.play();
            }
        });
    };

    const play_pause = () => {
        if (isPlaying) {
            whoosh.stop(() => {
                setCurrentTime(0);
                setIsPlaying(false);
                setIsPaused(false);
            });
        } else {
            play_sound();
        }
    };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''
            }${remainingSeconds}`;
    };

    useEffect(() => {
        if (isPlaying) {
            const intervalId = setInterval(() => {
                whoosh?.getCurrentTime(seconds => {
                    setCurrentTime(seconds);
                    if (duration.toFixed(1) == parseFloat(seconds).toFixed(1)) {
                        setCurrentTime(0);
                        setIsPlaying(false);
                        clearInterval(intervalId);
                    }
                });
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isPlaying, whoosh]);

    const handle_play_pause = () => {
        if (isPlaying) {
            setIsPaused(true);
        }
    };

    return (
        <View style={{ width: SCREEN_WIDTH * 0.5, padding: Sizes.fixPadding }}>
            <TouchableOpacity>
                {false ? (
                    <Progress.Pie
                        size={30}
                        indeterminate={true}
                        progress={uploadProgress}
                        borderWidth={3}
                        borderColor={Colors.white}
                    />
                ) : (
                    <View style={[styles.row]}>
                        <TouchableOpacity onPress={() => play_pause()}>
                            <Ionicons
                                name={isPlaying ? 'pause' : 'play'}
                                color={Colors.black}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                <Slider
                    disabled
                    step={1}
                    thumbStyle={{ width: 10, height: 10 }}
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{formatTime(currentTime)}</Text>
                    <Text>{duration && formatTime(duration)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Voice;

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.grayLight,
        borderTopLeftRadius: Sizes.fixPadding * 4,
        elevation: 8,
    },
});

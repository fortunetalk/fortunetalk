import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/liveActions'
import { Colors, Fonts, SCREEN_HEIGHT, Sizes } from '../../../assets/styles';

const animationEndY = Math.ceil(SCREEN_HEIGHT * 0.5);
const negativeEndY = animationEndY * -1;

export class AnimatedGift extends Component {
    constructor(props) { 
        super(props);
        console.log('hifdfi', this.props.giftedData)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {this.props.giftedData &&
                        this.props.giftedData.map(gift => {
                            return (
                                <GiftContainer
                                    key={gift.messageID}
                                    // style={{ right: gift.right }}
                                    item={gift}
                                    onComplete={() => this.props.dispatch(LiveActions.removeHeart(gift.messageID))}
                                    // color={gift.color}
                                />
                            );
                        })}
                </View>
            </View>
        );
    }
}

class GiftContainer extends Component {
    constructor() {
        super();
        this.yAnimation = this.state.position.interpolate({
            inputRange: [negativeEndY, 0],
            outputRange: [animationEndY, 0],
        });

        this.opacityAnimation = this.yAnimation.interpolate({
            inputRange: [0, animationEndY],
            outputRange: [1, 0],
        });

        this.scaleAnimation = this.yAnimation.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [0, 1.4, 1],
            extrapolate: 'clamp',
        });

        this.xAnimation = this.yAnimation.interpolate({
            inputRange: [
                0,
                animationEndY / 6,
                animationEndY / 3,
                animationEndY / 2,
                animationEndY,
            ],
            outputRange: [0, 25, 15, 0, 10],
        });

        this.rotateAnimation = this.yAnimation.interpolate({
            inputRange: [
                0,
                animationEndY / 6,
                animationEndY / 3,
                animationEndY / 2,
                animationEndY,
            ],
            outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
        });
    }
    state = {
        position: new Animated.Value(0),
    };

    static defaultProps = {
        onComplete() { },
    };

    componentDidMount() {
        Animated.timing(this.state.position, {
            duration: 6000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(this.props.onComplete);
    }

    getHeaderStyle() {
        return {
            transform: [
                { translateY: this.state.position },
                { scale: this.scaleAnimation },
                { translateX: this.xAnimation },
                { rotate: this.rotateAnimation },
            ],
            opacity: this.opacityAnimation,
        };
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.heartContainer,
                    this.getHeaderStyle(),
                    this.props.style,
                ]}>
                <Heart color={this.props.color} item={this.props.item} />
            </Animated.View>
        );
    }
}

const Heart = props => {
    const message = JSON.parse(props.item?.message)
    return (
        <View {...props} style={[styles.heart, props.style]}>
            <Image source={{uri: message?.image}} style={{width: 35, height: 35}} />
            <Text style={{...Fonts._13InterMedium, color: Colors.white, marginLeft: Sizes.fixPadding}}>{`${props.item.fromUser?.userName} send ${message?.title} gift.`}</Text>
        </View>
    );
} 

const mapStateToProps = state => ({
    giftedData: state.live.giftedData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedGift)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 5,
        left: 10,
    },
    heartContainer: {
        position: 'absolute',
        bottom: SCREEN_HEIGHT*0.45,
        backgroundColor: 'transparent',
    },
    heart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});
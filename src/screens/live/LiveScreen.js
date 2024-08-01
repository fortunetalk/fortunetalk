import { AppState, Text, View, findNodeHandle } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Gift from './components/Gift';
import Comments from './components/Comments';
import Footer from './components/Footer';
import Header from './components/Header';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';
import * as LiveActions from '../../redux/actions/liveActions';
import { Colors, SCREEN_HEIGHT } from '../../assets/styles';
import GiftData from './components/GiftData';
import SideBar from './components/SideBar';
import AnimatedHeart from './components/AnimatedHeart';
import Gifts from './components/Gifts';
import ExitAlert from './components/ExitAlert';
import LiveCalls from './components/LiveCalls';
import WaitingList from './components/WaitingList';
import LiveLoading from './components/LiveLoading';
import StartLiveAlert from './components/StartLiveAlert';
import KeepAwake from 'react-native-keep-awake';
import CallInfo from './components/CallInfo';
import AnimatedGift from './components/AnimatedGift';

export class LiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveID: this.props.route.params.data?.liveId,
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    const payload = {
      startLive: this.startLive,
      dispatch: this.props.dispatch,
      liveID: this.state.liveID,
      astroData: this.props.route.params.data?.astrologerId,
      liveData: this.props.route.params.data
    };
    this.props.dispatch(LiveActions.addLiveListener(payload));
    this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate() {
    if (this.props.layout == 'LIVE') {
      this.startLive();
    } else if (this.props.layout == 'VIDEO_CALL') {
      this.startVideoCall();
    } else if (this.props.layout == 'VOICE_CALL') {
      this.startLive();
    } else if (this.props.layout == 'CO_HOSTING_VIDEO') {
      this.startCoHosting()
    } else if (this.props.layout == 'CO_HOSTING_VOICE') {
      this.startCoHosting()
    }
  }

  componentWillUnmount() {
    this.props.dispatch(LiveActions.resetLiveState());
    if (ZegoExpressEngine?.instance()) {
      console.log('[LZP] destroyEngine');
      ZegoExpressEngine?.destroyEngine();
    }
    if (this.appStateListener) {
      this.appStateListener.remove();
    }
  }

  handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    const { appState } = this.state;

    if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      console.log('App has gone to the background!');
      dispatch(LiveActions.onAppStateChangeInLive(true));
    } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      dispatch(LiveActions.onAppStateChangeInLive(false));
    }
    this.setState({ appState: nextAppState });
  };

  startLive = () => {
    ZegoExpressEngine.instance().startPlayingStream(this.state.liveID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  startVideoCall = () => {
    ZegoExpressEngine.instance().startPlayingStream(this.state.liveID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });
    ZegoExpressEngine.instance().startPreview({
      reactTag: findNodeHandle(this.refs.zego_preview_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  startVoiceCall = () => {
    ZegoExpressEngine.instance().startPlayingStream(this.state.liveID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  startCoHosting = () => {
    ZegoExpressEngine.instance().startPlayingStream(this.state.liveID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });
    ZegoExpressEngine.instance().startPlayingStream(this.props.streamID, {
      reactTag: findNodeHandle(this.refs.zego_play_view_co_hosting),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.black,
          height: SCREEN_HEIGHT,
        }}>

        {this.props.layout == 'LIVE' || this.props.layout == 'VOICE_CALL'
          ? fullScreenInfo()
          : this.props.layout == 'VIDEO_CALL'
            ? vedioCallScreenInfo()
            : this.props.layout === 'CO_HOSTING_VIDEO' ? coHostingVidioInfo() : coHostingVoiceInfo()}
        <CallInfo />
        {componentsInfo()}
        <AnimatedHeart />
        <AnimatedGift />
        <ExitAlert />
        <LiveCalls />
        <WaitingList />
        <StartLiveAlert />
        <LiveLoading liveLoadingVisible={this.props.isLiveStart} />
        <KeepAwake />
        <GiftData />
      </View>
    );

    function componentsInfo() {
      return (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // zIndex: 1,
          }}>
          <Header />
          {/* <Gift /> */}
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 0.7 }}>
              {/* <Gifts /> */}
              <Comments />
            </View>
            <SideBar />
          </View>
          <Footer />
        </LinearGradient>
      );
    }

    function fullScreenInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{ height: SCREEN_HEIGHT }}
          />
        </View>
      );
    }

    function vedioCallScreenInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
          <ZegoTextureView
            ref={`zego_preview_view`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
        </View>
      );
    }

    function coHostingVidioInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
          <ZegoTextureView
            ref={`zego_play_view_co_hosting`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
        </View>
      );
    }

    function coHostingVoiceInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{ height: SCREEN_HEIGHT }}
          />
          <ZegoTextureView
            ref={`zego_play_view_co_hosting`}
            style={{ height: 0 }}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLiveStart: state.live.isLiveStart,
  isCoHost: state.live.isCoHost,
  streamID: state.live.streamID,
  layout: state.live.layout,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveScreen);

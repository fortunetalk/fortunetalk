import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import { duration } from 'moment';
import { secondsToHMS } from '../../../utils/services';
import {Colors, Sizes, Fonts} from '../../../assets/styles';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/liveActions'

const CallTimer = ({totalDuration, dispatch, layout}) => {
  const [timer, setTimer] = useState(totalDuration);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev - 1 <= 0) {
          clearInterval(interval);
          if(layout === 'VIDEO_CALL' || layout === 'VOICE_CALL' ){
            dispatch(LiveActions.onEndCalling())
          }
          console.log('Ended');
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Text style={{...Fonts.black11InterMedium}}>{secondsToHMS(timer)}</Text>;
};

const mapStateToProps = state =>({
  layout: state.live.layout
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(CallTimer);

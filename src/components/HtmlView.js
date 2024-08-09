import { View, Text } from 'react-native'
import React from 'react'
import RenderHtml from 'react-native-render-html';
import { SCREEN_WIDTH } from '../assets/styles'

const HtmlView = ({ html }) => {
    return (
        <RenderHtml
            contentWidth={SCREEN_WIDTH}
            source={{ html }}
            baseStyle={{
                whiteSpace: 'normal',
                textAlign: 'left',
            }}
        />
    );
}

export default HtmlView
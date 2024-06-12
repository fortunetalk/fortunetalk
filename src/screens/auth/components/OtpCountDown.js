import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../assets/styles'

const OtpCountDown = ({duration, onTimeOut}) => {
    const [timer, setTimer] = useState(duration)

    useEffect(()=>{
        setTimer(duration)
    }, [duration])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevState => {
                if(prevState < 0){
                    clearInterval(interval)
                    onTimeOut()
                    return 0
                }
                return prevState - 1
            })
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    return (
        <Text style={{color: Colors.greenLight}}>{timer} sec</Text>
    )
}

export default OtpCountDown
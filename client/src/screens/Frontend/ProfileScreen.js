import React, { useCallback, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import AuthDisplay from '../../components/AuthDisplay/AuthDisplay'
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay'
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'

export default function ProfileScreen() {

    const { user } = useAuthContext()

    const [isVisible, setIsVisible] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setIsVisible(true)
            return () => setIsVisible(false)
        }, [])
    );

    return (
        <>
            {isVisible &&
                <Animated.View
                    entering={SlideInDown}
                    exiting={SlideOutLeft}
                    style={{ flex: 1 }}
                >
                    {
                        !user.email ?
                            <AuthDisplay /> :
                            <ProfileDisplay />
                    }
                </Animated.View>
            }
        </>
    )
}
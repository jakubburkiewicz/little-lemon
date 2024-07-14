import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useProfile } from './contexts/ProfileContext'

import OnboardingScreen from './screens/Onboarding'
import ProfileScreen from './screens/Profile'
import SplashScreen from './screens/Splash'

const Stack = createNativeStackNavigator()

const ScreenSwitcher = () => {
    const { isLoading, isOnboardingCompleted } = useProfile()

    if( isLoading ) {
        <SplashScreen />
    }

    return (
        <Stack.Navigator>
            {
                isOnboardingCompleted
                ? (
                    <Stack.Screen name="Profile" component={ ProfileScreen } />
                ) : (
                    <Stack.Screen name="Onboarding" component={ OnboardingScreen } />
                )
            }
        </Stack.Navigator>
    )
}

export default ScreenSwitcher
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useOnboarding } from './contexts/OnboardingContext'

import OnboardingScreen from './screens/Onboarding'
import ProfileScreen from './screens/Profile'
import SplashScreen from './screens/Splash'

const Stack = createNativeStackNavigator()

const ScreenSwitcher = () => {
    const { state } = useOnboarding()

    if( state.isLoading ) {
        <SplashScreen />
    }

    return (
        <Stack.Navigator>
            {
                state.isOnboardingCompleted
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
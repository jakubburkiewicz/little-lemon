import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScreen from './screens/Onboarding';

const App = () => {
    return (
        <NavigationContainer>
            <OnboardingScreen />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

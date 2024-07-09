import { NavigationContainer } from '@react-navigation/native'

import ScreenSwitcher from './ScreenSwitcher'
import { OnboardingProvider } from './contexts/OnboardingContext'

const App = () => {

    return (
        <OnboardingProvider>
            <NavigationContainer>
                <ScreenSwitcher />
            </NavigationContainer>
        </OnboardingProvider>
    )
}

export default App
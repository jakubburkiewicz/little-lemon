import { NavigationContainer } from '@react-navigation/native'

import ScreenSwitcher from './ScreenSwitcher'
import { ProfileProvider } from './contexts/ProfileContext'

const App = () => {

    return (
        <ProfileProvider>
            <NavigationContainer>
                <ScreenSwitcher />
            </NavigationContainer>
        </ProfileProvider>
    )
}

export default App
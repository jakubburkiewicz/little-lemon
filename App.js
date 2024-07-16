import { NavigationContainer } from '@react-navigation/native'

import ScreenSwitcher from './ScreenSwitcher'

import { ProfileProvider } from './contexts/ProfileContext'
import { MenuProvider } from './contexts/MenuContext'

const App = () => (
    <ProfileProvider>
        <MenuProvider>
            <NavigationContainer>
                <ScreenSwitcher />
            </NavigationContainer>
        </MenuProvider>
    </ProfileProvider>
)

export default App
import { Button, StyleSheet, Text, View } from 'react-native'
import { useOnboarding } from '../contexts/OnboardingContext'

const ProfileScreen = () => {
    const { signOut } = useOnboarding()

    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>Profile Screen</Text>

            <Button
                title="Sign Out"
                onPress={ signOut }
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
} )

export default ProfileScreen
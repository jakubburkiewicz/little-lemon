import { StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>Loading...</Text>
    </View>
)

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

export default SplashScreen
import { Image, StyleSheet, Text, View } from 'react-native'

const Avatar = ( { user, size } ) => (
    <View style={ styles.container }>
        {
            user
            && (
                user.avatar
                ? (
                    <Image
                        source={ { uri: user.avatar } }
                        style={ ( size === 'small' && styles.avatarSmall ) || ( size === 'medium' ? styles.avatarMedium : styles.avatarBig ) }
                    />
                ) : (
                    <View style={ ( size === 'small' && styles.avatarSmall ) || ( size === 'medium' ? styles.avatarMedium : styles.avatarBig ) }>
                        <Text style={ ( size === 'small' && styles.avatarTextSmall ) || ( size === 'medium' ? styles.avatarTextMedium : styles.avatarTextBig ) }>
                            { user.firstName?.charAt( 0 ).toUpperCase() }
                            { user.lastName?.charAt( 0 ).toUpperCase() }
                        </Text>
                    </View>
                )
            )
        }
    </View>
)

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'darkseagreen',
    },
    avatarMedium: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'darkseagreen',
    },
    avatarBig: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: 'darkseagreen',
    },
    avatarTextSmall: {
        fontSize: 16,
        color: 'white'
    },
    avatarTextMedium: {
        fontSize: 24,
        color: 'white'
    },
    avatarTextBig: {
        fontSize: 32,
        color: 'white'
    }
} )

export default Avatar
import { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useProfile } from '../contexts/ProfileContext'

const OnboardingScreen = () => {
    const [ firstName, setFirstName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ firstNameError, setFirstNameError ] = useState( '' )
    const [ emailError, setEmailError ] = useState( '' )

    const { doOnboarding } = useProfile()

    const handleFirstNameChange = ( text ) => {
        setFirstName( text )
    }

    const handleEmailChange = ( text ) => {
        setEmail( text )
    }

    const handleNextClick = async () => {
        if ( !validateForm() ) {
            return
        }

        await doOnboarding( {
            firstName,
            email,
        } )
    }

    const validateForm = () => {
        setFirstNameError( '' )
        setEmailError( '' )

        // First name can't be empty
        if( !firstName ) {
            setFirstNameError( 'First Name is required' )
        }

        // Email can't be empty
        if( !email ) {
            setEmailError( 'Email is required' )
        } else {
            // Email must be a valid email address
            if ( !isEmailValid( email ) ) {
                setEmailError( 'Email is not valid' )
            }
        }

        return true
    }

    const isEmailValid = ( email ) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email )
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.header }>
                <Image source={ require( '../assets/little-lemon-logo.png' ) } />
            </View>
            <View style={ styles.contents }>
                <View style={ styles.leadTextContainer }>
                    <Text style={ styles.leadText }>Let us get to know you</Text>
                </View>

                <View style={ styles.formContainer }>
                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>First Name</Text>

                        <TextInput
                            placeholder="First Name"
                            autoComplete="name"
                            autoFocus={ true }
                            inputMode="text"
                            onChangeText={ handleFirstNameChange }
                            style={ styles.formFieldInput }
                        />

                        {
                            firstNameError &&
                            <Text style={ styles.formFieldError }>
                                { firstNameError }
                            </Text>
                        }
                    </View>

                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>Email</Text>

                        <TextInput
                            placeholder="Email"
                            autoComplete="email"
                            inputMode="email"
                            keyboardType="email-address"
                            onChangeText={ handleEmailChange }
                            style={ styles.formFieldInput }
                        />

                        {
                            emailError &&
                            <Text style={ styles.formFieldError }>
                                { emailError }
                            </Text>
                        }
                    </View>
                </View>
            </View>
            <View style={ styles.footer }>
                <Pressable
                    onPress={ handleNextClick }
                    style={ styles.button }
                >
                    <Text style={ styles.buttonLabel }>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    contents: {
        flex: 1,
    },
    leadTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leadText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
    },
    formField: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 10,
    },
    formFieldLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formFieldInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    formFieldError: {
        color: 'red',
    },
    footer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
} )

export default OnboardingScreen
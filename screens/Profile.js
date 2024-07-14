import { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import * as ImagePicker from 'expo-image-picker'

import { useProfile } from '../contexts/ProfileContext'

import Avatar from '../components/Avatar'
import { MaskedTextInput } from 'react-native-mask-text'

const ProfileScreen = ( { navigation } ) => {
    const [ avatar, setAvatar ] = useState( '' )
    const [ firstName, setFirstName ] = useState( '' )
    const [ lastName, setLastName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ phoneNumber, setPhoneNumber ] = useState( '' )
    const [ checkboxes, setCheckboxes ] = useState( {
        orderStatuses: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
    } )
    const [ firstNameError, setFirstNameError ] = useState( '' )
    const [ lastNameError, setLastNameError ] = useState( '' )
    const [ emailError, setEmailError ] = useState( '' )
    const [ phoneNumberError, setPhoneNumberError ] = useState( '' )

    const {
        clearOnboarding,
        user,
        emailNotifications,
        updateUserData,
        updateEmailNotifications
    } = useProfile()

    const handleFirstNameChange = ( text ) => {
        setFirstName( text )
    }

    const handleLastNameChange = ( text ) => {
        setLastName( text )
    }

    const handleEmailChange = ( text ) => {
        setEmail( text )
    }

    const handlePhoneNumberChange = ( text ) => {
        setPhoneNumber( text )
    }

    const handleOrderStatusesNotificationsChange = ( value ) => {
        setCheckboxes( {
            ...checkboxes,
            orderStatuses: value
        } )
    }

    const handlePasswordChangesNotificationsChange = ( value ) => {
        setCheckboxes( {
            ...checkboxes,
            passwordChanges: value
        } )
    }

    const handleSpecialOffersNotificationsChange = ( value ) => {
        setCheckboxes( {
            ...checkboxes,
            specialOffers: value
        } )
    }

    const handleNewsletterNotificationsChange = ( value ) => {
        setCheckboxes( {
            ...checkboxes,
            newsletter: value
        } )
    }

    const handleBackClick = () => {
        navigation.goBack()
    }

    const handlePickAvatarClick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if ( status !== 'granted' ) {
            alert( 'Permission to access camera roll is required!' )
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 1, 1 ],
            quality: 1,
        } )

        if ( !result.cancelled ) {
            setAvatar( result.assets[0].uri )
        }
    }

    const handleRemoveAvatarClick = () => {
        setAvatar( '' )
    }

    const handleDiscardChangesClick = () => {
        setAvatar( user.avatar )
        setFirstName( user.firstName )
        setLastName( user.lastName )
        setEmail( user.email )
        setPhoneNumber( user.phoneNumber )
        setCheckboxes( emailNotifications )
    }

    const handleSaveChangesClick = () => {
        if( validate() ) {
            try {
                updateUserData( {
                    avatar,
                    firstName,
                    lastName,
                    email,
                    phoneNumber
                } )

                updateEmailNotifications( checkboxes )
            } catch ( error ) {
                console.error( error )
            }
        }
    }

    const validate = () => {
        let isValid = true

        setFirstNameError( '' )
        setLastNameError( '' )
        setEmailError( '' )
        setPhoneNumberError( '' )

        if ( !firstName ) {
            setFirstNameError( 'First name is required' )
            isValid = false
        }

        if ( !lastName ) {
            setLastNameError( 'Last name is required' )
            isValid = false
        }

        if ( !email ) {
            setEmailError( 'Email is required' )
            isValid = false
        }

        if ( !phoneNumber ) {
            setPhoneNumberError( 'Phone number is required' )
            isValid = false
        }

        return isValid
    }

    useEffect( () => {
        if ( user ) {
            setAvatar( user.avatar )
            setFirstName( user.firstName )
            setLastName( user.lastName )
            setEmail( user.email )
            setPhoneNumber( user.phoneNumber )
        }

        if ( emailNotifications ) {
            setCheckboxes( emailNotifications )
        }
    }, [ user, emailNotifications ] )

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.header }>
                <Pressable
                    onPress={ handleBackClick }
                    style={ styles.buttonBack }
                >
                    <Text style={ styles.buttonBackIcon }>&larr;</Text>
                </Pressable>

                <Image source={ require( '../assets/little-lemon-logo.png' ) } />

                <Avatar
                    user={ { firstName, lastName, avatar } }
                    size="small"
                />
            </View>
            <View style={ styles.contents }>
                <View style={ styles.formContainer }>
                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>Avatar</Text>

                        <View style={ styles.avatarGroup }>
                            <Avatar
                                user={ { firstName, lastName, avatar } }
                                size="medium"
                            />

                            <Pressable
                                onPress={ handlePickAvatarClick }
                                style={ styles.buttonGreen }
                            >
                                <Text style={ styles.buttonGreenLabel}>Change</Text>
                            </Pressable>

                            <Pressable
                                onPress={ handleRemoveAvatarClick }
                                style={ styles.buttonWhite }
                            >
                                <Text style={ styles.buttonWhiteLabel }>Remove</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>First Name</Text>

                        <TextInput
                            placeholder="First Name"
                            autoComplete="name"
                            autoFocus={ true }
                            inputMode="text"
                            onChangeText={ handleFirstNameChange }
                            style={ styles.formFieldInput }
                            value={ firstName }
                        />

                        {
                            firstNameError &&
                            <Text style={ styles.formFieldError }>
                                { firstNameError }
                            </Text>
                        }
                    </View>

                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>Last Name</Text>

                        <TextInput
                            placeholder="Last Name"
                            autoComplete="name"
                            autoFocus={ true }
                            inputMode="text"
                            onChangeText={ handleLastNameChange }
                            style={ styles.formFieldInput }
                            value={ lastName }
                        />

                        {
                            lastNameError &&
                            <Text style={ styles.formFieldError }>
                                { lastNameError }
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
                            value={ email }
                        />

                        {
                            emailError &&
                            <Text style={ styles.formFieldError }>
                                { emailError }
                            </Text>
                        }
                    </View>

                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>Phone number</Text>

                        <MaskedTextInput
                            placeholder="Phone number"
                            autoComplete="tel"
                            inputMode="tel"
                            keyboardType="phone-pad"
                            onChangeText={ handlePhoneNumberChange }
                            style={ styles.formFieldInput }
                            value={ phoneNumber }
                            mask="(999) 999-9999"
                        />

                        {
                            phoneNumberError &&
                            <Text style={ styles.formFieldError }>
                                { phoneNumberError }
                            </Text>
                        }
                    </View>

                    <View style={ styles.formField }>
                        <Text style={ styles.formFieldLabel }>Email notifications</Text>

                        <BouncyCheckbox
                            size={ 25 }
                            fillColor="green"
                            unfillColor="white"
                            iconStyle={{ borderColor: 'green' }}
                            text="Order statuses"
                            onPress={ handleOrderStatusesNotificationsChange }
                            isChecked={ checkboxes.orderStatuses }
                        />

                        <BouncyCheckbox
                            size={ 25 }
                            fillColor="green"
                            unfillColor="white"
                            iconStyle={{ borderColor: 'green' }}
                            text="Password changes"
                            onPress={ handlePasswordChangesNotificationsChange }
                            isChecked={ checkboxes.passwordChanges }
                        />

                        <BouncyCheckbox
                            size={ 25 }
                            fillColor="green"
                            unfillColor="white"
                            iconStyle={{ borderColor: 'green' }}
                            text="Special offers"
                            onPress={ handleSpecialOffersNotificationsChange }
                            isChecked={ checkboxes.specialOffers }
                        />

                        <BouncyCheckbox
                            size={ 25 }
                            fillColor="green"
                            unfillColor="white"
                            iconStyle={{ borderColor: 'green' }}
                            text="Newsletter"
                            onPress={ handleNewsletterNotificationsChange }
                            isChecked={ checkboxes.newsletter }
                        />
                    </View>
                </View>
            </View>
            <View style={ styles.footer }>
                <Pressable
                    onPress={ clearOnboarding }
                    style={ styles.buttonYellow }
                >
                    <Text style={ styles.buttonYellowLabel }>Log out</Text>
                </Pressable>

                <View style={ styles.buttonsGroup }>
                    <Pressable
                        onPress={ handleDiscardChangesClick }
                        style={ styles.buttonWhite }
                    >
                        <Text style={ styles.buttonWhiteLabel }>Discard changes</Text>
                    </Pressable>

                    <Pressable
                        onPress={ handleSaveChangesClick }
                        style={ styles.buttonGreen }
                    >
                        <Text style={ styles.buttonGreenLabel }>Save changes</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    buttonBack: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'darkseagreen',
    },
    buttonBackIcon: {
        fontSize: 24,
        color: 'white',
    },
    contents: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        gap: 15,
    },
    formField: {
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
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    buttonsGroup: {
        flexDirection: 'row',
        gap: 10,
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
    buttonWhite: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'darkseagreen',
        color: 'darkseagreen',
    },
    buttonWhiteLabel: {
        color: 'darkseagreen',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonGreen: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgreen',
        borderRadius: 5,
    },
    buttonGreenLabel: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonYellow: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightyellow',
        borderRadius: 5,
        width: '100%',
    },
    buttonYellowLabel: {
        color: 'darkgoldenrod',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarGroup: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
} )

export default ProfileScreen
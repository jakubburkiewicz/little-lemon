import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileContext = createContext()

const initialState = {
    isLoading: true,
    isOnboardingCompleted: false,
    user: null,
    emailNotifications: {
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false
    }
}

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'SET_ONBOARDING_COMPLETED':
            return {
                ...state,
                isOnboardingCompleted: action.isOnboardingCompleted
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_EMAIL_NOTIFICATIONS':
            return {
                ...state,
                emailNotifications: action.emailNotifications
            }
        default:
            return state
    }
}

const ProfileProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        const bootstrapAsync = async () => {
            try {
                const user = await AsyncStorage.getItem( 'user' )
                const emailNotifications = await AsyncStorage.getItem( 'emailNotifications' )

                if ( user ) {
                    dispatch( {
                        type: 'SET_USER',
                        user: JSON.parse( user )
                    } )

                    dispatch( {
                        type: 'SET_ONBOARDING_COMPLETED',
                        isOnboardingCompleted: true
                    } )
                }

                if ( emailNotifications ) {
                    dispatch( {
                        type: 'SET_EMAIL_NOTIFICATIONS',
                        emailNotifications: JSON.parse( emailNotifications )
                    } )
                }
            } catch ( error ) {
                console.error( error )
            }

            dispatch( {
                type: 'SET_LOADING',
                isLoading: false
            } )
        }

        bootstrapAsync()
    }, [] )

    const context = useMemo( () => ( {
        isLoading: state.isLoading,
        isOnboardingCompleted: state.isOnboardingCompleted,
        user: state.user,
        emailNotifications: state.emailNotifications,
        doOnboarding: async ( user ) => {
            try {
                await AsyncStorage.setItem( 'user', JSON.stringify( user ) )

                dispatch( {
                    type: 'SET_USER',
                    user
                } )

                dispatch( {
                    type: 'SET_ONBOARDING_COMPLETED',
                    isOnboardingCompleted: true
                } )
            } catch ( error ) {
                console.error( error )
            }
        },
        clearOnboarding: async () => {
            try {
                await AsyncStorage.removeItem( 'user' )

                dispatch( {
                    type: 'SET_USER',
                    user: null
                } )

                dispatch( {
                    type: 'SET_ONBOARDING_COMPLETED',
                    isOnboardingCompleted: false
                } )
            } catch ( error ) {
                console.error( error )
            }
        },
        updateUserData: async ( user ) => {
            try {
                await AsyncStorage.setItem( 'user', JSON.stringify( user ) )

                dispatch( {
                    type: 'SET_USER',
                    user
                } )
            } catch ( error ) {
                console.error( error )
            }
        },
        updateEmailNotifications: async ( emailNotifications ) => {
            try {
                await AsyncStorage.setItem( 'emailNotifications', JSON.stringify( emailNotifications ) )

                dispatch( {
                    type: 'SET_EMAIL_NOTIFICATIONS',
                    emailNotifications
                } )
            } catch ( error ) {
                console.error( error )
            }
        }
    } ), [ state.isLoading, state.isOnboardingCompleted, state.user, state.emailNotifications ] )

    return (
        <ProfileContext.Provider value={ context }>
            { children }
        </ProfileContext.Provider>
    )
}

const useProfile = () => {
    const context = useContext( ProfileContext )

    if ( context === undefined ) {
        throw new Error( 'useProfile must be used within a ProfileProvider' )
    }

    return context
}

export { ProfileProvider, useProfile }
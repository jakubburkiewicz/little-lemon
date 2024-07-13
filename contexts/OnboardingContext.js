import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const OnboardingContext = createContext()

const initialState = {
    isLoading: true,
    isOnboardingCompleted: false,
    user: null
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
        default:
            return state
    }
}

const OnboardingProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        const bootstrapAsync = async () => {
            try {
                const user = await AsyncStorage.getItem( 'user' )

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
        signIn: async ( user ) => {
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
        signOut: async () => {
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
        }
    } ), [ state.isLoading, state.isOnboardingCompleted, state.user ] )

    return (
        <OnboardingContext.Provider value={ context }>
            { children }
        </OnboardingContext.Provider>
    )
}

const useOnboarding = () => {
    const context = useContext( OnboardingContext )

    if ( context === undefined ) {
        throw new Error( 'useOnboarding must be used within a OnboardingProvider' )
    }

    return context
}

export { OnboardingProvider, useOnboarding }
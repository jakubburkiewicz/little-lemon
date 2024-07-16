import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

import { insertItems, selectAll, filterItems, getCategories } from '../database'

const MenuContext = createContext()

const initialState = {
    menuItems: [],
    categories: [],
    selectedCategories: [],
    searchQuery: ''
}

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case 'SET_MENU_ITEMS':
            return {
                ...state,
                menuItems: action.menuItems
            }
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            }
        case 'SET_SELECTED_CATEGORIES':
            return {
                ...state,
                selectedCategories: action.selectedCategories
            }
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.searchQuery
            }
        default:
            return state
    }
}

const MenuProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        const bootstrapAsync = async () => {
            try {
                const result = await selectAll()

                if( result.length > 0 ) {
                    dispatch( {
                        type: 'SET_MENU_ITEMS',
                        menuItems: result
                    } )
                } else {
                    const response = await fetch( 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json' )
                    const data = await response.json()

                    data.menu.forEach( async item => {
                        try {
                            await insertItems( item.name, item.price, item.description, item.image, item.category )
                        } catch ( error ) {
                            console.error( error )
                        }
                    } )

                    dispatch( {
                        type: 'SET_MENU_ITEMS',
                        menuItems: data.menu
                    } )
                }

                const categories = await getCategories()

                dispatch( {
                    type: 'SET_CATEGORIES',
                    categories: categories.map( category => category.category )
                } )
            } catch ( error ) {
                console.error( error )
            }
        }

        bootstrapAsync()
    }, [] )

    useEffect( () => {
        const filter = async () => {
            try {
                const result = await filterItems( state.selectedCategories, state.searchQuery )

                dispatch( {
                    type: 'SET_MENU_ITEMS',
                    menuItems: result
                } )
            } catch ( error ) {
                console.error( error )
            }
        }

        filter()
    }, [ state.selectedCategories, state.searchQuery ] )

    const toggleCategory = ( category ) => {
        dispatch( {
            type: 'SET_SELECTED_CATEGORIES',
            selectedCategories: (
                state.selectedCategories.includes( category ) ?
                    state.selectedCategories.filter( selectedCategory => selectedCategory !== category ) :
                    [ ...state.selectedCategories, category ]
            )
        } )
    }

    const search = async ( searchQuery ) => {
        dispatch( {
            type: 'SET_SEARCH_QUERY',
            searchQuery
        } )
    }

    const context = useMemo( () => ( {
        menuItems: state.menuItems,
        categories: state.categories,
        selectedCategories: state.selectedCategories,
        searchQuery: state.searchQuery,
        search,
        toggleCategory
    } ), [ state.menuItems, state.categories, state.selectedCategories, state.searchQuery ] )

    return (
        <MenuContext.Provider value={ context }>
            { children }
        </MenuContext.Provider>
    )
}

const useMenu = () => {
    const context = useContext( MenuContext )

    if ( !context ) {
        throw new Error( 'useMenu must be used within a MenuProvider' )
    }

    return context
}

export { MenuProvider, useMenu }
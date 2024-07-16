import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

import { useProfile } from '../contexts/ProfileContext'
import { useMenu } from '../contexts/MenuContext'

import Avatar from '../components/Avatar'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react'

const HomeScreen = ( { navigation } ) => {
    const [ query, setQuery ] = useState( '' )
    const {
        menuItems,
        categories,
        selectedCategories,
        toggleCategory,
        search,
        searchQuery
    } = useMenu()
    const { user } = useProfile()

    const handleAvatarPress = () => {
        navigation.navigate( 'Profile' )
    }

    const handleCategoryPress = ( category ) => {
        toggleCategory( category )
    }

    const handleSearchQueryChange = async ( searchQuery ) => {
        setQuery( searchQuery )
    }

    useEffect( () => {
        const timeout = setTimeout( () => {
            search( query )
        }, 500 )

        return () => clearTimeout( timeout )
    }, [ query ] )

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.header }>
                <View style={ styles.buttonBackPlaceholder } />

                <Image source={ require( '../assets/little-lemon-logo.png' ) } />

                <Pressable
                    onPress={ handleAvatarPress }
                >
                    <Avatar
                        user={ user }
                        size="small"
                    />
                </Pressable>
            </View>

            <Banner
                searchQuery={ query }
                handleSearchQueryChange={ handleSearchQueryChange }
            />

            <View style={ styles.menu }>
                <View style={ styles.menuHeader }>
                    <Text style={ styles.menuHeading }>Order for Delivery!</Text>

                    <Categories
                        categories={ categories }
                        selectedCategories={ selectedCategories }
                        toggleCategory={ handleCategoryPress }
                    />
                </View>

                <View style={ styles.menuItems }>
                    <FlatList
                        data={ menuItems }
                        keyExtractor={ item => item.id }
                        renderItem={ ( { item } ) => (
                            <View style={ styles.menuItem }>
                                <Text style={ styles.name }>{ item.name }</Text>

                                <View style={ styles.menuItemGroup }>
                                    <View style={ styles.menuItemDetails }>
                                        <Text style={ styles.description }>{ item.description }</Text>

                                        <Text style={ styles.price }>${ item.price }</Text>
                                    </View>

                                    <Image
                                        source={ { uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${ item.image }?raw=true` } }
                                        style={ styles.menuItemImage }
                                    />
                                </View>
                            </View>
                        ) }
                    />
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
    buttonBackPlaceholder: {
        width: 48
    },
    menu: {
        flex: 1,
    },
    menuHeader: {
        padding: 10,
    },
    menuHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    menuItems: {
        flex: 1,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        gap: 10,
    },
    menuItemGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    menuItemDetails: {
        flex: 1,
        gap: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuItemImage: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: 'lightgray',
        resizeMode: 'cover',
    },
} )

export default HomeScreen
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

const Banner = ( {
    searchQuery,
    handleSearchQueryChange
} ) => {

    return (
        <View style={ styles.intro }>
            <Text style={ styles.heading }>Little Lemon</Text>

            <Text style={ styles.subheading }>Chicago</Text>

            <View style={ styles.introGroup }>
                <Text style={ styles.body }>We are a family owned Mediterranean restaurans, focused on traditional recipes served with a modern twist.</Text>

                <Image
                    source={ require( '../assets/intro.png' ) }
                    style={ styles.introImage }
                />
            </View>

            <View style={ styles.search }>
                <Text style={ styles.searchButton }>&#128269;</Text>

                <TextInput
                    placeholder="Search"
                    style={ styles.searchInput }
                    onChangeText={ handleSearchQueryChange }
                    value={ searchQuery }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    intro: {
        padding: 10,
        backgroundColor: 'darkseagreen',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    introImage: {
        width: 150,
        height: 150,
        marginTop: -50,
        borderRadius: 16,
        marginLeft: 10,
    },
    introGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    body: {
        fontSize: 16,
        flex: 1
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    searchButton: {
        borderRadius: 10,
        padding: 10,
    },
    searchInput: {
        flex: 1,
    },
} )

export default Banner
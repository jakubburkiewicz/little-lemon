import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Categories = ({
    categories,
    selectedCategories,
    toggleCategory,
}) => {
    return (
        <FlatList
            data={ categories }
            keyExtractor={ category => category }
            renderItem={ ({ item: category }) => (
                <TouchableOpacity
                    onPress={ () => toggleCategory( category ) }
                    style={ selectedCategories.includes( category ) ? styles.categoryOn : styles.categoryOff }
                >
                    <Text>{ category }</Text>
                </TouchableOpacity>
            ) }
            horizontal
        />
    )
}

const styles = StyleSheet.create( {
    categoryOn: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginRight: 10,
    },
    categoryOff: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginRight: 10,
    },
} )

export default Categories
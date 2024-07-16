import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseAsync( 'little_lemon.db' )

export const createTable = async () => (
    (await db).runAsync( 'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price DECIMAL, description TEXT, image TEXT, category TEXT)' )
)

export const insertItems = async ( name, price, description, image, category ) => (
    createTable()
        .then( async () => (await db).runAsync( 'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)', [ name, price, description, image, category ] ) )
)

export const updateItem = async ( id, name, price, description, image, category ) => (
    (await db).runAsync( 'UPDATE menu SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?', [ name, price, description, image, category, id ] )
)

export const deleteItem = async id => (
    (await db).runAsync( 'DELETE FROM menu WHERE id = ?', [ id ] )
)

export const selectAll = async () => (
    createTable()
        .then( async () => (await db).getAllAsync( 'SELECT * FROM menu' ) )
)

export const filterItems = async ( selectedCategories, searchQuery ) => (
    createTable()
        .then( async () => {
            let query = 'SELECT * FROM menu'

            if( searchQuery ) {
                query += ` WHERE name LIKE '%${ searchQuery }%'`
            }

            if( selectedCategories.length > 0 ) {
                if( !searchQuery ) {
                    query += ' WHERE'
                } else {
                    query += ' AND'
                }

                query += ` category IN (${ selectedCategories.map( category => `'${ category }'` ).join( ', ' ) })`
            }

            return (await db).getAllAsync( query )
        } )
)

export const getCategories = async () => (
    createTable()
        .then( async () => (await db).getAllAsync( 'SELECT DISTINCT category FROM menu' ) )
)

export const clearDb = async () => (
    (await db).runAsync( 'DELETE FROM menu' )
)

export default db
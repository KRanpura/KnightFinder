import  {View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config';

const Fetch = () => {

    const [users, setUsers] = useState([]);
    const userRef = firebase.firestore().collection('users');

    useEffect(async () => {
        userRef
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const{email, name, age} = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        age
                    })
                })
                setUsers(users)
            }
        )
    }, [])
    return (
        <View style = {{flex:1, marginTop:100}}>
            <Flatlist
                style = {{height: '100%'}}
                data = {users}
                numColumns = {1}
                renderItem = {({item}) => (
                    <Pressable
                        style = {styles.container}
                    >
                        <View style = {styles.innerContainer}>
                            <Text style= {styles.itemName}>{item.name} </Text>
                            <Text style= {styles.itemName}>{item.age} </Text>

                        </View>

                    </Pressable>
                )}
            />
        </View>
    )
}

export default Fetch

const styles = Stylesheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,

    },
    innerContainer: {
        alignItems: 'center', 
        flexDirection: 'column',
    },
    itemName: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: '300'
    }
    
})
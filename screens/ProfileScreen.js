import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { auth, db } from "../firebase/firebase";
import { SimpleLineIcons } from '@expo/vector-icons';
//import { Avatar } from 'react-native-elements';

const ProfileScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [firstName, setFirstName] = useState('')

    //   useLayoutEffect(() => {
    //      const unsubscribe =  db.collection('users').orderBy('createdAt', 'desc').
    //       onSnapshot(snapshot=> setMessages(
    //          snapshot.docs.map(doc=>({
    //           _id: doc.data()._id,
    //           createdAt: doc.data().createdAt.toDate(),
    //           text: doc.data().text,
    //           user: doc.data().user
    //          }))
    //      ))
             
    //      return unsubscribe;
    //   }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <View style={{marginLeft: 30}}>
            //         <Avatar
            //             rounded
            //             source={{ uri:auth?.currentUser?.photoURL }} />
            //     </View>
            // ),
            // headerRight: () => (
            //     <TouchableOpacity style={{
            //         marginRight: 35
            //        }}
            //        onPress={signOut}
            //     >
            //         <SimpleLineIcons name="logout" size={24}
            //          color="#2D1BE0" />
            //     </TouchableOpacity>
            // )
        })
    }, )

    const signOut = () => {
             auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('LoginScreen')
          }).catch((error) => {
            // An error happened.
          });
    }

    // const signOut = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         navigation.replace('LoginScreen')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
      <View style={{flex: 1,height: '100%', width: "100%", backgroundColor:'#67C8D5'}}>
               <View style={{marginTop: 35, alignSelf: 'flex-end', flex: 1, height:194}}>
               <TouchableOpacity style={{
                    marginRight: 35
                   }}
                   onPress={signOut}
                >
                    <SimpleLineIcons name="logout" size={24}
                     color="#000" />
                </TouchableOpacity>
               </View>
          <View style={{backgroundColor: '#fff', height: '80%', marginTop: 170, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

          </View>
      </View>
    )
}

export default ProfileScreen
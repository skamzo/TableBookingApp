import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, ScrollView, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { auth, db } from "../firebase/firebase";
import { SimpleLineIcons } from '@expo/vector-icons';
import UpdateUserProfile from "./UpdateUserProfile";
//import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons"

const {height, width} = Dimensions.get('screen');

const ProfileScreen = ({navigation, route, firstName}) => {
  const [displayName, setDisplayName] = useState('');
  //const [firstName, setFirstName] = useState('')
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = React.useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // const UserProfile = async () => {
  //   const uid = auth?.currentUser?.uid;
  //   console.log(uid.firstName + "uid")
  //   const querySanp = await db.collection("users").doc(uid).get();
  //   const allusers = querySanp.docs.map(docSnap=>docSnap.data())
  //   // const user = [];
  //   // db.collection('users').doc(uid).get().then(doc => {
  //   //       user.push(Object.assign(Element.data(), {firstName: res.data().firstName})) 
  //   // })

  //   console.log(allusers.email)
  //   setUsers(allusers)

  //   if (uid !== null) {
  
  //     const displayName = user.firstName; 
  //     const email = user.email;
  //     const photoURL = user.photoURL;
  //     const emailVerified = user.emailVerified;

  //     setFirstName(firstName)
    
  //     const uid = user.uid;
  //   }

  // }

  const [users, setUsers] = useState(null)
    //const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(lastName);
    const [imageUrl, setImageUrl] = useState('');
    const getUsers = async () => {
        const uid = auth?.currentUser?.uid;
        const querySnap = await db.collection('users').where('uid','==', uid).get();
        const allusers = querySnap.docs.map(docSnap=>docSnap.data())
        console.log(allusers)
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    },[])

     const RenderCard = ({item}) => {
            return (
                    <View style={{marginTop: 85}}>
                        <Image source={{uri:item.image}} style={styles.image} value={image}/>
                    <Text style={{fontSize: 18,  margin: 9, marginTop: 50, marginHorizontal: 60}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 Email:
              </Text> {item.email}
                        </Text>
                        <Text style={{fontSize: 18, margin: 9, marginTop: 30, marginHorizontal: 60}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 First Name:
              </Text> {item.firstName}
                        </Text>
                        <Text style={{fontSize: 18, margin: 9, marginTop: 30, marginHorizontal: 60}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 Last Name:
              </Text> {item.lastName}
                        </Text>
                <FontAwesome style={{marginHorizontal: 13, marginVertical: -94 }} name="user-circle-o" size={26} color="#2e64e5" />
                <FontAwesome style={{marginHorizontal: 13, marginBottom: 37 }} name="user-circle-o" size={26} color="#2e64e5" />
                <FontAwesome style={{marginHorizontal: 13, marginBottom: 60, marginVertical: 65}} name="user-circle-o" size={26} color="#2e64e5" />
             </View>         
            )
     }

          /*displayName: firebase.auth().currentUser.displayName,
          uid: firebase.auth().currentUser.uid*/

  
  // useEffect(() => {
  // UserProfile()
  // }, [])



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

    return (
      <View style={styles.container}>
           {/* <View style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     right: 0,
                     height: 90,
                     flexDirection: 'row',
                     alignItems: 'flex-end',
                     paddingHorizontal: 25,
                     paddingBottom: 20
                 }}>
                <TouchableOpacity
                 
                 onPress = {() => navigation.navigate("HomeScreen")}
                >
                    <Ionicons name="arrow-back-circle-outline" size={30} color="#2e64e5" />
                </TouchableOpacity>
            </View> */}
          <FlatList
                    style={styles.myFlatList}
                    data={users}
                    renderItem={({item})=> {return <RenderCard item={item} />}}
                    keyExtractor={(item) =>item.uid}
                />

            <View style={{alignSelf: 'flex-end'}}>
               <TouchableOpacity style={{
                    marginRight: 30
                   }}
                   style={styles.userBtn1}
                   onPress={signOut}
                >
             <Text style={styles.userBtnTxt1}>Log out</Text>
                </TouchableOpacity>
               </View>

               <View>
              {isModalVisible &&
                <UpdateUserProfile
                   isVisible={isModalVisible}
                   onClose={() => setModalVisible(false, {
                    firstName: firstName
                   })}
                />
               } 
          < TouchableOpacity
                style={styles.userBtn}             
                  onPress={() => setModalVisible(true)}
                >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              </View> 
      
               {/* <View style={{marginTop: 35, alignSelf: 'flex-end'}}>
               <TouchableOpacity style={{
                    marginRight: 35
                   }}
                   onPress={signOut}
                >
                    <SimpleLineIcons name="logout" size={24}
                     color="#000" />
                </TouchableOpacity>
               </View> */}
           <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={20} color={'#fff'}
              onPress={() => navigation.navigate('HomeScreen')}
               />
             </View>
             <View>
                <FontAwesome5 style= {{
             
              }} name='book' size={20} color={'#fff'}
              onPress={() => navigation.navigate('BookingList')}
               />
             </View>
             <View>
        
                <FontAwesome5 style= {{
              
              }} name='user-alt' size={20} color={'#fff'}
                onPress={() => navigation.navigate('ProfileScreen')}
              />

             </View>
             </View>
         </View>
      </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: "100%",
    backgroundColor:'#ecf0f6',
    alignSelf: 'center'
  },

//   myFlatList: {
   
//     marginLeft: 20,
    
// },

image: {
  width: 140,
  height: 140,
  borderRadius: 70,
  borderWidth: 2,
  backgroundColor: "lightgrey",
  alignSelf: 'center',
  marginTop: 50,
},

userBtn: {
  borderColor: '#2e64e5',
  borderWidth: 2,
  borderRadius: 3,
  paddingVertical: 8,
  paddingHorizontal: 14,
  marginHorizontal: 25,
  marginBottom: 100,
  width: 80
},
userBtnTxt: {
  color: '#2e64e5',
  textAlign: 'center'
},

userBtn1: {
  borderColor: '#2e64e5',
  borderWidth: 2,
  borderRadius: 3,
  paddingVertical: 8,
  paddingHorizontal: 14,
  marginHorizontal: 30,
  marginBottom: -39,
  width: 80
},
userBtnTxt1: {
  color: '#2e64e5',
},

bottomBar: {
  height: height * 0.06,
  width: '100%',
  backgroundColor: '#255E69',
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
},

containerIcon: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  color: '#fff'
},

});
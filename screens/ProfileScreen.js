import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, ScrollView, FlatList, Image } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { auth, db } from "../firebase/firebase";
import { SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
//import { Avatar } from 'react-native-elements';

const ProfileScreen = ({navigation, route}) => {
  const [displayName, setDisplayName] = useState('');
  //const [firstName, setFirstName] = useState('')
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = React.useState(null);

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const PickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

     const RenderCard = ({item}) => {
            return (
                <View>
      
                    <Image source={{uri:item.avatar}}/>
                    <View >
                    <Text style={{fontSize: 18,  margin: 9}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 Email:
              </Text> {item.email}
                        </Text>
                        <Text style={{fontSize: 18, margin: 9}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 First Name:
              </Text> {item.firstName}
                        </Text>
                        <Text style={{fontSize: 18, margin: 9}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                 last Name:
              </Text> {item.lastName}
                        </Text>
                    </View>
             
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
      <View style={{flex: 1,height: '100%', width: "100%", backgroundColor:'#67C8D5'}}>
               <View style={{marginTop: 35, alignSelf: 'flex-end'}}>
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
          {/* <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Image
              style={styles.userImg}
              source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        </ScrollView> */}
            <View>
              <TouchableOpacity  onPress={PickImage}>
              <Image style={styles.image} source={{uri: image}} value={image}/>
              {/* {image && <Image source={{ uri: image }} />} */}
              </TouchableOpacity>
          </View>
              <FlatList
                    style={styles.myFlatList}
                    data={users}
                    renderItem={({item})=> {return <RenderCard item={item} />}}
                    keyExtractor={(item) =>item.uid}
                />
          </View>
      </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  myFlatList: {
    marginTop: 100,
    marginLeft: 20,
    marginVertical: 20
},

image: {
  width: 140,
  height: 140,
  borderRadius: 200,
  borderWidth: 2,
  backgroundColor: "lightgrey",
  marginTop: -70,
  alignSelf: 'center'
  
},

thumbnail: {
  width: 300,
  height: 300,
  resizeMode: "contain"
},

myImage: {
    width: 300,
    height: 300,
    resizeMode: "contain"
},

});
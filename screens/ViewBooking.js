import React, { useEffect } from 'react';
import { restaurants } from './restaurant';
import {Alert, Modal, ImageBackground, View, Text, SafeAreaView, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import firebase from 'firebase';
import { auth, db } from '../firebase/firebase';

const { width, height } = Dimensions.get('screen');

const ViewBooking = ({ navigation, user, route }) => {

  const [users, setUsers] = React.useState(null)

  const { adminuid, name, description, image, firstName, lastName}= route.params;
  React.useState(() => {
      const { users, adminuid } = route.params;
      setUsers(users)
  }, [users])

  const [imageUrl, setImageUrl] = React.useState('');

  const getUsers = async () => {
    const querySnap = await db.collection('users').where('uid','!=',user.uid).get()
    const allusers = querySnap.docs.map(docSnap=>docSnap.data())
    console.log(allusers)
    setUsers(allusers)
}


  useEffect(() => {
    getUsers()
  },[])

  const RenderCard = ({item}) => {
    return (
        <View style={styles.myButton}>
            <View>
                <Text>
                    {item.firstName + " " + item.lastName}
                </Text>
                <Text>
                    {item.email}
                </Text>
            </View>
       
        </View>
    )
}

    return (
      <View style={styles.container}> 
           <ImageBackground
                source={require('../assets/confirm.png')}
                style={styles.imageBack}
           >
                
           </ImageBackground>
           <View style={{
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
                 
                  onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
           <Text style={{fontWeight: 'bold', fontSize: 26, marginTop: 40}}>Thank you for booking!</Text>
           <View style={{marginTop: 50, width: '70%'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  congratulations {route.params.firstName} {route.params.lastName}, you have booked {route.params.name} for {route.params.count} people on {moment(route.params.date).format('DD/MM/YYYY')}
                  at {moment(route.params.date).format('hh:mm a')}
                {/* {route.params.text} */}
              </Text>
           </View>
           <View style={styles.myButton}>
             <TouchableOpacity onPress={() => navigation.navigate('BookingList')} >
                <Text style={styles.btnText}>ViewBookings</Text>  
             </TouchableOpacity>
           </View>
           <View style={styles.myButton1}>
             <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} >
                <Text style={styles.btnText1}>Done</Text>  
             </TouchableOpacity>
           </View>
      </View>

  );
  
}

export default ViewBooking;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },

    title: {
       color: '#040405',
       fontSize: 20,
       fontWeight: 'bold',
       justifyContent: 'space-between',
       marginBottom: 45,
    },

    imageBack: {
      width: '100%',
      height: height * 0.4,
    },

    moreTitle: {
        color: '#040405',
        marginBottom: 170,
        marginLeft: 20,
    },

    myButton: {
        borderRadius: 10,
        backgroundColor: '#255E69',
        marginHorizontal: 50,
        marginLeft: 54,
         marginTop: 90,
        borderRadius: 58,
        width: width * 0.7,
        height: height * 0.05,

    },

    btnText: {
        color: "#fff",
        fontSize: 17,
        justifyContent: "center",
        textAlign: "center",
        alignItems: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },

    myButton1: {
      borderRadius: 10,
      backgroundColor: '#255E69',
      marginHorizontal: 50,
      marginLeft: 54,
      marginTop: 60,
      borderRadius: 58,
      width: width * 0.3,
      height: height * 0.05,
  },

  btnText1: {
      color: "#fff",
      fontSize: 17,
      justifyContent: "center",
      textAlign: "center",
      alignSelf: 'center',
      marginTop: 10,
      fontWeight: 'bold'
  },

  })
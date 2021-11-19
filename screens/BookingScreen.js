import React, { useEffect, useState } from "react";
import { restaurants } from './restaurant';
import {TouchableOpacity, ScrollView, Dimensions, Alert ,ImageBackground, View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase';
import 'firebase/firestore';
import { auth, db } from "../firebase/firebase";

const BookingScreen = ({ navigation, route }) => {

const [users, setUsers]=  React.useState('');

const { name, adminuid }= route.params;
  // React.useState(() => {
  //     const { users, adminuid } = route.params;
  //     setUsers(users)
  // }, [users])

  //const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);

    //const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    //const [showBookingModal, setShowBookingModal] = React.useState(isVisible)
    const [count, setCount] = React.useState(1);
    
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [text, setText] = React.useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'Android');
      setDate(currentDate);

    const tempDate = new Date(currentDate);
      const fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      const fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      setText(fDate + '\n' + fTime)
      //setText(fDate + ' (' + fTime + ') ')
    };

    const showMode = (currentMode) => {
       setShow(true);
       setMode(currentMode);
    }

        const handleIncrement = () => {
          setCount(prevCount => prevCount + 1);
        };

        const handleDecrement = () => {
          setCount(prevCount => prevCount - 1);
        };
        
        const AddBookings = ({fDate, fTime}) => {   
          const user = auth.currentUser;
          navigation.navigate('ViewBooking', {
            fDate: fDate,
            fTime: fTime,
            count: count,
            name: name,
            //name: item.name,
          })
          
          if (user) {
            db.collection("bookings").add({
              uid: user.uid,
              date: date,
              count: count, 
              name: name,
              adminuid: adminuid
              //name: item.name,      
          })
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
          } else {
            Alert.alert("User does not exist")
          }
        };

    return (
              <View style={{flex: 1}}>

                <View>
                   <Image style={{height: 180, width: 180, alignSelf: 'center', marginTop: 40}} source={ require("../assets/calendar1.png")}/>

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
                    <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>

                   <Text style={{fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginTop: 15}}>Book a Table</Text>
                    {restaurants.name}
                </View>

               <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 30, marginTop: 40}}>
                   <View style={{marginRight: 70, marginTop: 15}}>
                   <Text>Number of Persons</Text>
                   </View>
               <View>
                    <TouchableOpacity onPress={() => handleDecrement()} style={{ marginRight: 10, width: 40, height: 40, backgroundColor: '#fff', borderRadius: 20}} >
                         <Text style={{ fontSize: 29, textAlign: "center", marginBottom: 14}}>-</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{marginTop: 7, fontWeight: 'bold'}}>{count}</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => handleIncrement()} style={{marginLeft: 10, width: 40, height: 40, backgroundColor: '#fff', borderRadius: 20}} >
                         <Text style={{fontSize: 25, textAlign: "center", marginBottom: 14}}>+</Text>
                    </TouchableOpacity>
                </View>

               </View>
            
             <Text style={{fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>{text}</Text>
            <View style={{marginTop: 25, flexDirection: 'row', maxWidth: '100%', justifyContent: 'space-between'}}>
               <View>
                <Text style={{marginLeft: 30}}>Pick a Date</Text>
               </View>
               <View>
               <TouchableOpacity style={{height: 36, width: 50, backgroundColor: '#255E69', borderRadius: 10, marginHorizontal: 50,}}  onPress={() => showMode('date')} >
                    
                    <Text style={{color: "#fff", fontSize: 12, justifyContent: "center", textAlign: "center", fontWeight: 'bold', marginTop: 12}}>Date</Text> 
                </TouchableOpacity> 
              </View> 
  
             </View>
             
             <View style={{marginTop: 25, flexDirection: 'row', maxWidth: '100%', justifyContent: 'space-between'}}>
                 <View>
                  <Text style={{marginLeft: 30}}>Pick a Time</Text>
                 </View>
                <View>
                <TouchableOpacity style={{height: 36, width: 50, backgroundColor: '#255E69', borderRadius: 10, marginHorizontal: 50,}} onPress={() => showMode('time')} >
                   <Text style={{color: "#fff", fontSize: 12, justifyContent: "center", textAlign: "center", fontWeight: 'bold', marginTop: 12}}>Time</Text> 
                </TouchableOpacity>  
                </View>
             </View>

                  {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

             <View style={{marginTop: 140, alignItems: 'center' }}>
               <TouchableOpacity style={{height: 37, width: 85, backgroundColor: '#255E69', borderRadius: 50, }} onPress={AddBookings}>
         
                   <Text style={{ color: "#fff", fontSize: 13, justifyContent: "center", textAlign: "center", marginTop: 10, fontWeight: 'bold'}}>Reserve</Text>  
               </TouchableOpacity>
             </View>
                
            </View>   
    );
}

export default BookingScreen;
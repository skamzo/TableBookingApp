import React from 'react';
import { restaurants } from './restaurant';
import {Alert, Modal, ImageBackground, View, Text, SafeAreaView, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';

const { width, height } = Dimensions.get('screen');

const ViewBooking = ({ navigation }) => {

    return (
      <View style={styles.container}> 
           <ImageBackground
                source={require('../assets/confirm.png')}
                style={styles.imageBack}
           >
                
           </ImageBackground>
           <Text style={{fontWeight: 'bold', fontSize: 26, marginTop: 40}}>Thank you for booking!</Text>
           <View>
              
           </View>
           <View style={styles.myButton}>
             <TouchableOpacity onPress={() => navigation.navigate('')} >
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
        marginBottom: 50,
        borderRadius: 58,
        width: width * 0.7,
        height: height * 0.05,
        marginTop: 200
    },

    btnText: {
        color: "#fff",
        fontSize: 17,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
        fontWeight: 'bold'
    },

    myButton1: {
      borderRadius: 10,
      backgroundColor: '#255E69',
      marginHorizontal: 50,
      marginLeft: 54,
      marginBottom: 50,
      borderRadius: 58,
      width: width * 0.3,
      height: height * 0.05,
  },

  btnText1: {
      color: "#fff",
      fontSize: 17,
      justifyContent: "center",
      textAlign: "center",
      marginTop: 10,
      fontWeight: 'bold'
  },

  })
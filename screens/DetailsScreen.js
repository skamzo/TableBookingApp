import React from 'react';
import {ImageBackground, View, Text, SafeAreaView, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { foodmenu } from './restaurant';
//import { restaurants } from './restaurant';

const { width, height } = Dimensions.get('screen');

const DetailsScreen = ({ route, navigation }) => {

  //const [restaurants, setRestaurants] = React.useState('');
const [users, setUsers]=  React.useState('');
  //const [showBookingModal, setShowBookingModal] = React.useState(false)
const { adminuid, name, description, image}= route.params;
  React.useState(() => {
      let { users, adminuid } = route.params;
      setUsers(users)
  }, [users])

  const HorizontalFoodCard = ({containerStyle, imageStyle, item}) => {
        return (
          <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                borderRadius: 15,
                 backgroundColor: '#F2F2F2',
                 ...containerStyle
              }}
          >
            <Image
               source={item.image}
               style={imageStyle}
            />
            <View style={{flex: 1}}>
                <Text style={{marginLeft: 10}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
  }

  const renderImageInfoSection = () => {
    return (
     <SafeAreaView style={{flex: 1}}>
       <View style={styles.imageBack}> 
        <View>
        <ImageBackground
              source={{uri: image}}
              style={{
                position: 'absolute',
                top: 0,
                right:0,
                bottom: 0,
                left: 0,
                height: height / 4.1,
                width: '100%'
              }}   
          />
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
        </View>
      </View>
       
        <View>
           <Text style={{marginTop: 200, marginLeft: 20, fontWeight: 'bold', fontSize: 20}}>{name}</Text>
           <Text style={{marginLeft: 20, fontSize: 15}}>MENU</Text>
        </View>
            
      <View style={styles.flatList}>
           <FlatList
                data={foodmenu}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                      <HorizontalFoodCard
                           containerStyle={{
                              height: 80,
                              width: 200,
                              alignItems: 'center',
                              marginHorizontal: 65,
                              marginBottom: 10
                           }}
                           imageStyle={{
                            alignItems: 'center',
                              marginLeft: 10,
                              height: 70,
                              width: 70
                           }}
                           item={item}
                      />                     
                    )
                }}
           >
           </FlatList>
      </View>
      <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 6, textAlign: "center"}}>About Restaurant</Text>
      <View style={{marginTop: 10}}>
          <Text style={{marginHorizontal: 15}}>{description}</Text>
      </View>
    </SafeAreaView>
  );
  }

  if (users) {
      return (
        <View style={styles.container}> 
          <View style={styles.header}>
             {renderImageInfoSection()}
          </View> 

         <View style={styles.myButton}>
           <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {
              users: users.name,
              name: name,
              adminuid: adminuid,
              //users: item, adminuid: item.uid,
              //name: item.name,
           })} >
                <Text style={styles.btnText}>Book a Table</Text>  
              </TouchableOpacity>
          </View>   
          
        </View>
    );
  } else {
    return (<></>)
  }  
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },

    title: {
       color: '#040405',
       fontSize: 20,
       fontWeight: 'bold',
       justifyContent: 'space-between',
       marginBottom: 45,
    },

    header: {
      flex: 4,
    },

    moreTitle: {
        color: '#040405',
        marginBottom: 170,
        marginLeft: 20,
    },

    myButton: {
        width: width / 1.4,
        height: height * 0.05,
        backgroundColor: '#255E69',
        borderRadius: 10,
        marginHorizontal: 50,
        marginLeft: 54,
        marginBottom: 20,
        borderRadius: 58
    },

    btnText: {
        color: "#fff",
        fontSize: 17,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
        fontWeight: 'bold'
    },

    flatList: {
      marginTop: 15
    }

  })
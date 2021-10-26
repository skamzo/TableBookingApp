import React from 'react';
import { restaurants } from './restaurant';
import {Alert, Modal, ImageBackground, View, Text, SafeAreaView, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import BookingScreen from './BookingScreen';
import { foodmenu } from './restaurant';

const { width, height } = Dimensions.get('screen');

const DetailsScreen = ({ route, navigation }) => {

  const [restaurants, setRestaurants] = React.useState(null);

  //const [showBookingModal, setShowBookingModal] = React.useState(false)

  React.useState(() => {
      let { restaurants } = route.params;
      setRestaurants(restaurants)
  }, [restaurants])

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
              source={restaurants.image}
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
        </View>
           <View>
           <Text style={{marginTop: 240, marginLeft: 20, fontWeight: 'bold', fontSize: 20}}>{restaurants.name}</Text>
           </View>
            <Text style={{marginLeft: 20, fontSize: 17}}>MENU</Text>
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
                              width: 170,
                              alignItems: 'center',
                              marginHorizontal: 50,
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
      <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10, textAlign: "center"}}>About Restaurant</Text>
      <View style={{marginTop: 25}}>
          <Text style={{marginHorizontal: 15}}>{restaurants.description}</Text>
      </View>
    </SafeAreaView>
  );
  }

  if (restaurants) {
      return (
        <View style={styles.container}> 
          <View style={styles.header}>
             {renderImageInfoSection()}
          </View> 

         <View style={styles.myButton}>
           <TouchableOpacity onPress={() => navigation.navigate('BookingScreen')} >
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
        marginBottom: 50,
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

  })
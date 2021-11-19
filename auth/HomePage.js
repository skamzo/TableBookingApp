import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import constant from 'expo-constants';
import { RestaurantData, popular } from '../data/flatListData';
import { ScrollView } from 'react-native-gesture-handler';
import { db, auth } from '../data/firebase';

const image1 = {uri: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"};

const HomePage = ({navigation}) => {

  const[users, setUsers] = useState(null)
    
    const getUsers = async () => {
            const querySanp = await db.collection('admin').get()
            const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            console.log(allusers)
            setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])


  const Item = ({ image, name, description }) => {
    return (
      <ScrollView >
      <View style={styles.listItem} >
          <Image source={{uri:image}} style={styles.img}/>
            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: "bold"}}>{name}</Text>
                <View style={{width: 230}}>
                  <Text>{description}</Text>
                </View>
            </View>
      </View>
      </ScrollView>
    );
  }

  const Items = ({ image, name }) => {
    return (
      <>
      <ScrollView>
      <View style={styles.listItem2} onPress = {() => navigation.navigate("RestaurantDetails")}>
          <Image source={{uri:image}} style={styles.img}/>
          <View style={{marginLeft: 10}}>
            <Text style={{fontWeight: "bold"}}>{name}</Text>
          </View>
      </View>
      </ScrollView>
      
      </>
    );
  }
  

  return (
    <View  style={styles.container}>
        <View style={styles.Top}>
                <Image source = {image1} resizeMode="stretch" style={styles.image1}/>
            <View  style={styles.HeadText}>
                <Text style={styles.TextRestaurant}>
                  Restaurant
                </Text>
            </View>
        </View>


        <View style={{flex:1, padding: 10}}>

          <Text style={styles.RestaurantList}>
            Restaurant List
          </Text>
        
            <FlatList 
            showsVerticalScrollIndicator={false}
              data={users}
              renderItem={({ item }) => {
                return(
                  <ScrollView>
                    <TouchableOpacity onPress = {() => navigation.navigate("RestaurantDetails", {users:item, adminuid: item.uid})}>
                      <Item image={item.image} name={item.name} description={item.description}/>
                    </TouchableOpacity>
                </ScrollView>)}
            }
                keyExtractor = {(item) => item.id}
            />
        </View>

        <View style={{flex:1, padding: 10, marginTop: -15}}>

          <Text style={styles.RestaurantList}>
              Popular Restaurant
            </Text>

            <FlatList 
                horizontal={true}
                data={ popular }
                renderItem={({ item }) => {
                  return(
                    <ScrollView >
                  <Items image={item.image} name={item.name}/>
                  </ScrollView>)}
              }
                  keyExtractor = {(item) => item.id}
              />
        </View>

        <View style={styles.Tab}>
          <FontAwesome name="home" size={24} color="white" onPress = {() => navigation.navigate("Home")}/>
          <FontAwesome name="list" size={24} color="white" style={{marginLeft: 130}} onPress = {() => navigation.navigate("Bookings")}/>
          <FontAwesome name="user-circle-o" size={24} color="white" style={{marginLeft: 130}} onPress = {() => navigation.navigate("Profile")}/>
        </View>

    </View>
    
  )
}
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
  Tab: {
    flexDirection: "row",
    height: 70,
    width: 360,
    backgroundColor: "#2e8b57",
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: "center",
    position: 'absolute',
    bottom: 0, 
  },
  text: {
    marginTop: 300,
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
},
Top:{
  marginTop: constant.statusBarHeight,
  height: 150,
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20,
},
image1: {
  flex: 1, 
  justifyContent: "center", 
  borderBottomRightRadius: 20, 
  borderBottomLeftRadius: 20
},
HeadText:{
  marginTop: -60,
  justifyContent: "center",
  textAlign: "center",
  alignSelf: "center",
  height: 80,
  
},
TextRestaurant:{
  fontSize: 40,
  color: "white",
  height: 150,
},
RestaurantList: {
  fontSize: 30, 
  color: "#2e8b57", 
  fontWeight: "bold"
},
flatListItem: {
  color: "#d3d3d3",
  padding: 10,
  fontSize: 16,
},
listItem: {
  paddingLeft: 5,
  paddingTop: 5,
  margin: 3,
  flex: 1,
  flexDirection: "row",
  borderRadius: 10,
  backgroundColor: "white",
  borderWidth: 1
},
listItem2: {
  paddingLeft: 20,
  paddingTop: 10,
  flex: 1,
  flexDirection: "column",
  borderRadius: 10,

},
img: {
  height: 80,
  width: 80,
  borderRadius: 10
}
});
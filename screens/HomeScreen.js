import React from 'react';
import { restaurants } from './restaurant';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';
import { auth, db} from "../firebase/firebase";

const { width, height } = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {

const [email, setEmail] = React.useState(null);
const [firstName, setFirstName] = React.useState('');
const [lastName, setLastName] = React.useState('');
  
  const Input = ({ placeholder, onChangeText }) => {
    return (
      <View style={styles.inputContainer}>
          <FontAwesome5 style= {{
              position: 'absolute',
              left: 10,
              top: 14,
              color:'#255E69'
          }} name='search' size={25} />
          <TextInput style={styles.input} placeholder={placeholder} />
     </View>
    );
  } 
  
  const RestaurantCard = ({containerStyle, imageStyle, item}) => {
    return (
      <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            borderRadius: 15,
            alignSelf: 'center',
             backgroundColor: 'cadetblue',
             ...containerStyle
          }}
          activeOpacity={0.8} onPress={() => navigation.navigate('DetailsScreen', {
            users: item, adminuid: item.uid, name: item.name,
           description: item.description, image: item.image,
           email: email, email: item.email, firstName: item.firstName, lastName: item.lastName,
          }, {title: 'Restaurants'})}
      >
        <Image
           source={{uri: item.image}}
           style={imageStyle}
        />
        <View style={{flex: 1}}>
            <Text style={{marginLeft: 15, color: '#fff', fontSize: 16, fontFamily: "serif"}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
}

  const[users, setUsers] = React.useState(null)
    const getUsers = async () => {
            const querySanp = await db.collection('admin').get()
            const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            console.log(allusers)
            setUsers(allusers)
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    // const getUser = async () => {
    //     const uid = auth?.currentUser?.uid;
    //     const querySnap = await db.collection('users').where('uid','==', uid).get();
    //     const allusers = querySnap.docs.map(docSnap=>docSnap.data())
    //     console.log(allusers)
    //     setUsers(allusers)
    // }

    // React.useEffect(() => {
    //     getUser()
    // },[])

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
            <View style={styles.container}>   
              <Input placeholder='Search for a restaurant'/>
               <View style={styles.flatlist}>
               <FlatList
                data={users}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                      <RestaurantCard
                           containerStyle={{
                              height: 130,
                              width: 300,
                              alignItems: 'center',
                              marginHorizontal: 65,
                              marginBottom: 15,
                              
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 5,
                                height: 5,
                              },
                              shadowOpacity: 0.5,
                              shadowRadius: 1.3,

                              elevation: 5
                              
                           }}
                           imageStyle={{
                            alignItems: 'center',
                              marginLeft: 10,
                              height: 110,
                              width: 110,
                              borderRadius: 10,
                              shadowColor: '#fff',
                              shadowOffset: {
                                width: 5,
                                height: 5,
                              },
                              shadowOpacity: 0.5,
                              shadowRadius: 1.3,

                              elevation: 5
                           }}
                           item={item}
                      />                     
                    )
                }}
           >
           </FlatList>
         </View>
         
           <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={20} color={'#fff'} />
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

      </SafeAreaView>
   ); 
   
}

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
       flex: 1,
       backgroundColor: 'ECF0F6',
       justifyContent: 'center',
       alignItems: "center",
       marginTop: 55
    },

    inputContainer: {
          backgroundColor: 'lightgrey',
          width: width / 1.2,
          padding: 8,
          marginTop: 10,
          borderRadius: 30,
          height: height / 14,

          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1.3,

          elevation: 1
      
    },

    input: {
        color: '#000',
        marginLeft: 40,
        marginTop: 5
    },

    flatlist: {
      flex: 1,
      marginTop: 30
    },

    images: {
        width: width / 3.5,
        height: height / 10.9,
        borderRadius: 18,
        padding: 10,
        marginHorizontal: 10,
    },

    listItem: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
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

    title: {
       color: '#fff',
       fontSize: 20,
       fontWeight: 'bold',
       justifyContent: 'space-between',
       marginTop: 10,
       marginLeft: 35,
    },

    myButton: {
        width: 310,
        height: 50,
        backgroundColor: '#ff9f4d',
        borderRadius: 10,
        marginHorizontal: 50,
        marginLeft: 30,
        marginTop: 15,
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    }

  })

  
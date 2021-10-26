import React from 'react';
import { restaurants } from './restaurant';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"

const { width, height } = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  
  const Input = ({ placeholder, onChangeText }) => {
    return (
      <View style={styles.inputContainer}>
          <FontAwesome5 style= {{
              position: 'absolute',
              left: 8,
              top: 5,
          }} name='search' size={20} />
          <TextInput style={styles.input} placeholder={placeholder} />
     </View>
    );

  }   

  const Item = ({ image, name }) => {
    return (
     
       <View style={{flexDirection: 'column'}}>
       <View>
      <Image style={styles.images} source={image}/>
       </View>
      <View style={{marginTop:-30, backgroundColor: 'white', textAlign: 'center', opacity: 0.9}}>
      <Text style={styles.nameText}>{name}</Text>
      </View>
      </View>
       
     
    );
  } 

  // const Card = () => {
  //     return <View></View>
  // };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
            <View style={styles.container}>   
              <Input placeholder='Search for a restaurant'/>
               <View style={styles.flatlist}>
                 <FlatList
                  contentContainerStyle={{paddingLeft: 20}}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  numColumns={2}
                  scrollEnabled={false}
                  data={restaurants}
                  renderItem = {({item}) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailsScreen', {
                      restaurants: item
                    }, {title: 'Restaurants'})} style={styles.listItem}>
                      <Item image={item.image} name={item.name}/>
                      </TouchableOpacity>
                  )}
                  
                  //keyExtractor={(item, index) => index.toString()}
                  keyExtractor = {(item) => item.id}
                  //ItemSeparatorComponent={ItemSeparatorComponent}
            />
         </View>
         <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={20} color={'#fff'} />
             </View>
             <View>
                <FontAwesome5 style= {{
             
              }} name='book' size={20} color={'#fff'} />
             </View>
             <View>
                <FontAwesome5 style= {{
              
              }} name='user-alt' size={20} color={'#fff'}/>
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
       marginTop: 30
    },

    inputContainer: {
          backgroundColor: 'lightgrey',
          width: width / 1.9,
          padding: 8,
          marginTop: 10,
          borderRadius: 20,

          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1.3,
    },

    input: {
        color: '#000',
        marginLeft: 40,
    },

    flatlist: {
      flex: 1
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

    nameText: {
        
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

  
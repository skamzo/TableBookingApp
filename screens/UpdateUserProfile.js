import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Picker, TouchableOpacity, Button, TextInput, Modal, Dimensions, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase/firebase';

const UpdateUserProfile = ({isVisible, onClose}) => {

    const [isModalVisible, setModalVisible] = React.useState(isVisible);
    const [image, setImage] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Beverage");
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [price, setPrice] = React.useState('');
    
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
   
    React.useEffect(() => {
        if(!isModalVisible) {
            onClose()
        }
    }, [isModalVisible])

    const UpdateRestaurant = () => {
        const uid = auth?.currentUser?.uid;  
        return db.collection('users').doc(uid).update({
        uid: uid,
        image: image,
        email: email,
        firstName: firstName,
        lastName: lastName,
         }).then(() => { 
      Alert.alert('User profile successfully updated')
    })
  .catch((error) => {
   const errorMessage = error.message;
    alert(errorMessage)
  });
}


    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
      >
       <View
         style={{
           margin: 20,
           padding: 35,
           backgroundColor: '#fff',
           height: 600,
           width: '90%',
           alignItems: 'center',
           borderTopRightRadius: 30,
           borderTopLeftRadius: 30,
           shadowColor: "#000",
           shadowOffset: {width: 3, height: 9},
           shadowOpacity: 4,
           shadowRadius: 20,
           elevation: 5
         }}
       >
        
        <View>
        <MaterialIcons style={{
            marginLeft: 220
        }} name="cancel" size={30} color="#255C69"
            onPress={() => setModalVisible(!isModalVisible)}
         />
        </View>
        <View>
              <TouchableOpacity  onPress={PickImage}>
              <Image style={styles.image} source={{uri: image}} value={image}/>
              {/* {image && <Image source={{ uri: image }} />} */}
              </TouchableOpacity>
          </View>
        <View style={styles.myTextinput}>
      
        <View>
           <TextInput 
               placeholder="E-mail"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={email}
               onChangeText={text => setEmail(text)}  
            ></TextInput>
           </View>
           <View>
           <TextInput 
               placeholder="First Name"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={firstName}
               onChangeText={text => setFirstName(text)}  
            ></TextInput>
           </View>
           <View>
           <TextInput 
               placeholder="Last Name"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={lastName}
               onChangeText={text => setLastName(text)}  
            ></TextInput>
           </View>
       
     </View>

      <View>
      <TouchableOpacity style={styles.myButton} 
          onPress={UpdateRestaurant}
      >
            <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
      </View>
 
       </View>
      </Modal>
    )
}

export default UpdateUserProfile;

const styles = StyleSheet.create({
    /* Other styles hidden to keep the example brief... */
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

    myPicker: {
        flex: 1,
        paddingTop: 30,
    },

    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderColor: '#255C69',
        padding: 10,
        marginTop: 30
      },

      myButton: {
        width: 130,
        height: 50,
        backgroundColor: '#255C69',
        borderRadius: 30,
        marginHorizontal: 50,
        marginLeft: 30,
        marginTop: 24
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    },

    image: {
        width: 120,
        height: 120,
        borderRadius: 120,
        borderWidth: 2,
        backgroundColor: "cadetblue",
      },

  inputContainer: {
    backgroundColor: 'lightgrey',
    width: 1.3,
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

textInput: {
    paddingLeft: 5,
    marginBottom: 30,
    borderBottomColor: '#f79f4c',
    borderBottomWidth: 1,
    paddingBottom: 20,
    justifyContent: 'space-between',
    width: 200,
    color: '#000',
},

myTextinput: {
    marginTop: 37
}

   

  });
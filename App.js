import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingScreen from './screens/BookingScreen';
import ViewBooking from './screens/ViewBooking';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { auth } from './firebase/firebase';

const Stack = createNativeStackNavigator();

const App = () => {

  const [user, setuser] = useState('')
    useEffect(() => {
      const unregister = auth.onAuthStateChanged(userExist=>{
            if(userExist) setuser(userExist)
            else setuser("")
      })

      return () => {
        unregister()
      }

  }, [])
  
  return (
    // <NavigationContainer>
    //     <Stack.Navigator>

             
             


    //         <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
    //         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="DetailsScreen" component={DetailsScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="BookingScreen" component={BookingScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="ViewBooking" component={ViewBooking} />
    //     </Stack.Navigator>
    // </NavigationContainer>


    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerTintColor: 'cadetblue'
            }}
        >
          {user?
          <>
          <Stack.Screen options={{headerShown: false}} name="HomeScreen"  >
            {props => <HomeScreen {...props } user={user} />}
          </Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
          </>
          :
          <>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
           
          </>
          }
        
        <Stack.Screen options={{headerShown: false}} name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen options={{headerShown: false}} name="BookingScreen" component={BookingScreen} />
        <Stack.Screen options={{headerShown: false}} name="ViewBooking" component={ViewBooking} />
    
       </Stack.Navigator>
   </NavigationContainer>


  ); 
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

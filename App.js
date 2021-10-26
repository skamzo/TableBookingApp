import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingScreen from './screens/BookingScreen';
import ViewBooking from './screens/ViewBooking';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
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

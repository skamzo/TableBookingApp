import React from 'react';
import { restaurants } from './restaurant';
import {TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback ,ImageBackground, View, Text, StyleSheet, Image} from 'react-native';
//import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker'

const BookingScreen = ({ navigation }) => {

    //const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    //const [showBookingModal, setShowBookingModal] = React.useState(isVisible)
    const [count, setCount] = React.useState(1);
    
    const [date, setDate] = React.useState(new Date(1598051730000));
    //const [time, setTime] = React.useState(new Time('time'));
    //const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);




    handleChange = (date) => {
          console.log("date", date);
          React.useState(() => {
            let { date } = route.params;
            setDate(date)
        }, [date])
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'Android');
        setDate(currentDate);
      };

        const handleIncrement = () => {
          setCount(prevCount => prevCount + 1);
        };

        const handleDecrement = () => {
          setCount(prevCount => prevCount - 1);
        };

        const showMode = (currentMode) => {
          setShow(true);
          setMode(currentMode);
        };

        const showDatepicker = () => {
          showMode('date');
        };

        const showTimepicker = () => {
          showMode('time');
        };

        const handleConfirm = date => {
          console.warn("A date has been picked: ", date);
          hideDatePicker();
        };

    return (
              <View style={{flex: 1}}>

                <View>
                   <Image style={{height: 180, width: 180, alignSelf: 'center', marginTop: 40}} source={ require("../assets/calendar1.png")}/>

                   <Text style={{fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginTop: 15}}>Book a Table</Text>
                </View>

               <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 30, marginTop: 40}}>
                   <View>
                   <Text style={{marginRight: 120}}>Number of Persons</Text>
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
            
               <Text style={{marginLeft: 30}}>Pick a date</Text>
            <View style={{marginLeft: 214, marginTop: 25}}>
                <TouchableOpacity style={{height: 36, width: 50, backgroundColor: '#255E69', borderRadius: 10, marginHorizontal: 50,}}  onPress={() => onPress={showDatepicker}} >
                    
                   <Text style={{color: "#fff", fontSize: 12, justifyContent: "center", textAlign: "center", fontWeight: 'bold', marginTop: 12}}>Date</Text> 
                </TouchableOpacity>  
                
                <DateTimePicker
                        date
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        //mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{
                          width: 100,
                          height: 34,
                          marginHorizontal: 5,
                          backgroundColor: 'red'
                        }}
                        />
             </View>
             <Text style={{marginLeft: 30}}>Pick a date</Text>
             <View style={{marginLeft: 214}}>
                <TouchableOpacity style={{height: 36, width: 50, backgroundColor: '#255E69', borderRadius: 10, marginHorizontal: 50,}}  onPress={() => onPress={showTimepicker}} >
                   <Text style={{color: "#fff", fontSize: 12, justifyContent: "center", textAlign: "center", fontWeight: 'bold', marginTop: 12}}>Time</Text> 
                </TouchableOpacity>  
             </View>

             <View style={{marginTop: 200, alignItems: 'center' }}>
               <TouchableOpacity style={{height: 37, width: 85, backgroundColor: '#255E69', borderRadius: 50, }} onPress={() => navigation.navigate('ViewBooking')} >
                   <Text style={{ color: "#fff", fontSize: 13, justifyContent: "center", textAlign: "center", marginTop: 10, fontWeight: 'bold'}}>Reserve</Text>  
               </TouchableOpacity>
             </View>
    
                
            </View>
         

    );
}

export default BookingScreen;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { db, auth } from '../firebase/firebase';
import moment from 'moment';

const BookingList = ({ navigation, route }) => {

    const [users, setUsers] = React.useState(null);
    const [bookings, setBookings] = React.useState(null);

    const getBookings = async () => {
      const uid = auth?.currentUser?.uid;
      const querySnap = await db.collection('bookings').where("uid", "==", uid).get()
      const allbookings = querySnap.docs.map(docSnap=>docSnap.data())
      console.log(allbookings)
      setBookings(allbookings)
  }
 
  React.useEffect(() => {
      getBookings()
  },[])

  const getUsers = async () => {
    const uid = auth?.currentUser?.uid;
    const querySnap = await db.collection('users').where("uid", "==", uid).get()
    const allusers = querySnap.docs.map(docSnap=>docSnap.data())
    console.log(allusers)
    setUsers(allusers)
}

React.useEffect(() => {
  getUsers()
},[])


  const RenderCard = ({item}) => {
    return (
    
            <View style={styles.myList}>
               <View style={{margin: 30}}>
                <Text style={{color: '#000'}}>
                <Text style={{fontWeight: 'bold'}}>
                   Restaurant:
                </Text> {item.name}
                </Text>
               <Text style={{color: '#000'}}>
               <Text style={{fontWeight: 'bold'}}>
                  Guests:
                </Text> {item.count}
                </Text>        
                  <Text style={{color: '#000'}}>
                    {/* {moment(item.date).format('MM DD YYYY, hh:mm a')} */}
                    {/* {new Date(item.date.toDate()).toDateString()} */}
                    <Text style={{fontWeight: 'bold'}}>
                    Date:
                </Text> {moment(item.date.toDate()).format('DD-MM-YYYY')}
                </Text> 
                  <Text style={{color: '#000'}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Time:
                </Text> {moment(item.date.toDate()).format('HH:mm A')}
                </Text> 
                <Text style={{color: '#000'}}>
               <Text style={{fontWeight: 'bold'}}>
                  Status:
                </Text> {item.status}
                </Text> 
              </View>
            </View>
       
    )
  }

  return (
    <View style={styles.container}>
        <Text style={{marginTop: 55, fontWeight: 'bold', fontSize: 24, color: '#fff'}}>List of Bookings</Text>
      <View style={{ flex: 1, marginTop: 15, textAlign: 'center' }}>
              <FlatList
                    data={bookings}
                    renderItem={({item})=> {return <RenderCard item={item} />}}
                    keyExtractor={(item) =>item.uid}   
                    showsVerticalScrollIndicator={false}        
              />
              </View>
    </View>
  );
}

export default BookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#255e69',
    alignItems: 'center',
    justifyContent: 'center',
  },

  myList: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#f9f1dc',
    width: 300,
    borderRadius: 20,
    marginTop: 50,
    backgroundColor: '#f9f1dc'
  },
});

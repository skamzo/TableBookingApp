import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BookingList = ({ navigation, route }) => {

    const [users, setUsers] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const getUsers = async () => {
      const uid = auth?.currentUser?.uid;
      const querySnap = await db.collection('bookings').where("adminuid", "==", uid).get()
      const allusers = querySnap.docs.map(docSnap=>docSnap.data())
      console.log(allusers)
      setUsers(allusers)
  }
  
  useEffect(() => {
      getUsers()
  },[])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default BookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

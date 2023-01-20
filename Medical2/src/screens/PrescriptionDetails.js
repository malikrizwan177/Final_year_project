import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import {colors} from '../../config/color';
import {Card, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';

export default function PrescriptionDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [notes, setNotes] = useState([]);

  // const FlatListItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '100%',
  //         backgroundColor: colors.gray,
  //       }}
  //     />
  //   );
  // };

  // const renderBtnDelete = () => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         backgroundColor: 'red',
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <MaterialCommunityIcons name="delete-outline" size={25} color="white" />
  //     </TouchableOpacity>
  //   );
  // };
  // const renderBtnClose = () => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         backgroundColor: colors.blue,
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <MaterialCommunityIcons name="close" size={25} color="white" />
  //     </TouchableOpacity>
  //   );
  // };

  // var swipeoutBtns = [
  //   {
  //     component: renderBtnDelete(),
  //   },
  //   {
  //     text: 'Close',
  //     component: renderBtnClose(),
  //   },
  // ];

  const fetchData = () => {
    fetch('http://5e51-39-41-87-50.ngrok.io/p')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const handleDelete = async id => {
    try {
      const res = await axios.delete(
        `http://5e51-39-41-87-50.ngrok.io/prescription-delete/${id}`,
      );
      if (res?.data) {
        console.log(res?.data);
        fetchData();
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response?.data);
    }
  };

  // const renderList = (item, index) => {
  //   return (
  //     <View key={item._id}>
  //       <Swipeout
  //         right={swipeoutBtns}
  //         autoClose
  //         backgroundColor={colors.lightBlue}>
  //         <View style={styles.details} key={item._id}>
  //           <Text
  //             style={{
  //               color: '#585858',
  //               marginBottom: 10,
  //               fontWeight: '600',
  //               fontSize: 20,
  //             }}>
  //             Medicine Name: {item.medName}
  //           </Text>
  //           {/* <TouchableOpacity>
  //           <MaterialCommunityIcons
  //             name="pencil"
  //             color="#00BFFF"
  //             size={40}
  //             style={{position: 'absolute', right: 1, bottom: 1}}
  //           />
  //         </TouchableOpacity> */}
  //           <Text style={{color: '#585858', marginBottom: 10}}>
  //             Prescription: {item.prescriptionDetails}
  //           </Text>
  //           {/* <TouchableOpacity>
  //           <MaterialCommunityIcons
  //             name="delete-circle"
  //             color="#00BFFF"
  //             size={40}
  //             style={{position: 'absolute', right: 1, bottom: 1}}
  //           />
  //         </TouchableOpacity> */}
  //         </View>
  //       </Swipeout>
  //     </View>
  //   );
  // };
  const renderList = item => {
    return (
      <View style={styles.container}>
        <View style={styles.details} key={item._id}>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Medicine Name: {item.medName}
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="pencil"
              color="#00BFFF"
              size={40}
              style={{position: 'absolute', right: 1, bottom: 1}}
            />
          </TouchableOpacity>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Prescription: {item.prescriptionDetails}
          </Text>
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <MaterialCommunityIcons
              name="delete-circle"
              color="#00BFFF"
              size={40}
              style={{position: 'absolute', right: 1, bottom: 1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
        <Button title="Delete" onPress={() => handleDelete(item._id)} />
      </ScrollView>
      {/* <Card style={styles.container}>
        <Card.Content>
          <Title>Geeks For Geeks</Title>
        </Card.Content>
        <Card.Content>
          <Paragraph>A Computer Science portal for Geeks</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Add To Favourites</Button>
        </Card.Actions>
      </Card> */}
    </View>
  );
}
const styles = StyleSheet.create({
  //   details: {
  //     marginLeft: 20,
  //     padding: 10,
  //     marginRight: 20,
  //     borderBottomWidth: 1,
  //     borderColor: '#00BFFF',
  //   },
  container: {
    alignContent: 'center',
    margin: 37,
  },
  details: {
    marginTop: 10,
    padding: 10,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  //   flatlist: {
  //     marginTop: 40,
  //   },
});

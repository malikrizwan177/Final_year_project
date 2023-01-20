import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DoctorsDetail = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  const deleteDoctor = _id => {
    fetch('http://d4ea-39-41-87-50.ngrok.io/delete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then(res => res.json())
      .then(deleteDoc => {
        Alert.alert(`${deleteDoc.name} deleted`);
      });
  };

  const fetchData = () => {
    fetch('http://526d-39-41-87-50.ngrok.io/d')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const renderList = item => {
    return (
      <View style={styles.container}>
        <View style={styles.details} key={item._id}>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Name: {item.name}
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
            Speciality: {item.speciality}
          </Text>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Phone NO: {item.phone}
          </Text>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Email: {item.email}
          </Text>

          <Text style={{color: '#585858', fontWeight: 'bold'}}>
            Address: {item.address}
          </Text>
          <TouchableOpacity onPress={() => deleteDoctor()}>
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
      <Text
        style={{
          fontSize: 25,
          color: 'grey',
          textAlign: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}>
        Doctors Detail
      </Text>
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
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  details: {
    marginLeft: 20,
    padding: 10,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: '#00BFFF',
  },
});
export default DoctorsDetail;

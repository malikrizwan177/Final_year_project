import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';

export default function AppointmentDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch('http://5e51-39-41-87-50.ngrok.io/a')
      .then(res => res.json())
      .then(results => {
        console.log('Res  ', results);
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
        `http://5e51-39-41-87-50.ngrok.io/appointment-delete/${id}`,
      );
      if (res?.data) {
        console.log(res?.data);
        fetchData();
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response?.data);
    }
  };

  const renderList = item => {
    return (
      <View style={styles.container}>
        <View style={styles.details} key={item._id}>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Title: {item.title}
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
            Appointment Date: {item.date}
          </Text>
          <Text
            style={{color: '#585858', marginBottom: 10, fontWeight: 'bold'}}>
            Location: {item.location}
          </Text>

          <Text style={{color: '#585858', fontWeight: 'bold'}}>
            Notes: {item.notes}
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
    <View style={styles.container}>
      <View style={styles.container2}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#D6EAF8',
  },
  container2: {
    marginLeft: 20,
  },
});

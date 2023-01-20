import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {colors} from '../../config/color';
import Swipeout from 'react-native-swipeout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id: '1',
    title: 'Data Structures',
  },
  {
    id: '2',
    title: 'STL',
  },
  {
    id: '3',
    title: 'C++',
  },
  {
    id: '4',
    title: 'Java',
  },
];

export default function ReportDetails() {
  const [item, setItem] = useState(null);
  const [data, setData] = useState(DATA);
  const renderBtnDelete = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons name="delete-outline" size={25} color="white" />
      </TouchableOpacity>
    );
  };
  const renderBtnClose = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons name="close" size={25} color="white" />
      </TouchableOpacity>
    );
  };
  var swipeoutBtns = [
    {
      component: renderBtnDelete(),
    },
    {
      text: 'Close',
      component: renderBtnClose(),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <Swipeout
        right={swipeoutBtns}
        onOpen={() => {
          item = item;
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/pilll.jpg')} style={styles.img} />
          <View style={{top: 13}}>
            <Text style={{color: 'black'}}>{item.title}</Text>
            {/* <Text style={{color: 'grey'}}>{time}</Text> */}
          </View>
        </View>
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: colors.gray,
            marginLeft: '5%',
          }}></View>
      </Swipeout>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <Text style={{fontWeight: '700', color: colors.gray}}>Active meds</Text>
      </View>
      {/* <TouchableOpacity onPress={() => console.log('Hello')}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/pilll.jpg')} style={styles.img} />
          <View style={{top: 13}}>
            <Text style={{color: 'black'}}>Panadol</Text>
            <Text style={{color: 'grey'}}>
              Next Reminder: tomorrow, 8:00 AM
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: colors.gray,
            marginLeft: '5%',
          }}></View>
      </TouchableOpacity> */}
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: 30,
    height: 30,
    margin: 20,
  },
});

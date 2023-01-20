import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../config/color';

export default function AddMedTime({navigation}) {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(colors.white);

  const showIndicator = () => {
    setVisible(true);
  };
  const hideIndicator = () => {
    setVisible(false);
  };

  setTimeout(hideIndicator, 3000);

  const handleChange = () => {
    showIndicator();
    navigation.navigate('Report Details');
  };

  return (
    <View>
      <View style={{backgroundColor: '#00BFFF', height: 140}}>
        <View style={styles.container2}>
          <MaterialCommunityIcons
            name="alarm"
            color="white"
            size={30}
            style={{bottom: 20, left: 20}}
          />
          <Text style={styles.text}>Select your time for reminder</Text>
        </View>
        <View style={styles.inputCon}>
          <View style={{marginTop: 30}}>
            {/* <MaterialCommunityIcons name="clock" size={70} color="#00BFFF" /> */}
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Image
                source={require('../assets/clockk.gif')}
                style={{width: 200, height: 200}}
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                console.log(date);
                setColor(colors.blue);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>

          <Text style={{color: color, top: 10, fontSize: 10}}>
            {String(date)}
          </Text>
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 20}}>
              Touch the clock to select date & time
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.btn} onPress={handleChange}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                  Next
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{
                    color: 'white',
                    fontSize: 17,
                    left: '400%',
                    top: 4,
                    fontWeight: 'bold',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 80}}>
            <ActivityIndicator color="#00BFFF" size={40} animating={visible} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginTop: 30,
    marginLeft: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  inputCon: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 30,
    height: 600,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    width: '20%',
  },
  btn: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 100,
    marginTop: '20%',
    paddingVertical: 15,
    borderRadius: 40,
  },
});

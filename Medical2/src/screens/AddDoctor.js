import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function AddDoctor({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.speciality;
        case 'email':
          return route.params.phone;
        case 'salary':
          return route.params.email;
        case 'picture':
          return route.params.address;
      }
    }
    return '';
  };

  const [name, setName] = useState(getDetails('name'));
  const [speciality, setSpeciality] = useState(getDetails('speciality'));
  const [phone, setPhone] = useState(getDetails(phone));
  const [email, setEmail] = useState(getDetails(email));
  const [address, setAddress] = useState(getDetails(address));

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);

  const submitData = () => {
    setName('');
    setSpeciality();
    setPhone();
    setEmail();
    setAddress();
    fetch('http://526d-39-41-87-50.ngrok.io/send-data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        speciality: speciality,
        phone: phone,
        email: email,
        address: address,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.name} is saved successfully`);
      });
  };

  const goToMessageScreen = () => {
    navigation.navigate('DoctorsDetail', {
      name,
      speciality,
      phone,
      email,
      address,
    });
  };
  // const handleClick = () => {
  //   handleNavigation();
  //   doctorInfo();
  // };

  // function doctorInfo() {
  //   console.log('Doctor name:', doctorName);
  //   console.log('Speciality:', speciality);
  //   console.log('Phone number:', phone);
  //   console.log('Email:', email);
  //   console.log('Address:', address);
  // }

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
  };
  const handleFocus3 = () => {
    setIsFocused3(true);
  };
  const handleBlur3 = () => {
    setIsFocused3(false);
  };
  const handleFocus4 = () => {
    setIsFocused4(true);
  };
  const handleBlur4 = () => {
    setIsFocused4(false);
  };
  const handleFocus5 = () => {
    setIsFocused5(true);
  };
  const handleBlur5 = () => {
    setIsFocused5(false);
  };
  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.container2}>
            <MaterialCommunityIcons
              name="account-tie"
              color="#808080"
              size={30}
              style={{left: 10, marginTop: 15, marginRight: 20}}
            />
            <TextInput
              placeholder="Doctor's Name"
              placeholderTextColor="#969696"
              // style={styles.input}
              onChangeText={text => setName(text)}
              defaultValue={name}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 1,
                left: 20,
                fontSize: 22,
                color: 'black',
                borderBottomWidth: 2,
                borderColor: '#808080',
                width: 200,
              }}
            />
          </View>
          <View style={styles.container4}>
            <MaterialCommunityIcons
              name="briefcase-check"
              color="#808080"
              size={30}
              style={{left: 10, marginTop: 15, marginRight: 20, top: 40}}
            />
            <TextInput
              placeholder="Speciality"
              placeholderTextColor="#969696"
              onChangeText={speciality => setSpeciality(speciality)}
              defaultValue={speciality}
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              style={{
                borderBottomColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 2,
                left: 20,
                fontSize: 16,
                color: 'black',
                width: 280,
                marginTop: 40,
              }}
            />
          </View>
          <View style={styles.container3}>
            <MaterialCommunityIcons
              name="phone"
              color="#808080"
              size={30}
              style={{left: 10, marginTop: 15}}
            />
            <TextInput
              placeholder="Phone number"
              placeholderTextColor="#969696"
              keyboardType="numeric"
              onChangeText={phone => setPhone(phone)}
              defaultValue={phone}
              onFocus={handleFocus3}
              onBlur={handleBlur3}
              style={{
                borderBottomColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 1,
                left: 40,
                fontSize: 16,
                color: 'black',
                borderBottomWidth: 2,
                borderColor: '#808080',
                width: 140,
              }}
            />
          </View>
          <View style={styles.container3}>
            <MaterialCommunityIcons
              name="email"
              color="#808080"
              size={30}
              style={{left: 10, marginTop: 15}}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#969696"
              onChangeText={email => setEmail(email)}
              defaultValue={email}
              onFocus={handleFocus4}
              onBlur={handleBlur4}
              style={{
                borderBottomColor: isFocused4 ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 1,
                left: 40,
                fontSize: 16,
                color: 'black',
                borderBottomWidth: 2,
                borderColor: '#808080',
                width: 280,
              }}
            />
          </View>
          <View style={styles.container3}>
            <Feather
              name="map-pin"
              color="#808080"
              size={30}
              style={{left: 10, marginTop: 15}}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="#969696"
              onChangeText={address => setAddress(address)}
              defaultValue={address}
              onFocus={handleFocus5}
              onBlur={handleBlur5}
              style={{
                borderBottomColor: isFocused5 ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 1,
                left: 40,
                fontSize: 16,
                color: 'black',
                borderBottomWidth: 2,
                borderColor: '#808080',
                width: 280,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 100,
              width: '80%',
              marginLeft: '10%',
            }}>
            {/* <Button title="ADD DOCTOR" color="#00BFFF" onPress={submitData} />
            <Button title='View Doctor details' onPress={goToMessageScreen} /> */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={submitData} style={styles.btnStyle}>
                <Text style={{color: 'white'}}>+ Add Doctor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToMessageScreen}
                style={styles.btnStyle}>
                <Text style={{color: 'white'}}>View Doctors</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  img: {
    width: 50,
    height: 50,
    top: 10,
    left: 10,
  },
  input: {
    left: 20,
    fontSize: 22,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 200,
  },
  input2: {
    left: 20,
    fontSize: 16,
    color: 'black',
    width: 280,
    marginTop: 40,
  },
  input3: {
    left: 40,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 140,
  },
  input4: {
    left: 40,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 280,
  },
  container3: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  container4: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#00BFFF',
    marginLeft: 50,
    padding: 15,
    marginRight: 50,
  },
});

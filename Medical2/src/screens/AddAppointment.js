import React from 'react';
import {useState, useRef} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import notifee, {TriggerType} from '@notifee/react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentDetails from '../components/more/AppointmentDetails';
import {colors} from '../../config/color';

export default function AddAppointment({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'title':
          return route.params.title;
        case 'date':
          return route.params.date;
        case 'dates':
          return route.params.location;
        case 'notes':
          return route.params.notes;
      }
    }
    return '';
  };

  const [title, setTitle] = useState(getDetails('title'));
  const [location, setLocation] = useState(getDetails('location'));
  const [notes, setNotes] = useState(getDetails('notes'));
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [doctorModal, setDoctorModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(colors.white);

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

  const submitData = () => {
    setTitle('');
    setLocation();
    setNotes();
    fetch('http://742c-39-41-87-50.ngrok.io/send-appoin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        date: date,
        location: location,
        notes: notes,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.title} is saved successfully`);
      });
  };

  const onReminder = async () => {
    // const date = new Date(Date.now());
    // date.setSeconds(date.getSeconds() * 2);
    let cDay = dates.getDate();
    let cMonth = dates.getMonth() + 1;
    let cYear = dates.getFullYear();
    let cHours = dates.getHours();
    const formattedHours = (cHours % 12).toString().padStart(2, '0');
    let cMinutes = dates.getMinutes();
    const text = `At + ${
      '<b>' +
      cDay +
      '/' +
      cMonth +
      '/' +
      cYear +
      '(' +
      formattedHours +
      ':' +
      cMinutes +
      ')'
    }`;

    const channelId = await notifee.createChannel({
      id: 'sound',
      name: 'Default Channel',
      sound: 'doorbell',
    });

    await notifee.displayNotification({
      title: 'Reminder',
      body: 'You have set the reminder',
      android: {
        channelId,
        sound: 'doorbell',
      },
    });
    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: text,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          sound: 'doorbell',
        },
      },
      {type: TriggerType.TIMESTAMP, timestamp: dates.getTime()},
    );
  };

  const goToAppointmentDetails = () => {
    navigation.navigate('Appointment Details', {
      title,
      date,
      location,
      notes,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInput
        placeholder="Appointment Title"
        placeholderTextColor="#969696"
        // style={styles.input}
        onChangeText={text => setTitle(text)}
        defaultValue={title}
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
          width: 325,
          marginTop: 50,
          marginBottom: 30,
        }}
      />
      <Modal visible={doctorModal} animationType="fade" transparent={true}>
        <View
          style={{
            marginTop: 200,
            backgroundColor: 'white',
            padding: 20,
            width: 200,
            marginLeft: 100,
            opacity: 4,
          }}>
          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View
              style={{backgroundColor: 'grey', borderRadius: 20, padding: 5}}>
              <MaterialCommunityIcons
                name="minus-circle-outline"
                color="white"
                size={25}
              />
            </View>

            <TouchableOpacity onPress={() => setDoctorModal(!doctorModal)}>
              <Text
                style={{
                  color: 'grey',
                  marginLeft: 20,
                  fontSize: 18,
                  top: 4,
                }}>
                None
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{backgroundColor: 'grey', borderRadius: 20, padding: 5}}>
              <MaterialCommunityIcons
                name="plus-circle"
                color="white"
                size={25}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('AddDoctor')}>
              <Text
                style={{
                  color: 'grey',
                  marginLeft: 20,
                  fontSize: 18,
                  top: 4,
                }}>
                Add Doctor
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setDoctorModal(!doctorModal);
            }}
            style={{flexDirection: 'row-reverse', marginTop: 5, top: 10}}>
            <Text style={{color: '#00BFFF'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setDoctorModal(true)}
          name="doctor"
          title="Select a doctor"
        />
        <TouchableWithoutFeedback onPress={() => setDoctorModal(true)}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color="grey"
            style={{marginLeft: 150, marginTop: 5}}
          />
        </TouchableWithoutFeedback>
      </View>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setColor(colors.blue);
          console.log(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setOpen(true)}
          name="clock"
          title="Select Date"
        />
      </View>
      <Text style={{color: color, marginLeft: 80}}>{String(date)}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          marginTop: 40,
          marginBottom: 10,
        }}>
        <AppointmentDetails name="bell" />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{color: 'grey'}}>Reminder Before Appointment</Text>
          {/* {dates ? <Text>{String(dates)}</Text> : <Text>Select your date</Text>} */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'grey',
            borderRadius: 5,
            justifyContent: 'center',
            left: 10,
            bottom: 3,
          }}
          onPress={onReminder}>
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={dates}
          onConfirm={dates => {
            setOpen(false);
            setDates(dates);
            console.log(dates);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setCalendarModal(true)}
          name="map-marker"
        />
        <TextInput
          placeholder="Add location"
          placeholderTextColor="#969696"
          // style={styles.input}
          onChangeText={text => setLocation(text)}
          defaultValue={location}
          onFocus={handleFocus2}
          onBlur={handleBlur2}
          style={{
            borderBottomColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
            borderBottomWidth: 1,
            bottom: 20,
            //   left: 20,
            //   fontSize: 22,
            //   color: 'black',
            //   borderBottomWidth: 2,
            //   borderColor: '#808080',
            width: 270,
            right: 50,
            left: 1,
            //   marginTop: 50,
            //   marginBottom: 30,
          }}
        />
      </View>

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setCalendarModal(true)}
          name="calendar-text"
        />
        <TextInput
          placeholder="Add Notes"
          placeholderTextColor="#969696"
          onChangeText={text => setNotes(text)}
          defaultValue={notes}
          onFocus={handleFocus3}
          onBlur={handleBlur3}
          style={{
            borderBottomColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
            borderBottomWidth: 1,
            bottom: 20,
            width: 270,
            right: 50,
            left: 1,
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#A9E2F3"
              style={styles.btn2}
              onPress={goToAppointmentDetails}>
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color={colors.white}
              />
            </TouchableHighlight>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#A9E2F3"
              style={styles.btn1}
              onPress={submitData}>
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color={colors.white}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginLeft: 15,
    marginTop: 40,
    flexDirection: 'row',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
  btn1: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 5.9,
    elevation: 10,
    shadowRadius: 3,
    left: 20,
  },
  btn2: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 5.9,
    elevation: 10,
    shadowRadius: 3,
    right: 20,
  },
});

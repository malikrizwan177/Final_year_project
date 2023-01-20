import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {colors} from '../../config/color';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

export default function Prescription({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'medName':
          return route.params.medName;
        case 'prescription':
          return route.params.prescription;
        case 'text':
          return route.params.text;
      }
    }
    return '';
  };
  const [medName, setMedName] = useState(getDetails('medName'));
  const [prescription, setPrescription] = useState(getDetails('prescription'));
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState(getDetails('text'));

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus1 = () => {
    setIsFocused1(true);
  };
  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const SaveBtn = () => {
    submitData();
    // navigation.navigate('Prescription Details');
  };

  const goToMessageScreen = () => {
    navigation.navigate('Prescription Details', {
      medName,
      prescription,
      text,
    });
  };

  const submitData = () => {
    setMedName('');
    setPrescription();
    setText();

    fetch('http://5e51-39-41-87-50.ngrok.io/send-pres', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        medName: medName,
        prescriptionDetails: prescription,
        uploadImg: text,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.name} is saved successfully`);
      });
  };

  useEffect(() => {
    (async () => {
      if (image) {
        const result = await TextRecognition.recognize(image.assets[0].uri);
        console.log(result);
        setText(result);
      }
    })();
  }, [image]);

  const handleImage = () => {
    launchImageLibrary({}, setImage);
  };
  return (
    <View>
      <TextInput
        cursorColor={colors.gray}
        placeholder="Med name"
        placeholderTextColor="#969696"
        // style={styles.input}
        onChangeText={text => setMedName(text)}
        defaultValue={medName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
          marginLeft: 10,
          marginRight: 10,
          fontSize: 15,
          color: 'black',
          borderBottomWidth: 1,
          marginTop: 50,
          marginBottom: 30,
          height: 50,
        }}
      />
      <View style={styles.inputCon}>
        <Text style={{fontSize: 20, marginBottom: 17, fontWeight: '600'}}>
          Prescription
        </Text>
        <TextInput
          cursorColor={colors.gray}
          onChangeText={text => setPrescription(text)}
          defaultValue={prescription}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
          multiline
          numberOfLines={12}
          style={{
            borderWidth: 1,
            borderColor: isFocused1 ? '#00BFFF' : '#6E6E6E',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={styles.btn}
            onPress={handleImage}
            underlayColor={colors.blue}>
            <Text style={{color: 'white', textAlign: 'center'}}>Upload</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn1}
            onPress={SaveBtn}
            underlayColor={colors.blue}>
            <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
          </TouchableHighlight>
        </View>

        {/* <View style={styles.textCon}>
          {text ? <Text style={{color: 'white'}}>{text}</Text> : null}
        </View> */}
      </View>
      <TouchableHighlight
        underlayColor="#81DAF5"
        style={styles.saveBtn}
        onPress={goToMessageScreen}>
        <Text style={{color: 'white', textAlign: 'center'}}>Next</Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  inputCon: {
    margin: 10,
  },
  btn: {
    backgroundColor: colors.gray,
    width: 55,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btn1: {
    backgroundColor: colors.gray,
    width: 55,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    left: 5,
  },
  textCon: {
    backgroundColor: colors.blue,
  },
  saveBtn: {
    top: '10%',
    backgroundColor: colors.blue,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    left: '20%',
    padding: 20,
    borderRadius: 200,
  },
});

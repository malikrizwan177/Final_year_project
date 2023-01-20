import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/color';

export default function AddMedForm({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const [medForm, setMedForm] = useState('');
  const [visible, setVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [color, setColor] = useState(colors.gray);

  const changeText = () => {
    text => setMedForm(text);
    setIsDisabled(false);
    setColor(colors.blue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const showIndicator = () => {
    setVisible(true);
  };
  const hideIndicator = () => {
    setVisible(false);
  };

  setTimeout(hideIndicator, 3000);

  const handleChange = () => {
    showIndicator();
    navigation.navigate('Med Time');
  };

  return (
    <View>
      <View style={{backgroundColor: '#00BFFF', height: 140}}>
        <View style={styles.container2}>
          <Text style={styles.text}>What strength is the med</Text>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            onChangeText={changeText}
            defaultValue={medForm}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              borderBottomWidth: 2,
              marginTop: 10,
              width: '30%',
              borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#81DAF5"
              disabled={isDisabled}
              style={{
                backgroundColor: color,
                paddingHorizontal: 100,
                marginTop: '20%',
                paddingVertical: 15,
                borderRadius: 40,
              }}
              onPress={handleChange}>
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
            </TouchableHighlight>
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

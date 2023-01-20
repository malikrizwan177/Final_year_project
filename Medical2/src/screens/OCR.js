import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

const OCR = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [camera, setCamera] = useState(null);

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
    navigation.navigate('OcrResults', {text});
  };

  const handleCamera = () => {
    launchCamera({}, setCamera);
    navigation.navigate('OcrResults', {text});
  };
  useEffect(() => {
    (async () => {
      if (camera) {
        const result = await TextRecognition.recognize(camera.assets[0].uri);
        console.log(result);
        setText(result);
      }
    })();
  }, [camera]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ocr.gif')}
        style={{width: 400, height: 400}}
      />
      <TouchableHighlight
        onPress={handleCamera}
        style={styles.btn}
        underlayColor="#81DAF5">
        <Text style={styles.text}>Open Camera</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleImage}
        style={styles.btn}
        underlayColor="#81DAF5">
        <Text style={styles.text}>Upload from gallery</Text>
      </TouchableHighlight>

      {text ? <Text style={{color: 'white'}}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#00BFFF',
    padding: 20,
    marginBottom: 20,
    width: '70%',
    borderRadius: 200,
  },
});
export default OCR;

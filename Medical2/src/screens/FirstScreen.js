import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import ButtonCom from '../components/SubmitButton';
import GlobalFont from 'react-native-global-font';

const FirstScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('LoginScreen');
  }, 3000);

  return (
    // <View style={styles.container}>
    //   <View style={styles.backgroundContainer}>
    //     <Image
    //       style={styles.backgroundImage}
    //       source={require('../assets/pill.jpg')}
    //     />
    //     <View style={styles.btn}>
    //       <ButtonCom
    //         title="Get started"
    //         onPress={() => console.log('Hello')}
    //         color="#f5c71a"
    //         sty
    //       />
    //     </View>
    //   </View>
    //   <View>
    //     <TouchableOpacity
    //       style={styles.loginBtn}
    //       onPress={() => navigation.navigate('LoginScreen')}>
    //       <Text style={{color: 'white', fontSize: 20}}>LOGIN</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles.container}>
      <Image source={require('../assets/logoo.png')} style={styles.imgStyle} />
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  // },
  // backgroundContainer: {
  //   flex: 1,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  // },
  // textStyle: {
  //   bottom: 350,
  //   fontSize: 40,
  //   color: 'dodgerblue',
  // },
  // backgroundImage: {
  //   flex: 1,
  //   width: null,
  //   height: null,
  //   resizeMode: 'cover',
  // },
  // loginBtn: {
  //   justifyContent: 'flex-start',
  //   flex: 1,
  //   flexDirection: 'column',
  //   fontSize: 40,
  //   color: 'red',
  //   margin: 5,
  //   left: 130,
  //   top: 30,
  // },
  // btn: {
  //   height: 80,
  //   backgroundColor: '#f5c71a',
  // },
  imgStyle: {
    width: '100%',
    height: 350,
    top: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default FirstScreen;

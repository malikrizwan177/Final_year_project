import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

function OcrResults() {
  const route = useRoute();
  return (
    <View>
      {/* <Text style={{color: 'red'}}>{route.params.text}</Text> */}
      <Text style={{fontSize: 20, marginTop: 30, marginLeft: '5%'}}>
        Here are your results:
      </Text>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{color: 'grey', textAlign: 'center'}}>
            {route.params.text}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CEECF5',
    marginTop: 30,
    paddingVertical: 40,
    width: '90%',
    marginLeft: '5%',
  },
});
export default OcrResults;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Reminder from './Reminder';
import AddMedication from './AddMedication';
import ReminderSet from './ReminderSet';
import Doctor from './Doctor';
import AddDoctor from './AddDoctor';
import DoctorsDetail from './DoctorsDetail';
import BottomTabNavigator from './TabNavigator';
import More from './More';
import QrCode from './QrCode';
import FirstScreen from './FirstScreen';
import LoginScreen from './LoginScreen';
import OCR from './OCR';
import OcrResults from './OcrResults';
import Appointments from './Appointments';
import AddAppointment from './AddAppointment';
import FeedBack from './FeedBack';
import Report from './Report';
import AddReportMed from './AddReportMed';
import AddMedForm from './AddMedForm';
import AddMedTime from './AddMedTime';
import SignupScreen from './SignupScreen';
import AppointmentDetails from './AppointmentDetails';
import Prescription from './Prescription';
import PrescriptionDetails from './PrescriptionDetails';
import ReportDetails from './ReportDetails';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#00BFFF',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const ReminderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Reminder" component={Reminder} />
      <Stack.Screen
        name="AddMedication"
        component={AddMedication}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#00BFFF'},
        }}
      />
      <Stack.Screen name="ReminderSet" component={ReminderSet} />
    </Stack.Navigator>
  );
};

const DoctorStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Doctor"
        component={Doctor}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="AddDoctor"
        component={AddDoctor}
        options={() => ({
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
      <Stack.Screen name="DoctorsDetail" component={DoctorsDetail} />
    </Stack.Navigator>
  );
};

const OcrStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="OCR" component={OCR} />
      <Stack.Screen name="OcrResults" component={OcrResults} />
    </Stack.Navigator>
  );
};

const MoreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="QrCode" component={QrCode} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Add Appointment" component={AddAppointment} />
      <Stack.Screen name="Appointment Details" component={AppointmentDetails} />
      <Stack.Screen name="Prescription" component={Prescription} />
      <Stack.Screen
        name="Prescription Details"
        component={PrescriptionDetails}
      />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Add Medicine" component={AddReportMed} />
      <Stack.Screen name="Med Form" component={AddMedForm} />
      <Stack.Screen name="Med Time" component={AddMedTime} />
      <Stack.Screen name="Report Details" component={ReportDetails} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

export {
  ReminderStackNavigator,
  DoctorStackNavigator,
  OcrStackNavigator,
  MoreStackNavigator,
};

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Scanner from '../pages/Scanner';
import {shade} from 'polished';
import {Image} from 'react-native';

import headerLogo from '../assets/images/header-logo.png';
import {Text} from '../components/InputFile/styles';
import {ScrollView} from 'react-native-gesture-handler';

const App = createStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      cardStyle: {backgroundColor: '#003641'},
    }}>
    <App.Screen
      name="scanner"
      component={Scanner}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: shade(0.1, '#003641'),
        },
      }}
    />
  </App.Navigator>
);

export default Routes;

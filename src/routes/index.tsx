import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Scanner from '../pages/Scanner';

const App = createStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#003641' },
    }}
  >
    <App.Screen name="scanner" component={Scanner} />
  </App.Navigator>
);

export default Routes;

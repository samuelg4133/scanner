import 'react-native-gesture-handler';
import React from 'react';
import { setCustomText, setCustomTextInput} from 'react-native-global-props';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

const customTextProps = {
  style: {
    fontFamily: 'Asap-Regular',
  },
};

setCustomText(customTextProps);
setCustomTextInput(customTextProps);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;

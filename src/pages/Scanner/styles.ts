import styled from 'styled-components/native';

import {Picker} from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Dropdown = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 5px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #00ae9d;
  flex-direction: row;
  align-items: center;
`;

export const InputIcon = styled(Icon)`
  color: #00ae9d;
`;

export const Select = styled(Picker)`
  color: #fff;
  flex: 1;
`;

export const Option = styled(Picker.Item)``;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'Asap-Bold';
  margin: 20px 0;
`;

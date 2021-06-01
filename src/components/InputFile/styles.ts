import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {shade} from 'polished';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding-left: 16px;
  margin-bottom: 5px;
  border-radius: 10px;
  border-width: 2px;
  overflow: hidden;
  border-color: #c9d200;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${shade(0.2, '#003641')};
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const PickerIcon = styled(Icon)`
  color: #c9d200;
`;

export const Text = styled.Text`
  font-family: 'Asap-Bold';
  color: #fff;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'Asap-Bold';
  font-size: 16px;
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: red;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const DeleteIcon = styled(Icon)`
  color: #fff;
`;

import styled from 'styled-components/native';

import {shade} from 'polished';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin: 20px 0;
  border-radius: 10px;
  border-width: 4px;
  background-color: #00ae9d;
  border-color: ${shade(0.5, '#00ae9d')};
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: 'Asap-Bold';
  font-size: 18px;
  flex: 1;
`;

export const ButtonIcon = styled(Icon)`
  color: #fff;
  margin-right: 6px;
`;

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #00ae9d;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'Asap-Bold';
  font-size: 20px;
`;

export const InputIcon = styled(Icon)`
  color: #00ae9d;
`;

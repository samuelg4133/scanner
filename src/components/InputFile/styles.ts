import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #c9d200;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const Text = styled.Text`
  color: #eee;
  font-family: 'Asap-Bold';
  font-size: 20px;
`;

export const PickerIcon = styled(Icon)`
  color: #c9d200;
  margin-right: 6px;
`;

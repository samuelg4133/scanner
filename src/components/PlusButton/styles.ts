import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const PlusButtonIcon = styled(Icon)`
  color: #fff;
  margin-right: 6px;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: 'Asap-Regular';
`;

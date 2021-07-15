import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 2px;
  border-width: 1px;
  border-color: red;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px 0;
`;

export const HeaderIcon = styled(Icon)`
  color: red;
`;

export const LottieAnimation = styled(Lottie)`
  width: 50%;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  overflow: hidden;
`;

export const Section = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 12px;
  background-color: #fefefe;
`;

export const Text = styled.Text`
  color: #003641;
  font-size: 18px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 50%;
  background-color: #fffafa;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-left-width: 1px;
  border-left-color: #00ae9d;
`;

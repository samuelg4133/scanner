import styled from 'styled-components/native';

import Lottie from 'lottie-react-native';

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  margin: 20px;
  background-color: red;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  border-width: 4px;
  border-color: #c90000;
`;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: auto 20px;
`;

export const LottieAnimation = styled(Lottie)`
  width: 75%;
`;

export const Text = styled.Text`
  font-size: 24px;
  font-family: 'Asap-Bold';
  color: #fff;
  text-align: center;
`;

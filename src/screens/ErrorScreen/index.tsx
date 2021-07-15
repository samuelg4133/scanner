import React from 'react';
import {GestureResponderEvent} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Error from '../../assets/json/error.json';

import {Button, Container, LottieAnimation, Text} from './styles';

interface ErrorScreenProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({onPress}) => {
  return (
    <Container>
      <LottieAnimation source={Error} autoPlay loop />
      <Text>Ops... Houve um erro ao tentar carregar os dados.</Text>
      <Button onPress={onPress}>
        <Text>Tentar Novamente</Text>
        <Icon name="refresh" size={32} color="#fff" />
      </Button>
    </Container>
  );
};

export default ErrorScreen;

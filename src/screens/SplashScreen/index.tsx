import React from 'react';
import {Modal, ModalProps} from 'react-native';

import {Container, Image, Text} from './styles';

interface SplashProps extends ModalProps {
  onRequestClose?: () => void;
}

const SplashScreen: React.FC<SplashProps> = ({onRequestClose, ...props}) => {
  return (
    <Container>
      <Modal onRequestClose={onRequestClose} {...props}>
        <Container>
          <Image source={require('../../assets/gifs/loading.gif')} />
          <Text>Carregando...</Text>
        </Container>
      </Modal>
    </Container>
  );
};

export default SplashScreen;

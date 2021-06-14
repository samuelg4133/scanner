import React from 'react';
import {Modal, ModalProps} from 'react-native';

import {
  Button,
  Container,
  Header,
  ModalContainer,
  Text,
  Title,
  TitleIcon,
} from './styles';

interface ToastProps extends ModalProps {
  onRequestClose?: () => void;
  message: string;
  type?: 'option' | 'warning';
}

const Toast: React.FC<ToastProps> = ({onRequestClose, message, type, ...rest}) => {
  return (
    <Container>
      <Modal
        {...rest}
        onRequestClose={onRequestClose}>
        <Container>
          <ModalContainer>
            <Header>
              <TitleIcon name="warning" size={32} />
              <Title>ATENÇÃO!</Title>
            </Header>
            <Text>{message}</Text>
            <Button onPress={onRequestClose}>
              <Text>OK</Text>
            </Button>
          </ModalContainer>
        </Container>
      </Modal>
    </Container>
  );
};

export default Toast;

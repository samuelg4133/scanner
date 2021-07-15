import React from 'react';
import {GestureResponderEvent, Modal, ModalProps} from 'react-native';

import {
  Button,
  Container,
  Header,
  ModalContainer,
  Text,
  TitleIcon,
} from './styles';

interface ToastProps extends ModalProps {
  onRequestClose?: () => void;
  onSelectCamera?: (event: GestureResponderEvent) => void;
  onSelectGallery?: (event: GestureResponderEvent) => void;
  message: string;
  type?: 'camera'| 'done' | 'error' | 'warning';
}

const Toast: React.FC<ToastProps> = ({
  onRequestClose,
  message,
  type,
  ...rest
}) => {
  return  (
    <Container>
      <Modal {...rest} onRequestClose={onRequestClose}>
        <Container>
          <ModalContainer>
            <Header>
              <TitleIcon name={type || 'warning'} />
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

import React from 'react';
import {GestureResponderEvent, Modal, ModalProps} from 'react-native';

import {
  Button,
  Container,
  Footer,
  Header,
  HeaderIcon,
  LottieAnimation,
  ModalContainer,
  Section,
  Text,
  TouchableOpacity,
} from './styles';

import Camera from '../../assets/json/camera.json';
import Gallery from '../../assets/json/gallery.json';

interface ModalOptionProps extends ModalProps {
  onRequestClose?: () => void;
  onSelectCamera?: (event: GestureResponderEvent) => void;
  onSelectGallery?: (event: GestureResponderEvent) => void;
}

const ModalOption: React.FC<ModalOptionProps> = ({
  onRequestClose,
  onSelectCamera,
  onSelectGallery,
  ...rest
}) => {
  return (
    <Container>
      <Modal {...rest} onRequestClose={onRequestClose}>
        <Container>
          <ModalContainer>
            <Header>
              <Text>Selecione uma opção:</Text>
              <Button onPress={onRequestClose}>
                <HeaderIcon size={24} name="close" />
              </Button>
            </Header>
            <Section>
              <LottieAnimation
                source={Camera}
                autoPlay
                loop
                style={{width: 100, height: 100}}
              />
              <LottieAnimation

                source={Gallery}
                autoPlay
                loop
                style={{width: 75, height: 75}}
              />
            </Section>
            <Footer>
              <TouchableOpacity onPress={onSelectCamera}>
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSelectGallery}>
                <Text>Galeria</Text>
              </TouchableOpacity>
            </Footer>
          </ModalContainer>
        </Container>
      </Modal>
    </Container>
  );
};

export default ModalOption;

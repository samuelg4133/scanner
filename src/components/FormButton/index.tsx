import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Button, ButtonIcon, Container, Text} from './styles';

const FormButton: React.FC<TouchableOpacityProps> = ({...rest}) => {
  return (
    <Container>
      <Button {...rest}>
        <Text>Confirmar</Text>
        <ButtonIcon name="send" size={24} />
      </Button>
    </Container>
  );
};

export default FormButton;

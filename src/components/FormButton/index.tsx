import React from 'react';

import {Button, ButtonIcon, Container, Text} from './styles';

const FormButton: React.FC = () => {
  return (
    <Container>
      <Button>
        <ButtonIcon name="send" size={32} />
        <Text>Confirmar</Text>
      </Button>
    </Container>
  );
};

export default FormButton;

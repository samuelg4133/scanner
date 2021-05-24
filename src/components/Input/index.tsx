import React from 'react';

import {Container, InputIcon, TextInput} from './styles';

const Input: React.FC = () => {
  return (
    <Container>
      <InputIcon name="folder" size={32} />
      <TextInput placeholder="Nome da Pasta" placeholderTextColor="#eee" />
    </Container>
  );
};
export default Input;

import React from 'react';
import {TextInputProps} from 'react-native';

import {Container, InputIcon, TextInput} from './styles';

const Input: React.FC<TextInputProps> = ({...props}) => {
  return (
    <Container>
      <TextInput
        placeholder="Nome da Pasta"
        placeholderTextColor="#eee"
        {...props}
      />
      <InputIcon name="folder" size={24} />
    </Container>
  );
};
export default Input;

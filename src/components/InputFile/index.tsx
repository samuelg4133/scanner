import React, {useCallback} from 'react';
import {Alert, GestureResponderEvent} from 'react-native';

import {Button, PickerIcon, TextInput} from './styles';

interface InputFileProps {
  children?: React.ReactNode;
  deletable?: boolean;
  inputValue?: string;
  onChangeText?: (text: string) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  children,
  deletable,
  inputValue,
  onChangeText,
  onPress,
  ...rest
}: InputFileProps) => {
  return (
    <>
      <TextInput
        placeholder="Nome do Documento"
        placeholderTextColor="#eee"
        value={inputValue}
        onChangeText={onChangeText}
        {...rest}
      />
      <Button onPress={onPress}>
        <PickerIcon name="add-a-photo" size={24} />
      </Button>
    </>
  );
};

export default InputFile;

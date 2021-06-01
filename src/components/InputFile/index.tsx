import React, {useCallback} from 'react';
import {Alert, GestureResponderEvent} from 'react-native';

import {
  Button,
  Container,
  PickerIcon,
  TextInput,
  DeleteButton,
  DeleteIcon,
} from './styles';

interface InputFileProps {
  deletable?: boolean;
  inputValue?: string;
  onChangeText?: (text: string) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  deletable,
  inputValue,
  onChangeText,
  onPress,
  ...rest
}: InputFileProps) => {
  const [isDeleted, setIsDeleted] = React.useState(false);

  const handleDestroyYourself = useCallback(() => {
    Alert.alert(
      'Confirmar exclusão.',
      'Deseja realmente excluir?',
      [
        {
          text: 'SIM',
          onPress: () => {
            setIsDeleted(true);
          },
        },
        {
          text: 'NÃO',
        },
      ],
      {cancelable: true},
    );
  }, []);

  return !isDeleted ? (
    <Container>
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
      {deletable && (
        <DeleteButton onPress={handleDestroyYourself}>
          <DeleteIcon name="delete" size={24} />
        </DeleteButton>
      )}
    </Container>
  ) : null;
};

export default InputFile;

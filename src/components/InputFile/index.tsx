import React, {useCallback, useMemo} from 'react';
import {Alert, Image, ScrollView, TextInputProps} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import {
  Button,
  Container,
  ImageButton,
  ImageButtonIcon,
  ImgContainer,
  PickerIcon,
  TextInput,
  Text,
  DeleteButton,
  DeleteIcon,
} from './styles';

interface InputFileProps extends TextInputProps {
  deletable?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  deletable,
  ...rest
}: InputFileProps) => {
  const [response, setResponse] = React.useState<ImageType[]>([]);
  const [isDeleted, setIsDeleted] = React.useState(false);

  const filesUploaded = useMemo(() => {
    return response.map(image => image.path);
  }, [response]);

  const handleInputDocuments = useCallback(() => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      sortOrder: 'desc',
    })
      .then(res => {
        const imageAlreadyUploaded = res.every(image =>
          filesUploaded.includes(image.path),
        );
        if (imageAlreadyUploaded) {
          Alert.alert('Imagem já selecionada!');
        } else {
          setResponse(response.concat(res));
        }
      })
      .catch(err => {
        if (err) {
          return;
        }
      });
  }, [response]);

  const handleDeleteImage = useCallback(
    async (path: string) => {
      const images = response.filter(item => item.path !== path);
      setResponse(images);
    },
    [response],
  );

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
    <>
      <Container>
        <TextInput
          placeholder="Nome do Documento"
          placeholderTextColor="#eee"
          {...rest}
        />
        <Button onPress={handleInputDocuments}>
          <PickerIcon name="add-a-photo" size={24} />
        </Button>
        {deletable && (
          <DeleteButton onPress={handleDestroyYourself}>
            <DeleteIcon name="delete" size={24} />
          </DeleteButton>
        )}
      </Container>
      {response && (
        <>
          <ScrollView horizontal={true}>
            {response.map(item => (
              <ImgContainer key={item.path}>
                <Image
                  source={{uri: item.path}}
                  style={{width: 100, height: 100}}
                />
                <ImageButton onPress={() => handleDeleteImage(item.path)}>
                  <ImageButtonIcon name="clear" size={24} />
                </ImageButton>
              </ImgContainer>
            ))}
          </ScrollView>
          <Text>{`${response.length.toString()} Imagens Selecionadas`}</Text>
        </>
      )}
    </>
  ) : null;
};

export default InputFile;

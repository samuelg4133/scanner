import React, {useCallback, useMemo} from 'react';
import {Alert, Image, View} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import {Button, Container, PickerIcon, Text} from './styles';

interface InputFileProps {
  title: string;
}

const InputFile: React.FC<InputFileProps> = ({title, ...rest}) => {
  const [response, setResponse] = React.useState([] as ImageType[]);
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
  return (
    <>
      <Container {...rest}>
        <Button onPress={handleInputDocuments}>
          <PickerIcon name="add-a-photo" size={32} />
          <Text>{title}</Text>
        </Button>
      </Container>
      {response &&
        response.map(item => (
          <View key={item.path}>
            <Image source={{uri: item.path}} style={{width: 50, height: 50}} />
          </View>
        ))}
    </>
  );
};

export default InputFile;

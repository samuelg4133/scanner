import React, {useCallback} from 'react';
import {Image, View} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import {Button, Container, PickerIcon, Text} from './styles';

const InputFile: React.FC = () => {
  const [response, setResponse] = React.useState([] as ImageType[]);
  const handleInputDocuments = useCallback(() => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      sortOrder: 'desc',
    }).then(res => {
      setResponse(response.concat(res));
    });
  }, [response]);
  return (
    <>
      <Container>
        <Button onPress={handleInputDocuments}>
          <PickerIcon name="add-a-photo" size={32} />
          <Text>Documentos</Text>
        </Button>
      </Container>
      {response &&
        response.map(item => (
          <View key={item.path}>
            <Image
              source={{uri: item.path}}
              style={{width: 100, height: 100}}
            />
          </View>
        ))}
    </>
  );
};

export default InputFile;

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import Input from '../../components/Input';
import PlusButton from '../../components/PlusButton';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';

import logo from '../../assets/images/logo.png';

import {
  Container,
  Dropdown,
  ImageButton,
  ImageButtonIcon,
  ImgContainer,
  InputIcon,
  Option,
  Select,
  Text,
  Title,
} from './styles';

import api from '../../services/api';

interface UsersResponse {
  id: number;
  login: string;
}

const data = [
  {id: 1, login: 'samuel'},
  {id: 2, login: 'ramon'},
];

const Scanner: React.FC = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [response, setResponse] = React.useState<ImageType[]>([]);
  const [inputFileValue, setInputFileValue] = useState('');

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

  const handleChangeSelectedValue = useCallback(
    (value, _) => {
      setSelectedValue(value);
    },
    [selectedValue],
  );

  useEffect(() => {
    api.get('users').then(response => setUsers(response.data));
  }, [users]);

  const handleChangeInputText = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [setInputValue],
  );

  const handleChangeInputFileText = useCallback(
    (value: string) => {
      setInputFileValue(value);
    },
    [setInputFileValue],
  );

  const handleSubmit = useCallback(() => {
    console.log({selectedValue, inputValue, inputFileValue, response});
  }, [inputValue, selectedValue, inputFileValue, response]);

  return (
    <ScrollView>
      <Container>
        <Image source={logo} />
        <View>
          <Title>Scanner</Title>
        </View>
        <Dropdown>
          <Select
            accessibilityLabel="Usuário"
            selectedValue={selectedValue}
            onValueChange={handleChangeSelectedValue}>
            {data.map(item => (
              <Option key={item.id} label={item.login} value={item.login} />
            ))}
          </Select>
          <InputIcon name="person" size={24} />
        </Dropdown>
        <Input
          value={inputValue}
          onChangeText={text => handleChangeInputText(text)}
        />
        <InputFile
          inputValue={inputFileValue}
          onChangeText={text => handleChangeInputFileText(text)}
          onPress={handleInputDocuments}
        />
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
        <PlusButton />
        <FormButton onPress={handleSubmit} />
      </Container>
    </ScrollView>
  );
};

export default Scanner;

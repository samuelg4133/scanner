import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';

import logo from '../../assets/images/logo.png';

import {
  Container,
  DeleteButton,
  DeleteIcon,
  Dropdown,
  ErrorContainer,
  ImageButton,
  ImageButtonIcon,
  ImgContainer,
  InputFileContainer,
  InputIcon,
  LoadingContainer,
  LoadingImage,
  Option,
  PlusButton,
  PlusButtonContainer,
  PlusButtonIcon,
  ReloadButton,
  Select,
  Text,
  Title,
} from './styles';

import api from '../../services/api';
import axios from 'axios';

interface UsersResponse {
  id: number;
  login: string;
}

interface ItemProps {
  key: string;
  images: ImageType[];
  inputText?: string;
}

const Scanner: React.FC = () => {
  const [document, setDocument] = useState('');
  const [error, setError] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [users, setUsers] = useState<UsersResponse[]>([]);

  useEffect(() => {
    api
      .get('users')
      .then(response => {
        setUsers(response.data), setLoading(false), setError(false);
      })
      .catch(erro => {
        setUsers([]), setLoading(false), setError(true);
      });
  }, [error, loading]);

  const handleDeleteImage = useCallback(
    async (key: string, path: string) => {
      const item = items.find(el => el.key == key);
      if (item) {
        const image = item.images.filter(image => image.path != path);
        item.images = image;
        const index = items.indexOf(item);
        items[index] = item;
        setItems([...items]);
      }
    },
    [items],
  );

  const handleChangeInputText = useCallback(
    (value: string) => {
      setDocument(value);
    },
    [setDocument],
  );

  const handleChangeSelectedValue = useCallback(
    (value, _) => {
      setLogin(value);
    },
    [login],
  );

  const handleChangeTextOnInputFile = useCallback(
    async (key: string, value: string) => {
      const item = items.find(el => el.key == key);
      if (item) {
        const index = items.indexOf(item);
        items[index].inputText = value;
        setItems(items);
      }
    },
    [setItems],
  );

  const handleCreateItem = useCallback(() => {
    setItems([...items, {key: uuid(), images: []}]);
  }, [items]);

  const handleDeleteInputFile = useCallback(
    (key: string) => {
      const itemsFiltered = items.filter(el => el.key !== key);
      setItems(itemsFiltered);
    },
    [items],
  );

  const handleInputDocuments = useCallback(
    (key: string) => {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        sortOrder: 'desc',
      })
        .then(response => {
          const pathsOfResponse = response.map(image => image.path);
          const item = items.find(el => el.key == key);
          const pathsOfItems = item?.images.map(image => image.path) || [];
          if (item) {
            const imageAlreadyUploaded = pathsOfResponse.every(pathOfResponse =>
              pathsOfItems.includes(pathOfResponse),
            );
            if (imageAlreadyUploaded) {
              Alert.alert('Image já selecionada para esse documento!');
            } else {
              const index = items.indexOf(item);
              item.images = item.images.concat(response);
              items[index] = item;
              setItems([...items]);
            }
          }
        })
        .catch(err => {
          if (err) {
            return;
          }
        });
    },
    [items],
  );

  const handleReload = useCallback(() => {
    setError(false), setLoading(true);
  }, [error, loading]);

  const handleSubmit = useCallback(() => {
    axios
      .post('http://localhost:3333/convert', {login, document})
      .then(response => console.log(response.data))
      .catch(response => console.error(response));
  }, [login, document, items]);

  return loading ? (
    <ScrollView>
      <LoadingContainer>
        <LoadingImage source={require('../../assets/gifs/loading.gif')} />
        <Text fontSize={20}>Carregando...</Text>
      </LoadingContainer>
    </ScrollView>
  ) : error ? (
    <ScrollView>
      <ErrorContainer>
        <Image source={require('../../assets/gifs/error.gif')} />
        <Text fontSize={32} color="red">
          Erro!
        </Text>
        <ReloadButton onPress={handleReload}>
          <Text fontSize={20}>Tente Novamente</Text>
          <DeleteIcon name="refresh" size={32} />
        </ReloadButton>
      </ErrorContainer>
    </ScrollView>
  ) : (
    <ScrollView>
      <Container padding={20}>
        <Image source={logo} />
        <View>
          <Title>Scanner</Title>
        </View>
        <Dropdown>
          <Select
            accessibilityLabel="Usuário"
            selectedValue={login}
            onValueChange={handleChangeSelectedValue}>
            {users.map(item => (
              <Option key={item.id} label={item.login} value={item.login} />
            ))}
          </Select>
          <InputIcon name="person" size={24} />
        </Dropdown>
        <Input
          value={document}
          onChangeText={text => handleChangeInputText(text)}
        />
        {items.map(item => (
          <Container key={item.key}>
            <InputFileContainer>
              <InputFile
                deletable
                inputValue={item.inputText}
                onChangeText={text =>
                  handleChangeTextOnInputFile(item.key, text)
                }
                onPress={() => handleInputDocuments(item.key)}
              />
              <DeleteButton onPress={() => handleDeleteInputFile(item.key)}>
                <DeleteIcon name="delete" size={24} />
              </DeleteButton>
            </InputFileContainer>
            {item.images && (
              <ScrollView horizontal={true}>
                {item.images.map(image => (
                  <ImgContainer key={image.path}>
                    <Image
                      source={{uri: image.path}}
                      style={{width: 100, height: 100}}
                    />
                    <ImageButton
                      onPress={() => {
                        handleDeleteImage(item.key, image.path);
                      }}>
                      <ImageButtonIcon name="clear" size={24} />
                    </ImageButton>
                  </ImgContainer>
                ))}
              </ScrollView>
            )}
            <Text
              key={item.key}
              marginBottom={
                10
              }>{`${item.images?.length.toString()} Imagens Selecionadas`}</Text>
          </Container>
        ))}
        <PlusButtonContainer>
          <PlusButton onPress={handleCreateItem}>
            <PlusButtonIcon name="add-circle" size={32} />
            <Text>Adicionar Documento</Text>
          </PlusButton>
        </PlusButtonContainer>
        <FormButton onPress={handleSubmit} />
      </Container>
    </ScrollView>
  );
};

export default Scanner;

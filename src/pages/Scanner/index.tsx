import React, {useCallback, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';
import Toast from '../../components/Toast';

import logo from '../../assets/images/logo.png';

import api from '../../services/api';

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

interface UsersResponse {
  id: number;
  login: string;
}

interface ImageProps{
  filename: string;
  path: string;
  mime: 'image/jpg';
}

interface ItemProps {
  key: string;
  arquivos: ImageType[];
  nomeArquivo?: string;
}

interface ToastProps {
  message: string;
  visible: boolean;
}

const Scanner: React.FC = () => {
  const [pasta, setPasta] = useState('');
  const [error, setError] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [toast, setToast] = useState({visible: false} as ToastProps);

  useEffect(() => {
    // api
    //   .get('users')
    //   .then(response => {
    //     setUsers(response.data), setLoading(false), setError(false);
    //   })
    //   .catch(erro => {
    //     setUsers([]), setLoading(false), setError(true);
    //   });

    setUsers([{id: 1, login: 'samuelg4133_00'}]), setLoading(false), setError(false);
  }, [error, loading]);

  const handleDeleteImage = useCallback(
    async (key: string, path: string) => {
      const item = items.find(el => el.key == key);
      if (item) {
        const image = item.arquivos.filter(image => image.path != path);
        item.arquivos = image;
        const index = items.indexOf(item);
        items[index] = item;
        setItems([...items]);
      }
    },
    [items],
  );

  const handleChangeInputText = useCallback(
    (value: string) => {
      setPasta(value);
    },
    [setPasta],
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
        items[index].nomeArquivo = value;
        setItems(items);
      }
    },
    [setItems],
  );

  const handleCreateItem = useCallback(() => {
    setItems([...items, {key: uuid(), arquivos: []}]);
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
        mediaType: 'photo',
        sortOrder: 'desc',
        forceJpg: true
      })
        .then(response => {
          const item = items.find(el => el.key == key);
          const pathsOfItems = item?.arquivos.map(image => image.path) || [];
          if (item) {
            const imageAlreadyUploaded =  pathsOfItems.includes(response.path)

            if (imageAlreadyUploaded) {
              setToast({
                visible: true,
                message: 'A foto já foi selecionada.',
              } as ToastProps);
            } else {
              const index = items.indexOf(item);
              item.arquivos = item.arquivos.concat(response);
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

  const {} = items.map(item => item);

  const handleSubmit = useCallback(() => {
    // api
    //   .post('digitalizar', {
    //     usuario: login,
    //     nomePasta: pasta,
    //     arquivos,
    //     nomeArquivos,
    //   })
    //   .then(res => console.log(res.status))
    //   .catch(res => console.error(res));

    const item = items.map(item => item.arquivos);
    console.log({login, pasta, item});
  }, [login, pasta, items]);

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
      <Toast
        message={toast.message}
        transparent
        visible={toast.visible}
        onRequestClose={() => setToast({visible: false} as ToastProps)}
      />
      <Container padding={20} hasOpacity={toast.visible}>
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
          value={pasta}
          onChangeText={text => handleChangeInputText(text)}
        />
        {items.map(item => (
          <Container key={item.key}>
            <InputFileContainer>
              <InputFile
                deletable
                inputValue={item.nomeArquivo}
                onChangeText={text =>
                  handleChangeTextOnInputFile(item.key, text)
                }
                onPress={() => handleInputDocuments(item.key)}
              />
              <DeleteButton onPress={() => handleDeleteInputFile(item.key)}>
                <DeleteIcon name="delete" size={24} />
              </DeleteButton>
            </InputFileContainer>
            {item.arquivos && (
              <ScrollView horizontal={true}>
                {item.arquivos.map(image => (
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
              }>{`${item.arquivos?.length.toString()} Imagens Selecionadas`}</Text>
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

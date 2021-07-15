import React, {useCallback, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {v4 as uuid} from 'uuid';

import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';
import ModalOption from '../../components/ModalOption';
import Toast from '../../components/Toast';

import logo from '../../assets/images/logo.png';

import {scannerApi, sicoobServicosApi} from '../../services/api';

import {
  Container,
  DeleteButton,
  Dropdown,
  ImageButton,
  ImageButtonIcon,
  ImgContainer,
  InputFileContainer,
  InputIcon,
  Option,
  PlusButton,
  PlusButtonContainer,
  PlusButtonIcon,
  Select,
  Text,
  Title,
} from './styles';
import SplashScreen from '../SplashScreen';
import ErrorScreen from '../ErrorScreen';

interface UsersResponse {
  id: number;
  login: string;
}

interface CameraOptionProps {
  key: string;
  visible: boolean;
}

interface ItemProps {
  key: string;
  images: ImageType[];
  filename: string;
}

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'done' | 'error' | 'warning';
}

const Scanner: React.FC = () => {
  const [cameraOptionVisible, setCameraOptionVisible] = useState({
    visible: false,
    key: '',
  } as CameraOptionProps);
  const [error, setError] = useState(false);
  const [folder, setFolder] = useState('');
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [toast, setToast] = useState({visible: false} as ToastProps);

  useEffect(() => {
    sicoobServicosApi
      .get('users')
      .then(response => {
        setUsers(response.data), setError(false);
      })
      .catch(() => {
        setUsers([]), setError(true);
      })
      .finally(() => {
        setLoading(false);
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
      setFolder(value);
    },
    [setFolder],
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
        items[index].filename = value;
        setItems([...items]);
      }
    },
    [items],
  );

  const handleCreateItem = useCallback(() => {
    setItems([...items, {key: uuid(), images: [], filename: ''}]);
  }, [items]);

  const handleDeleteInputFile = useCallback(
    (key: string) => {
      const itemsFiltered = items.filter(el => el.key !== key);
      setItems(itemsFiltered);
    },
    [items],
  );

  function inputDocument(key: string, response: ImageType[]): void {
    // const pathsOfResponse = response.map(image => image.path);
    const item = items.find(el => el.key == key);
    // const pathsOfItems = item?.images.map(image => image.path) || [];
    if (item) {
      // const imageAlreadyUploaded = pathsOfResponse.every(pathOfResponse =>
      //   pathsOfItems.includes(pathOfResponse),
      // );

      // console.log(response);

      // if (imageAlreadyUploaded) {
      //   setToast({
      //     visible: true,
      //     message: 'A foto já foi selecionada.',
      //   } as ToastProps);
      // } else {
        const index = items.indexOf(item);
        item.images = item.images.concat(response);
        items[index] = item;
        setItems([...items]);
      // }
    }
  }

  const handleInputPhotoWithCamera = useCallback(
    (key: string) => {
      setCameraOptionVisible({visible: false, key: ''});
      ImagePicker.openCamera({
        mediaType: 'photo',
        multiple: true,
        sortOrder: 'desc',
        forceJpg: true,
        compressImageQuality: 0.8,
      })
        .then(res => {
          inputDocument(key, res);
        })
        .catch(err => {
          if (err) {
            return;
          }
        });
    },
    [items],
  );

  const handleInputDocuments = useCallback(
    (key: string) => {
      setCameraOptionVisible({visible: false, key: ''});
      ImagePicker.openPicker({
        mediaType: 'photo',
        sortOrder: 'desc',
        forceJpg: true,
        multiple: true,
        compressImageQuality: 0.8,
      })
        .then(response => {
          inputDocument(key, response);
        })
        .catch(err => {
          if (err) {
            setToast({
              visible: true,
              message: 'A imagem selecionada é inválida.',
              type: 'error',
            });
            return;
          }
        });
    },
    [items],
  );

  const handleReload = useCallback(() => {
    setError(false), setLoading(true);
  }, [error, loading]);

  const handleSelectInputDocumentOption = useCallback((key: string) => {
    setCameraOptionVisible({key, visible: true});
  }, []);

  const handleSubmit = useCallback(async () => {
    if (items.length == 0) {
      setToast({
        visible: true,
        message: 'É necessário incluir ao menos um documento.',
      });
      return;
    }
    const itemFilenameErr = items.map(item => !item.filename);
    const itemImagesErr = items.map(item => item.images.length < 1);
    if (
      !folder ||
      !login ||
      itemFilenameErr.includes(true) ||
      itemImagesErr.includes(true)
    ) {
      setToast({
        visible: true,
        message: 'É necessário preencher todos os campos.',
      });
      return;
    }

    let formData = new FormData();
    items.forEach(async item => {
      item.images.forEach(image =>
        formData.append('images', {
          type: 'image/jpeg',
          name: `image${Date.now()}.jpeg`,
          uri: image,
        }),
      );
      try {
        setLoading(true);
        await scannerApi.post(
          `upload/?folder=${folder}&filename=${item.filename}&login=${login}`,
          formData,
        );
        setToast({
          type: 'done',
          message: 'Arquivo(s) gerado(s) com sucesso!',
          visible: true,
        });
        formData = new FormData();
      } catch {
        setToast({
          type: 'error',
          message: 'Erro ao gerar arquivo(s).',
          visible: true,
        });
      } finally {
        setLogin(users[0].login);
        setFolder('');
        setItems([]);
        setLoading(false);
      }
    });
  }, [
    loading,
    items,
    folder,
    login,
    items.map(item => item.images),
    items.map(item => item.filename),
  ]);

  return !error ? (
    <ScrollView>
      <SplashScreen transparent visible={loading} />
      <ModalOption
        transparent
        visible={cameraOptionVisible.visible}
        onRequestClose={() =>
          setCameraOptionVisible({visible: false, key: ''} as CameraOptionProps)
        }
        onSelectCamera={() =>
          handleInputPhotoWithCamera(cameraOptionVisible.key)
        }
        onSelectGallery={() => handleInputDocuments(cameraOptionVisible.key)}
      />
      <Toast
        message={toast.message}
        transparent
        visible={toast.visible}
        onRequestClose={() => setToast({visible: false} as ToastProps)}
        type={toast.type}
      />

      <Container
        padding={20}
        hasOpacity={toast.visible || cameraOptionVisible.visible || loading}>
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
          value={folder}
          onChangeText={text => handleChangeInputText(text)}
        />
        {items.map(item => (
          <Container key={item.key}>
            <InputFileContainer>
              <InputFile
                deletable
                inputValue={item.filename}
                onChangeText={text =>
                  handleChangeTextOnInputFile(item.key, text)
                }
                onPress={() => handleSelectInputDocumentOption(item.key)}
              />
              <DeleteButton onPress={() => handleDeleteInputFile(item.key)}>
                <Icon name="delete" size={24} color="#fff" />
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
              fontSize={14}
              marginBottom={
                10
              }>{`${item.images?.length.toString()} Imagens Selecionadas`}</Text>
          </Container>
        ))}
        <PlusButtonContainer>
          <PlusButton onPress={handleCreateItem}>
            <PlusButtonIcon name="add-circle" size={28} />
            <Text fontSize={16}>Adicionar Documento</Text>
          </PlusButton>
        </PlusButtonContainer>
        <FormButton onPress={handleSubmit} />
      </Container>
    </ScrollView>
  ) : (
    <ErrorScreen onPress={handleReload} />
  );
};
export default Scanner;

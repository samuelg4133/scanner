import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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

import api from '../../services/api';

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
  const [erro, setErro] = useState(false);
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [items, setItems] = useState<ItemProps[]>([]);

  const handleCreateItem = () => {
    setItems([...items, {key: uuid(), images: []}]);
  };

  const handleInputDocuments = (key: string) => {
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
            setItems(items);
          }
        }
      })
      .catch(err => {
        if (err) {
          return;
        }
      });
  };

  // const handleDeleteImage = useCallback(
  //   async (path: string) => {
  //     const images = response.filter(item => item.path !== path);
  //     setResponse(images);
  //   },
  //   [response],
  // );

  const handleChangeSelectedValue = useCallback(
    (value, _) => {
      setSelectedValue(value);
    },
    [selectedValue],
  );

  useEffect(() => {
    api
      .get('users')
      .then(response => {
        setUsers(response.data), setErro(false);
      })
      .catch(() => {
        setErro(true);
      });
  }, [users]);

  const handleChangeInputText = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [setInputValue],
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

  const handleDeleteInputFile = useCallback(
    (key: string) => {
      const itemsFiltered = items.filter(el => el.key !== key);
      setItems(itemsFiltered);
    },
    [items],
  );

  const handleSubmit = useCallback(() => {
    api
      .post('digitalizar', items)
      .then(response => console.log(response))
      .catch(reason => console.error(reason));
  }, [inputValue, selectedValue, items]);

  return (
    <ScrollView>
      <Container padding={20}>
        <Image source={logo} />
        <View>
          <Title>Scanner</Title>
        </View>
        <Dropdown>
          <Select
            accessibilityLabel="Usuário"
            selectedValue={selectedValue}
            onValueChange={handleChangeSelectedValue}>
            {users.map(item => (
              <Option key={item.id} label={item.login} value={item.login} />
            ))}
          </Select>
          <InputIcon name="person" size={24} />
        </Dropdown>
        <Input
          value={inputValue}
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
            <Text
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

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

import api from '../../services/api';

interface UsersResponse {
  id: number;
  login: string;
}

interface ItemProps {
  key: string;
  images?: ImageType[];
  inputText?: string;
}

interface ResponseError {
  reason: object;
}

const Scanner: React.FC = () => {
  const [error, setError] = useState({} as ResponseError);
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [response, setResponse] = React.useState<ImageType[]>([]);
  const [inputFileValue, setInputFileValue] = useState('');

  const [items, setItems] = useState<ItemProps[]>([]);

  const handleCreateItem = useCallback(() => {
    setItems([...items, {key: uuid()}]);
  }, [items]);

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
    api
      .get('users')
      .then(response => {
        setUsers(response.data), setError({} as ResponseError);
      })
      .catch(reason => {
        setError(reason);
      });
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

  const handleChangeInputTextValueOnDeletableInputFile = useCallback(
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

  const handleDestroyYourself = useCallback(
    (key: string) => {
      // const item = items.find(el => el.key == key);
      // if (item) {
      //   const index = items.indexOf(item);
      //   setItems(items.splice(index, 1));
      // }
      const itemsFiltered = items.filter(el => el.key !== key);
      setItems(itemsFiltered);
    },
    [items],
  );

  const handleSubmit = useCallback(() => {
    console.log({selectedValue, inputValue, inputFileValue, response});
  }, [inputValue, selectedValue, inputFileValue, response]);

  return error ? (
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
        <InputFileContainer>
          <InputFile
            inputValue={inputFileValue}
            onChangeText={text => handleChangeInputFileText(text)}
            onPress={handleInputDocuments}
          />
        </InputFileContainer>
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
        {items.map(item => (
          <InputFileContainer key={item.key}>
            <InputFile
              deletable
              inputValue={item.inputText}
              onChangeText={text =>
                handleChangeInputTextValueOnDeletableInputFile(item.key, text)
              }
            />
            <DeleteButton>
              <DeleteIcon
                name="delete"
                size={24}
                onPress={() => handleDestroyYourself(item.key)}
              />
            </DeleteButton>
          </InputFileContainer>
        ))}
        <PlusButtonContainer>
          <PlusButton onPress={handleCreateItem}>
            <PlusButtonIcon name="add-circle" size={32} />
            <Text>Adicionar Campo</Text>
          </PlusButton>
        </PlusButtonContainer>
        <FormButton onPress={handleSubmit} />
      </Container>
    </ScrollView>
  ) : (
    <Text>{error}</Text>
  );
};

export default Scanner;

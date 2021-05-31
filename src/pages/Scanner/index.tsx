import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Input from '../../components/Input';
import PlusButton from '../../components/PlusButton';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';

import logo from '../../assets/images/logo.png';

import {Container, Dropdown, InputIcon, Option, Select, Title} from './styles';

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

  const [inputFileValue, setInputFileValue] = useState('');

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
    console.log({selectedValue, inputValue, inputFileValue});
  }, [inputValue, selectedValue, inputFileValue]);

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
          value={inputFileValue}
          onChangeText={text => handleChangeInputFileText(text)}
        />
        <PlusButton />
        <FormButton onPress={handleSubmit} />
      </Container>
    </ScrollView>
  );
};

export default Scanner;

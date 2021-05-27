import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';

import logo from '../../assets/images/logo.png';

import {Container, Title} from './styles';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';
import api from '../../services/api';
import PlusButton from '../../components/PlusButton';

interface UsersResponse {
  id: number;
  login: string;
}

const Scanner: React.FC = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);

  useEffect(() => {
    api.get('users').then(response => setUsers(response.data));
  }, [users]);
  return (
    <ScrollView>
      <Container>
        <Image source={logo} />
        <View>
          <Title>Scanner</Title>
        </View>
        <Dropdown data={users} />
        <Input />
        <InputFile title="Documentos" />
        <PlusButton />
        <FormButton />
      </Container>
    </ScrollView>
  );
};

export default Scanner;

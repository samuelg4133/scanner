import React from 'react';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';

import logo from '../../assets/images/logo.png';

import {Container, Title} from './styles';
import InputFile from '../../components/InputFile';
import FormButton from '../../components/FormButton';

const Scanner: React.FC = () => {
  return (
    <ScrollView>
      <Container>
        <Image source={logo} />
        <View>
          <Title>Scanner</Title>
        </View>
        <Dropdown />
        <Input />
        <InputFile />
        <FormButton />
      </Container>
    </ScrollView>
  );
};

export default Scanner;

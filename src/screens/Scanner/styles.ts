import styled, {css} from 'styled-components/native';

import {Picker} from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface ContainerProps {
  padding?: number;
  hasOpacity?: boolean;
}

interface TextProps {
  color?: string;
  fontSize?: number;
  marginBottom?: number;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.padding ? `${props.padding}px` : 0)};
  ${props =>
    props.hasOpacity &&
    css`
      opacity: 0.5;
    `}
`;

//delete button
export const DeleteButton = styled.TouchableOpacity`
  background-color: red;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const Dropdown = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 5px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #00ae9d;
  flex-direction: row;
  align-items: center;
`;

export const ImageButton = styled.TouchableOpacity`
  padding: 8px;
  justify-content: center;
  align-items: center;
  background-color: #ee0000;
`;

export const ImageButtonIcon = styled(Icon)`
  color: #fff;
`;

export const InputFileContainer = styled.View`
  width: 100%;
  height: 60px;
  padding-left: 16px;
  margin-bottom: 5px;
  border-radius: 10px;
  border-width: 2px;
  overflow: hidden;
  border-color: #c9d200;
  flex-direction: row;
`;

export const InputIcon = styled(Icon)`
  color: #00ae9d;
`;

export const ImgContainer = styled.View`
  flex: 1;
  flex-direction: row;
  border-width: 2px;
  border-radius: 8px;
  border-color: #eee;
  overflow: hidden;
  margin: 0 8px;
`;

export const Option = styled(Picker.Item)``;

export const PlusButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const PlusButtonContainer = styled.View`
  width: 100%;
`;

export const PlusButtonIcon = styled(Icon)`
  color: #fff;
  margin-right: 6px;
`;

export const Select = styled(Picker)`
  color: #fff;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'Asap-Bold';
  margin: 16px 0;
`;

export const Text = styled.Text<TextProps>`
  font-family: 'Asap-Bold';
  color: ${props => (props.color ? `${props.color}` : '#fff')};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : `16px`)};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
`;

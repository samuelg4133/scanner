import styled, {css} from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface TextProps {
  color?: string;
}

interface IconProps {
  typeOf?: 'done' | 'error' | 'warning';
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.Pressable`
  border-radius: 8px;
  padding: 8px;
  background-color: #c9d200;
  margin-top: 8px;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  align-items: center;
`;

export const Text = styled.Text<TextProps>`
  font-family: 'Asap-Regular';
  font-size: 16px;
  text-align: center;
  color: ${props => (props.color ? `${props.color}` : '#003641')};
`;

export const Title = styled.Text`
  font-family: 'Asap-Bold';
  font-size: 20px;
  text-align: center;
  color: #003641;
`;

export const TitleIcon = styled(Icon).attrs<IconProps>(props => ({
  size: 32,
}))`
  margin-right: 8px;
  ${props =>
    props.name === 'done' &&
    css`
      color: green;
    `}

  ${props =>
    props.name === 'error' &&
    css`
      color: red;
    `}

    ${props =>
    props.name === 'warning' &&
    css`
      color: #c9d200;
    `}
`;

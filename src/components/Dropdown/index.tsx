import {PickerProps} from '@react-native-picker/picker';
import React, {useCallback, useState} from 'react';

import {Container, InputIcon, Option, Select} from './styles';

interface ObjectProps {
  id: number;
  login: string;
}

interface DataProps extends PickerProps {
  data: ObjectProps[];
}

const Dropdown: React.FC<DataProps> = ({data, ...rest}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChangeSelectedValue = useCallback((value, _) => {
    setSelectedValue(value);
  }, []);

  return (
    <Container>
      <InputIcon name="person" size={32} />
      <Select
        selectedValue={selectedValue}
        {...rest}
        onValueChange={handleChangeSelectedValue}>
        {data.map(item => (
          <Option key={item.id} label={item.login} value={item.login} />
        ))}
      </Select>
    </Container>
  );
};

export default Dropdown;

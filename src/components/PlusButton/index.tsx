import React, {useCallback, useState} from 'react';
import InputFile from '../InputFile';

import {Button, Container, PlusButtonIcon, Text} from './styles';

interface ItemProps {
  key: number;
}

const PlusButton: React.FC = () => {
  const [items, setItems] = useState<ItemProps[]>([]);

  const handleCreateItem = useCallback(() => {
    setItems([{key: items.length + 1}, ...items]);
  }, [items]);

  return (
    <>
      {items.length > 0 &&
        items.map(item => <InputFile deletable key={item.key} />)}
      <Container>
        <Button onPress={handleCreateItem}>
          <PlusButtonIcon name="add-circle" size={32} />
          <Text>Adicionar Campo</Text>
        </Button>
      </Container>
    </>
  );
};

export default PlusButton;

import React from 'react';

import {Container, PlusButtonIcon} from './styles';

const PlusButton: React.FC = () => {
  return (
    <Container>
      <PlusButtonIcon name="add-circle" size={32} />
    </Container>
  );
};

export default PlusButton;

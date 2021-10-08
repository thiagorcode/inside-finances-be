import React from 'react';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <section>
        <div></div>
        <div>
          <span>Jhoe Doe</span>
          <span>R$ 22 500</span>

        </div>
      </section>
      <section>
        <div></div>
        <div></div>
      </section>

    </Container>
  )
}

export default Header;

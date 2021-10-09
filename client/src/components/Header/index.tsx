import React from 'react';
import { NotificationsNoneOutlined, Logout } from '@mui/icons-material';
import {
  Container,
  Profile,
  Status,
  BoxProfile,
  BoxNotification,
} from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <BoxProfile>
        <Profile>T</Profile>
        <Status>
          <span>Jhoe Doe</span>
          <span>R$ 22 500</span>
        </Status>
      </BoxProfile>
      <BoxNotification>
        <div>
          <NotificationsNoneOutlined />
        </div>
        <div>
          <Logout />
        </div>
      </BoxNotification>
    </Container>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AccountBalance,
  Equalizer,
  Logout,
  Language,
  DataUsage,
} from '@mui/icons-material';
import { Nav } from './styles';

const MobileMenu: React.FC = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/controle">
            <Equalizer />
          </Link>
        </li>
        <li>
          <Link to="/">
            <AccountBalance />
          </Link>
        </li>
        <li>
          <Link to="/">
            <DataUsage />
          </Link>
        </li>
        <li>
          <Link to="/">
            <Language />
          </Link>
        </li>
        <li>
          <Link to="/">
            <Logout />
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default MobileMenu;

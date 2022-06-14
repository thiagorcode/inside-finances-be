import { Route, Routes as RoutesDOM } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Control from '../pages/Control';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Dashboard />} />
      <Route path="/controle" element={<Control />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </RoutesDOM>
  );
}

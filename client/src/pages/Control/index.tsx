import React from 'react';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';

import MobileMenu from '../../components/MobileMenu';
import Button from '../../components/Button';

import { Spiral } from './styles';

const Control: React.FC = () => {
  return (
    <Box component="div" sx={{ maxWidth: '1200px', ml: 'auto', mr: 'auto' }}>
      <Box
        component="div"
        bgcolor="#2B2E35"
        sx={{
          display: 'block',
          px: 2.3,
          py: 2,
          m: 1,
          borderRadius: 2,
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Usar Typografh */}
          <h2>Controle de Gasto</h2>
          <Button type="button">
            <Add />
          </Button>
        </Box>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
        >
          <Spiral>
            <span>R$ 1,000.00</span>
            <span>+ 15%</span>
          </Spiral>
        </Box>
      </Box>
      <MobileMenu />
    </Box>
  );
};

export default Control;

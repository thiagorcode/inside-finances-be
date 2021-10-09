import React from 'react';
import { Box } from '@mui/system';
import {
  Add,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  FastfoodRounded,
  MovingRounded,
  TrendingDownRounded,
} from '@mui/icons-material';

import MobileMenu from '../../components/MobileMenu';
import Button from '../../components/Button';

import {
  Spiral,
  BoxTypeValues,
  Resume,
  FixedIncome,
  VariabelIncome,
} from './styles';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <Box component="div" sx={{ maxWidth: '1200px', ml: 'auto', mr: 'auto' }}>
      <Header />
      <Box
        component="div"
        sx={{
          display: 'block',
          m: 1,
        }}
      >
        <Box
          component="div"
          bgcolor="#2B2E35"
          sx={{
            display: 'block',
            px: 2.3,
            py: 2,
            mb: 2,

            borderRadius: 6,
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
          <BoxTypeValues>
            <div>
              <span>
                <ArrowUpwardRounded />
              </span>
              <span>R$ 2,000.00</span>
            </div>
            <div>
              <span>
                <ArrowDownwardRounded />
              </span>
              <span>R$ 1,000.00</span>
            </div>
          </BoxTypeValues>
          <Resume>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
          </Resume>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mb: 2,
          }}
        >
          <Box
            component="div"
            bgcolor="#2B2E35"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '50%',
              px: 2.3,
              py: 2,
              borderRadius: 6,
              mr: 0.2,
              height: '80px',
            }}
          >
            <FixedIncome>
              <h5>Renda Fixa</h5>
              <div>
                <MovingRounded />
                <span>R$ 1,000.00</span>
              </div>
            </FixedIncome>
          </Box>
          <Box
            component="div"
            bgcolor="#2B2E35"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '50%',
              px: 2.3,
              py: 2,
              borderRadius: 6,
              ml: 0.2,
              height: '80px',

            }}
          >
            <VariabelIncome>
              <h5>Renda Variável</h5>
              <div>
                <TrendingDownRounded />
                <span>R$ 1,000.00</span>
              </div>
            </VariabelIncome>
          </Box>
        </Box>
        <Box
          component="div"
          bgcolor="#2B2E35"
          sx={{
            display: 'block',
            px: 2.3,
            py: 2,
            mb: 2,

            borderRadius: 6,
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
          <BoxTypeValues>
            <div>
              <span>
                <ArrowUpwardRounded />
              </span>
              <span>R$ 2,000.00</span>
            </div>
            <div>
              <span>
                <ArrowDownwardRounded />
              </span>
              <span>R$ 1,000.00</span>
            </div>
          </BoxTypeValues>
          <Resume>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
            <div>
              <FastfoodRounded />
              <span>Comida</span>
              <span>08/10/2021</span>
              <span>R$ 50,00</span>
            </div>
          </Resume>
        </Box>
      </Box>
      <MobileMenu />
    </Box>
  );
};

export default Dashboard;

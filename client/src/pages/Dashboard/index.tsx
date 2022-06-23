import { useState } from 'react';
import { Box } from '@mui/system';
import {
  Add,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  FastfoodRounded,
  MovingRounded,
  TrendingDownRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';

import MobileMenu from '../../components/MobileMenu';
import Button from '../../components/Button';

import {
  Spiral,
  BoxTypeValues,
  Resume,
  FixedIncome,
  VariabelIncome,
  Card,
  Balance,
  ResumeCard,
  ResumeCardBox,
  ResumeTypeBuy,
} from './styles';
import Header from '../../components/Header';
import { AddTransaction } from './AddTransaction';
import { Modal } from '@mui/material';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

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
            <Button type="button" onClick={() => setOpenModal(true)}>
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
              height: '100px',
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
              height: '100px',
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
              display: 'block',
            }}
          >
            <h2>Cartões</h2>
          </Box>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
              mb: 1,
              alignItems: 'center',
            }}
          >
            <button type="button">
              <KeyboardArrowLeftRounded style={{ color: '#949499' }} />
            </button>
            <Card>
              <p>**** **** **** 4555</p>
              <div>
                <span>Dono do Cartão</span>
                <p>Thiago Rodrigues</p>
              </div>
            </Card>
            <button type="button">
              <KeyboardArrowRightRounded style={{ color: '#949499' }} />
            </button>
          </Box>
          <Balance>
            <div>
              <h6>Card Balance</h6>
              <span>R$ 4,250.00</span>
            </div>
            <Button type="button" onClick={() => alert('Teste')}>
              <Add />
            </Button>
          </Balance>

          <ResumeCard>
            <div>
              <div>
                <div>
                  <ResumeCardBox>L</ResumeCardBox>
                </div>
                <ResumeTypeBuy>
                  <span>Livraria</span>
                  <span>24 Junho, 23:42</span>
                </ResumeTypeBuy>
              </div>
              <div>
                <p>R$ 1,000.00</p>
              </div>
            </div>
            <KeyboardArrowDownRounded />
          </ResumeCard>
        </Box>
      </Box>
      <MobileMenu />
      <Modal open={openModal} sx={{ height: '100vh' }}>
        <AddTransaction setIsVisibleModal={setOpenModal} />
      </Modal>
    </Box>
  );
};

export default Dashboard;

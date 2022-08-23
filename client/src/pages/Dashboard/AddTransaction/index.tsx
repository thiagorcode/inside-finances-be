import { Close } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Form } from './form';
import { Container, Header } from './styles';
import { Success } from './success';

interface AddTransactionProps {
  setIsVisibleModal: (bol: boolean) => void;
}

export const AddTransaction = ({ setIsVisibleModal }: AddTransactionProps) => {
  const [step, setStep] = useState<0 | 1>(1);

  const Components = {
    0: <Form setStep={setStep} />,
    1: <Success setStep={setStep} />,
  };

  return (
    <Box
      component="div"
      sx={{
        maxWidth: '478px',
        ml: 'auto',
        mr: 'auto',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        height: '87vh',
        width: '100%',
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
        <Container>
          <Header>
            <button type="button" onClick={() => setIsVisibleModal(false)}>
              <Close />
            </button>
            <h1>Adicionar Transação</h1>
          </Header>
          {Components[step]}
        </Container>
      </Box>
    </Box>
  );
};

import { Close } from '@mui/icons-material';
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
    <Container>
      <Header>
        <button type="button" onClick={() => setIsVisibleModal(false)}>
          <Close />
        </button>
        <h1>Adicionar Transação</h1>
      </Header>
      {Components[step]}
    </Container>
  );
};

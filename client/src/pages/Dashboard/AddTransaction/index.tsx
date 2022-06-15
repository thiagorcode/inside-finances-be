import { Close } from '@mui/icons-material';
import { Form } from './form';
import { Container, Header } from './styles';

interface AddTransactionProps {
  setIsVisibleModal: (bol: boolean) => void;
}

export const AddTransaction = ({ setIsVisibleModal }: AddTransactionProps) => {
  return (
    <Container>
      <Header>
        <button type="button" onClick={() => setIsVisibleModal(false)}>
          <Close />
        </button>
        <h1>Adicionar Transação</h1>
      </Header>
      <Form />
    </Container>
  );
};

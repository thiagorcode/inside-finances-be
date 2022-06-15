import Button from '../../../components/Button';
import { Input } from '../../../components/Form';
import { FormTransaction } from './styles';

export const Form = () => {
  return (
    <FormTransaction>
      <Input label="Descrição:" />
      <Input label="Tipo:" />
      <Input label="Valor:" />
      <Input label="Data:" />
      <Input label="Pagamento:" />
      <Button>Salvar</Button>
    </FormTransaction>
  );
};

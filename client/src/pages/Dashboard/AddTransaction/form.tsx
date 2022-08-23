import { Input } from '../../../components/Form';
import { FormTransaction, Button } from './styles';
import { format } from 'date-fns';
import { Categorys } from './components/categorys';
interface FormProps {
  setStep: (value: 0 | 1) => void;
}
export const Form = ({ setStep }: FormProps) => {
  return (
    <FormTransaction>
      {/** TODO: Alterar o placeholder quando ele for despesa ou receita */}
      <Input label="Descrição:" placeholder="Alimentação, Salário, Conta" />
      <Input label="Tipo:" placeholder="Alimentação, Salário, Conta">
        <select>
          <option value="">Selecione</option>
          <option value="+">Receita</option>
          <option value="-">Despesa</option>
        </select>
      </Input>
      <Categorys />
      {/** TODO: Create sugest Value - 20,00 / MED */}

      <Input label="Valor:" placeholder="R$ 99,99" />
      <Input label="Data:" placeholder={format(new Date(), 'dd/MM/yyyy')} />
      {/* <Input label="Pagamento:" placeholder="Cartão ou Avista" /> */}
      <Button>Salvar</Button>
    </FormTransaction>
  );
};

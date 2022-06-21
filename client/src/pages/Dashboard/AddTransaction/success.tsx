import { Box } from '@mui/system';
import { Button } from './styles';

interface SuccessProps {
  setStep: (value: 0 | 1) => void;
}

export const Success = ({ setStep }: SuccessProps) => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="assets/svg/savetransaction.svg" alt="Transação salva" />
      <h2>Transação salva com sucesso.</h2>
      <Button type="button" onClick={() => setStep(0)}>
        Adicionar Novo
      </Button>
    </Box>
  );
};

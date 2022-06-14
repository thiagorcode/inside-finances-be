import { ReactNode } from 'react';
import { Modal as ModalUI, Box } from '@mui/material';

interface IModal {
  open: boolean;
  children: ReactNode;
}

const Modal = ({ open, children }: IModal) => {
  return (
    <ModalUI open={open}>
      <Box
        component="div"
        sx={{ maxWidth: '1200px', ml: 'auto', mr: 'auto', bgcolor: '#000' }}
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
          {children}
        </Box>
      </Box>
    </ModalUI>
  );
};

export default Modal;

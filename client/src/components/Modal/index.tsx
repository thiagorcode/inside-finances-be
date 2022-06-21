import {
  Modal as ModalUI,
  Box,
  ModalTypeMap,
  ModalProps as ModalProp,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-types
const Modal = ({ children, ...props }: ModalProp<'div', ModalTypeMap>) => {
  return (
    <ModalUI {...props}>
      <Box
        component="div"
        sx={{
          maxWidth: '478px',
          ml: 'auto',
          mr: 'auto',
          bgcolor: 'trasparent',
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
          {children}
        </Box>
      </Box>
    </ModalUI>
  );
};

export default Modal;

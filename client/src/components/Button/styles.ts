import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface IButton {
  textcolor?: string;
}

export const But = styled(Button)(({ textcolor }: IButton) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px',
  width: '40px',
  height: '40px',
  border: '1px solid',
  lineHeight: 1.5,
  color: textcolor || '#fff',
  backgroundColor: '#233DC7',
  borderColor: '#233DC7',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#2644D8',
    borderColor: '#2644D8',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#2644D8',
    borderColor: '#2644D8',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}));

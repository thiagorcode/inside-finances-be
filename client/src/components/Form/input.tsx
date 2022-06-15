import { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <Container>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...props} />
    </Container>
  );
};

import React, { ButtonHTMLAttributes } from 'react';

import { But } from './styles';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  color,
  ...rest
}) => {
  return (
    <But textcolor={color} {...rest}>
      {children}
    </But>
  );
};

export default Button;

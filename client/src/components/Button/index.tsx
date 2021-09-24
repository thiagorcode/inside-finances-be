import React, { ButtonHTMLAttributes } from 'react';

import { But } from './styles';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  { children, color },
  props,
) => {
  return (
    <But textcolor={color} {...props}>
      {children}
    </But>
  );
};

export default Button;

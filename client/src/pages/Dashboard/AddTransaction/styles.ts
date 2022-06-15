import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.125rem;
    line-height: 2rem;
    margin-left: 1rem;
  }

  svg {
    color: #fff;
  }
`;

export const FormTransaction = styled.form`
  width: 90%;
  margin-inline: auto;
`;

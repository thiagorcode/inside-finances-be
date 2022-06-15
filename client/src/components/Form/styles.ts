import styled from 'styled-components';

export const Container = styled.div`
  label {
    color: #fff;
    font-size: 0.875rem;
    font-weight: bold;
  }

  input {
    border-radius: 0.25rem;
    width: 100%;
    padding: 0.375rem 0.5rem;
    background: rgba(11, 11, 12, 0.8);
    border: 0.031rem solid #343438;
    color: #fff;
    font-size: 0.875rem;

    &::placeholder {
      color: #9f9f9f;
      font-size: 0.875rem;
    }
  }
`;

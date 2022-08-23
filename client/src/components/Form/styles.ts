import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 0.875rem;

  label {
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.35rem;
  }

  .class_input {
    border-radius: 0.25rem;
    width: 100%;
    padding: 0.5rem 0.5rem;
    background: rgba(11, 11, 12, 0.8);
    border: 0.031rem solid #343438;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;

    &::placeholder {
      color: #888888;
      font-size: 1rem;
    }
  }
`;

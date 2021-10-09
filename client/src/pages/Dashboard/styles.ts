import styled from 'styled-components';

export const Spiral = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 28px;
  margin-bottom: 25px;
  span {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: #fff;

    font-size: 32px;
  }

  span:last-child {
    color: #00c614;
    font-weight: 400;
    font-size: 14px;
  }
`;

export const BoxTypeValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    background-color: #3c404e;
    border-radius: 4px;
    padding: 15px 13px;
    display: flex;
    align-items: center;
    transition: box-shadow 0.2s;

    :hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    :first-child svg {
      color: #00c614;
    }
    :last-child svg {
      color: #ff0404;
    }
  }

  svg {
  }
`;
export const Resume = styled.div`
  margin-top: 45px;
  padding: 15px 0;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
    padding-top: 18px;
    border-bottom: 0.1px solid #b5b5b5;
    color: #858aa1;
  }
`;
export const FixedIncome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin-left: 12px;
  }
  svg {
    color: #00c614;
  }
  h5 {
    font-size: 12px;
    color: #b5b5b5;
  }
`;

export const VariabelIncome = styled.div`
  div {
    margin-left: 12px;
  }
  svg {
    color: #ff0404;
  }
  h5 {
    font-size: 12px;
    color: #b5b5b5;
  }
`;

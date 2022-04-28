import styled from 'styled-components';

export const Spiral = styled.button`
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

export const Card = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  height: 195px;
  background: linear-gradient(
    180deg,
    #646a8b 0%,
    rgba(100, 106, 139, 0.7) 41.18%,
    rgba(100, 106, 139, 0.07) 96.41%
  );
  border-radius: 25px;
  padding: 0 25px;

  & > p {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }

  div p {
    font-size: 16px;
    color: #dfdfdf;
  }

  div span {
    font-size: 12px;
    color: #b5b5b5;
    font-weight: bold;
  }
`;

export const Balance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 14px;

  border-bottom: 0.4px solid #b5b5b5;
  div h6 {
    font-size: 14px;
    color: #b5b5b5;
  }

  div span {
    font-size: 36px;
    color: #ffffff;
  }
  button {
    width: 42px;
    height: 42px;
  }
`;

export const ResumeCard = styled.div`
padding-bottom: 70px;
  margin-top: 16px;
  text-align: center;
  & > div > div {
    display: flex;
    flex-direction: row;
    align-items: center;

  }
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
`;

export const ResumeCardBox = styled.span`
background-color: #c4c4c4;
  color: #999999;
 padding: 9px 17px;
  border-radius: 4px;
  margin-right: 7.82px;

`
export const ResumeTypeBuy = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 16px;
    text-align: left;
  }
  span:last-child {
    color: #B5B5B5;
    font-size: 14px;
    margin-top: 6px;
  }
`

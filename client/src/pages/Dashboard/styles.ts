import styled from 'styled-components';

export const Spiral = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121f64;

  span {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: #fff;
  }

  span:last-child {
    color: #00C614 ;
    font-weight: 400;

  }
`;

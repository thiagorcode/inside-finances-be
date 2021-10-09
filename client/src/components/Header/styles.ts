import styled from 'styled-components';

export const Container = styled.header`
  width: 90.2%;
  margin: 21px auto 18px auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const Profile = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 3px solid #233dc7;
  background-color: #ffb800;
  font-weight: bold;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;

  margin-left: 9px;

  span {
    color: #6b6b6e;
    font-size: 14px;
  }
  span:last-child {
    font-size: 16px;
    color: #3652dc;
  }
`;
export const BoxProfile = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BoxNotification = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #3c404e;
    width: 30px;
    height: 30px;

    border-radius: 50%;
    margin: 0 5px;
    svg {
      font-size: 18px;
      color: #dbdbdb;
    }
  }
`;

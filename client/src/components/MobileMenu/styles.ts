import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;

  width: 100%;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 4%;
    width: 92%;
    height: 60px;
    border-radius: 22px;
    margin: 0 auto;
    max-width: 480px;
    padding: 0 12px;
    background-color: #2b2e35;
    box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.5);
  }
  li {
  }
  a {
    display: flex;
    align-items: center;
  }
`;

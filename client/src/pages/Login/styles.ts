import styled from 'styled-components';

export const HeaderLogin = styled.div`
  color: white;
  position: absolute;
  bottom: 60%;
  left: 30px;

  h1 {
    position: relative;
    bottom: -40px;
    left: 30px;
    font-size: 50px;
  }

  .triangle {
    position: absolute;
    bottom: 110px;
    left: -30px;
  }

  .tringdow2 {
    position: absolute;
    top: 254px;
    left: 253px;
  }
`;

export const Bordes = styled.div`
  display: flex;
  padding: 20px;

  .money {
    position: absolute;
    bottom: 1px;
    right: 1px;
  }

  .triangle1 {
    position: absolute;
    top: 1px;
    left: 1px;
  }

  .tringdown1 {
    position: absolute;
    bottom: -1px;
    right: -2px;
  }
`;

export const Form = styled.form`
  display: flex;
  height: 100vh;
  width: 85%; // Quando vc usa width menor que 100 vc pode usar o margin 0 auto para centralizar
  margin: 0 auto;
  flex-direction: column;
  //alinha na vertica; Quando usa column inverte esse alinha na horizontal
  align-items: center;
  //alinha na horizontal; E esse alinha na vertical
  justify-content: center;

  button {
    background-color: #0c27b5;
    color: white;
    height: 40px;
    border-radius: 8px;
    font-size: 18px;
    width: 100%;
  }

  &::placeholder {
    font-size: 14px;
    padding-left: 0px;
    color: #888888;
  }

  input {
    color: white;
    border: none;
    display: block;
    background-color: transparent;
    width: 100%;
  }
`;

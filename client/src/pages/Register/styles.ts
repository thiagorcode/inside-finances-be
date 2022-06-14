import styled from 'styled-components';

export const HeaderTop = styled.div`
  display: flex;
  padding-bottom: 100px;
  padding: 20px;

  .triangleone {
    position: absolute;
    top: 1px;
    left: 1px;
  }

  .triangledown1 {
    position: absolute;
    bottom: 1px;
    right: 1px;
  }
`;

export const HeaderRegister = styled.div`
  .triangletwo {
    position: absolute;
    top: 0px;
    right: 9px;
  }

  .triangledown2 {
    position: absolute;
    bottom: -5px;
    right: -3px;
  }
`;

export const Form = styled.form`
  .header-form {
    display: block;
    text-align: left;
    width: 100%;
    z-index: 999;
    margin-bottom: 60px;
  }

  .header-form h1 {
    font-size: 44px;
  }

  &::placeholder {
    font-size: 14px;
    padding-left: 0px;
    color: #888888;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 80%;
  margin: 0 auto;

  input {
    color: white;
    width: 100%;
    border: none;
    display: block;
    background-color: transparent;
    line-height: 1.1;
    font-size: 12px;
    border-bottom: 2px solid white;
    outline: 0;
    padding: 10px 5px;
    margin: 4px 0;
  }

  button {
    background-color: #0c27b5;
    color: white;
    height: 40px;
    width: 100%;
    border-radius: 8px;
    font-size: 18px;
    margin-top: 25px;
  }
  a {
    margin-top: 12px;
  }
`;

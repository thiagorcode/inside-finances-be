import { useCallback } from 'react';
import { Bordes, HeaderLogin, Form } from './styles';
// Geralmente quando for importar usa letra maiúscula nas variáveis
/// Lembra de usar os nomes das functions com Letra maiúscula
export default function Login() {
  const handleFormSubmit = useCallback(() => {
    // Para fazer as integrações com api
    // Estudar sobre Promises, async await
  }, []);

  return (
    <>
      <Bordes>
        <img
          className="triangle1"
          src="assets/img/Vector1.png"
          alt="triangle"
          width="350px"
        />
        <img
          className="money"
          src="assets/img/dollar.png"
          alt="moeda"
          width="150px"
        />
        <img
          className="tringdown1"
          src="assets/img/baixo1.png"
          alt="triangledown"
          width="150px"
        />
      </Bordes>
      <HeaderLogin>
        <img
          className="triangle"
          src="assets/img/Vector2.png"
          alt="triangle2"
          width="355px"
        />
        <img
          className="tringdow2"
          src="assets/img/baixo2.png"
          alt="triangledown2"
          width="78px"
        />
      </HeaderLogin>
      <Form>
        <h1>LOGIN</h1>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Senha" />

        <a className="phrase-register" href="http://localhost:3000/register">
          <p>cadastrar agora</p>
        </a>
        <button type="submit">LOGIN</button>
      </Form>
    </>
  );
}

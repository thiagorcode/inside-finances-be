import { HeaderTop, HeaderRegister, Form } from './styles';

export default function Register() {
  return (
    <>
      <HeaderTop>
        <img
          className="triangleone"
          src="assets/img/Vector1.png"
          alt="triangulo"
          width="350px"
        />
        <img
          className="triangledown1"
          src="assets/img/baixo1.png"
          alt="triangulodebaixo"
          width="147px"
        />
      </HeaderTop>
      <HeaderRegister>
        <img
          className="triangletwo"
          src="assets/img/Vector2.png"
          alt="triangulo2"
          width="370px"
        />
        <img
          className="triangledown2"
          src="assets/img/baixo2.png"
          alt="triangulodebaixo2"
          width="80px"
        />
      </HeaderRegister>
      <Form>
        <div className="header-form">
          <h1>Cadastrar</h1>
        </div>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <input type="text" placeholder="usuario" />
        <input type="password" placeholder="Confirme sua senha" />
        <button type="button">ENVIAR</button>
        <a href="http://localhost:3000/login">
          <p>Voltar ao login</p>
        </a>
      </Form>
    </>
  );
}

import React from "react";
// import './style.css' Alterar para Styled
import vec1 from '../Login/img/Vector1.png'
import vec2 from '../Login/img/Vector2.png'
import baixo1 from '../Login/img/baixo1.png'
import baixo2 from '../Login/img/baixo2.png'

export default function Register() {

  return (
    <>
      <div className="header-top">
        <img className="triangleone" src={vec1} alt="triangulo" width="350px" />
        <img className="triangledown1" src={baixo1} alt="triangulodebaixo" width="150px" />
      </div>
      <div className="header-register" >
        <img className="triangletwo" src={vec2} alt="triangulo2" width="355px" />
        <img className="triangledown2" src={baixo2} alt="triangulodebaixo2" width="80px" />
        <h1>Cadastrar</h1>
      </div>
      <form>
        <div className="form-emailregister">
          <input type="text" placeholder="Email" autoFocus />
        </div>
        <div className="form-passwordregister">
          <input type="password" placeholder="Senha" />
          <a href="http://localhost:3000/login"><p>Voltar ao login</p></a>
        </div>
        <div className="form-buttonregister" >
          <button type="button">ENVIAR</button>
        </div>
        <div className="form-username">
          <input type="text" placeholder="usuario" autoFocus />
        </div>
        <div className="form-passwordconfirm">
          <input type="password" placeholder="Confirme sua senha" />
        </div>
      </form>
    </>
  )
}

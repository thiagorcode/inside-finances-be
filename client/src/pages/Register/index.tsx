import React from "react";
import {HeaderTop,HeaderRegister,Form } from './styles'
// import './style.css' Alterar para Styled
import Vec1 from '../Login/img/Vector1.png'
import Vec2 from '../Login/img/Vector2.png'
import Down1 from '../Login/img/baixo1.png'
import Down2 from '../Login/img/baixo2.png'

export default function Register() {

  return (
    <>
      <HeaderTop>
        <img className="triangleone" src={Vec1} alt="triangulo" width="350px" />
        <img className="triangledown1" src={Down1} alt="triangulodebaixo" width="147px" />
      </HeaderTop>
      <HeaderRegister >
        <img className="triangletwo" src={Vec2} alt="triangulo2" width="370px" />
        <img className="triangledown2" src={Down2} alt="triangulodebaixo2" width="80px" />
      </HeaderRegister>
        <Form>
          <div className="header-form">
            <h1>Cadastrar</h1>
          </div>
          <input type="text" placeholder="Email" autoFocus />
          <input type="password" placeholder="Senha" />
          <input type="text" placeholder="usuario" autoFocus />
          <input type="password" placeholder="Confirme sua senha" />
          <button type="button">ENVIAR</button>
          <a href="http://localhost:3000/login"><p>Voltar ao login</p></a>
        </Form> 
    </>
  )
}

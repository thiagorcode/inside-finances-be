import React from "react";
import './Style.css'
// Geralmente quando for importar usa letra maiúscula nas variáveis
// TODO: Deixa assim depois te mostro outra maneira.
import Coin from './img/dollar.png'
import Vec1 from './img/Vector1.png'
import Vec2 from './img/Vector2.png'
import Down1 from './img/baixo1.png'
import Down2 from './img/baixo2.png'
/// Lembra de usar os nomes das functions com Letra maiúscula
export default function Login() {
  return (
    <>
      <div className="header-left">
        <img className="triangle1" src={Vec1} alt="triangle" width="350px" />
        <img className="money" src={Coin} alt="moeda" width="150px" />
        <img className="tringdown1" src={Down1} alt="triangledown" width="150px" />
      </div>
      <div className="header-login" >
        <img className="triangle" src={Vec2} alt="triangle2" width="355px" />
        <img className="tringdow2" src={Down2} alt="triangledown2" width="80px" />
        <h1>LOGIN</h1>
      </div>
      <form>
        <div className="form-email">
          <input type="text" placeholder="Email" autoFocus />
        </div>
        <div className="form-password">
          <input type="password" placeholder="Senha" />
          {/*
          Depois te ensino a fazer direcionamento no React
            Se quiser pesquisar vai no google e pesquisa "Link react router dom"
          */}
          <a href="http://localhost:3000/register"><p>cadastrar agora</p></a>
        </div>
        <div className="form-buttonsubmit" >
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </>
  )
}

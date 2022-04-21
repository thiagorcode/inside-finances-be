import React from "react";
import './style.css'
import vec1 from '../Login/img/Vector1.png'
import vec2 from '../Login/img/Vector2.png'
import baixo1 from '../Login/img/baixo1.png'
import baixo2 from '../Login/img/baixo2.png'

export default function Register() {

  return (
    <>
      <div className="Arearegister">
        <img className="triangulo1" src={vec1} alt="triangulo" width="350px" />
        <img className="tringbaixo1" src={baixo1} alt="triangulodebaixo" width="150px" />
      </div>
      <div className="Logo" >
        <img className="triangulo2" src={vec2} alt="triangulo2" width="355px" />
        <img className="tringbaixo2" src={baixo2} alt="triangulodebaixo2" width="80px" />
        <h1>Cadastrar</h1>
      </div>
      {/* <div className="register">
        <form>
          <input type="text" placeholder="Email" autoFocus/>
        </form>
      </div>
      <div className="passow">
        <form>
        <input type="password" placeholder="Senha" />
        {/* Pode fazer igual a cima. */}
      {/*Não precisa </input> <input type="password" placeholder="Senha" ></input>
          <a href="http://localhost:3000/login"><p>Voltar ao login</p></a>
        </form>
      </div>
      <div className="Login" >
        <form>
          <button type="button">ENVIAR</button>
        </form>
      </div>
      <div className="Usuario">
        <form>
          <input type="text" placeholder="usuario" autoFocus/>
        </form>
      </div>
      <div className="passowcornfirm">
        <form>
          <input type="password" placeholder="Confirme sua senha" />
        </form>
      </div> */}
      {/* ********** */}
      {/*! Você pode usar um form para tudo */}
      <form>

        <div className="register">
          <input type="text" placeholder="Email" autoFocus />
        </div>
        <div className="passow">
          <input type="password" placeholder="Senha" />
          {/* Pode fazer igual a cima. */}
          {/*Não precisa colocar </input> <input type="password" placeholder="Senha" ></input> */}
          <a href="http://localhost:3000/login"><p>Voltar ao login</p></a>
        </div>
        <div className="Login" >
          <button type="button">ENVIAR</button>
        </div>
        <div className="Usuario">
          <input type="text" placeholder="usuario" autoFocus />
        </div>
        <div className="passowcornfirm">
          <input type="password" placeholder="Confirme sua senha" />
        </div>
      </form>
    </>
  )
}

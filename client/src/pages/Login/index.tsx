import React, { useCallback } from "react";
import { Bordes, HeaderLogin, Form } from './styles'
// Geralmente quando for importar usa letra maiúscula nas variáveis
// TODO: Deixa assim depois te mostro outra maneira.
import Coin from './img/dollar.png'
import Vec1 from './img/Vector1.png'
import Vec2 from './img/Vector2.png'
import Down1 from './img/baixo1.png'
import Down2 from './img/baixo2.png'
/// Lembra de usar os nomes das functions com Letra maiúscula
export default function Login() {
  const handleFormSubmit = useCallback(() => {
    // Para fazer as integrações com api
    // Estudar sobre Promises, async await
  }, [])


  return (
    <>
      <Bordes>
        <img className="triangle1" src={Vec1} alt="triangle" width="350px" />
        <img className="money" src={Coin} alt="moeda" width="150px" />
        <img className="tringdown1" src={Down1} alt="triangledown" width="150px" />
      </Bordes>
      <HeaderLogin >
        <img className="triangle" src={Vec2} alt="triangle2" width="355px" />
        <img className="tringdow2" src={Down2} alt="triangledown2" width="80px" />
      </HeaderLogin>
      <Form>
        <h1>LOGIN</h1>
        <input type="text" placeholder="Email" autoFocus />
        <input type="password" placeholder="Senha" />

        <a className="phrase-register" href="http://localhost:3000/register"><p>cadastrar agora</p></a>
        <button type="submit">LOGIN</button>
      </Form >

    </>
  )
}

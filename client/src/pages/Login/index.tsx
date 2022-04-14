import React from "react";
import './Style.css'
import Moeda from './img/dollar.png'
import vec1 from './img/Vector1.png'
import vec2 from './img/Vector2.png'
import baixo1 from './img/baixo1.png'
import baixo2  from './img/baixo2.png'

export default function login() {

    return (
        <body>
            <div className="Arealogin">    
            <img className="triangulo1" src={vec1} alt="triangulo" width="350px" />  
            <img className="money" src={Moeda} alt="moeda" width="150px" />
            <img className="tringbaixo1" src={baixo1} alt="triangulodebaixo" width="150px" />
            </div>
             <div className="Logo" >
             <img className="triangulo2" src={vec2} alt="triangulo2" width="355px" /> 
             <img className="tringbaixo2" src={baixo2} alt="triangulodebaixo2" width="80px" />
                 <h1>LOGIN</h1>
             </div>
             <div className="register">
                 <form>
                 <input type="text" placeholder="Email" autoFocus></input>
                 </form>
                 </div>
             <div className="passow">
             <form>
             <input type="password" placeholder="Senha" ></input>
             <a href="http://localhost:3000/register"><p>cadastrar agora</p></a>
                 </form>
                  </div>
             <div className="Login" >
                 <form>
                     <button>LOGIN</button>
                     </form>
             </div>
 </body>

    )
}
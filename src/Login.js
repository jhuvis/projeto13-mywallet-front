import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import track from './MyWallet.png';
import UserContext from './UserContext';
import "./style.css";

export default function Login()
{
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [cadastrar, setCadastrar] = useState("Entrar");
  const [carrega, setCarregar] = useState("none");

  const [dados, setDados] = useContext(UserContext);
  const navigate = useNavigate();


  function finalizar(event)
  {
      
      let isApiSubscribed = true;
      event.preventDefault();
      setCarregar("");
      setCadastrar("");
      
          
      const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", 
      {
        email: email,
        password: senha
      });
  
      requisicao.then((res) => {
      if(isApiSubscribed) 
      {
        setDados(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("image", res.data.image);
        localStorage.setItem("porcentagem", 0);
        setEmail("");
        setSenha("");
        navigate("/hoje");
      }

    });
  
      requisicao.catch(() => {
          alert("algo deu errado");
          setCadastrar("Entrar");
          setCarregar("none");
  
      })

      return () => 
        {
          isApiSubscribed = false;
        };
  
  }

    return(
        <Inicio>
        <img src={track}/>
        <Form onSubmit={finalizar}>
        <label htmlFor="email"></label>
         <div><Input
            type="email"
            id="email"
            value={email}
            placeholder="E-mail "
            onChange={(e) => setEmail(e.target.value)}
            disabled={!carrega}
            required
          /></div> 
          <label htmlFor="senha"></label>
          <div><Input
            type="password"
            id="password"
            value={senha}
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            disabled={!carrega}
            required
          /></div> 
          <Buttom type="submit" disabled={!carrega}>
              {cadastrar} 
              <div className={carrega}></div>   
          </Buttom>
        </Form>
        <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
        </Inicio>
    );
}

const Inicio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: calc(90vh);
    img{
        margin: 25px;
    }

`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    
    div{
      margin-bottom: 10px;
    }

`;

const Buttom = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 303px;
    height: 45px;

    background: #A328D6;
    border-radius: 5px;
    border: none;
    font-size: 20.976px;
    color: #FFFFFF;
    font-family: 'Raleway';
    font-weight: 700;
    margin-bottom: 40px;
    
`;

const Input = styled.input`
display: flex;
width: 303px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
font-family: 'Raleway';
font-weight: 400;
font-size: 18px;
border-radius: 5px;
padding: 10px;
`;
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import track from './MyWallet.png';
import axios from 'axios';

export default function Signin()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [senhac, setSenhac] = useState("");

    const [cadastrar, setCadastrar] = useState("Cadastrar");
    const [carrega, setCarregar] = useState("none");

function finalizar(event)
{
    event.preventDefault();
    if(senha !== senhac)
    {
        alert("Senhas diferentes!");
        return;
    }
    let isApiSubscribed = true;
    setCarregar("");
    setCadastrar("");
        
    const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", 
    {
		email: email,
	    name: nome,
	    password: senha
	});

    requisicao.then(() => 
    {
        if(isApiSubscribed) 
        {
            setSenhac("");
            setNome("");
            setEmail("");
            setSenha("");
            navigate("/",
            {
                replace: false,
            })
        }  

    });

    requisicao.catch(() => {
        alert("algo deu errado");
        setCadastrar("Cadastrar");
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
        <div><Input
            type="text"
            id="nome"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            disabled={!carrega}
            required
          /></div> 
         <div><Input
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            disabled={!carrega}
            required
          /></div> 
          <div><Input
            type="password"
            id="password"
            value={senha}
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            disabled={!carrega}
            required
          /></div>
          <div><Input
            type="password"
            id="confirm_password"
            value={senhac}
            placeholder="Confirme a senha"
            onChange={(e) => setSenhac(e.target.value)}
            disabled={!carrega}
            required
          /></div>
          <Buttom type="submit" disabled={!carrega}>
            {cadastrar} 
            <div className={carrega}></div>
          </Buttom>
        </Form>
        <Link to={"/"}>Já tem uma conta? Entre agora!</Link>
        
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
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
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
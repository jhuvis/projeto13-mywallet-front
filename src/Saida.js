import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import "./style.css";

export default function Saida()
{
  const [valor, setValor] = useState();
  const [desc, setDesc] = useState();

  const [carrega, setCarregar] = useState("none");

  let token = localStorage.getItem("token");
  const navigate = useNavigate();


  function finalizar(event)
  {
      
      let isApiSubscribed = true;
      event.preventDefault();
      setCarregar("");
      
          
      const requisicao = axios.post("http://localhost:5000/saida", {
        valor: Number(valor),
        desc: desc
      }, {
        headers: { Authorization: `Bearer ${token}` }
    });
  
      requisicao.then(() => {
      if(isApiSubscribed) 
      {
        setCarregar("none");
        setValor("");
        setDesc("");
        navigate("/registros");
      }

    });
  
      requisicao.catch((e) => {
          alert("algo deu errado " + e);
          setCarregar("none");
      })

      return () => 
        {
          isApiSubscribed = false;
        };
  
  }

    return(
        <>
        <Inicio>
        <Topo>Nova saida</Topo>
            <Form onSubmit={finalizar}>
                <div><Input
                    type="number"
                    id="number"
                    value={valor}
                    placeholder="Valor"
                    onChange={(e) => setValor(e.target.value)}
                    disabled={!carrega}
                    required /></div>
                <div><Input
                    type="text"
                    id="text"
                    value={desc}
                    placeholder="Descrição"
                    onChange={(e) => setDesc(e.target.value)}
                    disabled={!carrega}
                    required /></div>
                <Buttom type="submit" disabled={!carrega}>
                    Salvar saida
                </Buttom>
            </Form>
        </Inicio>
        </>
    );
}

const Topo = styled.div`
    
    align-items: flex-start;
    justify-content: flex-start;
    margin: 25px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: #FFFFFF;
`;

const Inicio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: calc(20vh);

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

    width: 326px;
    height: 46px;

    background: #A328D6;
    border-radius: 5px;
    border: none;
    font-size: 20.976px;
    color: #FFFFFF;
    font-family: 'Raleway';
    font-weight: 700;
    
`;

const Input = styled.input`
display: flex;
width: 326px;
height: 58px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
font-family: 'Raleway';
font-weight: 400;
font-size: 18px;
border-radius: 5px;
padding: 10px;
`;
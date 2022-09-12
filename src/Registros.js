import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import sai from './sai.png';
import bola from './bola.png';
import { Link } from 'react-router-dom';

export default function Registros()
{

    let token = localStorage.getItem("token");

    const [nao, setNao] = useState("Não há registros de entrada ou saída");
    const [registros, setRegistros] = useState([]);
    const [none, setNone] = useState("none");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let isApiSubscribed = true;
        const requisicao = axios.get(
          `http://localhost:5000/registros`, {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
    
        requisicao.then((res) => {
          if(isApiSubscribed) 
          {
            agendarAtualizacaoDeStatus();
            setRegistros(res.data);
            let soma = 0;
            for(let i = 0; i < res.data.length; i++)
            {
                soma += res.data[i].valor;
            }
            setTotal(soma.toFixed(2));
            if(res.data.length === 0)
            {
                setNao("Não há registros de entrada ou saída");
                setNone("none")
            }
            else
            {
                setNao("");
                setNone("");
            }
          }
        });
        return () => 
        {
          isApiSubscribed = false;
        };
      }, [!none]);

      function agendarAtualizacaoDeStatus() {
        setInterval(atualizarStatus, 5000);
      }
      function atualizarStatus() {
        axios.post("http://localhost:5000/status", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
      };
    

    return(
        
        <>
        <Topo>
            <div>
                <p>Olá, Fulano</p>
            </div>
            <div>
                <Link to={"/"}><img src={sai}/></Link>
            </div>
        </Topo>
        <Corpo>  
            <p>{nao}</p>
            <div className={none}>
                {registros.map((registro, index) => <Registro key={index}>
                <Dia>{registro.time} {registro.desc}</Dia>
                <Valor>{registro.valor}</Valor>
                </Registro>)}
                <Total><div>Saldo</div> <div>{total}</div></Total>
            </div>
        </Corpo>
        <Bottom>
        <Link to={"/entrada"}><div>
                <Bola> + </Bola>
                <p>Nova entrada</p>
            </div></Link>
            <Link to={"/saida"}><div>
                <Bola> - </Bola>
                <p>Nova saida</p>
            </div></Link>
        </Bottom>
        </>
        
        
        
    );
}

const Topo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
`;

const Total = styled.div`
display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 19px;
color: #000000;
margin-top: 160%;
`;

const Registro = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 10px;
    
`;

const Dia = styled.div`
display: flex;
flex-direction: row;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const Valor = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
color: #C70000;
`;

const Corpo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    background: #FFFFFF;
    border-radius: 5px;
    min-height: calc(80vh - 100px);
    padding: 15px;

    p{
        align-items: center;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #868686;
    }
`;

const Bola = styled.p`
display: flex;
align-items: center;
justify-content: center;
width: 21px;
height: auto;
border-width: 2px;
border-radius: 20px;
border-style: solid;

`;

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 20px;
    div{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
         
        padding: 10px;
        background: #A328D6;
        border-radius: 5px;
        width: 156px;
        height: 114px;
        
        color: #FFFFFF;
    }
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        
    }
`;
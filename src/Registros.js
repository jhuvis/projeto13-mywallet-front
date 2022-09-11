import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from './UserContext';
import sai from './sai.png';
import bola from './bola.png';
import { Link } from 'react-router-dom';


export default function Registros()
{
    const [dados, setDados] = useContext(UserContext);

    let token = localStorage.getItem("token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    

    const [nao, setNao] = useState("Não há registros de entrada ou saída");
    const [registros, setRegistros] = useState([]);
    const [none, setNone] = useState("none");

    

    return(
        
        <>
        <Topo>
            <div>
                <p>Olá, Fulano</p>
            </div>
            <div>
                <img src={sai}/>
            </div>
        </Topo>
        <Corpo>
            <div>
                {nao}
            </div>
        </Corpo>
        <Bottom>
        <Link to={"/entrada"}><div>
                <img src={bola}></img>
                <p>Nova entrada</p>
            </div></Link>
            <Link to={"/saida"}><div>
                <img src={bola}></img>
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

const Corpo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    background: #FFFFFF;
    border-radius: 5px;
    min-height: calc(80vh - 100px);

font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;

color: #868686;
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import styled from 'styled-components';
import Login from './Login'
import Signin from "./Signin";
import UserContext from './UserContext';
import Registros from "./Registros";
import Entrada from "./Entrada";
import Saida from "./Saida";

export default function App() {

    const [dados, setDados] = useState({});

    
    return (
        <UserContext.Provider value={[dados, setDados]}>
            <Body>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastro" element={<Signin />} />
                    <Route path="/registros" element={<Registros />} />
                    <Route path="/entrada" element={<Entrada />} />
                    <Route path="/saida" element={<Saida />} />
                </Routes>
            </BrowserRouter>
            </Body>
        </UserContext.Provider>
    );
  }

  const Body = styled.div`
    display: flex;
    flex-direction: column;
    background: #8C11BE;
    -webkit-box-pack: start;
    width: 100%;
    min-height: calc(100vh);
`;
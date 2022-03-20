import { HashRouter, Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Main from './routes/Main';

const ParentsWrapper = styled.div`
    width : 100%;
    height : 100vh;
`

const ChildWrapper = styled.div`
    width : 100%;
    height : 100vh;
    display : flex;
    flex-direction: row;
    overflow-x: hidden;
    overflow-y: hidden;
`

function Router() {
    return (
        <HashRouter>
        <ParentsWrapper>
            <ChildWrapper>
                <Coins/>
                <Routes>
                    <Route path="/" element={<Main/>}></Route>
                    <Route path="/:coinID/*" element={<Coin/>}></Route>
                </Routes>
            </ChildWrapper>
        </ParentsWrapper>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        </HashRouter>
    )
}

export default Router;
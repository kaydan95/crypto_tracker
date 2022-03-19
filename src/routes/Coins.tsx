import React, { useEffect, useState } from 'react'
import { useLocation, Link, useMatch} from 'react-router-dom';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { theme } from '../theme';


const Container = styled.div`
    padding : 0px 20px;
    width : 20%;
    margin: 0;
    /* border: 1px solid white; */
    overflow-y: scroll;
    padding : 10px;
    &::-webkit-scrollbar {
        display: none;
    }
`

// const Header = styled.header`
//     height: 10vh;
//     display : flex;
//     justify-content: center;
//     align-items: center;
// `

const CoinList = styled.ul`
    width : 100%;
`

const Coin = styled.li<{isActive : boolean}>`
    background-color: ${props => props.isActive ? "#273c75" : "white"};
    color : ${props => props.isActive ? "#fbc531" : "#2f3640"};
    border-radius: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    a{
        display : flex;
        align-items: center;
        padding : 1.25em;
        font-size : 1em;
        font-weight : ${props => props.isActive ? 800 : 400};
        font-family: 'Play', sans-serif;
        transition: color 0.1s ease-in;

        @media only screen and (max-width : 890px) {
            padding : 0.625em;
            font-size : 0.5em;
            text-align: center;
            font-weight : 700;
        }
    }
    &:hover {
        background-color: ${props => props.theme.accentColor};
        a{
            color : ${props => props.theme.titleColor};
            font-weight: 800;
        }
    }

    @media only screen and (max-width : 890px) {
        font-size: 18px;
    }
`

const Loader = styled.span`
    font-size: 28px;
    color: ${props => props.theme.titleColor};
    font-weight : bold;
    text-align: center;
    display: block;

    @media only screen and (max-width : 890px) {
        font-size: 18px;
    }
`

const Img = styled.img`
    width : 1.563em;
    height : 1.563em;
    margin-right: 0.625em;

    @media only screen and (max-width : 890px) {
        width : 0px;
        height : 0px;
        margin : 0px;
    }
`

// interface

interface ICoins {
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string
}

function Coins() {

    const {isLoading, data} = useQuery<ICoins[]>("allCoins", fetchCoins);

    const coinMatch = useMatch('/:coinID');

    const coinId = coinMatch?.params.coinID;

    return (
        <Container>
            <Helmet>
                <title>Coins Tracker</title>
            </Helmet>
            {isLoading ? ( <Loader>"Loading..." </Loader>) : (
                <CoinList>
                {data?.slice(0,50).map(coin =>(
                    <Coin key={coin.id} isActive={coin.id === coinId}>
                        <Link 
                            to={`/${coin.id}`}
                            state = {{name : coin.name, rank : coin.rank}}
                        >
                            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
                            {coin.name}
                        </Link>
                    </Coin> 
                ))}
                </CoinList>
            )}
        </Container>
    )
}

export default Coins
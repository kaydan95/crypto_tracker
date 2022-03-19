import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';


const MainWrapper = styled.div`
    width : 100%;
    height : 100%;
    background-color: ${props => props.theme.bgColor};
    display : flex;
    justify-content: center;
    align-items: center;
    /* border : 1px solid red; */

    @media only screen and (max-width : 890px) {
        width : 80%;
    }

`

const MainTitle = styled.h1`
    display : flex;
    flex-direction : column;
    font-weight : 800;
    font-size : 11rem;
    text-align: center;
    padding-right: 20px;
    font-family: 'Play', sans-serif;
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    opacity: 0.9;
    color : ${props => props.theme.titleColor};

    @media only screen and (max-width : 500px) {
        font-size : 2rem;
    }
    @media only screen and (max-width : 890px) {
        font-size : 9rem;
    }
`

const Title = styled.div`
    span {
        text-transform: uppercase;
        color : whitesmoke;
        font-weight:100;
        letter-spacing: 10px;
        font-family: 'Play', sans-serif;
    }

`

function Main() {

    const cryptoArray = "000000".split("");
    const trackerArray = "0000000".split("");

    const [crypto, setCrypto] = useState(cryptoArray);

    const [tracker, setTracker] = useState(trackerArray);


    const setMotion = () => {

        const cryptoArr = "CRYPTO".split("");
        const trackerArr = "TRACKER".split("");

        var cryptoChanging = setInterval(() => {

            if(JSON.stringify(crypto) !== JSON.stringify(cryptoArr) || JSON.stringify(tracker) !== JSON.stringify(trackerArr)){


                for (let i=0; i<crypto.length; i++){ //갱신

                    if(crypto[i] === cryptoArr[i]){
                        continue;
                    }
                    if(crypto[i] !== cryptoArr[i]) {
                        if(crypto[i] === i.toString()){
                            crypto[i] = cryptoArr[i];
                            setCrypto([crypto[i]]);
                        }
                        else {
                            crypto[i] = Math.floor(Math.random() * 9).toLocaleString();
                            setCrypto([crypto[i]]);
                        }
                        continue;
                    }
                }

                for (let j=0; j<tracker.length; j++){ //갱신

                    if(tracker[j] === trackerArr[j]){
                        continue;
                    }
                    if(tracker[j] !== trackerArr[j]) {
                        if(tracker[j] === j.toString()){
                            tracker[j] = trackerArr[j];
                            setTracker([tracker[j]]);
                        }
                        else {
                            tracker[j] = Math.floor(Math.random() * 9).toLocaleString();
                            setTracker([tracker[j]]);
                        }
                        continue;
                    }
                }

                const forReturn = (crypto:string[],tracker:string[]) => {
                    const fCrypto = () => {
                        return setCrypto(crypto);
                    }
                    if(crypto !== undefined){
                        fCrypto();
                    }
                    return setTracker(tracker);
                }

                return forReturn(crypto,tracker);
            }

            if(JSON.stringify(crypto) === JSON.stringify(cryptoArr) && JSON.stringify(tracker) !== JSON.stringify(trackerArr)){
                clearInterval(cryptoChanging);
            }

            // else console.log(false);

        }, 5/1000);

    }



    useEffect(() => {
        setMotion();

    }, []);

    return (
        <MainWrapper>
            <Helmet>
                <title>CRYPTO TRACKER</title>
                <link href="https://fonts.googleapis.com/css2?family=Hubballi&family=Exo+2:wght@400;500;600;700&family=Play:wght@400;700&family=Zen+Kurenaido&display=swap" rel="stylesheet"/>
            </Helmet>
            <MainTitle>
                <Title>
                    <>{crypto.map((cTypo,cIndex) => <span key ={cIndex}>{cTypo}</span>)}</>
                </Title>
                <Title>
                    <>{tracker.map((tTypo,tIndex) => <span key ={tIndex}>{tTypo}</span>)}</>
                </Title>

            </MainTitle>
        </MainWrapper>
        
    )
}

export default Main
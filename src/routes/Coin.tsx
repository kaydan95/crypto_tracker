import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from '../api'
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router';
import Chart from './Chart';
import { info } from 'console';

// styled Components
const CoinWrapper = styled.div`
    width : 100%;
    height : 100%;
    /* border : 1px solid red; */
    padding : 10px 10px 10px 0px;

    @media only screen and (max-width : 890px) {
        width : 80%;
    }
`

const Loader = styled.p`
    font-size: 6em;
    display : flex;
    justify-content: center;
    align-items: center;
    font-weight : 800;
    color : ${props => props.theme.titleColor};
    @media only screen and (max-width : 890px) {
        font-size: 3em;
    }
`

const CoinContainer = styled.div`
    width : 100%;
    height : 100%;
    border-radius : 10px;
    display : flex;
    flex-direction: column;
    overflow-y: scroll;
    padding : 20px;
    background-color: white;

    @media only screen and (max-width : 500px) {
        width : fit-content;
    }
`

const TitleSection = styled.div`
    width : 100%;
    display : flex;
    flex-direction: row;
    /* align-items : center; */
    padding : 10px 10px 0px 10px;
    /* border : 1px solid red; */
`

const CoinImg = styled.img`
    width: 50px;
    height : 50px;
    margin: 10px;
    vertical-align: text-bottom;
    /* border : 1px solid red; */

    @media only screen and (max-width : 500px) {
        width: 30px;
        height : 30px;
    }
    @media only screen and (max-width : 890px) {
        width: 40px;
        height : 40px;
    }
`

const TagContainer = styled.div`
    /* border : 1px solid red; */
    display : inline-flex;
    align-items: center;
    height : 100%;
`

const Title = styled.span`
    align-items: flex-end;
    font-size : 4em;
    margin-right: 10px;
    color : ${props => props.theme.bgColor};
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
    font-weight : 800;
    font-family: 'Exo 2', sans-serif;


    @media only screen and (max-width : 500px) {
        font-size : 1.5em;
        margin-right : 5px;
    }
    @media only screen and (max-width : 890px) {
        font-size : 3.5em;
    }
`

const Tag = styled.span`
    /* border : 1px solid red; */
    border-radius: 8px;
    padding : 4px 9px;
    font-weight : bold;
    font-size: 13px;
    margin : 0px 3px 0px 0px;
    background-color: ${props => props.theme.accentColor};

    @media only screen and (max-width : 500px) {
        font-size: 13px;
    }
`

const WhiteTag = styled(Tag)`
    background-color : white;
    color : ${props => props.theme.accentColor};
    border : 1px solid ${props => props.theme.accentColor};
`


const BodySection = styled.div`
    width : 100%;
    display : inline-flex;
    padding: 1.250em;
    /* border : 1px solid black; */

    @media only screen and (max-width : 890px) {
        display : flex;
        flex-direction : column;
        padding: 10px;
    }
`

const ChartBox = styled.div`
    height : fit-content;
    /* border : 1px solid ${props => props.theme.accentColor}; */
    width : 50%;
    margin-right : 20px;
    border-radius: 10px;
    display : flex;
    flex-direction: column;
    color : ${props => props.theme.bgColor};
    font-weight : 600;
    box-shadow : 5px 5px 10px rgba(0, 0, 0, 0.15);
    font-size : 1.125em;
    padding: 1.250em;

    @media only screen and (max-width : 890px) {
        width : 100%;
        margin-bottom : 20px;
    }
`

const PriceSection = styled.div`
    width: 50%;
    height : fit-content;
    border-radius: 8px;
    padding: 1.250em;
    display: flex;
    flex-direction : column;
    box-shadow : 5px 5px 10px rgba(0, 0, 0, 0.15);
    /* border : 1.2px solid ${props => props.theme.accentColor}; */


    @media only screen and (max-width : 890px) {
        width : 100%;
    }
`

const PriceInfoBox = styled.div`
    display : flex;
    flex-direction: column;
    span {
        font-size:1.125em;
        font-weight: 800;
        color: ${props => props.theme.accentColor};
        letter-spacing: 0.3px;
        margin : 10px 0px 15px 5px;
    }
`

const PriceStatusBox = styled.div<IPercentProps>`
    margin-top : 5px;
    padding-bottom : 8px;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color : ${props => props.isUpOrNot ? props.theme.upColor : props.theme.downColor};
    span {
        margin : 5px 5px 0px 0px;
        font-size: 1.250em;
        font-weight: 700;
        color : ${props => props.isUpOrNot ? props.theme.upColor : props.theme.downColor};
    }
    h1 {
        font-size: 2.188em;
        font-weight: 800;
    }
`

const PricePercentageBox = styled.div<IPercentProps>`
    display: flex;
    align-items: baseline;
    margin : 7px 5px 8px 8px;
    border-radius : 8px;
    padding : 2px 8px;
    background-color: ${(props) => props.isUpOrNot ? props.theme.upColor : props.theme.downColor} ;
    color : white;
    span {
        font-size: 0.938em;
        font-weight: 700;
        color : white;
    }
    p {
        font-size: 1.125em;
        font-weight: 800;
    }
`

const PriceInfoGridBox = styled.div`
    width : 100%;
    display : grid;
    grid-template-rows: repeat(3, 1fr);
`

const GridBox = styled.div`
    display : flex;
    padding : 0.938em;
    justify-content: space-around;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:last-child {
        border : none;
    }
`

const GridBoxItem = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    font-weight : 700;
    font-size : 1.125em;
    color : ${props => props.theme.bgColor};
    span:first-child {
        font-size: 1.063em;
        font-weight: 800;
        opacity : 0.9;
        margin-bottom: 15px;
        color : ${props => props.theme.accentColor};
    }
`


// interface

interface RouteState {
    name : string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface priceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface IPercentProps {
    isUpOrNot: boolean;
}


function Coin() {

    const { coinID } = useParams();

    const location = useLocation();

    const state = location.state as RouteState;

    const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info", coinID], ()=> fetchCoinInfo(coinID!));
    
    // console.log(infoData);

    const {isLoading:tickersLoading, data:tickersData} = useQuery<priceData>(
        ["tickers", coinID],
        ()=> fetchCoinTickers(coinID!),
        {
            refetchInterval : 3000,
        }
    );

    const des = infoData?.description;

    const loading = infoLoading || tickersLoading;

    const isUpOrNot = tickersData?.quotes.USD.percent_change_24h ? tickersData?.quotes.USD.percent_change_24h > 0 : false;

    return (
        <CoinWrapper>
            <Helmet>
                <title>{state?.name}</title>
            </Helmet>
            {loading ? ( <Loader> "Loading..." </Loader> ) : (
                <>
                    <CoinContainer>
                        <TitleSection>
                            <CoinImg src={`https://cryptoicon-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} ></CoinImg>
                            <TagContainer>
                                <Title>{infoData?.name}</Title>
                                <WhiteTag>{infoData?.symbol}</WhiteTag>
                                <Tag>Rank #{infoData?.rank}</Tag>
                                <Tag>{infoData?.first_data_at.slice(0,10)}</Tag>
                            </TagContainer>
                        </TitleSection>
                        <BodySection>
                            <ChartBox>
                                <p>{des === null || des === "" ? "There's no description about this coin" : `${infoData?.description.slice(0,415)}...`}</p>
                                <Chart coinID={coinID!} />
                            </ChartBox>
                            <PriceSection>
                                <PriceInfoBox>
                                    <span>Price ( Last Updated at : {tickersData?.last_updated.slice(0,10)} )</span>
                                    <PriceStatusBox isUpOrNot={isUpOrNot}>
                                        <span>{ isUpOrNot? "▲" : "▼"}</span>
                                        <h1>${tickersData?.quotes.USD.price.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{" "}</h1>
                                        <PricePercentageBox isUpOrNot={isUpOrNot}>
                                            <span>{ isUpOrNot? "▲" : "▼"}</span>
                                            <p>{isUpOrNot ? tickersData!.quotes.USD.percent_change_24h.toFixed(1).toString() : tickersData!.quotes.USD.percent_change_24h.toFixed(1).toString().replace("-", "")}%</p>
                                        </PricePercentageBox>
                                    </PriceStatusBox>
                                </PriceInfoBox>
                                <PriceInfoGridBox>
                                    <GridBox>
                                        <GridBoxItem>
                                            <span>market_cap</span>
                                            <span>${tickersData?.quotes.USD.market_cap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </GridBoxItem>
                                        <GridBoxItem>
                                            <span>change (24H)</span>
                                            <span>${tickersData?.quotes.USD.market_cap_change_24h.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%</span>
                                        </GridBoxItem>
                                    </GridBox>
                                    <GridBox>
                                        <GridBoxItem>
                                            <span>volume (24h)</span>
                                            <span>${tickersData?.quotes.USD.volume_24h.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </GridBoxItem>
                                        <GridBoxItem>
                                            <span>change (24H)</span>
                                            <span>${tickersData?.quotes.USD.volume_24h_change_24h.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%</span>
                                        </GridBoxItem>
                                    </GridBox>
                                    <GridBox>
                                        <GridBoxItem>
                                            <span>total_supply</span>
                                            <span>${tickersData?.total_supply.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </GridBoxItem>
                                        <GridBoxItem>
                                            <span>max_supply</span>
                                            <span>${tickersData?.max_supply.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </GridBoxItem>
                                    </GridBox>
                                </PriceInfoGridBox>
                            </PriceSection>
                        </BodySection>

                    </CoinContainer>
                </>
            )}
        </CoinWrapper>
    )
}

export default Coin
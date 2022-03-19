import React from 'react'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';

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

interface PriceProps {
    coinID : string;
}

const Overview = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.accentColor};
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: inline-block;
    margin : 5px 0px;
    span:first-child {
        font-size: 14px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
        color : ${props => props.theme.titleColor};
    }
`;

function Price({coinID} : PriceProps) {

    const {isLoading:tickersLoading, data:tickersData} = useQuery<priceData>(["tickers", coinID], ()=> fetchCoinTickers(coinID!));

    const USD_price = tickersData?.quotes.USD;

    console.log(USD_price);


    return (
        <Overview>
            {tickersLoading ? ("Loading...") : 
            (
                <>
                    <OverviewItem>
                        <span>시세 : </span>
                        <span>{ Number(USD_price?.price.toFixed(1)).toLocaleString() }</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>지난 24시간 거래량 : </span>
                        <span>{ USD_price?.volume_24h.toFixed(2) } T</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>지난 24시간 거래 변동률 : </span>
                        <span>{USD_price?.volume_24h_change_24h.toFixed(2)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>시총 : </span>
                        <span>{USD_price?.market_cap.toFixed(2)} T</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>시총 가격 변동률 (24h) : </span>
                        <span>{USD_price?.market_cap_change_24h.toFixed(2)} %</span>
                    </OverviewItem>
                </>
            )}
        </Overview>
    )
}

export default Price
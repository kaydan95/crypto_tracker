const URL = `https://api.coinpaprika.com/v1`
const URLBYNICO = `https://ohlcv-api.nomadcoders.workers.dev`

export function fetchCoins(){
    return fetch(`${URL}/coins`).then((response) =>
        response.json()
    );
}

export function fetchCoinInfo(coinID:string){
    return fetch(`${URL}/coins/${coinID}`).then((response) =>
        response.json()
    );
}

export function fetchCoinTickers(coinID:string){
    return fetch(`${URL}/tickers/${coinID}`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinID:string){
    return fetch(`${URLBYNICO}/?coinId=${coinID}`).then((response) =>
    response.json()
);
}
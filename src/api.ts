const URL = `https://api.coinpaprika.com/v1`

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
    const endDate = Math.floor( Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 23 * 7 * 1;
    return fetch(`${URL}/coins/${coinID}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) =>
    response.json()
);
}
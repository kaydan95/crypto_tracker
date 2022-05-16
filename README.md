# :chart: Crypto Tracker [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

<img src="https://user-images.githubusercontent.com/85853145/163525787-11002270-a495-4f37-9f89-3e6034a98c1c.gif" width="1000" height="500">

## Summary / 요약

- **목적** : NomadCoders React강의 일부 및 다양한 라이브러리 연습
- **라이브러리 종류** : react-query / styled-components / react-helmet / react-apexcharts / react-router
- **메인 개발 환경** : React / Typescript / JavaScript
- **Data Api** : [coinpaprika](https://api.coinpaprika.com/)
- **배포** : [Crypto Tracker](https://kaydan95.github.io/crypto_tracker/)


## For Start / 시작하기 전에
    npm install react-router-dom@6
    npm install --save styled-components
    npm i -D @types/styled-components
    npm install react-query
    npm install react-helmet
    npm install react-apexcharts

## Features / 특징..?

### 커스텀! :upside_down_face:

#### 1. 메인화면!!
- 메인화면이 필요하다고 느꼈다. 처음 들어오자마자 코인 시장 현황이 뜨는건 좀 그래서. 그러다가 문득 숫자가 촤르르륵 돌다가 글자로 변하는 효과를 구현해보고 싶었다. 이미 jquery를 이용해 구현해놓은게 있었지만...나는 리액트..타입스크립트로 구현해야했기에 최대한 `useState()` 와  `setInterval()` 기능을 활용해서 만들어봤다. 결론적으로 구현에 성공하긴 했지만 string 과 number 의 형변환을 거쳐가면서 하다보니 :face_with_spiral_eyes:
- 구현 과정 및 코드   
1. 먼저 CRYPTO 라는 문자열의 기본값 선언하고 이를 `useState()` 을 이용해서 초기값으로 세팅해준다.

```typescript
const cryptoArray = "000000".split("");
const trackerArray = "0000000".split("");

const [crypto, setCrypto] = useState(cryptoArray);
const [tracker, setTracker] = useState(trackerArray);
```
2. 다음으로 `useEffect()`를 이용해 기능을 구현할 함수를 `setMotion`이라는 이름으로 정의, 이하 기능을 구현한다.   
 
📌 POINT!
- "000000"의 각 여섯자리 글자들은 각각 랜덤한 숫자로 계속 바뀌다가 어느순간 한자리씩 C,R,Y,P,T,O 의 글자들로 바뀌어야한다.
- 그 '어느순간'의 포인트는 해당 글자가 0-9까지 숫자로 랜덤하게 돌다가 해당 자리의 인덱스 숫자와 같아질때!
- 즉 처음 [000000] 의 배열값이 다음과 같은 순서대로 바뀌는 것! [0,0,0,0,0,0] -> [3,4,8,3,6,1] -> [0,4,6,0,9,8] -> [C,2,7,8,0,8] 
- 이미 C,R,Y,P,T,O 중 하나 값으로 바뀌었다면 그 부분은 건너뛰고 나머지 자리를 탐색하도록 했다.
- 그리고 모든 글자가 바뀌어 CRYPTO가 완성되면 최종적으로 반환한다. TRACKER 문구도 똑같은 원리..!

```typescript
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

    }, 5/1000);
}
```
3. 화면이 최초 렌더링 될 때 실행되어야하므로 `useEffect()` 를 이용해 해당 함수를 실행시킨다.

```typescirpt
useEffect(() => {
    setMotion();
}, []);
```

#### 2. CoinList를 사이드로 배치
- 챌린지 내용 중에는 뒤로가기 버튼을 구현해라고 했지만 그냥 CoinList 를 사이드 메뉴로 나타나게끔 해서 클릭 한번으로 여러 코인 시장 정보를 한번에 볼 수 있도록 했다. 개인적으로 이렇게 하는 방식이 더 깔끔해보이고 가독성도 좋다고 생각했기 때문..!

#### 3. 주식 알못의 Data 단위 및 % 정리하기
- 각종 거래량과 변동 퍼센트를 다음과 같은 방식으로 다 정리해줬다..! `replace(/\B(?=(\d{3})+(?!\d))/g, ',')` 부분은 구글링해서 찾아봤는데 성공..!
```typescript
<GridBoxItem>
    <span>change (24H)</span>
    <span>${tickersData?.quotes.USD.market_cap_change_24h.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%</span>
</GridBoxItem>
```

#### 4. (조금) 반응형
- styled-components 를 이용해서는 한번도 해보지 않았는데 좋은 기회겠다 싶어서 조금씩 해봤다. 아직은 조금 어렵지만...그래도 반응형으로는 완성..!


## Github Page 로 배포 :exploding_head: -> :relieved:
- 이번에도 배포에 도전..! 했지만 깃허브 페이지에 계속 배포가 실패했다. 어떤게 잘못된건가 구글링을 해보다 결국 react-router 부분을 HashRouter 로 수정해주고 나니 제대로 배포가 됐다..! 

```typescript
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
        </HashRouter>
    )
}
```



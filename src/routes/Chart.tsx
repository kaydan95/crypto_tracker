import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ReactApexChart from "react-apexcharts";
import styled from 'styled-components';

type IHistoricalData = {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
interface ChartProps {
    coinID : string;
}

const ChartWrapper = styled.div`
  width : 100%;
  height : fit-content;
` 

function Chart({coinID}:ChartProps) {
    const {isLoading, data:priceData} = useQuery<IHistoricalData[]>(
      ["ohlcv", coinID],
      () => fetchCoinHistory(coinID),
      {
        refetchInterval : 3000,
      }
    );

    function convertDate(milliSecond : number) {
      const data = new Date(milliSecond);  //Date객체 생성

      const year = data.getFullYear();    //0000년 가져오기
      const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
      const date = data.getDate();        //일자 가져오기
      const minutes = data.getMinutes();
      const seconds = data.getSeconds();
  
      return `${date}/${minutes}/${seconds}`;
    }

    return (
      <>
        {isLoading ? ("Loading chart...") : (
          <>
            <ReactApexChart 
                type="candlestick"
                series={[
                  {
                    data : priceData?.map((price) => {
                      return {
                        x : [convertDate(price.time_close)],
                        y : [(+price.open).toFixed(), (+price.high).toFixed(), (+price.low).toFixed(), (+price.close).toFixed()],
                      }
                    }) ?? []
                  },
                ]}
                options={{
                  chart: {
                    height: 350,
                    type : "candlestick",
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                  },
                  grid: { show: false },
                  stroke: {
                    curve: "smooth",
                    width: 2,
                  },
                  yaxis: {
                    show: false,
                  },
                  // xaxis: {
                  //   type : "datetime",
                  //   categories : priceData?.map(price => price.time_close),
                  //   labels: { 
                  //     style : {
                  //       colors : "#white"
                  //     }
                  //   },
                  // },
                  plotOptions : {
                    candlestick : {
                      colors : {
                        upward : "#44bd32",
                        downward : "#c23616"
                      },
                      wick : {
                        useFillColor : true
                      }
                    }
                  },
                }}
            
            />
          </>
        ) 
        }
      </>
    )
}

export default Chart
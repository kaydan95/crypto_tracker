import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ReactApexChart from "react-apexcharts";
import styled from 'styled-components';

type IHistoricalData = {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
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
                        x : price.time_close.slice(2,10),
                        y : [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
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
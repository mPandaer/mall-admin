import React, {useEffect, useState} from "react";
import {getMarketReportData, getTrafficData} from "@/services/report/report";
import {Column, Pie} from "@ant-design/plots";
import styles from "./style.less";

interface ColumItem {
  date:string;
  sum:number;
}


const MarketReport = () => {
  const [data,setData] = useState<ColumItem[]>([])
  const config = {
    xField: 'date',
    yField: 'sum',
    slider: {
      x: {
        values: [0.1, 0.2],
      },
    },
  };
  useEffect(() => {
    const fetchMarketData = async () => {
      const resp = await getTrafficData()
      if (resp.message === "Success") {
        setData(resp.data);
      }
    }
    fetchMarketData();
  }, []);

  return (
    <>
      {
        data.length > 0 &&  <Column {...config}  data={data}/>
      }
    </>


  );
}

export default MarketReport;

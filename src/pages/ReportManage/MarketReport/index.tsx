import React, {useEffect, useState} from "react";
import {getMarketReportData} from "@/services/report/report";
import {Pie} from "@ant-design/plots";
import styles from "./style.less";

interface PieItem {
  type:string;
  value:number;
}


const MarketReport = () => {
  const [data,setData] = useState<PieItem[]>([])
  const config = {
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      text: (d:PieItem) => `${d.type}\n ${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  useEffect(() => {
    const fetchMarketData = async () => {
      const resp = await getMarketReportData()
      if (resp.message === "Success") {
        setData(resp.data);
      }
    }
    fetchMarketData();
  }, []);

  return (
    <>
      {
        data.length > 0 &&  <Pie {...config} data={data} />
      }
    </>


  );
}

export default MarketReport;

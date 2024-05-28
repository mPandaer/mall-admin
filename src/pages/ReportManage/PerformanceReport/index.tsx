import React, {useEffect, useState} from "react";
import {getMarketReportData, getPerformanceData} from "@/services/report/report";
import {Pie} from "@ant-design/plots";
import styles from "./style.less";

interface PieItem {
  type:string;
  value:number;
}


const PerformanceReport = () => {
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
        rowPadding: 8,
      },
    },
  };
  useEffect(() => {
    const fetchPerformanceData = async () => {
      const resp = await getPerformanceData()
      if (resp.message === "Success") {
        setData(resp.data);
      }
    }
    fetchPerformanceData();
  }, []);
  return (
    <>
      {data.length > 0 && <Pie {...config} data={data} containerStyle={{marginTop:32}}/>}
    </>

  );
}

export default PerformanceReport;

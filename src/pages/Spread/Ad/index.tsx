import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Image, message} from "antd";
import {addAd, batchDeleteAd, pageQueryAd, updateAd} from "@/services/spread/AD";
import { PlusOutlined } from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";
import {DeleteOutline} from "antd-mobile-icons";
import EditForm from "@/pages/Spread/Ad/components/EditForm";


/**
 * 广告表格组件
 * @constructor
 */
const AdTable = () => {

  const [addDisplay,setAddDisplay] = useState<boolean>(false);
  const ref = useRef<ActionType>();
  const [currentRow,setCurrentRow] = useState<API.ADVO>({});
  const [selectRows, setSelectRows] = useState<API.ADVO[]>([]);


  //列定义
  const columns: ProColumns<API.ADVO>[] = [
    {
      title:"广告ID",
      dataIndex: 'adId',
      valueType: 'textarea',
    },
    {
      title:"公司名",
      dataIndex: 'companyName',
      valueType: 'textarea',
    },
    {
      title:"广告费用",
      dataIndex: 'adCost',
      valueType: 'money',
      search:false
    },
    {
      title:"截止时间",
      dataIndex: 'adValidTime',
      valueType: 'dateTime',
      width:200,
    },
    {
      title:"广告链接",
      dataIndex: 'adUrl',
      valueType: 'textarea',
    },
    {
      title:"广告图片",
      dataIndex: 'adImgUrl',
      search:false,
      render: (_,record) => (<Image src={record.adImgUrl} width={80}></Image>)
    },
    {
      title:"操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_,record) => (
        <>
          <Button type={"link"} onClick={() => {
            console.log("点击了编辑",record);
            setCurrentRow(record);
            setAddDisplay(true)
          }}>编辑</Button>
        </>
      )
    },
  ];



  useEffect(() => {
    if (!addDisplay) {
      ref.current?.reload();
    }
  }, [addDisplay]);

  return (
    <>
      <ProTable
        columns={columns}
        cardBordered
        actionRef={ref}
        rowKey={"adId"}
        request={async (params, sort, filter) => {
          const resp = await pageQueryAd({currentPage:String(params.current),pageSize:String(params.pageSize)});
          let data = resp.data?.records?.filter(item => {
            if (params.adId && item.adId !== params.adId) {
              return false;
            }
            if (params.companyName && !item.companyName?.includes(params.companyName)) {
              return false;
            }

            if (params.adUrl && !item.adUrl?.includes(params.adUrl)) {
              return false;
            }

            if (params.adValidTime && new Date(item.adValidTime ?? "") > new Date(params.adValidTime) ) {
              return false;
            }
            console.log("success",item);
            return true;
          })
          return {data: data, success:true};
        }}
        toolBarRender={() => [
          <Button key={"add"} type={"primary"} icon={<PlusOutlined />} onClick={() => {setAddDisplay(true)}}>新建</Button>,
          <Button key={"add"} type={"primary"} icon={<DeleteOutline />} onClick={async () => {
            const idList = selectRows.map(item => item.adId).join(",");
            const resp = await batchDeleteAd({idList:idList})
            if (resp.message === "Success") {
              message.success("删除成功");
              setSelectRows([])
              ref.current?.reloadAndRest?.();
            }
          }} disabled={selectRows.length <= 0}>批量删除</Button>
        ]}
      rowSelection={{
        onChange: (_,rows) => {
          setSelectRows(rows);
        }
      }}

      >
      </ProTable>

      <EditForm display={addDisplay} setDisplay={setAddDisplay} onFinish={
        async (values) => {
          if (typeof (values as API.UpdateADPO).adId === "undefined") {
            const resp = await addAd(values as API.AddADPO);
            if (resp.message === "Success") {
              message.success("添加成功");
              setAddDisplay(false)
              setCurrentRow({})
            }
            return
          }

          const resp = await updateAd(values as API.UpdateADPO);
          if (resp.message === "Success") {
            message.success("更新成功");
            setAddDisplay(false)
            setCurrentRow({})
          }
        }
      } onCancel={() => {
        setAddDisplay(false)
        setCurrentRow({})
      }}
      initialValues={currentRow}
      />
    </>

  )
}

export default AdTable;

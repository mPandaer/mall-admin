import {useEffect, useRef, useState} from "react";
import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Image, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {DeleteOutline} from "antd-mobile-icons";
import {addLink, batchDeleteLink, pageQueryLink, updateLink} from "@/services/spread/FriendLink";
import EditForm from "./components/EditForm";


const FriendLinkTable = () => {
  const [addDisplay, setAddDisplay] = useState<boolean>(false);
  const ref = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.FriendLinkVO>({});
  const [selectRows, setSelectRows] = useState<API.FriendLinkVO[]>([]);

  //列定义
  const columns: ProColumns<API.FriendLinkVO>[] = [
    {
      title: "链接ID",
      dataIndex: 'linkId',
      valueType: 'textarea',
    },
    {
      title: "链接名字",
      dataIndex: 'linkName',
      valueType: 'textarea',
    },
    {
      title: "友情链接",
      dataIndex: 'linkUrl',
      valueType: 'money',
      search: false
    },
    {
      title: "链接图片",
      dataIndex: 'linkImgUrl',
      search: false,
      render: (_, record) => (<Image src={record.linkImgUrl} width={80}></Image>)
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type={"link"} onClick={() => {
            console.log("点击了编辑", record);
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
          const resp = await pageQueryLink({currentPage: String(params.current), pageSize: String(params.pageSize)});
          let data = resp.data?.records?.filter(item => {
            if (params.linkId && item.linkId !== params.linkId) {
              return false;
            }
            if (params.linkName && !item.linkName?.includes(params.linkName)) {
              return false;
            }

            if (params.linkUrl && !item.linkUrl?.includes(params.linkUrl)) {
              return false;
            }
            return true;
          })
          return {data: data, success: true};
        }}
        toolBarRender={() => [
          <Button key={"add"} type={"primary"} icon={<PlusOutlined/>} onClick={() => {
            setAddDisplay(true)
          }}>新建</Button>,
          <Button key={"add"} type={"primary"} icon={<DeleteOutline/>} onClick={async () => {
            const idList = selectRows.map(item => item.linkId).join(",");
            const resp = await batchDeleteLink({idList: idList})
            if (resp.message === "Success") {
              message.success("删除成功");
              setSelectRows([])
              ref.current?.reloadAndRest?.();
            }
          }} disabled={selectRows.length <= 0}>批量删除</Button>
        ]}
        rowSelection={{
          onChange: (_, rows) => {
            setSelectRows(rows);
          }
        }}

      >
      </ProTable>

      <EditForm
        display={addDisplay}
        setDisplay={setAddDisplay}
        onFinish={
          async (values) => {
            if (typeof (values as API.UpdateFriendLinkPO).linkId === "undefined") {
              const resp = await addLink(values as API.AddFriendLinkPO);
              if (resp.message === "Success") {
                message.success("添加成功");
                setAddDisplay(false)
                setCurrentRow({})
              }
              return;
            }
            const resp = await updateLink(values as API.UpdateFriendLinkPO);
            if (resp.message === "Success") {
              message.success("更新成功");
              setAddDisplay(false)
              setCurrentRow({})
            }

          }
        }
        onCancel={() => {
          setAddDisplay(false)
          setCurrentRow({})
        }}
        initialValues={currentRow}
      />
    </>

  )

}


export default FriendLinkTable;

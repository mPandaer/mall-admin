import {ActionType, DrawerForm, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Drawer, message} from 'antd';
import {flowOrderStatus, getOrderDetailById, pageQueryOrder} from "@/services/order/Order";
import OrderDetail from "@/pages/OrderManage/components/OrderDetail";
import {useRef, useState} from "react";


// 定义列
// @ts-ignore

const OrderTable = () => {
  const [currentRow,setCurrentRow] = useState<API.OrderVO>();
  const [currentOrderDetails,setCurrentOrderDetails] = useState<API.OrderDetailVO[]>([]);
  const [displayDetail, setDisplayDetail] = useState<boolean>(false);
  const ref = useRef<ActionType>();
  const handleOrderStatusFlow = async (record: API.OrderVO) => {
    const resp = await flowOrderStatus(record.orderId + "",record.orderStatus ?? -1)
    if (resp.message === "Success") {
      ref.current?.reload()
      message.success("成功")
    }
  }



  const columns: ProColumns<API.OrderVO>[] = [
    {
      title: '订单序号',
      key: "orderId",
      dataIndex: 'orderId',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      // @ts-ignore
      valueEnum: {
        0: {
          text: "待收货",
          status: 0,
        },
        1: {
          text: "运输中",
          status: 1,
        },
        2: {
          text: "交易完成",
          status: 2
        },
        3: {
          text: "申请退货",
          status: 3,
        },
        4: {
          text: "已退货",
          status: 4,
        },
        5: {
          text: "已取消",
          status: 5,
        }
      },
    },
    {
      title: '订单总金额',
      dataIndex: 'totalAmount',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '用户',
      dataIndex: 'user',
      valueType: 'textarea',
      render: (text, record) => record.user?.username
    },
    {
      title: '地址',
      dataIndex: 'address',
      valueType: 'textarea',
      render: (_, record) => {
        const detail = record.address?.address;
        const city = record.address?.city;
        const province = record.address?.province;
        return `${city} ${province} ${detail}`;
      },
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        (<Button type="link" key="detail" onClick={async () => {
          console.log("record",record)
          setCurrentRow(record);
          const resp = await getOrderDetailById({orderId: record.orderId ?? 0});
          setCurrentOrderDetails(resp.data ?? [])
          setDisplayDetail(true)
        }}>详情</Button>),
        (record.orderStatus === 0 && <Button type="link" onClick={() => handleOrderStatusFlow(record)}>发货</Button>),
        (record.orderStatus === 3 && <Button type="link" onClick={() => handleOrderStatusFlow(record)}>确认退款</Button>)
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.OrderVO>
        columns={columns}
        actionRef={ref}
        request={async (params, sort, filter) => {
          console.log(params)
          const queryObj: any = {};
          queryObj.pageSize = params.pageSize;
          queryObj.currentPage = params.current;
          if (typeof params.orderStatus !== 'undefined') {
            queryObj.orderStatus = params.orderStatus;
          }
          console.log("queryObj", queryObj)
          const resp = await pageQueryOrder(queryObj)
          return {
            data: resp.data?.records,
            success: true
          }
        }}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        rowKey="orderId"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        dateFormatter="string"
        headerTitle="订单列表"
      />

      <DrawerForm open={displayDetail} submitter={{
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }} onOpenChange={setDisplayDetail}>
        <OrderDetail order={currentRow ?? {}} orderDetails={currentOrderDetails}/>
      </DrawerForm>
    </div>

  );
}

export default OrderTable;

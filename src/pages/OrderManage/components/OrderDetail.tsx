
import {Card, Descriptions, Image, Space} from "antd";


type OrderDetailProps = {
  order: API.OrderVO,
  orderDetails:API.OrderDetailVO[]
}



const OrderDetail = ({order,orderDetails}:OrderDetailProps) => {
  const transToItems = (param: any): any[] => {
    const items: any[] = [];
    if (typeof param === "undefined") {
      return [];
    }
    Object.keys(param).forEach((key, index) => {
      const label = key;
      const children = param[key];
      const item = {
        key: (index + 1).toString(),
        label,
        children,
      };
      items.push(item);
    });
    console.log("param",param)

    return items;
  }
  return (
    <div>
      <Descriptions title={"用户信息"} items={[
        {key:1,label:'用户ID',children:order.user?.userId + ""},
        {key:2,label:'用户姓名',children:order.user?.username + ""},
        {key:3,label:'用户邮箱',children:order.user?.email + ""},
      ]}/>
      <Descriptions title={"订单信息"} items={[
        {key:1,label:'订单ID',children:order.orderId + ""},
        {key:2,label:'订单总金额',children:order.totalAmount + ""},
        {key:3,label:'订单创建时间',children:order.createTime + ""},
      ]}/>
      <Descriptions title={"地址信息"} items={[
        {key:1,label:'地址',children:order.address?.province + " " + order.address?.city + "" + order.address?.address + ""},
        {key:2,label:'收货人电话',children:order.address?.recipientPhone + ""},
        {key:3,label:'收货人姓名',children:order.address?.recipientName + ""},
      ]}/>
      {
        orderDetails.map((item: API.OrderDetailVO, index: number) => (
          <>
            <Descriptions key={item.detailId}  title={"商品信息"} items={[
              {key:1,label:'商品ID',children:item.product?.productId + " "},
              {key:2,label:'商品名',children:item.product?.name + " "},
              {key:3,label:'商品单价',children:item.product?.price + " "},
              {key:4,label:'购买数量',children:item.quantity + " "},
            ]}/>
            <Card>
              <div style={{marginBottom: 8}}>商品图片</div>
              <div style={{display: "flex"}}>
                {item.product?.detailImgUrls?.split(",").map((item,index) => {
                  return (
                    <li key={index} style={{marginLeft:16}}>
                      <Image key={index} src={item} height={80}></Image>
                    </li>

                  )
                })}
              </div>

            </Card>

          </>

        ))
      }

    </div>

  )
}

export default OrderDetail;

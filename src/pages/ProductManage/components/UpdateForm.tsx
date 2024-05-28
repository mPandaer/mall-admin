import {ModalForm, ProForm, ProFormDigit, ProFormMoney, ProFormSelect, ProFormText} from '@ant-design/pro-components';
import React, {useEffect, useState, useMemo} from 'react';
import {all as getAllType} from "@/services/product/ProductType";
import {all3 as getAllBrand} from "@/services/product/ProductBrand";
import {all2 as getAllColor} from "@/services/product/ProductColor";
import {all1 as getAllSize} from "@/services/product/ProductSize";
import {message, Upload} from "antd";
import {fileUpload} from "@/services/file/File";
import {PlusOutlined} from "@ant-design/icons";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UpdateProductPO>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.ProductVO>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  console.log("values",props.values);
  const [enumObj, setEnumObj] = useState<any>({});
  const urls = props.values.detailImgUrls?.split(",") ?? [];
  console.log(urls)
  const [fileList, setFileList] = useState<any[]>(urls.map((url,index) => ({url:url,uid:index})));
  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );


  useEffect(() => {
    const urls = props.values.detailImgUrls?.split(",") ?? [];
    const urlList = urls.map((url,index) => ({url:url,uid:index}))
    console.log("urlList",urlList)
    setFileList(urlList)
  }, [props.values.productId]);
  const getLists = async () => {
    let obj: any = {};

    const brandResp = await getAllBrand();
    obj["brandList"] = brandResp.data?.map((item) => ({label: item.brandName, value: item.brandId})) || [];

    const typeResp = await getAllType();
    obj["typeList"] = typeResp.data?.map((item) => ({label: item.typeName, value: item.typeId})) || [];

    const colorResp = await getAllColor();
    obj["colorList"] = colorResp.data?.map((item) => ({label: item.colorName, value: item.colorId})) || [];

    const sizeResp = await getAllSize();
    obj["sizeList"] = sizeResp.data?.map((item) => ({label: item.sizeName, value: item.sizeId})) || [];

    return obj;
  };
  useEffect(() => {
    const fetchData = async () => {
      const lists = await getLists();
      setEnumObj(lists);
    };

    fetchData();
  }, []);


  const memoizedOptions = useMemo(() => {
    return {
      brandList: enumObj.brandList || [],
      typeList: enumObj.typeList || [],
      colorList: enumObj.colorList || [],
      sizeList: enumObj.sizeList || [],
    };
  }, [enumObj]);

  return (
    <ModalForm<API.UpdateProductPO>
      open={props.updateModalOpen}
      title={"编辑商品信息"}
      onFinish={async (value) => {
        value.detailImgUrls = fileList.map(file => file.url).join(",")
        await props.onSubmit(value)
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.onCancel(false)
        },
      }}
      initialValues={props.values}
    >

      <ProForm.Group>
        <ProFormText
          name="productId"
          width="md"
          disabled
          label="商品ID"
        />

        <ProFormText
          name="name"
          width="md"
          label="商品名"
        />

        <ProFormMoney
          name="price"
          width="md"
          label="商品价格"
        />

        <ProFormDigit
          name="inventory"
          width="md"
          label="库存"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 1,
              label: '已上架',
            },
            {
              value: 0,
              label: '未上架',
            },
          ]}
          name="isEnable"
          label="商品状态"
        />
      </ProForm.Group>

      <div style={{marginBottom: 8}}>
        <span style={{display: "inline-block", marginBottom: 8}}>商品图片</span>
        <Upload
          customRequest={async ({file, onSuccess, onError}: any) => {
            console.log("requestFile", file)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("subjectCode", "0");
            const resp = await fileUpload(formData)
            file.url = resp.data
            file.status = "done"
            setFileList([...fileList, file])
            onSuccess("ok")
            message.success("上传成功")
          }}
          listType={"picture-card"}
          fileList={fileList}
          onRemove={(file) => {
            const list = fileList.filter((item) => item.uid !== file.uid)
            setFileList(list)
          }}
          showUploadList={{showPreviewIcon: true, showRemoveIcon: true}}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>


      <ProForm.Group>
        <ProFormSelect
          name="brandId"
          width="md"
          label="品牌"
          options={memoizedOptions.brandList}
          initialValue={props.values.brand?.brandId}
        />

        <ProFormSelect
          name="typeId"
          width="md"
          label="类型"
          options={memoizedOptions.typeList}
          initialValue={props.values.type?.typeId}
        />

        <ProFormSelect
          name="colorId"
          width="md"
          label="颜色"
          options={memoizedOptions.colorList}
          initialValue={props.values.color?.colorId}
        />

        <ProFormSelect
          name="sizeId"
          width="md"
          label="尺码"
          options={memoizedOptions.sizeList}
          initialValue={props.values.size?.sizeId}
        />
      </ProForm.Group>


    </ModalForm>
  );
};

export default UpdateForm;

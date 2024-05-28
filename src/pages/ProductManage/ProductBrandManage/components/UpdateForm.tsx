import {
  ModalForm,
  ProForm, ProFormSelect, ProFormText,

} from '@ant-design/pro-components';
import '@umijs/max';
import EditedAvatar from "@/components/EditedAvatar";
import React, {useEffect, useState} from 'react';
import UploadPic from "@/components/UploadPic";


/**
 * 定义修改表单数据模型
 */
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UpdateProductBrandPO>;


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.ProductBrandVO>;
};


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [fileList, setFileList] = useState<any[]>([{uid:0,url:props.values.brandLogoUrl}]);
  useEffect(() => {
    setFileList([{uid:1000,url:props.values.brandLogoUrl}]);
  }, [props.values.brandLogoUrl]);
  return (
    <ModalForm<API.UpdateProductBrandPO>
      open={props.updateModalOpen}
      title={"修改品牌信息"}
      onFinish={async (value) => {
        value.brandLogoUrl = fileList[0].url;
        console.log(value,"update value")
        await props.onSubmit(value)
        setFileList([])
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setFileList([])
          props.onCancel(false)
        },
      }}
      initialValues={props.values}
    >

      {/*<EditedAvatar userId={props.values.brandId + "" ?? "" } defaultAvatarUrl={props.values. ?? ""}/>*/}

      <ProFormText
        name="brandId"
        width="md"
        disabled
        label="品牌ID"
      />

      <UploadPic title={"品牌Logo"} label={"上传Logo"} fileList={fileList} setFileList={setFileList} limit={1}/>

      <ProFormText
        name="brandName"
        width="md"
        label="品牌名字"
      />


      <ProFormSelect
        width="xs"
        options={[
          {
            value: 1,
            label: '入驻',
          },
          {
            value: 0,
            label: '未入驻',
          },
        ]}
        name="isEnable"
        label="品牌入驻情况"
      />

    </ModalForm>

  );
};
export default UpdateForm;

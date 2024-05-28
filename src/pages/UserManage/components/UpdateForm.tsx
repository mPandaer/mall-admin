import {
  ModalForm,
  ProForm, ProFormCaptcha, ProFormSelect, ProFormText,

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
} & API.UpdateUserPO;


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: API.UserVO;
};





const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [fileList, setFileList] = useState<any[]>([{uid:1000,url:props.values.avatarUrl}]);
  useEffect(() => {
    setFileList([{uid:1000,url:props.values.avatarUrl}]);
  }, [props.values.avatarUrl]);

  return (
    <ModalForm<API.UpdateUserPO>
      open={props.updateModalOpen}
      title={"修改用户信息"}
      onFinish={async (value) => {
        value.avatarUrl = fileList[0].url;
        await props.onSubmit(value)
        // setFileList([])
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          // setFileList([])
          props.onCancel(false)
        },
      }}
      initialValues={props.values}
    >
      <UploadPic title={"用户头像"} label={"修改头像"} fileList={fileList} setFileList={setFileList} limit={1}/>


      <ProFormText
        name="userId"
        width="md"
        disabled
        label="用户ID"
      />

      <ProFormText
        name="username"
        width="md"
        label="用户姓名"
      />

      <ProFormText
        name="email"
        width="md"
        label="用户邮箱"
      />

      <ProFormSelect
        width="xs"
        options={[
          {
            value: 1,
            label: '管理员',
          },
          {
            value: 0,
            label: '普通用户',
          },
        ]}
        name="role"
        label="用户角色"
      />

      <ProFormSelect
        width="xs"
        options={[
          {
            value: 1,
            label: '未封号',
          },
          {
            value: 0,
            label: '封号',
          },
        ]}
        name="isEnable"
        label="用户状态"
      />

    </ModalForm>

  );
};
export default UpdateForm;

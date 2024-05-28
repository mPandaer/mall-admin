import {
  ModalForm,
  ProForm, ProFormSelect, ProFormText,

} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';


/**
 * 定义修改表单数据模型
 */
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UpdateProductTypePO>;


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UpdateProductTypePO>;
};


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm<API.UpdateProductTypePO>
      open={props.updateModalOpen}
      title={"修改类型信息"}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.onCancel(false)
        },
      }}
      initialValues={props.values}
    >

      {/*<EditedAvatar userId={props.values.typeId + "" ?? "" } defaultAvatarUrl={props.values. ?? ""}/>*/}

      <ProFormText
        name="typeId"
        width="md"
        disabled
        label="类型ID"
      />

      <ProFormText
        name="typeName"
        width="md"
        label="类型名字"
      />


      <ProFormSelect
        width="xs"
        options={[
          {
            value: 1,
            label: '启用',
          },
          {
            value: 0,
            label: '禁用',
          },
        ]}
        name="isEnable"
        label="类型启用状态"
      />

    </ModalForm>

  );
};
export default UpdateForm;

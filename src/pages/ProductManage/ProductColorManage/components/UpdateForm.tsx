import {
  ModalForm,
  ProForm, ProFormSelect, ProFormText,

} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';


/**
 * 定义修改表单数据模型
 */
export type FormValueColor = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UpdateProductColorPO>;


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueColor) => void;
  onSubmit: (values: FormValueColor) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UpdateProductColorPO>;
};


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm<API.UpdateProductColorPO>
      open={props.updateModalOpen}
      title={"修改颜色信息"}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.onCancel(false)
        },
      }}
      initialValues={props.values}
    >

      {/*<EditedAvatar userId={props.values.colorId + "" ?? "" } defaultAvatarUrl={props.values. ?? ""}/>*/}

      <ProFormText
        name="colorId"
        width="md"
        disabled
        label="颜色ID"
      />

      <ProFormText
        name="colorName"
        width="md"
        label="颜色名字"
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
        label="颜色启用状态"
      />

    </ModalForm>

  );
};
export default UpdateForm;

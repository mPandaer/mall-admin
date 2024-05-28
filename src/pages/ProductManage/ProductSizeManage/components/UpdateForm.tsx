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
} & Partial<API.UpdateProductSizePO>;


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UpdateProductSizePO>;
};


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm<API.UpdateProductSizePO>
      open={props.updateModalOpen}
      title={"修改尺码信息"}
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
        name="sizeId"
        width="md"
        disabled
        label="尺码ID"
      />

      <ProFormText
        name="sizeName"
        width="md"
        label="尺码名字"
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
        label="尺码启用状态"
      />

    </ModalForm>

  );
};
export default UpdateForm;

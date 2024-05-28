// @ts-ignore
import {addSize, deleteSize, pageQuerySize, updateSize,} from '@/services/product/ProductSize';
import {PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps, ProFormInstance} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Avatar, Button, Drawer, Input, message, Upload} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {request} from "@umijs/max";



/**
 * 添加用户信息
 * @param fields
 */
const handleAdd = async (fields: API.ProductSizeVO) => {
  const hide = message.loading('正在添加');
  try {
    // @ts-ignore
    await (addSize(fields));
    hide();
    message.success('Success');
    return true;
  } catch (error) {
    hide();
    // @ts-ignore
    message.error(error.response.data.message);
    return false;
  }
};

/**
 * 更新用户信息
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {

    await updateSize({
      sizeId: fields.sizeId as number,
      sizeName: fields.sizeName,
      isEnable: fields.isEnable
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败 ' + (error as any).response.data.message);
    return false;
  }
};

/**
 删除用户
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ProductSizeVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteSize({
      idList: selectedRows.map((row) => row.sizeId).join(","),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败 ' + (error as any).response.data.message);
    return false;
  }
};


/**
 * 列表组件
 * @constructor
 */
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductSizeVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductSizeVO[]>([]);

  // @ts-ignore
  const columns: ProColumns<API.ProductSizeVO>[] = [
    {
      title: '尺码ID',
      dataIndex: 'sizeId',
      valueType: "textarea",
      search: false
    },
    {
      title: '尺码名字',
      dataIndex: 'sizeName',
      valueType: 'textarea',
    },

    {
      title: '尺码状态',
      dataIndex: 'isEnable',
      // @ts-ignore
      valueEnum: {
        0: {
          text: '禁用',
          status: 0,
        },
        1: {
          text: '启用',
          status: 1,
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentRow(record)
            handleUpdateModalOpen(true);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  //添加表单实例
  const formRef = useRef<ProFormInstance>()



  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.ProductSizeVO>
        headerTitle={'尺码列表'}
        actionRef={actionRef}
        rowKey="sizeId"
        search={
          {}
        }
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
              formRef.current?.resetFields()
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={
          async (params, sort, filter) => {
            // @ts-ignore
            console.log("params", params)
            console.log("sort", sort)
            console.log("filter", filter)
            // @ts-ignore
            let query: API.pageQuerySizeParams = {pageSize: params.pageSize, currentPage: params.current}
            let resp = await pageQuerySize(query)
            const data: API.ProductSizeVO[] = resp.data?.records ?? []
            const filterData = data.filter(item => {
              if (params.sizeName && !item.sizeName?.includes(params.sizeName)) {
                return false;
              }
              if (params.isEnable && item.isEnable !== (+params.isEnable)) {
                return false;
              }
              return true;
            })
            return {data: filterData, success: true, total: resp.data?.total}

          }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />


      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>

              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}


      <ModalForm
        title={'添加商品尺码'}
        width="400px"
        formRef={formRef}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ProductSizeVO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}

      >
        <ProFormText
          width="md"
          name="sizeName"
          label={"尺码名字"}
          placeholder={"请输入尺码名字"}
        />

      </ModalForm>


      <UpdateForm
        onSubmit={async (value) => {
          console.log(value)
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        // @ts-ignore
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default TableList;

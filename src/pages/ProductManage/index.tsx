// @ts-ignore
import {add, deleteUsingGet, pageQuery, update,} from '@/services/product/Product';
import {PlusOutlined} from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Upload} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {all as getAllType} from "@/services/product/ProductType";
import {all1 as getAllSize} from "@/services/product/ProductSize";
import {all2 as getAllColor} from "@/services/product/ProductColor";
import {all3 as getAllBrand} from "@/services/product/ProductBrand";
import {fileUpload} from "@/services/file/File";


/**
 * 添加用户信息
 * @param fields
 */
const handleAdd = async (fields: API.AddProductPO) => {
  const hide = message.loading('正在添加');
  try {
    // @ts-ignore
    await (add(fields));
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

    await update(fields as API.UpdateProductPO);
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
const handleRemove = async (selectedRows: API.ProductVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUsingGet({
      idList: selectedRows.map((row) => row.productId).join(","),
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

  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductVO[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [pageSize,setPageSize] = useState<number>(5);
  const columns: ProColumns<API.ProductVO>[] = [
    {
      title: 'ID',
      dataIndex: 'productId',
      valueType: "textarea",
      search: false
    },
    {
      title: '名字',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '价格',
      dataIndex: 'price',
      valueType: 'textarea',
      search: false
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      valueType: 'textarea',
      search: false
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      valueType: "text",
      render: (_, record) => record.brand?.brandName
    },

    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'textarea',
      render: (_, record) => record.type?.typeName

    },

    {
      title: '颜色',
      dataIndex: 'color',
      valueType: "textarea",
      render: (_, record) => record.color?.colorName
    },
    {
      title: '尺码',
      dataIndex: 'size',
      valueType: "textarea",
      render: (_, record) => record.size?.sizeName
    },

    {
      title: '上架状态',
      dataIndex: 'isEnable',
      // @ts-ignore
      valueEnum: {
        0: {
          text: '未上架',
          status: 0,
        },
        1: {
          text: '已上架',
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

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );


  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.ProductVO>
        headerTitle={'产品列表'}
        actionRef={actionRef}
        rowKey="productId"
        pagination={{showSizeChanger:true,defaultPageSize:5}}
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
            // @ts-ignore
            let query: API.pageQueryParams = {pageSize: params.pageSize, currentPage: params.current}
            let resp = await pageQuery(query)
            const data: API.ProductVO[] = resp.data?.records ?? []
            console.log("product",data,params);
            const filterData = data.filter(item => {
              if (params.name && !item.name?.includes(params.name)) {
                return false;
              }
              if (params.isEnable && item.isEnable !== (+params.isEnable)) {
                return false;
              }
              if (params.type && !item.type?.typeName?.includes(params.type)) {
                return false;
              }
              if (params.size && item.size?.sizeName !== params.size) {
                return false;
              }
              if (params.color && !item.color?.colorName?.includes(params.color)) {
                return false;
              }
              if (params.brand && !item.brand?.brandName?.includes(params.brand)) {
                return false;
              }
              console.log("filter",item)
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
        title={'添加商品'}
        width={"800px"}
        formRef={formRef}
        open={createModalOpen}
        onOpenChange={(val) => {
          if (!val) {
            setFileList([])
          }
          handleModalOpen(val);
        }}
        onFinish={async (value) => {
          console.log("onFinish", value)
          console.log("fileList", fileList)
          value.detailImgUrls = fileList.map((file) => file.url).join(",");
          const success = await handleAdd(value as API.AddProductPO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}

      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label={"商品名字"}
            placeholder={"请输入商品名字"}
          />
          <ProFormDigit
            width="md"
            name="price"
            label={"商品价格"}
            placeholder={"请输入商品价格"}
          />

          <ProFormDigit
            width="md"
            name="inventory"
            label={"商品库存"}
            placeholder={"请输入商品库存"}
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
            label="上架状态"
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
            // initialValue={props.values.brandName}
            request={async (params) => {
              const resp = await getAllBrand()
              const list = resp.data || [];
              return list.map((item) => ({label: item.brandName, value: item.brandId}))
            }}
          />

          <ProFormSelect
            name="typeId"
            width="md"
            label="类型"
            // initialValue={props.values.typeName}
            request={async (params) => {
              const resp = await getAllType()
              const list = resp.data || [];
              return list.map((item) => ({label: item.typeName, value: item.typeId}))
            }}
          />

          <ProFormSelect
            name="colorId"
            width="md"
            label="颜色"
            // initialValue={props.values.colorName}
            request={async (params) => {
              const resp = await getAllColor()
              const list = resp.data || [];
              return list.map((item) => ({label: item.colorName, value: item.colorId}))
            }}
          />

          <ProFormSelect
            name="sizeId"
            width="md"
            label="尺码"
            request={async (params) => {
              const resp = await getAllSize()
              const list = resp.data || [];
              return list.map((item) => ({label: item.sizeName, value: item.sizeId}))
            }}
          />
        </ProForm.Group>


      </ModalForm>


      <UpdateForm
        onSubmit={async (value) => {
          console.log("update", value);

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

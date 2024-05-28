// @ts-ignore
import {addBrand, deleteBrand, pageQueryBrand, updateBrand,} from '@/services/product/ProductBrand';
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
import {fileUpload} from "@/services/file/File";
import UploadPic from "@/components/UploadPic";



/**
 * 添加用户信息
 * @param fields
 */
const handleAdd = async (fields: API.ProductBrandVO) => {
  const hide = message.loading('正在添加');
  try {
    // @ts-ignore
    await (addBrand(fields));
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

    await updateBrand(fields as API.UpdateProductBrandPO);
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
const handleRemove = async (selectedRows: API.ProductBrandVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteBrand({
      idList: selectedRows.map((row) => row.brandId).join(","),
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
  const [currentRow, setCurrentRow] = useState<API.ProductBrandVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductBrandVO[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  // @ts-ignore
  const columns: ProColumns<API.ProductBrandVO>[] = [
    {
      title: '品牌ID',
      dataIndex: 'brandId',
      valueType: "textarea",
      search: false
    },
    {
      title: '品牌Logo',
      dataIndex: 'brandLogoUrl',
      valueType: "image",
      search: false
    },
    {
      title: '品牌名字',
      dataIndex: 'brandName',
      valueType: 'textarea',
    },

    {
      title: '入驻状态',
      dataIndex: 'isEnable',
      // @ts-ignore
      valueEnum: {
        0: {
          text: '未入驻',
          status: 0,
        },
        1: {
          text: '入驻',
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
      <ProTable<API.ProductBrandVO>
        headerTitle={'品牌列表'}
        actionRef={actionRef}
        rowKey="brandId"
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
            let query: API.pageQueryBrandParams = {pageSize: params.pageSize, currentPage: params.current}
            let resp = await pageQueryBrand(query)
            const data: API.ProductBrandVO[] = resp.data?.records ?? []
            const filterData = data.filter(item => {
              if (params.brandName && !item.brandName?.includes(params.brandName)) {
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
        title={'添加商品品牌'}
        width="400px"
        formRef={formRef}
        open={createModalOpen}
        onOpenChange={(openStatus) => {
          setFileList([])
          handleModalOpen(openStatus)
        }}
        onFinish={async (value) => {
          value.brandLogoUrl = fileList.map((file) => file.url)[0];
          const success = await handleAdd(value as API.ProductBrandVO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          setFileList([])
        }}

      >
        <ProFormText
          width="md"
          name="brandName"
          label={"品牌名字"}
          placeholder={"请输入品牌名字"}
        />

        {/*<div style={{marginBottom: 8}}>*/}
        {/*  <span style={{display: "inline-block", marginBottom: 8}}>品牌Logo</span>*/}
        {/*  <Upload*/}
        {/*    customRequest={async ({file, onSuccess, onError}: any) => {*/}
        {/*      const formData = new FormData();*/}
        {/*      formData.append("file", file);*/}
        {/*      formData.append("subjectCode", "0");*/}
        {/*      const resp = await fileUpload(formData)*/}
        {/*      file.url = resp.data*/}
        {/*      file.status = "done"*/}
        {/*      setFileList([...fileList, file])*/}
        {/*      message.success("上传成功")*/}
        {/*    }}*/}
        {/*    listType={"picture-circle"}*/}
        {/*    fileList={fileList}*/}
        {/*    onRemove={(file) => {*/}
        {/*      const list = fileList.filter((item) => item.uid !== file.uid)*/}
        {/*      setFileList(list)*/}
        {/*    }}*/}
        {/*    showUploadList={{showPreviewIcon: true, showRemoveIcon: true}}*/}
        {/*  >*/}
        {/*    {fileList.length >= 1 ? null : uploadButton}*/}
        {/*  </Upload>*/}
        {/*</div>*/}

        <UploadPic title={"品牌Logo"} label={"上传Logo"} fileList={fileList} setFileList={setFileList} limit={1}/>

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

// @ts-ignore
import {addUser, deleteUser, pageQueryUser, updateUser,} from '@/services/user/User';
import {PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps, ProFormInstance} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProForm,
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
import UploadPic from "@/components/UploadPic";


/**
 * 添加用户信息
 * @param fields
 */
const handleAdd = async (fields: API.AddUserPO) => {
  console.log(fields,"adduser");
  const hide = message.loading('正在添加');
  try {
    // @ts-ignore
    await (addUser(fields));
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

    await updateUser(fields as API.UpdateUserPO);
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
const handleRemove = async (selectedRows: API.UserVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      idList: selectedRows.map((row) => row.userId).join(","),
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
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);

  // @ts-ignore
  const columns: ProColumns<API.UserVO>[] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: "textarea",
      search: false
    },
    {
      title: '用户姓名',
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: '用户头像',
      dataIndex: 'avatarUrl',
      valueType: 'image',
      search:false
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      valueType: 'textarea'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      hideInForm: true,
      // @ts-ignore
      valueEnum: {
        0: {
          text: '普通人员',
          status: 0,
        },
        1: {
          text: '管理员',
          status: 1,
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'isEnable',
      // @ts-ignore
      valueEnum: {
        0: {
          text: '封号',
          status: 0,
        },
        1: {
          text: '未封号',
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
            console.log("record user",record)
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
  const [fileList, setFileList] = useState<any[]>([]);


  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.UserVO>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="userId"
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
            let query: API.pageQueryUserParams = {pageSize: params.pageSize, currentPage: params.current}
            let resp = await pageQueryUser(query)
            const data = resp.data?.records ?? []
            console.log("data",data)
            const filterData = data.filter(item => {
              if (params.username && !item.username?.includes(params.username)) {
                return false;
              }
              if (params.email && !item.email?.includes(params.email)) {
                return false;
              }
              if (params.role && item.role !== (+params.role)) {
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
        title={'添加用户'}
        width="400px"
        formRef={formRef}
        open={createModalOpen}
        onOpenChange={(value) => {
          handleModalOpen(value)
          setFileList([])
        }}
        onFinish={async (value) => {
          value.avatarUrl = fileList[0].url;

          const success = await handleAdd(value as API.AddUserPO);
          if (success) {
            setFileList([])
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}

      >

        <UploadPic title={"用户头像"} label={"上传头像"} fileList={fileList} setFileList={setFileList} limit={1}/>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
            ]}
            width="md"
            name="username"
            label={"用户姓名"}
            placeholder={"请输入用户名"}
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
            ]}
            width="md"
            name="password"
            label={"用户密码"}
            placeholder={"请输入密码"}
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '邮箱不能为空',
              },
            ]}
            width="md"
            name="email"
            label={"用户邮箱"}
            placeholder={"请输入邮箱"}
          />
        </ProForm.Group>

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
        values={currentRow ?? {}}
      />
    </PageContainer>
  );
};
export default TableList;

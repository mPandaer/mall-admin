import {Footer} from '@/components';

import {
  AlipayCircleOutlined,
  LockOutlined, MailOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ModalForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {Helmet, history, useModel} from '@umijs/max';
import {Alert, Tabs, message as Message, Button, Form} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {login, register} from "@/services/user/User";

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});


const ActionIcons = () => {
  const {styles} = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action}/>
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action}/>
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action}/>
    </>
  );
};
const Lang = () => {
  const {styles} = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

//登录组件
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.RespLoginUserVO>({});
  const [registerState, setRegisterState] = useState<boolean>(false);
  // const [registerValues,setRegisterValues] = useState<API.RegisterUserPO>({})
  const [form] = Form.useForm<API.RegisterUserPO>();
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginUserPO) => {
    try {
      // 登录
      const resp = await login({
        ...values,
      });
      if (resp.message === 'Success') {
        const defaultLoginSuccessMessage = '登录成功！';
        //保存两个Token
        // @ts-ignore
        localStorage.setItem("accessToken", resp.data.accessToken ?? "");
        // @ts-ignore
        localStorage.setItem("refreshToken", resp.data.refreshToken ?? "");
        Message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log("login", resp);
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg.message);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log("login error", error);
      Message.error(defaultLoginFailureMessage);
    }
  };
  const {message} = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="M鞋城 管理后台"
          subTitle={'工程实践 -- 在线鞋城'}
          initialValues={{
            autoLogin: false,
          }}

          onFinish={
            async (values) => {
              await handleSubmit(values as API.LoginUserPO);
            }
          }
        >

          {message === 'error' && (
            <LoginMessage content={'错误的用户名和密码'}/>
          )}
          {(
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Button type="link" onClick={() => setRegisterState(true)}>注册</Button>
            <Button type="link">忘记密码</Button>
          </div>
        </LoginForm>

        <ModalForm<API.RegisterUserPO>
          open={registerState}
          title="新建表单"
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => {setRegisterState(false)},
          }}
          onFinish={async (values) => {
            //注册
            await register(values)
            Message.success('注册成功');
            setRegisterState(false)
            return true;
          }}


        >
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText
            width="md"
            name="password"
            label="密码"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
        </ModalForm>


      </div>
      <Footer/>
    </div>
  );
};
export default Login;

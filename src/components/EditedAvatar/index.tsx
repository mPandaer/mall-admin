import React, { useState, useEffect } from 'react';
import { Upload, Button, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { request } from '@@/exports';
import './edit-avatar.css'; // 确保引入样式文件

interface EditedAvatarProps {
  userId: string;
  defaultAvatarUrl: string;
}

const uploadAvatar = (data: FormData, options?: any) => {
  return request<{ data: string }>('/admin/user/upload-avatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    ...(options || {}),
  });
};

const EditedAvatar: React.FC<EditedAvatarProps> = ({ userId, defaultAvatarUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatarUrl);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const response = await uploadAvatar(formData);
      if (response) {
        // @ts-ignore
        setAvatarUrl(response.data);
        message.success('上传成功');
      } else {
        message.error('上传失败');
      }
    } catch (error) {
      message.error('上传失败');
    }
  };

  useEffect(() => {
    console.log('avatarUrl updated:', avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    console.log('Component re-rendered');
  });

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }: any) => {
      try {
        await handleUpload(file);
        onSuccess('ok');
      } catch (error) {
        onError(error);
      }
    },
  };

  return (
    <div className="user-profile">
      <Avatar size={80} src={avatarUrl || <UserOutlined />} />
      <Upload {...uploadProps} className="upload-button">
        <Button icon={<UploadOutlined />}>修改头像</Button>
      </Upload>
    </div>
  );
};

export default EditedAvatar;

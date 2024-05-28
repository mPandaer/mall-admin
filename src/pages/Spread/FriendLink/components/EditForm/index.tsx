import {
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormMoney,
  ProFormText,
} from "@ant-design/pro-components";
import UploadPic from "@/components/UploadPic";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UploadFile} from "antd";


type EditFormProps = {
  display:boolean;
  setDisplay:Dispatch<SetStateAction<boolean>>;
  onFinish: (values:API.AddFriendLinkPO | API.UpdateFriendLinkPO) => Promise<void>;
  onCancel: () => void;
  initialValues?:API.FriendLinkVO;

}


const EditForm = ({display,setDisplay,onFinish,onCancel,initialValues}:EditFormProps) => {
  const [fileList,setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (typeof initialValues?.linkImgUrl !== "undefined") {
      const defaultFile = {uid:"1",url:initialValues.linkImgUrl}
      setFileList([defaultFile as UploadFile]);
    }
  }, [initialValues?.linkImgUrl]);


  return (
    <ModalForm<API.AddFriendLinkPO | API.UpdateFriendLinkPO>
    title={(typeof initialValues?.linkId === "undefined" ? "添加" : "更新") + "链接信息"}
    open={display}
    onOpenChange={setDisplay}
    onFinish={async (values) => {
      console.log("values",values);
      values.linkImgUrl = fileList[0].url ?? "";
      await onFinish(values);
      setFileList([])
    }}
    modalProps={{
      destroyOnClose:true,
      onCancel: () => {
        setFileList([])
        onCancel();
      },
    }}
    >
      <ProForm.Group>
        {
          initialValues?.linkId && <ProFormText
            name="linkId"
            width={"md"}
            label={"链接ID"}
            disabled
            initialValue={initialValues?.linkId}
          />
        }

        <ProFormText
          name="linkName"
          width={"md"}
          label={"链接名字"}
          placeholder={"请输入链接名字"}
          initialValue={initialValues?.linkName}
        />

        <ProFormText
          name="linkUrl"
          width={"md"}
          label={"链接URL"}
          placeholder={"请输入URL"}
          initialValue={initialValues?.linkUrl}
        />

      </ProForm.Group>
      <UploadPic title={"链接图片"} label={"上传图片"} fileList={fileList} setFileList={setFileList} limit={1}/>
    </ModalForm>

  );


}


export default EditForm;

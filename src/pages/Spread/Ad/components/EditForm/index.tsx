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
  onFinish: (values:API.AddADPO | API.UpdateADPO) => Promise<void>;
  onCancel: () => void;
  initialValues?:API.ADVO;

}


const EditForm = ({display,setDisplay,onFinish,onCancel,initialValues}:EditFormProps) => {
  const [fileList,setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (typeof initialValues?.adImgUrl !== "undefined") {
      const defaultFile = {uid:"1",url:initialValues.adImgUrl}
      setFileList([defaultFile as UploadFile]);
    }
  }, [initialValues?.adImgUrl]);


  return (
    <ModalForm<API.AddADPO>
    title={(typeof initialValues?.adId === "undefined" ? "添加" : "更新") + "广告信息"}
    open={display}
    onOpenChange={setDisplay}
    onFinish={async (values) => {
      values.adImgUrl = fileList[0].url ?? "";
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
          initialValues?.adId && <ProFormText
            name="adId"
            width={"md"}
            label={"广告ID"}
            disabled
            initialValue={initialValues?.adId}
          />
        }

        <ProFormText
          name="companyName"
          width={"md"}
          label={"公司名字"}
          placeholder={"请输入公司名字"}
          initialValue={initialValues?.companyName}
        />

        <ProFormMoney
          name="adCost"
          width={"md"}
          label={"广告费用"}
          placeholder={"请输入费用"}
          initialValue={initialValues?.adCost}
        />

        <ProFormDateTimePicker
          name="adValidTime"
          width={"md"}
          label={"截止日期"}
          placeholder={"请选择截止日期"}
          initialValue={initialValues?.adValidTime}
        />

        <ProFormText
          name="adUrl"
          width={"md"}
          label={"广告链接"}
          placeholder={"请输入广告链接"}
          initialValue={initialValues?.adUrl}
        />

      </ProForm.Group>
      <UploadPic title={"广告图片"} label={"上传广告图片"} fileList={fileList} setFileList={setFileList} limit={1}/>
    </ModalForm>

  );


}


export default EditForm;

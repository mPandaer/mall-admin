import {message, Upload, UploadFile} from "antd";
import {fileUpload} from "@/services/file/File";
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

type UploadPicProps = {
  title:string;
  label:string;
  fileList:Array<UploadFile>;
  setFileList: (fileList:Array<UploadFile>) => void;
  limit:number;
}

const UploadPic = ({title,label,fileList,setFileList,limit}:UploadPicProps) => {

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined/>
      <div style={{marginTop: 8}}>{label}</div>
    </button>
  );

  return (
    <div style={{marginBottom: 8}}>
      <span style={{display: "inline-block", marginBottom: 8}}>{title}</span>
      <Upload
        customRequest={async ({file, onSuccess, onError}: any) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("subjectCode", "0");
          const resp = await fileUpload(formData)
          file.url = resp.data
          file.status = "done"
          setFileList([...fileList, file])
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
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
    </div>
  );
}

export default UploadPic;

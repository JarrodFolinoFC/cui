import React, {useState} from "react";
import { Button, Upload, Space } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import asyncLocalStorage from "../../utils/asyncLocalStorage";


const Restore = () => {
  const [fileList, setFileList] = useState([]);

  const props = {
    fileList,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          message.success("Data successfully stored in local storage.");
          console.log("Data successfully stored in local storage.");
          setFileList([]);
        } catch (error) {
          message.error("Error parsing JSON.");
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
      return false;
    },
    onRemove() {
      setFileList([]);
      return true;
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};


function Backup({ name, storageDriver = localStorage }) {
  const downloadLocalStorage = async () => {
    const allData = {};
    for (let i = 0; i < storageDriver.length; i++) {
      const key = storageDriver.key(i);
      allData[key] = storageDriver.getItem(key);
    }
    const jsonString = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={downloadLocalStorage} icon={<DownloadOutlined />}>
      Export Data
    </Button>
  );
}

export default function BackupRestore() {
  return (
    <Space>
      <Backup />
      <Restore />
    </Space>
  );
}

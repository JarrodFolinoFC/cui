import React, { useState } from "react";
import { Button, Upload, Space, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

const Restore = () => {
  const [fileList, setFileList] = useState([]);

  const props = {
    fileList,
    beforeUpload(file) {
      const reader = new FileReader();
      let currentKey = null;
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([key, value]) => {
            currentKey = key;
            localStorage.setItem(key, value);
          });
          message.success("Data successfully stored in local storage.");
          console.log("Data successfully stored in local storage.");
          setFileList([]);
        } catch (error) {
          message.error(`Error parsing JSON for ${currentKey}: ${error}`);
          console.error(`Error parsing JSON for ${currentKey}:`, error);
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
    // Get today's date in yyyymmdd format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}${mm}${dd}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_${formattedDate}.json`;
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

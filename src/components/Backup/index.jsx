import React from "react";
import { Card, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

function Backup({ name, storageDriver = localStorage }) {
  const downloadLocalStorage = async () => {
    const allData = {};
    for (let i = 0; i < ( storageDriver.length); i++) {
      const key =  storageDriver.key(i);
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
    <Card title={name} size="small">
      <Button onClick={downloadLocalStorage} icon={<SaveOutlined />}>
        Export Data
      </Button>
    </Card>
  );
}

export default Backup;

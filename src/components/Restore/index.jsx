import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

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

export default Restore;

import { useState } from "react";

import { Upload, Button, message } from "antd";

import { UploadOutlined } from "@ant-design/icons";

interface IUploadCsvButtonProps {
  onSuccess?: (data: any) => void;
}

export const UploadCsvButton = ({ onSuccess }: IUploadCsvButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/oil-forecast/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      if (onSuccess) onSuccess(result.forecast);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    beforeUpload: (file: File) => {
      const isCSV = file.type === "text/csv";
      if (!isCSV) {
        message.error("Only CSV files are accepted.");
      }
      return isCSV;
    },
    customRequest: ({ file }: any) => {
      handleUpload(file as File);
    },
    showUploadList: false,
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" icon={<UploadOutlined />} loading={isLoading}>
        Загрузить CSV
      </Button>
    </Upload>
  );
};

import React from "react";

import { Table } from "antd";

const RunTable = ({ runs }) => {
  return (
    <Table
      style={{ width: "100%" }}
      dataSource={runs}
      columns={[
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (text) => {
            const date = new Date(text);
            const formattedDate = date.toISOString().split("T")[0];
            return formattedDate;
          },
        },
        {
          title: "Distance",
          dataIndex: "distance",
          key: "distance",
          render: (text) => <>{text}km </>,
        },
        {
          title: "Time",
          dataIndex: "minutes",
          key: "minutes",
          render: (text, record) => (
            <>
              {record.minutes}m {record.seconds}s
            </>
          ),
        },
      ]}
    />
  );
};

export default RunTable;

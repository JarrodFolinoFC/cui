import React from "react";

import { Table } from "antd";

const RunTable = ({ runs }) => {
  return (
    <Table
      dataSource={runs}
      columns={[
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (text) => text,
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

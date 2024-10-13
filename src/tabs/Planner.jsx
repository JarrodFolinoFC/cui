import React, { useState, useEffect } from "react";
import { Flex, Card, Button, Space } from "antd";
import MarkdownCard from "../components/MarkdownCard";
import JsConsole from "../components/JsConsole";
import UpcomingBirthdays from "../components/UpcomingBirthdays";

import Weather from "../components/Weather";
import AwsAccounts from "../components/AwsAccounts";
import Repos from "../components/Repos";
import SshProject from "../components/SshProject";
import AwsLambdas from "../components/AwsLambdas";
import Prs from "../components/Prs";
import MergedPrs from "../components/MergedPrs";

function Planner() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);
  return (
    <Flex wrap gap="4px" vertical>
      <Space>
        {links.map((link) => {
          return (
            <Button size="small">
              <a href={link.url} target={link.name}>
                {link.name}
              </a>
            </Button>
          );
        })}
      </Space>
      <MergedPrs name="Merged PRs" key="merged_prs" />
      <Flex>
        <AwsAccounts />
        <SshProject
          name="RAP Projects"
          repos={[
            "flexipay-rewards-api",
            "flexipay-pricing-api",
            "flexipay-rewards-and-pricing-shared",
          ]}
        />
        <AwsLambdas name="flexipay-rewards-api" />
        <AwsLambdas name="flexipay-pricing-api" />
        <AwsLambdas name="flexipay-rewards-and-pricing-shared" />
      </Flex>

      <Flex>
        <Weather
          location="London"
          latitude={52.52}
          longitude={13.41}
          timeInfo="Europe/London"
        />
        <Weather
          location="Sofia"
          latitude={42.6977}
          longitude={23.3219}
          timeInfo="Europe/Sofia"
        />
        <Weather
          location="Melbourne"
          latitude={-37.8136}
          longitude={144.9631}
          timeInfo={"Australia/Melbourne"}
        />

        <JsConsole />
      </Flex>

      {/* <MyTable /> */}
      <Repos />
    </Flex>
  );
}

export default Planner;

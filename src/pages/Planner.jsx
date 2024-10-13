import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import JsConsole from "../components/JsConsole";

import Weather from "../components/Weather";
import AwsAccounts from "../components/AwsAccounts";
import Repos from "../components/Repos";
import SshProject from "../components/SshProject";
import AwsLambdas from "../components/AwsLambdas";
import Links from "../components/Links";
import MergedPrs from "../components/MergedPrs";

function Planner() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);
  return (
    <Flex wrap gap="4px" vertical>
      <Links links={links} />
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
        <SshProject
          name="RAP Projects"
          repos={[
            "flexipay-pricing-end-to-end",
            "uk-borrower-platform-rewards",
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

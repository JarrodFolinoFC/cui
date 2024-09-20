import React, { useState, useEffect } from "react";
import { Flex, Card, Tag } from "antd";
import MarkdownCard from "../components/MarkdownCard";
import JsConsole from "../components/JsConsole";
import UpcomingBirthdays from "../components/UpcomingBirthdays";

import Weather from "../components/Weather";
import AwsAccounts from "../components/AwsAccounts";
import Repos from "../components/Repos";
import SshProject from "../components/SshProject";
import AwsLambdas from "../components/AwsLambdas";
import Prs from "../components/Prs";

function Planner() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);
  return (
    <Flex wrap gap="4px" vertical>
      {/* <CountriesVisited /> */}
      <Flex>
        <MarkdownCard
          title={"General"}
          urls={[
            "http://localhost:5173/md/vscode_general_basic.md",
            "http://localhost:5173/md/vscode_search_select.md",
            "http://localhost:5173/md/vscode_other.md",
            // "http://localhost:5173/md/vscode_display.md",
          ]}
        />
      </Flex>
      <Flex>
        <Card title="Links" size="small">
          {links.map((link) => {
            return (
              <Tag>
                <a href={link.url} target={link.name}>
                  {link.name}
                </a>
              </Tag>
            );
          })}
        </Card>
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
        <Prs name="PRs" />
        <JsConsole />
      </Flex>
      <Flex>
        <AwsAccounts />
        <SshProject
          name="RAP Projects"
          repos={[
            // "borrower-portal-flexipay-application",
            "flexipay-rewards-api",
            "flexipay-pricing-api",
            "flexipay-rewards-and-pricing-shared",
          ]}
        />
        <AwsLambdas name="flexipay-rewards-api" />
        <AwsLambdas name="flexipay-pricing-api" />
        <AwsLambdas name="flexipay-rewards-and-pricing-shared" />
      </Flex>

      {/* <MyTable /> */}
      <Repos />
    </Flex>
  );
}

export default Planner;

import os
import json

directory = "/Users/jarrod.folino/Dev/sharks/rap"

repos = [
    {
        "name": "flexipay-rewards-api",
        "lambda_prefix": "fp_rewards_api_"
    },
    {
        "name": "uk-borrower-platform-rewards"
    },
    {
        "name": "flexipay-billing-mock",
    },
    {
        "name": "flexipay-rewards-end-to-end",
    },
    {
        "name": "flexipay-pricing-api",
    },
    {
        "name": "flexipay-pricing-api-end-to-end",
    },
    {
        "name": "flexipay-rewards-and-pricing-shared",
    },
    {
        "name": "rewards-and-pricing-db-migrator",
    },
    {
        "name": "msk-cluster-uat",
    },
]


def get_folders_in_directory(directory_path):
    for item in os.scandir(directory_path):
        if item.is_dir():
            for sub_item in os.scandir(item.path):
                if sub_item.is_dir():
                    subfolder = sub_item.name.lower()
                    if "post" in subfolder:
                        yield item.name + "_post"
                    elif "get" in subfolder:
                        yield item.name + "_get"
                    else:
                        yield item.name
# https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/


def generate_cwlog_url(repo):
    lambda_cwlogs_url = "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252F"
    logs = {}
    repo_name = repo["name"]
    lambda_prefix = repo.get("lambda_prefix")
    if lambda_prefix:
        handlers_directory = f"{directory}/{repo_name}/handlers"
        lambdas = get_folders_in_directory(handlers_directory)
        for lambda_name in lambdas:
            logs[f"{lambda_prefix}{lambda_name}"] = f"{lambda_cwlogs_url}{lambda_prefix}{lambda_name}"

    return logs


def generate_lambda_url(repo):
    lambda_url = "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/"
    logs = {}
    repo_name = repo["name"]
    lambda_prefix = repo.get("lambda_prefix")
    if lambda_prefix:
        handlers_directory = f"{directory}/{repo_name}/handlers"
        lambdas = get_folders_in_directory(handlers_directory)
        for lambda_name in lambdas:
            logs[f"{lambda_prefix}{lambda_name}"] = (
                f"{lambda_url}{lambda_prefix}{lambda_name}"
            )

    return logs


if __name__ == "__main__":
    results = {}
    for repo in repos:
        results[repo["name"]] = {}

    for repo in repos:
        results[repo["name"]]["logs"] = generate_cwlog_url(repo)

    for repo in repos:
        results[repo["name"]]["lambdas"] = generate_lambda_url(repo)

    print(json.dumps(results))

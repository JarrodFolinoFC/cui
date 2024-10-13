import ast
import os
import json


def is_test_function(node):
    """Check if a function node is a pytest test function."""
    return isinstance(node, ast.FunctionDef) and node.name.startswith("test_")


def find_pytest_tests_in_file(file_path):
    """Find all pytest test functions in a given Python file."""
    with open(file_path, "r") as file:
        tree = ast.parse(file.read(), filename=file_path)

    test_functions = [node.name for node in ast.walk(tree) if is_test_function(node)]
    return test_functions


def find_pytest_tests_in_folder(folder_path):
    """Find all pytest test functions in all Python files in a given folder."""
    all_tests = {}
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                test_functions = find_pytest_tests_in_file(file_path)
                if test_functions:
                    # Adjust the file path to remove everything up until the handlers path
                    relative_path = os.path.relpath(file_path, folder_path)
                    handlers_index = relative_path.find("handlers")
                    if handlers_index != -1:
                        relative_path = relative_path[handlers_index:]
                    all_tests[relative_path] = test_functions
    return all_tests


def main(folder_path):
    all_tests = find_pytest_tests_in_folder(folder_path)
    print(json.dumps(all_tests, indent=2))


if __name__ == "__main__":
    folder_path = "/Users/jarrod.folino/Dev/sharks/rap/flexipay-pricing-api/handlers/repayment_details/get/tests"  # Replace with the path to your folder
    main(folder_path)

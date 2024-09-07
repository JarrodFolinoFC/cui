import requests
from markdownify import markdownify as md

# URL to fetch content from
url = "https://www.geeksforgeeks.org/express-js/"

try:
    # Fetch the content from the URL
    response = requests.get(url, verify=False)
    response.raise_for_status()  # Raise an exception for HTTP errors

    # Convert HTML content to Markdown
    html_content = response.text
    markdown_content = md(html_content)

    # Save the Markdown content to a file
    with open("express_js.md", "w") as file:
        file.write(markdown_content)

    print("Content successfully converted to Markdown and saved to express_js.md")

except requests.exceptions.RequestException as e:
    print(f"Error fetching the content: {e}")

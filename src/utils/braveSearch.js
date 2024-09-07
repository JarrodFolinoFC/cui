import axios from "axios";

const url = "https://api.search.brave.com/res/v1/web/search";
const apiToken = "BSAerrT4ngcq-9nvqUWNnPaZHhFjr08";

const headers = {
  Accept: "application/json",
  "Accept-Encoding": "gzip",
  "X-Subscription-Token": apiToken,
};

const search = async (query) => {
  const response = await axios.get(url, {
    params: { q: query, summary: 1 },
    headers,
  });
  return response.data;
};

export default search;

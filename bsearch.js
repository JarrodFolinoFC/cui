import axios from "axios";

const url = "https://api.search.brave.com/res/v1/web/search";
const params = {
  q: "what is the second highest mountain",
  summary: 1,
};
const headers = {
  Accept: "application/json",
  "Accept-Encoding": "gzip",
  "X-Subscription-Token": "BSAerrT4ngcq-9nvqUWNnPaZHhFjr08",
};

axios
  .get(url, { params, headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error making the request:", error);
  });

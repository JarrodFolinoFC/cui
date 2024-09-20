import axios from "axios";

class MirrorStorage {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }

  displayName(name) {
    return name.replace(/ /g, "_");
  }

  async getItem(givenName) {
    return axios
      .get(`${this.url}/${this.displayName(givenName)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      });
  }

  async setItem(name, data) {
    axios
      .post(
        this.url,
        { object_name: this.displayName(name), object_value: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

export default MirrorStorage;

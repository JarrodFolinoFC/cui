import React, { useState, useEffect } from "react";
import { Card, Input, Tag, Button, AutoComplete } from "antd";
import search from "../utils/braveSearch";

function SearchEngineLink({ name, baseUrl, searchText }) {
  const [encodedUri, setEncodedUri] = useState(encodeURIComponent(searchText));
  useEffect(() => {
    const newEncodedUri = encodeURIComponent(searchText);
    setEncodedUri(newEncodedUri);
  }, [searchText]);
  return (
    <Button>
      <a href={`${baseUrl}${encodedUri}`} target={name}>
        {name}
      </a>
    </Button>
  );
}

const exampleSuggestions = [];

function Search() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (searchText) => {
    setSuggestions(
      !searchText
        ? []
        : exampleSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    handleSearch(newValue);
  };

  const handleSelect = (data) => {
    setValue(data);
  };

  return (
    <Card title="Search" style={{ width: "100%" }}>
      <AutoComplete
        value={value}
        options={suggestions.map((suggestion) => ({ value: suggestion }))}
        onSelect={handleSelect}
        onSearch={handleSearch}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        <Input.Search
          placeholder="Search"
          onSearch={(value) => {
            search(value).then((data) => {
              console.log(data);
            });
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </AutoComplete>
      <SearchEngineLink
        name="DDG"
        baseUrl="https://duckduckgo.com/?t=h_&q="
        searchText={value}
      />
      <SearchEngineLink
        name="Google"
        baseUrl="https://www.google.com/search?q="
        searchText={value}
      />
      <SearchEngineLink
        name="Stackoverflow"
        baseUrl="https://stackoverflow.com/search?q="
        searchText={value}
      />
      <SearchEngineLink
        name="Bing"
        baseUrl="https://www.bing.com/search?q="
        searchText={value}
      />
    </Card>
  );
}

export default Search;

import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import Header from "./components/ui/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const base_endpoint = "https://gateway.marvel.com/";
  const get_all_chars = "v1/public/characters";

  useEffect(() => {
    const fetchItems = async () => {
      // params used for uri params to marvel api
      const timestamp_int = Date.now();
      const timestamp = timestamp_int.toString();
      const pre_md5 = timestamp.concat(
        process.env.REACT_APP_MARVEL_API_PRIVATE_KEY,
        process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
      );
      const md5_hash = md5(pre_md5);

      // axios get request to marvel api for all characters
      const result = await axios(
        // GET request
        base_endpoint.concat(
          get_all_chars,
          "?",
          `nameStartsWith=${query}`,
          "&ts=",
          timestamp,
          "&apikey=",
          process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
          "&hash=",
          md5_hash
        )
      );

      console.log(result.data.data.results);

      setItems(result.data.data.results);
      setIsLoading(false);
    };

    fetchItems();
  }, [query]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
};

export default App;

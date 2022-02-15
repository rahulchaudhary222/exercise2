import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [Data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [organic_results, setOrganic_results] = useState([]);
  const imageCard = (url) => {
    return (
      <div style={{ backgroundImage: `url("${url}")` }} className="Image"></div>
    );
  };
  useEffect(() => {
    if (Data?.knowledge_graph?.header_images) {
      let imgs = [...Data.knowledge_graph.header_images];
      let urls = imgs.map((e) => e.image);
      setImages(urls);
    }
  }, [Data]);
  const OnSearch = () => {
    axios
      .get(
        `https://serpapi.com/search.json?engine=google&q=${search}&api_key=53bc389b1341720f6ea8d5cf06c2d86ed78805d033f52cc3c8f91974937f6068`
      )
      .then((res, err) => {
        if (res) {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="Home">
        <div className="searchDiv">
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="searchField"
          />
        </div>
        <Button variant="contained" onClick={() => OnSearch()}>
          Search
        </Button>
      </div>
      <div id="result">
        <div className="ImageDiv">{images.map((e) => imageCard(e))}</div>
      </div>
    </div>
  );
};
export default Home;

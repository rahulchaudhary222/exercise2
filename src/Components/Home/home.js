import React, { useEffect, useState } from "react";
import "./home.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import MockData from "../SearchMockData";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Home = () => {
  const [search, setSearch] = useState("");
  const [Data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [organic_results, setOrganic_results] = useState([]);
  const [loading, setLoading] = useState(false);
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
    if (Data?.organic_results) {
      let orgRes = [...Data.organic_results];
      setOrganic_results(orgRes);
    }
  }, [Data]);
  const OnSearch = () => {
    setLoading(true);
    setData(null);
    axios
      .get(
        `https://serpapi.com/search.json?engine=google&q=${search}&api_key=53bc389b1341720f6ea8d5cf06c2d86ed78805d033f52cc3c8f91974937f6068`
      )
      .then((res, err) => {
        if (res) {
          setData(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {Data && (
        <div id="result">
          {images.length > 0 && (
            <div>
              <h2>Images</h2>
              <div className="ImageDiv">{images.map((e) => imageCard(e))}</div>
            </div>
          )}

          {organic_results.length > 0 && (
            <div>
              {organic_results.map((e) => (
                <div className="OrganicResult">
                  <a href={`${e.link}`}>{e.title}</a>
                  <p>{e.snippet}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;

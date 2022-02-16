import React, { useEffect, useState } from "react";
import NewsData from "../NewsMockData";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import "./news.css";

const News = () => {
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetNews = (url) => {
    setLoading(true);
    setData(null);
    axios
      .get(url)
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

  useEffect(() => {
    GetNews(
      "https://serpapi.com/search.json?q=news&tbm=nws&api_key=53bc389b1341720f6ea8d5cf06c2d86ed78805d033f52cc3c8f91974937f6068"
    );
  }, []);

  const NewsTile = (element) => {
    return (
      <div className="newsTile">
        <a href={`${element.link}`}>{element.title}</a>
        <div className="newsContent">
          <div>
            <p>{element.snippet}</p>
          </div>

          <div
            className="newsImg"
            style={{ backgroundImage: `url("${element.thumbnail}")` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading && <CircularProgress />}
      {Data && (
        <div>
          {Data && (
            <div className="newsContainer">
              {Data.news_results.map((e) => NewsTile(e))}
            </div>
          )}
          {Data && (
            <div className="pagination">
              {Data.serpapi_pagination.current > 1 && (
                <Button
                  variant="contained"
                  onClick={() =>
                    GetNews(
                      `https://serpapi.com/search.json?start=${
                        (Data.serpapi_pagination.current - 2) * 10
                      }&q=news&tbm=nws&api_key=53bc389b1341720f6ea8d5cf06c2d86ed78805d033f52cc3c8f91974937f6068`
                    )
                  }
                >
                  Back
                </Button>
              )}
              <div className="page">{Data.serpapi_pagination.current}</div>
              <Button
                variant="contained"
                onClick={() =>
                  GetNews(
                    `https://serpapi.com/search.json?start=${
                      Data.serpapi_pagination.current * 10
                    }&q=news&tbm=nws&api_key=53bc389b1341720f6ea8d5cf06c2d86ed78805d033f52cc3c8f91974937f6068`
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default News;

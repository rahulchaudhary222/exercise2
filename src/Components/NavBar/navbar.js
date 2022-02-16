import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  let navigate = useNavigate();
  const [page, setpage] = useState(0);
  useEffect(() => {
    if (window.location.pathname.includes("news")) {
      setpage(1);
    } else {
      setpage(0);
    }
  }, [window.location.pathname]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h4
            onClick={() => navigate("exercise2")}
            style={page == 0 ? { color: "white" } : {}}
          >
            Home
          </h4>
          <h4
            onClick={() => navigate("exercise2/news")}
            style={page == 1 ? { color: "white" } : {}}
          >
            News
          </h4>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

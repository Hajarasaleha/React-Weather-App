import "./InfoBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Report from "./Report";
export default function InfoBox({ info, userToken }) {
  const [showReport, setShowReport] = useState(false);
  const navigate = useNavigate();
  const handleReport = async () => {
    try {
      const response = await fetch("http://localhost:3001/report", {
        method: "GET",
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      const data = await response.json();
      console.log(data);
      navigate("/report");
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const image_url =
    "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg";
  let HOT_URL =
    "https://media.istockphoto.com/id/813720840/photo/summer-heat-wave-in-the-city.jpg?s=1024x1024&w=is&k=20&c=xZ5TYSoESRttplQlPx7uikemlSL6pOc-a9BX-RGSKxg=";
  let COLD_URL =
    "https://media.istockphoto.com/id/477839825/photo/cold-weather-ahead-road-warning-sign.jpg?s=1024x1024&w=is&k=20&c=P2bnTOn0JYewI0b7NhbDImnwXgzedGgjPlnpN_F91KA=";
  let RAIN_URL =
    "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=1024x1024&w=is&k=20&c=U6uwI27fEfgEAl9j_Hz848FgLRidd9Ww0kPCkc0FZB8=";

  return showReport ? (
    <Report userToken={userToken} />
  ) : (
    <div className="infobox">
      <div className="card">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={
              info.humidity > 80
                ? RAIN_URL
                : info.temp > 20
                ? HOT_URL
                : COLD_URL
            }
            title="green iguana"
          />
          <CardContent style={{ backgroundColor: "#f4acb7" }}>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}{" "}
              {info.humidity > 80 ? (
                <ThunderstormIcon />
              ) : info.temp > 15 ? (
                <WbSunnyIcon />
              ) : (
                <AcUnitIcon />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">
              <p>Temparature:{info.temp}&deg;C</p>
              <p>Humidity:{info.humidity}</p>
              <p>
                Weather will be <b>{info.weather}</b> and feels like{" "}
                {info.feelsLike}&deg;C
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
      <button onClick={handleReport} className="report">
        Show Report
      </button>
    </div>
  );
}

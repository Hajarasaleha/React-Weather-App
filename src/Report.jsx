import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Report({ userToken }) {
  const [report, setReport] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("http://localhost:3001/report", {
          headers: { token: userToken },
        });
        setReport(res.data);
      } catch (err) {
        setError("Failed to fetch report");
      }
    };
    fetchReport();
  }, [userToken]);
  const goBackToWeatherApp = () => {
    navigate("/weather"); // Redirects to /weather
  };
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Weather Search Report</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {report.length > 0 ? (
        <table border="1" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>City</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Description</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.city}</td>
                <td>{item.temperature}°C</td>
                <td>{item.humidity}%</td>
                <td>{item.weather_description}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
      <button
        onClick={goBackToWeatherApp}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "brown",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back to Weather App
      </button>
    </div>
  );
}

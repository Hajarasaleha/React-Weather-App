import {useState,useEffect} from "react";
import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useNavigate } from "react-router-dom";

export default function WeatherApp({ setToken }){
  const navigate = useNavigate();
const [weatherInfo,setWeatherInfo]=useState({
    city:"Machilipatnam",
    feelslike:40.89,
    weather:"broken clouds",
    temp:33.89,
    min:33.89,
    max:33.89,
    humidity:65

})
//const userToken = "your_token_here";
const userToken = localStorage.getItem("userToken"); // Retrieve token
useEffect(() => {
  if (!userToken) {
    navigate("/signup", { replace: true });
  }
}, [userToken, navigate]);

let updateInfo=(newInfo)=>{
  setWeatherInfo(newInfo)
}
const handleLogout = () => {
  console.log("Logout button clicked");
  localStorage.removeItem("userToken"); // Remove the token
  console.log("Token removed from localStorage");
  setToken(null); 
  navigate("/signup", { replace: true });
};
    return (<div style={{textAlign:"center"}}>
       <h2 style={{color:"brown"}}>Weather App</h2>
       <SearchBox updateInfo={updateInfo}/>
       <InfoBox info={weatherInfo} userToken={userToken}/>
       <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
        Logout
      </button>
    </div>)
}
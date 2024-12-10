import { useState } from "react";
import "./SearchBox.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function SearchBox({updateInfo}){
    let [city,setCity]=useState("");
    let [error,setError]=useState(false)
    let API_URL="https://api.weatherstack.com/current";
    let API_KEY="0a5049bc756817efd0b6e3199791fded";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?access_key=${API_KEY}&query=${city}`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let weather = {
                city: jsonResponse.location.name,
                feelsLike: jsonResponse.current.feelslike,
                humidity: jsonResponse.current.humidity,
                temp: jsonResponse.current.temperature,
                weather: jsonResponse.current.weather_descriptions[0],
            };
            // Log the search to the backend
            await fetch("http://localhost:3001/weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: localStorage.getItem("userToken"),
                    city: weather.city,
                    temperature: weather.temp,
                    humidity: weather.humidity,
                    weather_description: weather.weather,
                }),
            });
            return weather;
        } catch (error) {
            throw error;
        }
    };
    

    let handleChange=(event)=>{
        setCity(event.target.value)
        setError(false)
    }

    let handleSubmit=async(event)=>{
        try{
       event.preventDefault();
       console.log(city)
       setCity("");
     let newInfo= await getWeatherInfo();
     updateInfo(newInfo);
    }catch(error){
        setError(true);
    }
    }
    return (
        <div className='searchbox'>
            <form onSubmit={handleSubmit}>
            
            <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange}  required/>
            <Button className="search-btn" variant="contained" type="submit" style={{marginLeft:"20px",marginTop:"8px",backgroundColor:"darkgoldenrod"}}>
                Search
            </Button>
            
            {error && <p style={{color:"red"}}>No such place in our API</p>}
            </form>
        </div>
    )
}
//searchbox
'use client'
import Details from "@/components/Details";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Temp from "@/components/Temp";
import axios from "axios";
import { SetStateAction, useEffect, useRef, useState } from "react";

export default function Home() {

  const [response,setResponse] = useState<any>()
  const [city,setCity] = useState<string>('')
  const [error,setError] = useState<boolean>(false)


  const searchCity = (e: { target: { value: SetStateAction<string>; }; }) => {
  setError(false)  
  setCity(e.target.value)
  }  

  const getWeather = async () => {
    try {
      const res = await axios.get(`/api/weather?city=${city}`)
      setResponse(res.data)
      console.log(res.data)
    } catch (err) {
      console.error("Frontend fetch error:", err)
      setError(true)
    }
  }

  useEffect(() => {
    getWeather()
  } , [])

  console.log(error)

  const getHourlyCloud = (forecastDay: any) => {
    const hours = [9, 15, 18, 21];
    const result: Record<number, number | null> = {}
  
    hours.forEach(h => {
      const hourData = forecastDay?.hour?.find(
        (hour: any) => new Date(hour.time).getHours() === h
      );
      result[h] = hourData ? Math.floor(hourData.cloud) : null
    });
  
    return result
  };

  const hourlyCloud = getHourlyCloud(response?.forecast?.forecastday[0]) 

  return (
     <>
    <div 
     className="   relative w-full h-screen bg-cover bg-center bg-[url('/bg-weather.svg')] [@media_(min-width:747px)_and_(max-width:1050px)]:bg-[url('/tablet-bg.svg')]  [@media_(min-width:1050px)_and_(max-width:1736px)]:bg-[url('/bg-desktop.svg')]  "  >
     <div className="flex justify-between p-7">
      <Logo />
      <Search 
      setCity={setCity}
      searchCity={searchCity} city={city} getWeather={getWeather}/>
     </div>
     {error && (<p className="text-red-600 flex absolute right-7 top-13">City not found</p>)}
     <Temp 
     localTime={response?.location?.localtime}
     cityName={response?.location?.name}
     temp={Math.floor(response?.current?.temp_c)}/>
    <Details
     maxTemp={Math.floor(response?.forecast?.forecastday[0]?.day?.maxtemp_c)}
     minTemp={Math.floor(response?.forecast?.forecastday[0]?.day?.mintemp_c)}
     humidity={Math.floor(response?.current?.humidity)}
     cloudy={Math.floor(response?.forecast?.forecastday[0]?.hour[0]?.cloud)}
     wind={Math.floor(response?.current?.wind_kph)}
     setCity={setCity}
     searchCity={searchCity}
     city={city} 
     getWeather={getWeather}
     condition={response?.forecast?.forecastday[0]?.hour[0]?.condition?.text}
     cloud9={hourlyCloud[9]}
     cloud15={hourlyCloud[15]}
     cloud18={hourlyCloud[18]}
     cloud21={hourlyCloud[21]}
    />
    </div>
     </>
  );
}
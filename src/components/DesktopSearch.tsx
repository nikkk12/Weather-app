'use client'

import axios from "axios"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type PropType =   {
    searchCity: (e: React.ChangeEvent<HTMLInputElement>) => void,
    city : string
    getWeather: () => void
    setCity: any
}

export default function DesktopSearch({searchCity , city , getWeather,setCity } : PropType) {

   const handleClick = () => {
    getWeather();
    setCity('')
   }

   const [show,setShow] = useState<boolean>(false)
   const [suggestions, setSuggestions] = useState<any[]>([]);
   const wrapperRef = useRef<HTMLDivElement>(null)

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
     setCity(value);
     setShow(false)

     if (value.length > 1) {
       try {
         const res = await axios.get(
           `https://api.weatherapi.com/v1/search.json?key=196cbe371f1c40f9ba3113741241402&q=${value}`
         );
         setSuggestions(res.data);
       } catch (err) {
         console.error("Autocomplete error:", err);
       }
     } else {
       setSuggestions([]);
     }
   };
 
   const handleSelect = (name: string) => {
     setCity(name);
     setSuggestions([]);
     getWeather();
     setCity('')
   };

  useEffect(() => {
    const handleClickOutside = (e : MouseEvent) => {
      if(wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSuggestions([])
      }
    } 
  
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  } , [])

  return (
    <div 
    ref={wrapperRef}
    className="border-b hidden border-[#ffffff]  w-[250px] h-12 [@media_(min-width:747px)_and_(max-width:1050px)]:w-[350px] justify-between  [@media_(min-width:1050px)_and_(max-width:1736px)]:flex self-start  ">
        <input
        value={city}
        onChange={(e) => {handleChange(e); searchCity(e)}}
        onKeyDown={(e) => {
          if (e.key === "Enter") {5
            getWeather();    
            setCity('');     
          }
        }}
        className="text-[#ffffff] w-[135px] outline-none"
        type="text" placeholder='Search Location...' />
        <button onClick={() => {handleClick(); setShow(true)}}>
        <Image 
         src="/Desktop-search.svg"
         alt="search btn"
         width={24}
         height={28}
        />
        </button>
        {suggestions.length > 0 && !show && (
      <ul className="absolute mt-13 mr-7.5 bg-white/90 rounded-md shadow-lg text-black">
        {suggestions.map((s) => (
          <li
            key={s.id}
            onClick={() => handleSelect(s.name)}
            className="p-2 hover:bg-blue-200 cursor-pointer"
          >
            {s.name}, {s.country}
          </li>
        ))}
      </ul>
    )} 
    </div>
  )
}

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

export default function Search({searchCity , city , getWeather,setCity } : PropType) {

   const [show,setShow] = useState<boolean>(false)
   const wraperRef = useRef<HTMLDivElement>(null)

   const handleClick = () => {
    getWeather();
    setCity('')
   }

   const [suggestions, setSuggestions] = useState<any[]>([]);

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
      if(wraperRef.current && !wraperRef.current.contains(e.target as Node)){
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown' , handleClickOutside)
    return () => {
      document.addEventListener('mousedown' , handleClickOutside)
    }
   } , [])

  return (
    <div
    ref={wraperRef}
    className=" border-b flex border-[#ffffff]   h-5  [@media_(min-width:747px)_and_(max-width:1050px)]:w-[350px] justify-between [@media_(min-width:1050px)_and_(max-width:1736px)]">
    <input
      type="text"
      value={city}
      onChange={(e) => {handleChange(e); searchCity(e)}}
      placeholder="Search Location..."
      className="text-[#ffffff] w-[135px] outline-none"
    />
    <button onClick={() => {handleClick(); setShow(true)}}>
          <Image 
         className="[@media_(min-width:747px)_and_(max-width:1050px)]:w-[18px]"
         src="/search.svg"
         alt="search btn"
         width={12}
         height={11}
        />
        </button>
    {suggestions.length > 0 && !show && (
      <ul className="absolute mt-6 mr-3.5 bg-white/90 rounded-md shadow-lg text-black">
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
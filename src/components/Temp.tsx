import Image from "next/image"
import CurrentTime from "./Current-time"

type PropType = {
    temp : number
    cityName : string
    localTime: any
}

export default function Temp({temp , cityName ,localTime } : PropType) {
  return (
    <div className="flex my-30  gap-6 items-center p-7 ml-0  [@media_(min-width:1050px)_and_(max-width:1736px)]:absolute bottom-10 left-20 ">
        <h1 className="text-white text-8xl flex justify-end">{temp | 0}°</h1>
        <div className="flex items-center gap-2">
        <div>
           <h2 className="text-white text-2xl">{cityName || "Tbilisi"}</h2>
           <p className="text-white w-35 ">
            <CurrentTime localtime={localTime} />
           </p>
        </div>
        <Image 
        className="flex self-end"
         src="/Cloudy.svg"
         alt="cloudy"
         width={40}
         height={40}
        />
        </div>
    </div>
  )
}

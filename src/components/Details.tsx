import Image from "next/image"
import DesktopSearch from "./DesktopSearch"

type PropType = {
    maxTemp: number
    minTemp: number
    humidity: number
    cloudy: number
    wind: number
    searchCity: (e: React.ChangeEvent<HTMLInputElement>) => void,
    city : string
    getWeather: () => void
    setCity: any
    condition: string
    cloud9: number | null
    cloud15: number | null
    cloud18: number | null
    cloud21: number | null
}

export default function Details({maxTemp , minTemp ,cloudy,humidity ,wind,searchCity,setCity,city,getWeather , condition , cloud9,cloud15,cloud18,cloud21} : PropType) {

  return (
    <div className="flex absolute bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md  bg-white/15  shadow-lg justify-self-end w-full flex-col  overflow-hidden items-center  bg-cover bg-center   p-[35.6px] [@media_(min-width:1050px)_and_(max-width:1736px)]:absolute [@media_(min-width:1050px)_and_(max-width:1736px)]:top-0 [@media_(min-width:1050px)_and_(max-width:1736px)]:right-0  [@media_(min-width:1050px)_and_(max-width:1736px)]:gap-5 [@media_(min-width:1050px)_and_(max-width:1736px)]:h-screen [@media_(min-width:1050px)_and_(max-width:1736px)]:border-none ">
        <DesktopSearch searchCity={searchCity} setCity={setCity} city={city} getWeather={getWeather} />
        <h2 className="text-amber-50 mt-6 [@media_(min-width:1050px)_and_(max-width:1736px)]:self-start"> Weather Details...</h2>
        <h1 className="text-amber-50 m-4 [@media_(min-width:1050px)_and_(max-width:1736px)]:self-start ml-0 ">{condition}</h1>
        <div>
            <div className="w-[full] flex justify-between">
                <h2 className="text-amber-50">Temp max</h2>
                <div className="flex gap-4  w-[65px] justify-between">
                    <p className="text-amber-50 w-2" >{maxTemp || 0}°</p>
                    <Image
                    src="/tempmax.svg"
                    alt="max-temp"
                    width={20}
                    height={15}
                    /> 
                </div>
            </div>
            <div className="w-[250px] flex justify-between my-2   [@media_(min-width:747px)_and_(max-width:1050px)]:w-[450px]  ">
            <h2 className="text-amber-50">Temp min</h2>
                <div className="flex gap-4  w-[65px] justify-between">
                    <p className="text-amber-50 w-2">{minTemp || 0}°</p>
                    <Image
                    src="/tempmin.svg"
                    alt="min-temp"
                    width={20}
                    height={15}
                    />
                </div>
            </div>
            <div className="w-[250px] flex justify-between my-2  [@media_(min-width:747px)_and_(max-width:1050px)]:w-[450px]   ">
            <h2 className="text-amber-50">Humadity</h2>
                <div className="flex gap-4  w-[65px] justify-between">
                    <p className="text-amber-50 w-2">{humidity || 0}°</p>
                    <Image
                    src="/humadity.svg"
                    alt="humadity"
                    width={20}
                    height={15}
                    />
                </div>
            </div>
            <div className="w-[250px] flex justify-between my-2   [@media_(min-width:747px)_and_(max-width:1050px)]:w-[450px]  ">
            <h2 className="text-amber-50">Cloudy</h2>
                <div className="flex gap-4  w-[65px] justify-between">
                    <p className="text-amber-50 w-2">{cloudy || 0}°</p>
                    <Image
                    src="/cloudy-details.svg"
                    alt="cloudy"
                    width={20}
                    height={15}
                    />
                </div>
            </div>
            <div className="w-[250px] flex justify-between my-2   [@media_(min-width:747px)_and_(max-width:1050px)]:w-[450px]  ">
            <h2 className="text-amber-50">Wind</h2>
                <div className="flex  w-[90px] gap-5.5">
                    <p  className="text-amber-50 h-[25px] w-12">{`${wind || 0}km/h`}</p>
                    <Image
                    src="/wind.svg"
                    alt="wind"
                    width={20}
                    height={15}
                    />
                </div>
            </div>
            <div className="hidden [@media_(min-width:1050px)_and_(max-width:1736px)]:block h-[50px] border-b-2 border-white">
                </div> 
        </div>
       <div className="hidden [@media_(min-width:1050px)_and_(max-width:1736px)]:block self-start ">
          <h2 className="text-white mb-10 mt-4">Today's Weather Forecast...</h2>
          <p className="text-white w-40 mb-5"> 9 AM: {cloud9}% cloudy</p>
          <p className="text-white w-40 mb-5">15 PM: {cloud15}% cloudy</p>
          <p className="text-white w-40 mb-5">18 PM: {cloud18}% cloudy</p>
          <p className="text-white w-40">21 PM: {cloud21}% cloudy</p>
        </div> 
    </div>
  )
}

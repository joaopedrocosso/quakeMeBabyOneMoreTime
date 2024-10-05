import { BiSolidReport } from "react-icons/bi";
import { GiPlanetCore } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { WiEarthquake } from "react-icons/wi";

export const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#011221] shadow-md md:hidden">
        <div className="flex justify-around py-4">
        <button
            className="flex flex-col gap-2 items-center text-gray-400 hover:text-blue-500"
        >
            <GiPlanetCore className="text-2xl" />
            <span className="text-sm">Missions</span>
        </button>

        <button
            className="flex flex-col gap-2 items-center text-gray-400 hover:text-blue-500"
        >
            <WiEarthquake className="text-2xl" />
            <span className="text-sm">Events</span>
        </button>

        <button
            className="flex flex-col gap-2 items-center text-gray-400 hover:text-blue-500"
        >
            <RiRobot2Fill className="text-2xl" />
            <span className="text-sm">Models</span>
        </button>

        <button
            className="flex flex-col gap-2 items-center text-gray-400 hover:text-blue-500"
        >
            <BiSolidReport className="text-2xl" />
            <span className="text-sm">Analysis</span>
        </button>
        </div>
    </div>
  )
}

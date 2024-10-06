import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { PiRocketLaunchFill } from "react-icons/pi";

interface EventsProp {
  event: {
    id: number;
    filename: string;
    station: string;
    starttime: string;
  }
}

const ListItems = ( {event} : EventsProp) => {
  const [filename, setFilename] = useState(event.filename)
  const dateTime = getTimestamp();

  window.matchMedia("(max-width: 768px)").addEventListener('change', e => {
    setFilename(displayFilename(event.filename, 20))
  });

  function getTimestamp() {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date(event.starttime);
    
    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function displayFilename(fullName: string, maximumSize: number){
    const size = fullName.length;

    if (size < maximumSize){
        return fullName;
    } else {
        const nameTmp = fullName.substring(0, maximumSize);
        const extension =  fullName.split('.').pop();
        return nameTmp+"..."+extension;
    }
  };

  return (
    <Card key={event.id} className="px-2 mt-2 bg-[#011221] border-none">
      <CardHeader className="flex flex-row text-start pr-2 pb-2 pt-2 pb-2 justify-between">
          <div className="items-center pl-4 pr-1">
              <CardTitle className="text-white text-md md:text-lg">{dateTime} - {event.station}</CardTitle>
              <CardDescription><p>{filename}</p></CardDescription>
          </div>
          <div className="flex items-center">
            <Button 
                className="px-4 py-4 bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_14px_20px_rgba(41,140,234,0.5)] transition-all tracking-wide text-md"
              >
                <PiRocketLaunchFill className="w-5 h-5" />
            </Button>
          </div>
      </CardHeader>
    </Card>
  );
};

export default ListItems;
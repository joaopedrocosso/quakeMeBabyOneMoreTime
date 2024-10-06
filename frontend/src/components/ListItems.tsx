import { useState } from "react";

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
    setFilename(displayFilename(event.filename, 25))
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
    <li key={event.id} className="border border border-white w-full pt-4 pb-4 text-left pl-2 pr-2 lg:pl-4">
      <p>{filename}</p>
      <span>{dateTime} - {event.station}</span>
    </li>
  );
};

export default ListItems;
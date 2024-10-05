'use client'

import Scene from "@/components/Scene";
import Moon from "@/components/Moon";
import Mars from "@/components/Mars";

import { useState, useEffect } from 'react';


export default function Home() {
  const [isPositionSphereCenter, setIsPositionSphereCenter] = useState({moon:false, mars:false})

  return (
    <section>
      <div>
        <header className="absolute inset-x-0 top-14 lg:top-16 z-10 text-center flex justify-center">
          <h1 className="max-w-5xl text-white text-3xl lg:text-6xl font-bold">Seismic Detection Across the Solar System</h1>
        </header>
        <Scene>
          <Mars isPositionSphereCenter={isPositionSphereCenter.mars}/>
          <Moon isPositionSphereCenter={isPositionSphereCenter.moon}/>
        </Scene>
        <footer className="absolute inset-x-0 bottom-28 lg:bottom-32 z-10 text-center flex justify-around">
            <button className="text-white rounded-3xl border border-white w-48 h-12">
              Choose mars
            </button> 
            <button  className="text-white rounded-3xl border border-white w-48 h-12">
              Choose moon
            </button>
        </footer>
      </div>
    </section>
  );
}
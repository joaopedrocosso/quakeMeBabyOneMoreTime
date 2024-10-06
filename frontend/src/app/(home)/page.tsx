'use client'

import Scene from "@/components/Scene";
import Moon from "@/components/Moon";
import Mars from "@/components/Mars";


export default function Home() {
  return (
    <section>
      <div>
        <header className="absolute inset-x-0 top-28 lg:top-24 z-10 text-center flex justify-center">
          <h1 className="max-w-md lg:max-w-5xl text-white text-3xl lg:text-6xl font-bold">Seismic Detection Across the Solar System</h1>
        </header>
        <Scene enableControl={false}>
          <Mars isPageHome={true}/>
          <Moon isPageHome={true}/>
        </Scene>
        <footer className="absolute inset-x-0 bottom-48 lg:bottom-32 z-10 text-center flex justify-around">
            <button className="text-white rounded-3xl border border-white w-48 h-12 lg:w-52 lg:h-14 text-base hover:bg-gray-900">
              Choose mars
            </button> 
            <button  className="text-white rounded-3xl border border-white w-48 h-12 lg:w-52 lg:h-14 text-base hover:bg-gray-900">
              Choose moon
            </button>
        </footer>
      </div>
    </section>
  );
}
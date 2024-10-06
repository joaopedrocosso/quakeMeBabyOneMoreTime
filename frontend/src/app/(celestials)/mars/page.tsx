// @ts-nocheck
'use client'

import Scene from "@/components/Scene";
import Mars from "@/components/Mars";
import { CelestialInfoCard, CelestialModelInfoCard } from "@/components/CelestialInfoCard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'

const regions = RegionsPlugin.create()

const optionsWave = (ref: HTMLDivElement) => ({
    container: ref,
    height: 100,
    waveColor: "#b0b0b0",
    progressColor: "#c1c1c1",
    cursorColor:"#ffffffe6",
    fillParent: true,
    mediaControls: false,
    barHeight:2,
    barGap: 3,
    responsive: true,
    plugins: [regions]
})

const infos = {
  title: "Event information",
  description: "",
  info: {
    "id": 1,
    "body": "mars",
    "filename": "XB.ELYSE.02.BHV.2022-02-03HR08_evid0005.mseed",
    "arrival_time_abs": "2022-02-03T08:00:00.009000Z",
    "arrival_time_rel": null,
    "evid": null,
    "mq_type": null,
    "network": "XB",
    "station": "ELYSE",
    "location": "02",
    "channel": "BHV",
    "starttime": "2022-02-03T08:00:00.009000Z",
    "endtime": "2022-02-03T08:59:59.959000Z",
    "sampling_rate": 20.0,
    "delta": 0.05,
    "npts": 72000,
    "calib": 1.0,
    "mseed": null
  }
}

export default function MarsPage () {
  const [isQuaking, setIsQuaking] = useState(false);
  const waveFormRef = useRef<HTMLDivElement>(null!);
  const waveRef = useRef<WaveSurfer>(null!);
  const [count, setCount] = useState(0)

  const url = "/audio/saida_audio.wav";
  const quakeTime = 7;

    useEffect(() => {
        // Exit early if countdown is finished
        if(count == 0) return;

        if ((count) >= quakeTime) {
            setIsQuaking(true);
            return;
        }

        // Set up the timer
        const timer = setInterval(() => {
            setCount((prevcount) => prevcount + 1);
        }, 1000);
        // Clean up the timer
        return () => clearInterval(timer);
    }, [count]);

    useEffect(() => {
        const options = optionsWave(waveFormRef.current);
        waveRef.current = WaveSurfer.create(options);
        waveRef.current.load(url);

        waveRef.current.on('decode',() => {
            regions.addRegion({
                start: quakeTime,
                contentEditable: false,
                resize: false,
                drag: false,
                content: 'quake',
                color: "#c40a0a",
            })
        });

        return () => {
            if (waveRef.current) {
              waveRef.current.destroy();
            }
        };

    },[])

    const onPlay = () => {
        setCount(2);
        setIsQuaking(false);
        waveRef.current.setTime(0);
        waveRef.current.play();
        console.log("play", waveRef.current);
    }


  return (
    <>
      <div className="hidden lg:flex align-center absolute z-10 left-20 lg:left-40 h-screen">
        <CelestialInfoCard title={infos.title} description={infos.description} info={infos.info} />
      </div>
      <div className="hidden lg:flex align-center absolute z-10 right-20 lg:right-40 h-screen">
        <CelestialModelInfoCard title={infos.title} description={infos.description} info={infos.info} />
      </div>
      <div className="block lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute top-32 w-full z-10 text-center m-auto">
              <button className="text-white rounded-3xl border border-white w-48 h-12 lg:w-52 lg:h-14 text-base hover:bg-gray-900">
                Show Data
              </button> 
            </div>
          </DialogTrigger>
          <DialogContent className="pt-1 text-sm text-white overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-white mt-2">{infos.title}</DialogTitle>
              <DialogDescription className="text-white max-w-2xl m-auto">
                <span className="text-center">
                  {infos.description}
                </span>
                <div className="mt-8">
                  <ol>
                      <li><b>filename:</b> {infos.info.filename}</li>
                      <li><b>location:</b> {infos.info.location}</li>
                      <li><b>starttime:</b> {infos.info.starttime}</li>
                      <li><b>endtime:</b> {infos.info.endtime}</li>
                      <li><b>sampling_rate:</b> {infos.info.sampling_rate}</li>
                      <li><b>endtime:</b> {infos.info.endtime}</li>
                      <li><b>sampling_rate:</b> {infos.info.sampling_rate}</li>
                  </ol>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Scene enableControl={true}>
        <Mars isPageHome={false} isQuaking={isQuaking} setIsQuaking={setIsQuaking}/>
      </Scene>
      <div className="absolute bottom-32 lg:bottom-20 w-full z-10 text-center m-auto">
      <div className="w-3/5 lg:w-1/4 m-auto text-red-800">
            <button onClick={()=> onPlay()} className="text-white rounded-3xl border border-white w-48 h-12 lg:w-52 lg:h-14 text-base hover:bg-gray-900">
                Play
            </button> 
            <div ref={waveFormRef}/>
        </div>
      </div>
    </>
  )
}
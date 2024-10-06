'use client'
import { useState } from "react";
import { BiSolidReport } from "react-icons/bi";
import { GiPlanetCore } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { WiEarthquake } from "react-icons/wi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import NavBarItem from "./NavBarItem";
import ListItems from "./ListItems";

interface EventsItem {
    id: number;
    filename: string;
    station: string;
    starttime: string;
}

export const BottomNavBar = () => {

    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [data, setData] = useState([]);

    const fetchAllData = async() => {
        try{
            const response = await fetch("http://localhost:8000/list_events", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            });
            const data = await response.json();

            if(!data)
                throw "Error"

            console.log(data);
            setData(data);
        } catch(error) {
            console.log(error);
        } finally {
            return
        }
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#011221] shadow-md md:hidden">
            <div className="flex justify-between items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full">
                            <NavBarItem 
                                label="MISSIONS" 
                                icon={<GiPlanetCore />} 
                                activeButton={activeButton} 
                                setActiveButton={setActiveButton} 
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Where do you want to go?</DialogTitle>
                            <DialogDescription>
                                <span>
                                    Select an event, watch it shaking the ground, being detected and analysed by our model, listen to how it would sound and view how the S.O.D.I.M. can help identifying and broadcasting the data back to Earth. 
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild onPointerDown={() => fetchAllData()}>
                        <div className="w-full">
                            <NavBarItem 
                                label="EVENTS" 
                                icon={<WiEarthquake />} 
                                activeButton={activeButton} 
                                setActiveButton={setActiveButton} 
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Visualize an Event</DialogTitle>
                            <DialogDescription>
                                <span>
                                    Select an event, watch it shaking the ground, being detected and analysed by our model, listen to how it would sound and view how the S.O.D.I.M. can help identifying and broadcasting the data back to Earth. 
                                </span>
                                <ul className="mt-8">
                                    {data?.map((item: EventsItem) => (
                                        <ListItems key={item.id} event={item}/>
                                    ))}
                                </ul>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full">
                            <NavBarItem 
                                label="MODELS" 
                                icon={<RiRobot2Fill />} 
                                activeButton={activeButton} 
                                setActiveButton={setActiveButton} 
                            />
                        </div>
                    </DialogTrigger>

                    <DialogContent className="max-h-screen overflow-auto">
                        <DialogHeader>
                            <DialogTitle>The Model</DialogTitle>
                            <DialogDescription>
                                <div className="flex flex-col gap-0.2">
                                    <span>
                                        The seismic detection data consists of measurements of the velocity in m/s at which waves propagate through rocks. 
                                    </span>
                                    <br/>
                                    <span>
                                        Training a Machine Learning model on such limited data presents a significant learning challenge. Therefore, it is vital to generate valuable information for the model through feature engineering.
                                    </span>
                                    <br/>
                                    <span>
                                        Based on the velocity of seismic waves and the sampling rate, we conducted an advanced data processing to generate various features with relevant information that can help identify the arrival of a quake. These features include:
                                    </span>
                                    <br/>
                                    <ul className="flex flex-row justify-center gap-6">
                                        <li>
                                            <strong>Accumulated energy</strong>,
                                        </li>
                                        <li>
                                            <strong>counts of peaks and troughs</strong>,
                                        </li>
                                    </ul>
                                    <ul className="flex flex-row justify-center gap-6">
                                        <li>
                                            <strong>standard deviation of velocity</strong>,
                                        </li>
                                        <li>
                                            <strong>signal frequency</strong>,
                                        </li>
                                    </ul>
                                    <ul className="flex flex-row justify-center gap-6">
                                        <li>
                                            <strong>and acceleration of the seismic waves</strong>.
                                        </li>
                                    </ul>
                                    <br/>
                                    <span>
                                        This data is generated through a sliding window over the measurements, producing relevant insights for understanding quakes on the surfaces of the Moon and Mars.
                                    </span>
                                    <br/>

                                    <h1 className="mt-5 text-lg text-white font-semibold leading-none tracking-tight">
                                        The Model Training
                                    </h1>
                                    <br/>
                                    <span>
                                        The model training was approached with a supervised classification logic, labeling the data based on the arrival times of known seismic events, which were assigned a boolean marker: 0 for noise and 1 for quakes.
                                    </span>
                                    <br/>
                                    <span>
                                        Thus, to identify the onset of an earthquake, we simply used the model to classify the data and find the relative time of the first record considered by the model as an quake, which consequently allowed us to determine the beginning of a seismic event.
                                    </span>
                                    <br />
                                    <span>
                                        Based on this data, a deep neural network model was developed and trained using the Adam optimizer with a Mean Squared Error (MSE) loss function and 100 training epochs with early stopping. 
                                    </span>
                                    <br />
                                    <span>
                                        The ideal architecture of the model was observed to be:
                                    </span>
                                    <br />
                                    <span>
                                        Through this process, the Seismic Onset Detection Intelligent Model (S.O.D.I.M.) was born, capable of identifying the onset of seismic events and differentiating them from noise in the signals, allowing for a reduction in the volume of data that should be transmitted back to Earth by the probe.
                                    </span>
                                    <br />
                                    <span>
                                        In this way, S.O.D.I.M. enables the transmission of only relevant data that can be used in studies to aid in understanding the interiors of remarkable planetary bodies such as the Moon and Mars. 
                                    </span>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Analysis */}
                {/* Todo: Organize elements in the sampling rate entry on the desktop */}
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full">
                            <NavBarItem 
                                label="ANALYSIS" 
                                icon={<BiSolidReport />} 
                                activeButton={activeButton} 
                                setActiveButton={setActiveButton} 
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Make your analysis</DialogTitle>
                            <DialogDescription>
                                <span>
                                    Upload any detection file in CSV format and provide the sampling rate of the data, and our app will take care of the rest.
                                </span>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="w-full m-auto px-12 sm:px-8 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:m-4/12 flex flex-col gap-2">
                            <div className="relative group w-full h-12 flex flex-row items-center justify-center">
                                <div aria-hidden='true' className="absolute inset-0 w-full h-full rounded-xl bg-[#011221] bg-opacity-80 backdrop-blur-xl group-hover:bg-opacity-60 transition duration-300 shadow-3xl border border-[#000]"></div>

                                <input 
                                    type="number" 
                                    name="spRate"
                                    id="spRate"
                                    placeholder="6.625"
                                    className="text-white bg-[#00050C] rounded-md pl-2 border border-[#788CA0] relative z-10 w-20 h-8 ml-auto mr-4"
                                />

                                <div className=" items-center absolute inset-0 w-full h-full flex cursor-pointer">
                                    <div className="flex flex-row ml-4 gap-3">
                                        <img 
                                            src="/docUpload.jpg" 
                                            alt="Upload Illustration" 
                                            className="w-5 m-auto sm:w-40"
                                        />
                                        <p className="space-x-2 block text-[#788CA0] text-md text-center">
                                            <span>Sampling rate</span>
                                            <strong>[Float]</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group w-full h-64 flex items-center justify-center">
                                <div aria-hidden='true' className="absolute inset-0 w-full h-full rounded-xl bg-[#011221] bg-opacity-80 backdrop-blur-xl group-hover:bg-opacity-60 group-hover:scale-90 transition duration-300 shadow-3xl border border-[#000]"></div>
                                <input 
                                    type="file" 
                                    name="csvFile"
                                    id="csvFile"
                                    accept=".csv"
                                    className="relative z-10 opacity-0 w-full h-full"
                                />

                                <div className="flex justify-center items-center absolute inset-0 w-full h-full flex cursor-pointer">
                                    <div className="space-y-6">
                                        <img 
                                            src="/docUpload.jpg" 
                                            alt="Upload Illustration" 
                                            className="w-32 m-auto sm:w-40"
                                        />
                                        <p className="text-[#788CA0] text-md text-center">
                                            <span className="block">Drag and drop a background or</span>
                                            <label htmlFor="csvFile" className="text-blue-600">click to upload</label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mx-auto my-12">
                            <Button className="px-12 py-4 bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_14px_20px_rgba(41,140,234,0.5)] transition-all tracking-wide text-md">
                                Submit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    );
};

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import NavBarItem from "./NavBarItem";
import ListItems from "./ListItems";

interface EventsItem {
    id: number;
    filename: string;
    station: string;
    starttime: string;
}
import { PlanetTravelCard } from "./PlanetTravelCard";
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image";
import { usePathname } from "next/navigation";

export const BottomNavBar = () => {

    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [data, setData] = useState([]);


    const pathname = usePathname();
    console.log(pathname)

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => setIsDialogOpen(false);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#011221] shadow-md">
            <div className="flex justify-start items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="w-full md:w-auto">
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
                            <DialogDescription className="pb-4">
                                <span>
                                    Wouldn't it be cool to visualize and listen to seismic events that took place on the Moon or Mars? Choose your destination and we'll give you this experience!
                                </span>
                            </DialogDescription>

                            <PlanetTravelCard 
                                celestial="Mars" 
                                description="Watch the InSight mission's findings on the surface of the Red Planet and see how tectonically active it may be." 
                                icon="/icons/Mars.png" 
                                onClick={closeDialog}
                            />

                            <PlanetTravelCard 
                                celestial="Moon" 
                                description="Uncover the secrets of the lunar quakes observed through the Apollo 12, Apollo 15 and Apollo 16 missions." 
                                icon="/icons/Moon.png" 
                                onClick={closeDialog}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Outros Dialogs */}
                <Dialog>
                    <DialogTrigger asChild onPointerDown={() => fetchAllData()}>
                        <div className="w-full md:w-auto">
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
                            <DialogTitle className="md:text-center">Visualize an Event</DialogTitle>
                            <DialogDescription>
                                <span className="md:text-center">
                                    Select an event, watch it shaking the ground, being detected and analysed by our model, listen to how it would sound and view how the S.O.D.I.M. can help identifying and broadcasting the data back to Earth. 
                                </span>
                                
                                <div className="mt-6 flex flex-col gap-2">
                                    <h1 className="font-semibold text-white text-lg">
                                        Filters
                                    </h1>
                                    <div className="flex flex-row gap-2 w-full">

                                        {pathname.includes("/moon") ? (
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select the probe" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="s12">s12</SelectItem>
                                                    <SelectItem value="s15">s15</SelectItem>
                                                    <SelectItem value="s16">s16</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <div className="flex flex-row w-full items-center gap-4">
                                                <Checkbox id="insightLander" />
                                                <label htmlFor="insightLander" className="text-white text-[16px]">
                                                    InSight Lander
                                                </label>
                                            </div>
                                        )}

                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose the date" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">01/10/1976</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2">
                                    <h1 className="font-semibold text-white text-lg">
                                        Events
                                    </h1>
                                    {data?.map((item: EventsItem) => (
                                        <ListItems key={item.id} event={item}/>
                                    ))}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full md:w-auto">
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
                                <div className="flex text-[#ffffff98] flex-col gap-0.2">
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
                                    <br />
                                    <div className="flex flex-col gap-3">
                                        <Image 
                                            src='/model/processing.gif'
                                            className="rounded-lg mx-auto" 
                                            width={600} 
                                            height={338} 
                                            alt="Processing Gif"
                                        />
                                        <p className="italic text-center">
                                            1. Processing the model
                                        </p>
                                    </div>
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
                                    <div className="flex flex-col gap-3">
                                        <Image 
                                            src='/model/training.gif' 
                                            className="rounded-lg mx-auto"
                                            width={600} 
                                            height={338} 
                                            alt="Training Gif"
                                        />
                                        <p className="italic text-center">
                                            2. Training the model
                                        </p>
                                    </div>
                                    <br />

                                    <span>
                                        Based on this data, a deep neural network model was developed and trained using the Adam optimizer with a Mean Squared Error (MSE) loss function and 100 training epochs with early stopping. 
                                    </span>
                                    <br />
                                    <span>
                                        The ideal architecture of the model was observed to be:
                                    </span>
                                    <br />
                                    <div className="flex flex-col gap-3">
                                        <Image 
                                            src='/model/architecture.gif'
                                            className="rounded-lg mx-auto" 
                                            width={600} 
                                            height={338} 
                                            alt="Architecture Gif"
                                        />
                                        <p className="italic text-center">
                                            3. Model Architecture
                                        </p>
                                    </div>
                                    <br />
                                    <span>
                                        Through this process, the Seismic Onset Detection Intelligent Model (S.O.D.I.M.) was born, capable of identifying the onset of seismic events and differentiating them from noise in the signals, allowing for a reduction in the volume of data that should be transmitted back to Earth by the probe.
                                    </span>
                                    <br />
                                    <span>
                                        In this way, S.O.D.I.M. enables the transmission of only relevant data that can be used in studies to aid in understanding the interiors of remarkable planetary bodies such as the Moon and Mars. 
                                    </span>
                                    <br />
                                    <div className="flex flex-col gap-3">
                                        <Image 
                                            src='/model/inference.gif'
                                            className="rounded-lg mx-auto" 
                                            width={600} 
                                            height={338} 
                                            alt="Inference Gif"
                                        />
                                        <p className="italic text-center">
                                            4. Inference
                                        </p>
                                    </div>
                                    <br />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Analysis */}
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full md:w-auto">
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
                                <div className="pt-6 w-full m-auto px-12 sm:px-8 sm:w-8/12 md:w-96 lg:w-8/12 xl:m-4/12 flex flex-col gap-2">
                                    <div className="relative group w-full h-12 flex flex-row items-center justify-center">
                                        <div aria-hidden='true' className="absolute inset-0 w-full h-full rounded-xl bg-[#011221] bg-opacity-80 backdrop-blur-xl group-hover:bg-opacity-60 transition duration-300 shadow-3xl border border-[#000]"></div>

                                        <input 
                                            type="number" 
                                            name="spRate"
                                            id="spRate"
                                            placeholder="6.625"
                                            className="text-white bg-[#00050C] rounded-md pl-2 border border-[#788CA0] relative z-10 w-20 h-8 ml-auto mr-4"
                                        />

                                        <div className=" items-center absolute inset-0 w-full h-full flex cursor-pointer ml-4">
                                            <p className="space-x-2 block text-[#788CA0] text-md text-center">
                                                <span>Sampling rate</span>
                                                <strong>[Float]</strong>
                                            </p>
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
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="mx-auto my-12 md:my-0">
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

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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const BottomNavBar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName: any) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#011221] shadow-md md:hidden">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => handleButtonClick("missions")}
                    className={`flex flex-col gap-3 items-center text-[#FFFFFF] ${
                        activeButton === "missions" 
                            ? "w-full bg-gradient-to-t px-4 py-2 from-[#00B2FF] via-[#0AA9FA] to-[#4670DA] backdrop-blur-sm shadow-custom" 
                            : "w-full px-4 py-2 hover:text-blue-500"
                    }`}
                >
                    <GiPlanetCore className="text-2xl" />
                    <span className="text-[12px] tracking-widest">MISSIONS</span>
                </button>

                <button
                    onClick={() => handleButtonClick("events")}
                    className={`flex flex-col gap-3 items-center text-[#FFFFFF] ${
                        activeButton === "events" 
                            ? "w-full bg-gradient-to-t px-4 py-2 from-[#00B2FF] via-[#0AA9FA] to-[#4670DA] backdrop-blur-sm shadow-custom" 
                            : "w-full px-4 py-2 hover:text-blue-500"
                    }`}
                >
                    <WiEarthquake className="text-2xl" />
                    <span className="text-[12px] tracking-widest">EVENTS</span>
                </button>

                <Dialog>
                    <DialogTrigger 
                        onClick={() => handleButtonClick("models")}
                        className={`flex flex-col gap-3 items-center text-[#FFFFFF] ${
                            activeButton === "models" 
                                ? "w-full bg-gradient-to-t px-4 py-2 from-[#00B2FF] via-[#0AA9FA] to-[#4670DA] backdrop-blur-sm shadow-custom" 
                                : "w-full px-4 py-2 hover:text-blue-500"
                        }`}
                    >
                        <RiRobot2Fill className="text-2xl" />
                        <span className="text-[12px] tracking-widest">MODELS</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>The Model</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger 
                        onClick={() => handleButtonClick("analysis")}
                        className={`flex flex-col gap-3 items-center text-[#FFFFFF] ${
                            activeButton === "analysis" 
                                ? "w-full bg-gradient-to-t px-4 py-2 from-[#00B2FF] via-[#0AA9FA] to-[#4670DA] backdrop-blur-sm shadow-custom" 
                                : "w-full px-4 py-2 hover:text-blue-500"
                        }`}
                    >
                        <BiSolidReport className="text-2xl" />
                        <span className="text-[12px] tracking-widest">ANALYSIS</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Make your analysis</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

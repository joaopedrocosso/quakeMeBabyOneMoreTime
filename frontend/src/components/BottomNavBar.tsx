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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import NavBarItem from "./NavBarItem";
import { Badge } from "@/components/ui/badge"
import { PlanetTravelCard } from "./PlanetTravelCard";

export const BottomNavBar = () => {

    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => setIsDialogOpen(false);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#011221] shadow-md md:hidden">
            <div className="flex justify-between items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    <DialogTrigger asChild>
                        <div className="w-full">
                            <NavBarItem 
                                label="EVENTS" 
                                icon={<WiEarthquake />} 
                                activeButton={activeButton} 
                                setActiveButton={setActiveButton} 
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Visualize an Event</DialogTitle>
                            <DialogDescription>
                                <span>
                                    Select an event, watch it shaking the ground, being detected and analysed by our model, listen to how it would sound and view how the S.O.D.I.M. can help identifying and broadcasting the data back to Earth. 
                                </span>
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
                                    {/* Restante do conteúdo */}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Analysis */}
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

// @ts-nocheck
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdExplore } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosHelp } from "react-icons/io";
import Link from "next/link";

const TutorialComponent = ({ isDialogOpen, setIsDialogOpen }) => {

    return (
        <div className="text-white absolute top-10 right-10 m-4 z-10">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="text-white">
            <div className="shadow-[0_0px_20px_rgba(41,140,234,0.7)] hover:shadow-[0_0px_20px_rgba(41,140,234,1)] transition-all flex items-center justify-center bg-[#011221] w-12 h-12 rounded-full">
            <IoIosHelp className="w-10 h-10"/>
            </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center">
            <DialogHeader className="flex flex-col items-center">
            <DialogTitle>
                <Image
                src="/Logo.png"
                width={274}
                height={58}
                alt="logo"
                />
            </DialogTitle>
            <DialogDescription>
                Detecting seismic events across the solar system
            </DialogDescription>
            </DialogHeader>

            {/* Carrossel centralizado */}
            <Carousel className="text-[#AFC2D4] min-w-96 max-w-96 flex items-center justify-center mx-auto mt-2">
            <CarouselContent>
                <CarouselItem className="w-82 flex flex-col items-center">
                    <Image
                    src="/missions.png"
                    className="rounded-lg"
                    width={274}
                    height={58}
                    alt="missions modal"
                    />
                    <p className="text-center text-sm mt-4">
                    In the <strong>MISSIONS</strong> tab, you can navigate between the Moon and Mars, exploring the seismic events of each celestial body.
                    </p>
                </CarouselItem>
                <CarouselItem className="w-82 flex flex-col items-center">
                    <Image
                    src="/events.png"
                    className="rounded-lg"
                    width={274}
                    height={58}
                    alt="missions modal"
                    />
                    <p className="text-center text-sm mt-4">
                    In the <strong>EVENTS</strong> tab, you can explore all the detections made by the mission's probes, apply filters and carry out an analysis with our model.
                    </p>
                </CarouselItem>
                <CarouselItem className="w-82 flex flex-col items-center">
                    <Image
                    src="/model.png"
                    className="rounded-lg"
                    width={274}
                    height={58}
                    alt="missions modal"
                    />
                    <p className="text-center text-sm mt-4">
                    In the <strong>MODEL</strong> tab, you can find out how our model for analyzing seismic events, S.O.D.I.M., works.
                    </p>
                </CarouselItem>
                <CarouselItem className="w-82 flex flex-col items-center">
                    <Image
                    src="/analysis.png"
                    className="rounded-lg"
                    width={274}
                    height={58}
                    alt="missions modal"
                    />
                    <p className="text-center text-sm mt-4">
                    In the <strong>ANALYSIS</strong> tab, you can upload your own CSV detection file and see our model generating results!
                    </p>
                </CarouselItem>
                <CarouselItem className="w-82 flex flex-col items-center justify-center">
                    <MdExplore className="h-40 w-40" />
                    <p className="mb-4 text-center text-sm mt-6">
                    You're ready to start exploring our application! <br/> Close this window or click outside it. 
                    </p>

                    <Link 
                    href='https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/quake-me-baby-one-more-time/?tab=project' 
                    target="_blank"
                    className="mb-4 flex flex-row items-center border-b border-[#AFC2D4] text-sm gap-2"
                    >
                    <FaExternalLinkAlt className="w-3 h-3"/>
                    <p>
                        Project documentation
                    </p>
                    </Link>

                    <Link 
                    href='https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime' 
                    target="_blank"
                    className="flex flex-row items-center border-b border-[#AFC2D4] text-sm gap-2"
                    >
                    <FaGithub className="w-3 h-3"/>
                    <p>
                        Project repository
                    </p>
                    </Link>

                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-black bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_0px_30px_rgba(41,140,234,0.8)] transition-all border-none"/>
            <CarouselNext className="text-black bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_0px_30px_rgba(41,140,234,0.8)] transition-all border-none"/>
            </Carousel>
        </DialogContent>
        </Dialog>
    </div>
    )
}

export default TutorialComponent
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { PiRocketLaunchFill } from "react-icons/pi";
import Link from "next/link";

interface PlanetTravelCardProps {
    celestial: string;
    description: string;
    icon: string;
    onClick: () => void;
}

export const PlanetTravelCard = ({ celestial, description, icon, onClick }: PlanetTravelCardProps) => {
  return (
    <>
      {celestial === "Moon" ? (
        <Link href='/moon' onClick={onClick}>
            <Card className="bg-[#011221] border-none">
            <CardHeader className="text-start pt-4">
                <div className="flex flex-row items-center gap-3 pl-4 pb-2">
                    <img 
                        src={icon}
                        alt={celestial}
                        className="w-7 h-7"
                    />
                    <CardTitle className="text-white">{celestial}</CardTitle>
                </div>
                <CardDescription className="px-4">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center px-4 py-2">
                <Badge variant="default" className="font-normal space-x-2 my-4 mr-auto bg-[#0E0E0E]">                                            
                    <img 
                        src="/patches/apollo12.png" 
                        alt={celestial}
                        className="w-5 h-5 rounded-t-xl"
                    />
                    <p>Apollo 12</p>
                </Badge>
                <Badge variant="default" className="font-normal space-x-2 my-4 mr-auto bg-[#0E0E0E]">                                            
                    <img 
                        src="/patches/apollo15.png" 
                        alt={celestial}
                        className="w-5 h-5 rounded-t-xl"
                    />
                    <p>Apollo 15</p>
                </Badge>
                <Badge variant="default" className="font-normal space-x-2 my-4 mr-auto bg-[#0E0E0E]">                                            
                    <img 
                        src="/patches/apollo16.png" 
                        alt={celestial}
                        className="w-5 h-5 rounded-t-xl"
                    />
                    <p>Apollo 16</p>
                </Badge>
                <Button 
                    className="px-4 py-4 bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_14px_20px_rgba(41,140,234,0.5)] transition-all tracking-wide text-md"
                >
                    <PiRocketLaunchFill className="w-5 h-5" />
                </Button>
            </CardContent>
            </Card>
        </Link>
      ) : (
        <Link href='/mars' onClick={onClick}>
            <Card className="bg-[#011221] border-none">
                <CardHeader className="text-start pt-4">
                    <div className="flex flex-row items-center gap-3 pl-4 pb-2">
                        <img 
                            src={icon}
                            alt={celestial}
                            className="w-7 h-7"
                        />
                        <CardTitle className="text-white">{celestial}</CardTitle>
                    </div>
                    <CardDescription className="px-4">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row items-center px-4 py-2">
                    <Badge variant="default" className="font-normal space-x-2 my-4 mr-auto bg-[#0E0E0E]">                                            
                        <img 
                            src="/patches/insightPatch.png" 
                            alt={celestial}
                            className="w-5 h-5 rounded-t-xl"
                        />
                        <p>Insight Lander</p>
                    </Badge>
                    <Button 
                        className="px-4 py-4 bg-gradient-to-t from-[#4670DA] via-[#0AA9FA] to-[#00B2FF] hover:shadow-[0_14px_20px_rgba(41,140,234,0.5)] transition-all tracking-wide text-md"
                    >
                        <PiRocketLaunchFill className="w-5 h-5" />
                    </Button>
                </CardContent>
            </Card>
        </Link>
      )}
    </>
  )
}

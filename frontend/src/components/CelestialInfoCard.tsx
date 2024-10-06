import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CelestialInfoCardProps {
    title: string;
    description: string;
    info: {
        filename: string,
        location: string,
        starttime: string,
        endtime: string,
        sampling_rate: number
    };
}

const CelestialInfoCard = ({ title, description, info }: CelestialInfoCardProps) => {
  return (
    <>
        <Card className="backdrop-blur-sm bg-[#01122150] text-white p-4 w-96 max-w-96 min-h-96 h-1/2 m-auto rounded-lg border border-[#011221] shadow-[0_0px_20px_rgba(41,140,234,0.4)]">
            <CardHeader className="text-center">
                <CardTitle className="text-[#ffffff] text-md">{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <ol>
                    <li className="flex flex-col gap-2 justify-center items-start px-2 mt-2 border-none">
                        <p className="font-semibold text-[#9EAFC6]">Filename</p>
                        <div className="bg-[#011221] px-4 py-2 rounded-lg">
                            {info.filename}
                        </div>
                    </li>

                    <div className="flex flex-row gap-2">
                        <li className="flex flex-col gap-2 justify-center items-start px-2 mt-2 border-none">
                            <p className="font-semibold text-[#9EAFC6]">Location</p>
                            <div className="bg-[#011221] px-4 py-2 rounded-lg">
                                {info.location}
                            </div>
                        </li>
                        <li className="flex flex-col gap-2 justify-center items-start px-2 mt-2 border-none">
                            <p className="font-semibold text-[#9EAFC6]">Sampling rate</p>
                            <div className="bg-[#011221] px-4 py-2 rounded-lg">
                                {info.sampling_rate}
                            </div>
                        </li>
                    </div>


                    <li className="flex flex-col gap-2 justify-center items-start px-2 mt-2 border-none">
                        <p className="font-semibold text-[#9EAFC6]">Start time</p>
                        <div className="bg-[#011221] px-4 py-2 rounded-lg">
                            {info.starttime}
                        </div>
                    </li>

                    <li className="flex flex-col gap-2 justify-center items-start px-2 mt-2 border-none">
                        <p className="font-semibold text-[#9EAFC6]">End time</p>
                        <div className="bg-[#011221] px-4 py-2 rounded-lg">
                            {info.endtime}
                        </div>
                    </li>
                </ol>
            </CardContent>
        </Card>
    </>
  )
}

const CelestialModelInfoCard = ({ title, description, info }: CelestialInfoCardProps) => {
    return (
      <>
          <Card className="bg-[#011221a9] text-white border border-white p-4 w-96 max-w-96 min-h-96 h-1/2 m-auto">
              <CardHeader className="text-start text-lg">
                  <CardTitle className="text-white">{title}</CardTitle>
                  <CardDescription>
                      {description}
                  </CardDescription>
              </CardHeader>
              <CardContent className="pt-1 text-sm">
                  <ol>
                      <li><b>filename:</b> {info.filename}</li>
                      <li><b>location:</b> {info.location}</li>
                      <li><b>starttime:</b> {info.starttime}</li>
                      <li><b>endtime:</b> {info.endtime}</li>
                      <li><b>sampling_rate:</b> {info.sampling_rate}</li>
                  </ol>
              </CardContent>
          </Card>
      </>
    )
}

export {CelestialInfoCard, CelestialModelInfoCard}

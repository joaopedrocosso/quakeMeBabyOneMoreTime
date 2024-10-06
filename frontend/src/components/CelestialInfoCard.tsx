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
        <Card className="bg-[#011221a9] text-white border border-white p-4 w-96 max-w-96 min-h-96 h-1/2 m-auto">
            <CardHeader className="text-start text-lg">
                <CardTitle>{title}</CardTitle>
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
                    <li><b>endtime:</b> {info.endtime}</li>
                    <li><b>sampling_rate:</b> {info.sampling_rate}</li>
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

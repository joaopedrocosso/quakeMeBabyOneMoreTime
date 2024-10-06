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

const page = () => {
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

  return (
    <>
      <div className="hidden lg:flex align-center absolute z-10 left-20 lg:left-40 h-screen">
        <CelestialInfoCard title={infos.title} description={infos.description} info={infos.info} />
      </div>
      <div className="hidden lg:flex align-center absolute z-10 right-20 lg:right-40 h-screen">
        <CelestialModelInfoCard title={infos.title} description={infos.description} info={infos.info} />
      </div>
      <Scene enableControl={true}>
        <Mars isPageHome={false} />
      </Scene>
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
    </>
  )
}

export default page
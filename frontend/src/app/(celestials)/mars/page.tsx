import Scene from "@/components/Scene";
import Mars from "@/components/Mars";

const page = () => {
  return (
    <Scene enableControl={true}>
      <Mars isPageHome={false}/>
    </Scene>
  )
}

export default page
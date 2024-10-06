import Scene from "@/components/Scene";
import Moon from '@/components/Moon'

const page = () => {
  return (
    <Scene enableControl={true}>
      <Moon isPageHome={false}/>
    </Scene>
  )
}

export default page
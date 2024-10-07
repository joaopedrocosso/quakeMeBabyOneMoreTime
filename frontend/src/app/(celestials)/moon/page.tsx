// @ts-nocheck
'use client'

import Scene from "@/components/Scene";
import Moon from '@/components/Moon';
import { useState } from "react";

const page = () => {
  const [isQuaking, setIsQuaking] = useState(false)
  return (
    <Scene enableControl={true}>
      <Moon isPageHome={false} isQuaking={isQuaking} setIsQuaking={setIsQuaking}/>
    </Scene>
  )
}

export default page